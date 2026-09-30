"use client";

import { LocalTime } from "@/components/LocalTime";
import { ScrambleText } from "@/components/motion/ScrambleText";
import { NavLink } from "@/components/navigation/NavLink";
import { headerLinks } from "@/components/navigation/links";
import { useHideOnScroll } from "@/hooks/useHideOnScroll";

/**
 * Editorial meta row fixed at the top of every page. Hides while scrolling down.
 * `mix-blend-difference` keeps it legible over light and dark sections in both themes.
 */
export function SiteHeader() {
  const hidden = useHideOnScroll();

  return (
    <header
      className={`fixed inset-x-0 top-0 z-40 grid grid-cols-2 gap-6 px-8 pt-8 pr-28 text-sm leading-tight text-white mix-blend-difference transition-transform duration-500 ease-[cubic-bezier(0.65,0,0.35,1)] md:grid-cols-4 md:px-10 md:pr-10 md:pt-8 ${
        hidden ? "-translate-y-[150%]" : "translate-y-0"
      }`}
    >
      <NavLink href="/#home" className="self-start justify-self-start">
        <ScrambleText text="Marcus Vinicius" hoverTarget="a" />
      </NavLink>

      <p className="text-white/60">
        Creative Developer
        <br />& AI Developer
      </p>

      <p className="hidden md:block text-white/60">
        Based in Porto, Portugal
        <br />
        <LocalTime /> Lisbon time
      </p>

      <nav aria-label="Main" className="hidden md:block justify-self-end">
        <ul className="flex flex-wrap gap-x-1">
          {headerLinks.map((link, index) => (
            <li key={link.href}>
              <NavLink href={link.href} className="link-underline">
                <ScrambleText text={link.label} hoverTarget="a" />
              </NavLink>
              {index < headerLinks.length - 1 && <span aria-hidden="true">,</span>}
            </li>
          ))}
        </ul>
      </nav>
    </header>
  );
}
