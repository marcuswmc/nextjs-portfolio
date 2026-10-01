import { ImageResponse } from "next/og";

export const ogSize = { width: 1200, height: 630 };
export const ogContentType = "image/png";

type OgProps = { eyebrow: string; title: string; subtitle?: string };

/** Editorial Open Graph card shared by every route. */
export function renderOg({ eyebrow, title, subtitle }: OgProps) {
  // Keep every card to ~2 title lines and 2 subtitle lines
  const titleSize = title.length > 18 ? 88 : title.length > 10 ? 112 : 150;
  const summary = subtitle && subtitle.length > 110 ? `${subtitle.slice(0, 107).trimEnd()}…` : subtitle;

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          padding: "64px 72px",
          background: "#0e0e0d",
          color: "#e5e5e0",
        }}
      >
        <div style={{ display: "flex", justifyContent: "space-between", fontSize: 24, opacity: 0.7 }}>
          <span>Marcus Vinicius</span>
          <span>Creative & AI Developer</span>
        </div>
        <div style={{ display: "flex", flexDirection: "column", gap: 20 }}>
          <span style={{ fontSize: 24, letterSpacing: 6, textTransform: "uppercase", color: "#cfa355" }}>
            {eyebrow}
          </span>
          <span
            style={{
              fontSize: titleSize,
              lineHeight: 0.9,
              letterSpacing: -4,
              textTransform: "uppercase",
            }}
          >
            {title}
          </span>
          {summary && (
            <span style={{ fontSize: 30, lineHeight: 1.3, opacity: 0.6, maxWidth: 940 }}>{summary}</span>
          )}
        </div>
        <div style={{ display: "flex", justifyContent: "space-between", fontSize: 22, opacity: 0.5 }}>
          <span>marcussilva.dev</span>
          <span>Porto, Portugal</span>
        </div>
      </div>
    ),
    ogSize
  );
}
