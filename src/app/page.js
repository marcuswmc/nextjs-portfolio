import { Hero } from "@/sections/Hero"
import { Navbar } from "../sections/Navbar"
import ServiceSummary from "@/sections/ServiceSummary"
import Services from "@/sections/Services"
import ReactLenis from "lenis/react"
import About from "@/sections/About"

export default function Home() {
  return (
    <ReactLenis root className="relative w-screen min-h-screen overflow-x-auto">
      <Navbar />
      <Hero />
      <ServiceSummary />
      <Services />
      <About/>
    </ReactLenis>
  )
}