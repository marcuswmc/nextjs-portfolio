/**
 * Lab registry — metadata only, safe to import from server and client.
 * Live previews live in `./previews.tsx`, keyed by the same `slug`.
 *
 * To add an item: add an entry here, a demo in `src/components/lab/demos/`,
 * and map it in `previews.tsx`.
 */

export const labCategories = ["Components", "Text Animations", "Heros", "Sections", "3D"] as const;
export type LabCategory = (typeof labCategories)[number];

export type LabControl =
  | { name: string; label: string; type: "text"; default: string }
  | { name: string; label: string; type: "range"; default: number; min: number; max: number; step: number };

export type LabItem = {
  slug: string;
  title: string;
  category: LabCategory;
  description: string;
  /** npm packages to install. */
  dependencies: string[];
  /** Source file shown in the Code tab (relative to the project root). */
  sourcePath: string;
  /** Minimal usage example. */
  usage: string;
  /** Props the detail page lets visitors tweak. */
  controls?: LabControl[];
  /** How to interact with the preview. */
  hint: string;
  /** The animation plays once (on load or scroll), so cards offer a Replay button. */
  replayable?: boolean;
};

export const labItems: LabItem[] = [
  {
    slug: "kinetic-title",
    title: "Kinetic Title",
    category: "Heros",
    description:
      "Oversized multi-line hero title. Characters rise from a mask on load and each line drifts in its own direction as the page scrolls. Used on this site's hero.",
    dependencies: ["gsap", "@gsap/react"],
    sourcePath: "src/components/motion/KineticTitle.tsx",
    usage: `<KineticTitle
  lines={[
    { content: "Creative" },
    { content: "& AI", align: "right" },
    { content: "Developer" },
  ]}
/>`,
    controls: [
      { name: "first", label: "Line 1", type: "text", default: "Kinetic" },
      { name: "second", label: "Line 2", type: "text", default: "Type" },
    ],
    hint: "On load",
    replayable: true,
  },
  {
    slug: "text-scramble",
    title: "Text Scramble",
    category: "Text Animations",
    description:
      "Reveals text left to right through random glyphs. Triggers on hover, on mount or when scrolled into view, and keeps the real text available to screen readers.",
    dependencies: [],
    sourcePath: "src/components/motion/ScrambleText.tsx",
    usage: `<ScrambleText text="Hover me" trigger="hover" />`,
    controls: [
      { name: "text", label: "Text", type: "text", default: "HOVER ME" },
      { name: "duration", label: "Duration (ms)", type: "range", default: 600, min: 200, max: 2000, step: 100 },
    ],
    hint: "Hover",
  },
  {
    slug: "line-reveal",
    title: "Line Reveal",
    category: "Text Animations",
    description:
      "Masked line-by-line reveal powered by GSAP SplitText. Re-splits automatically when fonts load or the container resizes, so lines never break mid-animation.",
    dependencies: ["gsap", "@gsap/react"],
    sourcePath: "src/components/motion/RevealText.tsx",
    usage: `<RevealText>
  Lines rise from a mask as they enter the view.
</RevealText>`,
    controls: [
      { name: "text", label: "Text", type: "text", default: "Lines rise from a mask as they enter the view." },
      { name: "stagger", label: "Stagger (s)", type: "range", default: 0.08, min: 0, max: 0.4, step: 0.02 },
    ],
    hint: "On scroll",
    replayable: true,
  },
  {
    slug: "magnetic",
    title: "Magnetic",
    category: "Components",
    description:
      "Wraps any element and pulls it toward the cursor with an elastic spring back. Disabled automatically on touch devices and for reduced motion.",
    dependencies: ["gsap", "@gsap/react"],
    sourcePath: "src/components/motion/Magnetic.tsx",
    usage: `<Magnetic strength={0.4}>
  <button>Magnetic</button>
</Magnetic>`,
    controls: [
      { name: "strength", label: "Strength", type: "range", default: 0.5, min: 0.1, max: 1, step: 0.05 },
    ],
    hint: "Move closer",
  },
  {
    slug: "copy-button",
    title: "Copy Button",
    category: "Components",
    description:
      "Copies a value to the clipboard and confirms by scrambling its label into a success state, announced to assistive tech through a live region.",
    dependencies: [],
    sourcePath: "src/components/motion/CopyButton.tsx",
    usage: `<CopyButton value="npm i gsap" label="Copy" copiedLabel="Copied" />`,
    controls: [{ name: "value", label: "Value", type: "text", default: "npm i gsap" }],
    hint: "Click",
  },
  {
    slug: "section-header",
    title: "Section Header",
    category: "Sections",
    description:
      "Editorial section intro: index and label row, oversized title with a character reveal, optional count and a rule that draws itself in.",
    dependencies: ["gsap", "@gsap/react"],
    sourcePath: "src/components/SectionHeader.tsx",
    usage: `<SectionHeader
  index="03"
  label="Logic meets aesthetics"
  title="Works"
  count={5}
  aside="Selected projects crafted with passion."
/>`,
    controls: [{ name: "title", label: "Title", type: "text", default: "Works" }],
    hint: "On load",
    replayable: true,
  },
  {
    slug: "planet",
    title: "Orbit Planet",
    category: "3D",
    description:
      "React Three Fiber planet with a moon and a golden ring, lit by studio lightformers. It eases toward any state you feed it — on this site a GSAP scroll timeline drives it.",
    dependencies: ["three", "@react-three/fiber", "@react-three/drei"],
    sourcePath: "src/components/three/PlanetScene.tsx",
    usage: `const state = useRef({ ...initialPlanetState, scale: 1 });

<PlanetScene state={state} />`,
    controls: [
      { name: "scale", label: "Scale", type: "range", default: 0.8, min: 0.3, max: 1.2, step: 0.05 },
      { name: "moonScale", label: "Moon", type: "range", default: 1, min: 0.5, max: 2.5, step: 0.1 },
      { name: "ringTilt", label: "Ring tilt", type: "range", default: 0, min: -0.8, max: 0.8, step: 0.05 },
    ],
    hint: "Move the cursor",
  },
];

export function getLabItem(slug: string) {
  return labItems.find((item) => item.slug === slug);
}

export function controlDefaults(item: LabItem) {
  return Object.fromEntries((item.controls ?? []).map((c) => [c.name, c.default])) as Record<
    string,
    string | number
  >;
}
