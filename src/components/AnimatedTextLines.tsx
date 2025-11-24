'use client'

import { useGSAP } from "@gsap/react"
import gsap from "gsap"
import { useRef } from "react"
import { ScrollTrigger } from "gsap/all"

gsap.registerPlugin(ScrollTrigger)

type AnimatedTextLinesProps = {
  text: string;
  className?: string;
}

export function AnimatedTextLines({ text, className }: AnimatedTextLinesProps) {
  const containerRef = useRef<HTMLDivElement | null>(null)
  const lineRefs = useRef<(HTMLSpanElement | null)[]>([])
  const lines = text.split("\n").filter((line) => line.trim() !== "")

  useGSAP(() => {
    if(lineRefs.current.length > 0) {
      gsap.from(lineRefs.current.filter(Boolean), {
        y: 100,
        opacity: 0,
        duration: 1,
        stagger: 0.3,
        ease: "back.out",
        scrollTrigger: {
          trigger: containerRef.current
        }
      })
    }
  })

  return (
    <div ref={containerRef} className={className}>
      {lines.map((line, index) => (
        <span 
        key={index}
        ref={(el) => { lineRefs.current[index] = el }}
        className="block leading-relaxed tracking-wide text-pretty">{line}</span>
      ))}
    </div>
  )
}
