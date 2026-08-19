import { useState, type FormEvent } from 'react'
import type { VendaCalculada } from '../types'
import { registrarPagamento } from '../db/repo'
import { getNomeFuncionario } from '../lib/sessao'

function formatarMoeda(valor: number): string {
  return valor.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })
}

export default function FormBaixa({ venda, onFechar }: { venda: VendaCalculada; onFechar: () => void }) {
  const [valor, setValor] = useState(String(venda.restante))
  const [observacao, setObservacao] = useState('')
  const [salvando, setSalvando] = useState(false)
  const [erro, setErro] = useState('')

  async function enviar(e: FormEvent) {
    e.preventDefault()
    setErro('')
    const valorNum = Number(valor.replace(',', '.'))
    if (!valorNum || valorNum <= 0) {
      setErro('Digita um valor válido')
      return
    }
    setSalvando(true)
    try {
      await registrarPagamento(venda.id, valorNum, observacao.trim(), getNomeFuncionario())
      onFechar()
    } finally {
      setSalvando(false)
    }
  }

  return (
    <div className="overlay" onClick={onFechar}>
      <div className="folha" onClick={(e) => e.stopPropagation()}>
        <h2>Dar baixa — {venda.cliente_nome}</h2>
        <p style={{ color: 'var(--texto-fraco)', marginTop: -8 }}>
          Em aberto: {formatarMoeda(venda.restante)}
        </p>
        <form onSubmit={enviar}>
          <div className="campo">
            <label>Valor recebido (R$)</label>
            <input
              type="tel"
              inputMode="decimal"
              value={valor}
              onChange={(e) => setValor(e.target.value)}
              autoFocus
            />
          </div>
          <div className="campo">
            <label>Observação (opcional)</label>
            <input value={observacao} onChange={(e) => setObservacao(e.target.value)} placeholder="Ex: pix, dinheiro" />
          </div>
          {erro && <div className="erro-texto">{erro}</div>}
          <div style={{ display: 'flex', gap: 10, marginTop: 6 }}>
            <button type="button" className="btn-secundario" onClick={onFechar}>
              Cancelar
            </button>
            <button type="submit" className="btn-primario" disabled={salvando} style={{ flex: 1 }}>
              {salvando ? 'Salvando...' : 'Confirmar baixa'}
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}
