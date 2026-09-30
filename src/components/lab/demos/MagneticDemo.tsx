"use client";

import { Magnetic } from "@/components/motion/Magnetic";
import type { DemoProps } from "./types";

export default function MagneticDemo({ values, compact }: DemoProps) {
  return (
    <Magnetic strength={Number(values.strength)}>
      <span
        className={`flex items-center justify-center text-sm tracking-wider uppercase transition-colors duration-300 border rounded-full border-ink/40 hover:bg-ink hover:text-canvas ${
          compact ? "size-28" : "size-44"
        }`}
      >
        Magnetic
      </span>
    </Magnetic>
  );
}
