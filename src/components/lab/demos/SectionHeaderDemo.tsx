"use client";

import { SectionHeader } from "@/components/SectionHeader";
import type { DemoProps } from "./types";

export default function SectionHeaderDemo({ values, compact }: DemoProps) {
  return (
    // Compact cards render it at desktop width and scale it down, so the title keeps its proportions
    <div className={compact ? "w-[190%] shrink-0 scale-[0.5] origin-center" : "w-full"}>
      <SectionHeader
        index="03"
        label="Logic meets aesthetics"
        title={String(values.title)}
        count={5}
        aside="Selected projects crafted with passion."
        size="lg"
        immediate
        className="pt-0 md:pt-0"
      />
    </div>
  );
}
