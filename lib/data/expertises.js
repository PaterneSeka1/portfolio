/**
 * Areas of expertise (what Paterne can do), each followed by the technologies
 * used for it. Technology lists are kept separately in ./skills.js.
 */
export const expertises = [
  {
    title: "Applications métier",
    icon: "Building2",
    description:
      "Transformer un processus interne — RH, demandes, documents, validations — en un outil simple, adapté au rôle de chaque utilisateur.",
    technologies: ["Next.js", "NestJS", "Prisma"],
    en: {
      title: "Business Applications",
      description:
        "Turning an internal process — HR, requests, documents, approvals — into a simple tool that fits each user's role.",
    },
  },
  {
    title: "Architecture logicielle",
    icon: "Network",
    description:
      "Découper un système en briques claires — interface, API, données, services — pour qu'il reste compréhensible et maintenable en grandissant.",
    technologies: ["Next.js", "NestJS", "Node.js", "TypeScript"],
    en: {
      title: "System Architecture",
      description:
        "Splitting a system into clear building blocks — interface, API, data, services — so it stays understandable and maintainable as it grows.",
    },
  },
  {
    title: "Conception d'API",
    icon: "Plug",
    description:
      "Des API claires et documentées pour relier les applications entre elles et aux services externes, avec une gestion fine des accès.",
    technologies: ["REST", "Swagger", "Authentification", "Autorisation", "Socket.IO"],
    en: {
      title: "API Design",
      description:
        "Clear, documented APIs that connect applications with each other and with external services, with fine-grained access control.",
      technologies: ["REST", "Swagger", "Authentication", "Authorization", "Socket.IO"],
    },
  },
  {
    title: "Architecture de données",
    icon: "Database",
    description:
      "Modéliser les données métier et choisir le bon stockage selon l'usage : relationnel, documentaire ou cache.",
    technologies: ["PostgreSQL", "MongoDB", "Prisma", "Redis"],
    en: {
      title: "Data Architecture",
      description:
        "Modelling business data and choosing the right storage for each use: relational, document or cache.",
    },
  },
  {
    title: "Infrastructure et déploiement",
    icon: "Server",
    description:
      "Mettre en production, sécuriser et maintenir : serveur Linux, reverse proxy, certificats, supervision des processus, conteneurs.",
    technologies: ["Linux", "Docker", "Nginx", "PM2", "TLS", "GitHub Actions"],
    en: {
      title: "Infrastructure & Deployment",
      description:
        "Shipping to production, securing and maintaining: Linux servers, reverse proxy, certificates, process supervision, containers.",
    },
  },
  {
    title: "Intégration IA",
    icon: "Sparkles",
    description:
      "Intégrer des briques IA utiles — assistant interne, recherche documentaire — dans des applications existantes. Un domaine que je développe actuellement, avec les ingénieurs IA.",
    technologies: ["RAG", "API LLM", "Embeddings", "Recherche vectorielle"],
    en: {
      title: "AI Integration",
      description:
        "Bringing useful AI building blocks — internal assistants, document search — into existing applications. An area I am currently developing, together with AI engineers.",
      technologies: ["RAG", "LLM APIs", "Embeddings", "Vector search"],
    },
  },
];
