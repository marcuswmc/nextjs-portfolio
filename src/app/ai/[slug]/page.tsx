import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { SectionHeader } from "@/components/SectionHeader";
import { AiDetail } from "@/components/ai/AiDetail";
import { NavLink } from "@/components/navigation/NavLink";
import { aiItems, getAiItem } from "@/content/ai";
import { resolveAiFiles } from "@/lib/ai-files";

type Params = { params: Promise<{ slug: string }> };

// Pages (and their source reads) are generated at build time only
export const dynamicParams = false;

export function generateStaticParams() {
  return aiItems.map((item) => ({ slug: item.slug }));
}

export async function generateMetadata({ params }: Params): Promise<Metadata> {
  const item = getAiItem((await params).slug);
  if (!item) return {};
  return { title: `${item.title} — AI Lab`, description: item.description };
}

export default async function AiItemPage({ params }: Params) {
  const { slug } = await params;
  const item = getAiItem(slug);
  if (!item) notFound();

  const files = await resolveAiFiles(item);
  const index = aiItems.indexOf(item);
  const next = aiItems[(index + 1) % aiItems.length];

  return (
    <article className="pt-16 pb-24">
      <div className="px-8 pt-24 text-sm md:px-10 md:pt-32">
        <NavLink href="/ai" className="link-underline">
          ← Back to AI Lab
        </NavLink>
      </div>

      <SectionHeader
        index={String(index + 1).padStart(2, "0")}
        label={`${item.type} · ${item.tools.join(" · ")}`}
        title={item.title}
        aside={item.description}
        size="lg"
        immediate
        className="pt-8 md:pt-10"
      />

      <AiDetail item={item} files={files} />

      {next !== item && (
        <nav aria-label="More from the AI Lab" className="px-8 mt-24 md:px-10">
          <NavLink href={`/ai/${next.slug}`} className="flex flex-col items-end gap-2 pt-6 text-right border-t group border-ink/20">
            <span className="text-xs tracking-[0.2em] uppercase opacity-50">Next</span>
            <span className="text-[clamp(1.5rem,3.5vw,3rem)] leading-none tracking-tight transition-transform duration-500 group-hover:-translate-x-2">
              {next.title}
            </span>
          </NavLink>
        </nav>
      )}
    </article>
  );
}
