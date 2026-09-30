/**
 * AI Lab registry — metadata only, safe to import from server and client.
 * Files either carry inline `content` or point at a `sourcePath` in this repo,
 * which the server reads at build time (optionally trimmed between two markers).
 *
 * To add an item: append to `aiItems`. The listing, filters and `/ai/[slug]` page follow.
 */
import { systemPrompt } from "@/constants/systemPrompt";

export const aiTypes = ["Prompt", "Skill", "Plugin", "Automation", "Tool"] as const;
export type AiItemType = (typeof aiTypes)[number];

export const aiTypeDescriptions: Record<AiItemType, string> = {
  Prompt: "System prompts and templates, ready to paste.",
  Skill: "Agent skills that teach an AI a repeatable workflow.",
  Plugin: "Bundles of skills, tools and commands for AI coding agents.",
  Automation: "Workflows that connect AI to the tools you already use.",
  Tool: "Building blocks for AI apps — tools, RAG and agent code.",
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
  {
    slug: "portfolio-assistant-prompt",
    type: "Prompt",
    title: "Portfolio Assistant",
    description:
      "The system prompt behind my portfolio assistant: grounded answers through a search tool, no invented facts, replies in the visitor's language.",
    tools: ["Gemini", "AI SDK"],
    files: [{ name: "system-prompt.md", lang: "markdown", content: systemPrompt() }],
    steps: [
      "Copy the prompt and set it as the system message of your chat model.",
      "Give the model a search tool named `searchTool` (see the Keyword RAG item) so it can look up facts before answering.",
      "Replace the role description with your own profession and adjust the ALWAYS / NEVER lists to your tone.",
      "Keep the fallback sentence: it stops the model from inventing answers when the search returns nothing.",
    ],
  },
  {
    slug: "keyword-rag-chat",
    type: "Tool",
    title: "Keyword RAG Chat",
    description:
      "A lightweight retrieval setup for personal sites: a typed knowledge base, a scoring search without embeddings or a vector database, and an AI SDK route that calls it as a tool.",
    tools: ["AI SDK", "Gemini", "Next.js"],
    files: [
      { name: "app/api/chat/route.ts", lang: "ts", sourcePath: "src/app/api/chat/route.ts" },
      {
        name: "lib/search.ts",
        lang: "ts",
        sourcePath: "src/lib/professionalData.ts",
        from: "export function searchRelevantInfo",
        to: "// ==========================================\n// 📊",
      },
      {
        name: "lib/knowledge.ts",
        lang: "ts",
        sourcePath: "src/lib/professionalData.ts",
        from: "export interface ProfessionalInfo",
        to: "export const professionalData",
      },
    ],
    steps: [
      "Describe yourself as an array of entries (`id`, `category`, `content`, `keywords`) — one entry per topic: bio, skills, projects, contact.",
      "Drop in the search function: it scores entries by keyword hits, words in content and category, and full-phrase matches, then returns the top results.",
      "Add the route and expose the search as a tool; the model calls it before answering and quotes only what comes back.",
      "Install `ai`, `@ai-sdk/google` and `zod`, set `GOOGLE_GENERATIVE_AI_API_KEY`, and pair it with the Portfolio Assistant prompt.",
    ],
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
