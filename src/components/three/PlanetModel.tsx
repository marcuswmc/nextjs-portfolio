"use client";

import type { JSX, Ref } from "react";
import { useGLTF } from "@react-three/drei";
import * as THREE from "three";

export const PLANET_MODEL = "/models/Planet.glb";
export const MOON_SCALE = 0.223;

type PlanetModelProps = JSX.IntrinsicElements["group"] & {
  spheresRef?: Ref<THREE.Group>;
  moonRef?: Ref<THREE.Mesh>;
  ringRef?: Ref<THREE.Mesh>;
};

/** The planet GLB (sphere, moon, ring) with refs to each part for external animation. */
export function PlanetModel({ spheresRef, moonRef, ringRef, ...props }: PlanetModelProps) {
  const { nodes, materials } = useGLTF(PLANET_MODEL);

  return (
    <group {...props} dispose={null}>
      <group ref={spheresRef}>
        <mesh
          castShadow
          receiveShadow
          geometry={(nodes.Sphere as THREE.Mesh).geometry}
          material={materials["Material.002"]}
          rotation={[0, 0, 0.741]}
        />
        <mesh
          ref={moonRef}
          castShadow
          receiveShadow
          geometry={(nodes.Sphere2 as THREE.Mesh).geometry}
          material={materials["Material.001"]}
          position={[0.647, 1.03, -0.724]}
          rotation={[0, 0, 0.741]}
          scale={MOON_SCALE}
        />
      </group>

      <mesh
        ref={ringRef}
        castShadow
        receiveShadow
        geometry={(nodes.Ring as THREE.Mesh).geometry}
        material={materials["Material.001"]}
        rotation={[-0.124, 0.123, -0.778]}
        scale={2}
      />
    </group>
  );
}

useGLTF.preload(PLANET_MODEL);
