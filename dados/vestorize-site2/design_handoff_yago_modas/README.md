# Handoff: Yago Modas — Catálogo Digital + Gerenciador

## Visão geral
**Yago Modas** ("A loja que vai até você") é uma loja de roupas itinerante (Espírito Santo). Este pacote tem **dois produtos** que compartilham identidade visual e dados:

1. **Catálogo (cliente)** — mobile-first. O cliente recebe o link (WhatsApp/Instagram), navega por categorias, filtra por tipo/tamanho/numeração, abre o produto, escolhe tamanho e quantidade, monta uma "sacolinha" e **finaliza o pedido pelo WhatsApp da loja** (mensagem pronta com códigos, tamanhos, quantidades e total). Também pode pedir um item avulso direto.
2. **Gerenciador (admin)** — desktop-first, protegido por login. Inclui/edita/exclui produtos, sobe fotos e mostra/oculta itens. O que muda aqui reflete no catálogo.

Ambos abrem por uma **tela de escolha de papel** ("Sou cliente" / "Sou gerenciador"). Cliente entra direto; gerenciador vai ao login.

> O objetivo é **um único link** compartilhável que leva ao catálogo; o catálogo abre na tela de escolha. O gerenciador é uma página separada (rota protegida).

## Sobre os arquivos deste pacote
Os arquivos `.html`, `.css`, `.jsx` e `.js` são **referências de design feitas em HTML/React (via Babel no navegador)** — protótipos que mostram aparência e comportamento pretendidos, **não código de produção pra copiar direto**. A tarefa é **recriar estes designs no ambiente real do projeto** (escolha o stack: recomenda-se **Next.js/React + TypeScript** no front e **Node/NestJS ou similar** + **Postgres** no back, mas use o que fizer sentido), seguindo boas práticas: componentes reutilizáveis, estado em hooks/store, API REST/tRPC, autenticação real e upload de imagem pra storage/CDN.

A persistência do protótipo é **`localStorage`** (camada `store.js`) e o login é **mockado** (`ADMIN_CREDS` em `admin.jsx`). Ambos são **placeholders** a serem substituídos por **banco de dados + API + auth real**.

## Fidelidade
**Alta fidelidade (hifi).** Cores, tipografia, espaçamentos, raios, sombras, estados e microinterações são finais e devem ser reproduzidos fielmente. Onde houver imagem de produto ausente, há um placeholder "Foto em breve" — manter esse estado vazio elegante, pois o cliente ainda não tem todas as fotos.

---

## Design Tokens

### Cores (tema escuro premium, levemente quente)
| Token | Valor | Uso |
|---|---|---|
| `--bg` | `#121110` | fundo base |
| `--surface` | `#1b1a18` | cards, header |
| `--surface-2` | `#232220` | inputs, chips, rodapés de drawer |
| `--surface-3` | `#2c2a26` | hover, thumbs |
| `--text` | `#f5f2ec` | texto principal (branco quente) |
| `--text-2` | `rgba(245,242,236,0.64)` | secundário |
| `--text-3` | `rgba(245,242,236,0.40)` | terciário/legendas |
| `--line` | `rgba(255,255,255,0.075)` | hairlines |
| `--line-2` | `rgba(255,255,255,0.13)` | bordas mais fortes |
| `--accent` | `#C8A84B` | **dourado** (destaque, preços, CTAs) |
| `--accent-soft` | `#ddc275` | dourado claro (gradientes) |
| `--accent-deep` | `#8f7327` | dourado escuro |
| `--wa` / `--wa-deep` | `#25D366` / `#128C46` | verde WhatsApp (botões de pedido) |

**Cores de destaque alternativas (Tweak):** Dourado `#C8A84B` (padrão) · Bronze `#C0824B` (soft `#d7a06d`, deep `#8a5a2e`) · Platina `#B9BEC6` (soft `#d6dae0`, deep `#888d96`). Texto sobre o accent é sempre `#1a1712`.

**Badges de categoria:** FEM `rgba(193,84,138,0.92)` (fucsia) · MASC `rgba(70,118,190,0.92)` (azul) · INF `rgba(70,170,140,0.92)` (verde) · SAC/Utensílios usa o accent. Texto branco, exceto SAC (`#1a1712`).

### Tipografia
- **Inter** (Google Fonts), pesos 400/500/600/700/800 — toda a UI.
- **DM Mono** — códigos de produto ("COD 10401") e legendas mono.
- **Cormorant Garamond** 600/700 — opcional, só para o logotipo (Tweak "logo serifada").
- Escalas: título de seção 22px/800; nome de produto no card 13.5px/600 (2 linhas, `-webkit-line-clamp`); preço no card 18px/800; preço no quick-view 26px/800; código 10.5px mono; labels de filtro 10.5px uppercase tracking 1.6px.

### Forma, espaçamento, sombra
- Raio dos cards: **14px** (Tweak 6–22px). Pílulas/chips: `999px`. Inputs/botões: 11–14px.
- Grid de produtos: 2 colunas no mobile, `gap: 12px`, padding lateral 16px.
- Sombra de card no hover: `0 14px 32px rgba(0,0,0,0.45)` + borda dourada `rgba(200,168,75,0.42)`.
- Áreas seguras dentro do app (mockup iOS): topo 56px, base 26px.

### Animações
- Entrada de cards/tiles: **só transform** (translateY 16–18px → 0), `cubic-bezier(.2,.7,.3,1)`, escalonada por índice (≈45ms). **Nunca animar opacity de 0** no estado inicial (mantém conteúdo visível em print/reduced-motion).
- Drawers (sacola, quick-view, editor): slide com `transform: translateY/X(101%) → 0`, `.32–.36s cubic-bezier(.3,.9,.3,1)`, com scrim `rgba(0,0,0,0.55–0.6)` + blur.
- Badge do carrinho: "pop" com `cubic-bezier(.3,1.5,.5,1)`. Skeleton: shimmer 1.3s. Erro de tamanho não escolhido: "shake" 0.4s.

---

## Modelo de dados

### Produto
```ts
type Produto = {
  id: string;          // estável (PK). No protótipo: "<CAT>-<base36 timestamp>"
  code: string;        // código exibido ao cliente, ex "10401" (único, editável)
  name: string;        // "Vestido Midi Floral Manga Curta"
  cat: "FEM" | "MASC" | "INF" | "SAC";   // categoria
  sub: string;         // subcategoria/tipo, ex "Vestidos" (deve existir em SUBS[cat])
  price: number;       // em reais, ex 119.90
  sizes: string[];     // ex ["P","M","G","G2"] ou ["36","38",...] ou ["Único"]
  img: string | null;  // URL da foto (no protótipo: dataURL). null => placeholder "Foto em breve"
  desc?: string;       // descrição opcional (aparece no quick-view)
  active: boolean;     // visível no catálogo? (toggle no gerenciador)
};
```

### Taxonomia (ver `data.js`)
- **Categorias (tiles):** `FEM` Feminino · `MASC` Masculino · `INF` Infantil · `SAC` **Utensílios** (subtítulo "Achadinhos & ofertas").
- **Subcategorias por categoria** (`SUBS`): cada lista começa com "Todos" (filtro), o resto são tipos reais. Ex. FEM: Blusas & Camisetas, Vestidos, Calças Jeans, Calças, Saias, Bermudas & Shorts, Conjuntos, Casacos & Jaquetas, Roupas Íntimas.
- **Tamanhos (`SIZES`):** P, M, G, G2, G3, G4, GG, XG. **Numeração (`NUMS`):** 36, 38, 40, 42, 44, 46, 48. No gerenciador soma-se "Único".
- **Telefone da loja (`YAGO.WHATSAPP`):** placeholder `5527999998888` — **substituir pelo número real** (formato `55` + DDD + número, só dígitos).
- **URL do catálogo (`CATALOG_URL` em `app.jsx`):** usada na mensagem do WhatsApp — apontar para a URL real de produção.

O catálogo mostra **somente** produtos com `active !== false`. O gerenciador mostra todos.

---

## Telas / Views

### 0. Tela de escolha de papel (RoleGate) — catálogo
- **Quando:** primeira coisa ao abrir o link do catálogo (a cada carregamento; não persiste por design).
- **Layout:** overlay full-screen dentro do mockup do celular, fundo escuro com glow dourado no topo. Centralizado: marca (quadrado dourado "Y", 60px, raio 16), "Yago **Modas**" 26px/800, slogan uppercase dourado, "Como você quer entrar?".
- **Botões (cards full-width, raio 16, empilhados):**
  - **Sou cliente** (gradiente dourado, texto `#1a1712`): título "Sou cliente" + sub "Ver o catálogo de produtos" → fecha o overlay, mostra o catálogo.
  - **Sou gerenciador** (outline `surface-2`): título + sub "Administrar a loja · requer senha" → navega para a rota/página do gerenciador (login).

### 1. Catálogo — Header (fixo no topo)
- Fundo com gradiente sutil + **fio dourado** na base (`linear-gradient` horizontal fade). Padding topo = área segura.
- Linha 1: marca (quadrado dourado "Y" 42px + "Yago **Modas**" + slogan uppercase 9px dourado) à esquerda; **botão sacola** (ícone bag) à direita, com **badge** dourado de contagem (anima "pop" ao adicionar).
- Linha 2: **busca** (altura 48, raio 13, ícone lupa, placeholder "Buscar produto ou código…", botão limpar). Busca por **nome OU código**, global (todas as categorias).

### 2. Catálogo — Home (tiles)
- Eyebrow "CATÁLOGO COMPLETO" + título "O que você procura hoje?" + subtítulo.
- **Grid 2×2 de tiles** (1 por categoria), `aspect-ratio 1/1.16`, fundo `surface-2` com listras diagonais sutis + glow dourado embaixo. Ícone (linha) no topo, label 17px/700 e contagem ("12 peças") ou subtítulo embaixo. Hover: borda dourada + ícone sobe e fica dourado. Toque abre o **Browse** da categoria.

### 3. Catálogo — Browse (categoria selecionada)
- **Breadcrumb:** "‹ Início / **{Categoria}**".
- **Filtros (linhas de chips com scroll horizontal, sem barra):**
  - "TIPO DE PRODUTO": chips das subcategorias (`SUBS[cat]`), seleção única, "Todos" default. Chip ativo = gradiente dourado, texto escuro.
  - "TAMANHO": chips P…XG (multi-seleção).
  - "NUMERAÇÃO": chips 36…48 (multi-seleção). Tamanho+numeração filtram por interseção com `sizes` do produto.
- **Contador:** "**{n}** produtos" + botão "Relevância" (ordenação — ver Pendências).
- **Grid de produtos** (ProductCard). Ao trocar filtro, mostra **skeleton shimmer** (~430ms) antes dos cards. Estado vazio: ícone + "Nenhum produto encontrado".
- **Busca ativa:** substitui os filtros por "Resultados para '{q}': {n}" e lista resultados globais.

### 4. Catálogo — ProductCard
- Card clicável (abre Quick-view). Raio 14, borda hairline; hover eleva + borda dourada.
- **Área da foto** `aspect-ratio 3/4`: se `img` → `<img cover>`; senão placeholder "FOTO EM BREVE" (ícone + listras). Badge de **categoria** no topo-direito (FEM/MASC/INF/OFERTA). Se já está na sacola, selo dourado com check + quantidade no topo-esquerdo.
- **Corpo:** código mono ("COD 10401"), nome (2 linhas, 600), opcional fileira de **pílulas de tamanho** (Tweak "mostrar tamanhos no card"), **preço** dourado 18px/800 ("R$ 119,90"), e botão verde **"Pedir"** (ícone WhatsApp) full-width que **abre o Quick-view** (não envia direto — tamanho é obrigatório).

### 5. Catálogo — Quick-view (folha de produto, sobe de baixo)
- Scrim + sheet `border-radius 24px 24px 0 0`, alça no topo, botão X.
- **Foto** (aspect 4/5, máx 300px; `<img>` ou, no protótipo, `<image-slot>` pra testar arrastando foto). Badge de categoria no topo-esquerdo.
- Código, **nome** 20px/800, "{Categoria} · {tipo}", **descrição** (se houver), **preço** dourado 26px/800.
- **"ESCOLHA O TAMANHO":** chips dos tamanhos do produto (seleção única, alvo ≥46px). Se 1 só tamanho, pré-selecionado. **Obrigatório** — sem seleção, a área dá "shake" + aviso "selecione um tamanho".
- **"QUANTIDADE":** stepper (− valor +), mínimo 1.
- **Rodapé (2 botões full-width):**
  - **Pedir pelo WhatsApp** (verde): abre `wa.me` com mensagem do item (código, tamanho, qtd, preço, link do catálogo).
  - **Adicionar à sacolinha** (outline dourado): adiciona linha (produto+tamanho+qtd) e fecha com toast "Adicionado à sacolinha".

### 6. Catálogo — Sacolinha (cart drawer, sobe de baixo)
- Cabeçalho "Minha Sacolinha" + "{n} itens selecionados" + X.
- **Itens** (chave = produto **+ tamanho**; mesmo produto em tamanhos diferentes = linhas distintas): thumb, "COD", nome, "Tamanho: **{size}**", preço; à direita lixeira + mini-stepper.
- Vazio: ícone + "Sua sacolinha está vazia".
- **Rodapé:** "Itens {n}", "Total **R$ X**" (dourado 24px), botão verde **"Finalizar pelo WhatsApp"** + nota "Enviaremos seu pedido com todos os códigos para a loja."

### 7. Catálogo — Tab bar (rodapé fixo)
- 4 abas: **Início** (home), **Categorias** (browse), **Sacolinha** (abre o drawer, com badge de contagem), **Atendimento** (abre WhatsApp da loja com saudação). Aba ativa em dourado com **traço-indicador** animado acima do ícone.

### 8. Gerenciador — Login
- Página centralizada, card 380px. Marca + "ÁREA DO GERENCIADOR". Campos **Usuário** (ícone user) e **Senha** (ícone cadeado, type password). Botão "Entrar" dourado. Erro: "Usuário ou senha inválidos." Hint de demonstração (remover em produção).
- **Protótipo:** valida contra `ADMIN_CREDS = { user:"yago", pass:"yago123" }` e marca `localStorage.yago_admin_auth="1"`. **Produção:** autenticação real (ver Backend).

### 9. Gerenciador — Painel/Lista
- **Top bar fixa:** marca "Yago Modas · GERENCIADOR" à esquerda; à direita: "Ver catálogo" (abre catálogo em nova aba), "**+ Adicionar produto**" (dourado), "Sair" (logout).
- **Stats (4 cards):** Produtos (total), Visíveis (dourado), Com foto, Ocultos.
- **Toolbar:** busca (nome/código) + segmented filter por categoria (Todos/Feminino/Masculino/Infantil/Utensílios).
- **Tabela** (linhas flex; vira colunas reduzidas no mobile): Foto (thumb 50×64), Código (mono), Produto (nome + tipo), Categoria (badge), Preço (dourado), **Status** (switch mostrar/ocultar), Ações (editar ✏️, excluir 🗑️). Linha oculta fica com opacidade reduzida. Excluir pede confirmação em modal.

### 10. Gerenciador — Editor (drawer lateral direito)
- Cabeçalho "Novo produto" / "Editar produto" + X. Campos:
  - **Foto do produto:** dropzone (arrastar ou clicar). No protótipo a imagem é **redimensionada via canvas** (máx 900px, JPEG 0.82) e salva como dataURL. **Produção:** subir o arquivo para storage/CDN e guardar a URL.
  - **Nome** (texto, obrigatório).
  - **Código** + **Preço (R$)** (aceita vírgula; obrigatórios; preço > 0).
  - **Categoria** (select) + **Tipo** (select dependente de `SUBS[categoria]`).
  - **Tamanhos disponíveis** (chips multi-seleção de `SIZES + NUMS + "Único"`; ≥1 obrigatório).
  - **Descrição** (textarea, opcional).
  - **Visibilidade** (switch "Visível no catálogo"/"Oculto").
- Rodapé: "Cancelar" + "Salvar produto" (dourado). Validação destaca campos inválidos.

---

## Interações & comportamento (regras)
- **Tamanho obrigatório** antes de pedir/adicionar (catálogo). Quantidade mínima 1.
- **Sacolinha** é client-side e **persiste em `localStorage`** (`yago_cart_v1`); some itens cujo produto deixou de existir/ficar visível (validar na leitura). Linha = `produtoId + "::" + tamanho`.
- **Reatividade entre gerenciador e catálogo:** no protótipo, `store.js` dispara `CustomEvent("yago-store-change")` (mesma aba) e o catálogo escuta `storage` (outra aba) para recarregar. Em produção: o catálogo busca produtos visíveis da API; revalidar/atualizar após mudanças (ex. SWR/Query, ou rebuild/ISR).
- **RoleGate** aparece a cada carregamento do catálogo (sem persistência) — comportamento desejado.

## Integração WhatsApp (essencial)
Link: `https://wa.me/${WHATSAPP}?text=${encodeURIComponent(msg)}`. Abrir em nova aba.

**Pedido de 1 item (quick-view):**
```
Olá, Yago Modas! 🛍️
Tenho interesse neste produto:

• [COD 10401] Vestido Midi Floral Manga Curta
  Tamanho: G · Qtd: 1
  R$ 119,90

Visto no catálogo: {CATALOG_URL}

Pode me ajudar?
```

**Finalizar sacolinha (checkout):**
```
Olá, Yago Modas! 🛍️
Montei minha sacolinha pelo catálogo:

• [COD 10401] Vestido Midi Floral Manga Curta — Tam G — 2un — R$ 239,80
• [COD 10405] Blusa Cropped Canelada Básica — Tam M — 1un — R$ 49,90

Total: R$ 289,70

Catálogo: {CATALOG_URL}
Gostaria de finalizar este pedido.
```
Formato de preço: `R$ 1.234,56` (ponto milhar, vírgula decimal).

---

## Backend (a construir — fase 2)
1. **Banco de dados** (ex. Postgres) com tabela `products` espelhando o modelo acima. `code` único; `active` boolean; índices por `cat`/`sub`.
2. **API**
   - Público: `GET /products?cat=&sub=&size=&q=` → **somente `active=true`**. `GET /products/:id`.
   - Admin (autenticado): `GET /admin/products` (todos), `POST /admin/products`, `PUT /admin/products/:id`, `DELETE /admin/products/:id`, `PATCH /admin/products/:id/active`.
   - `POST /admin/upload` → recebe imagem, redimensiona no servidor (máx ~1200px, WebP/JPEG), envia a storage/CDN (S3/Cloudinary), retorna URL pública para salvar em `product.img`. **Não** guardar imagem como base64 no banco (são ~509 produtos).
3. **Autenticação real** do gerenciador (substituir `ADMIN_CREDS`): usuário+senha com hash (bcrypt/argon2), sessão JWT/cookie httpOnly, rotas admin protegidas por middleware. Logout limpa a sessão.
4. **Catálogo (cliente)** é público, sem login — só leitura dos visíveis. **Sacolinha** continua client-side (não precisa de backend); o "checkout" apenas monta a mensagem do WhatsApp.
5. **Performance:** com 509+ produtos, paginar/virtualizar a lista (API com paginação; grid com carregamento incremental). Imagens com `loading="lazy"` e tamanhos responsivos.

---

## Tweaks (configuráveis no protótipo, viram tema/config)
Cor de destaque (Dourado/Bronze/Platina), logo serifada (on/off), mostrar tamanhos no card (on/off), raio dos cantos (6–22px). Em produção, viram tokens de tema/config da loja.

## Assets
- **Fontes:** Google Fonts — Inter, DM Mono, Cormorant Garamond.
- **Ícones:** todos SVG inline (stroke `currentColor`) — ver `components.jsx` (objeto `I`) e `admin.jsx` (objeto `A`). Reimplementar com a biblioteca de ícones do projeto (ex. lucide) mantendo o traço.
- **Logo:** placeholder textual "Y" em quadrado dourado — substituir pelo logo real quando houver.
- **Fotos de produto:** ainda não existem; manter placeholder "Foto em breve" até serem cadastradas no gerenciador.

## Screenshots (pasta `screenshots/`)
Referências visuais em alta fidelidade (o catálogo aparece dentro de um mockup de celular só para apresentação):
- `01-tela-escolha.png` — RoleGate (Sou cliente / Sou gerenciador).
- `02-home.png` — catálogo, tiles de categoria.
- `03-browse.png` — categoria com filtros (tipo/tamanho/numeração) + grid.
- `04-quickview.png` — folha de produto (tamanho, quantidade, CTAs).
- `05-sacolinha.png` — drawer da sacola com total e "Finalizar pelo WhatsApp".
- `06-gerenciador-login.png` — login do admin.
- `07-gerenciador-lista.png` — painel: stats, busca, filtro e tabela de produtos.
- *(Editor de produto: ver descrição na seção "Telas → 10. Gerenciador — Editor"; não incluído como imagem.)*

## Arquivos neste pacote (referência)
- `Catálogo Yago Modas.html` — entrada do cliente (carrega React/Babel + os .jsx/.css/.js).
- `Gerenciador Yago Modas.html` — entrada do admin.
- `app.jsx` — app do catálogo (estado, filtros, busca, sacola, WhatsApp, RoleGate, Tweaks).
- `components.jsx` — Header, HomeTiles, FilterBar, ProductCard, SkeletonCard, ícones `I`, `fmt`.
- `quickview.jsx` — folha de produto (tamanho/quantidade/CTAs).
- `cart.jsx` — drawer da sacolinha, tab bar, toast.
- `admin.jsx` — login (mock), painel, tabela, editor, upload/redimensionamento de foto, ícones `A`.
- `data.js` — taxonomia + produtos de exemplo (seed) + telefone/URL.
- `store.js` — camada de dados sobre localStorage (a trocar por API).
- `theme.css` — tokens + estilos do catálogo. `admin.css` — estilos do gerenciador.
- Suporte de protótipo (não portar): `ios-frame.jsx` (mockup de celular), `tweaks-panel.jsx`, `image-slot.js`.

> Observação: o catálogo é renderizado dentro de um **mockup de iPhone** (`ios-frame.jsx`) só para apresentação. No app real, é uma página web responsiva mobile-first — descarte o mockup.
