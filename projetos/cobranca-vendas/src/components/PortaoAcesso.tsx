import { useState, type FormEvent } from 'react'
import { conferirPin, getNomeFuncionario, setNomeFuncionario } from '../lib/sessao'

export default function PortaoAcesso({ onEntrar }: { onEntrar: () => void }) {
  const [nome, setNome] = useState(getNomeFuncionario())
  const [pin, setPin] = useState('')
  const [erro, setErro] = useState('')

  function enviar(e: FormEvent) {
    e.preventDefault()
    if (!nome.trim()) {
      setErro('Digita seu nome')
      return
    }
    if (!conferirPin(pin)) {
      setErro('Senha errada')
      return
    }
    setNomeFuncionario(nome)
    onEntrar()
  }

  return (
    <div className="portao">
      <h1>Cobrança Vendas</h1>
      <p style={{ color: 'var(--texto-fraco)', textAlign: 'center', marginTop: 0 }}>Yago Modas</p>
      <form onSubmit={enviar}>
        <div className="campo">
          <label>Seu nome</label>
          <input value={nome} onChange={(e) => setNome(e.target.value)} placeholder="Ex: Janio" autoFocus />
        </div>
        <div className="campo">
          <label>Senha do app</label>
          <input
            type="tel"
            inputMode="numeric"
            value={pin}
            onChange={(e) => setPin(e.target.value)}
            placeholder="••••"
          />
        </div>
        {erro && <div className="erro-texto">{erro}</div>}
        <button type="submit" className="btn-primario btn-bloco">
          Entrar
        </button>
      </form>
    </div>
  )
}
