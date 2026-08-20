import { db, novoId, agoraISO, getCursor, setCursor } from './dexie'
import type { Venda, Pagamento, Origem } from '../types'

const CHAVE_EXCLUSOES_PENDENTES = 'exclusoes_pendentes'

async function listarExclusoesPendentes(): Promise<string[]> {
  const valor = await getCursor(CHAVE_EXCLUSOES_PENDENTES)
  return valor ? (JSON.parse(valor) as string[]) : []
}

async function marcarExclusaoPendente(id: string): Promise<void> {
  const atuais = await listarExclusoesPendentes()
  if (!atuais.includes(id)) await setCursor(CHAVE_EXCLUSOES_PENDENTES, JSON.stringify([...atuais, id]))
}

/** Chamado pelo sync engine depois de confirmar a exclusão no servidor. */
export async function removerExclusaoPendente(id: string): Promise<void> {
  const atuais = await listarExclusoesPendentes()
  await setCursor(CHAVE_EXCLUSOES_PENDENTES, JSON.stringify(atuais.filter((x) => x !== id)))
}

/** Usado pelo sync engine pra saber quais exclusões locais ainda precisam ser
 * propagadas (soft delete) pro servidor. */
export async function listarExclusoesPendentesParaSync(): Promise<string[]> {
  return listarExclusoesPendentes()
}

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

/** Apaga uma venda e marca a exclusão como pendente pro sync engine propagar (soft
 * delete) pro servidor na próxima sincronização — sem isso, a venda "voltava" pro
 * aparelho no próximo pull (bug real: era só local, o servidor nunca ficava sabendo).
 * Usado pra limpar duplicidade de lançamento, não é uma operação do dia a dia.
 *
 * Bloqueia se a venda já tem algum pagamento: `pagamentos` é append-only por design
 * (sem policy de DELETE, de propósito) e a exclusão da venda só faz soft-delete nela —
 * apagar os pagamentos locais e excluir a venda deixaria esses pagamentos órfãos no
 * servidor (continuam existindo, apontando pra uma venda que não existe mais em lugar
 * nenhum), e esse dinheiro simplesmente some da contabilidade sem nenhum aviso. Cenário
 * real: duas cópias duplicadas do MESMO cliente, uma delas já com baixa registrada —
 * exatamente o padrão "Antonia Maria"/"Rosa Maria Goncalves" documentado no CLAUDE.md
 * do projeto. Se precisar mesmo excluir uma venda com pagamento, é uma decisão manual
 * direto no Supabase Studio (reatribuir o pagamento pra venda certa antes). */
export async function excluirVenda(id: string): Promise<void> {
  const pagamentos = await db.pagamentos.where('venda_id').equals(id).toArray()
  if (pagamentos.length > 0) {
    throw new Error(
      'Essa venda já tem pagamento registrado — não dá pra excluir assim, o valor pago ficaria perdido. Se for mesmo duplicata, fala com quem administra o app antes.'
    )
  }
  await db.transaction('rw', db.vendas, db.pagamentos, db.meta, async () => {
    await db.vendas.delete(id)
    await marcarExclusaoPendente(id)
  })
}

export async function listarPagamentos(vendaId: string): Promise<Pagamento[]> {
  return db.pagamentos.where('venda_id').equals(vendaId).sortBy('data')
}

// Nomes de linha de rodapé da planilha (ex: "TOTAIS", "Clientes Atrasados:") que
// entraram como "cliente" fantasma em importações feitas antes do filtro existir em
// importarPlanilha.ts. A importação atual já não recria isso, mas quem já tinha essas
// linhas salvas localmente (de uma importação antiga) fica com elas presas — reimportar
// não remove o que não é mais gerado. Roda sozinho a cada abertura do app pra limpar
// sem depender de ninguém achar um botão de excluir.
const NOMES_FANTASMA = [/^totais$/i, /^clientes atrasados:?$/i]

export async function limparLinhasFantasma(): Promise<number> {
  const todas = await db.vendas.toArray()
  const fantasmas = todas.filter((v) => NOMES_FANTASMA.some((padrao) => padrao.test(v.cliente_nome.trim())))
  if (fantasmas.length === 0) return 0
  await db.transaction('rw', db.vendas, db.pagamentos, async () => {
    for (const v of fantasmas) {
      await db.pagamentos.where('venda_id').equals(v.id).delete()
      await db.vendas.delete(v.id)
    }
  })
  return fantasmas.length
}

/** bulkPut faz upsert por id — reimportar a mesma planilha não duplica nada. */
export async function importarVendasEPagamentos(vendas: Venda[], pagamentos: Pagamento[]): Promise<void> {
  await db.transaction('rw', db.vendas, db.pagamentos, async () => {
    await db.vendas.bulkPut(vendas)
    await db.pagamentos.bulkPut(pagamentos)
  })
}

/** Apaga TUDO local (vendas, pagamentos, cursor de sync) — usar antes de um novo pull
 * completo pra garantir que o aparelho fica idêntico ao servidor, sem "zumbi" local de
 * um id que não existe mais lá (ex: depois de uma limpeza de duplicata feita direto no
 * banco). Só descarta o que já foi sincronizado; baixas/edições ainda pendentes
 * (synced_at = 0) são perdidas — quem chama isso na UI precisa avisar disso antes. */
export async function limparTudoLocal(): Promise<void> {
  await db.transaction('rw', db.vendas, db.pagamentos, db.meta, async () => {
    await db.vendas.clear()
    await db.pagamentos.clear()
    await db.meta.clear()
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
