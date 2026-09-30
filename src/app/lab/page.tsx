import type { Metadata } from "next";
import AnimatedHeaderSection from "@/components/AnimatedHeaderSection";

export const metadata: Metadata = {
  title: "Lab",
  description:
    "A library of components, heros, sections and 3D text animations crafted by Marcus Vinicius.",
};

export default function LabPage() {
  const text = `Components, heros, sections
  and 3D experiments
  ready to preview and copy`;

  return (
    <section className="min-h-screen pt-24">
      <AnimatedHeaderSection
        subtitle={"Creative Developer · Library"}
        title={"Lab"}
        text={text}
        textColor={"text-ink"}
      />
      <p className="px-8 text-sm tracking-[0.3rem] uppercase md:px-10 text-ink/60">
        In progress
      </p>
    </section>
  );
}
