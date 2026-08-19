import { useMemo, useState } from 'react'
import type { Venda, VendaCalculada } from '../types'
import type { FiltroData } from '../lib/calculos'
import { agruparPorCliente, listarBairros, clientesDoBairro, clientesNoFiltroData } from '../lib/clientes'
import CartaoCliente from './CartaoCliente'
import CartaoVenda from './CartaoVenda'

export default function ClientesPorBairro({
  vendas,
  filtroData,
  onDarBaixa,
  onEditar,
}: {
  vendas: VendaCalculada[]
  filtroData: FiltroData
  onDarBaixa: (venda: VendaCalculada) => void
  onEditar: (venda: Venda) => void
}) {
  // clientesTodos alimenta a tela de detalhe (mostra sempre todas as parcelas dela,
  // filtro ou não) — clientesFiltrados decide quem aparece nas listas de bairro/cliente.
  const clientesTodos = useMemo(() => agruparPorCliente(vendas), [vendas])
  const clientesFiltrados = useMemo(
    () => clientesNoFiltroData(clientesTodos, filtroData),
    [clientesTodos, filtroData],
  )
  const bairros = useMemo(() => listarBairros(clientesFiltrados), [clientesFiltrados])
  const [bairroSelecionado, setBairroSelecionado] = useState<string | null>(null)
  const [clienteChave, setClienteChave] = useState<string | null>(null)

  const clientesDoBairroAtual = useMemo(
    () => (bairroSelecionado ? clientesDoBairro(clientesFiltrados, bairroSelecionado) : []),
    [clientesFiltrados, bairroSelecionado],
  )

  const clienteSelecionado = clienteChave ? clientesTodos.find((c) => c.chave === clienteChave) ?? null : null

  if (clienteSelecionado) {
    return (
      <div>
        <button className="btn-secundario btn-pequeno" onClick={() => setClienteChave(null)}>
          ‹ Voltar
        </button>
        <div className="cartao-nome" style={{ marginTop: 14 }}>
          {clienteSelecionado.cliente_nome}
        </div>
        <div className="cartao-local" style={{ marginBottom: 14 }}>
          {clienteSelecionado.cliente_celular || 'sem celular'} · {clienteSelecionado.bairro}
        </div>
        <div className="lista">
          {clienteSelecionado.vendas.map((v) => (
            <CartaoVenda key={v.id} venda={v} onDarBaixa={() => onDarBaixa(v)} onEditar={() => onEditar(v)} />
          ))}
        </div>
      </div>
    )
  }

  if (bairroSelecionado) {
    return (
      <div>
        <button className="btn-secundario btn-pequeno" onClick={() => setBairroSelecionado(null)}>
          ‹ Voltar
        </button>
        {clientesDoBairroAtual.length === 0 ? (
          <div className="vazio">Nenhuma cliente cadastrada nesse bairro ainda.</div>
        ) : (
          <div className="lista" style={{ marginTop: 14 }}>
            {clientesDoBairroAtual.map((c) => (
              <CartaoCliente key={c.chave} cliente={c} onSelecionar={() => setClienteChave(c.chave)} />
            ))}
          </div>
        )}
      </div>
    )
  }

  return (
    <div>
      {bairros.length === 0 ? (
        <div className="vazio">Nenhum bairro cadastrado ainda.</div>
      ) : (
        <div className="lista">
          {bairros.map((b) => (
            <button key={b.nome} className="cartao cartao-clicavel" onClick={() => setBairroSelecionado(b.nome)}>
              <div className="cartao-topo">
                <div className="cartao-nome">{b.nome}</div>
                <span className="selo selo-em-dia">
                  {b.total_clientes} {b.total_clientes === 1 ? 'cliente' : 'clientes'}
                </span>
              </div>
            </button>
          ))}
        </div>
      )}
    </div>
  )
}
