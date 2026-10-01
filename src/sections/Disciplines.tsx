"use client";

import { useRef } from "react";
import { gsap, useGSAP } from "@/lib/gsap";
import { useReducedMotion } from "@/hooks/useReducedMotion";
import { LinePlanet, PLANET_RADIUS } from "@/components/LinePlanet";
import { LineIcon, type LineIconName } from "@/components/LineIcon";
import { cn } from "@/lib/utils";

type Discipline = {
  key: "creative" | "ai";
  index: string;
  eyebrow: string;
  title: [string, string];
  items: { label: string; icon: LineIconName }[];
};

const disciplines: Discipline[] = [
  {
    key: "creative",
    index: "01",
    eyebrow: "The planet — form, motion and depth",
    title: ["Creative", "Developer"],
    items: [
      { label: "3D & WebGL", icon: "cube" },
      { label: "Motion & Interaction", icon: "motion" },
      { label: "UI/UX & Design Systems", icon: "layout" },
      { label: "Frontend Engineering", icon: "code" },
    ],
  },
  {
    key: "ai",
    index: "02",
    eyebrow: "The moon — intelligence in orbit",
    title: ["AI", "Developer"],
    items: [
      { label: "AI Solutions & Automation", icon: "automation" },
      { label: "AI Integration & MCP", icon: "plug" },
      { label: "Chatbots & Agents", icon: "chat" },
      { label: "Creative AI & Fine-tuning", icon: "sparkle" },
    ],
  },
];

/** Planet size at rest: share of the shorter screen side (bigger on portrait screens). */
const baseScale = () => (window.innerWidth / window.innerHeight < 0.8 ? 0.85 : 0.62);

/**
 * Scroll story: a line-art planet sits in the centre, grows until it swallows the screen
 * (the background inverts — we're inside), the two disciplines play out in there,
 * and on the way out it shrinks back to its starting size.
 */
export default function Disciplines() {
  const sectionRef = useRef<HTMLElement | null>(null);
  const reduced = useReducedMotion();

  useGSAP(
    () => {
      if (reduced) return;
      const q = gsap.utils.selector(sectionRef);
      const planet = q("[data-planet]")[0];
      const svg = sectionRef.current?.querySelector<SVGSVGElement>("svg[data-stage]");
      if (!planet || !svg) return;

      // Draw the planet on when the section arrives
      gsap.from(q("[data-planet] [data-draw]"), {
        drawSVG: "0%",
        duration: 1.6,
        ease: "power2.inOut",
        stagger: 0.04,
        scrollTrigger: { trigger: sectionRef.current, start: "top 75%", once: true },
      });

      const mm = gsap.matchMedia();
      mm.add({ dark: "(prefers-color-scheme: dark)", light: "(prefers-color-scheme: light)" }, () => {
        const css = getComputedStyle(document.documentElement);
        const ink = css.getPropertyValue("--site-ink").trim();
        const canvas = css.getPropertyValue("--site-canvas").trim();

        // Scale at which the sphere covers the whole screen (with a margin)
        const coverScale = () => {
          const unit = Math.min(svg.clientWidth, svg.clientHeight) / 220;
          return (Math.hypot(svg.clientWidth, svg.clientHeight) / 2 / (PLANET_RADIUS * unit)) * 1.12;
        };

        const origin = { svgOrigin: "0 0" };
        gsap.set(planet, { scale: baseScale(), rotation: 0, ...origin });
        gsap.set(q("[data-tone]"), { color: ink });

        // Initial states set up front: a staggered from() inside a timeline only
        // pre-renders its first target, so everything else would flash in.
        const panel = (key: string, part: string) => q(`[data-group='${key}'] ${part}`);
        for (const key of ["creative", "ai"]) {
          gsap.set(panel(key, "[data-word]"), { yPercent: 110 });
          gsap.set(panel(key, "[data-fade]"), { autoAlpha: 0, y: 20 });
          gsap.set(panel(key, "[data-item]"), { autoAlpha: 0, y: 30 });
          gsap.set(panel(key, "[data-icon-path]"), { drawSVG: "0%" });
        }
        gsap.set(q("[data-group='outro'] > *"), { autoAlpha: 0, yPercent: 60 });

        const tl = gsap.timeline({
          defaults: { ease: "power2.inOut" },
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top top",
            end: "bottom bottom",
            scrub: 1,
            invalidateOnRefresh: true,
          },
        });

        tl
          // Intro out, zoom into the planet
          .to(q("[data-group='intro'] > *"), { yPercent: -80, autoAlpha: 0, stagger: 0.08, duration: 0.6 }, 0.2)
          .to(planet, { scale: coverScale, ...origin, duration: 2, ease: "power3.in" }, 0.2)
          .to(q("[data-ring]"), { rotation: -14, ...origin, duration: 2 }, 0.2)
          .to(q("[data-moon]"), { x: 60, y: -50, autoAlpha: 0, duration: 1.2 }, 0.4)
          .to(q("[data-sparkles]"), { autoAlpha: 0, duration: 0.6 }, 0.3)
          // Background inverts as we pass through the surface
          .to(q("[data-planet-fill]"), { opacity: 1, duration: 0.3, ease: "none" }, 1.95)
          .to(q("[data-tone]"), { color: canvas, duration: 0.3, ease: "none" }, 1.95)
          .to(q("[data-planet-bands]"), { opacity: 0.3, duration: 0.5 }, 1.95)
          .to(q("[data-ring]"), { opacity: 0.45, duration: 0.5 }, 1.95)
          // Slow drift while inside
          .to(planet, { rotation: 10, ...origin, duration: 5.6, ease: "none" }, 2.2)

          // Creative
          .to(q("[data-group='creative'] [data-word]"), { yPercent: 0, stagger: 0.08, duration: 0.6 }, 2.3)
          .to(q("[data-group='creative'] [data-fade]"), { autoAlpha: 1, y: 0, stagger: 0.08, duration: 0.5 }, 2.4)
          .to(q("[data-group='creative'] [data-item]"), { autoAlpha: 1, y: 0, stagger: 0.12, duration: 0.6 }, 2.7)
          .to(q("[data-group='creative'] [data-icon-path]"), { drawSVG: "100%", stagger: 0.04, duration: 0.6 }, 2.8)

          // Sweep line wipes Creative away
          .fromTo(q("[data-sweep]"), { scaleX: 0, transformOrigin: "left center" }, { scaleX: 1, duration: 0.5 }, 4.6)
          .to(q("[data-group='creative'] [data-word], [data-group='creative'] [data-fade], [data-group='creative'] [data-item]"), { yPercent: -110, autoAlpha: 0, stagger: 0.03, duration: 0.5 }, 4.8)
          .to(q("[data-sweep]"), { scaleX: 0, transformOrigin: "right center", duration: 0.5 }, 5.15)

          // AI
          .to(q("[data-group='ai'] [data-word]"), { yPercent: 0, stagger: 0.08, duration: 0.6 }, 5.4)
          .to(q("[data-group='ai'] [data-fade]"), { autoAlpha: 1, y: 0, stagger: 0.08, duration: 0.5 }, 5.5)
          .to(q("[data-group='ai'] [data-item]"), { autoAlpha: 1, y: 0, stagger: 0.12, duration: 0.6 }, 5.8)
          .to(q("[data-group='ai'] [data-icon-path]"), { drawSVG: "100%", stagger: 0.04, duration: 0.6 }, 5.9)
          .to(q("[data-group='ai'] [data-word], [data-group='ai'] [data-fade], [data-group='ai'] [data-item]"), { yPercent: -110, autoAlpha: 0, stagger: 0.03, duration: 0.5 }, 7.6)

          // Back out: the planet shrinks to its starting size
          .to(q("[data-planet-fill]"), { opacity: 0, duration: 0.25, ease: "none" }, 7.9)
          .to(q("[data-tone]"), { color: ink, duration: 0.25, ease: "none" }, 7.9)
          .to(q("[data-planet-bands]"), { opacity: 1, duration: 0.6 }, 7.9)
          .to(q("[data-ring]"), { opacity: 1, duration: 0.6 }, 7.9)
          .to(planet, { scale: baseScale, rotation: 0, ...origin, duration: 1.8, ease: "power2.inOut" }, 7.95)
          .to(q("[data-ring]"), { rotation: 0, ...origin, duration: 1.8 }, 7.9)
          .to(q("[data-moon]"), { x: 0, y: 0, autoAlpha: 1, duration: 1.2 }, 8.4)
          .to(q("[data-sparkles]"), { autoAlpha: 1, duration: 0.6 }, 9)
          .to(q("[data-group='outro'] > *"), { yPercent: 0, autoAlpha: 1, stagger: 0.1, duration: 0.6 }, 9.2)
          .to({}, { duration: 0.6 });

        gsap.fromTo(
          q("[data-progress]"),
          { scaleX: 0 },
          {
            scaleX: 1,
            ease: "none",
            scrollTrigger: { trigger: sectionRef.current, start: "top top", end: "bottom bottom", scrub: true },
          }
        );

        // Subtle parallax toward the cursor while the planet is small
        const stage = q("[data-parallax]")[0];
        const xTo = gsap.quickTo(stage, "x", { duration: 1.2, ease: "power3.out" });
        const yTo = gsap.quickTo(stage, "y", { duration: 1.2, ease: "power3.out" });
        const onMove = (e: PointerEvent) => {
          xTo((e.clientX / window.innerWidth - 0.5) * 24);
          yTo((e.clientY / window.innerHeight - 0.5) * 24);
        };
        window.addEventListener("pointermove", onMove, { passive: true });
        return () => window.removeEventListener("pointermove", onMove);
      });

      return () => mm.revert();
    },
    { scope: sectionRef, dependencies: [reduced] }
  );

  if (reduced) return <StaticDisciplines />;

  return (
    <section id="disciplines" ref={sectionRef} className="relative h-[600vh]">
      <div className="sticky top-0 overflow-hidden h-svh">
        {/* Planet stage */}
        <div data-parallax className="absolute -inset-6">
          <svg
            data-stage
            data-tone
            viewBox="-110 -110 220 220"
            preserveAspectRatio="xMidYMid meet"
            className="w-full h-full"
            aria-hidden="true"
          >
            <LinePlanet />
          </svg>
        </div>

        {/* Intro */}
        <div
          data-group="intro"
          className="absolute inset-x-0 flex flex-col items-center gap-3 px-8 text-center pointer-events-none top-[11svh]"
        >
          <p className="text-xs tracking-[0.3em] uppercase opacity-65">(01) Two disciplines</p>
          <p className="text-[clamp(2rem,5vw,4.5rem)] leading-none tracking-tight uppercase">
            One <span className="normal-case font-light-italic text-gold">craft</span>
          </p>
        </div>
        <p
          data-group="intro"
          className="absolute inset-x-0 text-xs tracking-[0.3em] text-center uppercase pointer-events-none bottom-[11svh]"
        >
          <span className="inline-block opacity-65">Scroll to enter the planet ↓</span>
        </p>

        {/* Inside the planet */}
        {disciplines.map((d) => (
          <DisciplinePanel key={d.key} discipline={d} />
        ))}

        <div data-sweep className="absolute inset-x-0 h-px top-1/2 bg-gold" style={{ transform: "scaleX(0)" }} />

        {/* Outro */}
        <div
          data-group="outro"
          className="absolute inset-x-0 flex flex-col items-center gap-3 px-8 text-center pointer-events-none bottom-[13svh]"
        >
          <p className="text-[clamp(1.75rem,4vw,3.5rem)] leading-none tracking-tight uppercase">
            Design <span className="font-light-italic text-gold">×</span> Intelligence
          </p>
          <p className="max-w-md text-sm opacity-65">Interfaces that feel alive, powered by AI that actually helps.</p>
        </div>

        {/* Progress */}
        <div
          data-tone
          className="absolute flex items-center gap-4 text-xs tracking-[0.2em] uppercase bottom-8 inset-x-8 md:inset-x-10"
        >
          <span>Creative</span>
          <div className="relative flex-1 h-px bg-current/25">
            <div data-progress className="absolute inset-0 origin-left bg-gold" />
          </div>
          <span>AI</span>
        </div>
      </div>
    </section>
  );
}

function DisciplinePanel({ discipline }: { discipline: Discipline }) {
  return (
    <div
      data-group={discipline.key}
      className="absolute inset-0 flex flex-col justify-center gap-10 px-8 pointer-events-none md:px-10 text-canvas"
    >
      <div className="flex items-baseline justify-between gap-6 text-xs tracking-[0.3em] uppercase">
        <span data-fade className="opacity-70">
          ({discipline.index}) {discipline.eyebrow}
        </span>
        <span data-fade className="tabular-nums whitespace-nowrap opacity-70">
          {discipline.index} / 02
        </span>
      </div>

      <h2 className="text-[clamp(3rem,11vw,10rem)] leading-[0.85] tracking-[-0.04em] uppercase">
        {discipline.title.map((word, i) => (
          <span key={word} className={cn("block overflow-hidden", i === 1 && "text-right")}>
            <span data-word className="inline-block">
              {word}
            </span>
          </span>
        ))}
      </h2>

      <ul className="grid grid-cols-2 gap-6 md:grid-cols-4">
        {discipline.items.map((item, i) => (
          <li key={item.label} data-item className="flex flex-col gap-3 pt-4 border-t border-current/25">
            <LineIcon name={item.icon} className="size-10 text-gold" />
            <span className="text-xs tabular-nums opacity-70">0{i + 1}</span>
            <span className="text-lg leading-tight md:text-xl">{item.label}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}

/** Reduced motion: the planet at rest and both disciplines side by side. */
function StaticDisciplines() {
  return (
    <section id="disciplines" className="px-8 py-24 md:px-10">
      <p className="text-xs tracking-[0.3em] uppercase opacity-65">(01) Two disciplines</p>
      <svg viewBox="-110 -110 220 220" className="w-[min(60vmin,28rem)] mx-auto my-12" aria-hidden="true">
        <g transform="scale(1)">
          <LinePlanet />
        </g>
      </svg>
      <div className="grid gap-16 md:grid-cols-2">
        {disciplines.map((d) => (
          <div key={d.key}>
            <p className="text-xs tracking-[0.3em] uppercase opacity-65">
              ({d.index}) {d.eyebrow}
            </p>
            <h2 className="mt-4 text-[clamp(2.5rem,6vw,5rem)] leading-[0.9] tracking-tight uppercase">
              {d.title.join(" ")}
            </h2>
            <ul className="mt-6 border-t border-ink/20">
              {d.items.map((item) => (
                <li key={item.label} className="flex items-center gap-4 py-3 border-b border-ink/20">
                  <LineIcon name={item.icon} className="size-7 text-gold" />
                  {item.label}
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </section>
  );
}
