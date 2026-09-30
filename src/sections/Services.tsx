"use client";

import { useRef, useState } from "react";
import { SectionHeader } from "@/components/SectionHeader";
import { servicesData } from "@/constants";
import { gsap, useGSAP } from "@/lib/gsap";
import { useReducedMotion } from "@/hooks/useReducedMotion";
import { cn } from "@/lib/utils";

/** Services as an editorial index: one row per service, expanding into its details. */
export default function Services() {
  const sectionRef = useRef<HTMLElement | null>(null);
  const panelRefs = useRef<(HTMLDivElement | null)[]>([]);
  const [open, setOpen] = useState<number | null>(0);
  const reduced = useReducedMotion();

  useGSAP(
    () => {
      // Closed panels start collapsed; the open one keeps its natural height
      panelRefs.current.forEach((panel, i) => {
        if (panel) gsap.set(panel, { height: i === 0 ? "auto" : 0 });
      });

      if (reduced) return;
      gsap.from("[data-service-row]", {
        y: 50,
        autoAlpha: 0,
        duration: 1,
        ease: "power3.out",
        stagger: 0.1,
        scrollTrigger: { trigger: "[data-service-list]", start: "top 80%", once: true },
      });
    },
    { scope: sectionRef, dependencies: [reduced] }
  );

  const toggle = (index: number) => {
    const next = open === index ? null : index;
    const duration = reduced ? 0 : 0.7;

    panelRefs.current.forEach((panel, i) => {
      if (!panel) return;
      if (i === next) {
        gsap.to(panel, { height: "auto", duration, ease: "expo.inOut" });
        gsap.fromTo(
          panel.querySelectorAll("[data-service-detail]"),
          { y: 24, autoAlpha: 0 },
          { y: 0, autoAlpha: 1, duration, ease: "power3.out", stagger: 0.06, delay: duration * 0.3 }
        );
      } else if (i === open) {
        gsap.to(panel, { height: 0, duration, ease: "expo.inOut" });
      }
    });

    setOpen(next);
  };

  return (
    <section
      id="services"
      ref={sectionRef}
      className="relative pb-24 bg-contrast text-on-contrast rounded-4xl"
    >
      <SectionHeader
        index="02"
        label="Behind the scene, beyond the screen"
        title="Services"
        count={servicesData.length}
        aside="Two disciplines, one studio of one — from WebGL and motion to AI assistants and automations, shipped on a solid full stack."
      />

      <ul data-service-list className="px-8 mt-12 md:px-10">
        {servicesData.map((service, index) => {
          const isOpen = open === index;
          const panelId = `service-panel-${index}`;
          return (
            <li
              key={service.title}
              data-service-row
              className="border-b border-on-contrast/20 first:border-t"
            >
              <button
                type="button"
                onClick={() => toggle(index)}
                aria-expanded={isOpen}
                aria-controls={panelId}
                className="grid items-baseline w-full grid-cols-12 gap-4 py-6 text-left cursor-pointer group md:py-8"
              >
                <span
                  className={cn(
                    "col-span-2 text-sm tabular-nums transition-colors duration-300 md:col-span-1",
                    isOpen ? "text-gold" : "text-on-contrast/60 group-hover:text-gold"
                  )}
                >
                  ({String(index + 1).padStart(2, "0")})
                </span>
                <span className="col-span-8 md:col-span-7">
                  <span className="block text-[clamp(1.75rem,4.5vw,4rem)] leading-[0.95] tracking-tight transition-transform duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:translate-x-3">
                    {service.title}
                  </span>
                </span>
                <span className="hidden text-xs tracking-[0.2em] uppercase md:block md:col-span-3 text-on-contrast/65">
                  {service.discipline === "Foundation"
                    ? "Foundation"
                    : `${service.discipline} Developer`}
                </span>
                <span
                  aria-hidden="true"
                  className={cn(
                    "col-span-2 text-2xl leading-none justify-self-end transition-transform duration-500 md:col-span-1",
                    isOpen && "rotate-45"
                  )}
                >
                  +
                </span>
              </button>

              <div
                id={panelId}
                ref={(el) => {
                  panelRefs.current[index] = el;
                }}
                className="overflow-hidden"
                role="region"
                aria-label={service.title}
              >
                <div className="grid grid-cols-12 gap-4 pb-10">
                  <p
                    data-service-detail
                    className="col-span-12 max-w-xl text-lg leading-relaxed md:col-span-5 md:col-start-2 text-on-contrast/60 text-pretty"
                  >
                    {service.description}
                  </p>
                  <ul className="grid col-span-12 gap-px mt-4 sm:grid-cols-3 md:mt-0 md:col-span-6 md:col-start-7 bg-on-contrast/15">
                    {service.items.map((item, itemIndex) => (
                      <li
                        key={item.title}
                        data-service-detail
                        className="flex flex-col justify-between gap-6 p-4 bg-contrast min-h-36"
                      >
                        <span className="text-xs tabular-nums text-gold">0{itemIndex + 1}</span>
                        <span>
                          <span className="block leading-tight">{item.title}</span>
                          {item.description && (
                            <span className="block mt-2 text-sm text-on-contrast/65">
                              {item.description}
                            </span>
                          )}
                        </span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </li>
          );
        })}
      </ul>
    </section>
  );
}
