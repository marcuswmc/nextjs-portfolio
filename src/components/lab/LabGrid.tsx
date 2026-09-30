"use client";

import { useLayoutEffect, useRef, useState } from "react";
import { LabCard } from "@/components/lab/LabCard";
import { labCategories, type LabItem } from "@/content/lab/registry";
import { gsap, useGSAP } from "@/lib/gsap";
import { captureFlip, playFlip, type FlipSnapshot } from "@/lib/flip";
import { useReducedMotion } from "@/hooks/useReducedMotion";
import { cn } from "@/lib/utils";

type Filter = "All" | (typeof labCategories)[number];

/** Filterable grid of live lab previews. */
export function LabGrid({ items }: { items: LabItem[] }) {
  const rootRef = useRef<HTMLDivElement | null>(null);
  const flipSnapshot = useRef<FlipSnapshot | null>(null);
  const listRef = useRef<HTMLElement | null>(null);
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

  // Animate layout changes from the captured snapshot (height locked so the footer stays put)
  useLayoutEffect(() => {
    if (!flipSnapshot.current) return;
    const snapshot = flipSnapshot.current;
    flipSnapshot.current = null;
    playFlip(snapshot, listRef.current, { reduced, duration: 0.8, stagger: 0 });
  }, [filter, reduced]);

  const choose = (next: Filter) => {
    if (next === filter) return;
    flipSnapshot.current = captureFlip("[data-lab-card]", listRef.current);
    setFilter(next);
  };

  return (
    <div ref={rootRef}>
      <div className="grid grid-cols-12 gap-4 px-8 mt-10 text-sm md:px-10">
        <p className="col-span-3 md:col-span-1 opacity-65">Filter</p>
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
                    f === filter ? "opacity-100" : "opacity-60 hover:opacity-100"
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

      <ul ref={(el) => { listRef.current = el; }} className="grid mx-8 mt-8 border-t border-l md:mx-10 sm:grid-cols-2 lg:grid-cols-3 border-ink/20">
        {items.map((item, index) => (
          <LabCard
            key={item.slug}
            item={item}
            index={index}
            data-lab-card
            data-flip-id={item.slug}
            className={cn("bg-canvas", !visible(item) && "hidden")}
          />
        ))}
      </ul>
    </div>
  );
}
