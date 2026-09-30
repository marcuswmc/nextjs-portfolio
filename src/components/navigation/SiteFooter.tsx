"use client";

import { useRef } from "react";
import { useLenis } from "lenis/react";
import { gsap, SplitText, useGSAP } from "@/lib/gsap";
import { useReducedMotion } from "@/hooks/useReducedMotion";
import { NavLink } from "@/components/navigation/NavLink";
import { menuLinks } from "@/components/navigation/links";
import { ScrambleText } from "@/components/motion/ScrambleText";

/** Site-wide footer with an oversized name that rises in as it enters the view. */
export function SiteFooter() {
  const rootRef = useRef<HTMLElement | null>(null);
  const nameRef = useRef<HTMLParagraphElement | null>(null);
  const reduced = useReducedMotion();
  const lenis = useLenis();

  useGSAP(
    () => {
      if (reduced || !nameRef.current) return;
      const split = SplitText.create(nameRef.current, {
        type: "chars",
        mask: "chars",
        autoSplit: true,
        onSplit(self) {
          return gsap.from(self.chars, {
            yPercent: 100,
            duration: 1.2,
            ease: "expo.out",
            stagger: 0.03,
            scrollTrigger: { trigger: rootRef.current, start: "top 85%", once: true },
          });
        },
      });
      return () => split.revert();
    },
    { scope: rootRef, dependencies: [reduced] }
  );

  return (
    <footer ref={rootRef} className="px-8 pt-16 pb-8 overflow-hidden md:px-10">
      <nav aria-label="Footer" className="grid grid-cols-2 gap-6 pb-10 text-sm border-t pt-6 md:grid-cols-4 border-ink/20">
        <p className="opacity-50">
          Creative Developer
          <br />& AI Developer
        </p>
        <ul className="flex flex-col gap-1">
          {menuLinks.slice(0, 4).map((link) => (
            <li key={link.href}>
              <NavLink href={link.href} className="link-underline">
                <ScrambleText text={link.label} hoverTarget="a" />
              </NavLink>
            </li>
          ))}
        </ul>
        <ul className="flex flex-col gap-1">
          {menuLinks.slice(4).map((link) => (
            <li key={link.href}>
              <NavLink href={link.href} className="link-underline">
                <ScrambleText text={link.label} hoverTarget="a" />
              </NavLink>
            </li>
          ))}
        </ul>
        <button
          type="button"
          onClick={() => (lenis ? lenis.scrollTo(0, { duration: 2 }) : window.scrollTo({ top: 0 }))}
          className="self-start cursor-pointer justify-self-start md:justify-self-end link-underline"
        >
          Back to top ↑
        </button>
      </nav>

      <p
        ref={nameRef}
        aria-hidden="true"
        className="text-[11.2vw] leading-[0.8] tracking-[-0.05em] uppercase whitespace-nowrap"
      >
        Marcus Vinicius
      </p>

      <div className="flex justify-between mt-6 text-xs opacity-50">
        <span>© {new Date().getFullYear()} Marcus Vinicius</span>
        <span>Porto, Portugal</span>
      </div>
    </footer>
  );
}
