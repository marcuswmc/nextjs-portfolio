"use client";

import { KineticTitle } from "@/components/motion/KineticTitle";
import type { DemoProps } from "./types";

export default function KineticTitleDemo({ values, compact }: DemoProps) {
  return (
    <KineticTitle
      as="p"
      drift={false}
      className={compact ? "text-5xl w-full px-6" : "text-[clamp(3rem,10vw,9rem)] w-full px-8"}
      lines={[
        { content: String(values.first) },
        {
          content: (
            <>
              <span className="font-light-italic normal-case text-gold">&amp;</span> {String(values.second)}
            </>
          ),
          align: "right",
        },
      ]}
    />
  );
}
