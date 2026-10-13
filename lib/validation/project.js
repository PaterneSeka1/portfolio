import { z } from "zod";

export const projectSchema = z.object({
  title: z.string().trim().min(2, "Le titre est requis."),
  slug: z
    .string()
    .trim()
    .min(2, "Le slug est requis.")
    .regex(/^[a-z0-9]+(-[a-z0-9]+)*$/, "Slug invalide (minuscules, chiffres et tirets)."),
  category: z.enum(["business", "saas", "website", "ai"], { message: "Type invalide." }),
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
});
