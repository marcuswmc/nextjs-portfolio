export type ServiceItem = {
  title: string;
  description?: string;
};

export type Service = {
  title: string;
  /** Which side of the practice the service belongs to. */
  discipline: "Creative" | "AI";
  description: string;
  items: ServiceItem[];
};

export type ProjectFramework = { id: number; name: string };

export type Project = {
  id: number;
  name: string;
  link: string;
  image: string;
  bgImage: string;
  frameworks: ProjectFramework[];
};

export type Social = { name: string; href: string };

export const contact = {
  email: "marcus.relation@gmail.com",
  phone: "+351 912 981 585",
  location: "Porto, Portugal",
};

/** Main stack of a project, used by the Works filter. */
export function projectStack(project: Project) {
  const names = project.frameworks.map((f) => f.name.toLowerCase());
  if (names.includes("next.js")) return "Next.js";
  if (names.includes("react")) return "React";
  if (names.includes("wordpress")) return "WordPress";
  if (names.includes("html")) return "HTML/CSS/JS";
  return "Other";
}

export const servicesData: Service[] = [
  {
    title: "Creative Development",
    discipline: "Creative",
    description:
      "Immersive, high-performance web experiences that make brands feel alive — from WebGL scenes and motion systems to the full-stack foundation that ships them fast, accessible and search-ready.",
    items: [
      {
        title: "3D & WebGL Experiences",
        description: "Three.js, React Three Fiber, real-time visuals",
      },
      {
        title: "Motion & Interaction",
        description: "GSAP, Motion, scroll-driven storytelling",
      },
      {
        title: "UI/UX & Design Systems",
        description: "Figma, component libraries, pixel-perfect UI",
      },
      {
        title: "Frontend Engineering",
        description: "React, Next.js, TypeScript",
      },
      {
        title: "Full Stack & APIs",
        description: "Node.js, REST, databases, e-commerce",
      },
      {
        title: "Performance & SEO",
        description: "Core Web Vitals, SSR, structured data",
      },
    ],
  },
  {
    title: "AI Development",
    discipline: "AI",
    description:
      "AI solutions and automations that do real work — integrating models into products and workflows, building agents and chatbots, and bringing AI into the creative process, tuned to your data.",
    items: [
      {
        title: "AI Solutions & Automation",
        description: "End-to-end workflows that remove busywork",
      },
      {
        title: "AI Integration",
        description: "LLMs and AI APIs inside your products and tools",
      },
      {
        title: "MCP & Agent Tooling",
        description: "Model Context Protocol servers, skills and plugins",
      },
      {
        title: "Chatbots & Conversational AI",
        description: "Assistants grounded in your business knowledge",
      },
      {
        title: "Creative AI",
        description: "Generative image, video and design pipelines",
      },
      {
        title: "Fine-tuning & Training",
        description: "Adapting models to your data and domain",
      },
    ],
  },
];
export const projects: Project[] = [
  {
    id: 6,
    name: "Move Social",
    link: "https://move.social/",
    image: "/assets/projects/move-social.jpg",
    bgImage: "/assets/backgrounds/move-social-bg.jpg",
    frameworks: [
      { id: 1, name: "Next.js" },
      { id: 2, name: "Tailwind CSS" },
      { id: 3, name: "Lenis" },
    ],
  },
  {
    id: 7,
    name: "Obsidian Memory",
    link: "https://obsidian-memory-site.vercel.app/",
    image: "/assets/projects/obsidian-memory.jpg",
    bgImage: "/assets/backgrounds/obsidian-memory-bg.jpg",
    frameworks: [
      { id: 1, name: "HTML" },
      { id: 2, name: "CSS" },
      { id: 3, name: "JavaScript" },
    ],
  },
  {
    id: 8,
    name: "HPLG Framework",
    link: "https://hplg-framework.vercel.app/",
    image: "/assets/projects/hplg-framework.jpg",
    bgImage: "/assets/backgrounds/hplg-framework-bg.jpg",
    frameworks: [
      { id: 1, name: "Next.js" },
      { id: 2, name: "Tailwind CSS" },
    ],
  },
  {
    id: 1,
    name: "Sattis Studio",
    link: "https://www.sattis.me/",
    image: "/assets/projects/sattis-studio-site.jpg",
    bgImage: "/assets/backgrounds/sattis-bg.jpg",
    frameworks: [
      { id: 1, name: "Next.js" },
      { id: 3, name: "Typescript" },
      { id: 4, name: "Node.js" },
      { id: 5, name: "MongoDB" },
    ],
  },
  {
    id: 2,
    name: "C Model 2.0",
    link: "https://www.cmodel.co/",
    image: "/assets/projects/cmodel.jpg",
    bgImage: "/assets/backgrounds/cmodel-bg.jpg",
    frameworks: [
      { id: 1, name: "Next.js" },
      { id: 3, name: "Tailwind CSS" },
      { id: 4, name: "Typescript" },
      { id: 5, name: "MongoDB" },
    ],
  },
  {
    id: 3,
    name: "DeJongh Drones",
    link: "https://djdrones.com.br/",
    image: "/assets/projects/djdrones.jpg",
    bgImage: "/assets/backgrounds/dj-bg.jpg",
    frameworks: [
      { id: 1, name: "React" },
      { id: 2, name: "React Router" },
      { id: 3, name: "Styled-components" },
    ],
  },
  {
    id: 4,
    name: "Oceano Azul Expedition - Gorringe",
    link: "https://expeditions.oceanoazulfoundation.org/",
    image: "/assets/projects/oceanoazul-gorringe.jpg",
    bgImage: "/assets/backgrounds/gorringe-bg.jpg",
    frameworks: [
      { id: 1, name: "Wordpress" },
      { id: 2, name: "PHP" },
      { id: 3, name: "CPT UI" },
      { id: 4, name: "Javascript" },
    ],
  },
  {
    id: 5,
    name: "Oceanario de Lisboa",
    link: "https://oceanario.pt/",
    image: "/assets/projects/oceanario.jpg",
    bgImage: "/assets/backgrounds/oceanario-bg.jpg",
    frameworks: [
      { id: 1, name: "Wordpress" },
      { id: 2, name: "PHP" },
      { id: 3, name: "CPT UI" },
      { id: 4, name: "Javascript" },
    ],
  }
];
export const socials: Social[] = [
  { name: "Instagram", href: "https://www.instagram.com/_mvmarcuss_/" },
  { name: "LinkedIn", href: "https://www.linkedin.com/in/mvinicius-dev/" },
  { name: "GitHub", href: "https://github.com/marcuswmc" },
];

export const brandLogos: string[] = Array.from(
  { length: 18 },
  (_, i) => `/brands/logo${String(i + 1).padStart(2, "0")}.png`
);
