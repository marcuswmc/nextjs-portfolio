"use client";

type EmbedDemoProps = {
  src: string;
  title: string;
  compact?: boolean;
};

/** A standalone scene in an iframe; cards hide its control panel (?embed=card). */
export default function EmbedDemo({ src, title, compact }: EmbedDemoProps) {
  return (
    <iframe
      src={`${src}?embed=${compact ? "card" : "full"}`}
      title={title}
      loading="lazy"
      className="absolute inset-0 w-full h-full border-0"
    />
  );
}
