import { HomeLoader } from "@/components/HomeLoader";
import { Hero } from "@/sections/Hero";
import ServiceSummary from "@/sections/ServiceSummary";
import Services from "@/sections/Services";
import About from "@/sections/About";
import Works from "@/sections/Works";
import Contact from "@/sections/Contact";

export default function Home() {
  return (
    <HomeLoader>
      <Hero />
      <ServiceSummary />
      <Services />
      <About />
      <Works />
      <Contact />
    </HomeLoader>
  );
}
