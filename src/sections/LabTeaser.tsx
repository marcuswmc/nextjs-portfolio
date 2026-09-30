"use client";

import type { ReactNode } from "react";
import { SectionHeader } from "@/components/SectionHeader";
import { CopyButton } from "@/components/motion/CopyButton";
import { Magnetic } from "@/components/motion/Magnetic";
import { RevealText } from "@/components/motion/RevealText";
import { ScrambleText } from "@/components/motion/ScrambleText";
import { NavLink } from "@/components/navigation/NavLink";

type Demo = { title: string; hint: string; preview: ReactNode };

const demos: Demo[] = [
  {
    title: "Text Scramble",
    hint: "Hover",
    preview: (
      <ScrambleText
        text="HOVER ME"
        className="text-4xl tracking-tight cursor-default lg:text-5xl"
      />
    ),
  },
  {
    title: "Magnetic Button",
    hint: "Move closer",
    preview: (
      <Magnetic strength={0.5}>
        <span className="flex items-center justify-center text-sm tracking-wider uppercase transition-colors duration-300 border rounded-full size-28 border-ink/40 hover:bg-ink hover:text-canvas">
          Magnetic
        </span>
      </Magnetic>
    ),
  },
  {
    title: "Line Reveal",
    hint: "On scroll",
    preview: (
      <RevealText className="max-w-[14rem] text-2xl leading-tight tracking-tight">
        Lines rise from a mask as they enter the view.
      </RevealText>
    ),
  },
  {
    title: "Copy Feedback",
    hint: "Click",
    preview: (
      <div className="flex items-center gap-3 px-4 py-3 font-mono text-sm border rounded-full border-ink/30">
        <code>npm i gsap</code>
        <CopyButton
          value="npm i gsap"
          className="px-3 py-1 text-xs uppercase rounded-full bg-ink text-canvas"
        />
      </div>
    ),
  },
];

export default function LabTeaser() {
  return (
    <section id="lab" className="relative pb-24">
      <SectionHeader
        index="04"
        label="Creative Developer · Library"
        title="Lab"
        aside="A growing library of components, heros, sections and 3D experiments — live, interactive and ready to copy."
      />

      <div className="grid mx-8 mt-12 border-t border-l md:mx-10 sm:grid-cols-2 lg:grid-cols-4 border-ink/20">
        {demos.map((demo, index) => (
          <div
            key={demo.title}
            className="flex flex-col justify-between gap-6 p-6 border-b border-r aspect-square border-ink/20"
          >
            <div className="flex justify-between text-xs tracking-[0.15em] uppercase">
              <span>
                <span className="opacity-50">({String(index + 1).padStart(2, "0")})</span>{" "}
                {demo.title}
              </span>
              <span className="opacity-50">{demo.hint}</span>
            </div>
            <div className="flex items-center justify-center flex-1">{demo.preview}</div>
            <NavLink href="/lab" className="self-start text-sm link-underline">
              View in Lab →
            </NavLink>
          </div>
        ))}
      </div>

      <div className="flex justify-center mt-16">
        <Magnetic>
          <NavLink
            href="/lab"
            className="flex items-center justify-center text-sm tracking-wider text-center uppercase transition-transform duration-500 rounded-full size-36 bg-ink text-canvas hover:scale-105"
          >
            Explore
            <br />
            the Lab
          </NavLink>
        </Magnetic>
      </div>
    </section>
  );
}
