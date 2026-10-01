import type { MetadataRoute } from "next";
import { aiItems } from "@/content/ai";
import { labItems } from "@/content/lab/registry";
import { siteUrl } from "@/lib/site";

export default function sitemap(): MetadataRoute.Sitemap {
  const pages = ["", "/work", "/lab", "/ai"].map((path) => ({
    url: `${siteUrl}${path}`,
    changeFrequency: "monthly" as const,
    priority: path === "" ? 1 : 0.8,
  }));
  const lab = labItems.map((item) => ({ url: `${siteUrl}/lab/${item.slug}`, priority: 0.6 }));
  const ai = aiItems.map((item) => ({ url: `${siteUrl}/ai/${item.slug}`, priority: 0.6 }));
  return [...pages, ...lab, ...ai];
}
