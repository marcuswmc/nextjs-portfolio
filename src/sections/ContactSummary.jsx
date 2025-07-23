"use client";

import { useRef } from "react";
import Marquee from "@/components/Marquee";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";

export default function ContactSummary() {
  const containerRef = useRef(null);
  const brands = [
    "/brands/logo01.png", "/brands/logo02.png", "/brands/logo03.png", "/brands/logo04.png",
    "/brands/logo05.png", "/brands/logo06.png", "/brands/logo07.png", "/brands/logo08.png",
    "/brands/logo09.png", "/brands/logo10.png", "/brands/logo11.png", "/brands/logo12.png",
    "/brands/logo13.png", "/brands/logo14.png", "/brands/logo15.png", "/brands/logo16.png",
    "/brands/logo17.png", "/brands/logo18.png"
  ];
  
  useGSAP(() => {
    gsap.to(containerRef.current, {
      scrollTrigger: {
        trigger: containerRef.current,
        start: "center center",
        end: "+=800 center",
      },
    });
  }, []);

  return (
    <section
      ref={containerRef}
      className="flex flex-col items-center justify-center h-[80vh] gap-8 will-change-transform"
    >
      <div className="overflow-hidden font-light text-center contact-text-responsive">
        <p>
          “ Brands
          <span className="font-normal"> I've worked</span>
          <span className="italic text-gold"> with</span> ”
        </p>
      </div>
      <div className="">
        <Marquee
          images={brands}
          className="bg-black"
          reverse={false}
          speed={1}
          imageWidth={180}
          imageHeight={80}
          imageClassName="object-contain"
          gap={80}
        />
      </div>
    </section>
  );
}
