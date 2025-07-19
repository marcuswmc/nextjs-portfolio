"use client";

import { useRef } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { AnimatedTextLines } from "@/components/AnimatedTextLines";

export default function AnimatedHeaderSection({
  subtitle,
  title,
  text,
  textColor,
  withScrollTrigger = false,
}) {
  const contextRef = useRef(null);
  const headerRef = useRef(null);

  useGSAP(() => {
    const tl = gsap.timeline({
      scrollTrigger: withScrollTrigger
        ? {
            trigger: contextRef.current,
          }
        : undefined,
    });
    tl.from(contextRef.current, {
      y: "50vh",
      duration: 1,
      ease: "circ.out",
    });
    tl.from(
      headerRef.current,
      {
        opacity: 0,
        y: "200",
        duration: 1,
        ease: "circ.out",
      },
      "<+0.2"
    );
  }, []);
  return (
    <div ref={contextRef}>
      <div style={{ clipPath: "polygon(0 0, 100% 0%, 100% 100%, 0% 100%)" }}>
        <div
          ref={headerRef}
          className="flex flex-col justify-center gap-6 pt-16 "
        >
          <p
            className={`text-[12px] font-light tracking-[0.5rem] uppercase px-10 ${textColor}`}
          >
            {subtitle}
          </p>
          <div className="px-10">
            <h2
              className={`flex flex-col gap-6 ${textColor} uppercase banner-text-responsive sm:gap-16 md:block`}
            >
              {title}
            </h2>
          </div>
        </div>
      </div>
      <div className={`relative px-10 ${textColor}`}>
        <div className="absolute inset-x-0 border-t-2" />
        <div className="py-12 sm:py-16 text-end">
          <AnimatedTextLines
            text={text}
            className={`font-light uppercase value-text-responsive ${textColor}`}
          />
        </div>
      </div>
    </div>
  );
}
