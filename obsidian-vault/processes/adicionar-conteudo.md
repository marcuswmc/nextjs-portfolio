---
type: process
status: done
date: 01-10-2026
tags: [claude/process]
---
# Adicionar conteúdo ao site (Work, Lab, AI Lab)

Context: [[CLAUDE]] · [[plans/redesign-creative-ai]]

## Work (`/work`)
1. Capturar o site em 1903×1080: hero → `public/assets/projects/<slug>.jpg`, segunda dobra → `public/assets/backgrounds/<slug>-bg.jpg` (JPEG ~80/70).
2. Detectar o stack pelo que o site carrega (scripts `_next/static`, Tailwind, Lenis…) — não supor.
3. Nova entrada em `projects` (`src/constants/index.ts`). O filtro "Stack" sai de `projectStack()`.

## Lab (`/lab`) — componente React
1. Entrada em `labItems` (`src/content/lab/registry.ts`): slug, título, categoria, descrição, deps, `sourcePath`, `usage`, `controls`, `hint`, `replayable` se anima uma vez.
2. Demo em `src/components/lab/demos/<Nome>Demo.tsx` (recebe `values` e `compact`).
3. Linha em `labPreviews` (`src/content/lab/previews.tsx`) com `dynamic(..., { ssr: false, loading: PreviewLoading })` — opções **inline**.

## Lab — experimento three.js standalone (view only)
1. Copiar o projeto Vite para uma pasta temporária (não mexer no original).
2. No `script.js`: `embedMode` por `?embed=` (`card` esconde o lil-gui) e `controls.enableZoom = !embedMode`.
3. `vite build` com `base: './'`, `outDir: public/lab-embeds/<slug>`; podar arquivos de `static/` que a cena não carrega.
4. Copiar o `script.js` final para `labs/<slug>/script.js`.
5. Entrada no registry com `embed`, `viewOnly: true`, `experimental: true` (sem `usage`).

## AI Lab (`/ai`)
1. Entrada em `aiItems` (`src/content/ai/index.ts`): tipo (Prompt, Skill, Plugin, Automation), arquivos (`content` inline, `sourcePath` do repo ou `remoteUrl` raw do GitHub — lido no build), `highlights`, `steps`, `url`, `repo`, `license`.
2. Só publicar o que é do Marcus e com texto literal da fonte (não reescrever prompts/templates).

## Verificação
- `node_modules/.bin/tsc --noEmit -p .`, screenshots via playwright **a partir do scratchpad**, e build de produção numa cópia (`rsync` + `next build`) antes de PR.
