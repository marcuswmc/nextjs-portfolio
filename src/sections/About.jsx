'use client'
import AnimatedHeaderSection from "@/components/AnimatedHeaderSection";
import { AnimatedTextLines } from "@/components/AnimatedTextLines";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { useRef } from "react";

export default function About() {
  const text = `Passionate about clean architecture 
  I build scalable, high-performance solutions 
  from prototype to production`
  const aboutText = `Obsessed with building fast, intuitive apps—from pixel-perfect React UIs to bulletproof serverless backends. Every line of code is a promise: quality that users feel.
  When I’m not shipping:
  ⚡️ Open-sourcing my latest experiment (or hacking on yours)
  🧗 Rock climbing (problem-solving with real stakes)
  🎸 Strumming chords while CI pipelines pass (multitasking at its finest)`
  const imgRef = useRef(null)
  useGSAP(() => {
    gsap.to("#about", {
      scale: 0.95,
      scrollTrigger: {
        trigger: "#about",
        start: "bottom 80%",
        end: "bottom 20%",
        scrub: true,
      },
      ease: "power1.inOut"
    })
    gsap.set(imgRef.current, {
      clipPath: "polygon(0 100%, 100% 100%, 100% 100%, 0% 100%)"
    })
    gsap.to(imgRef.current, {
      clipPath: "polygon(0 0, 100% 0%, 100% 100%, 0% 100%)",
      duration: 2,
      ease: "power4.out",
      scrollTrigger: {
        trigger: imgRef.current
      }
    })
  })




  return (
    <section id="about" className="min-h-screen bg-black rounded-b-4xl">
      <AnimatedHeaderSection 
      subtitle={"Cod with purpose, Built to scale"}
      title={"About"}
      text={text}
      textColor={"text-white"} 
      withScrollTrigger={true}
      />
      <div className="flex flex-col items-center justify-between gap-16 px-10 pb-16 text-lg font-light tracking-wide lg:flex-row md:text-xl lg:text-2xl text-white/60">
        <img ref={imgRef} src="images/man.jpg" alt="Marcus Vinicius" className="w-md rounded-2xl"/>
        <AnimatedTextLines text={aboutText}/>  
      </div>
    </section>
  );
}
