export type Regiao =
  | 'Grande Vitória'
  | 'Região Sul'
  | 'Região Noroeste'
  | 'Sooretama'
  | 'Conceição da Barra'
  | 'Rio de Janeiro - Itabapoana'
  | 'Minas Gerais'

export type Origem = 'LIDER' | 'Campo'

export type Status = 'Em dia' | 'Atrasado' | 'Quitado'

export interface Venda {
  id: string
  cliente_nome: string
  cliente_celular: string
  regiao: Regiao
  bairro: string
  codigo_cliente: string
  data_venda: string // ISO date (yyyy-mm-dd)
  data_vencimento: string // ISO date
  valor_devido: number
  valor_pago: number
  data_ultimo_pagamento: string | null
  observacoes: string
  origem: Origem
  created_at: string // ISO datetime
  updated_at: string // ISO datetime
  synced_at: number // 0 = pendente de sync, senão epoch ms do último sync
}

export interface Pagamento {
  id: string
  venda_id: string
  valor: number
  data: string // ISO datetime
  observacao: string
  registrado_por: string
  synced_at: number
}

export interface VendaCalculada extends Venda {
  saldo_base: number
  dias_atraso: number
  meses_atraso: number
  acrescimo: number
  restante: number
  status: Status
  score_cobranca: number
}
