"use client";

import { useRef, createElement, type ReactNode } from "react";
import { gsap, SplitText, useGSAP } from "@/lib/gsap";
import { useReducedMotion } from "@/hooks/useReducedMotion";

type TextTag = "p" | "span" | "div" | "h1" | "h2" | "h3" | "h4" | "li";

type RevealTextProps = {
  children: ReactNode;
  as?: TextTag;
  className?: string;
  /** "inView" plays once when scrolled into view, "mount" plays right away. */
  trigger?: "inView" | "mount";
  delay?: number;
  stagger?: number;
};

/** Masked line-by-line reveal (GSAP SplitText), re-splits on resize/font load. */
export function RevealText({
  children,
  as: Tag = "p",
  className,
  trigger = "inView",
  delay = 0,
  stagger = 0.08,
}: RevealTextProps) {
  const ref = useRef<HTMLElement | null>(null);
  const reduced = useReducedMotion();

  useGSAP(
    () => {
      if (!ref.current || reduced) return;

      const split = SplitText.create(ref.current, {
        type: "lines",
        mask: "lines",
        autoSplit: true,
        onSplit(self) {
          return gsap.from(self.lines, {
            yPercent: 110,
            duration: 1.1,
            ease: "expo.out",
            stagger,
            delay,
            scrollTrigger:
              trigger === "inView"
                ? { trigger: ref.current, start: "top 85%", once: true }
                : undefined,
          });
        },
      });

      return () => split.revert();
    },
    { scope: ref, dependencies: [reduced] }
  );

  return createElement(Tag, { ref, className }, children);
}
