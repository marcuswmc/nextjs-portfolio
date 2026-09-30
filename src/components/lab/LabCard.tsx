"use client";

import { useState, type HTMLAttributes } from "react";
import { InView } from "@/components/InView";
import { NavLink } from "@/components/navigation/NavLink";
import { controlDefaults, type LabItem } from "@/content/lab/registry";
import { labPreviews } from "@/content/lab/previews";
import { cn } from "@/lib/utils";

type LabCardProps = HTMLAttributes<HTMLLIElement> & {
  item: LabItem;
  index: number;
};

/** Grid cell with a live preview; one-shot animations get a Replay button. */
export function LabCard({ item, index, className, ...rest }: LabCardProps) {
  const [replayKey, setReplayKey] = useState(0);
  const Preview = labPreviews[item.slug];

  return (
    <li className={cn("flex flex-col border-b border-r border-current/20 bg-inherit", className)} {...rest}>
      <div className="flex items-center justify-between gap-4 px-6 pt-5 text-xs tracking-[0.15em] uppercase">
        <span>
          <span className="opacity-50">({String(index + 1).padStart(2, "0")})</span> {item.category}
        </span>
        {item.replayable ? (
          <button
            type="button"
            onClick={() => setReplayKey((k) => k + 1)}
            className="uppercase cursor-pointer link-underline"
            aria-label={`Replay ${item.title}`}
          >
            Replay ↻
          </button>
        ) : (
          <span className="opacity-50">{item.hint}</span>
        )}
      </div>

      <InView className="relative flex items-center justify-center overflow-hidden aspect-[4/3]">
        {Preview && <Preview key={replayKey} values={controlDefaults(item)} compact />}
      </InView>

      <div className="flex items-end justify-between gap-4 px-6 pt-4 pb-6 mt-auto border-t border-current/10">
        <div>
          <h3 className="text-2xl leading-none tracking-tight">{item.title}</h3>
          <p className="mt-2 text-xs tracking-wider uppercase opacity-50">
            {item.dependencies.length ? item.dependencies.join(" · ") : "No dependencies"}
          </p>
        </div>
        <NavLink
          href={`/lab/${item.slug}`}
          className="flex items-center justify-center text-lg transition-colors duration-300 border rounded-full shrink-0 size-11 border-current/30 hover:bg-ink hover:text-canvas"
          aria-label={`Open ${item.title}`}
        >
          →
        </NavLink>
      </div>
    </li>
  );
}
