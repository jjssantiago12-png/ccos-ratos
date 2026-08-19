import type { Venda, VendaCalculada, Status } from '../types'

const MS_POR_DIA = 24 * 60 * 60 * 1000
const TAXA_MENSAL = 0.10

/** Trunca uma data (ISO ou Date) pra meia-noite UTC, pra contar dias corridos sem viés de fuso/hora. */
function paraDiaUTC(data: string | Date): number {
  const d = typeof data === 'string' ? new Date(data) : data
  return Date.UTC(d.getUTCFullYear(), d.getUTCMonth(), d.getUTCDate())
}

export function diasEmAtraso(dataVencimento: string, hoje: Date = new Date()): number {
  const dias = Math.floor((paraDiaUTC(hoje) - paraDiaUTC(dataVencimento)) / MS_POR_DIA)
  return Math.max(0, dias)
}

export function mesesEmAtraso(diasAtraso: number): number {
  return Math.floor(diasAtraso / 30)
}

/**
 * Restante = Saldo Base × (1,10 ^ Meses de Atraso) — juros compostos, só sobre o saldo
 * que falta pagar, só conta mês completo de 30 dias corridos. Mesma regra da planilha
 * de campo (CONTROLE_INADIMPLENCIA). Exemplo real: dívida de R$500, 62 dias vencida
 * (2 meses completos) → 500 × 1,10² = R$605.
 */
export function calcularVenda(venda: Venda, hoje: Date = new Date()): VendaCalculada {
  const saldoBase = Math.max(0, round2(venda.valor_devido - venda.valor_pago))
  const diasAtraso = diasEmAtraso(venda.data_vencimento, hoje)
  const mesesAtraso = mesesEmAtraso(diasAtraso)

  const restante = saldoBase > 0 ? round2(saldoBase * Math.pow(1 + TAXA_MENSAL, mesesAtraso)) : 0
  const acrescimo = round2(restante - saldoBase)

  let status: Status
  if (saldoBase <= 0) status = 'Quitado'
  else if (diasAtraso > 0) status = 'Atrasado'
  else status = 'Em dia'

  const restanteVencido = status === 'Atrasado' ? restante : 0
  const fatorAtraso = 1 + mesesAtraso * 0.5
  const scoreCobranca = round2(restanteVencido * fatorAtraso)

  return {
    ...venda,
    saldo_base: saldoBase,
    dias_atraso: diasAtraso,
    meses_atraso: mesesAtraso,
    acrescimo,
    restante,
    status,
    score_cobranca: scoreCobranca,
  }
}

export function calcularVendas(vendas: Venda[], hoje: Date = new Date()): VendaCalculada[] {
  return vendas.map((v) => calcularVenda(v, hoje))
}

export function ordenarPorRanking(vendas: VendaCalculada[]): VendaCalculada[] {
  return [...vendas].sort((a, b) => b.score_cobranca - a.score_cobranca)
}

export type FiltroData = 'todas' | 'semana' | 'mes'

/** Vencimento cai entre hoje e daqui 7/30 dias — não inclui o que já venceu (isso já é
 * coberto pela aba de status "Cobrar"; esse filtro é sobre o que está por vir). */
export function vendaNoFiltroData(venda: Venda, filtro: FiltroData, hoje: Date = new Date()): boolean {
  if (filtro === 'todas') return true
  const dias = filtro === 'semana' ? 7 : 30
  const hojeDia = paraDiaUTC(hoje)
  const vencimentoDia = paraDiaUTC(venda.data_vencimento)
  const limite = hojeDia + dias * MS_POR_DIA
  return vencimentoDia >= hojeDia && vencimentoDia <= limite
}

function round2(n: number): number {
  return Math.round(n * 100) / 100
}
