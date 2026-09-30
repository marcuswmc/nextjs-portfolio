import type { Metadata } from "next";
import { SectionHeader } from "@/components/SectionHeader";

export const metadata: Metadata = {
  title: "AI Creative Solutions",
  description:
    "Prompts, plugins, skills and automations built by Marcus Vinicius, free to use.",
};

export default function AiPage() {
  return (
    <section className="min-h-[70vh] pt-16">
      <SectionHeader
        index="01"
        label="AI Developer · Creative Solutions"
        title="AI Lab"
        aside="Prompts, plugins, skills and automations — free to use in your workflow."
        immediate
      />
      <p className="px-8 mt-10 text-sm tracking-[0.3rem] uppercase md:px-10 text-ink/60">
        In progress
      </p>
    </section>
  );
}
