---
name: whatsapp-regional
description: Organiza a base de clientes por região para criar comunidades no WhatsApp e gera mensagens segmentadas por cidade/bairro.
triggers:
  - /whatsapp-regional
  - mensagem pro grupo
  - mandar pro grupo de
  - comunidades do whatsapp
  - mensagem por região
---

# /whatsapp-regional — WhatsApp por Região

Skill em duas etapas: organizar a base de contatos pra criar as comunidades no WhatsApp, e redigir mensagens segmentadas por cidade/bairro.

## Contexto

Antes de começar, ler `_contexto/empresa.md` pra lembrar:
- Base de contatos: `contatos/base-clientes/LISTA_DE_CONTATOS.xls` (~2.000 contatos)
- Catálogo de produtos: `dados/catalogo-produtos.xls` — exportado do sistema Líder
- Cidades atendidas: Grande Vitória, Conceição da Barra (ES), Venda Nova do Imigrante (ES), Aimorés (MG) e outras do ES
- Operação itinerante — a loja visita cada região em datas agendadas
- Canal principal de venda: presença física nas visitas

---

## Etapa 1 — Setup das comunidades (rodar uma vez)

Usar quando o usuário disser "organizar os contatos", "criar as comunidades", "setup do WhatsApp" ou na primeira vez que rodar `/whatsapp-regional`.

### Passo 1 — Ler a planilha

Ler `contatos/base-clientes/LISTA_DE_CONTATOS.xls` e identificar:
- Coluna de nome
- Coluna de telefone/WhatsApp
- Coluna de região/cidade/bairro

Se as colunas não estiverem claras, perguntar ao usuário quais são.

### Passo 2 — Agrupar por região

Agrupar os contatos por cidade e depois por bairro. Gerar o mapa:

```
GRANDE VITÓRIA — X contatos
  └─ Bairro A — X contatos
  └─ Bairro B — X contatos

CONCEIÇÃO DA BARRA — X contatos
  └─ Bairro A — X contatos

VENDA NOVA DO IMIGRANTE — X contatos
...
```

### Passo 3 — Guia de criação das comunidades

Para cada cidade/grupo, gerar:

```
📍 COMUNIDADE: [Nome da cidade/bairro]
   Contatos: X
   Sugestão de nome: "Yago Modas — [Cidade/Bairro]"
   
   Números:
   - [Nome] — [telefone]
   - [Nome] — [telefone]
   ...
```

Avisar o usuário:
> "As comunidades precisam ser criadas manualmente no WhatsApp. Esse guia te diz quem adicionar em cada uma. Recomendo criar uma comunidade por cidade, com subgrupos por bairro se a cidade tiver muitos contatos."

---

## Etapa 2 — Redigir mensagem por região (recorrente)

Usar quando o usuário quiser enviar uma mensagem pra um grupo específico.

### Passo 1 — Coletar o contexto

Perguntar (apenas o que não estiver claro):
- "Qual cidade/grupo vai receber a mensagem?"
- "Qual é o tipo? (agenda de visita / promoção / chegou peças novas / aviso geral)"
- "Tem informação específica? (data da visita, % de desconto, ou quer que eu sugira produtos do catálogo?)"

**Se o tipo for promoção ou chegou peças novas:**
Ler `dados/catalogo-produtos.xls` e sugerir produtos relevantes com nome, preço e tamanhos disponíveis. Apresentar as opções e deixar o usuário escolher qual destacar na mensagem.

### Passo 2 — Redigir a mensagem

Tom: próximo, comercial, direto. Sem formalidade excessiva. Máximo 5 linhas — mensagem de WhatsApp precisa ser curta.

**Modelos base por tipo:**

*Agenda de visita:*
```
Oi pessoal! 👋
A Yago Modas vai estar em [cidade/bairro] no dia [data].
Temos peças novas esperando por vocês 🔥
Qualquer dúvida, é só chamar aqui!
— Yago Modas • A loja que vai até você
```

*Promoção:*
```
Pessoal, promoção especial pra vocês! 🛍️
[Nome do produto] com [X% OFF / de R$X por R$X]
Quantidade limitada — quem chamar primeiro garante.
📲 Manda DM ou responde aqui pra reservar!
— Yago Modas
```

*Chegou peças novas:*
```
CHEGOU! ✨
[Descrição breve das peças] acabaram de entrar no estoque.
Tamanhos [X ao X] disponíveis.
Manda mensagem pra garantir a sua antes que acabe!
— Yago Modas • @yagomodass
```

*Aviso geral:*
Redigir conforme o contexto passado pelo usuário.

### Passo 3 — Apresentar e ajustar

Mostrar a mensagem e perguntar:
> "Quer ajustar alguma coisa antes de copiar?"

Se sim, ajustar. Se não, entregar pronta.

---

## Regras

- Etapa 1 só precisa ser rodada uma vez — depois as comunidades já estarão criadas
- Nunca inventar números de telefone ou nomes de contato
- Mensagens de WhatsApp: máximo 5 linhas, tom próximo, sem formalidade
- Se o usuário não souber a data da visita, deixar espaço em branco: "[data]"
- Emojis: usar com moderação — 1 ou 2 por mensagem, nunca em excesso
