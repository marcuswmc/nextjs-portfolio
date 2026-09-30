"use client";

import dynamic from "next/dynamic";
import type { ComponentType } from "react";
import type { DemoProps } from "@/components/lab/demos/types";

function PreviewLoading() {
  return <span className="text-xs tracking-[0.2em] uppercase animate-pulse opacity-60">Loading</span>;
}

/** Live preview component per lab slug (lazy, client-only). Options stay inline: next/dynamic requires an object literal. */
export const labPreviews: Record<string, ComponentType<DemoProps>> = {
  "kinetic-title": dynamic(() => import("@/components/lab/demos/KineticTitleDemo"), { ssr: false, loading: PreviewLoading }),
  "text-scramble": dynamic(() => import("@/components/lab/demos/ScrambleDemo"), { ssr: false, loading: PreviewLoading }),
  "line-reveal": dynamic(() => import("@/components/lab/demos/RevealDemo"), { ssr: false, loading: PreviewLoading }),
  magnetic: dynamic(() => import("@/components/lab/demos/MagneticDemo"), { ssr: false, loading: PreviewLoading }),
  "copy-button": dynamic(() => import("@/components/lab/demos/CopyDemo"), { ssr: false, loading: PreviewLoading }),
  "section-header": dynamic(() => import("@/components/lab/demos/SectionHeaderDemo"), { ssr: false, loading: PreviewLoading }),
  planet: dynamic(() => import("@/components/lab/demos/PlanetDemo"), { ssr: false, loading: PreviewLoading }),
};
