# Project

Portfólio pessoal de Marcus Vinicius (Full Stack Developer com foco em frontend, baseado em Porto/Lisboa). Página única com animações GSAP, scroll suave (Lenis) e um planeta 3D (Three.js), voltada para recrutadores e clientes. Inclui um assistente de chat com IA (Gemini via AI SDK) que responde perguntas sobre a trajetória profissional usando um RAG simples por palavras-chave.

## Tech Stack

| Layer | Tool |
|---|---|
| Framework | Next.js 15.4 (App Router, Turbopack no dev), React 19.1, TypeScript |
| Estilo | Tailwind CSS 4, tw-animate-css, shadcn/ui (Radix) |
| Animação | GSAP + @gsap/react, motion, Lenis (smooth scroll) |
| 3D | three, @react-three/fiber, @react-three/drei, maath |
| IA / Chat | ai (AI SDK v5), @ai-sdk/google (`gemini-2.5-flash-lite`), @ai-sdk/react, ai-elements, streamdown, zod |
| Analytics / Deploy | @vercel/analytics (Vercel) |

## Current State

> Update this section every time you return after a break. Thirty seconds here saves five minutes of re-orientation.

**Last updated:** 30-09-2026

### Working
- Seções: Navbar, Hero (planeta 3D), ServiceSummary, Services, About, Works, Contact, Chat
- Loader de progresso (useProgress do drei) antes de exibir a página
- Chat IA em `/api/chat` (removido do layout em 30-09-2026; decisão final no fim do projeto) com tool `searchTool` → `searchRelevantInfo` (RAG por keywords em `professionalData.ts`)
- Migração JS → TypeScript concluída
- Skill `interaction-design` instalada no usuário (~/.claude/skills) para microinterações/motion

### Broken / Blocked
- Nada conhecido

### Focus right now
- Branch `feat/redesign-creative-ai` — plano em [[plans/redesign-creative-ai]]. Fases 0, 1 e 2 prontas (home + /lab). Próximo: Fase 3 (/ai: registry de prompts/skills/plugins/automações, filtros, detalhe com copiar/baixar).

## Key Decisions Made

These are settled. Do not reopen them without a good reason (details in `decisions/`).

- **Modelo do chat:** Gemini 2.5 Flash Lite via `@ai-sdk/google`
- **RAG:** busca por keywords em dados estáticos (`src/lib/professionalData.ts`), sem banco vetorial
- **Linguagem:** TypeScript em todo o projeto (migrado de JS)
- **Cores:** usar tokens `canvas/ink/contrast/on-contrast` (+ `gold`), nunca `bg-black`/`text-white` fixos; dark mode segue o sistema (`prefers-color-scheme`), sem toggle
- **GSAP:** importar sempre de `@/lib/gsap` (plugins registrados lá)
- **Navegação:** desktop só header fixo; menu fullscreen apenas no mobile; links via `NavLink`
- **Lab:** adicionar itens via `src/content/lab/registry.ts` + demo + `previews.tsx` (ver plano)
- **Planeta 3D:** fora do Hero; vive na seção `Disciplines` (scroll: planeta = Creative, lua = AI)

## File Map

```
nextjs-portfolio/
├── CLAUDE.md                 # Imports @obsidian-vault/CLAUDE.md
├── obsidian-vault/           # Memória do projeto (Obsidian)
├── public/
│   ├── assets/               # backgrounds/ e projects/ (thumbnails)
│   ├── brands/               # Logos de clientes (logo01..18.png)
│   ├── models/Planet.glb     # Modelo 3D do Hero
│   └── resume/               # CV em PDF
├── src/
│   ├── app/
│   │   ├── page.tsx          # Home: loader + todas as seções dentro de ReactLenis
│   │   ├── layout.tsx        # Root layout
│   │   ├── fonts/            # Fonte Amiamie (woff2) + fonts.ts
│   │   └── api/chat/route.ts # Endpoint do chat IA (streamText + searchTool)
│   ├── sections/             # Seções da página (Hero, About, Works, Chat…)
│   ├── components/
│   │   ├── Planet.tsx        # Planeta 3D (R3F)
│   │   ├── Animated*.tsx     # Textos/headers animados com GSAP
│   │   ├── ui/               # Componentes shadcn/ui
│   │   └── ai-elements/      # Componentes de chat (message, prompt-input, reasoning…)
│   ├── constants/            # index.ts (dados), systemPrompt.ts, randomQuestions.ts
│   └── lib/                  # professionalData.ts (base do RAG), utils.ts
└── .env.local                # Chave da API Google (ignorado no git)
```

## Do Not

**Stop. Read the linked decision record before suggesting any change in these areas.**

- **Não commitar `.env.local`** nem gravar chaves de API no vault.
- **Não alterar dados pessoais/profissionais** em `professionalData.ts` sem confirmação do Marcus — é a fonte das respostas do chat.
