"use client";

import dynamic from "next/dynamic";
import { useEffect, useRef, useState } from "react";
import { gsap, useGSAP } from "@/lib/gsap";
import { useReducedMotion } from "@/hooks/useReducedMotion";
import { initialPlanetState, type PlanetState } from "@/components/three/PlanetScene";

const PlanetScene = dynamic(
  () => import("@/components/three/PlanetScene").then((m) => m.PlanetScene),
  { ssr: false }
);

const creative = ["3D & WebGL", "Motion & Interaction", "UI/UX & Design Systems", "Creative Coding"];
const ai = ["AI Assistants & RAG", "Prompts, Skills & Plugins", "Workflow Automation", "AI Creative Tools"];

/**
 * Pinned scroll story: the planet drifts between the two disciplines
 * (the planet = Creative, its moon = AI) while each list reveals.
 */
export default function Disciplines() {
  const sectionRef = useRef<HTMLElement | null>(null);
  const planetState = useRef<PlanetState>({ ...initialPlanetState });
  const [mountCanvas, setMountCanvas] = useState(false);
  const reduced = useReducedMotion();

  // Only create the WebGL context when the section gets close
  useEffect(() => {
    const el = sectionRef.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setMountCanvas(true);
          observer.disconnect();
        }
      },
      { rootMargin: "100% 0px" }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  useGSAP(
    () => {
      const mm = gsap.matchMedia();

      mm.add(
        { isDesktop: "(min-width: 768px)", isMobile: "(max-width: 767px)" },
        (context) => {
          const { isDesktop } = context.conditions as { isDesktop: boolean };
          const side = isDesktop ? 1.15 : 0;
          const lift = isDesktop ? 0 : 0.55;
          const s = planetState.current;

          const tl = gsap.timeline({
            defaults: { ease: "power2.inOut" },
            scrollTrigger: {
              trigger: sectionRef.current,
              start: "top top",
              end: "bottom bottom",
              scrub: 1,
            },
          });

          tl.set("[data-group]", { autoAlpha: 0 })
            .set("[data-group='intro']", { autoAlpha: 1 })
            .to(s, { scale: 1, duration: 1 }, 0)
            // Intro out
            .to("[data-group='intro'] > *", { yPercent: -60, autoAlpha: 0, stagger: 0.1, duration: 0.6 }, 1)
            // Creative in — planet moves right, list on the left
            .to(s, { x: side, y: lift, scale: isDesktop ? 0.85 : 0.6, rotY: Math.PI * 0.8, ringTilt: 0.35, duration: 1.4 }, 1.2)
            .set("[data-group='creative']", { autoAlpha: 1 }, 1.4)
            .from("[data-group='creative'] [data-item]", { yPercent: 100, autoAlpha: 0, stagger: 0.15, duration: 0.6 }, 1.4)
            .to("[data-group='creative'] [data-item]", { yPercent: -100, autoAlpha: 0, stagger: 0.08, duration: 0.5 }, 3.6)
            .set("[data-group='creative']", { autoAlpha: 0 }, 4.3)
            // AI in — planet moves left, moon grows
            .to(s, { x: -side, rotY: Math.PI * 1.9, ringTilt: -0.3, moonScale: 1.8, duration: 1.4 }, 3.8)
            .set("[data-group='ai']", { autoAlpha: 1 }, 4.4)
            .from("[data-group='ai'] [data-item]", { yPercent: 100, autoAlpha: 0, stagger: 0.15, duration: 0.6 }, 4.4)
            .to("[data-group='ai'] [data-item]", { yPercent: -100, autoAlpha: 0, stagger: 0.08, duration: 0.5 }, 6.6)
            .set("[data-group='ai']", { autoAlpha: 0 }, 7.3)
            // Outro — back to center, one craft
            .to(s, { x: 0, y: 0, scale: isDesktop ? 1.05 : 0.8, rotY: Math.PI * 2.4, ringTilt: 0, moonScale: 1, duration: 1.2 }, 6.8)
            .set("[data-group='outro']", { autoAlpha: 1 }, 7.4)
            .from("[data-group='outro'] > *", { yPercent: 60, autoAlpha: 0, stagger: 0.1, duration: 0.6 }, 7.4)
            .to({}, { duration: 0.6 });

          gsap.fromTo(
            "[data-progress]",
            { scaleX: 0 },
            {
              scaleX: 1,
              ease: "none",
              scrollTrigger: {
                trigger: sectionRef.current,
                start: "top top",
                end: "bottom bottom",
                scrub: true,
              },
            }
          );

          return () => Object.assign(planetState.current, initialPlanetState);
        }
      );

      return () => mm.revert();
    },
    { scope: sectionRef }
  );

  return (
    <section id="disciplines" ref={sectionRef} className="relative h-[450vh]">
      <div className="sticky top-0 overflow-hidden h-svh">
        <div className="absolute inset-0 -z-10">
          {mountCanvas && <PlanetScene state={planetState} idle={!reduced} />}
        </div>

        {/* Intro */}
        <div
          data-group="intro"
          className="absolute inset-x-0 flex flex-col items-center gap-4 px-8 text-center pointer-events-none top-28 md:top-32"
        >
          <p className="text-xs tracking-[0.3em] uppercase opacity-60">(01) Two disciplines</p>
          <p className="text-[clamp(2rem,5vw,4.5rem)] leading-none tracking-tight uppercase">
            One <span className="font-light-italic normal-case text-gold">craft</span>
          </p>
        </div>

        {/* Creative — left */}
        <DisciplineList
          group="creative"
          index="01"
          title="Creative Developer"
          subtitle="The planet — form, motion and depth."
          items={creative}
          className="md:left-10 md:right-auto"
        />

        {/* AI — right */}
        <DisciplineList
          group="ai"
          index="02"
          title="AI Developer"
          subtitle="The moon — intelligence in orbit."
          items={ai}
          className="md:right-10 md:left-auto md:text-right md:items-end"
        />

        {/* Outro */}
        <div
          data-group="outro"
          className="absolute inset-x-0 flex flex-col items-center gap-3 px-8 text-center pointer-events-none bottom-24"
        >
          <p className="text-[clamp(1.75rem,4vw,3.5rem)] leading-none tracking-tight uppercase">
            Design <span className="font-light-italic normal-case text-gold">×</span> Intelligence
          </p>
          <p className="max-w-md text-sm opacity-60">
            Interfaces that feel alive, powered by AI that actually helps.
          </p>
        </div>

        {/* Progress */}
        <div className="absolute flex items-center gap-4 text-xs tracking-[0.2em] uppercase bottom-8 inset-x-8 md:inset-x-10">
          <span>Creative</span>
          <div className="relative flex-1 h-px bg-current/20">
            <div data-progress className="absolute inset-0 origin-left bg-gold" />
          </div>
          <span>AI</span>
        </div>
      </div>
    </section>
  );
}

type DisciplineListProps = {
  group: string;
  index: string;
  title: string;
  subtitle: string;
  items: string[];
  className?: string;
};

function DisciplineList({ group, index, title, subtitle, items, className }: DisciplineListProps) {
  return (
    <div
      data-group={group}
      className={`absolute inset-x-8 bottom-20 flex flex-col gap-4 md:bottom-auto md:top-1/2 md:-translate-y-1/2 md:w-[36vw] ${className ?? ""}`}
    >
      <div className="overflow-hidden">
        <p data-item className="text-xs tracking-[0.3em] uppercase opacity-60">
          ({index}) {subtitle}
        </p>
      </div>
      <div className="overflow-hidden">
        <h3 data-item className="text-[clamp(2.25rem,4.5vw,4.5rem)] leading-[0.9] tracking-tight uppercase">
          {title}
        </h3>
      </div>
      <ul className="flex flex-col gap-1 mt-2 text-lg md:text-2xl">
        {items.map((item) => (
          <li key={item} className="overflow-hidden">
            <span data-item className="block">
              {item}
            </span>
          </li>
        ))}
      </ul>
    </div>
  );
}
