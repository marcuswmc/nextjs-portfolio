import { aiItems, getAiItem } from "@/content/ai";
import { ogContentType, ogSize, renderOg } from "@/lib/og";

export const alt = "AI Lab item — Marcus Vinicius";
export const size = ogSize;
export const contentType = ogContentType;

export function generateStaticParams() {
  return aiItems.map((item) => ({ slug: item.slug }));
}

export default async function Image({ params }: { params: Promise<{ slug: string }> }) {
  const item = getAiItem((await params).slug);
  return renderOg({ eyebrow: `AI Lab · ${item?.type ?? ""}`, title: item?.title ?? "AI Lab", subtitle: item?.description });
}
