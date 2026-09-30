"use client";

import { useState, type ReactNode } from "react";
import { CopyButton } from "@/components/motion/CopyButton";
import { DownloadButton } from "@/components/ai/DownloadButton";
import type { AiItem } from "@/content/ai";
import type { ResolvedAiFile } from "@/lib/ai-files";
import { cn } from "@/lib/utils";

type AiDetailProps = { item: AiItem; files: ResolvedAiFile[] };

/** Renders `code` spans written with backticks in plain strings. */
function inlineCode(text: string): ReactNode[] {
  return text.split(/(`[^`]+`)/g).map((part, i) =>
    part.startsWith("`") ? (
      <code key={i} className="px-1.5 py-0.5 font-mono text-[0.85em] rounded bg-ink/10">
        {part.slice(1, -1)}
      </code>
    ) : (
      part
    )
  );
}

/** Files (tabs, copy, download) and step-by-step usage for an AI Lab item. */
export function AiDetail({ item, files }: AiDetailProps) {
  const [active, setActive] = useState(0);
  const file = files[active];

  return (
    <div className="grid grid-cols-1 gap-12 px-8 mt-12 md:px-10 lg:grid-cols-12">
      {/* Files, or highlights for items that live on their own site */}
      <div className="lg:col-span-8">
        {files.length === 0 && (
          <div className="flex flex-col gap-8">
            <ul className="border-t border-ink/20">
              {item.highlights?.map((h, i) => (
                <li key={h} className="flex gap-6 py-6 border-b border-ink/20">
                  <span className="text-sm tabular-nums text-gold">0{i + 1}</span>
                  <span className="text-[clamp(1.25rem,2vw,1.75rem)] leading-snug tracking-tight text-pretty">{h}</span>
                </li>
              ))}
            </ul>
            {item.url && (
              <a
                href={item.url}
                target="_blank"
                rel="noopener noreferrer"
                className="self-start px-6 py-3 text-sm uppercase transition-colors rounded-full bg-ink text-canvas hover:bg-gold hover:text-contrast"
              >
                Visit the project ↗
              </a>
            )}
          </div>
        )}
        {files.length > 0 && (
        <div className="flex flex-wrap items-center justify-between gap-4 pb-4 text-sm border-b border-ink/20">
          <div role="tablist" aria-label="Files" className="flex flex-wrap gap-x-5 gap-y-1">
            {files.map((f, i) => (
              <button
                key={f.name}
                role="tab"
                type="button"
                aria-selected={i === active}
                onClick={() => setActive(i)}
                className={cn(
                  "font-mono cursor-pointer link-underline transition-opacity duration-300",
                  i === active ? "opacity-100" : "opacity-60 hover:opacity-100"
                )}
              >
                {f.name}
              </button>
            ))}
          </div>
          {file && (
            <div className="flex items-center gap-5">
              <CopyButton value={file.code} label="Copy" className="link-underline" />
              <DownloadButton filename={file.name} content={file.code} className="link-underline" />
            </div>
          )}
        </div>
        )}

        {file && (
          <div data-lenis-prevent className="mt-6 overflow-hidden border code-block rounded-2xl border-ink/20">
            <div className="flex justify-between px-5 py-3 text-xs tracking-wider border-b border-ink/10 opacity-70">
              <span className="font-mono">{file.name}</span>
              <span>{file.code.split("\n").length} lines</span>
            </div>
            <div className="max-h-[70svh] overflow-auto" dangerouslySetInnerHTML={{ __html: file.html }} />
          </div>
        )}
        {files.length > 0 && item.highlights && (
          <ul className="mt-10 border-t border-ink/20">
            {item.highlights.map((h, i) => (
              <li key={h} className="flex gap-6 py-4 border-b border-ink/20">
                <span className="text-sm tabular-nums text-gold">0{i + 1}</span>
                <span className="leading-snug text-pretty">{h}</span>
              </li>
            ))}
          </ul>
        )}
      </div>

      {/* Meta + steps */}
      <aside className="flex flex-col gap-10 lg:col-span-4 lg:sticky lg:top-24 lg:self-start">
        <dl className="grid grid-cols-2 gap-6 text-sm">
          <div className="pt-4 border-t border-ink/20">
            <dt className="opacity-65">Type</dt>
            <dd className="mt-1 text-gold">{item.type}</dd>
          </div>
          <div className="pt-4 border-t border-ink/20">
            <dt className="opacity-65">Built for</dt>
            <dd className="mt-1">{item.tools.join(", ")}</dd>
          </div>
          <div className="pt-4 border-t border-ink/20">
            <dt className="opacity-65">{files.length ? "Files" : "Format"}</dt>
            <dd className="mt-1">{files.length || "Web page"}</dd>
          </div>
          <div className="pt-4 border-t border-ink/20">
            <dt className="opacity-65">License</dt>
            <dd className="mt-1">{item.license ?? "Free to use"}</dd>
          </div>
        </dl>

        <div>
          <p className="text-xs tracking-[0.2em] uppercase opacity-65">How to use</p>
          <ol className="mt-4 border-t border-ink/20">
            {item.steps.map((step, i) => (
              <li key={i} className="flex gap-4 py-4 border-b border-ink/20">
                <span className="text-sm tabular-nums text-gold">0{i + 1}</span>
                <span className="leading-relaxed text-pretty">{inlineCode(step)}</span>
              </li>
            ))}
          </ol>
        </div>

        {(item.url || item.repo) && (
          <div className="flex flex-wrap gap-6">
            {item.url && (
              <a href={item.url} target="_blank" rel="noopener noreferrer" className="link-underline">
                Project site ↗
              </a>
            )}
            {item.repo && (
              <a href={item.repo} target="_blank" rel="noopener noreferrer" className="link-underline">
                GitHub ↗
              </a>
            )}
          </div>
        )}
      </aside>
    </div>
  );
}
