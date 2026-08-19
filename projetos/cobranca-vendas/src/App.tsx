import { lazy, Suspense, useEffect, useMemo, useState } from 'react'
import { useLiveQuery } from 'dexie-react-hooks'
import { db } from './db/dexie'
import { calcularVendas, ordenarPorRanking, vendaNoFiltroData, type FiltroData } from './lib/calculos'
import { exportarPlanilhaControle } from './lib/exportarPlanilha'
import type { Venda, VendaCalculada, Pagamento } from './types'
import { estaLiberado } from './lib/sessao'
import { iniciarSyncAutomatico } from './sync/syncEngine'
import PortaoAcesso from './components/PortaoAcesso'
import CartaoVenda from './components/CartaoVenda'
import FormVenda from './components/FormVenda'
import FormBaixa from './components/FormBaixa'
import BarraSync from './components/BarraSync'
import ClientesPorBairro from './components/ClientesPorBairro'
import HistoricoBaixas from './components/HistoricoBaixas'
import Dashboard from './components/Dashboard'

const ImportarPlanilha = lazy(() => import('./components/ImportarPlanilha'))

type Aba = 'ranking' | 'em-dia' | 'quitado' | 'todos'
type Modo = 'vendas' | 'bairros' | 'baixas' | 'dashboard'

const ABAS: { chave: Aba; label: string }[] = [
  { chave: 'ranking', label: 'Cobrar' },
  { chave: 'em-dia', label: 'Em dia' },
  { chave: 'quitado', label: 'Quitado' },
  { chave: 'todos', label: 'Todos' },
]

const MODOS: { chave: Modo; label: string }[] = [
  { chave: 'vendas', label: 'Vendas' },
  { chave: 'bairros', label: 'Por bairro' },
  { chave: 'baixas', label: 'Baixas' },
  { chave: 'dashboard', label: 'Dashboard' },
]

const FILTROS_DATA: { chave: FiltroData; label: string }[] = [
  { chave: 'todas', label: 'Qualquer vencimento' },
  { chave: 'semana', label: 'Vence essa semana' },
  { chave: 'mes', label: 'Vence esse mês' },
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
  const pagamentosBrutos = useLiveQuery(() => db.pagamentos.toArray(), [], [] as Pagamento[])
  const [modo, setModo] = useState<Modo>('vendas')
  const [aba, setAba] = useState<Aba>('ranking')
  const [busca, setBusca] = useState('')
  const [filtroData, setFiltroData] = useState<FiltroData>('todas')
  const [vendaEmEdicao, setVendaEmEdicao] = useState<Venda | 'nova' | null>(null)
  const [vendaParaBaixa, setVendaParaBaixa] = useState<VendaCalculada | null>(null)
  const [importando, setImportando] = useState(false)
  const [exportando, setExportando] = useState(false)

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

    if (filtroData !== 'todas') lista = lista.filter((v) => vendaNoFiltroData(v, filtroData))

    return aba === 'ranking' ? ordenarPorRanking(lista) : [...lista].sort((a, b) => a.cliente_nome.localeCompare(b.cliente_nome))
  }, [vendasCalculadas, aba, busca, filtroData])

  async function exportar() {
    setExportando(true)
    try {
      await exportarPlanilhaControle(vendasCalculadas)
    } finally {
      setExportando(false)
    }
  }

  return (
    <div className="app">
      <div className="topo">
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <h1>Cobrança Vendas</h1>
          <div style={{ display: 'flex', gap: 6 }}>
            <button
              className="btn-secundario btn-pequeno"
              onClick={exportar}
              disabled={exportando || vendasCalculadas.length === 0}
            >
              {exportando ? '...' : 'Exportar'}
            </button>
            <button className="btn-secundario btn-pequeno" onClick={() => setImportando(true)}>
              Importar
            </button>
          </div>
        </div>
        <div className="abas">
          {MODOS.map((m) => (
            <button key={m.chave} className={`aba ${modo === m.chave ? 'ativa' : ''}`} onClick={() => setModo(m.chave)}>
              {m.label}
            </button>
          ))}
        </div>
        {(modo === 'vendas' || modo === 'bairros') && (
          <div className="busca">
            <select value={filtroData} onChange={(e) => setFiltroData(e.target.value as FiltroData)}>
              {FILTROS_DATA.map((f) => (
                <option key={f.chave} value={f.chave}>
                  {f.label}
                </option>
              ))}
            </select>
          </div>
        )}
        {modo === 'vendas' && (
          <div className="abas" style={{ marginTop: 8 }}>
            {ABAS.map((a) => (
              <button key={a.chave} className={`aba ${aba === a.chave ? 'ativa' : ''}`} onClick={() => setAba(a.chave)}>
                {a.label}
              </button>
            ))}
          </div>
        )}
        {(modo === 'vendas' || modo === 'baixas') && (
          <div className="busca">
            <input placeholder="Buscar cliente..." value={busca} onChange={(e) => setBusca(e.target.value)} />
          </div>
        )}
      </div>

      <div className="conteudo">
        {modo === 'bairros' ? (
          <ClientesPorBairro
            vendas={vendasCalculadas}
            filtroData={filtroData}
            onDarBaixa={setVendaParaBaixa}
            onEditar={setVendaEmEdicao}
          />
        ) : modo === 'baixas' ? (
          <HistoricoBaixas pagamentos={pagamentosBrutos} vendas={vendasCalculadas} busca={busca} />
        ) : modo === 'dashboard' ? (
          <Dashboard vendas={vendasCalculadas} pagamentos={pagamentosBrutos} />
        ) : filtradas.length === 0 ? (
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
