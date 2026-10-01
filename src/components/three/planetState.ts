/** Values written by a scroll timeline and eased toward every frame. Kept free of three.js imports. */
export type PlanetState = {
  /** Screen-space offset in world units (positive = right / up). */
  x: number;
  y: number;
  scale: number;
  rotY: number;
  ringTilt: number;
  moonScale: number;
};

export const initialPlanetState: PlanetState = {
  x: 0,
  y: 0,
  scale: 0.75,
  rotY: 0,
  ringTilt: 0,
  moonScale: 1,
};
