import { useMemo, useState, type FormEvent } from 'react'
import type { Venda, Origem } from '../types'
import { REGIOES, BAIRROS_GRANDE_VITORIA } from '../lib/listas'
import { criarVenda, editarVenda, excluirVenda } from '../db/repo'

function hojeISO(): string {
  return new Date().toISOString().slice(0, 10)
}

function em30DiasISO(): string {
  const d = new Date()
  d.setDate(d.getDate() + 30)
  return d.toISOString().slice(0, 10)
}

export default function FormVenda({ vendaExistente, onFechar }: { vendaExistente?: Venda; onFechar: () => void }) {
  const [nome, setNome] = useState(vendaExistente?.cliente_nome ?? '')
  const [celular, setCelular] = useState(vendaExistente?.cliente_celular ?? '')
  const [regiao, setRegiao] = useState<string>(vendaExistente?.regiao ?? 'Grande Vitória')
  // se a venda veio da planilha com uma região fora da lista conhecida (ex: "(conferir)"),
  // inclui ela como opção extra pra não sumir do formulário nem forçar troca sem querer
  const opcoesRegiao = useMemo(
    () => (REGIOES.includes(regiao as (typeof REGIOES)[number]) ? REGIOES : [regiao, ...REGIOES]),
    [regiao]
  )
  const [bairro, setBairro] = useState(vendaExistente?.bairro ?? '')
  const [codigoCliente, setCodigoCliente] = useState(vendaExistente?.codigo_cliente ?? '')
  const [dataVenda, setDataVenda] = useState(vendaExistente?.data_venda ?? hojeISO())
  const [dataVencimento, setDataVencimento] = useState(vendaExistente?.data_vencimento ?? em30DiasISO())
  const [valorDevido, setValorDevido] = useState(vendaExistente ? String(vendaExistente.valor_devido) : '')
  const [observacoes, setObservacoes] = useState(vendaExistente?.observacoes ?? '')
  const [origem, setOrigem] = useState<Origem>(vendaExistente?.origem ?? 'Campo')
  const [salvando, setSalvando] = useState(false)
  const [excluindo, setExcluindo] = useState(false)
  const [erro, setErro] = useState('')

  async function enviar(e: FormEvent) {
    e.preventDefault()
    setErro('')
    const valor = Number(valorDevido.replace(',', '.'))
    if (!nome.trim() || !celular.trim() || !valor || valor <= 0) {
      setErro('Preenche nome, celular e valor')
      return
    }
    setSalvando(true)
    try {
      const dados = {
        cliente_nome: nome.trim(),
        cliente_celular: celular.trim(),
        regiao,
        bairro: regiao === 'Grande Vitória' ? bairro.trim() : '',
        codigo_cliente: codigoCliente.trim(),
        data_venda: dataVenda,
        data_vencimento: dataVencimento,
        valor_devido: valor,
        observacoes: observacoes.trim(),
        origem,
      }
      if (vendaExistente) {
        await editarVenda(vendaExistente.id, dados)
      } else {
        await criarVenda(dados)
      }
      onFechar()
    } finally {
      setSalvando(false)
    }
  }

  async function excluir() {
    if (!vendaExistente) return
    const ok = window.confirm(
      `Excluir de vez o lançamento de "${vendaExistente.cliente_nome}" (${vendaExistente.valor_devido.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })})? Essa ação não pode ser desfeita.`
    )
    if (!ok) return
    setExcluindo(true)
    try {
      await excluirVenda(vendaExistente.id)
      onFechar()
    } finally {
      setExcluindo(false)
    }
  }

  return (
    <div className="overlay" onClick={onFechar}>
      <div className="folha" onClick={(e) => e.stopPropagation()}>
        <h2>{vendaExistente ? 'Editar venda' : 'Nova venda a prazo'}</h2>
        <form onSubmit={enviar}>
          <div className="campo">
            <label>Nome do cliente</label>
            <input value={nome} onChange={(e) => setNome(e.target.value)} autoFocus />
          </div>
          <div className="campo">
            <label>Celular (com DDD)</label>
            <input
              type="tel"
              value={celular}
              onChange={(e) => setCelular(e.target.value)}
              placeholder="(27) 99999-9999"
            />
          </div>
          <div className="linha-2">
            <div className="campo">
              <label>Região/Cidade</label>
              <select value={regiao} onChange={(e) => setRegiao(e.target.value)}>
                {opcoesRegiao.map((r) => (
                  <option key={r} value={r}>
                    {r}
                  </option>
                ))}
              </select>
            </div>
            {regiao === 'Grande Vitória' ? (
              <div className="campo">
                <label>Bairro</label>
                <select value={bairro} onChange={(e) => setBairro(e.target.value)}>
                  <option value="">Selecionar</option>
                  {BAIRROS_GRANDE_VITORIA.map((b) => (
                    <option key={b} value={b}>
                      {b}
                    </option>
                  ))}
                </select>
              </div>
            ) : (
              <div className="campo">
                <label>Código do cliente (opcional)</label>
                <input value={codigoCliente} onChange={(e) => setCodigoCliente(e.target.value)} />
              </div>
            )}
          </div>
          <div className="linha-2">
            <div className="campo">
              <label>Data da venda</label>
              <input type="date" value={dataVenda} onChange={(e) => setDataVenda(e.target.value)} />
            </div>
            <div className="campo">
              <label>Vencimento combinado</label>
              <input type="date" value={dataVencimento} onChange={(e) => setDataVencimento(e.target.value)} />
            </div>
          </div>
          <div className="campo">
            <label>Valor da venda (R$)</label>
            <input
              type="tel"
              inputMode="decimal"
              value={valorDevido}
              onChange={(e) => setValorDevido(e.target.value)}
              placeholder="0,00"
            />
          </div>
          <div className="campo">
            <label>Origem</label>
            <select value={origem} onChange={(e) => setOrigem(e.target.value as Origem)}>
              <option value="Campo">Campo — venda ainda sem nota fiscal</option>
              <option value="LIDER">LIDER — já lançada no sistema principal</option>
            </select>
          </div>
          <div className="campo">
            <label>Observações (forma de pagamento, nº do pedido, etc.)</label>
            <textarea rows={2} value={observacoes} onChange={(e) => setObservacoes(e.target.value)} />
          </div>
          {erro && <div className="erro-texto">{erro}</div>}
          <div style={{ display: 'flex', gap: 10, marginTop: 6 }}>
            <button type="button" className="btn-secundario" onClick={onFechar}>
              Cancelar
            </button>
            <button type="submit" className="btn-primario" disabled={salvando} style={{ flex: 1 }}>
              {salvando ? 'Salvando...' : 'Salvar'}
            </button>
          </div>
          {vendaExistente && (
            <button
              type="button"
              className="btn-secundario btn-bloco"
              onClick={excluir}
              disabled={excluindo}
              style={{ marginTop: 10, color: 'var(--vermelho)' }}
            >
              {excluindo ? 'Excluindo...' : 'Excluir esse lançamento'}
            </button>
          )}
        </form>
      </div>
    </div>
  )
}
