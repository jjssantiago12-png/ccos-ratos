import { useMemo } from 'react'
import type { VendaCalculada, Pagamento } from '../types'
import { resumoGeral, receberPorRegiao } from '../lib/dashboard'
import StatTile from './StatTile'
import PainelDuplicatas from './PainelDuplicatas'

function formatarMoeda(valor: number): string {
  return valor.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL', maximumFractionDigits: 0 })
}

export default function Dashboard({ vendas, pagamentos }: { vendas: VendaCalculada[]; pagamentos: Pagamento[] }) {
  const resumo = useMemo(() => resumoGeral(vendas, pagamentos), [vendas, pagamentos])
  const regioes = useMemo(() => receberPorRegiao(vendas), [vendas])
  const maiorRegiao = regioes.length > 0 ? regioes[0].restante : 0

  return (
    <div>
      <div className="linha-2">
        <StatTile label="Total a receber" valor={formatarMoeda(resumo.totalReceber)} />
        <StatTile
          label="Em atraso"
          valor={formatarMoeda(resumo.totalAtrasadoValor)}
          detalhe={`${resumo.qtdAtrasadas} ${resumo.qtdAtrasadas === 1 ? 'venda' : 'vendas'}`}
          corIndicador="var(--vermelho)"
        />
      </div>
      <div className="linha-2" style={{ marginTop: 10 }}>
        <StatTile
          label="Recebido esse mês"
          valor={formatarMoeda(resumo.totalRecebidoMes)}
          detalhe={`${resumo.qtdBaixasMes} ${resumo.qtdBaixasMes === 1 ? 'baixa' : 'baixas'}`}
          corIndicador="var(--verde)"
        />
        <StatTile label="Taxa de inadimplência" valor={`${resumo.taxaInadimplencia.toFixed(0)}%`} />
      </div>

      <h2 style={{ fontSize: 15, margin: '20px 0 10px' }}>A receber por região</h2>
      {regioes.length === 0 ? (
        <div className="vazio">Nenhuma venda em aberto.</div>
      ) : (
        <div className="cartao">
          {regioes.map((r) => {
            const pct = maiorRegiao > 0 ? (r.restante / maiorRegiao) * 100 : 0
            return (
              <div key={r.nome} style={{ marginBottom: 14 }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 13, marginBottom: 4 }}>
                  <span>
                    {r.nome} <span style={{ color: 'var(--texto-fraco)' }}>· {r.qtd}</span>
                  </span>
                  <span style={{ color: 'var(--texto-fraco)' }}>{formatarMoeda(r.restante)}</span>
                </div>
                <div style={{ height: 10, background: 'var(--bg)', borderRadius: 999, overflow: 'hidden' }}>
                  <div style={{ width: `${pct}%`, height: '100%', background: 'var(--acento)', borderRadius: 999 }} />
                </div>
              </div>
            )
          })}
        </div>
      )}

      <h2 style={{ fontSize: 15, margin: '20px 0 10px' }}>Carteira por status</h2>
      {/* padding-right extra: o botão flutuante "+" fica sobre o canto inferior direito
          da tela e cobriria os números alinhados à direita quando rolado até aqui */}
      <div className="cartao" style={{ paddingRight: 70 }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '6px 0' }}>
          <span style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
            <span style={{ width: 8, height: 8, borderRadius: 999, background: 'var(--vermelho)' }} />
            Atrasado
          </span>
          <span>{resumo.qtdAtrasadas}</span>
        </div>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '6px 0' }}>
          <span style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
            <span style={{ width: 8, height: 8, borderRadius: 999, background: 'var(--verde)' }} />
            Em dia
          </span>
          <span>{resumo.qtdEmDia}</span>
        </div>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '6px 0' }}>
          <span style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
            <span style={{ width: 8, height: 8, borderRadius: 999, background: 'var(--cinza)' }} />
            Quitado
          </span>
          <span>{resumo.qtdQuitadas}</span>
        </div>
      </div>

      <h2 style={{ fontSize: 15, margin: '20px 0 10px' }}>Histórico de cobranças</h2>
      <div className="linha-2">
        <StatTile label="Total já recebido" valor={formatarMoeda(resumo.totalRecebidoGeral)} />
        <StatTile
          label="Baixas registradas"
          valor={String(resumo.qtdBaixasGeral)}
          detalhe={resumo.qtdBaixasGeral > 0 ? 'desde o início' : undefined}
        />
      </div>

      <h2 style={{ fontSize: 15, margin: '20px 0 10px' }}>Possíveis duplicidades</h2>
      <PainelDuplicatas vendas={vendas} />
    </div>
  )
}
