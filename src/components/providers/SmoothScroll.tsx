"use client";

import { useEffect, type ReactNode } from "react";
import { ReactLenis, useLenis } from "lenis/react";
import { gsap, ScrollTrigger } from "@/lib/gsap";
import { useReducedMotion } from "@/hooks/useReducedMotion";

/** Drives Lenis from GSAP's ticker so ScrollTrigger stays in sync with the smoothed scroll. */
function LenisGsapSync() {
  const lenis = useLenis();
  const reduced = useReducedMotion();

  useEffect(() => {
    if (!lenis) return;

    const update = (time: number) => lenis.raf(time * 1000);
    lenis.on("scroll", ScrollTrigger.update);
    gsap.ticker.add(update);
    gsap.ticker.lagSmoothing(0);

    return () => {
      lenis.off("scroll", ScrollTrigger.update);
      gsap.ticker.remove(update);
    };
  }, [lenis]);

  useEffect(() => {
    if (lenis) lenis.options.smoothWheel = !reduced;
  }, [lenis, reduced]);

  return null;
}

/** Global smooth scroll (Lenis on the root element). */
export function SmoothScroll({ children }: { children: ReactNode }) {
  return (
    <ReactLenis root options={{ autoRaf: false, lerp: 0.1 }}>
      <LenisGsapSync />
      {children}
    </ReactLenis>
  );
}
