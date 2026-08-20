import { useState } from 'react'
import { importarPlanilhaControle, type ResultadoImportacao } from '../lib/importarPlanilha'
import { importarVendasEPagamentos, listarVendas } from '../db/repo'

type Etapa = 'escolher' | 'lendo' | 'revisar' | 'importando' | 'concluido'

export default function ImportarPlanilha({ onFechar }: { onFechar: () => void }) {
  const [etapa, setEtapa] = useState<Etapa>('escolher')
  const [resultado, setResultado] = useState<ResultadoImportacao | null>(null)
  const [erro, setErro] = useState('')

  async function aoEscolherArquivo(e: React.ChangeEvent<HTMLInputElement>) {
    const arquivo = e.target.files?.[0]
    if (!arquivo) return
    setErro('')
    setEtapa('lendo')
    try {
      const buffer = await arquivo.arrayBuffer()
      const vendasExistentes = await listarVendas()
      const res = await importarPlanilhaControle(buffer, vendasExistentes)
      setResultado(res)
      setEtapa('revisar')
    } catch (err) {
      setErro(err instanceof Error ? err.message : 'Não consegui ler esse arquivo.')
      setEtapa('escolher')
    }
  }

  async function confirmar() {
    if (!resultado) return
    setEtapa('importando')
    try {
      await importarVendasEPagamentos(resultado.vendas, resultado.pagamentos)
      setEtapa('concluido')
    } catch (err) {
      setErro(err instanceof Error ? err.message : 'Não consegui salvar a importação.')
      setEtapa('revisar')
    }
  }

  return (
    <div className="overlay" onClick={onFechar}>
      <div className="folha" onClick={(e) => e.stopPropagation()}>
        <h2>Importar planilha</h2>

        {etapa === 'escolher' && (
          <>
            <p style={{ color: 'var(--texto-fraco)' }}>
              Escolhe o arquivo .xlsx com a aba "CONTROLE" preenchida (tem um modelo em branco pronto em{' '}
              <code>projetos/cobranca-vendas/modelos/</code>, com instruções na aba "LEIA-ME"). Pode importar
              quantas vezes precisar — reimportar não duplica, só atualiza.
            </p>
            {erro && <div className="erro-texto">{erro}</div>}
            <input type="file" accept=".xlsx" onChange={aoEscolherArquivo} />
          </>
        )}

        {etapa === 'lendo' && <p>Lendo planilha...</p>}

        {etapa === 'revisar' && resultado && (
          <>
            <p>
              <strong>{resultado.vendas.length}</strong> vendas prontas pra importar, de {resultado.totalLinhas}{' '}
              linhas na planilha.
            </p>
            {erro && <div className="erro-texto">{erro}</div>}
            {resultado.avisos.length > 0 && (
              <div className="campo">
                <label>{resultado.avisos.length} linha(s) com algum detalhe pra revisar depois:</label>
                <div style={{ maxHeight: 180, overflowY: 'auto', fontSize: 13, color: 'var(--texto-fraco)' }}>
                  {resultado.avisos.map((a, i) => (
                    <div key={i} style={{ padding: '4px 0', borderBottom: '1px solid var(--borda)' }}>
                      linha {a.linha} — {a.cliente || '(sem nome)'}: {a.motivo}
                    </div>
                  ))}
                </div>
              </div>
            )}
            <div style={{ display: 'flex', gap: 10, marginTop: 6 }}>
              <button type="button" className="btn-secundario" onClick={onFechar}>
                Cancelar
              </button>
              <button type="button" className="btn-primario" style={{ flex: 1 }} onClick={confirmar}>
                Importar {resultado.vendas.length} vendas
              </button>
            </div>
          </>
        )}

        {etapa === 'importando' && <p>Importando...</p>}

        {etapa === 'concluido' && resultado && (
          <>
            <p>{resultado.vendas.length} vendas importadas com sucesso.</p>
            <button className="btn-primario btn-bloco" onClick={onFechar}>
              Fechar
            </button>
          </>
        )}
      </div>
    </div>
  )
}
