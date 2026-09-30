"use client";

import { useLayoutEffect, useRef, useState } from "react";
import { CopyButton } from "@/components/motion/CopyButton";
import { DownloadButton } from "@/components/ai/DownloadButton";
import { NavLink } from "@/components/navigation/NavLink";
import { aiTypeDescriptions, aiTypes, copyLabel, type AiItem, type AiItemType } from "@/content/ai";
import { Flip, gsap, useGSAP } from "@/lib/gsap";
import { useReducedMotion } from "@/hooks/useReducedMotion";
import { cn } from "@/lib/utils";

export type AiGridEntry = { item: AiItem; primary: string };

type TypeFilter = "All" | AiItemType;

/** Filterable grid of AI Lab items with quick copy / download actions. */
export function AiGrid({ entries }: { entries: AiGridEntry[] }) {
  const rootRef = useRef<HTMLDivElement | null>(null);
  const flipState = useRef<Flip.FlipState | null>(null);
  const [type, setType] = useState<TypeFilter>("All");
  const [tool, setTool] = useState("All");
  const reduced = useReducedMotion();

  const tools = ["All", ...Array.from(new Set(entries.flatMap((e) => e.item.tools))).sort()];
  const typeCount = (t: TypeFilter) =>
    t === "All" ? entries.length : entries.filter((e) => e.item.type === t).length;
  const visible = ({ item }: AiGridEntry) =>
    (type === "All" || item.type === type) && (tool === "All" || item.tools.includes(tool));
  const shown = entries.filter(visible).length;
  const upcoming = aiTypes.filter((t) => typeCount(t) === 0);

  useGSAP(
    () => {
      if (reduced) return;
      gsap.from("[data-ai-card]", { y: 60, autoAlpha: 0, duration: 1, ease: "power3.out", stagger: 0.08, delay: 0.4 });
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
  }, [type, tool, reduced]);

  const capture = (update: () => void) => {
    flipState.current = Flip.getState("[data-ai-card]", { props: "opacity" });
    update();
  };

  return (
    <div ref={rootRef}>
      {/* Filters */}
      <div className="grid grid-cols-12 gap-4 px-8 mt-10 text-sm md:px-10">
        <p className="col-span-3 md:col-span-1 opacity-50">Type</p>
        <ul className="flex flex-wrap col-span-9 gap-x-5 gap-y-1 md:col-span-6">
          {(["All", ...aiTypes] as TypeFilter[]).map((t) => (
            <li key={t}>
              <button
                type="button"
                disabled={typeCount(t) === 0}
                aria-pressed={t === type}
                onClick={() => t !== type && capture(() => setType(t))}
                className={cn(
                  "cursor-pointer transition-opacity duration-300 link-underline disabled:cursor-not-allowed disabled:opacity-20",
                  t === type ? "opacity-100" : "opacity-40 hover:opacity-100"
                )}
              >
                {t === "All" ? t : `${t}s`}
                <sup className="ml-0.5 text-[0.65em]">{typeCount(t)}</sup>
              </button>
            </li>
          ))}
        </ul>
        <p className="col-span-3 md:col-span-1 opacity-50">Built for</p>
        <ul className="flex flex-wrap col-span-9 gap-x-5 gap-y-1 md:col-span-4">
          {tools.map((t) => (
            <li key={t}>
              <button
                type="button"
                aria-pressed={t === tool}
                onClick={() => t !== tool && capture(() => setTool(t))}
                className={cn(
                  "cursor-pointer transition-opacity duration-300 link-underline",
                  t === tool ? "opacity-100" : "opacity-40 hover:opacity-100"
                )}
              >
                {t}
              </button>
            </li>
          ))}
        </ul>
      </div>

      <p className="px-8 mt-6 text-xs tracking-[0.2em] uppercase md:px-10 opacity-50" aria-live="polite">
        Showing {shown} of {entries.length}
      </p>

      {/* Cards */}
      <ul className="grid gap-4 px-8 mt-6 md:px-10 md:grid-cols-2">
        {entries.map((entry, index) => {
          const { item, primary } = entry;
          const primaryFile = item.files[0];
          return (
            <li
              key={item.slug}
              data-ai-card
              data-flip-id={item.slug}
              className={cn(
                "flex flex-col gap-8 p-6 border rounded-2xl bg-canvas border-ink/20",
                !visible(entry) && "hidden"
              )}
            >
              <div className="flex items-center justify-between gap-4 text-xs tracking-[0.15em] uppercase">
                <span>
                  <span className="opacity-50">({String(index + 1).padStart(2, "0")})</span>{" "}
                  <span className="text-gold">{item.type}</span>
                </span>
                <span className="opacity-50">{item.tools.join(" · ")}</span>
              </div>

              <div>
                <h3 className="text-[clamp(2rem,3.5vw,3rem)] leading-none tracking-tight">{item.title}</h3>
                <p className="max-w-lg mt-4 opacity-60 text-pretty">{item.description}</p>
              </div>

              {primary ? (
                <pre className="relative p-4 overflow-hidden font-mono text-xs leading-relaxed whitespace-pre-wrap rounded-lg max-h-40 bg-ink/5 opacity-80">
                  {primary.slice(0, 480)}
                  <span className="absolute inset-x-0 bottom-0 h-16 bg-gradient-to-t from-canvas to-transparent" />
                </pre>
              ) : (
                <ul className="text-sm border-t border-ink/15">
                  {item.highlights?.slice(0, 3).map((h) => (
                    <li key={h} className="py-2 border-b border-ink/15 opacity-80">
                      {h}
                    </li>
                  ))}
                </ul>
              )}

              <div className="flex flex-wrap items-center gap-3 mt-auto">
                {primary ? (
                  <>
                    <CopyButton
                      value={primary}
                      label={copyLabel(item)}
                      className="px-5 py-2 text-sm uppercase transition-colors rounded-full bg-ink text-canvas hover:bg-gold hover:text-contrast"
                    />
                    {item.type !== "Plugin" && primaryFile && (
                      <DownloadButton
                        filename={primaryFile.name}
                        content={primary}
                        className="px-5 py-2 text-sm uppercase transition-colors border rounded-full border-ink/30 hover:bg-ink hover:text-canvas"
                      />
                    )}
                  </>
                ) : null}
                {item.url && (
                  <a
                    href={item.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={
                      primary
                        ? "px-5 py-2 text-sm uppercase transition-colors border rounded-full border-ink/30 hover:bg-ink hover:text-canvas"
                        : "px-5 py-2 text-sm uppercase transition-colors rounded-full bg-ink text-canvas hover:bg-gold hover:text-contrast"
                    }
                  >
                    Visit site ↗
                  </a>
                )}
                <NavLink href={`/ai/${item.slug}`} className="ml-auto text-sm link-underline">
                  {item.files.length > 1 ? `${item.files.length} files · ` : ""}Details →
                </NavLink>
              </div>
            </li>
          );
        })}
      </ul>

      {/* What is coming — honest about empty categories */}
      {upcoming.length > 0 && (
        <div className="px-8 mt-16 md:px-10">
          <p className="text-xs tracking-[0.2em] uppercase opacity-50">In the works</p>
          <ul className="grid mt-4 border-t border-l sm:grid-cols-2 lg:grid-cols-4 border-ink/20">
            {upcoming.map((t) => (
              <li key={t} className="flex flex-col gap-6 p-6 border-b border-r border-ink/20">
                <span className="text-xs tracking-[0.15em] uppercase opacity-50">Coming soon</span>
                <div>
                  <h3 className="text-2xl tracking-tight">{t}s</h3>
                  <p className="mt-2 text-sm opacity-60">{aiTypeDescriptions[t]}</p>
                </div>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}
