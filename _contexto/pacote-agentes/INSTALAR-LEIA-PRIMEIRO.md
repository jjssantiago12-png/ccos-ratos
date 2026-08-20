# Time de Agentes — Instalação no VS Code (Claude Code)

Pacote com 10 agentes especialistas + o comando `/melhorar` (pipeline
avaliação → diagnóstico → melhorias). Feito para você só colar e usar.

## O que tem aqui
```
.claude/
├── agents/
│   ├── code-reviewer.md        (Sonnet · só-leitura · roda após toda mudança)
│   ├── test-runner.md          (Haiku  · roda testes, devolve só falhas)
│   ├── debugger.md             (inherit· causa-raiz de bugs)
│   ├── backend-architect.md    (Opus   · desenha API/schema, não implementa)
│   ├── frontend-developer.md   (Sonnet · componentes React, layout)
│   ├── security-auditor.md     (Opus   · auditoria de segurança, só-leitura)
│   ├── performance-engineer.md (Sonnet · otimização com medição)
│   ├── devops-troubleshooter.md(Sonnet · build/deploy Vercel, CI, config)
│   ├── docs-writer.md          (Haiku  · README, changelog, docs)
│   └── orchestrator.md         (Opus   · o maestro que roda os outros)
└── commands/
    └── melhorar.md             (comando /melhorar)
```

## Passo a passo (2 minutos)

### 1. Escolha o escopo
- **Só neste projeto** (recomendado): cole a pasta `.claude` na RAIZ do projeto.
  Assim ela vai pro Git e todo o time usa os mesmos agentes.
- **Em todos os seus projetos**: cole o conteúdo em `~/.claude/` (no seu usuário).

### 2. Cole os arquivos
- Descompacte este pacote.
- Arraste a pasta `.claude` para a raiz do seu projeto no VS Code.
- Se você JÁ tem uma pasta `.claude` com o seu CLAUDE.md, tudo bem:
  este pacote só ADICIONA as subpastas `agents/` e `commands/`.
  **Seu CLAUDE.md não é tocado** — ele fica onde está.

### 3. Recarregue o Claude Code
Os agentes são lidos só na inicialização. No VS Code:
- Feche e reabra o painel do Claude Code, ou rode `/agents` para conferir
  se os 10 apareceram na lista.

### 4. Use
Três formas de acionar:
- **Automático** — é só pedir a tarefa; o Claude delega pelo campo `description`.
  Ex.: "revise as mudanças que acabei de fazer" → chama o code-reviewer.
- **Direto com @** — `@security-auditor confira o login`.
- **Pipeline completo** — `/melhorar adicionar filtro por cidade no catálogo`
  → o orchestrator roda avaliação → diagnóstico → melhorias e só então entrega.

## Ajustes rápidos
- **Trocar o modelo de um agente**: edite o campo `model:` no topo do arquivo
  (opus / sonnet / haiku / inherit).
- **Se o Claude Code reclamar do campo `memory:` no code-reviewer**: apague
  só aquela linha (é um recurso opcional de memória persistente).
- **Comece enxuto**: se quiser, use só code-reviewer, test-runner e debugger
  na primeira semana e adicione os outros conforme a necessidade real aparecer.
- **Apague o que não disparar** em 2 semanas — menos agentes = roteamento melhor.

## Regra de ouro
Um subagente é um "firewall de contexto", não uma personalidade. O valor é
manter o barulho (logs, testes, buscas) fora da conversa principal e devolver
só o resumo. Mantenha o time pequeno e afiado.
