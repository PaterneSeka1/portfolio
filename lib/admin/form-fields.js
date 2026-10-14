/**
 * Shared description of translatable / structured admin fields, used both by
 * the admin forms (default values) and by the server actions (parsing).
 *
 * Field kinds:
 *   text  -> string
 *   lines -> string[] (one item per line)
 *   csv   -> string[] (comma separated)
 */
export const lines = (value) =>
  value ? String(value).split("\n").map((v) => v.trim()).filter(Boolean) : [];
export const csv = (value) =>
  value ? String(value).split(",").map((v) => v.trim()).filter(Boolean) : [];

export function parseField(kind, value) {
  if (kind === "lines") return lines(value);
  if (kind === "csv") return csv(value);
  return value ? String(value).replace(/\r\n?/g, "\n").trim() : "";
}

export function formatField(kind, value) {
  if (kind === "lines") return Array.isArray(value) ? value.join("\n") : "";
  if (kind === "csv") return Array.isArray(value) ? value.join(", ") : "";
  return value ?? "";
}

const isEmpty = (value) => (Array.isArray(value) ? value.length === 0 : !value);

/** Reads `${prefix}${key}` fields; returns only filled values (or null when nothing is filled). */
export function readFields(formData, spec, prefix = "") {
  const result = {};
  for (const [key, kind] of Object.entries(spec)) {
    const value = parseField(kind, formData.get(`${prefix}${key}`));
    if (!isEmpty(value)) result[key] = value;
  }
  return Object.keys(result).length ? result : null;
}

/**
 * Case study fields, in display order. `group` drives the editor layout;
 * `stack` is kept for older content but edited through the project technologies.
 */
export const CASE_STUDY_FIELDS = [
  { key: "headline", kind: "text", group: "story", label: "Titre métier", description: "Le problème résolu, avant le nom du produit. Ex. « Digitalisation de la gestion RH ».", rows: 1 },
  { key: "context", kind: "text", group: "story", label: "Contexte", description: "Pour qui, dans quel cadre. Évitez tout détail interne sensible.", rows: 2 },
  { key: "problem", kind: "text", group: "story", label: "Problème", description: "Ce qui ne fonctionnait pas ou manquait, en langage métier.", rows: 2 },
  { key: "objectives", kind: "lines", group: "story", label: "Objectifs", description: "Un objectif par ligne.", rows: 3 },
  { key: "constraints", kind: "lines", group: "story", label: "Contraintes", description: "Une contrainte par ligne (données sensibles, délais, existant…).", rows: 2 },
  { key: "solution", kind: "text", group: "solution", label: "Solution", description: "Ce que la solution permet, compréhensible par un non-développeur.", rows: 3 },
  { key: "features", kind: "lines", group: "solution", label: "Fonctionnalités principales", description: "Une par ligne. Les trois premières apparaissent sur la carte du projet.", rows: 4 },
  { key: "users", kind: "lines", group: "solution", label: "Utilisateurs", description: "Un profil par ligne.", rows: 2 },
  { key: "role", kind: "lines", group: "role", label: "Mon rôle", description: "Ce que vous avez fait personnellement, une responsabilité par ligne. Ne vous attribuez pas le travail des autres.", rows: 3 },
  { key: "collaboration", kind: "text", group: "role", label: "Collaboration", description: "Qui a fait quoi (ex. briques IA conçues avec les ingénieurs IA).", rows: 2 },
  { key: "architecture", kind: "text", group: "architecture", label: "Architecture", description: "Description courte de l'organisation technique.", rows: 2 },
  {
    key: "architectureDiagram",
    kind: "text",
    group: "architecture",
    label: "Diagramme d'architecture",
    description: "Un bloc par ligne « Libellé | détail » ; « - » en début de ligne pour des branches parallèles. Jamais d'IP, d'URL privée ni de secret.",
    rows: 5,
    mono: true,
  },
  { key: "challenges", kind: "lines", group: "outcome", label: "Difficultés rencontrées", description: "Une par ligne.", rows: 2 },
  { key: "decisions", kind: "lines", group: "outcome", label: "Décisions techniques", description: "Un choix et sa raison par ligne.", rows: 2 },
  { key: "results", kind: "lines", group: "outcome", label: "Résultat", description: "Faits vérifiables uniquement : aucun chiffre, client ou témoignage inventé.", rows: 2 },
  { key: "nextSteps", kind: "lines", group: "outcome", label: "Évolutions possibles", description: "Une par ligne.", rows: 2 },
  { key: "ctaTitle", kind: "text", group: "cta", label: "Question de fin d'étude de cas", description: "Ex. « Vous avez un processus métier à digitaliser ? »", rows: 1 },
  { key: "stack", kind: "csv", group: "hidden", label: "Technologies de l'étude de cas", rows: 1 },
];

export const CASE_STUDY_SPEC = Object.fromEntries(CASE_STUDY_FIELDS.map((f) => [f.key, f.kind]));

export const PROJECT_EN_SPEC = {
  title: "text",
  summary: "text",
  technologies: "csv",
  ctaLabel: "text",
  seoTitle: "text",
  seoDescription: "text",
};

export const PROFILE_EN_SPEC = {
  title: "text",
  tagline: "text",
  promise: "text",
  availabilityLabel: "text",
  location: "text",
};

export const EXPERTISE_EN_SPEC = { title: "text", description: "text", technologies: "csv" };
export const EXPERIENCE_EN_SPEC = { company: "text", role: "text", period: "text", location: "text", description: "text", missions: "lines" };
export const SKILL_EN_SPEC = { category: "text", name: "text" };

/** French → English field name pairs for <AutoTranslate>, built from an `*_EN_SPEC`. */
export const translationPairs = (spec, frPrefix = "", enPrefix = "en_") =>
  Object.entries(spec).map(([key, kind]) => ({ fr: `${frPrefix}${key}`, en: `${enPrefix}${key}`, kind }));
