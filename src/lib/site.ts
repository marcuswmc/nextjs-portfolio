/** Canonical site origin; override with NEXT_PUBLIC_SITE_URL (e.g. for preview deployments). */
export const siteUrl = (process.env.NEXT_PUBLIC_SITE_URL ?? "https://marcussilva.dev").replace(/\/$/, "");

export const siteName = "Marcus Vinicius";
export const siteTagline = "Creative & AI Developer";
export const siteDescription =
  "Creative Developer and AI Developer based in Porto. 3D web experiences, motion, AI products and automations.";
