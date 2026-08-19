import type { VendaCalculada } from '../types'
import { linkCobrancaWhatsapp } from '../lib/whatsapp'
import { infoParcela } from '../lib/clientes'

const CLASSE_SELO: Record<VendaCalculada['status'], string> = {
  Atrasado: 'selo selo-atrasado',
  'Em dia': 'selo selo-em-dia',
  Quitado: 'selo selo-quitado',
}

function formatarMoeda(valor: number): string {
  return valor.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })
}

function formatarData(iso: string): string {
  const d = new Date(iso)
  return d.toLocaleDateString('pt-BR', { timeZone: 'UTC' })
}

export default function CartaoVenda({
  venda,
  onDarBaixa,
  onEditar,
}: {
  venda: VendaCalculada
  onDarBaixa: () => void
  onEditar: () => void
}) {
  const local = venda.regiao === 'Grande Vitória' && venda.bairro ? venda.bairro : venda.regiao
  const parcela = infoParcela(venda)

  return (
    <div className="cartao">
      <div className="cartao-topo">
        <div>
          <div className="cartao-nome">{venda.cliente_nome}</div>
          <div className="cartao-local">
            {local} · venceu {formatarData(venda.data_vencimento)}
            {parcela && ` · Parcela ${parcela.numero}/${parcela.total}`}
            {venda.origem === 'Campo' && ' · sem nota fiscal ainda'}
          </div>
        </div>
        <span className={CLASSE_SELO[venda.status]}>
          {venda.status === 'Atrasado' ? `${venda.dias_atraso}d atraso` : venda.status}
        </span>
      </div>

      <div className="cartao-valores">
        <div>
          <div className="valor-restante">{formatarMoeda(venda.restante)}</div>
          {venda.valor_pago > 0 && venda.status !== 'Quitado' && (
            <div className="valor-detalhe">já recebeu {formatarMoeda(venda.valor_pago)} dessa parcela</div>
          )}
          {venda.acrescimo > 0 && (
            <div className="valor-detalhe">inclui {formatarMoeda(venda.acrescimo)} de acréscimo</div>
          )}
        </div>
        {venda.status === 'Atrasado' && (
          <div className="valor-detalhe">score {venda.score_cobranca.toFixed(0)}</div>
        )}
      </div>

      {venda.status !== 'Quitado' && (
        <div className="cartao-acoes">
          <a className="btn-whatsapp" href={linkCobrancaWhatsapp(venda)} target="_blank" rel="noreferrer">
            Cobrar
          </a>
          <button className="btn-primario" onClick={onDarBaixa}>
            Dar baixa
          </button>
          <button className="btn-secundario btn-pequeno" onClick={onEditar} style={{ flex: '0 0 auto' }}>
            Editar
          </button>
        </div>
      )}
    </div>
  )
}
