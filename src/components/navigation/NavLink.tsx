"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useLenis } from "lenis/react";
import type { ComponentProps, MouseEvent } from "react";

type NavLinkProps = Omit<ComponentProps<typeof Link>, "href"> & {
  /** Route ("/lab") or route + section hash ("/#work"). */
  href: string;
};

/** Next Link that smooth-scrolls with Lenis when the target section is on the current page. */
export function NavLink({ href, onClick, ...rest }: NavLinkProps) {
  const pathname = usePathname();
  const lenis = useLenis();

  const handleClick = (e: MouseEvent<HTMLAnchorElement>) => {
    onClick?.(e);
    const [path, hash] = href.split("#");
    if (!hash || (path || "/") !== pathname) return;

    e.preventDefault();
    const target = document.getElementById(hash);
    if (!target) return;
    if (lenis) lenis.scrollTo(target, { duration: 2 });
    else target.scrollIntoView({ behavior: "smooth" });
  };

  return <Link href={href} onClick={handleClick} {...rest} />;
}
