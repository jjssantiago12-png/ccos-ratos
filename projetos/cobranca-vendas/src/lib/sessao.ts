const CHAVE_LIBERADO = 'cobranca_liberado'
const CHAVE_NOME = 'cobranca_nome_funcionario'

const PIN_ESPERADO = (import.meta.env.VITE_APP_PIN as string | undefined) ?? ''

export function pinExigido(): boolean {
  return PIN_ESPERADO.length > 0
}

export function estaLiberado(): boolean {
  if (!pinExigido()) return true
  return localStorage.getItem(CHAVE_LIBERADO) === '1'
}

export function conferirPin(tentativa: string): boolean {
  const ok = tentativa === PIN_ESPERADO
  if (ok) localStorage.setItem(CHAVE_LIBERADO, '1')
  return ok
}

export function getNomeFuncionario(): string {
  return localStorage.getItem(CHAVE_NOME) ?? ''
}

export function setNomeFuncionario(nome: string): void {
  localStorage.setItem(CHAVE_NOME, nome.trim())
}
