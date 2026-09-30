"use client";

import { CopyButton } from "@/components/motion/CopyButton";
import type { DemoProps } from "./types";

export default function CopyDemo({ values, compact }: DemoProps) {
  const value = String(values.value);
  return (
    <div
      className={`flex items-center gap-3 font-mono border rounded-full border-ink/30 ${
        compact ? "px-4 py-3 text-sm" : "px-6 py-4 text-lg"
      }`}
    >
      <code>{value}</code>
      <CopyButton value={value} className="px-3 py-1 text-xs uppercase rounded-full bg-ink text-canvas" />
    </div>
  );
}
