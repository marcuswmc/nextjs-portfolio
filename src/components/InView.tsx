"use client";

import { useEffect, useRef, useState, type ReactNode } from "react";

type InViewProps = {
  children: ReactNode;
  /** Rendered until the element first approaches the viewport. */
  fallback?: ReactNode;
  rootMargin?: string;
  className?: string;
};

/** Mounts its children only once the wrapper nears the viewport (keeps heavy previews lazy). */
export function InView({ children, fallback = null, rootMargin = "200px 0px", className }: InViewProps) {
  const ref = useRef<HTMLDivElement | null>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true);
          observer.disconnect();
        }
      },
      { rootMargin }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, [rootMargin]);

  return (
    <div ref={ref} className={className}>
      {visible ? children : fallback}
    </div>
  );
}
