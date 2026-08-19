import type { VendaCalculada, Pagamento } from '../types'

export interface ResumoGeral {
  totalReceber: number
  totalAtrasadoValor: number
  qtdAtrasadas: number
  qtdEmDia: number
  qtdQuitadas: number
  totalRecebidoMes: number
  qtdBaixasMes: number
  totalRecebidoGeral: number
  qtdBaixasGeral: number
  taxaInadimplencia: number
}

function mesmoMes(isoA: string, isoB: string): boolean {
  return isoA.slice(0, 7) === isoB.slice(0, 7)
}

export function resumoGeral(vendas: VendaCalculada[], pagamentos: Pagamento[], hoje: Date = new Date()): ResumoGeral {
  let totalReceber = 0
  let totalAtrasadoValor = 0
  let qtdAtrasadas = 0
  let qtdEmDia = 0
  let qtdQuitadas = 0

  for (const v of vendas) {
    if (v.status === 'Quitado') {
      qtdQuitadas++
      continue
    }
    totalReceber += v.restante
    if (v.status === 'Atrasado') {
      qtdAtrasadas++
      totalAtrasadoValor += v.restante
    } else {
      qtdEmDia++
    }
  }

  const hojeISO = hoje.toISOString()
  let totalRecebidoMes = 0
  let qtdBaixasMes = 0
  let totalRecebidoGeral = 0
  for (const p of pagamentos) {
    totalRecebidoGeral += p.valor
    if (mesmoMes(p.data, hojeISO)) {
      totalRecebidoMes += p.valor
      qtdBaixasMes++
    }
  }

  return {
    totalReceber: round2(totalReceber),
    totalAtrasadoValor: round2(totalAtrasadoValor),
    qtdAtrasadas,
    qtdEmDia,
    qtdQuitadas,
    totalRecebidoMes: round2(totalRecebidoMes),
    qtdBaixasMes,
    totalRecebidoGeral: round2(totalRecebidoGeral),
    qtdBaixasGeral: pagamentos.length,
    taxaInadimplencia: totalReceber > 0 ? round2((totalAtrasadoValor / totalReceber) * 100) : 0,
  }
}

export interface RegiaoResumo {
  nome: string
  restante: number
  qtd: number
}

/** Só considera vendas em aberto (não quitadas) — é sobre o que ainda falta receber. */
export function receberPorRegiao(vendas: VendaCalculada[]): RegiaoResumo[] {
  const mapa = new Map<string, RegiaoResumo>()
  for (const v of vendas) {
    if (v.status === 'Quitado') continue
    const nome = v.regiao.trim() || '(sem região)'
    const atual = mapa.get(nome) ?? { nome, restante: 0, qtd: 0 }
    atual.restante = round2(atual.restante + v.restante)
    atual.qtd += 1
    mapa.set(nome, atual)
  }
  return [...mapa.values()].sort((a, b) => b.restante - a.restante)
}

function round2(n: number): number {
  return Math.round(n * 100) / 100
}
