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

/** Case study fields, in display order. */
export const CASE_STUDY_FIELDS = [
  { key: "headline", kind: "text", label: "Titre métier (ex. « Digitalisation de la gestion RH »)", rows: 1 },
  { key: "context", kind: "text", label: "Contexte", rows: 2 },
  { key: "problem", kind: "text", label: "Problème", rows: 2 },
  { key: "objectives", kind: "lines", label: "Objectifs (un par ligne)", rows: 3 },
  { key: "constraints", kind: "lines", label: "Contraintes (une par ligne)", rows: 2 },
  { key: "solution", kind: "text", label: "Solution", rows: 3 },
  { key: "features", kind: "lines", label: "Fonctionnalités principales (une par ligne)", rows: 4 },
  { key: "users", kind: "lines", label: "Utilisateurs (un par ligne)", rows: 2 },
  { key: "role", kind: "lines", label: "Mon rôle — ce que j'ai fait personnellement (un par ligne)", rows: 3 },
  { key: "collaboration", kind: "text", label: "Collaboration (qui a fait quoi, facultatif)", rows: 2 },
  { key: "architecture", kind: "text", label: "Architecture (texte)", rows: 2 },
  {
    key: "architectureDiagram",
    kind: "text",
    label: "Diagramme d'architecture — un bloc par ligne « Libellé | détail », « - » en début de ligne pour des branches parallèles. Ne jamais indiquer d'IP, d'URL privée ou de secret.",
    rows: 5,
    mono: true,
  },
  { key: "stack", kind: "csv", label: "Technologies de l'étude de cas (séparées par des virgules)", rows: 1 },
  { key: "challenges", kind: "lines", label: "Difficultés rencontrées (une par ligne)", rows: 2 },
  { key: "decisions", kind: "lines", label: "Décisions techniques (une par ligne)", rows: 2 },
  { key: "results", kind: "lines", label: "Résultat — faits vérifiables uniquement, aucun chiffre inventé (un par ligne)", rows: 2 },
  { key: "nextSteps", kind: "lines", label: "Suite et évolutions possibles (une par ligne)", rows: 2 },
  { key: "ctaTitle", kind: "text", label: "Question d'appel à l'action en fin d'étude (ex. « Vous avez un processus métier à digitaliser ? »)", rows: 1 },
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
export const EXPERIENCE_EN_SPEC = { company: "text", role: "text", period: "text", missions: "lines" };
export const SKILL_EN_SPEC = { category: "text", name: "text" };
