"use client";

import { useEffect, useState, type ReactNode } from "react";
import { useProgress } from "@react-three/drei";
import { useLenis } from "lenis/react";

/** Holds the home page behind a progress screen until the 3D assets are loaded. */
export function HomeLoader({ children }: { children: ReactNode }) {
  const { progress } = useProgress();
  const [isReady, setIsReady] = useState(false);
  const lenis = useLenis();

  useEffect(() => {
    if (progress === 100) setIsReady(true);
  }, [progress]);

  // Arriving from another page with a section hash (e.g. "/#work")
  useEffect(() => {
    if (!isReady || !lenis) return;
    const hash = window.location.hash.slice(1);
    const target = hash && document.getElementById(hash);
    if (target) lenis.scrollTo(target, { immediate: true });
  }, [isReady, lenis]);

  return (
    <>
      {!isReady && (
        <div className="fixed inset-0 z-[2000] flex flex-col items-center justify-center font-light bg-contrast text-on-contrast">
          <p className="mb-4 text-xl tracking-widest animate-pulse">
            Loading {Math.floor(progress)}%
          </p>
          <div className="relative h-1 overflow-hidden rounded w-60 bg-on-contrast/20">
            <div
              className="absolute top-0 left-0 h-full transition-all duration-300 bg-on-contrast"
              style={{ width: `${progress}%` }}
            />
          </div>
        </div>
      )}
      <div
        className={`${
          isReady ? "opacity-100" : "opacity-0"
        } transition-opacity duration-1000`}
      >
        {children}
      </div>
    </>
  );
}
