import { z } from "zod";

export const projectTypes = ["Application métier", "Produit SaaS", "Site web", "Autre"];
export const timelines = ["Urgent (< 1 mois)", "1 à 3 mois", "3 à 6 mois", "Flexible"];

export const contactSchema = z.object({
  name: z.string().trim().min(2, "Votre nom doit contenir au moins 2 caractères."),
  email: z.string().trim().email("Adresse email invalide."),
  company: z.string().trim().optional().or(z.literal("")),
  phone: z.string().trim().optional().or(z.literal("")),
  projectType: z.enum(projectTypes, { message: "Sélectionnez un type de projet." }),
  budget: z.string().trim().optional().or(z.literal("")),
  timeline: z.enum(timelines, { message: "Sélectionnez un délai." }),
  message: z.string().trim().min(10, "Votre message doit contenir au moins 10 caractères."),
  website: z.string().trim().max(0, "Requête invalide.").optional().or(z.literal("")),
});
