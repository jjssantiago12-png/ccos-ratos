import type { Venda, Pagamento, Origem } from '../types'
import { chaveProvavel } from './duplicatas'

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

function round2(n: number): number {
  return Math.round(n * 100) / 100
}

// Chave de negócio SEM "data da venda" — o Líder pode reexportar a mesma parcela com
// essa data recarimbada (ex: refletindo a última tentativa de cobrança), e se ela
// entrasse na chave, a mesma dívida real virava um registro novo a cada reexport em
// vez de atualizar o existente. Usa observações (traz o nº do pedido/parcela, ex:
// "PED584-1/1") como desempate — cliente+vencimento+valor sozinhos colidem em casos
// reais (duas vendas distintas da mesma cliente, coincidentemente mesmo valor e
// vencimento, mas pedidos diferentes) e a data da venda não é confiável pro desempate.
// valorDevido.toFixed(2): sem isso, o mesmo valor pode virar "479.95" numa importação e
// "479.94999999999993" depois de passar pelo Postgres (numeric(10,2) → JSON → Number) —
// a chave "muda" sozinha depois de um sync e reabre o mesmo bug de duplicação em massa
// que já aconteceu uma vez. chaveProvavel (duplicatas.ts) já fazia esse .toFixed(2).
function chaveNegocio(
  origem: Origem,
  codigoCliente: string,
  nome: string,
  dataVencimento: string,
  valorDevido: number,
  observacoes: string
): string {
  return `${origem}|${codigoCliente}|${nome.trim().toLowerCase()}|${dataVencimento}|${valorDevido.toFixed(2)}|${observacoes.trim()}`
}

export async function importarPlanilhaControle(
  arquivo: ArrayBuffer,
  vendasExistentes: Venda[] = []
): Promise<ResultadoImportacao> {
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

  // Índice pra reaproveitar id de venda já existente na hora de reimportar, em duas
  // camadas:
  // 1) chave ESTRITA (cliente+vencimento+valor+observações+origem+código) — match direto,
  //    sem ambiguidade nenhuma, é o caminho normal quando nada mudou entre importações.
  // 2) chave FROUXA (só cliente+valor+vencimento) como reserva, e só quando sobra
  //    exatamente UMA venda existente com aquela combinação — cobre o caso de um
  //    reexport do Líder reformatar o texto de observações (nº do pedido) da mesma
  //    parcela, o que quebra o match estrito (bug real: sem essa reserva, a parcela
  //    "sumia" do match e virava um registro novo a cada reexport, duplicando os 572
  //    clientes inteiros quando o texto mudou entre duas importações).
  // Se houver MAIS de uma venda existente com a mesma chave frouxa (ex: "Antonia Maria"
  // tem duas parcelas reais de R$479,95 vencendo no mesmo dia, pedidos diferentes — a
  // chave estrita já resolve as duas corretamente nesse caso), a reserva frouxa não tenta
  // adivinhar qual é qual — prefere gerar um id novo (parcela vira "nova" só nesse caso
  // raro e ambíguo, corrigível depois pelo Painel de Duplicatas) a arriscar misturar duas
  // dívidas diferentes num id errado.
  const idsPorChaveEstrita = new Map<string, string>()
  const idsPorChaveFrouxa = new Map<string, string[]>()
  const vendasExistentesPorId = new Map<string, Venda>()
  for (const v of vendasExistentes) {
    idsPorChaveEstrita.set(
      chaveNegocio(v.origem, v.codigo_cliente, v.cliente_nome, v.data_vencimento, v.valor_devido, v.observacoes),
      v.id
    )
    const chave = chaveProvavel(v)
    const bucket = idsPorChaveFrouxa.get(chave)
    if (bucket) bucket.push(v.id)
    else idsPorChaveFrouxa.set(chave, [v.id])
    vendasExistentesPorId.set(v.id, v)
  }

  for (let i = 0; i < linhas.length; i++) {
    const linha = linhas[i]
    const numeroLinha = i + 5
    const nome = paraTexto(linha[1])
    if (!nome) continue // linha vazia/sem cliente, ignora
    // linhas de rodapé da planilha (ex: "TOTAIS", "Clientes Atrasados:") têm nome na
    // coluna B mas não têm número em "Nº" (coluna A) — todo cliente real tem. Sem esse
    // filtro, o rodapé vira um "cliente" fantasma com o valor total da carteira.
    if (typeof linha[0] !== 'number') continue

    const celular = paraTexto(linha[2])
    const regiao = paraTexto(linha[3]) || '(conferir)'
    const bairro = paraTexto(linha[4])
    const codigoCliente = paraTexto(linha[6])
    const valorDevido = round2(paraNumero(linha[9]))
    const valorPagoPlanilha = round2(paraNumero(linha[10]))
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

    const chaveEstrita = chaveNegocio(origem, codigoCliente, nome, dataVencimento, valorDevido, observacoes)
    const chaveFrouxa = chaveProvavel({ cliente_nome: nome, valor_devido: valorDevido, data_vencimento: dataVencimento })

    let id = idsPorChaveEstrita.get(chaveEstrita)
    if (id) {
      idsPorChaveEstrita.delete(chaveEstrita)
      const bucket = idsPorChaveFrouxa.get(chaveFrouxa)
      if (bucket) {
        const pos = bucket.indexOf(id)
        if (pos >= 0) bucket.splice(pos, 1)
      }
    } else {
      const bucket = idsPorChaveFrouxa.get(chaveFrouxa)
      if (bucket && bucket.length === 1) id = bucket.pop()
    }
    const existente = id ? vendasExistentesPorId.get(id) : undefined
    id ??= await idDeterministico(`venda|${chaveEstrita}`)

    // Bug real corrigido: reimportar uma venda que JÁ existe não pode mexer em
    // valor_pago nem criar um pagamento novo — isso já é feito pela soma dos
    // pagamentos reais (registrarPagamento/trigger). Antes, reimportar sobrescrevia
    // valor_pago com o número cru da planilha E criava um "pagamento-importado" de
    // novo, então uma venda que já tinha recebido baixa pelo app contava esse valor
    // em dobro (planilha + baixa manual) na próxima sincronização. Só em vendas
    // NOVAS (sem correspondente local) é que o valor pago da planilha vira o
    // pagamento inicial — é a única vez que ele representa informação nova.
    if (existente) {
      // só avisa quando a planilha sabe de MAIS pagamento que o app (sinal real de uma
      // baixa recebida fora do app, ainda não lançada aqui) — planilha sabendo de MENOS
      // é o caso normal e esperado (é a fonte do Líder desatualizada em relação às
      // baixas já dadas pelo app), não precisa de aviso nenhum
      const diferenca = round2(valorPagoPlanilha - existente.valor_pago)
      if (diferenca > 0.01) {
        avisos.push({
          linha: numeroLinha,
          cliente: nome,
          motivo: `planilha mostra ${valorPagoPlanilha.toFixed(2)} pago, mas o app só tem ${existente.valor_pago.toFixed(2)} registrado — pode ter uma baixa de ${diferenca.toFixed(2)} feita fora do app ainda não lançada aqui`,
        })
      }
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
        valor_pago: existente.valor_pago,
        data_ultimo_pagamento: existente.data_ultimo_pagamento,
        observacoes,
        origem,
        created_at: existente.created_at,
        updated_at: agora,
        synced_at: 0,
      })
    } else {
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
        valor_pago: valorPagoPlanilha,
        data_ultimo_pagamento: paraISOData(linha[11]),
        observacoes,
        origem,
        created_at: agora,
        updated_at: agora,
        synced_at: 0,
      })

      if (valorPagoPlanilha > 0) {
        const idPagamento = await idDeterministico(`pagamento-importado|${id}`)
        pagamentos.push({
          id: idPagamento,
          venda_id: id,
          valor: valorPagoPlanilha,
          data: paraISOData(linha[11]) ?? dataVenda,
          observacao: 'Importado da planilha de campo',
          registrado_por: 'Importação',
          synced_at: 0,
        })
      }
    }
  }

  // rede de segurança: se por algum motivo duas linhas ainda gerarem o mesmo id
  // (mesmo cliente/código, mesmo vencimento e mesmo valor), um bulkPut simplesmente
  // sobrescreveria uma venda de verdade sem avisar ninguém — preferível travar a
  // importação inteira e deixar quem está importando decidir, a perder dívida de
  // cliente silenciosamente. Se for coincidência real (duas parcelas genuinamente
  // distintas com mesmo valor/vencimento), ajusta um dos dois na planilha (ex: 1
  // centavo de diferença) antes de reimportar.
  const idsVistos = new Set<string>()
  for (const v of vendas) {
    if (idsVistos.has(v.id)) {
      throw new Error(
        `Duas linhas da planilha (mesmo cliente, mesmo vencimento e mesmo valor) geraram o mesmo registro — provável duplicata real na planilha. Cliente: "${v.cliente_nome}". Confere as linhas desse cliente antes de importar de novo.`
      )
    }
    idsVistos.add(v.id)
  }

  return { vendas, pagamentos, avisos, totalLinhas: linhas.length }
}
