"use client";

import { RevealText } from "@/components/motion/RevealText";
import type { DemoProps } from "./types";

export default function RevealDemo({ values, compact }: DemoProps) {
  return (
    <RevealText
      stagger={Number(values.stagger)}
      className={
        compact
          ? "max-w-[14rem] text-2xl leading-tight tracking-tight"
          : "max-w-2xl px-8 text-[clamp(2rem,4.5vw,4rem)] leading-[1.05] tracking-tight"
      }
    >
      {String(values.text)}
    </RevealText>
  );
}
