---
name: fechamento
description: Guia o fechamento financeiro mensal — checklist, classificação PJ/PF das transações, e email pronto pro contador Jean.
triggers:
  - /fechamento
  - fechamento do mês
  - fechar o mês
  - relatório pro contador
  - relatório pro Jean
---

# /fechamento — Fechamento Financeiro Mensal

Skill pra guiar o processo mensal de fechamento financeiro da Yago Modas. Cobre a divisão de contas PJ/PF e gera o email formal pro contador Jean.

## Contexto

Antes de começar, ler `_contexto/empresa.md` pra lembrar:
- Conta Bradesco é mista (PJ + PF) — exige classificação transação por transação
- Contador: Jean — comunicação em português formal
- Pai é o dono da loja física, Yago cuida do financeiro
- Objetivo atual: definir salário fixo pro dirigente — o relatório precisa mostrar claramente o que foi gasto vs o que entrou

## Fluxo

### Passo 1 — Checklist de abertura

Ao iniciar, apresentar o checklist e perguntar o que já foi feito:

> "Checklist do fechamento de [mês/ano]:
>
> - [ ] Extrato PJ (Bradesco) exportado em PDF
> - [ ] Extrato PF (Bradesco) exportado em PDF
> - [ ] Planilha Controle PJ atualizada
> - [ ] Planilha Controle PF atualizada
>
> O que já está pronto? (pode marcar todos se já tiver tudo)"

Se tudo estiver pronto, pular pro Passo 4 (email pro Jean).
Se faltar alguma coisa, continuar no Passo 2.

### Passo 2 — Classificação de transações (se precisar)

Se o usuário precisar ajuda pra dividir as transações PJ/PF:

> "Cola as transações do extrato aqui (pode colar em qualquer formato — texto do banco, lista, tabela):"

Para cada transação, classificar como:
- **PJ** — compras de estoque, fornecedores, custos operacionais da loja, taxas PJ
- **PF** — gastos pessoais, alimentação pessoal, lazer, contas domésticas
- **Misto** — gastos que misturam os dois (marcar pra o usuário decidir)
- **Predatado** — cheques ou boletos com data futura

Apresentar a classificação em tabela:

| Data | Descrição | Valor | Classificação | 
|------|-----------|-------|---------------|
| ... | ... | R$ ... | PJ / PF / Misto / Predatado |

Perguntar: "Tem alguma que você quer corrigir?"

### Passo 3 — Resumo financeiro do mês

Após classificação, gerar resumo:

> **Resumo — [Mês/Ano]**
>
> **Entradas PJ:** R$ X
> **Saídas PJ:** R$ X
> **Resultado PJ:** R$ X
>
> **Entradas PF:** R$ X
> **Saídas PF:** R$ X
>
> **Predatados:** R$ X (vencimento: [datas])
>
> **Observação pra distribuição de lucro:** [destacar se há margem pra definir pró-labore fixo]

### Passo 4 — Gerar email pro Jean

Gerar o email formal pronto pra copiar:

```
Assunto: Fechamento Financeiro — [Mês] [Ano] — Yago Modas

Jean,

Segue em anexo a documentação referente ao fechamento financeiro do mês de [mês] de [ano]:

- Extrato PJ (PDF)
- Extrato Pessoa Física (PDF)
- Planilha Controle PJ
- Planilha Controle PF

[Se houver algo a destacar: "Observação: no mês de [mês], identificamos [X] no controle PJ que merece atenção / predatados no valor de R$ X com vencimento em [data]."]

Fico à disposição para qualquer dúvida.

Atenciosamente,
Yago
Yago Modas
```

Perguntar: "Tem alguma observação específica que você quer incluir no email?"

Se sim, incorporar antes de mostrar a versão final.

### Passo 5 — Encerrar

> "Fechamento de [mês] concluído.
> Email pronto — é só copiar, anexar os 4 arquivos e enviar pro Jean."

## Regras

- Tom do email: sempre português formal, sem gírias
- Nunca inventar valores — só usar o que o usuário informar
- Se o usuário não souber classificar uma transação, marcar como "Misto" e deixar pra ele decidir
- Lembrar sempre que o objetivo atual é separar PJ/PF com clareza pra viabilizar salário fixo pro dirigente
- Se os predatados forem relevantes, destacar no email pro Jean
