import { z } from "zod";

export const profileSchema = z.object({
  name: z.string().trim().min(2, "Le nom est requis."),
  title: z.string().trim().min(2, "Le titre est requis."),
  promise: z.string().trim().min(10, "L'accroche est trop courte."),
  location: z.string().trim().min(2, "La localisation est requise."),
  available: z.coerce.boolean(),
  availabilityLabel: z.string().trim().min(2, "Le libellé de disponibilité est requis."),
  email: z.string().trim().email("Adresse email invalide."),
  phone: z.string().trim().optional().or(z.literal("")),
  whatsapp: z.string().trim().optional().or(z.literal("")),
  github: z.string().trim().optional().or(z.literal("")),
  linkedin: z.string().trim().optional().or(z.literal("")),
});
