import { socials } from "@/constants";
import { siteUrl } from "@/lib/site";
import { Hero } from "@/sections/Hero";
import Disciplines from "@/sections/Disciplines";
import Services from "@/sections/Services";
import LabTeaser from "@/sections/LabTeaser";
import AiTeaser from "@/sections/AiTeaser";
import About from "@/sections/About";
import Contact from "@/sections/Contact";

const personJsonLd = {
  "@context": "https://schema.org",
  "@type": "Person",
  name: "Marcus Vinicius",
  jobTitle: "Creative Developer & AI Developer",
  url: siteUrl,
  address: { "@type": "PostalAddress", addressLocality: "Porto", addressCountry: "PT" },
  sameAs: socials.map((social) => social.href),
};

export default function Home() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(personJsonLd) }}
      />
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
