"use client";

import { useLayoutEffect, useRef, useState } from "react";
import Image from "next/image";
import { Icon } from "@iconify/react";
import { SectionHeader } from "@/components/SectionHeader";
import { projects, projectStack } from "@/constants";
import { gsap, useGSAP } from "@/lib/gsap";
import { captureFlip, playFlip, type FlipSnapshot } from "@/lib/flip";
import { useReducedMotion } from "@/hooks/useReducedMotion";
import { useFinePointer } from "@/hooks/useFinePointer";
import { cn } from "@/lib/utils";

type View = "list" | "grid";

const filters = ["All", ...Array.from(new Set(projects.map(projectStack)))];

export default function Works() {
  const sectionRef = useRef<HTMLElement | null>(null);
  const previewRef = useRef<HTMLDivElement | null>(null);
  const flipSnapshot = useRef<FlipSnapshot | null>(null);
  const listRef = useRef<HTMLElement | null>(null);
  const [view, setView] = useState<View>("list");
  const [filter, setFilter] = useState("All");
  const [hovered, setHovered] = useState<number | null>(null);
  const reduced = useReducedMotion();
  const finePointer = useFinePointer();

  const moveX = useRef<((v: number) => void) | null>(null);
  const moveY = useRef<((v: number) => void) | null>(null);

  const visible = (stack: string) => filter === "All" || stack === filter;
  const count = projects.filter((p) => visible(projectStack(p))).length;

  useGSAP(
    () => {
      moveX.current = gsap.quickTo(previewRef.current, "x", { duration: 1.2, ease: "power3.out" });
      moveY.current = gsap.quickTo(previewRef.current, "y", { duration: 1.5, ease: "power3.out" });

      if (reduced) return;
      gsap.from("[data-work-item]", {
        y: 60,
        autoAlpha: 0,
        duration: 1,
        ease: "power3.out",
        stagger: 0.12,
        delay: 0.5,
        scrollTrigger: { trigger: "[data-work-list]", start: "top 95%", once: true },
      });
    },
    { scope: sectionRef, dependencies: [reduced] }
  );

  // Animate layout changes (view toggle / filter) from the captured state
  // Animate layout changes from the captured snapshot (height locked so the footer stays put)
  useLayoutEffect(() => {
    if (!flipSnapshot.current) return;
    const snapshot = flipSnapshot.current;
    flipSnapshot.current = null;
    playFlip(snapshot, listRef.current, { reduced, duration: 0.9, stagger: 0.03 });
  }, [view, filter, reduced]);

  const captureThen = (update: () => void) => {
    flipSnapshot.current = captureFlip("[data-work-item]", listRef.current);
    update();
  };

  const showPreview = (index: number) => {
    if (!finePointer || view !== "list") return;
    setHovered(index);
    gsap.to(previewRef.current, { autoAlpha: 1, scale: 1, duration: 0.3, ease: "power2.out" });
  };
  const hidePreview = () => {
    setHovered(null);
    gsap.to(previewRef.current, { autoAlpha: 0, scale: 0.95, duration: 0.3, ease: "power2.out" });
  };
  const handleMouseMove = (e: React.MouseEvent) => {
    if (!finePointer || view !== "list") return;
    moveX.current?.(e.clientX + 24);
    moveY.current?.(e.clientY + 24);
  };

  return (
    <section id="work" ref={sectionRef} className="relative flex flex-col pt-16 pb-24">
      <SectionHeader
        index="01"
        immediate
        label="Logic meets aesthetics, seamlessly"
        title="Works"
        count={projects.length}
        aside="Selected projects crafted with passion to drive results and impact."
      />

      {/* Controls */}
      <div className="grid grid-cols-12 gap-4 px-8 mt-10 text-sm md:px-10">
        <p className="col-span-3 md:col-span-1 opacity-65">Stack</p>
        <ul className="flex flex-wrap col-span-9 gap-x-4 gap-y-1 md:col-span-6">
          {filters.map((f) => (
            <li key={f}>
              <button
                type="button"
                onClick={() => f !== filter && captureThen(() => setFilter(f))}
                className={cn(
                  "cursor-pointer transition-opacity duration-300 link-underline",
                  f === filter ? "opacity-100" : "opacity-60 hover:opacity-100"
                )}
                aria-pressed={f === filter}
              >
                {f}
              </button>
            </li>
          ))}
        </ul>
        <p className="col-span-3 md:col-span-1 md:col-start-10 opacity-65">View</p>
        <ul className="flex col-span-9 gap-4 md:col-span-2">
          {(["list", "grid"] as View[]).map((v) => (
            <li key={v}>
              <button
                type="button"
                onClick={() => v !== view && captureThen(() => setView(v))}
                className={cn(
                  "capitalize cursor-pointer transition-opacity duration-300 link-underline",
                  v === view ? "opacity-100" : "opacity-60 hover:opacity-100"
                )}
                aria-pressed={v === view}
              >
                {v}
              </button>
            </li>
          ))}
        </ul>
      </div>

      <p className="px-8 mt-6 text-xs tracking-[0.2em] uppercase md:px-10 opacity-65" aria-live="polite">
        Showing {count} of {projects.length}
      </p>

      <div
        ref={(el) => { listRef.current = el; }}
        data-work-list
        onMouseMove={handleMouseMove}
        className={cn(
          "relative mt-6",
          view === "grid" && "grid gap-x-4 gap-y-10 px-8 md:px-10 sm:grid-cols-2 lg:grid-cols-3"
        )}
      >
        {projects.map((project, index) => {
          const stack = projectStack(project);
          const isVisible = visible(stack);
          return (
            <a
              key={project.id}
              href={project.link}
              target="_blank"
              rel="noopener noreferrer"
              data-work-item
              data-flip-id={`work-${project.id}`}
              onMouseEnter={() => showPreview(index)}
              onMouseLeave={hidePreview}
              className={cn("group block", !isVisible && "hidden")}
            >
              {view === "list" ? (
                <div className="relative py-5 border-b border-ink/80">
                  {/* hover fill */}
                  <div className="absolute inset-0 hidden transition-transform duration-500 origin-bottom scale-y-0 md:block bg-ink -z-10 group-hover:scale-y-100 ease-[cubic-bezier(0.65,0,0.35,1)]" />
                  <div className="flex items-end justify-between gap-6 px-8 transition-all duration-500 md:px-10 md:group-hover:px-12 md:group-hover:text-canvas">
                    <div className="flex items-baseline gap-6">
                      <span className="text-sm tabular-nums opacity-65">
                        {String(index + 1).padStart(2, "0")}
                      </span>
                      <h3 className="text-[26px] lg:text-[40px] leading-none tracking-tight">
                        {project.name}
                      </h3>
                    </div>
                    <div className="flex items-center gap-6">
                      <p className="hidden text-xs tracking-wider uppercase md:block opacity-70">
                        {project.frameworks.map((f) => f.name).join(" · ")}
                      </p>
                      <Icon
                        icon="lucide:arrow-up-right"
                        className="transition-transform duration-500 size-5 md:size-7 group-hover:rotate-45"
                      />
                    </div>
                  </div>
                  {/* mobile image */}
                  <div className="px-8 mt-4 md:hidden">
                    <div className="relative overflow-hidden rounded-md aspect-[16/10]">
                      <Image src={project.image} alt={project.name} fill sizes="100vw" className="object-cover" />
                    </div>
                    <p className="mt-2 text-xs tracking-wider uppercase opacity-70">
                      {project.frameworks.map((f) => f.name).join(" · ")}
                    </p>
                  </div>
                </div>
              ) : (
                <div className="flex flex-col gap-3">
                  <div className="relative overflow-hidden rounded-md aspect-[16/10] bg-ink/10">
                    <Image
                      src={project.bgImage}
                      alt=""
                      aria-hidden="true"
                      fill
                      sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
                      quality={40}
                      className="object-cover transition-all duration-700 scale-110 blur-sm brightness-50 group-hover:scale-100"
                    />
                    <div className="absolute overflow-hidden rounded-sm shadow-2xl inset-6 transition-transform duration-700 group-hover:scale-[1.04] ease-[cubic-bezier(0.22,1,0.36,1)]">
                      <Image
                        src={project.image}
                        alt={project.name}
                        fill
                        sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
                        className="object-cover"
                      />
                    </div>
                  </div>
                  <div className="flex items-start justify-between gap-4">
                    <div>
                      <h3 className="text-xl leading-tight tracking-tight">{project.name}</h3>
                      <p className="mt-1 text-xs tracking-wider uppercase opacity-60">
                        {project.frameworks.map((f) => f.name).join(" · ")}
                      </p>
                    </div>
                    <Icon
                      icon="lucide:arrow-up-right"
                      className="transition-transform duration-500 size-5 shrink-0 group-hover:rotate-45"
                    />
                  </div>
                </div>
              )}
            </a>
          );
        })}
      </div>

      {/* Floating preview (list view, desktop) */}
      <div
        ref={previewRef}
        className="fixed top-0 left-0 z-30 hidden overflow-hidden rounded-md opacity-0 pointer-events-none md:block w-[520px] aspect-[16/10] shadow-2xl"
      >
        {hovered !== null && (
          <Image src={projects[hovered].image} alt="" fill sizes="520px" className="object-cover" />
        )}
      </div>
    </section>
  );
}
