---
name: referencias
description: Curadoria semanal de referências — salva links de Instagram, Twitter e YouTube organizados por tag em conteudo/referencias/
triggers:
  - /referencias
  - curadoria da semana
  - salvar referências
  - referências da semana
---

# /referencias — Curadoria Semanal

Skill pra salvar referências de conteúdo encontradas no Instagram, Twitter, YouTube e qualquer outra URL. Roda toda semana (domingo) e organiza tudo em arquivo semanal.

## Contexto

Antes de começar, saber que:
- Referências são usadas pra produção de conteúdo e artes da Yago Modas (@yagomodass)
- Estilo visual da marca: dark editorial (Brooklyn Outlet + N° Conceito)
- Tags disponíveis: `produto`, `promoção`, `chegou`, `engajamento`, `story`, `carrossel`, `copy`, `visual`

## Fluxo

### 1. Receber os links

Perguntar:

> "Cola os links que você achou essa semana (um por linha):"

Aguardar o usuário colar. Aceitar qualquer quantidade de links.

### 2. Processar cada link

Para cada link:

1. Usar **WebFetch** pra buscar o título e descrição da página
   - Se for YouTube: tentar extrair título e descrição do vídeo
   - Se for Instagram/Twitter: pegar o que estiver disponível (muitas vezes retorna pouco — tudo bem, usar o domínio + path)
   - Se WebFetch falhar: registrar como "título não disponível"

2. Sugerir uma tag baseada no conteúdo/URL:
   - URL tem "promo", "desconto", "off" → `promoção`
   - URL tem "chegou", "new", "lançamento" → `chegou`
   - URL é YouTube → `visual` ou `copy` dependendo do conteúdo
   - Post de produto com preço → `produto`
   - Perguntas, votações, comparações → `engajamento`
   - Série de fotos/slides → `carrossel`
   - Story vertical → `story`
   - Texto/legenda forte → `copy`
   - Qualquer arte/layout/design → `visual`

3. Mostrar ao usuário e confirmar:

> "Link 1: [título]
> Tag sugerida: produto
> Trocar? (enter pra aceitar, ou digita a tag)"

Pode mostrar todos de uma vez e deixar o usuário corrigir só os que quiser.

### 3. Salvar o arquivo da semana

Calcular a semana atual no formato `YYYY-WNN` (ex: `2026-W21`).

Salvar em `conteudo/referencias/semana-YYYY-WNN.md`:

```markdown
# Referências — Semana YYYY-WNN
*[data de hoje]*

## produto
- [título do link](URL)
  > nota: (deixar em branco pra o usuário preencher depois)

## promoção
- [título](URL)

## visual
- [título](URL)
```

Se o arquivo da semana já existir, **adicionar** as novas referências sem sobrescrever as antigas.

### 4. Atualizar o índice

Atualizar (ou criar) `conteudo/referencias/index.md`:

```markdown
# Índice de Referências — Yago Modas

| Semana | Referências | Tags presentes |
|--------|-------------|----------------|
| [2026-W21](semana-2026-W21.md) | 5 | produto, visual, carrossel |
| [2026-W20](semana-2026-W20.md) | 3 | promoção, engajamento |
```

### 5. Confirmar

> "Salvo. X referências na semana YYYY-WNN.
> Arquivo: conteudo/referencias/semana-YYYY-WNN.md"

## Regras

- Nunca inventar título se WebFetch não conseguir buscar — registrar como "título não disponível"
- Se o usuário não confirmar a tag, usar a sugerida
- Se o link for de Instagram e não retornar conteúdo, salvar só a URL com tag manual
- Campo "nota" sempre deixar vazio por padrão — é pra o usuário preencher na hora de usar a referência
- Não pedir confirmação pra cada link individualmente se forem muitos — mostrar todos de uma vez
