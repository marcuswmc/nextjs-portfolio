"use client";

import { useEffect, useRef } from "react";
import { PlanetScene, initialPlanetState, type PlanetState } from "@/components/three/PlanetScene";
import type { DemoProps } from "./types";

export default function PlanetDemo({ values }: DemoProps) {
  const state = useRef<PlanetState>({ ...initialPlanetState });

  useEffect(() => {
    Object.assign(state.current, {
      scale: Number(values.scale),
      moonScale: Number(values.moonScale),
      ringTilt: Number(values.ringTilt),
    });
  }, [values.scale, values.moonScale, values.ringTilt]);

  return (
    <div className="absolute inset-0">
      <PlanetScene state={state} />
    </div>
  );
}
