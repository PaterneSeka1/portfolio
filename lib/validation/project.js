import { z } from "zod";

const optionalUrl = z
  .string()
  .trim()
  .refine((value) => value === "" || /^https?:\/\/[^\s]+\.[^\s]+/.test(value), {
    message: "Saisissez une adresse complète, commençant par https://",
  });

export const PROJECT_CATEGORIES = [
  { value: "business", label: "Application métier" },
  { value: "saas", label: "Produit SaaS" },
  { value: "website", label: "Site web" },
  { value: "ai", label: "Intégration IA" },
];

export const PROJECT_VISIBILITIES = [
  { value: "private", label: "Privé — application interne, code non public" },
  { value: "public", label: "Public — site ou code accessible" },
];

export const projectSchema = z.object({
  title: z.string().trim().min(3, "Le titre doit contenir au moins 3 caractères.").max(120, "Le titre est trop long (120 caractères maximum)."),
  slug: z
    .string()
    .trim()
    .min(2, "Le slug doit contenir au moins 2 caractères.")
    .max(80, "Le slug est trop long (80 caractères maximum).")
    .regex(/^[a-z0-9]+(-[a-z0-9]+)*$/, "Le slug ne peut contenir que des minuscules, des chiffres et des tirets (ex. rh-vedem)."),
  category: z.enum(["business", "saas", "website", "ai"], { message: "Choisissez un type de projet." }),
  visibility: z.enum(["public", "private"], { message: "Indiquez si le projet est public ou privé." }),
  summary: z
    .string()
    .trim()
    .min(20, "La description courte doit contenir au moins 20 caractères.")
    .max(400, "La description courte est trop longue (400 caractères maximum)."),
  technologies: z
    .string()
    .trim()
    .min(1, "Ajoutez au moins une technologie."),
  publicUrl: optionalUrl,
  githubUrl: optionalUrl,
  ctaLabel: z.string().trim().max(60, "Le libellé est trop long (60 caractères maximum)."),
  ctaHref: z
    .string()
    .trim()
    .refine((value) => value === "" || value.startsWith("/") || /^https?:\/\//.test(value), {
      message: "Indiquez un chemin du site (ex. /contact) ou une adresse complète.",
    }),
  featured: z.boolean(),
  order: z.coerce.number({ message: "L'ordre doit être un nombre." }).int("L'ordre doit être un nombre entier.").min(0, "L'ordre doit être positif."),
  seoTitle: z.string().trim().max(70, "Le titre SEO doit tenir en 70 caractères pour ne pas être coupé."),
  seoDescription: z.string().trim().max(170, "La description SEO doit tenir en 170 caractères."),
});

export function slugify(value) {
  return String(value ?? "")
    .normalize("NFD")
    .replace(/[̀-ͯ]/g, "")
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "")
    .slice(0, 80);
}
