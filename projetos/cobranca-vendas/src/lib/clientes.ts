import type { Venda, VendaCalculada, Status } from '../types'
import { type FiltroData, vendaNoFiltroData } from './calculos'

export interface InfoParcela {
  pedido: string
  numero: number
  total: number
}

// Observações de venda vindas da planilha seguem o padrão "PED<pedido>-<parcela>/<total>"
// (ex: "PED343-2/3") quando o pedido tem mais de uma parcela — usado pra agrupar/ordenar
// as parcelas de um mesmo pedido na tela do cliente.
const PADRAO_PARCELA = /PED(\w+)-(\d+)\/(\d+)/

export function infoParcela(venda: Venda): InfoParcela | null {
  const m = venda.observacoes.match(PADRAO_PARCELA)
  if (!m) return null
  return { pedido: m[1], numero: Number(m[2]), total: Number(m[3]) }
}

export interface ClienteResumo {
  chave: string
  cliente_nome: string
  cliente_celular: string
  bairro: string
  regiao: string
  vendas: VendaCalculada[]
  restante_total: number
  status: Status
  score_cobranca_total: number
}

export interface BairroResumo {
  nome: string
  total_clientes: number
}

const PESO_STATUS: Record<Status, number> = {
  Atrasado: 2,
  'Em dia': 1,
  Quitado: 0,
}

function localDeVenda(venda: Venda): string {
  const bairro = venda.bairro.trim()
  if (bairro) return bairro
  return venda.regiao.trim() || '(sem bairro)'
}

function chaveClienteDeVenda(venda: Venda): string {
  const codigo = venda.codigo_cliente.trim()
  if (codigo) return `codigo:${codigo}`
  return `nome:${venda.cliente_nome.trim().toLowerCase()}|${venda.cliente_celular.replace(/\D/g, '')}`
}

export function agruparPorCliente(vendas: VendaCalculada[]): ClienteResumo[] {
  const porChave = new Map<string, VendaCalculada[]>()

  for (const venda of vendas) {
    const chave = chaveClienteDeVenda(venda)
    const lista = porChave.get(chave)
    if (lista) lista.push(venda)
    else porChave.set(chave, [venda])
  }

  const resumos: ClienteResumo[] = []

  for (const [chave, vendasDoCliente] of porChave) {
    const maisRecente = vendasDoCliente.reduce((a, b) => (a.updated_at >= b.updated_at ? a : b))

    let status: Status = 'Quitado'
    let restanteTotal = 0
    let scoreTotal = 0
    for (const v of vendasDoCliente) {
      restanteTotal += v.restante
      scoreTotal += v.score_cobranca
      if (PESO_STATUS[v.status] > PESO_STATUS[status]) status = v.status
    }

    // ordenado por vencimento: parcela vencida aparece primeiro, seguida das próximas a
    // vencer em ordem — é assim que o pai decide qual parcela dar baixa quando visita a cliente
    const vendasOrdenadas = [...vendasDoCliente].sort((a, b) => a.data_vencimento.localeCompare(b.data_vencimento))

    resumos.push({
      chave,
      cliente_nome: maisRecente.cliente_nome,
      cliente_celular: maisRecente.cliente_celular,
      bairro: localDeVenda(maisRecente),
      regiao: maisRecente.regiao,
      vendas: vendasOrdenadas,
      restante_total: Math.round(restanteTotal * 100) / 100,
      status,
      score_cobranca_total: Math.round(scoreTotal * 100) / 100,
    })
  }

  return resumos
}

export function listarBairros(clientes: ClienteResumo[]): BairroResumo[] {
  const contagem = new Map<string, number>()
  for (const cliente of clientes) {
    contagem.set(cliente.bairro, (contagem.get(cliente.bairro) ?? 0) + 1)
  }
  return [...contagem.entries()]
    .map(([nome, total_clientes]) => ({ nome, total_clientes }))
    .sort((a, b) => a.nome.localeCompare(b.nome, 'pt-BR'))
}

export function clientesDoBairro(clientes: ClienteResumo[], bairro: string): ClienteResumo[] {
  return clientes
    .filter((c) => c.bairro === bairro)
    .sort((a, b) => a.cliente_nome.localeCompare(b.cliente_nome, 'pt-BR'))
}

/** Cliente passa no filtro de data se pelo menos uma das vendas dela vence no período —
 * o filtro decide quem aparece na lista, mas a tela de detalhe sempre mostra todas as
 * parcelas dela (filtradas ou não), pra não esconder parcela de quem já está sendo visitada. */
export function clientesNoFiltroData(clientes: ClienteResumo[], filtro: FiltroData, hoje: Date = new Date()): ClienteResumo[] {
  if (filtro === 'todas') return clientes
  return clientes.filter((c) => c.vendas.some((v) => vendaNoFiltroData(v, filtro, hoje)))
}
