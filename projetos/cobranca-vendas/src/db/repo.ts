import { db, novoId, agoraISO } from './dexie'
import type { Venda, Pagamento, Origem } from '../types'

export interface NovaVendaInput {
  cliente_nome: string
  cliente_celular: string
  regiao: string
  bairro: string
  codigo_cliente: string
  data_venda: string
  data_vencimento: string
  valor_devido: number
  observacoes: string
  origem: Origem
}

export async function criarVenda(input: NovaVendaInput): Promise<Venda> {
  const agora = agoraISO()
  const venda: Venda = {
    id: novoId(),
    ...input,
    valor_pago: 0,
    data_ultimo_pagamento: null,
    created_at: agora,
    updated_at: agora,
    synced_at: 0,
  }
  await db.vendas.add(venda)
  return venda
}

export async function editarVenda(
  id: string,
  alteracoes: Partial<Omit<Venda, 'id' | 'valor_pago' | 'data_ultimo_pagamento' | 'created_at' | 'synced_at'>>
): Promise<void> {
  await db.vendas.update(id, { ...alteracoes, updated_at: agoraISO(), synced_at: 0 })
}

/** Registra uma baixa (pagamento) e recalcula valor_pago/data_ultimo_pagamento localmente pela soma real dos pagamentos. */
export async function registrarPagamento(
  vendaId: string,
  valor: number,
  observacao: string,
  registradoPor: string
): Promise<void> {
  const agora = agoraISO()
  const pagamento: Pagamento = {
    id: novoId(),
    venda_id: vendaId,
    valor,
    data: agora,
    observacao,
    registrado_por: registradoPor,
    synced_at: 0,
  }

  await db.transaction('rw', db.pagamentos, db.vendas, async () => {
    await db.pagamentos.add(pagamento)
    const todosPagamentos = await db.pagamentos.where('venda_id').equals(vendaId).toArray()
    const totalPago = round2(todosPagamentos.reduce((soma, p) => soma + p.valor, 0))
    const ultimaData = todosPagamentos.reduce<string | null>((max, p) => (!max || p.data > max ? p.data : max), null)
    await db.vendas.update(vendaId, {
      valor_pago: totalPago,
      data_ultimo_pagamento: ultimaData,
      updated_at: agora,
      synced_at: 0,
    })
  })
}

export async function listarVendas(): Promise<Venda[]> {
  return db.vendas.toArray()
}

export async function listarPagamentos(vendaId: string): Promise<Pagamento[]> {
  return db.pagamentos.where('venda_id').equals(vendaId).sortBy('data')
}

/** bulkPut faz upsert por id — reimportar a mesma planilha não duplica nada. */
export async function importarVendasEPagamentos(vendas: Venda[], pagamentos: Pagamento[]): Promise<void> {
  await db.transaction('rw', db.vendas, db.pagamentos, async () => {
    await db.vendas.bulkPut(vendas)
    await db.pagamentos.bulkPut(pagamentos)
  })
}

export async function contarPendentesSync(): Promise<number> {
  const [vendasPendentes, pagamentosPendentes] = await Promise.all([
    db.vendas.where('synced_at').equals(0).count(),
    db.pagamentos.where('synced_at').equals(0).count(),
  ])
  return vendasPendentes + pagamentosPendentes
}

function round2(n: number): number {
  return Math.round(n * 100) / 100
}
