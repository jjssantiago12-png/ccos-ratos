import { useEffect, useState } from 'react'
import { useLiveQuery } from 'dexie-react-hooks'
import { sincronizar, aoMudarStatusSync, getUltimoErroSync, type SyncStatus } from '../sync/syncEngine'
import { syncConfigurado } from '../sync/supabaseClient'
import { contarPendentesSync, limparTudoLocal } from '../db/repo'

const TEXTO: Record<SyncStatus, string> = {
  desligado: 'Sem sincronização na nuvem configurada — dados só neste aparelho',
  ocioso: 'Sincronizado',
  sincronizando: 'Sincronizando...',
  erro: 'Erro ao sincronizar',
}

export default function BarraSync() {
  const [status, setStatus] = useState<SyncStatus>(syncConfigurado ? 'ocioso' : 'desligado')
  const pendentes = useLiveQuery(() => contarPendentesSync(), [], 0)

  useEffect(() => aoMudarStatusSync(setStatus), [])

  const texto = status === 'erro' && getUltimoErroSync() ? `Erro: ${getUltimoErroSync()}` : TEXTO[status]

  async function recarregar() {
    const aviso =
      pendentes > 0
        ? `Esse aparelho tem ${pendentes} alteração(ões) que ainda não foram enviadas pro servidor — recarregar agora vai PERDER elas. `
        : ''
    const ok = window.confirm(
      `${aviso}Isso apaga tudo que está salvo só neste aparelho e baixa a versão mais atual do servidor de novo. Usar só se a lista aqui estiver com dado errado/duplicado. Confirma?`
    )
    if (!ok) return
    await limparTudoLocal()
    await sincronizar()
  }

  return (
    <div className="barra-sync">
      <span className={`ponto-sync ${status}`} />
      <span>
        {texto}
        {pendentes > 0 && status !== 'sincronizando' ? ` · ${pendentes} pendente(s)` : ''}
      </span>
      {syncConfigurado && (
        <div style={{ marginLeft: 'auto', display: 'flex', gap: 6 }}>
          <button className="btn-secundario btn-pequeno" onClick={recarregar} disabled={status === 'sincronizando'}>
            Recarregar
          </button>
          <button className="btn-secundario btn-pequeno" onClick={() => sincronizar()} disabled={status === 'sincronizando'}>
            Sincronizar agora
          </button>
        </div>
      )}
    </div>
  )
}
