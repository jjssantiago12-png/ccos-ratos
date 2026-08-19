import type { Venda, Pagamento, Origem } from '../types'

export interface AvisoImportacao {
  linha: number
  cliente: string
  motivo: string
}

export interface ResultadoImportacao {
  vendas: Venda[]
  pagamentos: Pagamento[]
  avisos: AvisoImportacao[]
  totalLinhas: number
}

/** Gera um id estável a partir de uma chave de negócio — a mesma linha da planilha,
 * importada de novo (no mesmo aparelho ou em outro), cai sempre no mesmo id, então
 * reimportar não duplica nada (bulkPut faz upsert por id). */
async function idDeterministico(chave: string): Promise<string> {
  const buffer = await crypto.subtle.digest('SHA-256', new TextEncoder().encode(chave))
  const hex = Array.from(new Uint8Array(buffer))
    .map((b) => b.toString(16).padStart(2, '0'))
    .join('')
    .slice(0, 32)
  return `${hex.slice(0, 8)}-${hex.slice(8, 12)}-${hex.slice(12, 16)}-${hex.slice(16, 20)}-${hex.slice(20, 32)}`
}

function paraISOData(valor: unknown): string | null {
  if (valor instanceof Date && !isNaN(valor.getTime())) return valor.toISOString().slice(0, 10)
  if (typeof valor === 'string' && valor.trim()) {
    const d = new Date(valor)
    if (!isNaN(d.getTime())) return d.toISOString().slice(0, 10)
  }
  return null
}

function paraNumero(valor: unknown): number {
  if (typeof valor === 'number') return valor
  if (typeof valor === 'string') {
    const n = Number(valor.replace(/\./g, '').replace(',', '.'))
    return isNaN(n) ? 0 : n
  }
  return 0
}

function paraTexto(valor: unknown): string {
  if (valor === null || valor === undefined) return ''
  return String(valor).trim()
}

export async function importarPlanilhaControle(arquivo: ArrayBuffer): Promise<ResultadoImportacao> {
  // import dinâmico: a lib de parsing de xlsx é pesada (~350kB) e só é usada nessa
  // tela ocasional de importação — não faz sentido pesar no carregamento do dia a dia.
  const XLSX = await import('xlsx')
  const workbook = XLSX.read(arquivo, { type: 'array', cellDates: true })
  const sheet = workbook.Sheets['CONTROLE']
  if (!sheet) {
    throw new Error('Essa planilha não tem uma aba chamada "CONTROLE" — confere se é o arquivo certo.')
  }

  // range: 4 pula as 4 primeiras linhas (título + linhas em branco + cabeçalho), dados começam na linha 5
  const linhas: unknown[][] = XLSX.utils.sheet_to_json(sheet, { header: 1, defval: null, range: 4 })

  const vendas: Venda[] = []
  const pagamentos: Pagamento[] = []
  const avisos: AvisoImportacao[] = []
  const agora = new Date().toISOString()

  for (let i = 0; i < linhas.length; i++) {
    const linha = linhas[i]
    const numeroLinha = i + 5
    const nome = paraTexto(linha[1])
    if (!nome) continue // linha vazia/sem cliente, ignora

    const celular = paraTexto(linha[2])
    const regiao = paraTexto(linha[3]) || '(conferir)'
    const bairro = paraTexto(linha[4])
    const codigoCliente = paraTexto(linha[6])
    const valorDevido = paraNumero(linha[9])
    const valorPago = paraNumero(linha[10])
    const observacoes = paraTexto(linha[17])
    const origemTexto = paraTexto(linha[18])
    const origem: Origem = origemTexto === 'LIDER' ? 'LIDER' : 'Campo'

    if (!valorDevido || valorDevido <= 0) {
      avisos.push({ linha: numeroLinha, cliente: nome, motivo: 'sem valor devido — não importada' })
      continue
    }

    const avisosLinha: string[] = []
    if (!celular) avisosLinha.push('sem celular')
    if (regiao === '(conferir)') avisosLinha.push('sem região')

    let dataVenda = paraISOData(linha[7])
    let dataVencimento = paraISOData(linha[8])
    if (!dataVencimento) {
      avisosLinha.push('sem vencimento — usei a data da venda')
      dataVencimento = dataVenda ?? agora.slice(0, 10)
    }
    if (!dataVenda) {
      avisosLinha.push('sem data da venda — usei o vencimento')
      dataVenda = dataVencimento
    }

    if (avisosLinha.length > 0) {
      avisos.push({ linha: numeroLinha, cliente: nome, motivo: avisosLinha.join(', ') })
    }

    // inclui data_vencimento na chave: é comum o mesmo cliente ter várias parcelas da
    // mesma venda (mesma data de venda, mesmo valor por parcela) diferenciadas só pelo
    // vencimento — sem isso, parcelas distintas colidiam no mesmo id e se sobrescreviam
    const chaveVenda = `venda|${origem}|${codigoCliente}|${nome}|${dataVenda}|${dataVencimento}|${valorDevido}`
    const id = await idDeterministico(chaveVenda)

    vendas.push({
      id,
      cliente_nome: nome,
      cliente_celular: celular,
      regiao,
      bairro,
      codigo_cliente: codigoCliente,
      data_venda: dataVenda,
      data_vencimento: dataVencimento,
      valor_devido: valorDevido,
      valor_pago: valorPago,
      data_ultimo_pagamento: paraISOData(linha[11]),
      observacoes,
      origem,
      created_at: agora,
      updated_at: agora,
      synced_at: 0,
    })

    if (valorPago > 0) {
      const idPagamento = await idDeterministico(`pagamento-importado|${id}`)
      pagamentos.push({
        id: idPagamento,
        venda_id: id,
        valor: valorPago,
        data: paraISOData(linha[11]) ?? dataVenda,
        observacao: 'Importado da planilha de campo',
        registrado_por: 'Importação',
        synced_at: 0,
      })
    }
  }

  // rede de segurança: se por algum motivo duas linhas ainda gerarem o mesmo id
  // (chave de negócio igual por coincidência), um bulkPut simplesmente sobrescreveria
  // uma venda de verdade sem avisar ninguém — preferível travar a importação inteira
  // e deixar quem está importando decidir, a perder dívida de cliente silenciosamente.
  const idsVistos = new Set<string>()
  for (const v of vendas) {
    if (idsVistos.has(v.id)) {
      throw new Error(
        `Duas linhas da planilha (mesmo cliente, mesma data de venda/vencimento e valor) geraram o mesmo registro — provável duplicata real na planilha. Cliente: "${v.cliente_nome}". Confere as linhas desse cliente antes de importar de novo.`
      )
    }
    idsVistos.add(v.id)
  }

  return { vendas, pagamentos, avisos, totalLinhas: linhas.length }
}
