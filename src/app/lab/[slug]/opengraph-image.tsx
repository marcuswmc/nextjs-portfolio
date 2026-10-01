import { getLabItem, labItems } from "@/content/lab/registry";
import { ogContentType, ogSize, renderOg } from "@/lib/og";

export const alt = "Lab item — Marcus Vinicius";
export const size = ogSize;
export const contentType = ogContentType;

export function generateStaticParams() {
  return labItems.map((item) => ({ slug: item.slug }));
}

export default async function Image({ params }: { params: Promise<{ slug: string }> }) {
  const item = getLabItem((await params).slug);
  return renderOg({ eyebrow: `Lab · ${item?.category ?? ""}`, title: item?.title ?? "Lab", subtitle: item?.description });
}
