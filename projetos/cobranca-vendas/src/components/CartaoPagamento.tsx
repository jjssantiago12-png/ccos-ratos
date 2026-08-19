import type { Pagamento, VendaCalculada } from '../types'
import { pagamentoEhParcial } from '../lib/pagamentos'

function formatarMoeda(valor: number): string {
  return valor.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })
}

function formatarDataHora(iso: string): string {
  const d = new Date(iso)
  return d.toLocaleString('pt-BR', { day: '2-digit', month: '2-digit', hour: '2-digit', minute: '2-digit' })
}

export default function CartaoPagamento({ pagamento, venda }: { pagamento: Pagamento; venda: VendaCalculada | undefined }) {
  const parcial = venda ? pagamentoEhParcial(pagamento, venda) : false

  return (
    <div className="cartao">
      <div className="cartao-topo">
        <div>
          <div className="cartao-nome">{venda?.cliente_nome ?? '(venda não encontrada)'}</div>
          <div className="cartao-local">
            {formatarDataHora(pagamento.data)}
            {pagamento.registrado_por && ` · ${pagamento.registrado_por}`}
          </div>
        </div>
        <span className={parcial ? 'selo selo-atrasado' : 'selo selo-em-dia'}>{parcial ? 'Parcial' : 'Total'}</span>
      </div>

      <div className="cartao-valores">
        <div>
          <div className="valor-restante">{formatarMoeda(pagamento.valor)}</div>
          {parcial && venda && (
            <div className="valor-detalhe">
              parcela era {formatarMoeda(venda.valor_devido)} · falta {formatarMoeda(venda.restante)}
            </div>
          )}
        </div>
      </div>

      {pagamento.observacao && <div className="valor-detalhe" style={{ marginTop: 6 }}>{pagamento.observacao}</div>}
    </div>
  )
}
