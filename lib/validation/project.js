import { z } from "zod";

export const projectSchema = z.object({
  title: z.string().trim().min(2, "Le titre est requis."),
  slug: z
    .string()
    .trim()
    .min(2, "Le slug est requis.")
    .regex(/^[a-z0-9]+(-[a-z0-9]+)*$/, "Slug invalide (minuscules, chiffres et tirets)."),
  category: z.enum(["business", "saas", "website"], { message: "Type invalide." }),
  visibility: z.enum(["public", "private"], { message: "Confidentialité invalide." }),
  summary: z.string().trim().min(10, "Le résumé est trop court."),
  technologies: z.string().trim().min(1, "Indiquez au moins une technologie."),
  publicUrl: z.string().trim().optional().or(z.literal("")),
  githubUrl: z.string().trim().optional().or(z.literal("")),
  ctaLabel: z.string().trim().min(2, "Le libellé du CTA est requis."),
  ctaHref: z.string().trim().min(1, "Le lien du CTA est requis."),
  featured: z.coerce.boolean(),
  order: z.coerce.number().int().default(0),
  published: z.coerce.boolean(),
  seoTitle: z.string().trim().optional().or(z.literal("")),
  seoDescription: z.string().trim().optional().or(z.literal("")),
  context: z.string().trim().optional().or(z.literal("")),
  problem: z.string().trim().optional().or(z.literal("")),
  objectives: z.string().trim().optional().or(z.literal("")),
  users: z.string().trim().optional().or(z.literal("")),
  features: z.string().trim().optional().or(z.literal("")),
  architecture: z.string().trim().optional().or(z.literal("")),
  stack: z.string().trim().optional().or(z.literal("")),
  challenges: z.string().trim().optional().or(z.literal("")),
  solutions: z.string().trim().optional().or(z.literal("")),
  results: z.string().trim().optional().or(z.literal("")),
});
