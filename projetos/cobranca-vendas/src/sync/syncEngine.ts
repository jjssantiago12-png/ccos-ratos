import { db, getCursor, setCursor } from '../db/dexie'
import { listarExclusoesPendentesParaSync, removerExclusaoPendente } from '../db/repo'
import { supabase, syncConfigurado } from './supabaseClient'
import type { Venda, Pagamento } from '../types'

const CURSOR_VENDAS = 'cursor_sync_vendas'
const CURSOR_PAGAMENTOS = 'cursor_sync_pagamentos'
const TAMANHO_PAGINA = 500

export type SyncStatus = 'desligado' | 'ocioso' | 'sincronizando' | 'erro'

let emAndamento = false
let ultimoErro: string | null = null
const ouvintes = new Set<(status: SyncStatus) => void>()

function notificar(status: SyncStatus) {
  ouvintes.forEach((fn) => fn(status))
}

export function aoMudarStatusSync(fn: (status: SyncStatus) => void): () => void {
  ouvintes.add(fn)
  return () => ouvintes.delete(fn)
}

export function getUltimoErroSync(): string | null {
  return ultimoErro
}

// Erro do Supabase (PostgrestError) não estende `Error` — `instanceof Error` falha e
// `String(e)` num objeto plano vira o inútil "[object Object]". `.message` existe nos
// dois casos (Error nativo e PostgrestError), então checa por ele direto.
function mensagemDeErro(e: unknown): string {
  if (e instanceof Error) return e.message
  if (e && typeof e === 'object' && 'message' in e && typeof (e as { message: unknown }).message === 'string') {
    return (e as { message: string }).message
  }
  try {
    return JSON.stringify(e)
  } catch {
    return String(e)
  }
}

// Traduz os erros mais comuns (queda de conexão, projeto Supabase pausado por
// inatividade — acontece sozinho depois de ~7 dias sem uso no plano gratuito) pra uma
// frase que quem não é técnico entende e sabe o que fazer. Erros que não reconhece
// aparecem como vieram, pra não esconder informação útil numa falha nova/rara.
export function mensagemAmigavel(erroTecnico: string): string {
  const texto = erroTecnico.toLowerCase()
  if (texto.includes('failed to fetch') || texto.includes('networkerror') || texto.includes('load failed')) {
    return 'sem internet no momento — vai sincronizar sozinho assim que voltar o sinal'
  }
  if (texto.includes('timeout') || texto.includes('timed out')) {
    return 'conexão lenta demais agora — vai tentar de novo em instantes'
  }
  return `${erroTecnico} — se continuar acontecendo por muito tempo, o projeto na nuvem pode estar pausado por inatividade (avisa quem administra)`
}

async function pushPagamentos(): Promise<void> {
  const pendentes = await db.pagamentos.where('synced_at').equals(0).toArray()
  if (pendentes.length === 0) return

  const linhas = pendentes.map((p) => ({
    id: p.id,
    venda_id: p.venda_id,
    valor: p.valor,
    data: p.data,
    observacao: p.observacao,
    registrado_por: p.registrado_por,
  }))

  // ignoreDuplicates (ON CONFLICT DO NOTHING): pagamento é append-only por design — se o
  // id já existe no servidor (ex: reimportar uma planilha manda de novo o mesmo
  // "pagamento-importado"), a intenção é só confirmar que já está lá, nunca sobrescrever.
  // Com onConflict simples (DO UPDATE) isso exigia uma policy de UPDATE que não existe
  // de propósito nessa tabela — sem ignoreDuplicates, esse upsert dava erro de permissão
  // e travava a sincronização de pagamentos inteira, incluindo baixas reais atrás dele
  // na fila (bug real encontrado no diagnóstico).
  const { error } = await supabase!.from('pagamentos').upsert(linhas, { onConflict: 'id', ignoreDuplicates: true })
  if (error) throw error

  const agora = Date.now()
  await db.pagamentos.bulkUpdate(pendentes.map((p) => ({ key: p.id, changes: { synced_at: agora } })))
}

/** Erros de linha (ex: uma venda com dado inválido pro schema) não devem travar as
 * outras 575 atrás dela — sincroniza cada uma independente e só falha a sincronização
 * inteira se TODAS as pendentes derem erro. As que passaram já ficam marcadas como
 * sincronizadas; na próxima tentativa só sobra quem realmente precisa ser corrigida. */
async function pushVendas(): Promise<void> {
  const pendentes = await db.vendas.where('synced_at').equals(0).toArray()
  let sucessos = 0
  const erros: string[] = []

  for (const v of pendentes) {
    const { error } = await supabase!.rpc('upsert_venda', {
      p_id: v.id,
      p_cliente_nome: v.cliente_nome,
      p_cliente_celular: v.cliente_celular,
      p_regiao: v.regiao,
      p_bairro: v.bairro,
      p_codigo_cliente: v.codigo_cliente,
      p_data_venda: v.data_venda,
      p_data_vencimento: v.data_vencimento,
      p_valor_devido: v.valor_devido,
      p_observacoes: v.observacoes,
      p_origem: v.origem,
      p_created_at: v.created_at,
      p_updated_at: v.updated_at,
    })
    if (error) {
      erros.push(`${v.cliente_nome} (${mensagemDeErro(error)})`)
      continue
    }
    await db.vendas.update(v.id, { synced_at: Date.now() })
    sucessos++
  }

  if (erros.length > 0) {
    const amostra = erros.slice(0, 3).join(' · ')
    throw new Error(
      `${erros.length} de ${pendentes.length} vendas não sincronizaram (${sucessos} ok): ${amostra}${erros.length > 3 ? ' · ...' : ''}`
    )
  }
}

/** Propaga exclusões feitas localmente (ver `excluirVenda` em repo.ts) pro servidor via
 * soft delete (`excluido_em`) — sem isso a venda apagada só sumia daquele aparelho e
 * voltava no próximo pull, porque o servidor nunca ficava sabendo (bug real). */
async function pushExclusoes(): Promise<void> {
  const pendentes = await listarExclusoesPendentesParaSync()
  if (pendentes.length === 0) return

  const agora = new Date().toISOString()
  const falhas: string[] = []
  for (const id of pendentes) {
    const { error } = await supabase!.from('vendas').update({ excluido_em: agora, updated_at: agora }).eq('id', id)
    if (error) {
      falhas.push(id)
      continue
    }
    await removerExclusaoPendente(id)
  }
  if (falhas.length > 0) {
    throw new Error(`${falhas.length} exclusão(ões) ainda não confirmadas no servidor — tentando de novo`)
  }
}

/** Busca em páginas (Postgrest limita ~1000 linhas por resposta por padrão) — sem isso,
 * uma carteira grande o bastante fazia o pull trazer só uma fatia, avançar o cursor além
 * do que foi realmente salvo, e truncar o resto da carteira silenciosamente pra sempre
 * (a carteira já bateu 1146 linhas uma vez, então isso é um risco real, não teórico).
 * `.gte()` (inclusive) em vez de `.gt()`: reconsulta a última linha da página anterior de
 * propósito — bulkPut é upsert por id, então isso é inofensivo — pra nunca pular uma
 * linha que compartilhe o exato mesmo instante da fronteira da página. */
async function pullVendas(cursorInicial: string | null): Promise<void> {
  let cursor = cursorInicial
  for (;;) {
    let query = supabase!.from('vendas').select('*').order('atualizado_em', { ascending: true }).limit(TAMANHO_PAGINA)
    if (cursor) query = query.gte('atualizado_em', cursor)
    const { data, error } = await query
    if (error) throw error
    if (!data || data.length === 0) return

    const agora = Date.now()
    const paraSalvar: Venda[] = []
    const idsParaRemover: string[] = []
    for (const r of data) {
      // excluido_em preenchido = venda apagada por alguém (ver pushExclusoes/excluirVenda)
      // — remove localmente em vez de trazer de volta pra tela.
      if (r.excluido_em) {
        idsParaRemover.push(r.id)
        continue
      }
      paraSalvar.push({
        id: r.id,
        cliente_nome: r.cliente_nome,
        cliente_celular: r.cliente_celular,
        regiao: r.regiao,
        bairro: r.bairro,
        codigo_cliente: r.codigo_cliente,
        data_venda: r.data_venda,
        data_vencimento: r.data_vencimento,
        valor_devido: Number(r.valor_devido),
        valor_pago: Number(r.valor_pago),
        data_ultimo_pagamento: r.data_ultimo_pagamento,
        observacoes: r.observacoes,
        origem: r.origem,
        created_at: r.created_at,
        updated_at: r.updated_at,
        synced_at: agora,
      })
    }

    await db.transaction('rw', db.vendas, db.pagamentos, async () => {
      if (paraSalvar.length > 0) await db.vendas.bulkPut(paraSalvar)
      for (const id of idsParaRemover) {
        await db.pagamentos.where('venda_id').equals(id).delete()
        await db.vendas.delete(id)
      }
    })

    const ultimo = data[data.length - 1].atualizado_em
    cursor = ultimo
    await setCursor(CURSOR_VENDAS, ultimo)
    if (data.length < TAMANHO_PAGINA) return
  }
}

async function pullPagamentos(cursorInicial: string | null): Promise<void> {
  let cursor = cursorInicial
  for (;;) {
    let query = supabase!.from('pagamentos').select('*').order('criado_em', { ascending: true }).limit(TAMANHO_PAGINA)
    if (cursor) query = query.gte('criado_em', cursor)
    const { data, error } = await query
    if (error) throw error
    if (!data || data.length === 0) return

    const agora = Date.now()
    const linhas: Pagamento[] = data.map((r) => ({
      id: r.id,
      venda_id: r.venda_id,
      valor: Number(r.valor),
      data: r.data,
      observacao: r.observacao,
      registrado_por: r.registrado_por,
      synced_at: agora,
    }))
    await db.pagamentos.bulkPut(linhas)

    const ultimo = data[data.length - 1].criado_em
    cursor = ultimo
    await setCursor(CURSOR_PAGAMENTOS, ultimo)
    if (data.length < TAMANHO_PAGINA) return
  }
}

export async function sincronizar(): Promise<void> {
  if (!syncConfigurado || !supabase) {
    notificar('desligado')
    return
  }
  if (emAndamento) return
  emAndamento = true
  notificar('sincronizando')
  // push antes do pull, pra edição local em andamento não ser atropelada por um pull que
  // ainda não a viu. Vendas SEMPRE antes de pagamentos — pagamentos.venda_id referencia
  // vendas(id) no banco, então mandar um pagamento antes da venda dele existir no servidor
  // quebra a foreign key e travava a sincronização inteira (bug real encontrado: vendas
  // recém-importadas já vêm com um pagamento junto quando têm valor pago, e a ordem
  // antiga tentava esse pagamento primeiro). Erro no push não impede o pull de rodar —
  // mesmo se algumas vendas não sincronizarem, ainda vale trazer o que os outros já mandaram.
  let erroPush: unknown = null
  try {
    await pushVendas()
  } catch (e) {
    erroPush = e
  }
  try {
    await pushPagamentos()
  } catch (e) {
    erroPush = erroPush ?? e
  }
  try {
    await pushExclusoes()
  } catch (e) {
    erroPush = erroPush ?? e
  }

  try {
    await pullVendas(await getCursor(CURSOR_VENDAS))
    await pullPagamentos(await getCursor(CURSOR_PAGAMENTOS))
    if (erroPush) throw erroPush
    ultimoErro = null
    notificar('ocioso')
  } catch (e) {
    ultimoErro = mensagemAmigavel(mensagemDeErro(e))
    notificar('erro')
  } finally {
    emAndamento = false
  }
}

let intervaloId: ReturnType<typeof setInterval> | null = null

/** Liga os gatilhos de sync: ao abrir o app, ao voltar internet, e um intervalo leve de segurança. */
export function iniciarSyncAutomatico(): () => void {
  if (!syncConfigurado) return () => {}

  void sincronizar()
  const aoFicarOnline = () => void sincronizar()
  window.addEventListener('online', aoFicarOnline)
  intervaloId = setInterval(() => void sincronizar(), 90_000)

  return () => {
    window.removeEventListener('online', aoFicarOnline)
    if (intervaloId) clearInterval(intervaloId)
  }
}
