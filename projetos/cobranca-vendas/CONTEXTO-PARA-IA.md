# Contexto — App Cobrança Vendas (Yago Modas)

## O que é

PWA (Progressive Web App) de cobrança de vendas consignadas/a prazo, construído pra substituir o controle em papel/planilha que um vendedor externo (venda porta a porta) usava. Publicado em **https://cobranca-vendas.vercel.app** (senha de acesso: PIN simples de 4 dígitos, compartilhado entre a equipe).

**Quem usa:** o dono da loja (gestão/análise) e o pai dele (vendedor externo, dá baixa nos pagamentos direto na rua, no celular). Login único compartilhado — não há conta por usuário.

## Stack técnica

- **Frontend:** React + Vite + TypeScript
- **Dados locais:** IndexedDB via Dexie.js — fonte de verdade offline, o app funciona 100% sem internet
- **Backend/sync:** Supabase (Postgres), sincronização bidirecional entre aparelhos quando há conexão
- **Deploy:** Vercel, via CLI manual (`vercel --yes --prod`), sem CI/CD automático
- **PWA:** instalável na tela inicial do celular, funciona offline depois da primeira visita

## Modelo de dados

Duas tabelas principais (espelhadas local + Supabase):

**`vendas`** — uma venda/parcela a prazo: cliente (nome, celular, região, bairro, código), data da venda, data de vencimento, valor devido, valor pago (campo **derivado**, nunca escrito direto — ver abaixo), observações, origem (`LIDER` = já lançada no sistema principal da loja / `Campo` = venda do vendedor ainda sem nota fiscal).

**`pagamentos`** — ledger append-only de baixas (pagamentos). `vendas.valor_pago` é sempre a **soma** dos pagamentos daquela venda, recalculada por um trigger no Postgres a cada inserção/edição/exclusão de pagamento. Isso existe pra suportar dois funcionários offline dando baixa na mesma venda ao mesmo tempo sem conflito — dois inserts que somam certo, em vez de um "último que escreve, vence" perigoso com dinheiro.

## Regras de negócio

- **Juros:** 10% ao mês, **compostos**, incidindo só sobre o saldo que falta pagar, só conta mês completo de 30 dias corridos. `Restante = (Valor Devido − Valor Pago) × 1,10^(meses completos de atraso)`.
- **Status:** Quitado (saldo ≤ 0) / Atrasado (venceu e não quitou) / Em dia.
- **Ranking de cobrança:** `score = restante_vencido × (1 + meses_atraso × 0,5)` — prioriza quem deve mais **e** está há mais tempo sem pagar.
- **Cobrança via WhatsApp:** botão que abre `wa.me` com o número do cliente e uma mensagem pré-escrita (nome, valor, vencimento) — sem usar a API paga do WhatsApp Business.

## Sincronização offline (o ponto mais delicado do projeto)

- Cada aparelho guarda tudo localmente (Dexie/IndexedDB) e sincroniza com o Supabase quando: abre o app, volta a internet, a cada ~90s em segundo plano, ou no botão manual "Sincronizar agora".
- IDs gerados no próprio aparelho (`crypto.randomUUID()`), o que torna o envio pro servidor idempotente (upsert por id).
- Conflito de edição do mesmo registro em dois aparelhos offline: resolvido por "quem editou por último vence" (`updated_at`), só nos campos descritivos — nunca no valor pago, que é sempre derivado da soma de pagamentos.
- Exclusão de venda é "soft delete" (marca `excluido_em`, nunca apaga de vez) — propaga pros outros aparelhos no próximo pull.
- Pull é paginado com um cursor composto (timestamp + id) — importante porque uma tabela com muitas linhas tocadas ao mesmo tempo (ex: uma migration em massa) pode ter centenas de linhas com o mesmo timestamp exato, e um cursor ingênuo trava em loop.
- Botão **"Recarregar"**: apaga tudo local daquele aparelho e baixa a versão do servidor do zero — usado quando um aparelho fica com dado desalinhado/duplicado.

## Importação e atualização de dados

- Botão **"Importar planilha"**: lê um arquivo `.xlsx` (aba "CONTROLE") **inteiramente no navegador** — nunca sobe o arquivo pra nenhum servidor, de propósito (o arquivo tem dado real de cliente: nome, telefone, dívida).
- Existe um modelo em branco pronto (`projetos/cobranca-vendas/modelos/modelo-importacao-cobranca-vendas.xlsx`) com instruções de preenchimento.
- Reimportar a mesma venda **atualiza**, nunca duplica — usa uma chave de identificação (cliente + valor + vencimento + observações) com duas camadas (estrita e frouxa) pra reconhecer a mesma venda mesmo se o texto mudar levemente entre reexportações do sistema principal (LIDER).
- Botão **"Exportar"**: baixa o estado atual completo em `.xlsx`, no mesmo formato — serve como backup manual e como ponto de partida pra editar e reimportar depois.

## Segurança — o que é e o que não é

- **Não há autenticação real de usuário.** O "login" é um PIN de 4 dígitos compartilhado, checado só no navegador (visível pra quem souber olhar o código do site) — um filtro contra acesso casual, não uma trava de segurança de verdade.
- **RLS (Row Level Security) do Supabase é deliberadamente permissiva** — qualquer um com a URL consegue ler/escrever a maior parte dos dados usando a chave pública do projeto. Proporcional ao risco real (dívida de roupa de uma loja pequena, não dado financeiro sensível de terceiros), mas **é** dado pessoal (nome, telefone, situação de inadimplência) — vale considerar Supabase Auth de verdade no futuro se o risco crescer.
- `valor_pago`/`data_ultimo_pagamento` têm proteção extra: a chave pública não pode escrever direto nessas colunas, só um trigger do banco (rodando com privilégio elevado) pode — pra garantir que "quanto o cliente pagou" nunca seja adulterado por engano ou por fora do fluxo normal.
- O projeto Supabase é **free tier** — pausa sozinho depois de ~7 dias sem uso, precisa reativar manualmente no painel se isso acontecer.

## Histórico de incidentes reais (pra não repetir)

1. **Duplicação em massa (572 → 1146 vendas):** a identificação de "essa venda já existe" dependia de um texto que mudava entre reexportações da planilha. Corrigido com matching em duas camadas.
2. **Corrida de sincronização:** uma baixa registrada durante uma sincronização em andamento podia ser apagada pela resposta antiga chegando depois. Corrigido: nunca sobrescrever localmente uma edição ainda não enviada ao servidor.
3. **Loop infinito na paginação:** uma migration que tocou muitas linhas de uma vez deu o mesmo timestamp pra todas — um cursor de paginação ingênuo nunca avançava. Corrigido com cursor composto (timestamp + id).
4. **REVOKE de coluna que não bloqueava nada:** restringir escrita numa coluna específica não funciona se a chave já tem permissão na tabela inteira — precisa revogar a tabela toda e conceder de volta só as colunas certas.
5. **Excluir venda duplicada com pagamento já registrado perdia esse pagamento de vista** (ficava órfão no servidor). Corrigido: o app bloqueia a exclusão de qualquer venda que já tenha pagamento, com aviso explicando o motivo.

## Fluxo real de atualização de dados (confirmado com o usuário)

A fonte de dados é o sistema interno da loja (chamado **LIDER**), que gera um relatório nativo ("Relação de Títulos a Receber") bem mais detalhado que o formato que o app importa hoje — mas com ambiguidades (histórico de movimentos em vez de estado atual, status "Baixado" pra título cancelado, sem telefone/endereço do cliente). Decisão tomada: **por enquanto, a atualização continua sendo feita via a planilha modelo (formato "CONTROLE")** que o app já importa — o usuário atualiza esse arquivo com base no que tira do LIDER, e importa normalmente. Não foi construído um importador pro formato bruto do LIDER.

## Arquivos-chave (se for continuar o desenvolvimento)

- `src/lib/calculos.ts` — juros/status/ranking (funções puras)
- `src/lib/importarPlanilha.ts` — importação da planilha, matching de duplicata
- `src/db/repo.ts` — operações locais (criar venda, dar baixa, excluir, importar)
- `src/sync/syncEngine.ts` — motor de sincronização (push/pull, paginação)
- `supabase/migrations/` — schema do banco (3 migrations até agora)
- `CLAUDE.md` (na raiz da pasta do projeto) — documentação técnica completa, incidentes e decisões, mantida atualizada
