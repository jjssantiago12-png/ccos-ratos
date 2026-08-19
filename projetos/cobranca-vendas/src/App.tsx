import { lazy, Suspense, useEffect, useMemo, useState } from 'react'
import { useLiveQuery } from 'dexie-react-hooks'
import { db } from './db/dexie'
import { calcularVendas, ordenarPorRanking } from './lib/calculos'
import type { Venda, VendaCalculada } from './types'
import { estaLiberado } from './lib/sessao'
import { iniciarSyncAutomatico } from './sync/syncEngine'
import PortaoAcesso from './components/PortaoAcesso'
import CartaoVenda from './components/CartaoVenda'
import FormVenda from './components/FormVenda'
import FormBaixa from './components/FormBaixa'
import BarraSync from './components/BarraSync'

const ImportarPlanilha = lazy(() => import('./components/ImportarPlanilha'))

type Aba = 'ranking' | 'em-dia' | 'quitado' | 'todos'

const ABAS: { chave: Aba; label: string }[] = [
  { chave: 'ranking', label: 'Cobrar' },
  { chave: 'em-dia', label: 'Em dia' },
  { chave: 'quitado', label: 'Quitado' },
  { chave: 'todos', label: 'Todos' },
]

export default function App() {
  const [liberado, setLiberado] = useState(estaLiberado())

  useEffect(() => {
    if (liberado) return iniciarSyncAutomatico()
  }, [liberado])

  if (!liberado) return <PortaoAcesso onEntrar={() => setLiberado(true)} />
  return <AppPrincipal />
}

function AppPrincipal() {
  const vendasBrutas = useLiveQuery(() => db.vendas.toArray(), [], [] as Venda[])
  const [aba, setAba] = useState<Aba>('ranking')
  const [busca, setBusca] = useState('')
  const [vendaEmEdicao, setVendaEmEdicao] = useState<Venda | 'nova' | null>(null)
  const [vendaParaBaixa, setVendaParaBaixa] = useState<VendaCalculada | null>(null)
  const [importando, setImportando] = useState(false)

  const vendasCalculadas = useMemo(() => calcularVendas(vendasBrutas), [vendasBrutas])

  const filtradas = useMemo(() => {
    let lista = vendasCalculadas
    if (aba === 'ranking') lista = lista.filter((v) => v.status === 'Atrasado')
    else if (aba === 'em-dia') lista = lista.filter((v) => v.status === 'Em dia')
    else if (aba === 'quitado') lista = lista.filter((v) => v.status === 'Quitado')

    if (busca.trim()) {
      const termo = busca.trim().toLowerCase()
      lista = lista.filter((v) => v.cliente_nome.toLowerCase().includes(termo))
    }

    return aba === 'ranking' ? ordenarPorRanking(lista) : [...lista].sort((a, b) => a.cliente_nome.localeCompare(b.cliente_nome))
  }, [vendasCalculadas, aba, busca])

  return (
    <div className="app">
      <div className="topo">
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <h1>Cobrança Vendas</h1>
          <button className="btn-secundario btn-pequeno" onClick={() => setImportando(true)}>
            Importar planilha
          </button>
        </div>
        <div className="abas">
          {ABAS.map((a) => (
            <button key={a.chave} className={`aba ${aba === a.chave ? 'ativa' : ''}`} onClick={() => setAba(a.chave)}>
              {a.label}
            </button>
          ))}
        </div>
        <div className="busca">
          <input placeholder="Buscar cliente..." value={busca} onChange={(e) => setBusca(e.target.value)} />
        </div>
      </div>

      <div className="conteudo">
        {filtradas.length === 0 ? (
          <div className="vazio">Nenhuma venda por aqui ainda.</div>
        ) : (
          <div className="lista">
            {filtradas.map((v) => (
              <CartaoVenda
                key={v.id}
                venda={v}
                onDarBaixa={() => setVendaParaBaixa(v)}
                onEditar={() => setVendaEmEdicao(v)}
              />
            ))}
          </div>
        )}
      </div>

      <button className="fab" onClick={() => setVendaEmEdicao('nova')} aria-label="Nova venda">
        +
      </button>

      <BarraSync />

      {vendaEmEdicao && (
        <FormVenda
          vendaExistente={vendaEmEdicao === 'nova' ? undefined : vendaEmEdicao}
          onFechar={() => setVendaEmEdicao(null)}
        />
      )}
      {vendaParaBaixa && <FormBaixa venda={vendaParaBaixa} onFechar={() => setVendaParaBaixa(null)} />}
      {importando && (
        <Suspense fallback={null}>
          <ImportarPlanilha onFechar={() => setImportando(false)} />
        </Suspense>
      )}
    </div>
  )
}
