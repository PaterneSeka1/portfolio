/**
 * Technologies grouped by purpose. No proficiency percentages: `learning: true`
 * marks areas that are still being developed and must not be presented as a
 * core expertise.
 */
const group = (category, categoryEn, names, { learning = false, en = {} } = {}) =>
  names.map((name) => ({
    category,
    name,
    learning,
    en: { category: categoryEn, ...(en[name] ? { name: en[name] } : {}) },
  }));

export const skills = [
  ...group("Frontend", "Frontend", ["Next.js", "React", "TypeScript", "Tailwind CSS", "Vue.js", "Vite", "TanStack Query", "Recharts"]),
  ...group("Backend", "Backend", ["NestJS", "Node.js", "Express", "Laravel", "PHP", "Python"]),
  ...group("Bases de données", "Databases", ["Prisma", "PostgreSQL", "MongoDB", "Mongoose", "MySQL", "Redis"]),
  ...group("Architecture et API", "Architecture & APIs", ["REST", "DTO", "Swagger", "Zod", "JWT"]),
  ...group("DevOps et déploiement", "DevOps & Deployment", ["Docker", "Nginx", "PM2", "Ubuntu", "GitHub Actions", "Cloudflare R2", "pnpm"]),
  ...group("Temps réel", "Real time", ["Socket.IO"]),
  ...group("Qualité et tests", "Quality & Testing", ["Vitest", "Jest", "Supertest"]),
  ...group("Solutions SaaS", "SaaS Solutions", ["Next.js", "NestJS", "Prisma"]),
  ...group("Conseil et accompagnement", "Consulting & Support", ["WordPress"]),
];
