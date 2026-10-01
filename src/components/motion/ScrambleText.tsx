"use client";

import { useCallback, useEffect, useRef, useState, createElement } from "react";
import { useReducedMotion } from "@/hooks/useReducedMotion";
import { cn } from "@/lib/utils";

const DEFAULT_CHARS = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789#%&*+-/<>";

type TextTag = "p" | "span" | "div" | "h1" | "h2" | "h3" | "h4" | "li";

type ScrambleTextProps = {
  text: string;
  as?: TextTag;
  className?: string;
  /** What starts the effect. "hover" listens on the closest `hoverTarget` or the element itself. */
  trigger?: "hover" | "mount" | "inView";
  /** Selector of an ancestor whose hover triggers the effect (e.g. "a" or ".group"). */
  hoverTarget?: string;
  duration?: number;
  chars?: string;
};

/** Reveals text left-to-right through random glyphs. */
export function ScrambleText({
  text,
  as: Tag = "span",
  className,
  trigger = "hover",
  hoverTarget,
  duration = 600,
  chars = DEFAULT_CHARS,
}: ScrambleTextProps) {
  const ref = useRef<HTMLElement | null>(null);
  const frame = useRef<number | null>(null);
  const [display, setDisplay] = useState(text);
  const reduced = useReducedMotion();

  const run = useCallback(() => {
    if (reduced) return;
    if (frame.current) cancelAnimationFrame(frame.current);
    const start = performance.now();

    const tick = (now: number) => {
      const progress = Math.min((now - start) / duration, 1);
      const revealed = Math.floor(progress * text.length);
      let next = "";
      for (let i = 0; i < text.length; i++) {
        const char = text[i];
        next +=
          i < revealed || char === " "
            ? char
            : chars[Math.floor(Math.random() * chars.length)];
      }
      setDisplay(next);
      if (progress < 1) frame.current = requestAnimationFrame(tick);
    };
    frame.current = requestAnimationFrame(tick);
  }, [text, duration, chars, reduced]);

  useEffect(() => {
    setDisplay(text);
  }, [text]);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    if (trigger === "mount") {
      run();
    } else if (trigger === "inView") {
      const observer = new IntersectionObserver(
        ([entry]) => {
          if (entry.isIntersecting) {
            run();
            observer.disconnect();
          }
        },
        { threshold: 0.6 }
      );
      observer.observe(el);
      return () => observer.disconnect();
    } else {
      const target = (hoverTarget && el.closest(hoverTarget)) || el;
      target.addEventListener("pointerenter", run);
      return () => target.removeEventListener("pointerenter", run);
    }
  }, [trigger, hoverTarget, run]);

  useEffect(() => () => {
    if (frame.current) cancelAnimationFrame(frame.current);
  }, []);

  return createElement(
    Tag,
    { ref, className: cn("relative inline-block", className) },
    <span className="sr-only">{text}</span>,
    <span aria-hidden="true">{display}</span>
  );
}
