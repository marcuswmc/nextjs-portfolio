import type { Metadata } from "next";
import { SectionHeader } from "@/components/SectionHeader";
import { AiGrid } from "@/components/ai/AiGrid";
import { aiItems } from "@/content/ai";
import { primaryContent } from "@/lib/ai-files";

export const metadata: Metadata = {
  alternates: { canonical: "/ai" },
  title: "AI Lab",
  description:
    "Prompts, skills, plugins, automations and AI building blocks by Marcus Vinicius — free to copy, download and use.",
};

export default async function AiPage() {
  const entries = await Promise.all(
    aiItems.map(async (item) => ({ item, primary: await primaryContent(item) }))
  );

  return (
    <section className="pt-16 pb-24">
      <SectionHeader
        index="01"
        label="AI Developer · Creative Solutions"
        title="AI Lab"
        count={aiItems.length}
        aside="Prompts, skills, plugins and automations I build for my own work — shared openly, free to copy, download and use in yours."
        immediate
      />
      <AiGrid entries={entries} />
    </section>
  );
}
