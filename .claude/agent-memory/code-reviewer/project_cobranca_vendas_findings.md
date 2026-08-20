---
name: project-cobranca-vendas-findings
description: Open code-review findings in projetos/cobranca-vendas (money-correctness and sync risks) as of 2026-08-20 — re-check status on next review
metadata:
  type: project
---

Full source review of `projetos/cobranca-vendas/src/` done 2026-08-20 (no diff, whole-app review). App is in production with real client/money data (see that project's own CLAUDE.md for prior incidents: spreadsheet-footer phantom-client bug, import-duplication incident). Findings below were NOT yet fixed as of this review — re-check each on the next pass.

**1. Import can double-count `valor_pago` when a venda already has manual pagamentos (🔴 critical, unconfirmed against real usage pattern).**
`src/lib/importarPlanilha.ts` writes `valor_pago` directly onto the `Venda` object (line ~191) from the spreadsheet's cumulative "Valor Pago" column, AND creates a synthetic `pagamento-importado` row (line ~200-211) with a deterministic id based only on the venda id (`pagamento-importado|${id}`) — not on the amount or import date. `src/db/repo.ts`'s `importarVendasEPagamentos` just `bulkPut`s both, no reconciliation against pre-existing pagamentos for that venda. But `registrarPagamento` in the same file (and the Supabase trigger per that project's CLAUDE.md) treats `valor_pago` as strictly `SUM(pagamentos.valor)`. If a venda gets a manual baixa via the app, and is later re-imported from an updated spreadsheet whose "Valor Pago" column already reflects that manual payment (plausible if the paper/master spreadsheet and the app coexist for a transition period), the manual pagamento row + the updated synthetic import row both get summed → inflated `valor_pago`, both locally (next `registrarPagamento` call) and on the server (trigger recomputes from all pagamentos rows on next push/pull). This directly violates the project's own stated invariant ("valor_pago NUNCA é escrito diretamente").
**Why it matters:** this is the same class of bug (import correctness / money misstatement) as the real incidents already logged in that project's CLAUDE.md.
**How to apply:** on next review, check whether import still writes `valor_pago` directly and whether the synthetic pagamento row is reconciled against non-`Importação` pagamentos for the same venda before being upserted.

**2. `excluirVenda` (src/db/repo.ts ~L75-82) never propagates to Supabase — but sync is active in prod.**
The function's own comment says "Só local (sem sync na nuvem ativo ainda)" — that's now stale; per the project CLAUDE.md, sync has been active in production since 2026-08-19. Deleting a venda (used in `PainelDuplicatas.tsx` — the actual duplicate-cleanup tool — and in `FormVenda.tsx`'s delete button) only removes it from the local device. The server row survives, so it comes back via `pullVendas`/`pullPagamentos` on any device that later hits "Recarregar" (`limparTudoLocal` + full re-pull) or receives an update to that same row from elsewhere. This means using the duplicate-cleanup panel doesn't durably fix duplicates.
**How to apply:** re-check whether a tombstone/delete-propagation mechanism has been added; if not, this is still open.

**3. `pagamentoEhParcial` (src/lib/pagamentos.ts) compares each payment against the venda's full original `valor_devido`, not the balance remaining at the time of that payment.**
Used in `CartaoPagamento.tsx`. Any venda paid in more than one installment will show every payment except (at most) one as "Parcial", and the "falta X" detail line uses today's `venda.restante` (current, with interest accrued since) attached to a historical payment card — misleading for old payments.

**4. Inconsistent timezone handling in date display — recurring pattern to watch for in this codebase.**
Most `formatarData` helpers (`src/lib/whatsapp.ts`, `CartaoVenda.tsx`, `PainelDuplicatas.tsx`) correctly pass `{ timeZone: 'UTC' }` to `toLocaleDateString` specifically because date-only ISO strings (`YYYY-MM-DD`) parse as UTC midnight and would otherwise shift a day backward in Brazil's UTC-3 (this exact class of bug is called out and fixed deliberately in `exportarPlanilha.ts`'s `paraData`). `CartaoPagamento.tsx`'s `formatarDataHora` is the one place that omits `timeZone: 'UTC'` — imported payments (whose `data` field is a date-only string from the spreadsheet) display one calendar day early plus a fake time (~21:00) in the Baixas history screen.
**How to apply:** when touching any new date-formatting code in this app, check whether the source string is date-only vs a real datetime, and match the pattern used elsewhere (`timeZone: 'UTC'` for date-only values parsed via `new Date(iso)`).

**5. `ImportarPlanilha.tsx`'s `confirmar()` has no try/catch around `importarVendasEPagamentos`** — if the Dexie write throws (quota, transaction abort), the UI is stuck on "Importando..." with no error and no way to retry without a full reload.

Minor/low-priority (not re-flagged unless asked): no overpayment guard in `FormBaixa`/`registrarPagamento` (silently clamps restante to 0, no credit tracking); PIN gate (`src/lib/sessao.ts`) is client-side only and trivially bypassable via devtools — acceptable given it's described as a shared soft-gate for a small team, not real auth; zero test coverage anywhere in the app, `src/lib/calculos.ts` (pure functions, prior incident history) would be the highest-leverage place to add a handful of unit tests if the user ever wants that.
