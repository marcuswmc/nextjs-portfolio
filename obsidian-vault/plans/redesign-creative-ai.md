---
type: plan
status: draft
date: 30-09-2026
tags: [claude/plan]
---
# Redesign: Creative Developer + AI Developer

Context: [[CLAUDE]] · Branch: `feat/redesign-creative-ai`

## Goal

Deixar o portfólio mais moderno e clean (referências editoriais/suíças: tipografia grande, fundo neutro, metadados pequenos em grid, filtros Grid/List), com mais microinterações e dark mode automático pelo sistema. Posicionar o Marcus claramente em **duas vertentes: Creative Developer e AI Developer**, com duas páginas novas:

- **/lab**: biblioteca de componentes, heros, sections e animações 3D (estilo reactbits.dev), com preview ao vivo/interativo e código para copiar.
- **/ai**: AI Creative Solutions — prompts, plugins, skills, automações e MCPs criados por ele, disponíveis para uso (copiar, baixar, instalar).

## Decisões (30-09-2026)
- **Rotas:** `/lab` (componentes) e `/ai` (AI Creative Solutions).
- **Conteúdo:** subir com seed extraído do próprio site; Marcus adiciona o resto depois pelos registries.
- **Acento:** manter o dourado `#cfa355`, usado com moderação.
- **CLI (registry shadcn):** fica para uma próxima edição; por ora só copiar código.
- **Menu:** sem menu de botão no desktop; header fixo em grid (some ao rolar para baixo, volta ao rolar para cima). Menu fullscreen só no mobile.
- **Planeta 3D:** sai do Hero (Hero vira tipográfico) e ganha um uso mais interessante, ligado ao scroll (ver Fase 1).
- **Chat IA:** redesenhar botão e painel no fim (Fase 4).

## Direção visual (das referências)

- **Tipografia como protagonista:** títulos enormes (Amiamie Black/Regular), cortes na borda da tela (ASAP, HAUS), contraste de pesos.
- **Metadados em grid:** labels pequenas em colunas (nome · função · cidade · links), como Richard Ekwonye / Other°.
- **Filtros + troca de visualização:** "Service: All / Digital / 3D / AI…" e "View: List / Grid" (Orchard, Other°), com contador sobrescrito `Selected Works⁽⁵⁾`.
- **Paleta:** monocromática (off-white `#e5e5e0` / preto) com um acento único (hoje o dourado `#cfa355`).
- **Rodapé com nome gigante** (Dominic) e cards com bordas finas em grid (Dark Mode Aesthetics).

## Steps

### Fase 0: Fundação
- [x] **Tokens de design** em `globals.css`: `--bg`, `--fg`, `--muted`, `--line`, `--surface-inverse`, `--accent`. Hoje há cores fixas (`bg-black`, `text-white`, `#e5e5e0`) espalhadas; tudo passa a usar tokens.
- [x] **Dark mode pelo sistema:** trocar `@custom-variant dark (&:is(.dark *))` por `prefers-color-scheme`, sem toggle. Seções que hoje são "invertidas" (pretas) ganham uma superfície própria no dark (ex.: `#0d0d0c` vs `#1a1a18`) para manter o ritmo claro/escuro.
- [x] **Layout multi-página:** mover `ReactLenis` para um provider no `layout.tsx`; transformar `page.tsx` em server component (metadata por página) com seções client dentro. Loader de progresso 3D só na home.
- [x] **Navegação:** header fixo em grid com `mix-blend-difference` (Marcus Vinicius · Creative & AI Developer · Porto + relógio local · Work, Lab, AI, Contact), esconde ao rolar para baixo. Menu fullscreen só no mobile, com as rotas novas (`NavLink` = Next Link + scroll Lenis para âncoras).
- [x] **Base de motion:** hook `useReducedMotion`, utilitários GSAP (SplitText e Flip já vêm no GSAP 3.13), primitivos reutilizáveis: `MagneticButton`, `TextScramble`, `RevealText`, `HoverUnderline`, `CopyButton`.
- [x] Limpeza: remover dependências sem uso (`npx`, `tsc`, `react-slick`, possivelmente `react-scroll`), arquivos `.DS_Store`.

### Fase 1: Home redesenhada (seção por seção)
- [x] **Hero:** só tipografia — dupla identidade gigante ("CREATIVE / AI — DEVELOPER", troca animada tipo scramble), sem o planeta.
- [x] **ServiceSummary → "Two disciplines" com o planeta:** seção fixada (pin) em que o scroll controla o planeta — a esfera grande = Creative, a lua = AI; o anel gira e a câmera se aproxima conforme as palavras-chave de cada vertente entram de um lado e do outro. O planeta também vira item do /lab.
- [x] **Services:** mantém os cards empilhados sticky, reorganizados: Creative Development (3D/WebGL, Motion, UI), AI Development (LLM apps, RAG/agentes, automações, MCP/plugins), Full Stack, Performance & SEO. Índices `01/02`, hover que revela detalhes.
- [x] **Works:** filtros por categoria + toggle **List / Grid** com transição **GSAP Flip**; lista mantém o preview flutuante no hover; grid com zoom/cor no hover. Contador sobrescrito.
- [x] **Novo: Lab teaser** — 3 a 4 componentes em destaque com preview ao vivo → `/lab`.
- [x] **Novo: AI Solutions teaser** — cards de prompts/skills em destaque com "copiar" → `/ai`.
- [x] **About:** layout editorial mais limpo, foto com reveal, números (anos de experiência, projetos, marcas), texto sem emojis ou com ícones discretos.
- [x] **Brands:** reaproveitar `ContactSummary` (hoje fora da página) como grid de logos com bordas finas, estilo "Trusted by".
- [x] **Contact + Footer:** e-mail com copiar-para-área-de-transferência + feedback, botões magnéticos, relógio local, nome gigante no rodapé.
- [x] **Chat IA:** adaptado ao tema via tokens (redesign completo na Fase 4).

Notas da implementação (30-09-2026):
- Seções novas: `Disciplines` (planeta com scroll, `components/three/PlanetScene` + `PlanetModel`), `LabTeaser`, `AiTeaser`; `SectionHeader` substitui `AnimatedHeaderSection`; `SiteFooter` e `HashScroll` no layout.
- Loader de progresso 3D removido: o canvas do planeta só monta perto da seção.
- Registry inicial de IA em `src/content/ai/` (1 item real: prompt do assistente do portfólio).
- Lição: não usar `transition-transform` (CSS) no mesmo elemento que o GSAP anima — trava o transform. Separar em wrapper.
- Lição: `cn()` (tailwind-merge) descarta `leading-*` que venha **antes** de um `text-[tamanho]` — colocar o leading depois do tamanho.
- Hero: fonte do título = `min(14vw, (100svh - 340px) / 2.46)`, cabe em qualquer altura de tela.

### Fase 2: Página /lab (biblioteca de componentes)
- [x] **Registry tipado** em `src/content/lab/`: `slug`, título, categoria (Components, Heros, Sections, Text Animations, 3D), tags, dependências, preview (carregado com `next/dynamic`), código-fonte e props.
- [x] **Listagem:** filtro por categoria, busca, cards com preview ao vivo que só roda quando está visível (IntersectionObserver). Os previews 3D usam **um único canvas compartilhado** (`View` do drei) para não abrir vários contextos WebGL.
- [x] **Página de detalhe `/lab/[slug]`:** preview grande e interativo, controles de props, abas Preview/Code, código com syntax highlight (shiki) e botão copiar.
- [x] Conteúdo inicial, extraído do próprio site: AnimatedTextLines, Works hover preview, MagneticButton, TextScramble, Planet 3D.
- [ ] ~~Instalação via CLI com registry shadcn~~ → adiado para próxima edição.

Notas da implementação (30-09-2026):
- Registry em `src/content/lab/registry.ts` (metadados + `sourcePath`, `usage`, `controls`) e previews em `src/content/lab/previews.tsx` (next/dynamic, opções **inline** — o Next exige objeto literal). Demos em `src/components/lab/demos/`.
- Detalhe `/lab/[slug]` é SSG (`dynamicParams = false`): lê o arquivo-fonte com `fs` no build e destaca com shiki (tema claro/escuro via CSS).
- Previews do grid montam só perto da viewport (`InView`); com um só item 3D, o canvas compartilhado (`View` do drei) não foi necessário ainda.
- 7 itens: Kinetic Title (extraído do Hero), Text Scramble, Line Reveal, Magnetic, Copy Button, Section Header, Orbit Planet.
- R3F atualizado 9.2 → 9.8.1: a 9.2 perdia o contexto WebGL no dev (StrictMode do React 19).
- Ajustes pós-Fase 2 (30-09-2026): Works saiu da home e virou a página `/work`; chat IA removido do layout (código e `/api/chat` mantidos para decisão final); cards do Lab (`LabCard`, compartilhado com a home) ganharam botão Replay e previews dos cards montam quando o card entra na tela (animações disparam no scroll) e Replay remonta o preview; o `ScrollStage` interno foi testado e descartado a pedido; drift do `KineticTitle` agora em wrappers com `fromTo` a partir de 0 (volta ao estado inicial ao rolar de volta).
- **Como adicionar um item:** entrada no registry + demo em `components/lab/demos/` + linha em `previews.tsx`.

### Fase 3: Página /ai (AI Creative Solutions)
- [x] **Registry tipado** em `src/content/ai/`: tipo (Prompt, Skill, Plugin, Automation, MCP), título, descrição, ferramentas compatíveis (Claude, ChatGPT, n8n…), conteúdo em markdown, arquivos para download e link do GitHub.
- [x] **Listagem** com filtros por tipo e ferramenta; cards com ações rápidas (copiar prompt, baixar, instalar).
- [x] **Detalhe `/ai/[slug]`:** markdown renderizado com `streamdown` (já instalado), bloco de instalação copiável e arquivos para baixar (em `public/ai/`).
- [x] Conteúdo inicial: o assistente RAG do portfólio (system prompt + tool) como primeiro case.

Notas da implementação (30-09-2026):
- Registry em `src/content/ai/index.ts`: tipos Prompt, Skill, Plugin, Automation, Tool; arquivos inline ou `sourcePath` (lidos no build, com recorte por marcadores `from`/`to`); `highlights`, `steps`, `url`, `repo`, `license`.
- `/ai` (filtros por tipo e ferramenta, Flip, copiar/baixar no card, "In the works" para tipos vazios) e `/ai/[slug]` SSG (abas de arquivos com shiki, copiar/baixar, passo a passo, links).
- Download gerado no navegador (Blob) — sem arquivos em `public/`.
- Uso de "steps" estruturados no lugar de markdown/streamdown (evita estilos do streamdown).
- Itens: **Obsidian Memory** (plugin do Marcus — comandos de instalação literais do site, MIT, GitHub) e **HPLG Framework** (prompt framework do Marcus — só destaques + link; o texto dos templates não foi copiado para não publicar versão alterada). Portfolio Assistant e Keyword RAG Chat foram removidos a pedido; tipo "Tool" também.
- Áreas de código com scroll usam `data-lenis-prevent` (senão o Lenis captura a roda). Links de navegação sem Text Scramble.
- **Como adicionar um item:** nova entrada em `aiItems`; listagem, filtros e página de detalhe são automáticos.

### Fase 4: Acabamento (concluída 30-09-2026)
- [x] Transição entre páginas: cortina (`PageTransition`) com o nome do destino; `NavLink` usa para rotas diferentes; voltar/avançar do navegador é instantâneo; respeita reduced motion.
- [x] SEO: `metadataBase` = `NEXT_PUBLIC_SITE_URL` ou **https://marcussilva.dev**, canonical por página, Open Graph/Twitter, imagens OG geradas (`opengraph-image.tsx` por rota e por item), `sitemap.ts`, `robots.ts`, JSON-LD Person na home.
- [x] Performance: bundle da home 471 kB → 195 kB (estado do planeta em módulo sem three.js; chat fora do layout); só 3 fontes Amiamie (regular, light, light italic); `next/image` no /work; canvas do planeta monta só com a seção 20% na tela, chunk aquecido no idle; deps removidas (`react-responsive`, `maath`).
- [x] Acessibilidade: SplitText com `aria: "none"` + cópia `sr-only` (fim do aria-label proibido em span/p); textos secundários com opacidade ≥ 60–65% (contraste AA); link "Skip to content"; página 404 no estilo.
- [x] Lighthouse (mobile, build de produção local): Home 90/100/96/100 · Lab 98/100/96/100 · AI 97/100/96/100 · Work 96/100/96/100 (Perf/A11y/BP/SEO). BP 96 = só o script do Vercel Analytics 404 em localhost.
- [ ] **Chat IA:** decisão do Marcus no fim (manter, alterar ou remover). Código e `/api/chat` preservados, fora do layout.
- Pendência de conteúdo: link do CV em `professionalData.ts` aponta para `marcusdev.me` (arquivo protegido — confirmar com o Marcus).

## Risks
- **Vários canvases WebGL** (home + lab) pesam no mobile → canvas compartilhado, render sob demanda, fallback estático no mobile.
- **Dark mode** com seções invertidas pode perder contraste → validar os tokens nos dois temas (WCAG AA).
- **Conteúdo real** para /lab e /ai depende do Marcus; sem ele, as páginas sobem com poucos itens.
- **Escopo grande:** entregar por fase, cada uma revisável no preview (commits separados).

## Status
Fases 0–4 concluídas (30-09-2026). Pendente: decisão sobre o chat IA; revisão final e PR.
