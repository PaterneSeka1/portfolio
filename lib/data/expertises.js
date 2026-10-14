/**
 * Areas of expertise, each followed by the technologies used for it.
 * Technology lists are kept separately in ./skills.js.
 */
export const expertises = [
  {
    title: "Frontend",
    icon: "LayoutTemplate",
    description:
      "Interfaces modernes, accessibles et performantes, pensées pour l'expérience utilisateur autant que pour la maintenabilité.",
    technologies: ["Next.js", "React", "TypeScript", "Tailwind CSS", "TanStack Query"],
    en: {
      title: "Frontend",
      description:
        "Modern, accessible and fast interfaces, designed for the user experience as much as for maintainability.",
    },
  },
  {
    title: "Backend",
    icon: "Server",
    description: "APIs robustes et sécurisées, logique métier structurée et scalable pour des plateformes exigeantes.",
    technologies: ["NestJS", "Node.js", "Express"],
    en: {
      title: "Backend",
      description: "Robust, secure APIs and structured, scalable business logic for demanding platforms.",
    },
  },
  {
    title: "Bases de données",
    icon: "Database",
    description:
      "Modélisation de données fiable et requêtes optimisées, relationnelles ou documentaires selon le besoin métier.",
    technologies: ["Prisma", "PostgreSQL", "MongoDB", "Redis"],
    en: {
      title: "Databases",
      description: "Reliable data modelling and optimised queries, relational or document-based depending on business needs.",
    },
  },
  {
    title: "Architecture et API",
    icon: "Network",
    description:
      "Conception d'architectures claires, de contrats d'API documentés et évolutifs pour des systèmes durables.",
    technologies: ["REST", "DTO", "Swagger", "Zod", "JWT"],
    en: {
      title: "Architecture & APIs",
      description: "Designing clear architectures and documented, evolvable API contracts for long-lasting systems.",
    },
  },
  {
    title: "DevOps et déploiement",
    icon: "Rocket",
    description: "Mise en production fiable, automatisée et supervisée, du build à l'hébergement.",
    technologies: ["Docker", "Nginx", "PM2", "Ubuntu", "GitHub Actions", "Cloudflare R2"],
    en: {
      title: "DevOps & Deployment",
      description: "Reliable, automated and monitored releases, from build to hosting.",
    },
  },
  {
    title: "Temps réel",
    icon: "Radio",
    description: "Fonctionnalités collaboratives et notifications instantanées pour des produits interactifs.",
    technologies: ["Socket.IO"],
    en: {
      title: "Real time",
      description: "Collaborative features and instant notifications for interactive products.",
    },
  },
  {
    title: "Solutions SaaS",
    icon: "Layers",
    description: "Conception de produits multi-établissements ou multi-clients, pensés pour grandir avec l'usage.",
    technologies: ["Next.js", "NestJS", "Prisma"],
    en: {
      title: "SaaS Solutions",
      description: "Designing multi-site or multi-tenant products, built to grow with usage.",
    },
  },
  {
    title: "Conseil et accompagnement",
    icon: "Handshake",
    description:
      "Cadrage fonctionnel, choix technologiques et accompagnement des équipes dans leur transformation digitale.",
    technologies: ["WordPress"],
    en: {
      title: "Consulting & Support",
      description: "Functional scoping, technology choices and support for teams through their digital transformation.",
    },
  },
];
