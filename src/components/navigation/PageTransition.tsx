"use client";

import { createContext, useCallback, useContext, useEffect, useRef, useState, type ReactNode } from "react";
import { usePathname, useRouter } from "next/navigation";
import { useLenis } from "lenis/react";
import { gsap } from "@/lib/gsap";
import { useReducedMotion } from "@/hooks/useReducedMotion";
import { menuLinks } from "@/components/navigation/links";

type TransitionContextValue = { navigate: (href: string) => void };

const TransitionContext = createContext<TransitionContextValue | null>(null);

export function usePageTransition() {
  return useContext(TransitionContext);
}

/** Name shown on the curtain: the matching menu label, else the first path segment. */
function labelFor(href: string) {
  const path = href.split("#")[0] || "/";
  const exact = menuLinks.find((link) => link.href === href || link.href === path);
  if (exact) return exact.label;
  const section = menuLinks.find((link) => link.href !== "/#home" && path.startsWith(link.href + "/"));
  return section?.label ?? "Home";
}

/**
 * Curtain transition between routes: covers the screen, swaps the route underneath,
 * then lifts once the new pathname has rendered. Back/forward stays instant.
 */
export function PageTransition({ children }: { children: ReactNode }) {
  const router = useRouter();
  const pathname = usePathname();
  const lenis = useLenis();
  const reduced = useReducedMotion();
  const overlayRef = useRef<HTMLDivElement | null>(null);
  const pending = useRef(false);
  const fallback = useRef<ReturnType<typeof setTimeout> | null>(null);
  const [label, setLabel] = useState("");

  const reveal = useCallback((delay = 0.1) => {
    if (fallback.current) clearTimeout(fallback.current);
    pending.current = false;
    gsap.to(overlayRef.current, {
      yPercent: -100,
      duration: 0.8,
      delay,
      ease: "expo.inOut",
      onComplete: () => {
        gsap.set(overlayRef.current, { display: "none" });
      },
    });
  }, []);

  const navigate = useCallback(
    (href: string) => {
      if (reduced || !overlayRef.current) {
        router.push(href);
        return;
      }
      if (pending.current) return;
      pending.current = true;
      setLabel(labelFor(href));

      gsap
        .timeline()
        .set(overlayRef.current, { display: "flex", yPercent: 100 })
        .to(overlayRef.current, { yPercent: 0, duration: 0.7, ease: "expo.inOut" })
        .fromTo("[data-curtain-label]", { yPercent: 110 }, { yPercent: 0, duration: 0.6, ease: "expo.out" }, "-=0.35")
        .add(() => {
          router.push(href);
          // Never leave the curtain down if the navigation doesn't land
          fallback.current = setTimeout(() => reveal(0), 4000);
        });
    },
    [reduced, router, reveal]
  );

  // New route rendered: reset scroll under the curtain, then lift it
  useEffect(() => {
    if (!pending.current) return;
    const hasHash = window.location.hash.length > 1;
    if (!hasHash) lenis?.scrollTo(0, { immediate: true, force: true });
    // Section links (/#work) wait for HashScroll to land before revealing
    reveal(hasHash ? 0.45 : 0.15);
  }, [pathname, lenis, reveal]);

  useEffect(() => () => {
    if (fallback.current) clearTimeout(fallback.current);
  }, []);

  return (
    <TransitionContext.Provider value={{ navigate }}>
      {children}
      <div
        ref={overlayRef}
        aria-hidden="true"
        style={{ display: "none" }}
        className="fixed inset-0 z-[3000] items-center justify-center bg-contrast text-on-contrast"
      >
        <div className="overflow-hidden">
          <p data-curtain-label className="flex items-center gap-4 text-[clamp(2.5rem,8vw,7rem)] leading-none tracking-[-0.04em] uppercase">
            <span className="rounded-full size-3 bg-gold md:size-4" />
            {label}
          </p>
        </div>
      </div>
    </TransitionContext.Provider>
  );
}
