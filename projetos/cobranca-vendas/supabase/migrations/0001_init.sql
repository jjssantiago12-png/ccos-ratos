-- Cobrança Vendas — schema inicial
-- Rodar isso no SQL Editor do painel Supabase (ou via `supabase db push` se usar a CLI).

create extension if not exists pgcrypto;

create table if not exists vendas (
  id uuid primary key,
  cliente_nome text not null,
  cliente_celular text not null,
  regiao text not null,
  bairro text not null default '',
  codigo_cliente text not null default '',
  data_venda date not null,
  data_vencimento date not null,
  valor_devido numeric(10,2) not null,
  -- valor_pago e data_ultimo_pagamento são mantidos SOMENTE pelo trigger abaixo.
  -- Nenhum client deve escrever neles diretamente (nem o RPC de upsert abaixo aceita esses campos).
  valor_pago numeric(10,2) not null default 0,
  data_ultimo_pagamento timestamptz,
  observacoes text not null default '',
  origem text not null check (origem in ('LIDER', 'Campo')),
  created_at timestamptz not null,
  updated_at timestamptz not null
);

create table if not exists pagamentos (
  id uuid primary key,
  venda_id uuid not null references vendas(id),
  valor numeric(10,2) not null,
  data timestamptz not null,
  observacao text not null default '',
  registrado_por text not null default '',
  -- coluna de auditoria server-side, usada só como cursor de sincronização (pull incremental)
  criado_em timestamptz not null default now()
);

create index if not exists idx_pagamentos_venda_id on pagamentos (venda_id);
create index if not exists idx_pagamentos_criado_em on pagamentos (criado_em);
create index if not exists idx_vendas_updated_at on vendas (updated_at);

-- Recalcula valor_pago / data_ultimo_pagamento a partir da soma real de pagamentos
-- sempre que uma baixa é inserida. Fonte de verdade é sempre a soma, nunca um valor
-- escrito diretamente por um client — isso é o que elimina o conflito de dois
-- funcionários dando baixa na mesma venda offline ao mesmo tempo (dois inserts
-- válidos que somam certo, em vez de um "último a escrever ganha" perigoso com dinheiro).
create or replace function recalcular_valor_pago() returns trigger as $$
begin
  update vendas
  set valor_pago = coalesce((select sum(valor) from pagamentos where venda_id = new.venda_id), 0),
      data_ultimo_pagamento = (select max(data) from pagamentos where venda_id = new.venda_id)
  where id = new.venda_id;
  return new;
end;
$$ language plpgsql;

drop trigger if exists trg_recalcular_valor_pago on pagamentos;
create trigger trg_recalcular_valor_pago
  after insert on pagamentos
  for each row execute function recalcular_valor_pago();

-- Upsert de venda com "quem escreveu por último, com base no relógio do aparelho, vence"
-- (last-write-wins), só pros campos descritivos — nunca mexe em valor_pago/
-- data_ultimo_pagamento, que continuam exclusivos do trigger acima.
create or replace function upsert_venda(
  p_id uuid,
  p_cliente_nome text,
  p_cliente_celular text,
  p_regiao text,
  p_bairro text,
  p_codigo_cliente text,
  p_data_venda date,
  p_data_vencimento date,
  p_valor_devido numeric,
  p_observacoes text,
  p_origem text,
  p_created_at timestamptz,
  p_updated_at timestamptz
) returns void as $$
begin
  insert into vendas (
    id, cliente_nome, cliente_celular, regiao, bairro, codigo_cliente,
    data_venda, data_vencimento, valor_devido, observacoes, origem,
    created_at, updated_at
  ) values (
    p_id, p_cliente_nome, p_cliente_celular, p_regiao, p_bairro, p_codigo_cliente,
    p_data_venda, p_data_vencimento, p_valor_devido, p_observacoes, p_origem,
    p_created_at, p_updated_at
  )
  on conflict (id) do update set
    cliente_nome = excluded.cliente_nome,
    cliente_celular = excluded.cliente_celular,
    regiao = excluded.regiao,
    bairro = excluded.bairro,
    codigo_cliente = excluded.codigo_cliente,
    data_venda = excluded.data_venda,
    data_vencimento = excluded.data_vencimento,
    valor_devido = excluded.valor_devido,
    observacoes = excluded.observacoes,
    origem = excluded.origem,
    updated_at = excluded.updated_at
  where vendas.updated_at < excluded.updated_at;
end;
$$ language plpgsql;

-- RLS: não há Supabase Auth aqui — o "login único" é um PIN simples só na camada de UI.
-- A chave anon é o único credential em jogo, então a policy é deliberadamente permissiva
-- (equivalente a "qualquer um com a URL do projeto lê/escreve"), proporcional ao risco real
-- (dívida de roupa de uma loja pequena, não dado financeiro sensível de terceiros).
-- DELETE fica de fora de propósito: pagamentos é append-only por design, e exclusão de
-- venda é ação manual do dono direto no Supabase Studio.
alter table vendas enable row level security;
alter table pagamentos enable row level security;

drop policy if exists "vendas select" on vendas;
create policy "vendas select" on vendas for select using (true);
drop policy if exists "vendas insert" on vendas;
create policy "vendas insert" on vendas for insert with check (true);
drop policy if exists "vendas update" on vendas;
create policy "vendas update" on vendas for update using (true) with check (true);

drop policy if exists "pagamentos select" on pagamentos;
create policy "pagamentos select" on pagamentos for select using (true);
drop policy if exists "pagamentos insert" on pagamentos;
create policy "pagamentos insert" on pagamentos for insert with check (true);
