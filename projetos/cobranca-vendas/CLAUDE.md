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
