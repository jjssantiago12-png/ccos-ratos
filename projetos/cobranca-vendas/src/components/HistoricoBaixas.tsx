import { useMemo } from 'react'
import type { Pagamento, VendaCalculada } from '../types'
import CartaoPagamento from './CartaoPagamento'

export default function HistoricoBaixas({
  pagamentos,
  vendas,
  busca,
}: {
  pagamentos: Pagamento[]
  vendas: VendaCalculada[]
  busca: string
}) {
  const vendasPorId = useMemo(() => new Map(vendas.map((v) => [v.id, v])), [vendas])

  const pagamentosPorVenda = useMemo(() => {
    const mapa = new Map<string, Pagamento[]>()
    for (const p of pagamentos) {
      const lista = mapa.get(p.venda_id)
      if (lista) lista.push(p)
      else mapa.set(p.venda_id, [p])
    }
    return mapa
  }, [pagamentos])

  const ordenados = useMemo(() => {
    let lista = [...pagamentos].sort((a, b) => b.data.localeCompare(a.data))
    if (busca.trim()) {
      const termo = busca.trim().toLowerCase()
      lista = lista.filter((p) => vendasPorId.get(p.venda_id)?.cliente_nome.toLowerCase().includes(termo))
    }
    return lista
  }, [pagamentos, busca, vendasPorId])

  if (ordenados.length === 0) {
    return <div className="vazio">Nenhuma baixa registrada ainda.</div>
  }

  return (
    <div className="lista">
      {ordenados.map((p) => (
        <CartaoPagamento
          key={p.id}
          pagamento={p}
          venda={vendasPorId.get(p.venda_id)}
          pagamentosDaVenda={pagamentosPorVenda.get(p.venda_id) ?? [p]}
        />
      ))}
    </div>
  )
}
