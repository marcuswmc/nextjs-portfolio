"use client";

import Image from "next/image";
import { useRef } from "react";
import { SectionHeader } from "@/components/SectionHeader";
import { RevealText } from "@/components/motion/RevealText";
import { brandLogos } from "@/constants";
import { gsap, useGSAP } from "@/lib/gsap";
import { useReducedMotion } from "@/hooks/useReducedMotion";
import myImage from "../images/man.jpg";

const stats = [
  { value: "10+", label: "Years crafting digital" },
  { value: String(brandLogos.length), label: "Brands collaborated with" },
  { value: "02", label: "Disciplines, one craft" },
];

const offline = [
  "Designing interfaces in Figma and refining visuals in Photoshop",
  "Studying AI and exploring creative tech",
  "Playing and singing music — MPB, samba and beyond",
  "Giving my housemates (the cats) the attention they deserve",
];

export default function About() {
  const sectionRef = useRef<HTMLElement | null>(null);
  const imageWrapRef = useRef<HTMLDivElement | null>(null);
  const reduced = useReducedMotion();

  useGSAP(
    () => {
      if (reduced) return;

      gsap.fromTo(
        imageWrapRef.current,
        { clipPath: "inset(100% 0% 0% 0%)" },
        {
          clipPath: "inset(0% 0% 0% 0%)",
          duration: 1.6,
          ease: "expo.inOut",
          scrollTrigger: { trigger: imageWrapRef.current, start: "top 80%", once: true },
        }
      );
      gsap.fromTo(
        imageWrapRef.current?.querySelector("img") ?? null,
        { yPercent: -8, scale: 1.15 },
        {
          yPercent: 8,
          scale: 1.15,
          ease: "none",
          scrollTrigger: { trigger: imageWrapRef.current, start: "top bottom", end: "bottom top", scrub: true },
        }
      );
      gsap.from("[data-stat]", {
        y: 40,
        autoAlpha: 0,
        duration: 1,
        ease: "power3.out",
        stagger: 0.1,
        scrollTrigger: { trigger: "[data-stats]", start: "top 85%", once: true },
      });
      gsap.from("[data-brand]", {
        autoAlpha: 0,
        duration: 0.8,
        ease: "power2.out",
        stagger: { each: 0.04, from: "random" },
        scrollTrigger: { trigger: "[data-brands]", start: "top 85%", once: true },
      });
    },
    { scope: sectionRef, dependencies: [reduced] }
  );

  return (
    <section
      id="about"
      ref={sectionRef}
      className="relative pb-24 bg-contrast text-on-contrast rounded-b-4xl"
    >
      <SectionHeader index="05" label="Code with purpose, built to scale" title="About" />

      <div className="grid gap-12 px-8 mt-12 md:px-10 lg:grid-cols-12">
        <div className="lg:col-span-5">
          <div ref={imageWrapRef} className="overflow-hidden rounded-2xl lg:sticky lg:top-24">
            <Image
              src={myImage}
              alt="Marcus Vinicius"
              className="object-cover w-full h-auto"
              quality={90}
              placeholder="blur"
              sizes="(min-width: 1024px) 40vw, 100vw"
            />
          </div>
        </div>

        <div className="flex flex-col gap-16 lg:col-span-7">
          <RevealText className="text-[clamp(1.6rem,2.8vw,2.75rem)] leading-[1.15] tracking-tight text-pretty">
            I&apos;m Marcus, a Brazilian creative developer based in Porto. For
            over a decade I&apos;ve been merging design and technology — from
            print and packaging to web, motion, 3D and now AI.
          </RevealText>

          <RevealText className="max-w-2xl text-lg leading-relaxed text-on-contrast/60 text-pretty">
            Today I build interactive campaigns, brand pages and design systems
            as a Creative Developer at Innovagency, and explore how AI can make
            creative work faster and smarter. Whether it&apos;s shaping fluid
            animations with GSAP or structuring backend APIs, I deliver polished
            solutions that feel effortless to use.
          </RevealText>

          <dl data-stats className="grid grid-cols-3 gap-4 border-t border-on-contrast/20">
            {stats.map((stat) => (
              <div key={stat.label} data-stat className="pt-6">
                <dt className="sr-only">{stat.label}</dt>
                <dd className="text-[clamp(2.5rem,5vw,4.5rem)] leading-none tracking-tight">
                  {stat.value}
                </dd>
                <dd className="mt-2 text-sm text-on-contrast/65">{stat.label}</dd>
              </div>
            ))}
          </dl>

          <div>
            <p className="text-xs tracking-[0.2em] uppercase text-on-contrast/65">When I&apos;m not coding</p>
            <ul className="mt-4 border-t border-on-contrast/20">
              {offline.map((item, index) => (
                <li
                  key={item}
                  className="flex gap-6 py-3 transition-colors duration-300 border-b border-on-contrast/20 hover:text-gold"
                >
                  <span className="text-sm tabular-nums text-on-contrast/60">0{index + 1}</span>
                  {item}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>

      {/* Brands */}
      <div className="px-8 mt-32 md:px-10">
        <p className="text-xs tracking-[0.2em] uppercase">
          <span className="opacity-65">(06)</span> Brands I&apos;ve worked with
        </p>
        <ul
          data-brands
          className="grid grid-cols-3 mt-6 border-t border-l md:grid-cols-6 border-on-contrast/15"
        >
          {brandLogos.map((logo, index) => (
            <li
              key={logo}
              data-brand
              className="flex items-center justify-center p-6 border-b border-r aspect-[3/2] border-on-contrast/15 group"
            >
              <img
                src={logo}
                alt={`Brand ${index + 1}`}
                className="object-contain w-full h-full transition-all duration-500 opacity-65 group-hover:opacity-100 group-hover:scale-110"
                loading="lazy"
              />
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
