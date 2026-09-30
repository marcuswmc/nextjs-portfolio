"use client";

import { useEffect } from "react";
import { usePathname } from "next/navigation";
import { useLenis } from "lenis/react";

/** After navigating to "/#section" from another page, land on that section. */
export function HashScroll() {
  const pathname = usePathname();
  const lenis = useLenis();

  useEffect(() => {
    if (!lenis) return;
    const hash = window.location.hash.slice(1);
    if (!hash) return;
    // Wait a frame so ScrollTrigger pin spacing and images settle
    const id = window.setTimeout(() => {
      const target = document.getElementById(hash);
      if (target) lenis.scrollTo(target, { immediate: true });
    }, 300);
    return () => window.clearTimeout(id);
  }, [pathname, lenis]);

  return null;
}
