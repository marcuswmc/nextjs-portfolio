"use client";

import { SectionHeader } from "@/components/SectionHeader";
import { CopyButton } from "@/components/motion/CopyButton";
import { Magnetic } from "@/components/motion/Magnetic";
import { NavLink } from "@/components/navigation/NavLink";
import { aiItems, aiTypeDescriptions, aiTypes, copyLabel } from "@/content/ai";

export default function AiTeaser() {
  const featured = aiItems[0];
  const featuredContent = featured.files[0]?.content ?? "";

  return (
    <section
      id="ai"
      className="relative pb-24 bg-contrast text-on-contrast rounded-t-4xl"
    >
      <SectionHeader
        index="04"
        label="AI Developer · Solutions"
        title="AI Lab"
        aside="Prompts, skills, plugins and automations I build for my own work — shared openly, free to use in yours."
      />

      <div className="grid gap-4 px-8 mt-12 md:px-10 lg:grid-cols-12">
        {/* Featured item */}
        <article className="flex flex-col justify-between gap-10 p-6 border rounded-2xl lg:col-span-6 border-on-contrast/20">
          <div className="flex items-center justify-between text-xs tracking-[0.15em] uppercase">
            <span className="text-gold">Featured · {featured.type}</span>
            <span className="opacity-50">{featured.tools.join(" · ")}</span>
          </div>
          <div>
            <h3 className="text-4xl leading-none tracking-tight lg:text-5xl">{featured.title}</h3>
            <p className="max-w-md mt-4 text-on-contrast/60">{featured.description}</p>
          </div>
          <pre className="relative p-4 overflow-hidden text-xs leading-relaxed whitespace-pre-wrap rounded-lg max-h-40 bg-on-contrast/5 text-on-contrast/70 font-mono">
            {featuredContent.length > 420 ? `${featuredContent.slice(0, 420)}…` : featuredContent}
            <span className="absolute inset-x-0 bottom-0 h-16 bg-gradient-to-t from-contrast to-transparent" />
          </pre>
          <div className="flex items-center gap-4">
            {featuredContent && (
              <CopyButton
                value={featuredContent}
                label={copyLabel(featured)}
                className="px-5 py-2 text-sm uppercase transition-colors rounded-full bg-on-contrast text-contrast hover:bg-gold"
              />
            )}
            <NavLink href={`/ai/${featured.slug}`} className="text-sm link-underline">
              Details →
            </NavLink>
          </div>
        </article>

        {/* Types — editorial index */}
        <ul className="self-start border-t lg:col-span-6 border-on-contrast/20">
          {aiTypes.map((type, index) => {
            const count = aiItems.filter((item) => item.type === type).length;
            return (
              <li key={type} className="border-b border-on-contrast/20">
                <NavLink href="/ai" className="grid items-baseline grid-cols-12 gap-4 py-5 group">
                  <span className="col-span-2 text-sm tabular-nums transition-colors duration-300 text-on-contrast/40 group-hover:text-gold">
                    ({String(index + 1).padStart(2, "0")})
                  </span>
                  <span className="col-span-7">
                    <span className="block text-3xl tracking-tight transition-transform duration-500 group-hover:translate-x-2">
                      {type}s
                    </span>
                    <span className="block mt-1 text-sm text-on-contrast/50">{aiTypeDescriptions[type]}</span>
                  </span>
                  <span className="col-span-3 text-xs tracking-[0.15em] uppercase justify-self-end text-on-contrast/60">
                    {count > 0 ? `${count} available` : "Coming soon"}
                  </span>
                </NavLink>
              </li>
            );
          })}
        </ul>
      </div>

      <div className="flex justify-center mt-16">
        <Magnetic>
          <NavLink
            href="/ai"
            className="flex items-center justify-center text-sm tracking-wider text-center uppercase transition-transform duration-500 rounded-full size-36 bg-gold text-contrast hover:scale-105"
          >
            Open the
            <br />
            AI Lab
          </NavLink>
        </Magnetic>
      </div>
    </section>
  );
}
