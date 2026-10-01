import type { SVGProps } from "react";

/** 24×24 line icons for the disciplines; paths carry `data-icon-path` so a timeline can draw them. */
const icons = {
  cube: ["M12 3 L20 7.5 V16.5 L12 21 L4 16.5 V7.5 Z", "M4 7.5 L12 12 L20 7.5", "M12 12 V21"],
  motion: ["M3 18 C 8 18, 8 6, 13 6 S 18 18, 21 18", "M3 18 m -1.5 0 a 1.5 1.5 0 1 0 3 0 a 1.5 1.5 0 1 0 -3 0"],
  layout: ["M5 4 H19 A2 2 0 0 1 21 6 V18 A2 2 0 0 1 19 20 H5 A2 2 0 0 1 3 18 V6 A2 2 0 0 1 5 4 Z", "M3 9 H21", "M9 9 V20"],
  code: [
    "M8 5 C5 5 5 8 5 10 C5 12 3 12 3 12 C3 12 5 12 5 14 C5 16 5 19 8 19",
    "M16 5 C19 5 19 8 19 10 C19 12 21 12 21 12 C21 12 19 12 19 14 C19 16 19 19 16 19",
  ],
  automation: ["M4 12 A8 8 0 0 1 18 6.7", "M20 12 A8 8 0 0 1 6 17.3", "M18 3 V7 H14", "M6 21 V17 H10"],
  plug: ["M9 3 V8", "M15 3 V8", "M6 8 H18 V11 A6 6 0 0 1 6 11 Z", "M12 17 V21"],
  chat: ["M4 5 H20 V16 H11 L6 20 V16 H4 Z", "M9 10.5 H9.01", "M12 10.5 H12.01", "M15 10.5 H15.01"],
  sparkle: ["M12 3 C12 9 15 12 21 12 C15 12 12 15 12 21 C12 15 9 12 3 12 C9 12 12 9 12 3 Z", "M19 3 V6", "M17.5 4.5 H20.5"],
} as const;

export type LineIconName = keyof typeof icons;

export function LineIcon({ name, ...props }: SVGProps<SVGSVGElement> & { name: LineIconName }) {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true" {...props}>
      {icons[name].map((d) => (
        <path
          key={d}
          data-icon-path
          d={d}
          fill="none"
          stroke="currentColor"
          strokeWidth={1.4}
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      ))}
    </svg>
  );
}
