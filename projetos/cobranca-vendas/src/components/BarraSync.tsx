import { useEffect, useState } from 'react'
import { useLiveQuery } from 'dexie-react-hooks'
import { sincronizar, aoMudarStatusSync, getUltimoErroSync, type SyncStatus } from '../sync/syncEngine'
import { syncConfigurado } from '../sync/supabaseClient'
import { contarPendentesSync } from '../db/repo'

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

  return (
    <div className="barra-sync">
      <span className={`ponto-sync ${status}`} />
      <span>
        {texto}
        {pendentes > 0 && status !== 'sincronizando' ? ` · ${pendentes} pendente(s)` : ''}
      </span>
      {syncConfigurado && (
        <button className="btn-secundario btn-pequeno" onClick={() => sincronizar()} disabled={status === 'sincronizando'}>
          Sincronizar agora
        </button>
      )}
    </div>
  )
}
