import Dexie, { type EntityTable } from 'dexie'
import type { Venda, Pagamento } from '../types'

export interface MetaRow {
  chave: string
  valor: string
}

class CobrancaDB extends Dexie {
  vendas!: EntityTable<Venda, 'id'>
  pagamentos!: EntityTable<Pagamento, 'id'>
  meta!: EntityTable<MetaRow, 'chave'>

  constructor() {
    super('cobranca-vendas')
    this.version(1).stores({
      // synced_at indexado como número (0 = pendente) — Dexie não indexa `null` de forma confiável
      vendas: 'id, synced_at, updated_at, regiao, data_vencimento',
      pagamentos: 'id, venda_id, synced_at',
      meta: 'chave',
    })
  }
}

export const db = new CobrancaDB()

export function novoId(): string {
  return crypto.randomUUID()
}

export function agoraISO(): string {
  return new Date().toISOString()
}

export async function getCursor(chave: string): Promise<string | null> {
  const row = await db.meta.get(chave)
  return row?.valor ?? null
}

export async function setCursor(chave: string, iso: string): Promise<void> {
  await db.meta.put({ chave, valor: iso })
}
