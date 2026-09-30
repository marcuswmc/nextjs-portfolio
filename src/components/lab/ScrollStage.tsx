"use client";

import { useState, type ReactNode } from "react";
import { cn } from "@/lib/utils";

type ScrollStageProps = {
  /** Receives the scroll container once mounted, to use as a ScrollTrigger `scroller`. */
  children: (scroller: HTMLElement) => ReactNode;
  className?: string;
};

/**
 * A self-contained scroll area for scroll-driven demos, so the animation runs
 * inside its card without moving the page. `data-lenis-prevent` keeps Lenis out.
 */
export function ScrollStage({ children, className }: ScrollStageProps) {
  const [scroller, setScroller] = useState<HTMLDivElement | null>(null);

  return (
    <div
      ref={setScroller}
      data-lenis-prevent
      className={cn("absolute inset-0 overflow-y-auto overscroll-contain [scrollbar-width:thin]", className)}
    >
      <div className="flex flex-col items-center justify-center h-full gap-2 text-xs tracking-[0.2em] uppercase opacity-50">
        <span>Scroll inside</span>
        <span className="animate-bounce">↓</span>
      </div>
      {/* One viewport of travel: fully scrolled, the demo sits centred */}
      <div className="flex items-center justify-center h-full">{scroller && children(scroller)}</div>
    </div>
  );
}
