"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useLenis } from "lenis/react";
import type { ComponentProps, MouseEvent } from "react";

type NavLinkProps = Omit<ComponentProps<typeof Link>, "href"> & {
  /** Route ("/lab") or route + section hash ("/#services"). */
  href: string;
};

/** Next Link that smooth-scrolls with Lenis when the target (section or top) is on the current page. */
export function NavLink({ href, onClick, ...rest }: NavLinkProps) {
  const pathname = usePathname();
  const lenis = useLenis();

  const handleClick = (e: MouseEvent<HTMLAnchorElement>) => {
    onClick?.(e);
    const [path, hash] = href.split("#");
    if ((path || "/") !== pathname) return;

    // Link to the page you're already on: glide back to the top instead of a no-op
    if (!hash) {
      e.preventDefault();
      if (lenis) lenis.scrollTo(0, { duration: 1.5 });
      else window.scrollTo({ top: 0, behavior: "smooth" });
      return;
    }

    e.preventDefault();
    const target = document.getElementById(hash);
    if (!target) return;
    if (lenis) lenis.scrollTo(target, { duration: 2 });
    else target.scrollIntoView({ behavior: "smooth" });
  };

  return <Link href={href} onClick={handleClick} {...rest} />;
}
