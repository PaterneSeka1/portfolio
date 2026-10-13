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
  ...group("Frontend", "Frontend", ["Next.js", "React", "Vue.js", "TypeScript", "Tailwind CSS", "WordPress"]),
  ...group("Backend", "Backend", ["NestJS", "Node.js", "API REST", "Socket.IO", "Authentification", "Autorisation"], {
    en: { "API REST": "REST APIs", Authentification: "Authentication", Autorisation: "Authorization" },
  }),
  ...group("Données", "Data", ["PostgreSQL", "MongoDB", "Prisma", "Redis"]),
  ...group("Infrastructure", "Infrastructure", ["Linux", "VPS", "Docker", "Nginx", "PM2", "TLS", "GitHub Actions"]),
  ...group("Intégration IA", "AI Integration", ["RAG", "API LLM", "Embeddings", "Recherche vectorielle"], {
    learning: true,
    en: { "API LLM": "LLM APIs", "Recherche vectorielle": "Vector search" },
  }),
  ...group("Mobile", "Mobile", ["React Native", "Expo"], { learning: true }),
];
