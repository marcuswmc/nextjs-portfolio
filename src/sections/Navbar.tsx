"use client";

import { useRef, useState } from "react";
import { socials } from "@/constants";
import { gsap, useGSAP } from "@/lib/gsap";
import { NavLink } from "@/components/navigation/NavLink";
import { menuLinks } from "@/components/navigation/links";
import { useHideOnScroll } from "@/hooks/useHideOnScroll";

export function Navbar() {
  const navRef = useRef<HTMLDivElement | null>(null);
  const linksRef = useRef<(HTMLDivElement | null)[]>([]);
  const contactRef = useRef<HTMLDivElement | null>(null);
  const topLineRef = useRef<HTMLSpanElement | null>(null);
  const bottomLineRef = useRef<HTMLSpanElement | null>(null);
  const tl = useRef<gsap.core.Timeline | null>(null);
  const iconsTl = useRef<gsap.core.Timeline | null>(null);
  const [isOpen, setIsOpen] = useState(false);
  const hideBurger = useHideOnScroll();

  useGSAP(() => {

    if(navRef.current) {
      navRef.current.classList.remove("navbar-initial")
    }

    gsap.set(navRef.current, {
      xPercent: 100,
    });
    gsap.set([linksRef.current, contactRef.current], {
      autoAlpha: 0,
      x: -20,
    });

    tl.current = gsap
      .timeline({ paused: true })
      .to(navRef.current, {
        xPercent: 0,
        duration: 1,
        ease: "power3.out",
      })
      .to(
        linksRef.current,
        {
          autoAlpha: 1,
          x: 0,
          stagger: 0.1,
          duration: 0.5,
          ease: "power2.out",
        },
        "<"
      )
      .to(
        contactRef.current,
        {
          autoAlpha: 1,
          x: 0,
          duration: 0.5,
          ease: "power2.out",
        },
        "<+0.2"
      );

    iconsTl.current = gsap
      .timeline({ paused: true })
      .to(topLineRef.current, {
        rotate: 45,
        y: 3.3,
        duration: 0.3,
        ease: "power2.inOut",
      })
      .to(
        bottomLineRef.current,
        {
          rotate: -45,
          y: -3.3,
          duration: 0.3,
          ease: "power2.inOut",
        },
        "<"
      );
  }, []);

  const toggleMenu = () => {
    if (isOpen) {
      tl.current?.reverse();
      iconsTl.current?.reverse();
    } else {
      tl.current?.play();
      iconsTl.current?.play();
    }
    setIsOpen(!isOpen);
  };

  return (
    <>
      <nav
        ref={navRef}
        className="navbar-initial md:hidden fixed z-50 flex flex-col justify-between w-full h-full px-8 md:px-10 lg:px-10 uppercase bg-contrast text-on-contrast/80 py-28 gap-y-10 md:w-1/2 md:left-1/2"
      >
        <div className="flex flex-col gap-y-2 text-5xl md:text-6xl lg:text-[clamp(3.5rem,9vh,6rem)] leading-none">
          {menuLinks.map((link, index) => (
            <div key={link.href} ref={(el) => { linksRef.current[index] = el; }}>
              <NavLink
                href={link.href}
                className="transition-all duration-300 hover:text-on-contrast"
                onClick={() => {
                  if (isOpen) {
                    tl.current?.reverse();
                    iconsTl.current?.reverse();
                    setIsOpen(false);
                  }
                }}
              >
                {link.label}
              </NavLink>
            </div>
          ))}
        </div>
        <div
          ref={contactRef}
          className="flex flex-col flex-wrap justify-between gap-8 md:flex-row"
        >
          <div className="font-light">
            <p className="tracking-wider text-on-contrast/65">Email</p>
            <p className="text-xl tracking-widest lowercase text-pretty">
              marcus.relation@gmail.com
            </p>
          </div>
          <div className="font-light">
            <p className="tracking-wider text-on-contrast/65">Social Media</p>
            <div className="flex flex-col flex-wrap md:flex-row gap-x-2">
              {socials.map((social, index) => (
                <a
                  key={index}
                  href={social.href}
                  className="text-sm leading-loose tracking-widest uppercase hover:text-on-contrast transition-colors duration-300"
                >
                  {"{ "}
                  {social.name}
                  {" }"}
                </a>
              ))}
            </div>
          </div>
        </div>
      </nav>
      <button
        type="button"
        aria-label={isOpen ? "Close menu" : "Open menu"}
        aria-expanded={isOpen}
        className="md:hidden fixed z-50 flex flex-col items-center justify-center gap-1 transition-all duration-300 bg-ink rounded-full cursor-pointer w-14 h-14 top-5 right-6"
        onClick={toggleMenu}
        style={
          hideBurger && !isOpen
            ? { clipPath: "circle(0% at 50% 50%)" }
            : { clipPath: "circle(50% at 50% 50%)" }
        }
      >
        <span
          ref={topLineRef}
          className="block w-8 h-0.5 bg-canvas rounded-full origin-center"
        ></span>
        <span
          ref={bottomLineRef}
          className="block w-8 h-0.5 bg-canvas rounded-full origin-center"
        ></span>
      </button>
    </>
  );
}
