export type SiteLink = { label: string; href: string };

/** Full menu, in page order. */
export const menuLinks: SiteLink[] = [
  { label: "Home", href: "/#home" },
  { label: "Services", href: "/#services" },
  { label: "Work", href: "/#work" },
  { label: "Lab", href: "/lab" },
  { label: "AI", href: "/ai" },
  { label: "About", href: "/#about" },
  { label: "Contact", href: "/#contact" },
];

/** Short list shown in the header. */
export const headerLinks: SiteLink[] = [
  { label: "Work", href: "/#work" },
  { label: "Lab", href: "/lab" },
  { label: "AI", href: "/ai" },
  { label: "Contact", href: "/#contact" },
];
