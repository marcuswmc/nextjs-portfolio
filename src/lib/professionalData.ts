export interface ProfessionalInfo {
  id: string;
  category: string;
  content: string;
  keywords: string[];
}

export const professionalData: ProfessionalInfo[] = [
  {
    id: "bio",
    category: "Biography and Introduction",
    content: `I am Marcus Vinicius, brazilian, 30 years old, a Full Stack Developer with a focus on frontend, bringing over a decade of experience in modern web development.
    
I specialize in creating scalable and performant applications with clean architecture, using technologies like React, Next.js, TypeScript, and Node.js. I am passionate about merging design and technology (UI/UX and Motion Design) to solve complex problems and build exceptional user experiences.

Based in Porto, Portugal (working in Lisbon), I collaborate on remote and on-site projects, delivering high-quality solutions, from pixel-perfect UI/UX to robust full-stack solutions.

---

**Professional Chronology:**

My professional journey began in São Paulo, Brazil. At 16, I started as a printer at **RM Comunicações Visuais**, operating offset machines for large-format printing (packaging, billboards, facades, stickers). By 17, I transitioned to Graphic Design within the same company (now defunct).

Following this, I worked as a Packaging and Manuals Designer at **Kitec Equipamentos Automotivos** (an electronics company)[https://www.kitec.ind.br/], where I was responsible for the design of packaging for products like autotransformers, line filters, testers, and battery chargers.

At 18, during my first semester of Advertising and Propaganda college, I began an internship in web development at **A Essencis Soluções Ambientais** (part of Grupo Solví, a leader in the Brazilian environmental sector). Here, I focused on redesigning and developing new websites for the group's companies. After six months, I was promoted to Communication Analyst, responsible for the maintenance and design of five websites for the **SSI** (Solvi Soluções Industriais) sub-group.[https://www.solvi.com/]

After several years and various projects focusing on web experience solutions, my last role in Brazil was as a UX/UI Designer at the startup **ByBnd** (By business and Dreams), specializing in mobile application development with Flutter.[https://bybnd.com.br/]

Upon moving to Porto, Portugal, I worked as a Full Stack Web Developer at **Anca Design Studio** [https://ancadesignstudio.com/], handling everything from interface design to deployment and maintenance for websites and e-commerce platforms (e.g., [samarraspeixoto.pt](https://samarraspeixoto.pt/)). I also contributed to projects for McDonald's (donation campaigns) and developed the website for the Portuguese singer Claudia Pascoal ([claudiapascoal.com](https://claudiapascoal.com/)).

**Current Role:**

**Creative Developer at Innovagency** (Period: 2023 - Present | Location: Full Remote from Porto, Portugal)
- Collaboration with designers and marketing teams to create engaging web experiences.
- Design and development of promotional campaigns (Google Ads).
- Analysis and optimization of web performance, accessibility, and SEO.
- Design and development of interactive UI components.
- Development of e-commerce solutions and integrations.
- Design, development, and web maintenance for brand pages.
- Implementation of motion design and animations to enhance user experience.
- Design and development of reusable components and design systems.
- Design and development of email marketing templates.
- Creation of landing pages and announcement pages for promotional campaigns and event registration.
- Development of full-stack projects within the React/Next.js ecosystem and CMS (Shopify, WordPress, Sanity).
- Key Clients: Purina Portugal, Purina Felix, El Corte Inglés, Cupra, Seat, KiK, Easyfarma, Synlab Analises Clinicas, Aldi, Oceanario de Lisboa.
    `,
    keywords: [
      "about",
      "who",
      "biography",
      "introduction",
      "developer",
      "experience",
      "decade",
      "work",
      "professional",
      "i am",
      "marcus vinicius",
      "full stack",
      "frontend",
      "portugal",
      "porto",
      "lisbon",
      "remote",
      "onsite",
      "summary",
      "graphic design",
      "packaging",
      "web development",
      "analyst",
      "UX/UI",
      "creative developer",
      "innovagency",
      "anca design studio",
      "essencis",
      "kitec",
      "bybnd"
    ],
  },
  {
    id: "skills-frontend",
    category: "Skills - Front-end",
    content: `Front-end:
- React.js & Next.js
- TypeScript & JavaScript (ES6+)
- Tailwind CSS, SASS & Styled-components
- Responsive Design & Mobile First
- State Management (Redux, Context API, Zustand)
- Animations (Framer Motion, Motion, GSAP, CSS Animations)
- UI Libraries (ShadcnUI, Material Design UI, AI Elements, AI SDK Vercel)
- Testing (Jest, Cypress, react-testing-library)
- Design Tools (Figma, Adobe XD, Photoshop)
- Accessibility (WCAG Standards)
- Performance Optimization & SEO`,
    keywords: [
      "frontend",
      "front-end",
      "react",
      "nextjs",
      "next.js",
      "typescript",
      "javascript",
      "tailwind",
      "css",
      "html",
      "ui",
      "interface",
      "design",
      "figma",
      "motion",
      "animation",
      "testing",
      "jest",
      "cypress",
      "seo",
    ],
  },

  {
    id: "skills-backend",
    category: "Skills - Back-end",
    content: `Back-end:
- Node.js & Express.js
- Next.js API Routes
- REST APIs & WebSockets
- Payments (Stripe, PayPal)
- Authentication & Authorization (JWT, OAuth)
- Server-side Rendering (SSR) & Static Site Generation (SSG)
- Performance Optimization
- Integration with external APIs`,
    keywords: [
      "backend",
      "back-end",
      "nodejs",
      "node",
      "express",
      "api",
      "rest",
      "server",
      "payments",
      "stripe",
      "websockets",
      "authentication",
    ],
  },

  {
    id: "skills-database",
    category: "Skills - Database",
    content: `Database:
- MongoDB & Mongoose
- SQL (PostgreSQL, MySQL)
- Redis (cache)
- Prisma ORM
- Data Modeling
- Query Optimization`,
    keywords: [
      "database",
      "sql",
      "postgresql",
      "mongodb",
      "prisma",
      "redis",
      "data",
      "db",
    ],
  },

  {
    id: "skills-devops",
    category: "Skills - DevOps & Cloud",
    content: `DevOps & Cloud:
- Vercel & Netlify (deploy)
- AWS Basics (S3, Lambda, EC2)
- CI/CD Pipelines (GitHub Actions, GitLab CI)
- Git & GitHub
- CMS (Shopify, WordPress, Sanity CMS, Payload CMS)`,
    keywords: [
      "devops",
      "cloud",
      "vercel",
      "deploy",
      "git",
      "github",
      "cms",
      "shopify",
      "wordpress",
      "performance",
      "seo",
      "payload",
      "sanity",
      "aws",
    ],
  },

  {
    id: "skills-ai",
    category: "Skills - AI and Machine Learning",
    content: `Artificial Intelligence:
- AI Automation (Chatbots and Virtual Assistants)
- Prompt Engineering
- Natural Language Processing (NLP)
- Machine Learning Basics
- Integration with AI APIs (OpenAI, Gemini)`,
    keywords: [
      "ia",
      "ai",
      "artificial intelligence",
      "chatbot",
      "openai",
      "gpt",
      "gemini",
      "automation",
    ],
  },

  {
    id: "project-1",
    category: "Project - Sattis Studio",
    content: `Sattis Studio: Full-stack Web Platform
Description: Full-stack development of a robust web platform to management appointments + backoffice to admin bookings, services and professionals.
Technologies: Next.js, Typescript, Node.js, MongoDB, Zod, Framer Motion.

Responsibilities:
- Full-stack architecture and development
- UI/UX design and implementation
- Performance optimization.
- mobile-first responsive design
- Integration with third-party APIs (Calendly, payment gateways, google schedule).


Results: [+200% increase in conversions (online bookings)]
Link: https://sattis.me
GitHub: https://github.com/marcuswmc/sattis-nextjs-website`,
    keywords: [
      "project",
      "portfolio",
      "sattis",
      "platform",
      "nextjs",
      "website",
      "mongodb",
      "fullstack",
      "full-stack",
      "appointments",
    ],
  },

  {
    id: "project-2",
    category: "Project - C Model 2.0",
    content: `C Model 2.0: High-Impact Landing Page
Description: Creation of a high-performance website/landing page, focused on conversion and immersive experience (Motion Design).
Technologies: Next.js, Tailwind CSS, Typescript, MongoDB, Zod, Framer Motion.

Responsibilities:
- Front-end development focusing on Motion Design (Framer Motion)
- Integration with form APIs
- Ensuring Core Web Vitals and SEO Engineering.
- Mobile-first responsive design.

Results: [+35% increase in downloads and inquiries, improved SEO rankings, enhanced user engagement through animations and faster load times.]
Link: https://www.cmodel.co/
GitHub: https://github.com/marcuswmc/modelo-c`,
    keywords: [
      "project",
      "portfolio",
      "landing page",
      "tailwind",
      "conversion",
      "seo",
      "performance",
      "cmodel",
      "modeloc",
    ],
  },

  {
    id: "project-3",
    category: "Project - DeJongh Drones",
    content: `DeJongh Drones: Website Development
Description: Development of a modern website for a drone services company.
Technologies: React, Styled-components, React Router.
Description: Development of a dynamic web application.
Technologies: React, React Router, Styled-components.

Responsibilities:
- Front-end development and dynamic routing (React Router)
- Collaboration with the design team
- Implementation of testing (Jest/Cypress).

Results: [+60% increase in client inquiries and improved online presence, enhanced user experience with a modern design.]
Link: https://djdrones.com.br/`,
    keywords: [
      "project",
      "portfolio",
      "web app",
      "react",
      "styled-components",
      "application",
      "drone",
      "dejongh",
      "djdrones",
      "website",
      "development",
    ],
  },
  {
    id: "project-4",
    category: "Project - PixelTest Email Testing App",
    content: `PixelTest: Web Application Development
Description: Development of a modern web application for Preview and test your HTML emails across all devices and clients. Streamline your quality assurance workflow with pixel-perfect rendering and comprehensive compatibility testing.
PixelTest is a simple tool for composing, previewing, and sending HTML emails. It provides a live HTML editor, a preview mode, recipient management with validation, and visual feedback via toasts..
Technologies: React, Nextjs, Shadcn ui, Next API, Typescript, Zod, Framer Motion, Sonner (toasts), react-ace (editor), Nodemailer.

Responsibilities:
- Front-end development and dynamic routing (App Router)
- Integration with email sending services (Nodemailer)
- Implementation of testing (Jest/Cypress).
- UI/UX design focusing on usability and performance.
- Mobile-first responsive design.
- Ensuring Core Web Vitals and SEO Engineering.

Results: [+500 active users, improved email testing efficiency, enhanced user engagement through intuitive design and faster load times.]
Link: https://pixeltest.me/
GitHub: https://github.com/marcuswmc/pixeltest-nextjs`,
    keywords: [
      "project",
      "portfolio",
      "web app",
      "react",
      "nextjs",
      "email",
      "html",
      "pixeltest",
      "testing",
      "development",
    ],
  },

  {
    id: "experience-current",
    category: "Experience - Innovagency",
    content: `Creative Developer - Frontend @ Innovagency
Period: 2023 - Present
Location: Full Remote from Porto, Portugal
website: https://innovagency.com/

Responsibilities:
- Collaboration with designers and marketing teams to create engaging web experiences.
- Design and development of promotional campaigns (Google Ads).
- Analysis and optimization of web performance, accessibility and SEO.
- Design and development of interactive UI components.
- Development of e-commerce solutions and integrations.
- Design, development, and web maintenance for brand pages.
- Implementation of motion design and animations to enhance user experience.
- Design and development of reusable components and design systems.
- Design and development of email marketing templates.
- Creation of landing pages and announcement pages for promotional campaigns and event registration.
- Development of full-stack projects within the React/Next.js ecosystem and CMS (Shopify, WordPress, Sanity).

Clients: Purina Portugal, Purina Felix, El Corte Inglés, Cupra, Seat, KiK, Easyfarma, Synlab Analises Clinicas, Aldi, Oceanario de Lisboa.

Stack: Next.js, ReactJS, TypeScript, Node.js, Prisma, MongoDB, Stripe, TailwindCSS, Framer Motion, Shopify, WordPress, Sanity CMS.
Design Tools: Figma, Adobe XD, Photoshop, Illustrator, After Effects, Premiere Pro, AI Tools (Midjourney, DALL·E, RunwayML, Nano Banana, Replit, v0, Envato).`,
    keywords: [
      "experience",
      "work",
      "company",
      "role",
      "current",
      "innovagency",
      "professional",
      "lisbon",
      "creative developer",
      "frontend",
      "porto",
      "remote",
      "full stack",
      "Clients",
      "purina",
      "el corte ingles",
      "cupra",
      "kik",
      "easyfarma",
      "synlab",
      "aldi",
      "oceanario",
      "design",
      "marketing",
      "ecommerce",
    ],
  },

  {
    id: "experience-previous",
    category: "Experience - Anca Design Studio",
    content: `Full Stack Developer @ Anca Design Studio
Period: 2021 - 2023
Location: Penafiel, Portugal
website: https://ancadesignstudio.com/

Responsibilities:
- Full-stack development and design of corporate websites, ecommerce platforms, blogs, and web applications.
- Implementation of responsive design and mobile-first strategies.
- Performance optimization and SEO best practices.
- Integration with third-party APIs and services.
- Development of custom themes and plugins for WordPress and Shopify.
- Maintenance and updates of existing web projects.
- Web development consulting and technical support.
- Design of user interfaces and user experiences.
- Design and development of interactive UI components.
- Work within the React, Shopify, and WordPress ecosystems.
- Client communication and project management.
- Client training on CMS usage and best practices.
- Direct collaboration with the design team for pixel-perfect implementation.

Clients: Mc Donalds, Cantora portuguesa Claudia Pascoal, Osteo Performance 360, BeOcean, Hidroplanalto, 360 Store, Munchie BK restaurante, VBL Construções, Playlife Fitness Center, Ella Montcordova, ElectroDc, Samarras Peixoto, Bravery Globe, Blatt Concept.

Stack: ReactJS, Next.js, TypeScript, Node.js, MongoDB, mySQL, myPHPadmin, PHP, Shopify, WordPress, TailwindCSS, Elementor.
Design Tools: Figma, Adobe XD, Photoshop, Illustrator.`,
    keywords: [
      "experience",
      "work",
      "company",
      "previous",
      "anca design studio",
      "full stack",
      "penafiel",
      "react",
      "shopify",
      "wordpress",
      "clients",
      "mcdonalds",
      "claudia pascoal",
      "osteoperformance360",
      "beocean",
      "hidroplanalto",
      "360store",
      "munchiebk",
      "vbl construcoes",
      "playlife",
      "ellamontcordova",
      "electrodc",
      "samarraspeixoto",
      "braveryglobe",
      "blattconcept",
      "design",
      "ecommerce",
    ],
  },

  {
    id: "education",
    category: "Academic Background",
    content: `Bachelor's Degree in Systems Analysis and Development (Ongoing)
University: Cruzeiro do Sul University (Brazil)
Period: [Current] - Expected Completion: 2027
Location: Remote / São Paulo, Brazil

Other Training:
- Full Stack Web Development (EDIT School - Porto, Portugal)
- Bachelor's Degree in Advertising and Social Communication (FAPCOM - São Paulo, Brazil)
- Front-end Development (Rocketseat, Brazil)

Focus Areas: Software Development, Algorithms, Database, UI/UX Design.`,
    keywords: [
      "training",
      "education",
      "university",
      "course",
      "degree",
      "certification",
      "study",
      "academic",
      "fiap",
      "edit school",
      "cruzeiro do sul",
      "advertising",
      "communication",
      "development",
      "full stack",
      "frontend",
      "portugal",
      "brazil",
      "saopaulo",
    ],
  },

  {
    id: "languages",
    category: "Languages",
    content: `Languages:
- Portuguese: Native (from Brazil)
- English: Advanced (C1)
- Spanish: Intermediate (B1)`,
    keywords: [
      "languages",
      "language",
      "portuguese",
      "english",
      "spanish",
      "brazilian",
      "c1",
      "b1",
    ],
  },

  {
    id: "CurriculumVitae",
    category: "Curriculum Vitae",
    content: `Curriculum Vitae (CV) - Marcus Vinicius

Download my CV in PDF format for a comprehensive overview of my professional experience, skills, and academic background.

[Download CV PDF](https://marcusdev.me/resume/marcus-vinicius-cv-en.pdf)`,
    keywords: [
      "cv",
      "curriculum",
      "curriculum vitae",
      "resume",
      "pdf",
      "download",
      "document",
      "file",
      "professional",
      "experience",
      "skills",
      "background",
    ],
  },

  {
    id: "contact",
    category: "Contact Information",
    content: `Contact Methods:

📧 Email: marcus.relation@gmail.com
💼 LinkedIn: https://www.linkedin.com/in/mvinicius-dev/
🐙 GitHub: https://github.com/mvinicius-dev
🌐 Portfolio: https://marcusdev.me
📱 Phone: +351 912 981 585 (available via WhatsApp)

📍 Location: Porto, Portugal (Working in Lisbon)
🌍 Availability: Remote and hybrid projects
⏰ Time zone: GMT+0 (WET/WEST)`,
    keywords: [
      "contact",
      "email",
      "linkedin",
      "github",
      "phone",
      "portfolio",
      "site",
      "location",
      "porto",
      "lisbon",
      "remote",
      "hybrid",
      "whatsapp",
      "time zone",
      "gmt",
      "wET",
      "wEST",
      "marcus",
      "vinicius",
      "mvinicius-dev",
    ],
  },

  {
    id: "availability",
    category: "Availability and Interests",
    content: `Current Status: Employed (Creative Developer - Innovagency) and open to new challenging opportunities.

Seeking:
- Full-stack projects with React/Next.js and clean architecture.
- Design and development roles merging UI/UX and Motion Design.
- Collaborative teams focused on high-quality, scalable solutions.
- Deep tech projects with modern technologies.
- Design-driven development environments.
- Design systems and reusable component libraries.
- Projects emphasizing performance optimization and SEO.
- E-commerce development and integrations.
- Integration with AI technologies.
- Innovative projects leveraging AI and Machine Learning.
- Wordpress Plugins and Themes Development.
- Redesign and modernization of existing web applications.

Interested In:
- Opportunities in AI (Automation, Chatbots) and Machine Learning.
- Development of scalable, high-impact SaaS applications.
- Contributing to open source projects.
- Collaborating on cutting-edge web technologies.
- Projects with a strong focus on user experience and design.
- React and Next.js ecosystems.
- Building and optimizing e-commerce platforms.
- Working with CMS solutions (Payloadcms,Shopify, WordPress, Sanity).
- Projects involving performance optimization and SEO best practices.
- Engaging in communities focused on developer experience and tools.
- Learning and applying new technologies and frameworks.
- Remote or hybrid work.

Areas of Interest:
- Developer Experience & Tools
- Full-Stack Development with React/Next.js
- Performance Optimization & SEO
- E-commerce Development
- AI and Machine Learning Applications
- Integration with CMS Platforms
- Design Systems and Component Libraries
- UI/UX Design and Motion Design
- Open Source Contributions`,
    keywords: [
      "availability",
      "available",
      "seeking",
      "interest",
      "opportunity",
      "vacancy",
      "job",
      "work",
      "hybrid",
      "saas",
      "ecommerce",
      "cms",
      "payloadcms",
      "shopify",
      "wordpress",
      "sanity",
      "ai",
      "machine learning",
      "performance",
      "seo",
      "design",
      "ux",
      "ui",
      "developer experience",
      "full stack",
      "react",
      "nextjs",
      "next.js",
      "open source",
      "remote",
      "developer tools",
      "motion design",
      "component libraries",
      "design systems",
      "modernization",
      "redesign",
      "plugins",
      "themes",
    ],
  },
];

// ==========================================
// 🔍 RAG SEARCH FUNCTION (Logic maintained in original language for structural clarity)
// ==========================================

export function searchRelevantInfo(
  query: string,
  topK: number = 3
): ProfessionalInfo[] {
  const queryLower = query.toLowerCase();

  // Remove accents and special characters for better matching
  const normalizeText = (text: string) =>
    text
      .toLowerCase()
      .normalize("NFD")
      .replace(/[\u0300-\u036f]/g, "");

  const normalizedQuery = normalizeText(queryLower);
  const queryWords = normalizedQuery.split(/\s+/).filter((w) => w.length > 2);

  const scored = professionalData.map((info) => {
    let score = 0;
    const normalizedContent = normalizeText(info.content);

    // 1. Score for exact keyword match (weight 5)
    info.keywords.forEach((keyword) => {
      const normalizedKeyword = normalizeText(keyword);
      if (normalizedQuery.includes(normalizedKeyword)) {
        score += 5;
      }
    });

    // 2. Score for query words in content (weight 2)
    queryWords.forEach((word) => {
      if (normalizedContent.includes(word)) {
        score += 2;
      }
    });

    // 3. Score for query words in category title (weight 3)
    const normalizedCategory = normalizeText(info.category);
    queryWords.forEach((word) => {
      if (normalizedCategory.includes(word)) {
        score += 3;
      }
    });

    // 4. Bonus: complete phrase match (weight 8)
    if (normalizedContent.includes(normalizedQuery)) {
      score += 8;
    }

    return { ...info, score };
  });

  // Filter and sort by relevance
  const results = scored
    .filter((item) => item.score > 0)
    .sort((a, b) => b.score - a.score)
    .slice(0, topK);

  // Log for debug
  console.log("🔍 RAG Search:", {
    query: queryLower,
    results: results.length,
    topScores: results.map((r) => ({ category: r.category, score: r.score })),
  });

  return results;
}

// ==========================================
// 📊 KNOWLEDGE BASE STATISTICS (Logic maintained in original language for structural clarity)
// ==========================================

export function getKnowledgeBaseStats() {
  return {
    totalEntries: professionalData.length,
    categories: [...new Set(professionalData.map((d) => d.category))],
    totalKeywords: professionalData.reduce(
      (sum, d) => sum + d.keywords.length,
      0
    ),
    averageContentLength: Math.round(
      professionalData.reduce((sum, d) => sum + d.content.length, 0) /
        professionalData.length
    ),
  };
}
