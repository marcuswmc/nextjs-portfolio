import type { Metadata } from "next";
import AnimatedHeaderSection from "@/components/AnimatedHeaderSection";

export const metadata: Metadata = {
  title: "AI Creative Solutions",
  description:
    "Prompts, plugins, skills and automations built by Marcus Vinicius, free to use.",
};

export default function AiPage() {
  const text = `Prompts, plugins, skills
  and automations
  free to use in your workflow`;

  return (
    <section className="min-h-screen pt-24">
      <AnimatedHeaderSection
        subtitle={"AI Developer · Solutions"}
        title={"AI"}
        text={text}
        textColor={"text-ink"}
      />
      <p className="px-8 text-sm tracking-[0.3rem] uppercase md:px-10 text-ink/60">
        In progress
      </p>
    </section>
  );
}
