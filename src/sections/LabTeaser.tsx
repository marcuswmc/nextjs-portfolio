"use client";

import { SectionHeader } from "@/components/SectionHeader";
import { LabCard } from "@/components/lab/LabCard";
import { Magnetic } from "@/components/motion/Magnetic";
import { NavLink } from "@/components/navigation/NavLink";
import { getLabItem, type LabItem } from "@/content/lab/registry";

const featured = ["text-scramble", "magnetic", "line-reveal", "copy-button"]
  .map(getLabItem)
  .filter((item): item is LabItem => Boolean(item));

export default function LabTeaser() {
  return (
    <section id="lab" className="relative pb-24">
      <SectionHeader
        index="03"
        label="Creative Developer · Library"
        title="Lab"
        aside="A growing library of components, heros, sections and 3D experiments — live, interactive and ready to copy."
      />

      <ul className="grid mx-8 mt-12 border-t border-l md:mx-10 sm:grid-cols-2 lg:grid-cols-4 border-ink/20">
        {featured.map((item, index) => (
          <LabCard key={item.slug} item={item} index={index} className="border-ink/20" />
        ))}
      </ul>

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
