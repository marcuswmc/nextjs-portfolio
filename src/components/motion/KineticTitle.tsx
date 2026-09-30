"use client";

import { createElement, useRef, type ReactNode } from "react";
import { gsap, SplitText, useGSAP } from "@/lib/gsap";
import { useReducedMotion } from "@/hooks/useReducedMotion";
import { cn } from "@/lib/utils";

type KineticLine = { content: ReactNode; align?: "left" | "center" | "right" };

type KineticTitleProps = {
  lines: KineticLine[];
  as?: "h1" | "h2" | "p";
  className?: string;
  /** Horizontal drift per line (xPercent) while the title scrolls away. `false` disables it. */
  drift?: number[] | false;
  /** ScrollTrigger start for the drift, relative to the title. */
  driftStart?: string;
  delay?: number;
};

/** Oversized multi-line title: chars rise from a mask on mount, lines drift apart on scroll. */
export function KineticTitle({
  lines,
  as = "h1",
  className,
  drift = [-12, 14, -6],
  driftStart = "top center",
  delay = 0.2,
}: KineticTitleProps) {
  const ref = useRef<HTMLElement | null>(null);
  const reduced = useReducedMotion();

  useGSAP(
    () => {
      if (reduced || !ref.current) return;
      const lineEls = gsap.utils.toArray<HTMLElement>("[data-line]", ref.current);

      const split = SplitText.create(lineEls, {
        type: "chars",
        mask: "chars",
        autoSplit: true,
        onSplit(self) {
          return gsap.from(self.chars, {
            yPercent: 115,
            duration: 1.4,
            ease: "expo.out",
            stagger: 0.035,
            delay,
          });
        },
      });

      if (drift) {
        // Drift lives on wrappers (not the split targets) and always starts from an explicit 0,
        // so scrolling back — after a resize, re-split or hot reload — lands on the initial layout.
        gsap.utils.toArray<HTMLElement>("[data-line-wrap]", ref.current).forEach((wrap, i) => {
          gsap.fromTo(
            wrap,
            { xPercent: 0 },
            {
              xPercent: drift[i % drift.length],
              ease: "none",
              scrollTrigger: {
                trigger: ref.current,
                start: `clamp(${driftStart})`,
                end: "clamp(bottom top)",
                scrub: true,
                invalidateOnRefresh: true,
              },
            }
          );
        });
      }

      return () => split.revert();
    },
    { scope: ref, dependencies: [reduced] }
  );

  return createElement(
    as,
    { ref, className: cn("uppercase leading-[0.82] tracking-[-0.045em]", className) },
    lines.map((line, i) => (
      <span
        key={i}
        data-line-wrap
        className={cn(
          "block",
          line.align === "right" && "text-right",
          line.align === "center" && "text-center"
        )}
      >
        <span data-line className="inline-block">
          {line.content}
        </span>
      </span>
    ))
  );
}
