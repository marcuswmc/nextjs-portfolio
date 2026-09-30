import { systemPrompt } from "@/constants/systemPrompt";

export type AiItemType = "Prompt" | "Skill" | "Plugin" | "Automation";

export type AiItem = {
  slug: string;
  type: AiItemType;
  title: string;
  description: string;
  /** Tools it was built for. */
  tools: string[];
  /** Copyable content (prompt text, install command…). */
  content?: string;
};

export const aiTypes: { type: AiItemType; description: string }[] = [
  { type: "Prompt", description: "System prompts and templates, ready to paste." },
  { type: "Skill", description: "Agent skills that teach an AI a repeatable workflow." },
  { type: "Plugin", description: "Bundles of skills, tools and commands for AI coding agents." },
  { type: "Automation", description: "Workflows that connect AI to the tools you already use." },
];

export const aiItems: AiItem[] = [
  {
    slug: "portfolio-assistant-prompt",
    type: "Prompt",
    title: "Portfolio Assistant",
    description:
      "The system prompt behind my portfolio assistant: grounded answers through a search tool, no invented facts, replies in the visitor's language.",
    tools: ["Gemini", "AI SDK"],
    content: systemPrompt(),
  },
];
