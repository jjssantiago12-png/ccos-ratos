# Cobrança Vendas

## O que é
App PWA de cobrança de vendas consignadas — substitui o controle manual em papel do pai (vendedor externo) e permite que ele e outros funcionários deem baixa nos pagamentos direto na rua, mesmo sem internet.

## Tipo
Interno

## Escopo
- Cadastro de vendas a prazo/consignadas (cliente, valor, vencimento, telefone)
- Baixa de pagamento (dar quitação na venda quando cliente paga)
- Alerta automático quando vencimento passa sem pagamento
- Ranking de inadimplência por score (dias em atraso + valor da dívida combinados)
- Botão de cobrança que abre o WhatsApp com mensagem pré-escrita (link wa.me, sem API paga)
- Funciona offline (PWA instalável) e sincroniza quando a internet voltar
- Login único compartilhado entre funcionários — todos veem e dão baixa na lista completa de clientes/vendas

## Contexto
- Stack: React + Vite, IndexedDB (Dexie.js) para dados locais offline, Supabase (Postgres) como backend/sync na nuvem, deploy no Vercel
- Modelo de dados baseado na planilha real `CONTROLE_INADIMPLENCIA_1.xlsx` (fica só local, gitignored — tem dado real de cliente)
- Regra de juros: 10% a.m. composto, só sobre saldo restante, só conta mês completo de 30 dias — igual à planilha
- Score de ranking: `restante_vencido × (1 + meses_atraso × 0,5)`
- Sem prazo fixo definido ainda

## Arquivos importantes
- `src/lib/calculos.ts` — cálculo de juros/status/score (lógica de negócio central, funções puras)
- `src/lib/whatsapp.ts` — geração do link `wa.me` e texto da cobrança
- `src/lib/importarPlanilha.ts` — importa a planilha de campo (.xlsx) direto no navegador, sem passar por servidor
- `src/db/dexie.ts` / `src/db/repo.ts` — schema local e operações (criar venda, dar baixa, importar)
- `src/sync/syncEngine.ts` — sincronização com Supabase (push/pull, last-write-wins)
- `supabase/migrations/0001_init.sql` — schema Postgres, trigger de recálculo de valor_pago, RLS
- `.env.example` — variáveis necessárias (Supabase URL/key, PIN do app)

## Diagnóstico de 2026-08-20 (5 especialistas + correções)
Depois de ligar o sync em produção, rodei um diagnóstico com 5 agentes (security-auditor, backend-architect, code-reviewer, performance-engineer, devops-troubleshooter — ver `.claude/agents/`) sobre o app inteiro. Achou 10 problemas reais (5 críticos de dinheiro/dado, 5 secundários de robustez), todos corrigidos e testados com Playwright contra o Supabase real no mesmo dia:
- Reimportar planilha não sobrescreve mais `valor_pago`/cria pagamento sintético pra venda que já existe — evita contar pagamento em dobro
- `excluirVenda` propaga de verdade pro servidor via soft delete (`excluido_em`) — antes só apagava local e a venda "voltava" no próximo sync
- Push de pagamentos usa `ignoreDuplicates: true` (não trava mais a fila inteira quando um pagamento já existe no servidor)
- Trigger `recalcular_valor_pago` roda em INSERT/UPDATE/DELETE (antes só INSERT) e é `SECURITY DEFINER` (necessário depois de restringir o GRANT — ver abaixo)
- Cursor de sincronização (`atualizado_em`) é mantido pelo servidor, não pelo relógio do aparelho
- Pull é paginado com cursor composto `timestamp|id` (nunca só timestamp — ver bug abaixo)
- `pagamentoEhParcial` considera o saldo acumulado da venda, não só o valor da baixa isolada
- Tela de erro (`ErroFatal.tsx`) evita tela branca silenciosa se o app travar
- Import trata erro (não fica preso em "Importando..." pra sempre)
- Fuso horário correto no histórico de baixas pra pagamento importado

**Dois bugs REAIS a mais encontrados testando (não estavam na lista dos 5 agentes):**
1. **Corrida de sincronização**: uma baixa registrada bem no meio de um pull em andamento podia ser apagada pela resposta do pull chegando depois com dado antigo. Corrigido: o pull nunca sobrescreve uma venda com `synced_at = 0` (edição local ainda não enviada) — ver `syncEngine.ts`, dentro da transação de `pullVendas`.
2. **Loop infinito na paginação nova**: a migration que criou a coluna `atualizado_em` via `ALTER TABLE ADD COLUMN DEFAULT now()` deu o MESMO instante pras 572 vendas já existentes (comportamento padrão do Postgres pra backfill de coluna nova) — um cursor só de timestamp nunca avançava. Corrigido com cursor composto `timestamp|id` via `.or('col.gt.X,and(col.eq.X,id.gt.Y)')` do PostgREST. **Se mexer em paginação/cursor de novo, sempre testar contra uma tabela com centenas de linhas empatadas no mesmo timestamp — é fácil de reproduzir esse bug sem perceber.**
3. **REVOKE de coluna não bloqueava nada**: `revoke update (valor_pago) on vendas from anon` (migration 0002) não funcionou — testei direto e o anon ainda escrevia. Motivo: a chave anônima já tinha UPDATE na tabela INTEIRA concedido por padrão pelo Supabase; revogar só a coluna não estreita uma concessão mais ampla que já existe na tabela toda. Corrigido na migration 0003: `revoke update on vendas from anon` (tabela inteira) + `grant update (lista explícita de colunas seguras) on vendas to anon`. **Sempre que restringir uma coluna específica pro anon/authenticated no Supabase, testar com uma escrita direta via REST depois — não confiar que o REVOKE de coluna funcionou só porque rodou sem erro.**

Migrations: `0001_init.sql` (schema inicial) → `0002_correcoes_diagnostico.sql` (atualizado_em, excluido_em, trigger insert/update/delete, constraints) → `0003_corrige_grant_valor_pago.sql` (conserta o REVOKE que não funcionava). As três já rodadas em produção.

**Revisão final do code-reviewer sobre as correções acima achou mais 1 crítico, corrigido no mesmo dia:** `excluirVenda` apagava pagamentos só localmente — se a venda excluída já tinha pagamento sincronizado, esse pagamento ficava órfão no servidor (perdido, não conta pra nenhuma venda). Corrigido bloqueando a exclusão quando `valor_pago > 0` (erro claro na tela: "já tem pagamento registrado, fala com quem administra"), em `repo.ts` `excluirVenda`. `PainelDuplicatas.tsx` agora também mostra "já recebeu RX — não dá pra excluir esse" em cada linha, pra facilitar escolher a cópia certa pra manter. Também ajustado: aviso de reimportação com valor pago diferente só dispara quando a planilha sabe de MAIS pagamento que o app (sinal real de baixa não lançada), não quando sabe de menos (caso normal/esperado).

**Achados de menor prioridade, registrados mas não corrigidos hoje** (ver `.claude/agent-memory/code-reviewer/project_cobranca_vendas_findings.md` pra detalhe completo): `upsert_venda` pode perder uma edição no last-write-wins sem avisar o usuário (só campos descritivos, nunca dinheiro); linha "falta X" em `CartaoPagamento.tsx` usa saldo de hoje em vez do saldo na época do pagamento histórico.

## Regras específicas
- `valor_pago` de uma venda NUNCA é escrito diretamente — é sempre a soma de `pagamentos` (local e no servidor via trigger). Não adicionar campo de edição manual pra isso.
- **Sync com Supabase está ATIVA em produção** desde 2026-08-19 — projeto `chntgifkzgnxfyjjbrek`, testado de ponta a ponta com dois "aparelhos" simulados (criar venda num, ver aparecer no outro, dar baixa, valor bater dos dois lados via o trigger). `VITE_SUPABASE_URL`/`VITE_SUPABASE_ANON_KEY` configuradas no Vercel (env de produção) e em `.env.local`.
- A chave usada é a **publishable** (`sb_publishable_...`), formato novo do Supabase — nunca usar a **secret** (`sb_secret_...`, veio junto quando o usuário criou o projeto) em nenhum lugar do app/código: ela ignora todo o RLS. Só foi usada uma vez, direto no terminal, pra limpar dado de teste — nunca gravada em arquivo.
- **Projeto Supabase é free tier**: pausa automaticamente depois de ~7 dias sem uso. Se a sincronização parar de funcionar depois de um tempo sem ninguém abrir o app, o usuário precisa entrar no painel do Supabase e reativar o projeto manualmente.
- **Incidente real de duplicação (2026-08-20), causa e correção**: o id determinístico da importação usava uma chave "estrita" que incluía o texto de observações (nº do pedido). Quando esse texto mudava entre duas importações (ou quando o app evoluiu o formato da chave durante o desenvolvimento), a mesma dívida virava um registro novo em vez de atualizar o existente — chegou a duplicar a carteira inteira (572 → 1146 vendas) uma vez em produção. Corrigido com matching em duas camadas em `importarPlanilha.ts`: tenta a chave estrita primeiro (exata); só cai pra chave frouxa (cliente+valor+vencimento) se sobrar EXATAMENTE uma venda existente candidata — evita tanto a duplicação em massa quanto misturar duas parcelas distintas que coincidem em valor/vencimento (aconteceu de verdade com "Antonia Maria" e "Rosa Maria Goncalves", cada uma com duas parcelas reais de mesmo valor/vencimento). Ao mexer nessa lógica de novo, testar com a planilha real duas vezes seguidas (reimportar não pode nem duplicar nem colidir) antes de considerar pronto.
- Botão **"Recarregar"** na `BarraSync` (`limparTudoLocal()` em `repo.ts` + sync) apaga tudo local e baixa o servidor do zero — usar quando um aparelho ficar com dado divergente/zumbi do servidor (ex: depois de uma limpeza de duplicata feita direto no banco). Avisa antes se há alteração local não sincronizada, que seria perdida.
- Ícones do PWA em `public/icons/` são placeholder gerado — trocar se o usuário quiser identidade visual própria
- `.gitignore` da raiz tem uma exceção específica pra essa pasta (normalmente `projetos/*` é todo ignorado) — ver comentário lá antes de mexer
- **Importação da planilha é 100% client-side de propósito** (`ImportarPlanilha.tsx` + `importarPlanilha.ts`, code-split via `React.lazy`/`import()` dinâmico) — nunca transformar isso num asset estático empacotado no build nem mandar a planilha pro servidor. O deploy é público; dado real de cliente (nome/telefone/dívida) só pode entrar no app pela mão de quem está usando, nunca virar arquivo público do site.
- A chave de deduplicação da importação (`importarPlanilha.ts`) precisa incluir `data_vencimento` — o mesmo cliente frequentemente tem várias parcelas da mesma venda com data de venda e valor iguais, só o vencimento muda. Sem isso, parcelas diferentes colidem no mesmo id gerado e uma sobrescreve a outra silenciosamente (bug real encontrado e corrigido — a importação tem uma checagem de duplicata que agora trava com erro em vez de perder dado nesse cenário)
- Lib `xlsx` (SheetJS) é instalada a partir do CDN oficial (`https://cdn.sheetjs.com/...`), não do npm — a versão do npm tem vulnerabilidades altas sem correção publicada lá
- PWA usa `registerSW` de `virtual:pwa-register` no `main.tsx` (com `injectRegister: false` no `vite.config.ts`) em vez do script padrão injetado — isso é o que faz uma aba já aberta recarregar sozinha quando um deploy novo sai. Sem isso, quem já tinha o app aberto/instalado ficava preso numa versão antiga (com bugs já corrigidos) até fechar e abrir tudo de novo manualmente — foi exatamente o que aconteceu com a correção da importação (usuário viu o bug "resolvido" só depois de forçar um refresh). Não reverter pra `injectRegister: 'auto'`.
