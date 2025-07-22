"use client";
import AnimatedHeaderSection from "@/components/AnimatedHeaderSection";
import { AnimatedTextLines } from "@/components/AnimatedTextLines";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { useRef } from "react";

export default function About() {
  const text = `Driven by creativity and clean architecture,
I design and engineer high-impact, scalable applications
from pixel-perfect UIs to robust full-stack solutions`;

  const aboutText = `Passionate about merging design and technology—I bring over a decade of experience crafting intuitive, high-performance apps.
Whether it's shaping fluid animations with GSAP or structuring backend APIs, I deliver polished solutions that feel effortless to use.
When I’m not coding:
🎨 Designing interfaces in Figma or refining visuals in Photoshop
🧠 Studying AI and exploring creative tech
🎶 Playing and singing some music (MPB, samba, and beyond)
🐱 Giving the attention my housemates (the cats) deserve
`;

  const imgRef = useRef(null);
  useGSAP(() => {
    gsap.to("#about", {
      scale: 0.95,
      scrollTrigger: {
        trigger: "#about",
        start: "bottom 80%",
        end: "bottom 20%",
        scrub: true,
      },
      ease: "power1.inOut",
    });
    gsap.set(imgRef.current, {
      clipPath: "polygon(0 100%, 100% 100%, 100% 100%, 0% 100%)",
    });
    gsap.to(imgRef.current, {
      clipPath: "polygon(0 0, 100% 0%, 100% 100%, 0% 100%)",
      duration: 2,
      ease: "power4.out",
      scrollTrigger: {
        trigger: imgRef.current,
      },
    });
  });

  return (
    <section id="about" className="min-h-screen bg-black rounded-b-4xl">
      <AnimatedHeaderSection
        subtitle={"Cod with purpose, Built to scale"}
        title={"About"}
        text={text}
        textColor={"text-white"}
        withScrollTrigger={true}
      />
      <div className="flex flex-col items-center justify-between gap-16 px-8 md:px-10 lg:px-10 pb-16 text-lg font-light tracking-wide lg:flex-row md:text-xl lg:text-2xl text-white/60">
        <img
          ref={imgRef}
          src="images/man.jpg"
          alt="Marcus Vinicius"
          className="w-md rounded-2xl"
        />
        <AnimatedTextLines text={aboutText} />
      </div>
    </section>
  );
}
