---
name: project-cobranca-vendas-findings
description: Open code-review findings in projetos/cobranca-vendas (money-correctness and sync risks) as of 2026-08-20 — re-check status on next review
metadata:
  type: project
---

Revisão completa de `projetos/cobranca-vendas/` feita 2026-08-20, em cima de um dia de correções de um diagnóstico de 5 agentes + 3 bugs extras achados testando com Playwright ao vivo. `tsc --noEmit` limpo.

Padrão observado nas duas revisões deste projeto até agora: correções tendem a fechar o sintoma relatado mas não o escopo completo do bug original (ex.: `pagamentoEhParcial` corrigiu o selo mas não a linha "falta X"; `excluirVenda` corrigiu a propagação da venda mas não limpou os `pagamentos` associados no servidor). Vale, na próxima revisão, sempre reler a descrição original do bug e verificar se a correção cobre TODAS as consequências dele, não só o primeiro sintoma visível — não assumir que "corrigido" cobriu o efeito colateral também.

**Achados da revisão anterior (2026-08-20, mais cedo no mesmo dia) — status atualizado:**
1. Import duplicando `valor_pago` no reimport → **RESOLVIDO**. `importarPlanilha.ts` agora preserva `valor_pago`/`data_ultimo_pagamento`/`created_at` de vendas já existentes e só cria pagamento sintético pra vendas novas.
2. `excluirVenda` não propagava pro Supabase → **RESOLVIDO** (soft-delete via `pushExclusoes`/`excluido_em`), mas revelou um problema novo mais sério — ver item novo #1 abaixo.
3. `pagamentoEhParcial` comparava pagamento isolado contra `valor_devido` total → **PARCIALMENTE RESOLVIDO**. O selo Parcial/Total agora usa soma acumulada cronológica (correto). Mas a linha "falta X" em `CartaoPagamento.tsx:49` ainda usa `venda.restante` (saldo de HOJE, com juros de hoje) num card de pagamento histórico — continua enganoso pra pagamentos antigos. Ainda aberto.
4. Timezone inconsistente em `CartaoPagamento.tsx` → **RESOLVIDO** (`{ timeZone: 'UTC' }` condicionado a `registrado_por === 'Importação'`).
5. `ImportarPlanilha.tsx` sem try/catch → **RESOLVIDO**.

**Achados NOVOS de 2026-08-20 (revisão pós-correções):**

**1. 🔴 Excluir venda duplicada com pagamento já sincronizado perde esse dinheiro pra sempre (não coberto pelo teste manual do dia).**
`src/db/repo.ts` `excluirVenda` apaga `pagamentos` só localmente. `src/sync/syncEngine.ts` `pushExclusoes` só faz soft-delete em `vendas.excluido_em` — nunca toca em `pagamentos` no servidor (que também não tem policy de DELETE, de propósito, é append-only). `pullPagamentos` não filtra contra `vendas.excluido_em`, então esse pagamento órfão volta em qualquer pull completo (aparelho novo, botão "Recarregar") como card `"(venda não encontrada)"` no Histórico de Baixas, e o valor nunca é reatribuído a nenhuma venda — some da contabilidade.
**Por que importa:** `PainelDuplicatas` é a ferramenta oficial de limpeza de duplicata, e duplicata real com baixa já registrada numa das cópias é o cenário mais provável de acontecer (é literalmente o padrão real "Antonia Maria"/"Rosa Maria Goncalves" já documentado no CLAUDE.md do projeto).
**Como aplicar:** na próxima revisão, checar se `FormVenda.tsx`/`PainelDuplicatas.tsx` passaram a bloquear/avisar exclusão quando `venda.valor_pago > 0`, e/ou se `pullPagamentos` passou a descartar pagamentos órfãos (venda_id que não existe mais localmente) em vez de fazer `bulkPut` cego.

**2. 🟡 `upsert_venda` (migration 0001) pode fazer no-op silencioso no last-write-wins, e `pushVendas` marca como sincronizado mesmo assim.**
`where vendas.updated_at < excluded.updated_at` na RPC: se o cliente perde o LWW, o Postgrest retorna sucesso (0 linhas afetadas), sem erro. `pushVendas` em `syncEngine.ts` marca `synced_at = Date.now()` de qualquer forma. Isso esvazia parcialmente a proteção nova do guard de pull (`synced_at === 0` skip) contra sobrescrita — na sincronização seguinte o guard não protege mais essa venda, e a edição perdida do LWW some sem aviso. Só afeta campos descritivos (nome/telefone/etc.), nunca dinheiro (pagamento é append-only, não passa por LWW). Pré-existente, não é regressão do dia, mas é uma lacuna real na garantia do guard novo.
**Como aplicar:** se mexer de novo no fluxo de push/pull de vendas, considerar fazer `upsert_venda` retornar se a linha foi de fato atualizada, pra `pushVendas` só marcar `synced_at` quando o servidor realmente aceitou aquela versão.

**3. 🟡 Aviso de "valor pago diferente" no reimport (`importarPlanilha.ts`) dispara em quase toda venda com baixa feita pelo app.**
Usa `Math.abs(diferenca) > 0.01` — mas o caso normal/esperado é `valorPagoPlanilha < existente.valor_pago` (planilha mestre do Líder desatualizada em relação às baixas dadas no app), que não deveria ser um aviso. Isso enterra os avisos que importam de verdade (planilha sabendo de MAIS pagamento que o app, sinal de baixa real não lançada no app). Sugestão: só avisar quando `diferenca > 0.01` (sem abs).

**4. 🟢 GRANT/SECURITY DEFINER da migration 0003 — verificado correto, sem achado.**
Lista de colunas do `grant update (...) on vendas to anon` bate exatamente com o que `upsert_venda` (ON CONFLICT DO UPDATE) e `pushExclusoes` escrevem. `security definer set search_path = public, pg_temp` no trigger `recalcular_valor_pago` é o padrão certo. Cursor de paginação composto (`atualizado_em|id` via `.or()`) tem sintaxe PostgREST correta, testado mentalmente contra tabela vazia/uma linha/timestamps com caracteres especiais — sem problema. Não repetir essa checagem do zero na próxima revisão a menos que esses trechos mudem de novo.

**5. Lembrete operacional:** confirmar que as migrations 0002 e 0003 realmente rodaram no projeto Supabase ao vivo (`chntgifkzgnxfyjjbrek`), não só existem como arquivo — a própria 0003 existe porque a 0002 foi aplicada mas o fix nela não funcionou como esperado (revoke de coluna não bloqueava nada porque a tabela inteira já tinha grant). Esse projeto tem histórico de migration como arquivo != migration aplicada.

Minor/low-priority (não re-flagar a menos que perguntado): `idsPorChaveEstrita` fica com entrada órfã quando o match frouxo é usado em `importarPlanilha.ts` (inofensivo, a rede de segurança de id duplicado pegaria qualquer colisão real); reimportar a planilha sobrescreve silenciosamente campos descritivos (telefone/bairro/endereço) editados manualmente no app desde o último import — parece intencional (planilha é fonte de verdade pra dado descritivo) mas vale confirmar com o Yago se é isso mesmo; sem diagnóstico por-venda quando um push trava pra sempre, só o botão "Recarregar" tudo-ou-nada (`BarraSync.tsx`) — risco baixo hoje porque a validação de UI já impede os valores que bateriam nas novas CHECK constraints.
