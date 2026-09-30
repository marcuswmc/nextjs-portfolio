import type { Metadata } from "next";
import { SectionHeader } from "@/components/SectionHeader";

export const metadata: Metadata = {
  title: "Lab",
  description:
    "A library of components, heros, sections and 3D text animations crafted by Marcus Vinicius.",
};

export default function LabPage() {
  return (
    <section className="min-h-[70vh] pt-16">
      <SectionHeader
        index="01"
        label="Creative Developer · Library"
        title="Lab"
        aside="Components, heros, sections and 3D experiments — ready to preview and copy."
        immediate
      />
      <p className="px-8 mt-10 text-sm tracking-[0.3rem] uppercase md:px-10 text-ink/60">
        In progress
      </p>
    </section>
  );
}
