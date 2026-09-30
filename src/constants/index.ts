export type ServiceItem = {
  title: string;
  description?: string;
};

export type Service = {
  title: string;
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
  return "Other";
}

export const servicesData: Service[] = [
  {
    title: "Creative Development",
    description:
      "Immersive, interactive interfaces that make brands feel alive — WebGL scenes, scroll-driven storytelling and motion systems that turn visits into experiences.",
    items: [
      {
        title: "3D Web Experiences",
        description: "Three.js, React Three Fiber, WebGL",
      },
      {
        title: "Motion & Interaction",
        description: "GSAP, Motion, scroll-based storytelling",
      },
      {
        title: "UI/UX & Design Systems",
        description: "Figma, reusable components, pixel-perfect UI",
      },
    ],
  },
  {
    title: "AI Development",
    description:
      "AI features that do real work — assistants grounded in your data, prompts and tools that speed up creative teams, and automations that remove busywork.",
    items: [
      {
        title: "AI Assistants & RAG",
        description: "AI SDK, Gemini, OpenAI, tool calling",
      },
      {
        title: "Prompts, Skills & Plugins",
        description: "Claude, ChatGPT, custom AI tooling",
      },
      {
        title: "Workflow Automation",
        description: "API integrations, chatbots, assistants",
      },
    ],
  },
  {
    title: "Full Stack Engineering",
    description:
      "A fast, secure and future-proof foundation — custom web apps with clean architecture, solid APIs and seamless integrations, on web and mobile.",
    items: [
      {
        title: "Frontend Excellence",
        description: "React, Next.js, TypeScript",
      },
      {
        title: "Backend & APIs",
        description: "Node.js, REST, auth, databases",
      },
      {
        title: "Web & Mobile Apps",
        description: "E-commerce, booking systems, React Native, Flutter",
      },
    ],
  },
  {
    title: "Performance & SEO",
    description:
      "Speed is a feature and visibility is power. Fast load times, healthy Core Web Vitals and search-ready markup are built in, not bolted on.",
    items: [
      {
        title: "Performance Optimization",
        description: "Lazy loading, code splitting, asset compression",
      },
      {
        title: "Core Web Vitals",
        description: "LCP, INP, CLS monitoring & improvements",
      },
      {
        title: "SEO Engineering",
        description: "SSR, structured data, semantic HTML, metadata",
      },
    ],
  },
];
export const projects: Project[] = [
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
