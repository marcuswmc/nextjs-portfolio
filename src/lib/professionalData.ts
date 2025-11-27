export interface ProfessionalInfo {
  id: string;
  category: string;
  content: string;
  keywords: string[];
}

export const professionalData: ProfessionalInfo[] = [
  {
    id: "bio",
    category: "Biografia e Apresentação",
    content: `Sou Marcus Vinicius, desenvolvedor Full Stack com foco em frontend, e trago mais de uma década de experiência em desenvolvimento web moderno.
    
Especializo-me em criar aplicações escaláveis e performáticas com arquitetura limpa, utilizando tecnologias como React, Next.js, TypeScript e Node.js. Tenho paixão por fundir design e tecnologia (UI/UX e Motion Design) para resolver problemas complexos e criar experiências de usuário excepcionais.

Localizado em Porto, Portugal (com trabalho em Lisboa), colaboro em projetos remotos e presenciais, entregando soluções de alta qualidade, desde UI/UX pixel-perfect até soluções full-stack robustas.`,
    keywords: [
      "sobre", "quem", "biografia", "apresentação", "desenvolvedor",
      "experiência", "década", "trabalho", "profissional", "sou", "marcus vinicius"
    ]
  },

  {
    id: "skills-frontend",
    category: "Habilidades - Front-end",
    content: `Front-end:
- React.js & Next.js
- TypeScript & JavaScript (ES6+)
- Tailwind CSS, SASS & Styled-components
- Responsive Design & Mobile First
- State Management (Redux, Context API)
- Animações (Framer Motion, Motion, GSAP, CSS Animations)
- UI Libraries (ShadcnUI, Material Design UI)
- Testes (Jest, Cypress)
- Design Tools (Figma, Adobe XD, Photoshop)`,
    keywords: [
      "frontend", "front-end", "react", "nextjs", "next.js", "typescript",
      "javascript", "tailwind", "css", "html", "ui", "interface", "design", "figma", "motion"
    ]
  },

  {
    id: "skills-backend",
    category: "Habilidades - Back-end",
    content: `Back-end:
- Node.js & Express.js
- Next.js API Routes
- REST APIs & WebSockets
- Pagamentos (Stripe)
- Integração com APIs externas`,
    keywords: [
      "backend", "back-end", "nodejs", "node", "express", "api", "rest",
      "servidor", "pagamentos", "stripe", "websockets"
    ]
  },

  {
    id: "skills-database",
    category: "Habilidades - Base de Dados",
    content: `Base de Dados:
- MongoDB & Mongoose
- SQL (PostgreSQL, MySQL)
- Redis (cache)
- Prisma ORM
- Modelagem de dados
- Otimização de queries`,
    keywords: [
      "database", "base de dados", "sql", "postgresql",
      "mongodb", "prisma", "redis", "dados", "bd"
    ]
  },

  {
    id: "skills-devops",
    category: "Habilidades - DevOps & Cloud",
    content: `DevOps & Cloud:
- Vercel & Netlify (deploy)
- Git & GitHub
- CMS (Shopify, WordPress, Sanity CMS, Payload CMS)
- Estratégias de Performance & SEO (Core Web Vitals)`,
    keywords: [
      "devops", "cloud", "vercel", "deploy",
      "git", "github", "cms", "shopify", "wordpress", "performance", "seo", "payload"
    ]
  },

  {
    id: "skills-ai",
    category: "Habilidades - IA e Machine Learning",
    content: `Inteligência Artificial:
- AI Automation (Chatbots e Assistentes Virtuais)
- Prompt Engineering
- Integração com APIs de IA (OpenAI, Gemini)`,
    keywords: [
      "ia", "ai", "inteligência artificial", "chatbot", "openai", "gpt",
      "gemini", "automação"
    ]
  },

  {
    id: "project-1",
    category: "Projeto - Sattis Studio",
    content: `Sattis Studio: Plataforma Web Full-stack
Descrição: Desenvolvimento full-stack de uma plataforma web robusta.
Tecnologias: Next.js, Typescript, Node.js, MongoDB.

Responsabilidades:
- Arquitetura e desenvolvimento full-stack
- Design e implementação de UI/UX
- Otimização de performance.

Resultados: [+200% de aumento das conversões (marcações online)]
Link: https://sattis.me
GitHub: https://github.com/marcuswmc/sattis-nextjs-website`,
    keywords: [
      "projeto", "portfolio", "sattis", "plataforma", "nextjs", "website",
      "mongodb"
    ]
  },

  {
    id: "project-2",
    category: "Projeto - C Model 2.0",
    content: `C Model 2.0: Landing Page de Alto Impacto
Descrição: Criação de um site/landing page de alta performance, focado em conversão e experiência imersiva (Motion Design).
Tecnologias: Next.js, Tailwind CSS, Typescript, MongoDB.

Responsabilidades:
- Desenvolvimento front-end com foco em Motion Design (Framer Motion)
- Integração com APIs de formulários
- Garantia de Core Web Vitals e SEO Engineering.

Resultados: [Detalhe as conquistas aqui (ex: X% de taxa de conversão)]
Link: https://www.cmodel.co/
GitHub: https://github.com/marcuswmc/modelo-c`,
    keywords: [
      "projeto", "portfolio", "landing page", "tailwind", "conversão",
      "seo", "performance", "cmodel", "modeloc"
    ]
  },

  {
    id: "project-3",
    category: "Projeto - DeJongh Drones",
    content: `DeJongh Drones: Web Application
Descrição: Desenvolvimento de uma aplicação web dinâmica.
Tecnologias: React, React Router, Styled-components.

Responsabilidades:
- Desenvolvimento do frontend e rotas dinâmicas (React Router)
- Colaboração com a equipa de design
- Implementação de testes (Jest/Cypress).

Resultados: [Detalhe as conquistas aqui (ex: Feedback positivo do cliente, redução de X% em bugs)]
Link: https://www.doit.com.br/
GitHub: https://docs.github.com/pt/repositories`,
    keywords: [
      "projeto", "portfolio", "web app", "react", "styled-components",
      "aplicação"
    ]
  },

  {
    id: "experience-current",
    category: "Experiência - Innovagency",
    content: `Creative Developer - Frondend @ Innovagency
Período: 2023 - Presente
Local: Lisboa, Portugal

Responsabilidades:
- Design, desenvolvimento e manutenção web para páginas de marcas (Purina, El Corte Inglés, Cupra).
- Criação de landing pages e páginas de anúncios para campanhas de promoção e registo de eventos.
- Desenvolvimento de projetos full-stack no ecossistema React/Next.js e CMS (Shopify, WordPress, Sanity).

Stack: Next.js, ReactJS, TypeScript, Node.js, Prisma, MongoDB, Stripe, TailwindCSS, Framer Motion.`,
    keywords: [
      "experiência", "trabalho", "empresa", "cargo", "atual", "innovagency",
      "profissional", "lisboa", "creative developer"
    ]
  },

  {
    id: "experience-previous",
    category: "Experiência - Anca Design Studio",
    content: `Full Stack Developer @ Anca Design Studio
Período: 2022 - 2023
Local: Penafiel, Portugal

Responsabilidades:
- Desenvolvimento full-stack e design de websites corporativos, plataformas de e-commerce, blogs e aplicações web.
- Trabalho nos ecossistemas React, Shopify e WordPress.
- Colaboração direta com a equipa de design para a implementação pixel-perfect.

Stack: ReactJS, Next.js, TypeScript, Node.js, MongoDB, Shopify, WordPress, Sanity CMS.`,
    keywords: [
      "experiência", "trabalho", "empresa", "anterior", "anca design studio",
      "full stack", "penafiel"
    ]
  },

  {
    id: "education",
    category: "Formação Académica",
    content: `Bacharelado em Análise e Desenvolvimento de Sistemas (em curso)
Universidade: FIAP
Período: [Atual]
Localização: [Online/São Paulo, Brasil - Pode detalhar mais]

Outras Formações:
- Full Stack Web Development (EDIT School)
- Bacharelado em Publicidade e Comunicação Social (FAPCOM)
- Front-end Development (Rocketseat)

Áreas de foco: Desenvolvimento de Software, Algoritmos, Base de Dados, UI/UX Design.`,
    keywords: [
      "formação", "educação", "universidade", "curso", "licenciatura",
      "certificação", "estudo", "académica", "fiap", "edit school"
    ]
  },

  {
    id: "contact",
    category: "Informações de Contato",
    content: `Formas de Contato:

📧 Email: marcus.relation@gmail.com
💼 LinkedIn: https://www.linkedin.com/in/mvinicius-dev/
🐙 GitHub: https://github.com/mvinicius-dev
🌐 Portfolio: https://marcusdev.me
📱 Telefone: +351 912 981 585 (disponível via WhatsApp)

📍 Localização: Porto, Portugal (Trabalho em Lisboa)
🌍 Disponibilidade: Projetos remotos e presenciais
⏰ Fuso horário: GMT+0 (WET/WEST)`,
    keywords: [
      "contato", "contacto", "email", "linkedin", "github", "telefone",
      "portfolio", "site", "localização", "porto", "lisboa"
    ]
  },

  {
    id: "availability",
    category: "Disponibilidade e Interesses",
    content: `Status Atual: Empregado (Creative Developer - Innovagency) e Aberto a novas oportunidades desafiadoras.

Procuro por:
- Projetos de Full-stack com React/Next.js e arquitetura limpa.
- Oportunidades em IA (Automação, Chatbots) e Machine Learning.
- Desenvolvimento de Aplicações SaaS escaláveis e de alto impacto.
- Trabalho remoto ou híbrido.

Áreas de Interesse:
- Developer Experience & Tools
- UI/UX Design e Motion Design
- Contribuições Open Source`,
    keywords: [
      "disponibilidade", "disponível", "procuro", "interesse", "oportunidade",
      "vaga", "emprego", "trabalho", "híbrido", "saas"
    ]
  }
];

// ==========================================
// 🔍 FUNÇÃO DE BUSCA RAG (mantida original)
// ==========================================

export function searchRelevantInfo(query: string, topK: number = 3): ProfessionalInfo[] {
  const queryLower = query.toLowerCase();

  // Remove acentos e caracteres especiais para melhor matching
  const normalizeText = (text: string) =>
    text.toLowerCase()
      .normalize('NFD')
      .replace(/[\u0300-\u036f]/g, '');

  const normalizedQuery = normalizeText(queryLower);
  const queryWords = normalizedQuery.split(/\s+/).filter(w => w.length > 2);

  const scored = professionalData.map(info => {
    let score = 0;
    const normalizedContent = normalizeText(info.content);

    // 1. Score por match exato de keywords (peso 5)
    info.keywords.forEach(keyword => {
      const normalizedKeyword = normalizeText(keyword);
      if (normalizedQuery.includes(normalizedKeyword)) {
        score += 5;
      }
    });

    // 2. Score por palavras da query no conteúdo (peso 2)
    queryWords.forEach(word => {
      if (normalizedContent.includes(word)) {
        score += 2;
      }
    });

    // 3. Score por palavras da query no título da categoria (peso 3)
    const normalizedCategory = normalizeText(info.category);
    queryWords.forEach(word => {
      if (normalizedCategory.includes(word)) {
        score += 3;
      }
    });

    // 4. Bonus: match de frases completas (peso 8)
    if (normalizedContent.includes(normalizedQuery)) {
      score += 8;
    }

    return { ...info, score };
  });

  // Filtra e ordena por relevância
  const results = scored
    .filter(item => item.score > 0)
    .sort((a, b) => b.score - a.score)
    .slice(0, topK);

  // Log para debug
  console.log('🔍 Busca RAG:', {
    query: queryLower,
    results: results.length,
    topScores: results.map(r => ({ category: r.category, score: r.score }))
  });

  return results;
}

// ==========================================
// 📊 ESTATÍSTICAS DA BASE DE CONHECIMENTO (mantida original)
// ==========================================

export function getKnowledgeBaseStats() {
  return {
    totalEntries: professionalData.length,
    categories: [...new Set(professionalData.map(d => d.category))],
    totalKeywords: professionalData.reduce((sum, d) => sum + d.keywords.length, 0),
    averageContentLength: Math.round(
      professionalData.reduce((sum, d) => sum + d.content.length, 0) / professionalData.length
    )
  };
}