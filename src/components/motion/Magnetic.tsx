"use client";

import { useRef, type HTMLAttributes, type ReactNode } from "react";
import { gsap, useGSAP } from "@/lib/gsap";
import { useReducedMotion } from "@/hooks/useReducedMotion";
import { useFinePointer } from "@/hooks/useFinePointer";
import { cn } from "@/lib/utils";

type MagneticProps = HTMLAttributes<HTMLDivElement> & {
  children: ReactNode;
  /** How far the element follows the cursor (0–1 of the distance). */
  strength?: number;
};

/** Pulls its child toward the cursor and springs back on leave. */
export function Magnetic({
  children,
  strength = 0.35,
  className,
  ...rest
}: MagneticProps) {
  const ref = useRef<HTMLDivElement | null>(null);
  const reduced = useReducedMotion();
  const finePointer = useFinePointer();

  useGSAP(
    () => {
      const el = ref.current;
      if (!el || reduced || !finePointer) return;

      const xTo = gsap.quickTo(el, "x", { duration: 0.8, ease: "elastic.out(1, 0.4)" });
      const yTo = gsap.quickTo(el, "y", { duration: 0.8, ease: "elastic.out(1, 0.4)" });

      const handleMove = (e: PointerEvent) => {
        const rect = el.getBoundingClientRect();
        // Subtract the current offset so the rest position is the reference
        const cx = rect.left + rect.width / 2 - Number(gsap.getProperty(el, "x"));
        const cy = rect.top + rect.height / 2 - Number(gsap.getProperty(el, "y"));
        xTo((e.clientX - cx) * strength);
        yTo((e.clientY - cy) * strength);
      };
      const handleLeave = () => {
        xTo(0);
        yTo(0);
      };

      el.addEventListener("pointermove", handleMove);
      el.addEventListener("pointerleave", handleLeave);
      return () => {
        el.removeEventListener("pointermove", handleMove);
        el.removeEventListener("pointerleave", handleLeave);
        gsap.set(el, { x: 0, y: 0 });
      };
    },
    { scope: ref, dependencies: [reduced, finePointer, strength], revertOnUpdate: true }
  );

  return (
    <div ref={ref} className={cn("inline-block will-change-transform", className)} {...rest}>
      {children}
    </div>
  );
}
