import type { Metadata } from "next";
import { SectionHeader } from "@/components/SectionHeader";
import { LabGrid } from "@/components/lab/LabGrid";
import { labItems } from "@/content/lab/registry";

export const metadata: Metadata = {
  alternates: { canonical: "/lab" },
  title: "Lab",
  description:
    "A library of components, heros, sections, text animations and 3D experiments by Marcus Vinicius — live previews and copyable code.",
};

export default function LabPage() {
  return (
    <section className="pt-16 pb-24">
      <SectionHeader
        index="01"
        label="Creative Developer · Library"
        title="Lab"
        count={labItems.length}
        aside="Components, heros, sections and 3D experiments I build and use — live, interactive and ready to copy into your project."
        immediate
      />
      <LabGrid items={labItems} />
    </section>
  );
}
