-- Corrige um erro real na migration anterior: `revoke update (valor_pago, ...) from anon`
-- não bloqueava nada, porque a chave anônima já tinha UPDATE na tabela INTEIRA (concedido
-- por padrão pelo Supabase) — revogar só a coluna não estreita uma concessão mais ampla
-- que já existia na tabela toda. Testei direto (PATCH valor_pago com a chave anon) depois
-- da migration anterior e confirmei que ainda passava. A forma certa: revogar o UPDATE da
-- tabela inteira e conceder de volta só nas colunas que o app realmente precisa escrever.

revoke update on vendas from anon;

grant update (
  cliente_nome, cliente_celular, regiao, bairro, codigo_cliente,
  data_venda, data_vencimento, valor_devido, observacoes, origem,
  updated_at, excluido_em
) on vendas to anon;

-- valor_pago e data_ultimo_pagamento ficam de fora da lista acima de propósito — só o
-- gatilho recalcular_valor_pago (security definer) escreve nelas.
