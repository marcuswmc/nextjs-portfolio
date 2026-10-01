import { ogContentType, ogSize, renderOg } from "@/lib/og";

export const alt = "AI Lab — Marcus Vinicius";
export const size = ogSize;
export const contentType = ogContentType;

export default function Image() {
  return renderOg({ eyebrow: "AI Developer · Solutions", title: "AI Lab", subtitle: "Prompts, skills, plugins and automations — free to use." });
}
