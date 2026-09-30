"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useLenis } from "lenis/react";
import type { ComponentProps, MouseEvent } from "react";
import { usePageTransition } from "@/components/navigation/PageTransition";

type NavLinkProps = Omit<ComponentProps<typeof Link>, "href"> & {
  /** Route ("/lab") or route + section hash ("/#services"). */
  href: string;
};

/**
 * Next Link that smooth-scrolls with Lenis to sections on the current page
 * and plays the curtain transition when it leads to another route.
 */
export function NavLink({ href, onClick, ...rest }: NavLinkProps) {
  const pathname = usePathname();
  const lenis = useLenis();
  const transition = usePageTransition();

  const handleClick = (e: MouseEvent<HTMLAnchorElement>) => {
    onClick?.(e);
    // Let modified clicks (new tab, etc.) behave like normal links
    if (e.defaultPrevented || e.metaKey || e.ctrlKey || e.shiftKey || e.altKey || e.button !== 0) return;
    const [path, hash] = href.split("#");
    const targetPath = path || "/";

    if (targetPath !== pathname) {
      if (transition) {
        e.preventDefault();
        transition.navigate(href);
      }
      return;
    }
    if (!hash) return;

    e.preventDefault();
    const target = document.getElementById(hash);
    if (!target) return;
    if (lenis) lenis.scrollTo(target, { duration: 2 });
    else target.scrollIntoView({ behavior: "smooth" });
  };

  return <Link href={href} onClick={handleClick} {...rest} />;
}
