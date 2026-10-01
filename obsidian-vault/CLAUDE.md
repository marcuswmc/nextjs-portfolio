# Project

Portfólio de Marcus Vinicius, **Creative Developer & AI Developer** baseado em Porto, publicado em **marcussilva.dev**. Site editorial (tipografia grande, grid, dark mode automático) com home, `/work` (projetos), `/lab` (biblioteca de componentes e experimentos 3D com preview ao vivo) e `/ai` (prompts, skills e plugins do Marcus). Público: clientes e recrutadores; objetivo é deixar evidentes as duas vertentes, Creative e AI.

## Tech Stack

| Layer | Tool |
|---|---|
| Framework | Next.js 15.4 (App Router, Turbopack no dev), React 19.1, TypeScript |
| Estilo | Tailwind CSS 4 (tokens `canvas/ink/contrast/on-contrast/gold`), fonte Amiamie (3 cortes) |
| Animação | GSAP 3.13 (ScrollTrigger, SplitText, Flip) via `@/lib/gsap`, Lenis |
| 3D | three, @react-three/fiber 9.8, @react-three/drei; experimentos three.js puros em iframe |
| Código/SEO | shiki (highlight no build), next/og (imagens OG), sitemap/robots |
| IA (desligado) | ai SDK v5 + @ai-sdk/google — chat fora do layout, código mantido |
| Deploy | Vercel, @vercel/analytics, domínio marcussilva.dev (`NEXT_PUBLIC_SITE_URL` opcional) |

## Current State

> Update this section every time you return after a break. Thirty seconds here saves five minutes of re-orientation.

**Last updated:** 01-10-2026

### Working
- Redesign completo na branch `feat/redesign-creative-ai` (fases 0–4 + ajustes): home (Hero tipográfico, Disciplines com planeta no scroll, Services com 2 disciplinas, prévias do Lab e AI Lab, About + marcas, Contact), `/work` (8 projetos, filtro + List/Grid), `/lab` (9 itens, 2 experimentos 3D view-only), `/ai` (Obsidian Memory plugin, Obsidian Memory Vault skill, HPLG Framework), 404, SEO/OG.
- Lighthouse mobile (prod local): Home 90 · Lab 98 · AI 97 · Work 96; Acessibilidade 100 em todas.
- Plano e histórico: [[plans/redesign-creative-ai]] · como adicionar conteúdo: [[processes/adicionar-conteudo]] · última sessão: [[daily/01-10-2026/session-18h42]].

### Broken / Blocked
- Nada quebrado. **Em espera:** 3 cenas 3D da Revelo (phase2-delivery, puna, the perfect pull) — não publicar até o Marcus confirmar autorização.

### Focus right now
- Revisão final do Marcus no preview e PR `feat/redesign-creative-ai` → `main` (só quando ele pedir). Ele vai mandar mais conteúdo para Lab/AI/Work.

## Key Decisions Made

These are settled. Do not reopen them without a good reason (details in `decisions/`).

- **Cores e tema:** tokens do site, nunca `bg-black`/`text-white` fixos; dark mode só pelo sistema, sem toggle.
- **GSAP:** importar de `@/lib/gsap`; Flip de grids via `src/lib/flip.ts` (segura `minHeight` do container).
- **Navegação:** header fixo no desktop, menu fullscreen só no mobile; links via `NavLink`; sem transição de páginas e sem loader inicial (removidos a pedido).
- **Planeta 3D:** fora do Hero; vive em `Disciplines`, monta na 1ª interação com a seção a ≤1,5 viewport.
- **Services:** só 2 disciplinas — Creative Development e AI Development (6 itens cada).
- **Conteúdo honesto:** só publicar itens do Marcus; stacks de projetos detectados nos sites; nada de templates/skills de terceiros como dele.
- **Chat IA:** desligado (fora do layout); `/api/chat` e `src/sections/Chat.tsx` mantidos.

## File Map

```
nextjs-portfolio/
├── CLAUDE.md                     # Importa @obsidian-vault/CLAUDE.md
├── obsidian-vault/               # Memória do projeto
├── labs/<slug>/script.js         # Fonte dos experimentos 3D (aba Code) + README de rebuild
├── public/
│   ├── lab-embeds/<slug>/        # Build estático dos experimentos (iframe)
│   ├── assets/projects|backgrounds/  # Imagens dos cards do /work
│   └── models/Planet.glb · brands/ · resume/
└── src/
    ├── app/                      # home, work, lab, lab/[slug], ai, ai/[slug], not-found, sitemap, robots, opengraph-image
    ├── sections/                 # Hero, Disciplines, Services, Works, LabTeaser, AiTeaser, About, Contact, Navbar, Chat (off)
    ├── components/               # SectionHeader, InView, motion/*, navigation/*, three/*, lab/*, ai/*
    ├── content/lab/              # registry.ts (itens do Lab) + previews.tsx
    ├── content/ai/index.ts       # itens do AI Lab
    ├── constants/index.ts        # services, projects, socials, contato
    └── lib/                      # gsap, flip, highlight (shiki), ai-files, og, site, professionalData (RAG)
```

## Do Not

**Stop. Read the linked decision record before suggesting any change in these areas.**

- **Do not commitar `.env.local`** nem gravar chaves de API no vault.
- **Do not alterar dados pessoais/profissionais em `professionalData.ts`** sem confirmação do Marcus — é a fonte das respostas do chat.
- **Do not publicar as cenas da Revelo** (tasks RL-gym) até ele confirmar autorização.
- **Do not usar `transition-transform` (CSS) no mesmo elemento que o GSAP anima** — trava o transform; separar em wrapper.
- **Do not colocar `leading-*` antes de `text-[tamanho]` dentro de `cn()`** — o tailwind-merge descarta o leading.
- **Do not passar objeto em variável para `next/dynamic`** — as opções precisam ser literais inline.
- **Do not rodar scripts de teste (playwright) com cwd no projeto** — salvam PNGs na raiz; usar o scratchpad.
