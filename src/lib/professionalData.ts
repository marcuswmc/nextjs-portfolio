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

Based in Porto, Portugal (working in Lisbon), I collaborate on remote and on-site projects, delivering high-quality solutions, from pixel-perfect UI/UX to robust full-stack solutions.`,
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
      "authentication"
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
Location: Lisbon, Portugal

Responsibilities:
- Design, development, and web maintenance for brand pages (Purina, El Corte Inglés, Cupra).
- Creation of landing pages and announcement pages for promotional campaigns and event registration.
- Development of full-stack projects within the React/Next.js ecosystem and CMS (Shopify, WordPress, Sanity).

Stack: Next.js, ReactJS, TypeScript, Node.js, Prisma, MongoDB, Stripe, TailwindCSS, Framer Motion.`,
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
    ],
  },

  {
    id: "experience-previous",
    category: "Experience - Anca Design Studio",
    content: `Full Stack Developer @ Anca Design Studio
Period: 2022 - 2023
Location: Penafiel, Portugal

Responsibilities:
- Full-stack development and design of corporate websites, e-commerce platforms, blogs, and web applications.
- Work within the React, Shopify, and WordPress ecosystems.
- Direct collaboration with the design team for pixel-perfect implementation.

Stack: ReactJS, Next.js, TypeScript, Node.js, MongoDB, Shopify, WordPress, Sanity CMS.`,
    keywords: [
      "experience",
      "work",
      "company",
      "previous",
      "anca design studio",
      "full stack",
      "penafiel",
    ],
  },

  {
    id: "education",
    category: "Academic Background",
    content: `Bachelor's Degree in Systems Analysis and Development (Ongoing)
University: Cruzeiro do Sul University (Brazil)
Period: [Current]
Location: [Online/São Paulo, Brazil - Can detail further]

Other Training:
- Full Stack Web Development (EDIT School)
- Bachelor's Degree in Advertising and Social Communication (FAPCOM)
- Front-end Development (Rocketseat)

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
🌍 Availability: Remote and on-site projects
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
    ],
  },

  {
    id: "availability",
    category: "Availability and Interests",
    content: `Current Status: Employed (Creative Developer - Innovagency) and Open to new challenging opportunities.

Seeking:
- Full-stack projects with React/Next.js and clean architecture.
- Opportunities in AI (Automation, Chatbots) and Machine Learning.
- Development of scalable, high-impact SaaS applications.
- Remote or hybrid work.

Areas of Interest:
- Developer Experience & Tools
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
