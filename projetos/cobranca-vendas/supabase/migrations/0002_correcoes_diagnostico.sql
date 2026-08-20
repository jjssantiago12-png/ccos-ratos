-- Cobrança Vendas — correções do diagnóstico de 2026-08-20 (5 especialistas)
-- Rodar no SQL Editor do painel Supabase, igual a migration anterior.

-- 1) Cursor de sincronização server-side, independente do relógio do aparelho e do
--    campo updated_at (que continua servindo só pro last-write-wins). Evita que um
--    celular com relógio errado trave a sincronização de todo mundo silenciosamente.
alter table vendas add column if not exists atualizado_em timestamptz not null default now();

create or replace function tocar_atualizado_em() returns trigger as $$
begin
  new.atualizado_em = now();
  return new;
end;
$$ language plpgsql;

drop trigger if exists trg_tocar_atualizado_em on vendas;
create trigger trg_tocar_atualizado_em
  before insert or update on vendas
  for each row execute function tocar_atualizado_em();

create index if not exists idx_vendas_atualizado_em on vendas (atualizado_em);

-- 2) Soft delete: excluir uma venda no app passa a marcar essa coluna (via UPDATE
--    normal, já permitido pela policy existente) em vez de precisar de DELETE —
--    e o pull propaga a exclusão pros outros aparelhos (removem localmente ao ver
--    excluido_em preenchido). Antes, "Excluir" só apagava local e a venda voltava
--    no próximo sync — bug real encontrado no diagnóstico.
alter table vendas add column if not exists excluido_em timestamptz;

-- 3) Gatilho de recálculo do valor pago passa a rodar em INSERT, UPDATE e DELETE de
--    pagamentos (antes só rodava em INSERT — editar ou apagar um pagamento deixava
--    o valor pago desatualizado pra sempre).
-- SECURITY DEFINER + search_path fixo: necessário porque o passo (5) abaixo revoga da
-- chave anônima o UPDATE direto em valor_pago/data_ultimo_pagamento — sem isso, esse
-- gatilho (que roda com o privilégio de quem inseriu o pagamento, ou seja, o anon)
-- deixaria de conseguir escrever nessas colunas e o valor pago pararia de atualizar.
create or replace function recalcular_valor_pago() returns trigger
security definer set search_path = public, pg_temp as $$
declare
  v_venda_id uuid := coalesce(new.venda_id, old.venda_id);
begin
  update vendas
  set valor_pago = coalesce((select sum(valor) from pagamentos where venda_id = v_venda_id), 0),
      data_ultimo_pagamento = (select max(data) from pagamentos where venda_id = v_venda_id)
  where id = v_venda_id;
  return coalesce(new, old);
end;
$$ language plpgsql;

drop trigger if exists trg_recalcular_valor_pago on pagamentos;
create trigger trg_recalcular_valor_pago
  after insert or update or delete on pagamentos
  for each row execute function recalcular_valor_pago();

-- 4) Trava de sanidade: impede que uma venda/pagamento com valor zero ou negativo
--    entre no banco por engano (bug de UI, importação malformada, etc).
do $$ begin
  alter table vendas add constraint vendas_valor_devido_positivo check (valor_devido > 0);
exception when duplicate_object then null;
end $$;

do $$ begin
  alter table pagamentos add constraint pagamentos_valor_positivo check (valor > 0);
exception when duplicate_object then null;
end $$;

-- 5) valor_pago e data_ultimo_pagamento só podem ser escritos pelo gatilho acima —
--    revoga a permissão de UPDATE direto dessas duas colunas específicas pra chave
--    anônima. A regra "ninguém escreve nelas direto" já era a intenção documentada
--    desde a migration 1, mas só valia por convenção do app — agora vale de verdade
--    no banco, mesmo se uma chamada direta (fora do app) tentar burlar.
revoke update (valor_pago, data_ultimo_pagamento) on vendas from anon;
