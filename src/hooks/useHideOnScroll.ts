"use client";

import { useEffect, useState } from "react";

/** True while the user scrolls down (past `threshold`); false when scrolling up or near the top. */
export function useHideOnScroll(threshold = 10) {
  return useScrollState(threshold).hidden;
}

/** Scroll direction state plus whether the page has left the top. */
export function useScrollState(threshold = 10) {
  const [state, setState] = useState({ hidden: false, scrolled: false });

  useEffect(() => {
    let lastY = window.scrollY;
    const handleScroll = () => {
      const y = window.scrollY;
      const hidden = y > lastY && y > threshold;
      const scrolled = y > threshold * 10;
      setState((prev) =>
        prev.hidden === hidden && prev.scrolled === scrolled ? prev : { hidden, scrolled }
      );
      lastY = y;
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, [threshold]);

  return state;
}
