"use client";

import { useRef, type ReactNode } from "react";
import { gsap, SplitText, useGSAP } from "@/lib/gsap";
import { useReducedMotion } from "@/hooks/useReducedMotion";
import { cn } from "@/lib/utils";

type SectionHeaderProps = {
  /** Section number shown as "(02)". */
  index: string;
  label: string;
  title: string;
  /** Short supporting text, aligned right on desktop. */
  aside?: ReactNode;
  /** Optional count rendered as a superscript next to the title. */
  count?: number;
  /** Play on mount instead of when scrolled into view. */
  immediate?: boolean;
  /** "lg" suits longer titles (detail pages). */
  size?: "xl" | "lg";
  className?: string;
};

/** Editorial section intro: meta row, oversized title with a char reveal, and a drawn rule. */
export function SectionHeader({
  index,
  label,
  title,
  aside,
  count,
  immediate = false,
  size = "xl",
  className,
}: SectionHeaderProps) {
  const rootRef = useRef<HTMLDivElement | null>(null);
  const titleRef = useRef<HTMLHeadingElement | null>(null);
  const ruleRef = useRef<HTMLDivElement | null>(null);
  const reduced = useReducedMotion();

  useGSAP(
    () => {
      if (reduced || !titleRef.current) return;

      const scrollTrigger = immediate
        ? undefined
        : { trigger: rootRef.current, start: "top 80%", once: true };

      const split = SplitText.create(titleRef.current, {
        type: "lines,chars",
        mask: "lines",
        autoSplit: true,
        onSplit(self) {
          return gsap.from(self.chars, {
            yPercent: 110,
            duration: 1.1,
            ease: "expo.out",
            stagger: 0.025,
            scrollTrigger,
          });
        },
      });

      gsap.from("[data-meta]", {
        autoAlpha: 0,
        y: 16,
        duration: 0.8,
        ease: "power3.out",
        stagger: 0.08,
        scrollTrigger,
      });
      gsap.from(ruleRef.current, {
        scaleX: 0,
        duration: 1.4,
        ease: "expo.inOut",
        scrollTrigger,
      });

      return () => split.revert();
    },
    { scope: rootRef, dependencies: [reduced] }
  );

  return (
    <div ref={rootRef} className={cn("px-8 pt-24 md:px-10 md:pt-32", className)}>
      <div className="grid grid-cols-12 gap-4 text-xs tracking-[0.2em] uppercase">
        <span data-meta className="col-span-2 opacity-50 md:col-span-1">
          ({index})
        </span>
        <span data-meta className="col-span-10 md:col-span-5">
          {label}
        </span>
        {aside && (
          <div
            data-meta
            className="hidden max-w-md text-base leading-snug tracking-normal normal-case md:block md:col-span-6 justify-self-end opacity-60"
          >
            {aside}
          </div>
        )}
      </div>

      <h2
        ref={titleRef}
        className={cn(
          "mt-6 leading-[0.85] tracking-[-0.04em] uppercase",
          size === "xl" ? "text-[clamp(3.5rem,13vw,12rem)]" : "text-[clamp(2.75rem,8vw,8rem)]"
        )}
      >
        {title}
        {count !== undefined && (
          <sup className="ml-2 align-top text-[0.18em] tracking-normal">({count})</sup>
        )}
      </h2>

      <div ref={ruleRef} className="h-px mt-8 origin-left bg-current opacity-25" />

      {aside && (
        <div data-meta className="mt-6 text-base leading-snug md:hidden opacity-60">
          {aside}
        </div>
      )}
    </div>
  );
}
