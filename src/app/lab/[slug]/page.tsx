import { readFile } from "node:fs/promises";
import path from "node:path";
import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { SectionHeader } from "@/components/SectionHeader";
import { LabDetail } from "@/components/lab/LabDetail";
import { NavLink } from "@/components/navigation/NavLink";
import { getLabItem, labItems } from "@/content/lab/registry";
import { highlight } from "@/lib/highlight";

type Params = { params: Promise<{ slug: string }> };

// Pages (and their source reads) are generated at build time only
export const dynamicParams = false;

export function generateStaticParams() {
  return labItems.map((item) => ({ slug: item.slug }));
}

export async function generateMetadata({ params }: Params): Promise<Metadata> {
  const item = getLabItem((await params).slug);
  if (!item) return {};
  return {
    alternates: { canonical: `/lab/${item.slug}` },
    title: `${item.title} — Lab`,
    description: item.description,
  };
}

export default async function LabItemPage({ params }: Params) {
  const { slug } = await params;
  const item = getLabItem(slug);
  if (!item) notFound();

  const code = await readFile(path.join(process.cwd(), item.sourcePath), "utf8");
  const [codeHtml, usageHtml] = await Promise.all([highlight(code), highlight(item.usage)]);

  const index = labItems.indexOf(item);
  const prev = labItems[(index - 1 + labItems.length) % labItems.length];
  const next = labItems[(index + 1) % labItems.length];

  return (
    <article className="pt-16 pb-24">
      <div className="px-8 pt-24 text-sm md:px-10 md:pt-32">
        <NavLink href="/lab" className="link-underline">
          ← Back to Lab
        </NavLink>
      </div>

      <SectionHeader
        index={String(index + 1).padStart(2, "0")}
        label={item.category}
        title={item.title}
        aside={item.description}
        size="lg"
        immediate
        className="pt-8 md:pt-10"
      />

      <LabDetail item={item} code={code} codeHtml={codeHtml} usageHtml={usageHtml} />

      <nav aria-label="More from the Lab" className="grid grid-cols-2 gap-4 px-8 mt-24 md:px-10">
        {[
          { label: "Previous", item: prev },
          { label: "Next", item: next },
        ].map(({ label, item: target }) => (
          <NavLink
            key={label}
            href={`/lab/${target.slug}`}
            className={`group flex flex-col gap-2 pt-6 border-t border-ink/20 ${label === "Next" ? "items-end text-right" : ""}`}
          >
            <span className="text-xs tracking-[0.2em] uppercase opacity-65">{label}</span>
            <span className="text-[clamp(1.5rem,3.5vw,3rem)] leading-none tracking-tight transition-transform duration-500 group-hover:translate-x-2">
              {target.title}
            </span>
          </NavLink>
        ))}
      </nav>
    </article>
  );
}
