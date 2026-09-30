import { ogContentType, ogSize, renderOg } from "@/lib/og";

export const alt = "Marcus Vinicius — Creative & AI Developer";
export const size = ogSize;
export const contentType = ogContentType;

export default function Image() {
  return renderOg({
    eyebrow: "Portfolio",
    title: "Creative & AI Developer",
    subtitle: "3D web experiences, motion, AI products and automations.",
  });
}
