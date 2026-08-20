import { Component, type ReactNode } from 'react'

interface Props {
  children: ReactNode
}

interface State {
  erro: Error | null
}

/** Sem isso, um erro de render (já aconteceu de verdade nesse app: bug de duplicação,
 * colisão de parcela) vira tela branca silenciosa pro pai na rua, sem nenhuma pista do
 * que fazer — ele só saberia ligando pra reclamar. */
export default class ErroFatal extends Component<Props, State> {
  state: State = { erro: null }

  static getDerivedStateFromError(erro: Error): State {
    return { erro }
  }

  async recarregar() {
    // limpa o cache do service worker também — se o erro veio de uma versão quebrada
    // já instalada, só dar F5 poderia continuar servindo a mesma versão do cache
    try {
      const registros = await navigator.serviceWorker?.getRegistrations()
      await Promise.all(registros?.map((r) => r.unregister()) ?? [])
      const chaves = await caches?.keys()
      await Promise.all(chaves?.map((c) => caches.delete(c)) ?? [])
    } catch {
      // se limpar cache falhar, ainda vale tentar recarregar do jeito normal
    }
    window.location.reload()
  }

  render() {
    if (!this.state.erro) return this.props.children

    return (
      <div className="portao">
        <h1>Ops, algo deu errado</h1>
        <p style={{ color: 'var(--texto-fraco)', textAlign: 'center', maxWidth: 320 }}>
          O app travou numa tela. Seus dados estão salvos — isso não apaga nada. Toca no botão abaixo pra tentar de
          novo.
        </p>
        <button className="btn-primario" onClick={() => this.recarregar()}>
          Recarregar o app
        </button>
        <p style={{ color: 'var(--texto-fraco)', fontSize: 12, marginTop: 24, maxWidth: 320, textAlign: 'center' }}>
          Se continuar acontecendo, avisa o Yago com essa mensagem: {this.state.erro.message}
        </p>
      </div>
    )
  }
}
