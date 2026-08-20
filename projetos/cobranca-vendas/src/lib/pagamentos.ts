import type { Pagamento, Venda } from '../types'

/** Uma baixa é parcial quando, somando ela com as baixas anteriores da mesma venda (em
 * ordem cronológica), ainda não cobre o valor devido original — ou seja, é o SALDO
 * ACUMULADO até aquela baixa que decide, não o valor da baixa isolada. Numa venda paga
 * em duas parcelas, a segunda baixa completa a dívida mesmo sendo menor que o valor
 * devido total, e antes aparecia como "Parcial" incorretamente. */
export function pagamentoEhParcial(pagamento: Pagamento, venda: Venda, pagamentosDaVenda: Pagamento[]): boolean {
  const ordenados = [...pagamentosDaVenda].sort((a, b) => a.data.localeCompare(b.data) || a.id.localeCompare(b.id))
  let acumulado = 0
  for (const p of ordenados) {
    acumulado += p.valor
    if (p.id === pagamento.id) break
  }
  return acumulado < venda.valor_devido - 0.005
}
