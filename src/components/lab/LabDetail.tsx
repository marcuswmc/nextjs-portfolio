"use client";

import { useState } from "react";
import { CopyButton } from "@/components/motion/CopyButton";
import { controlDefaults, type LabItem } from "@/content/lab/registry";
import { getLabPreview } from "@/content/lab/previews";
import { cn } from "@/lib/utils";

type LabDetailProps = {
  item: LabItem;
  code: string;
  codeHtml: string;
  usageHtml: string;
};

type Tab = "preview" | "code";

/** Interactive preview with prop controls, plus highlighted source and usage. */
export function LabDetail({ item, code, codeHtml, usageHtml }: LabDetailProps) {
  const [tab, setTab] = useState<Tab>("preview");
  const [values, setValues] = useState(() => controlDefaults(item));
  const [replayKey, setReplayKey] = useState(0);
  const Preview = getLabPreview(item);
  const install = item.dependencies.length ? `npm i ${item.dependencies.join(" ")}` : null;

  // SplitText and friends rewrite the DOM, so DOM demos remount when props change;
  // the 3D scene keeps its WebGL context and eases toward the new values instead.
  const previewKey = item.category === "3D" ? `${replayKey}` : `${replayKey}-${JSON.stringify(values)}`;

  const update = (name: string, value: string | number) => {
    setValues((prev) => ({ ...prev, [name]: value }));
  };

  return (
    <div className="px-8 mt-12 md:px-10">
      {/* Tabs */}
      <div className="flex items-center justify-between gap-4 pb-4 text-sm border-b border-ink/20">
        <div role="tablist" aria-label="View" className="flex gap-5">
          {(["preview", "code"] as Tab[]).map((t) => (
            <button
              key={t}
              role="tab"
              type="button"
              aria-selected={tab === t}
              onClick={() => setTab(t)}
              className={cn(
                "capitalize cursor-pointer link-underline transition-opacity duration-300",
                tab === t ? "opacity-100" : "opacity-60 hover:opacity-100"
              )}
            >
              {t}
            </button>
          ))}
        </div>
        {tab === "preview" ? (
          <button
            type="button"
            onClick={() => setReplayKey((k) => k + 1)}
            className="cursor-pointer link-underline"
          >
            Replay ↻
          </button>
        ) : item.viewOnly ? (
          <span className="opacity-65">View only</span>
        ) : (
          <CopyButton value={code} label="Copy code" className="link-underline" />
        )}
      </div>

      {tab === "preview" ? (
        <div className="grid grid-cols-1 gap-4 mt-6 lg:grid-cols-12">
          <div
            className={cn(
              "relative flex items-center justify-center overflow-hidden border rounded-2xl border-ink/20 min-h-[60svh]",
              item.controls?.length ? "lg:col-span-9" : "lg:col-span-12"
            )}
          >
            <span className="absolute z-10 text-xs tracking-[0.15em] uppercase pointer-events-none top-5 left-6 opacity-65 mix-blend-difference text-white">
              {item.hint}
            </span>
            {Preview && <Preview key={previewKey} values={values} />}
          </div>

          {item.controls?.length ? (
            <form
              className="flex flex-col gap-6 p-6 border rounded-2xl lg:col-span-3 border-ink/20"
              onSubmit={(e) => e.preventDefault()}
            >
              <p className="text-xs tracking-[0.2em] uppercase opacity-65">Props</p>
              {item.controls.map((control) => (
                <label key={control.name} className="flex flex-col gap-2 text-sm">
                  <span className="flex justify-between">
                    {control.label}
                    {control.type === "range" && (
                      <span className="tabular-nums opacity-60">{values[control.name]}</span>
                    )}
                  </span>
                  {control.type === "text" ? (
                    <input
                      type="text"
                      value={String(values[control.name])}
                      onChange={(e) => update(control.name, e.target.value)}
                      className="px-3 py-2 bg-transparent border rounded-lg border-ink/20 focus:outline-none focus:border-ink"
                    />
                  ) : (
                    <input
                      type="range"
                      min={control.min}
                      max={control.max}
                      step={control.step}
                      value={Number(values[control.name])}
                      onChange={(e) => update(control.name, Number(e.target.value))}
                      className="accent-gold"
                    />
                  )}
                </label>
              ))}
              <button
                type="button"
                onClick={() => {
                  setValues(controlDefaults(item));
                  setReplayKey((k) => k + 1);
                }}
                className="self-start mt-auto text-sm cursor-pointer link-underline opacity-60 hover:opacity-100"
              >
                Reset
              </button>
            </form>
          ) : null}
        </div>
      ) : (
        <div data-lenis-prevent className="mt-6 overflow-hidden border code-block rounded-2xl border-ink/20">
          <div className="flex justify-between px-5 py-3 text-xs tracking-wider border-b border-ink/10 opacity-70">
            <span>{item.sourcePath.split("/").pop()}</span>
            <span>{code.split("\n").length} lines</span>
          </div>
          <div className="max-h-[70svh] overflow-auto" dangerouslySetInnerHTML={{ __html: codeHtml }} />
        </div>
      )}

      {/* Install + usage (reusable components only; experiments are view-only) */}
      {item.viewOnly ? (
        <p className="mt-12 text-sm opacity-65">
          Built with {item.dependencies.join(" + ")}. Shared to explore and read — the source is not
          offered for download.
        </p>
      ) : (
      <div className="grid grid-cols-1 gap-4 mt-12 md:grid-cols-2">
        <div className="flex flex-col gap-3">
          <p className="text-xs tracking-[0.2em] uppercase opacity-65">Install</p>
          {install ? (
            <div className="flex items-center justify-between gap-4 px-5 py-4 font-mono text-sm border rounded-2xl border-ink/20">
              <code className="min-w-0 truncate">{install}</code>
              <CopyButton
                value={install}
                className="px-3 py-1 text-xs uppercase rounded-full shrink-0 bg-ink text-canvas"
              />
            </div>
          ) : (
            <p className="px-5 py-4 text-sm border rounded-2xl border-ink/20 opacity-70">
              No dependencies — copy the file and use it.
            </p>
          )}
        </div>
        <div className="flex flex-col gap-3">
          <p className="text-xs tracking-[0.2em] uppercase opacity-65">Usage</p>
          <div
            data-lenis-prevent
            className="overflow-hidden border code-block rounded-2xl border-ink/20"
            dangerouslySetInnerHTML={{ __html: usageHtml }}
          />
        </div>
      </div>
      )}
    </div>
  );
}
