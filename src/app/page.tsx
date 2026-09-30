import { Hero } from "@/sections/Hero";
import Disciplines from "@/sections/Disciplines";
import Services from "@/sections/Services";
import LabTeaser from "@/sections/LabTeaser";
import AiTeaser from "@/sections/AiTeaser";
import About from "@/sections/About";
import Contact from "@/sections/Contact";

export default function Home() {
  return (
    <>
      <Hero />
      <Disciplines />
      <Services />
      <LabTeaser />
      <AiTeaser />
      <About />
      <Contact />
    </>
  );
}
