/**
 * AI Lab registry — metadata only, safe to import from server and client.
 * Files either carry inline `content` or point at a `sourcePath` in this repo,
 * which the server reads at build time (optionally trimmed between two markers).
 *
 * To add an item: append to `aiItems`. The listing, filters and `/ai/[slug]` page follow.
 */

export const aiTypes = ["Prompt", "Skill", "Plugin", "Automation"] as const;
export type AiItemType = (typeof aiTypes)[number];

export const aiTypeDescriptions: Record<AiItemType, string> = {
  Prompt: "System prompts and templates, ready to paste.",
  Skill: "Agent skills that teach an AI a repeatable workflow.",
  Plugin: "Bundles of skills, tools and commands for AI coding agents.",
  Automation: "Workflows that connect AI to the tools you already use.",
};

export type AiFileLang = "markdown" | "tsx" | "ts" | "json" | "bash";

export type AiFile = {
  name: string;
  lang: AiFileLang;
  /** Inline content… */
  content?: string;
  /** …or a file in this repo, read at build time. */
  sourcePath?: string;
  /** Keep only the part between these markers (start included, end excluded). */
  from?: string;
  to?: string;
};

export type AiItem = {
  slug: string;
  type: AiItemType;
  title: string;
  description: string;
  /** Models, SDKs or apps it was built for. */
  tools: string[];
  /** First file is the primary one (copied from cards). Empty for items that live on their own site. */
  files: AiFile[];
  /** Key points shown on cards and the detail page. */
  highlights?: string[];
  /** How to use it, step by step. */
  steps: string[];
  /** Project site. */
  url?: string;
  license?: string;
  repo?: string;
};

export const aiItems: AiItem[] = [
  {
    slug: "obsidian-memory",
    type: "Plugin",
    title: "Obsidian Memory",
    description:
      "Open-source plugin for Claude Code and Claude Cowork that keeps persistent project memory in Markdown: context loads at session start, sessions are archived and decisions are recorded.",
    tools: ["Claude Code", "Claude Cowork"],
    files: [
      {
        name: "install (Claude Code)",
        lang: "bash",
        content: [
          "/plugin marketplace add marcuswmc/obsidian-memory-plugin",
          "/plugin install obsidian-memory@obsidian-memory",
          "/obsidian-memory:vault init",
        ].join("\n"),
      },
    ],
    highlights: [
      "Loads project history and decisions automatically at session start",
      "Archives the session before the conversation is compacted",
      "Numbered decision records with the reasoning behind them",
      "~82% fewer context tokens to resume a project",
      "Local-only Markdown vault, optional git versioning",
    ],
    steps: [
      "In Claude Code, run the three install commands: add the marketplace, install the plugin and initialise the vault in your project.",
      "Using Claude Cowork instead? Install \"Obsidian Memory for Cowork\" from the same marketplace.",
      "Requirements: macOS, Linux or Windows with Python 3.8+; git is optional and only used to version the vault.",
      "Work as usual — the vault in `obsidian-vault/` loads at the start of each session and records what was done.",
    ],
    url: "https://obsidian-memory-site.vercel.app/",
    license: "MIT",
    repo: "https://github.com/marcuswmc/obsidian-memory-plugin",
  },
  {
    slug: "hplg-framework",
    type: "Prompt",
    title: "HPLG Framework",
    description:
      "High-Fidelity Product Label Generation: a prompt framework for AI product images with readable label typography, structured hierarchy and photorealistic rendering.",
    tools: ["Image models"],
    files: [],
    highlights: [
      "5 modules: Scene Blueprint, Central Subject, Label Structure, Visual Style, Anti-Hallucination",
      "ULGE — Universal Label Grid Extractor: turns a product photo into a standard label layout",
      "Master Template V5: the full prompt, with placeholders for reference image, product image and label grid",
      "Built to stop models treating packaging text as decoration — no illegible labels or distorted logos",
    ],
    steps: [
      "Start from the product image you want to render.",
      "Run the ULGE prompt on it to extract the label layout grid.",
      "Fill the Master Template V5 placeholders — reference image, product image and the extracted grid.",
      "Generate: the output keeps the label readable and aligned while the scene stays photorealistic.",
    ],
    url: "https://hplg-framework.vercel.app/",
  },
];

/** Label for the primary copy action. */
export function copyLabel(item: AiItem) {
  if (item.type === "Plugin") return "Copy install";
  if (item.type === "Prompt") return "Copy prompt";
  return "Copy code";
}

export function getAiItem(slug: string) {
  return aiItems.find((item) => item.slug === slug);
}
