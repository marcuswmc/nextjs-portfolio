import { ogContentType, ogSize, renderOg } from "@/lib/og";

export const alt = "Lab — Marcus Vinicius";
export const size = ogSize;
export const contentType = ogContentType;

export default function Image() {
  return renderOg({ eyebrow: "Creative Developer · Library", title: "Lab", subtitle: "Components, heros, sections and 3D experiments — live and ready to copy." });
}
