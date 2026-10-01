# Lab experiments

Sources of the standalone three.js experiments shown in `/lab` (view only — no download).
`script.js` here is exactly what runs; the built scene lives in `public/lab-embeds/<slug>/`.

To rebuild one: copy its original Vite project, apply the embed lines at the top of `script.js`
(`?embed=card` hides the lil-gui panel, wheel zoom is off), and run `vite build` with
`base: './'` and `outDir` pointing at `public/lab-embeds/<slug>`.
