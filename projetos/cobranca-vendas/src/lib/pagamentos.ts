import type { Pagamento, Venda } from '../types'

/** Uma baixa é parcial quando o valor recebido nela sozinha não cobre o valor devido
 * original da parcela — sinal de que ainda falta receber o resto dessa venda. */
export function pagamentoEhParcial(pagamento: Pagamento, venda: Venda): boolean {
  return pagamento.valor < venda.valor_devido - 0.005
}
