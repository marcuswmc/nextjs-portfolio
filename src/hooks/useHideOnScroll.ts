"use client";

import { useEffect, useState } from "react";

/** True while the user scrolls down (past `threshold`); false when scrolling up or near the top. */
export function useHideOnScroll(threshold = 10) {
  const [hidden, setHidden] = useState(false);

  useEffect(() => {
    let lastY = window.scrollY;
    const handleScroll = () => {
      const y = window.scrollY;
      setHidden(y > lastY && y > threshold);
      lastY = y;
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, [threshold]);

  return hidden;
}
