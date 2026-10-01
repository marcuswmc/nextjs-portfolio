"use client";

import { ScrambleText } from "@/components/motion/ScrambleText";
import type { DemoProps } from "./types";

export default function ScrambleDemo({ values, compact }: DemoProps) {
  return (
    <ScrambleText
      text={String(values.text)}
      duration={Number(values.duration)}
      className={`${compact ? "text-4xl" : "text-[clamp(2.5rem,7vw,6rem)]"} tracking-tight cursor-default`}
    />
  );
}
