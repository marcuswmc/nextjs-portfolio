"use client";

import { useRef } from "react";
import { gsap, SplitText, useGSAP } from "@/lib/gsap";
import { useReducedMotion } from "@/hooks/useReducedMotion";
import { NavLink } from "@/components/navigation/NavLink";

const disciplines = [
  { index: "01", title: "Creative Development", detail: "3D · WebGL · Motion · UI" },
  { index: "02", title: "AI Development", detail: "Assistants · RAG · Automations" },
];

export function Hero() {
  const sectionRef = useRef<HTMLElement | null>(null);
  const titleRef = useRef<HTMLHeadingElement | null>(null);
  const reduced = useReducedMotion();

  useGSAP(
    () => {
      if (reduced || !titleRef.current) return;

      const split = SplitText.create(titleRef.current.querySelectorAll("[data-line]"), {
        type: "chars",
        mask: "chars",
        autoSplit: true,
        onSplit(self) {
          return gsap.from(self.chars, {
            yPercent: 115,
            duration: 1.4,
            ease: "expo.out",
            stagger: 0.035,
            delay: 0.2,
          });
        },
      });

      gsap.from("[data-hero-meta]", {
        autoAlpha: 0,
        y: 20,
        duration: 1,
        ease: "power3.out",
        stagger: 0.1,
        delay: 0.8,
      });

      // Lines drift apart as the hero scrolls away
      const drift = [-12, 14, -6];
      gsap.utils.toArray<HTMLElement>("[data-line]").forEach((line, i) => {
        gsap.to(line, {
          xPercent: drift[i],
          ease: "none",
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top top",
            end: "bottom top",
            scrub: true,
          },
        });
      });

      return () => split.revert();
    },
    { scope: sectionRef, dependencies: [reduced] }
  );

  return (
    <section
      id="home"
      ref={sectionRef}
      className="relative flex flex-col justify-end min-h-[82svh] gap-12 md:min-h-svh px-8 pb-8 overflow-hidden pt-28 md:justify-between md:gap-8 md:px-10 md:pt-32"
    >
      <div className="grid gap-6 md:grid-cols-12">
        <p data-hero-meta className="max-w-sm text-lg leading-snug md:col-span-5 md:text-xl">
          I design and engineer immersive web experiences and AI products for
          brands and startups.
        </p>
        <p
          data-hero-meta
          className="flex items-baseline gap-4 text-sm md:col-span-4 md:col-start-9 md:justify-self-end"
        >
          <span className="opacity-50">(00)</span>
          <span>
            Portfolio <span className="text-gold">©{new Date().getFullYear()}</span> — Porto, PT
          </span>
        </p>
      </div>

      <h1
        ref={titleRef}
        className="uppercase leading-[0.82] tracking-[-0.045em] text-[clamp(3.6rem,min(14vw,24svh),17rem)]"
      >
        <span data-line className="block">
          Creative
        </span>
        <span data-line className="block text-right">
          <span className="font-light-italic normal-case text-gold">&amp;</span> AI
        </span>
        <span data-line className="block">
          Developer
        </span>
      </h1>

      <div className="grid grid-cols-2 gap-6 text-sm md:grid-cols-12">
        {disciplines.map((item) => (
          <div key={item.index} data-hero-meta className="md:col-span-3">
            <p className="opacity-50">({item.index})</p>
            <p className="mt-1">{item.title}</p>
            <p className="opacity-50">{item.detail}</p>
          </div>
        ))}
        <NavLink
          href="/#disciplines"
          data-hero-meta
          className="items-end justify-end hidden gap-2 md:flex md:col-span-3 md:col-start-10 group"
        >
          <span className="link-underline">Scroll to explore</span>
          <span className="inline-block transition-transform duration-500 group-hover:translate-y-1 animate-bounce">
            ↓
          </span>
        </NavLink>
      </div>
    </section>
  );
}
