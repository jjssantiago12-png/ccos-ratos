import type { VendaCalculada } from '../types'

/** Normaliza celular BR pro formato E.164 que o wa.me espera (55 + DDD + número, só dígitos). */
export function normalizarCelularBR(celular: string): string {
  const digitos = celular.replace(/\D/g, '')
  if (digitos.startsWith('55') && digitos.length >= 12) return digitos
  return `55${digitos}`
}

function formatarMoeda(valor: number): string {
  return valor.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })
}

function formatarData(iso: string): string {
  const d = new Date(iso)
  return d.toLocaleDateString('pt-BR', { timeZone: 'UTC' })
}

export function mensagemCobranca(venda: VendaCalculada): string {
  const primeiroNome = venda.cliente_nome.trim().split(/\s+/)[0]
  const linhas = [
    `Oi, ${primeiroNome}! Tudo bem?`,
    '',
    `Passando pra lembrar que sua compra na Yago Modas venceu em ${formatarData(venda.data_vencimento)}` +
      (venda.dias_atraso > 0 ? ` (${venda.dias_atraso} dia(s) em atraso)` : '') +
      '.',
    `Valor em aberto: ${formatarMoeda(venda.restante)}`,
  ]
  if (venda.acrescimo > 0) {
    linhas.push(`(inclui acréscimo de ${formatarMoeda(venda.acrescimo)} por atraso)`)
  }
  linhas.push('', 'Pode me confirmar quando consegue regularizar? Qualquer dúvida, me chama por aqui 🙂')
  return linhas.join('\n')
}

export function linkCobrancaWhatsapp(venda: VendaCalculada): string {
  const numero = normalizarCelularBR(venda.cliente_celular)
  const texto = encodeURIComponent(mensagemCobranca(venda))
  return `https://wa.me/${numero}?text=${texto}`
}
