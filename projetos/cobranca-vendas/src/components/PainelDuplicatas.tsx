import { useState } from 'react'
import type { Venda } from '../types'
import { detectarDuplicatas } from '../lib/duplicatas'
import { excluirVenda } from '../db/repo'

function formatarMoeda(valor: number): string {
  return valor.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })
}

function formatarData(iso: string): string {
  const d = new Date(iso)
  return d.toLocaleDateString('pt-BR', { timeZone: 'UTC' })
}

function formatarDataHora(iso: string): string {
  return new Date(iso).toLocaleString('pt-BR', { day: '2-digit', month: '2-digit', hour: '2-digit', minute: '2-digit' })
}

export default function PainelDuplicatas({ vendas }: { vendas: Venda[] }) {
  const grupos = detectarDuplicatas(vendas)
  const [excluindo, setExcluindo] = useState<string | null>(null)
  const [erro, setErro] = useState('')

  if (grupos.length === 0) {
    return <div className="valor-detalhe">Nenhuma duplicidade encontrada — mesma cliente, valor e vencimento aparecem só uma vez cada.</div>
  }

  async function excluir(venda: Venda) {
    const ok = window.confirm(
      `Excluir esse lançamento de ${venda.cliente_nome} (${formatarMoeda(venda.valor_devido)}, venceu ${formatarData(venda.data_vencimento)})? Essa ação não pode ser desfeita.`
    )
    if (!ok) return
    setErro('')
    setExcluindo(venda.id)
    try {
      await excluirVenda(venda.id)
    } catch (err) {
      setErro(err instanceof Error ? err.message : 'Não consegui excluir essa venda.')
    } finally {
      setExcluindo(null)
    }
  }

  return (
    <div className="lista">
      {erro && <div className="erro-texto">{erro}</div>}
      {grupos.map((grupo) => (
        <div key={grupo.chave} className="cartao">
          <div className="cartao-topo">
            <div>
              <div className="cartao-nome">{grupo.vendas[0].cliente_nome}</div>
              <div className="cartao-local">
                {formatarMoeda(grupo.vendas[0].valor_devido)} · venceu {formatarData(grupo.vendas[0].data_vencimento)}
              </div>
            </div>
            <span className="selo selo-atrasado">{grupo.vendas.length}x igual</span>
          </div>

          <div style={{ marginTop: 10, display: 'flex', flexDirection: 'column', gap: 8 }}>
            {grupo.vendas.map((v) => (
              <div
                key={v.id}
                style={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  borderTop: '1px solid var(--borda)',
                  paddingTop: 8,
                }}
              >
                <div className="valor-detalhe">
                  {v.origem} · venda em {formatarData(v.data_venda)} · lançado {formatarDataHora(v.created_at)}
                  {v.codigo_cliente && ` · cód. ${v.codigo_cliente}`}
                  {v.observacoes && ` · ${v.observacoes}`}
                  {v.valor_pago > 0 && (
                    <>
                      {' · '}
                      <strong style={{ color: 'var(--acento)' }}>já recebeu {formatarMoeda(v.valor_pago)} — não dá pra excluir esse</strong>
                    </>
                  )}
                </div>
                <button
                  className="btn-secundario btn-pequeno"
                  onClick={() => excluir(v)}
                  disabled={excluindo === v.id}
                  style={{ flexShrink: 0, marginLeft: 8 }}
                >
                  {excluindo === v.id ? '...' : 'Excluir'}
                </button>
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  )
}
