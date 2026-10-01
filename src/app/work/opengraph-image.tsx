import { ogContentType, ogSize, renderOg } from "@/lib/og";

export const alt = "Work — Marcus Vinicius";
export const size = ogSize;
export const contentType = ogContentType;

export default function Image() {
  return renderOg({ eyebrow: "Selected projects", title: "Work", subtitle: "Websites and web apps built with Next.js, React and WordPress." });
}
