"use client";

import { useRef, type RefObject } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { Environment, Lightformer } from "@react-three/drei";
import * as THREE from "three";
import { MOON_SCALE, PlanetModel } from "@/components/three/PlanetModel";

/** Values written by a scroll timeline and eased toward every frame. */
export type PlanetState = {
  /** Screen-space offset in world units (positive = right / up). */
  x: number;
  y: number;
  scale: number;
  rotY: number;
  ringTilt: number;
  moonScale: number;
};

export const initialPlanetState: PlanetState = {
  x: 0,
  y: 0,
  scale: 0.75,
  rotY: 0,
  ringTilt: 0,
  moonScale: 1,
};

type RigProps = { state: RefObject<PlanetState>; idle: boolean };

function PlanetRig({ state, idle }: RigProps) {
  const root = useRef<THREE.Group>(null);
  const spheres = useRef<THREE.Group>(null);
  const moon = useRef<THREE.Mesh>(null);
  const ring = useRef<THREE.Mesh>(null);
  const spin = useRef(0);

  useFrame(({ pointer }, delta) => {
    const s = state.current;
    if (!s || !root.current || !spheres.current || !moon.current || !ring.current) return;
    const damp = THREE.MathUtils.damp;
    if (idle) spin.current += delta * 0.08;

    // The camera looks down +z from behind, so world +x reads as screen-left
    root.current.position.x = damp(root.current.position.x, -s.x, 4, delta);
    root.current.position.y = damp(root.current.position.y, s.y, 4, delta);
    root.current.scale.setScalar(damp(root.current.scale.x, s.scale, 4, delta));
    root.current.rotation.x = damp(root.current.rotation.x, pointer.y * 0.08, 3, delta);
    root.current.rotation.z = damp(root.current.rotation.z, pointer.x * 0.06, 3, delta);

    spheres.current.rotation.y = damp(
      spheres.current.rotation.y,
      s.rotY + spin.current,
      4,
      delta
    );
    ring.current.rotation.x = damp(ring.current.rotation.x, -0.124 + s.ringTilt, 4, delta);
    moon.current.scale.setScalar(
      damp(moon.current.scale.x, MOON_SCALE * s.moonScale, 4, delta)
    );
  });

  return (
    <group ref={root}>
      <PlanetModel spheresRef={spheres} moonRef={moon} ringRef={ring} />
    </group>
  );
}

type PlanetSceneProps = {
  state: RefObject<PlanetState>;
  idle?: boolean;
  className?: string;
};

/** Canvas with the planet, studio lighting and a rig that follows `state`. */
export function PlanetScene({ state, idle = true, className }: PlanetSceneProps) {
  return (
    <Canvas
      className={className}
      dpr={[1, 1.75]}
      camera={{ position: [0, 0, -10], fov: 17.5, near: 1, far: 20 }}
      gl={{ antialias: true, alpha: true }}
    >
      <ambientLight intensity={0.5} />
      <PlanetRig state={state} idle={idle} />
      <Environment resolution={256}>
        <group rotation={[-Math.PI / 3, 4, 1]}>
          <Lightformer form="circle" intensity={2} position={[0, 5, -9]} scale={10} />
          <Lightformer form="circle" intensity={2} position={[0, 3, 1]} scale={10} />
          <Lightformer form="circle" intensity={2} position={[-5, -1, -1]} scale={10} />
          <Lightformer form="circle" intensity={2} position={[10, 1, 0]} scale={16} />
        </group>
      </Environment>
    </Canvas>
  );
}
