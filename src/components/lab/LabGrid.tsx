"use client";

import { useLayoutEffect, useRef, useState } from "react";
import { InView } from "@/components/InView";
import { NavLink } from "@/components/navigation/NavLink";
import { controlDefaults, labCategories, type LabItem } from "@/content/lab/registry";
import { labPreviews } from "@/content/lab/previews";
import { Flip, gsap, useGSAP } from "@/lib/gsap";
import { useReducedMotion } from "@/hooks/useReducedMotion";
import { cn } from "@/lib/utils";

type Filter = "All" | (typeof labCategories)[number];

/** Filterable grid of live lab previews. */
export function LabGrid({ items }: { items: LabItem[] }) {
  const rootRef = useRef<HTMLDivElement | null>(null);
  const flipState = useRef<Flip.FlipState | null>(null);
  const [filter, setFilter] = useState<Filter>("All");
  const reduced = useReducedMotion();

  const counts = Object.fromEntries(
    labCategories.map((c) => [c, items.filter((i) => i.category === c).length])
  ) as Record<Filter, number>;
  const visible = (item: LabItem) => filter === "All" || item.category === filter;

  useGSAP(
    () => {
      if (reduced) return;
      gsap.from("[data-lab-card]", {
        y: 60,
        autoAlpha: 0,
        duration: 1,
        ease: "power3.out",
        stagger: 0.08,
        delay: 0.4,
      });
    },
    { scope: rootRef, dependencies: [reduced] }
  );

  useLayoutEffect(() => {
    if (!flipState.current) return;
    const state = flipState.current;
    flipState.current = null;
    Flip.from(state, {
      duration: reduced ? 0 : 0.8,
      ease: "power3.inOut",
      absolute: true,
      onEnter: (els) => gsap.fromTo(els, { autoAlpha: 0, scale: 0.94 }, { autoAlpha: 1, scale: 1, duration: 0.5, delay: 0.25 }),
      onLeave: (els) => gsap.to(els, { autoAlpha: 0, scale: 0.94, duration: 0.3 }),
    });
  }, [filter, reduced]);

  const choose = (next: Filter) => {
    if (next === filter) return;
    flipState.current = Flip.getState("[data-lab-card]", { props: "opacity" });
    setFilter(next);
  };

  return (
    <div ref={rootRef}>
      <div className="grid grid-cols-12 gap-4 px-8 mt-10 text-sm md:px-10">
        <p className="col-span-3 md:col-span-1 opacity-50">Filter</p>
        <ul className="flex flex-wrap col-span-9 gap-x-5 gap-y-1 md:col-span-11">
          {(["All", ...labCategories] as Filter[]).map((f) => {
            const count = f === "All" ? items.length : counts[f];
            return (
              <li key={f}>
                <button
                  type="button"
                  disabled={count === 0}
                  onClick={() => choose(f)}
                  aria-pressed={f === filter}
                  className={cn(
                    "cursor-pointer transition-opacity duration-300 link-underline disabled:cursor-not-allowed disabled:opacity-20",
                    f === filter ? "opacity-100" : "opacity-40 hover:opacity-100"
                  )}
                >
                  {f}
                  <sup className="ml-0.5 text-[0.65em]">{count}</sup>
                </button>
              </li>
            );
          })}
        </ul>
      </div>

      <ul className="grid mx-8 mt-8 border-t border-l md:mx-10 sm:grid-cols-2 lg:grid-cols-3 border-ink/20">
        {items.map((item, index) => {
          const Preview = labPreviews[item.slug];
          return (
            <li
              key={item.slug}
              data-lab-card
              data-flip-id={item.slug}
              className={cn("flex flex-col border-b border-r border-ink/20 bg-canvas", !visible(item) && "hidden")}
            >
              <div className="flex justify-between px-6 pt-5 text-xs tracking-[0.15em] uppercase">
                <span>
                  <span className="opacity-50">({String(index + 1).padStart(2, "0")})</span> {item.category}
                </span>
                <span className="opacity-50">{item.hint}</span>
              </div>

              <InView className="relative flex items-center justify-center overflow-hidden aspect-[4/3]">
                {Preview && <Preview values={controlDefaults(item)} compact />}
              </InView>

              <div className="flex items-end justify-between gap-4 px-6 pt-4 pb-6 mt-auto border-t border-ink/10">
                <div>
                  <h3 className="text-2xl leading-none tracking-tight">{item.title}</h3>
                  <p className="mt-2 text-xs tracking-wider uppercase opacity-50">
                    {item.dependencies.length ? item.dependencies.join(" · ") : "No dependencies"}
                  </p>
                </div>
                <NavLink
                  href={`/lab/${item.slug}`}
                  className="flex items-center justify-center text-lg transition-colors duration-300 border rounded-full shrink-0 size-11 border-ink/30 hover:bg-ink hover:text-canvas"
                  aria-label={`Open ${item.title}`}
                >
                  →
                </NavLink>
              </div>
            </li>
          );
        })}
      </ul>
    </div>
  );
}
