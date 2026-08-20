import type { Pagamento, VendaCalculada } from '../types'
import { pagamentoEhParcial } from '../lib/pagamentos'

function formatarMoeda(valor: number): string {
  return valor.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })
}

// Pagamento importado da planilha só tem DATA (string "YYYY-MM-DD", sem hora real) —
// precisa exibir em UTC, senão meia-noite UTC vira ~21h do dia anterior aqui (UTC-3) e
// a data mostrada fica errada. Pagamento lançado no app tem timestamp real (hora que
// alguém clicou "confirmar baixa") — esse sim deve mostrar no fuso local de verdade.
function formatarDataHora(pagamento: Pagamento): string {
  const d = new Date(pagamento.data)
  if (pagamento.registrado_por === 'Importação') {
    return d.toLocaleDateString('pt-BR', { timeZone: 'UTC' })
  }
  return d.toLocaleString('pt-BR', { day: '2-digit', month: '2-digit', hour: '2-digit', minute: '2-digit' })
}

export default function CartaoPagamento({
  pagamento,
  venda,
  pagamentosDaVenda,
}: {
  pagamento: Pagamento
  venda: VendaCalculada | undefined
  pagamentosDaVenda: Pagamento[]
}) {
  const parcial = venda ? pagamentoEhParcial(pagamento, venda, pagamentosDaVenda) : false

  return (
    <div className="cartao">
      <div className="cartao-topo">
        <div>
          <div className="cartao-nome">{venda?.cliente_nome ?? '(venda não encontrada)'}</div>
          <div className="cartao-local">
            {formatarDataHora(pagamento)}
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
