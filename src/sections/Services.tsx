"use client";

import { useRef } from "react";
import { SectionHeader } from "@/components/SectionHeader";
import { servicesData } from "@/constants";
import { gsap, useGSAP } from "@/lib/gsap";
import { useReducedMotion } from "@/hooks/useReducedMotion";

export default function Services() {
  const sectionRef = useRef<HTMLElement | null>(null);
  const reduced = useReducedMotion();

  useGSAP(
    () => {
      if (reduced) return;
      const mm = gsap.matchMedia();

      // Cards stack on desktop: each one darkens and shrinks as the next covers it (opacity would show the card beneath)
      mm.add("(min-width: 768px)", () => {
        const cards = gsap.utils.toArray<HTMLElement>("[data-service-card]");
        cards.forEach((card, i) => {
          const next = cards[i + 1];
          if (!next) return;
          gsap.to(card.querySelector("[data-service-inner]"), {
            scale: 0.94,
            filter: "brightness(0.35)",
            ease: "none",
            scrollTrigger: {
              trigger: next,
              start: "top bottom",
              end: "top 20%",
              scrub: true,
            },
          });
        });
      });

      gsap.utils.toArray<HTMLElement>("[data-service-card]").forEach((card) => {
        gsap.from(card.querySelectorAll("[data-service-row]"), {
          yPercent: 60,
          autoAlpha: 0,
          duration: 0.9,
          ease: "power3.out",
          stagger: 0.08,
          scrollTrigger: { trigger: card, start: "top 75%", once: true },
        });
      });

      return () => mm.revert();
    },
    { scope: sectionRef, dependencies: [reduced] }
  );

  return (
    <section
      id="services"
      ref={sectionRef}
      className="relative pb-24 bg-contrast text-on-contrast rounded-t-4xl"
    >
      <SectionHeader
        index="02"
        label="Behind the scene, beyond the screen"
        title="Services"
        aside="Two disciplines, one studio of one — from WebGL and motion to AI assistants and automations, shipped on a solid full stack."
      />

      <div className="mt-16">
        {servicesData.map((service, index) => (
          <article
            key={service.title}
            data-service-card
            className="md:sticky"
            style={{ top: `calc(8vh + ${index * 4.5}rem)` }}
          >
            <div
              data-service-inner
              className="grid gap-8 px-8 pt-6 pb-16 origin-top border-t md:grid-cols-12 md:px-10 bg-contrast border-on-contrast/20"
            >
              <div className="flex items-baseline gap-6 md:col-span-5">
                <span className="text-sm tabular-nums text-gold">
                  {String(index + 1).padStart(2, "0")}
                  <span className="text-on-contrast/40">/{String(servicesData.length).padStart(2, "0")}</span>
                </span>
                <h3 className="text-3xl leading-none tracking-tight lg:text-5xl">{service.title}</h3>
              </div>

              <div className="flex flex-col gap-8 md:col-span-7">
                <p className="max-w-2xl text-lg leading-relaxed lg:text-xl text-on-contrast/60 text-pretty">
                  {service.description}
                </p>

                <ul className="border-t border-on-contrast/15">
                  {service.items.map((item, itemIndex) => (
                    <li
                      key={item.title}
                      className="overflow-hidden border-b group/item border-on-contrast/15"
                    >
                      <div data-service-row>
                      <div className="flex flex-col gap-1 py-4 transition-transform duration-500 md:flex-row md:items-center md:justify-between md:group-hover/item:translate-x-3">
                        <span className="flex items-center gap-6 text-xl lg:text-2xl">
                          <span className="text-sm transition-colors duration-300 tabular-nums text-on-contrast/30 group-hover/item:text-gold">
                            0{itemIndex + 1}
                          </span>
                          {item.title}
                        </span>
                        {item.description && (
                          <span className="text-sm transition-opacity duration-500 pl-11 md:pl-0 text-on-contrast/50 md:opacity-0 md:group-hover/item:opacity-100">
                            {item.description}
                          </span>
                        )}
                      </div>
                      </div>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}
