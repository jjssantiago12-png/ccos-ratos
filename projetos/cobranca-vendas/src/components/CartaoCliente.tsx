import type { ClienteResumo } from '../lib/clientes'
import type { Status } from '../types'

const CLASSE_SELO: Record<Status, string> = {
  Atrasado: 'selo selo-atrasado',
  'Em dia': 'selo selo-em-dia',
  Quitado: 'selo selo-quitado',
}

function formatarMoeda(valor: number): string {
  return valor.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })
}

export default function CartaoCliente({
  cliente,
  onSelecionar,
}: {
  cliente: ClienteResumo
  onSelecionar: () => void
}) {
  const qtd = cliente.vendas.length

  return (
    <button className="cartao cartao-clicavel" onClick={onSelecionar}>
      <div className="cartao-topo">
        <div>
          <div className="cartao-nome">{cliente.cliente_nome}</div>
          <div className="cartao-local">
            {cliente.cliente_celular || 'sem celular'} · {qtd} {qtd === 1 ? 'venda' : 'vendas'}
          </div>
        </div>
        <span className={CLASSE_SELO[cliente.status]}>{cliente.status}</span>
      </div>

      {cliente.restante_total > 0 && (
        <div className="cartao-valores">
          <div className="valor-restante">{formatarMoeda(cliente.restante_total)}</div>
        </div>
      )}
    </button>
  )
}
