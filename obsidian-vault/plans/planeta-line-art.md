---
type: plan
status: done
date: 01-10-2026
tags: [claude/plan]
---
# Planeta em line art na seção Two Disciplines

Context: [[CLAUDE]] · [[plans/redesign-creative-ai]]

## Goal
Trocar o planeta 3D da home por um **desenho minimalista só de linhas** (estilo quadrinho, sem preenchimento). A seção começa com o planeta no centro; o scroll faz o planeta **crescer até tomar a tela** ("entramos" nele), os textos de Creative e AI acontecem lá dentro, e no fim o planeta **diminui de volta** ao tamanho inicial.

## Viabilidade
- Sim. **SVG + GSAP** (ScrollTrigger scrub + DrawSVG, que é grátis desde o GSAP 3.13). Linhas com `vector-effect: non-scaling-stroke` ficam finas em qualquer escala, nítidas e baratas.
- Ganho extra: **a home deixa de carregar three.js e o GLB** (Lighthouse melhora). O planeta 3D continua no `/lab` (Orbit Planet).
- Dark mode automático (`stroke: currentColor`).

## Coreografia (seção ~600vh, conteúdo sticky)
0. **Entrada:** o planeta se desenha (DrawSVG 0 → 100%) no centro, ~35vmin; "(01) Two disciplines — scroll to enter".
1. **Zoom in (0–20%):** escala até o círculo passar da diagonal da tela; o anel varre a câmera e sai; a lua voa para um canto; as faixas viram curvas gigantes cruzando a tela (fundo).
2. **Dentro — Creative (20–50%):** título CREATIVE DEVELOPER (SplitText), 4 itens com **ícones de linha que se desenham** (cubo wireframe, curva bezier, grid de UI, chaves de código), contador 01/02.
3. **Transição (50–55%):** uma faixa varre a tela e "limpa" o texto.
4. **Dentro — AI (55–80%):** AI DEVELOPER + itens com ícones (grafo de nós, plug/MCP, balão de chat, brilho criativo), pontos se conectando.
5. **Zoom out (80–95%):** textos saem, planeta volta ao tamanho inicial, lua retorna à órbita; "Design × Intelligence" aparece ao lado.
6. Barra de progresso Creative → AI mantida. Parallax leve com o mouse e rotação lenta do anel.

## Steps
- [x] `LinePlanet.tsx` (SVG): esfera, faixas recortadas, crateras, anel em 2 metades (metade de trás mascarada pela esfera), lua, brilhos; refs por parte.
- [x] Ícones de linha (8) para os itens Creative/AI.
- [x] Timeline scrubbed em `Disciplines.tsx` com as fases acima; remover PlanetScene/planetState da home.
- [~] Estilo "quadrinho" — não escolhido (ficou o traço limpo): variações levemente irregulares dos paths trocadas a cada ~120ms ("boiling line") — sem filtro SVG pesado.
- [x] Reduced motion: sem zoom, planeta estático + as duas listas visíveis.
- [x] Mobile: escala por `vmax`, textos empilhados.
- [x] Verificar legibilidade (linhas de fundo com opacidade baixa atrás do texto), Lighthouse e os dois temas.

## Risks
- Linhas gigantes atrás do texto podem competir com a leitura → opacidade baixa e áreas livres.
- Estilo quadrinho com filtro SVG em escala grande é pesado → usar variações de path, não `feDisplacementMap`.

## Decisões (01-10-2026)
- Estilo **A · traço limpo**; **anel e lua dourados**; **fundo invertido** ao entrar (interior preenchido com a cor `ink`, textos/linhas na cor `canvas` — funciona nos dois temas).

## Status
Concluído (01-10-2026).

Notas:
- `src/components/LinePlanet.tsx` (SVG, centro em 0,0, `vector-effect: non-scaling-stroke`), `src/components/LineIcon.tsx` (8 ícones), timeline em `src/sections/Disciplines.tsx` (seção 600vh, sticky).
- Zoom: escala calculada para o raio cobrir a diagonal da tela; `svgOrigin: "0 0"` em **todo** tween do planeta (não persiste sozinho).
- Inversão: `[data-planet-fill]` (cor `ink`) + cor das linhas `ink → canvas`, trocadas só enquanto o planeta cobre a tela (sem cinza intermediário); cores lidas das CSS vars dentro de `gsap.matchMedia` (refaz ao trocar tema).
- Lição: `from()` com stagger dentro de timeline só pré-renderiza o 1º alvo → estados iniciais com `gsap.set` + `to()`.
- Ajuste 01-10-2026: sem textos de entrada ("Two disciplines / ONE craft", "Scroll to enter"), sem outro "Design × Intelligence" e sem barra de progresso — só o planeta e os textos de dentro. Lá dentro, faixas e crateras somem e o anel fica a 20% (uma curva dourada sutil).
- A home não carrega mais three.js nem o GLB; o Orbit Planet 3D segue no `/lab`. Lighthouse home (3 execuções): 87–90 / 100 / 96 / 100.
