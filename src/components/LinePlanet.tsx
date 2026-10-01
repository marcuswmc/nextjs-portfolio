"use client";

import { useId, type SVGProps } from "react";

/** Sphere radius in viewBox units — the zoom math in Disciplines relies on it. */
export const PLANET_RADIUS = 60;

const line = {
  fill: "none",
  stroke: "currentColor",
  strokeWidth: 1.6,
  strokeLinecap: "round",
  strokeLinejoin: "round",
  vectorEffect: "non-scaling-stroke",
} as const;

/**
 * Minimal line-art planet (no fills): sphere with bands and craters, a gold ring whose
 * back half passes behind the sphere, a gold moon and a few sparkles.
 * Drawn around (0,0) so a scroll timeline can scale `[data-planet]` from the centre.
 * `[data-planet-fill]` is an interior fill kept at opacity 0 until the "inside" phase.
 */
export function LinePlanet(props: SVGProps<SVGGElement>) {
  const id = useId().replace(/:/g, "");
  const clip = `planet-clip-${id}`;
  const behind = `planet-behind-${id}`;

  return (
    <g data-planet {...props}>
      <defs>
        <clipPath id={clip}>
          <circle r={PLANET_RADIUS} />
        </clipPath>
        <mask id={behind} maskUnits="userSpaceOnUse" x="-400" y="-400" width="800" height="800">
          <rect x="-400" y="-400" width="800" height="800" fill="white" />
          <circle r={PLANET_RADIUS + 1.5} fill="black" />
        </mask>
      </defs>

      {/* Interior fill used for the inverted "inside the planet" background */}
      <circle data-planet-fill r={PLANET_RADIUS} style={{ fill: "var(--site-ink)" }} opacity={0} />

      <g data-ring className="text-gold">
        <g transform="rotate(-18)">
          <path data-draw {...line} d="M -96 0 A 96 22 0 0 1 96 0" mask={`url(#${behind})`} />
        </g>
      </g>

      <circle data-draw data-planet-sphere r={PLANET_RADIUS} {...line} />

      <g data-planet-bands clipPath={`url(#${clip})`}>
        <path data-draw {...line} d="M -62 -28 C -30 -18, 30 -18, 62 -30" />
        <path data-draw {...line} d="M -62 6 C -25 16, 25 16, 62 4" />
        <path data-draw {...line} d="M -50 34 C -20 42, 20 42, 52 32" />
        <circle data-draw {...line} cx="-22" cy="-40" r="6" />
        <circle data-draw {...line} cx="-14" cy="-36" r="2" />
        <circle data-draw {...line} cx="28" cy="22" r="4" />
        <path data-draw {...line} d="M 30 -48 A 50 50 0 0 1 50 -26" />
      </g>

      <g data-ring className="text-gold">
        <g transform="rotate(-18)">
          <path data-draw {...line} d="M 96 0 A 96 22 0 0 1 -96 0" />
        </g>
      </g>

      <g data-moon className="text-gold">
        <circle data-draw {...line} cx="74" cy="-64" r="10" />
        <circle data-draw {...line} cx="71" cy="-67" r="2.5" />
      </g>

      <g data-sparkles>
        <path data-draw {...line} d="M -86 -70 v 10 M -91 -65 h 10" />
        <path data-draw {...line} d="M 88 52 v 7 M 84.5 55.5 h 7" />
        <circle {...line} cx="-78" cy="70" r="1.2" />
        <circle {...line} cx="40" cy="-92" r="1.2" />
      </g>
    </g>
  );
}
