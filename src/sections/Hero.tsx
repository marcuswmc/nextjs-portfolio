"use client";

import AnimatedHeaderSection from "@/components/AnimatedHeaderSection";

import { Planet } from "@/components/Planet";

import { Environment, Float, Lightformer } from "@react-three/drei";
import { Canvas } from "@react-three/fiber";
import { useEffect, useState } from "react";


import { useMediaQuery } from "react-responsive";

export function Hero() {
  const isMobile = useMediaQuery({maxWidth: 853})
  const [handleOnMobile, setHandleOnMobile] = useState(false)
  useEffect(() => {
    setHandleOnMobile(isMobile)
  },[isMobile])

  const text = `I help growing brands and startups gain an 
  unfair advantage through premium 
  results driven webs/apps`
 

  return (
    <section id="home" className="flex flex-col justify-end min-h-screen">
      <AnimatedHeaderSection
      subtitle={"404 No bugs Found"}
      title={"Marcus v."}
      text={text}
      textColor={"text-black"}
      />
      <figure
        className="absolute inset-0 -z-50"
        style={{ width: "100vw", height: "100vh" }}
      >
        <Canvas
          shadows
          camera={{ position: [0, 0, -10], fov: 17.5, near: 1, far: 20 }}
        >
          <ambientLight intensity={0.5} />
          <Float speed={0.5}>
            <Planet scale={handleOnMobile ? 0.6 : 1}/>
          </Float>
          <Environment resolution={256}>
            <group rotation={[-Math.PI / 3, 4, 1]}>
              <Lightformer
                form={"circle"}
                intensity={2}
                position={[0, 5, -9]}
                scale={10}
              />
              <Lightformer
                form={"circle"}
                intensity={2}
                position={[0, 3, 1]}
                scale={10}
              />
              <Lightformer
                form={"circle"}
                intensity={2}
                position={[-5, -1, -1]}
                scale={10}
              />
              <Lightformer
                form={"circle"}
                intensity={2}
                position={[10, 1, 0]}
                scale={16}
              />
            </group>
          </Environment>
        </Canvas>
      </figure>
    </section>
  );
}
