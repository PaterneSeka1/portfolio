import { z } from "zod";

const optionalUrl = (message) =>
  z
    .string()
    .trim()
    .refine((value) => value === "" || /^https?:\/\/[^\s]+\.[^\s]+/.test(value), { message });

export const profileSchema = z.object({
  name: z.string().trim().min(2, "Indiquez votre nom (2 caractères minimum)."),
  title: z.string().trim().min(2, "Indiquez votre titre (ex. Full-Stack Engineer)."),
  tagline: z.string().trim().max(80, "Le positionnement doit tenir en 80 caractères."),
  promise: z
    .string()
    .trim()
    .min(20, "L'accroche doit contenir au moins 20 caractères.")
    .max(220, "L'accroche doit rester courte (220 caractères maximum)."),
  location: z.string().trim().min(2, "Indiquez votre localisation."),
  available: z.boolean(),
  availabilityLabel: z.string().trim().min(2, "Indiquez le texte de disponibilité (ex. « Disponible pour de nouvelles opportunités »)."),
  email: z.string().trim().email("Saisissez une adresse e-mail valide."),
  phone: z.string().trim().max(30, "Numéro trop long."),
  whatsapp: optionalUrl("Saisissez un lien complet, par exemple https://wa.me/225…"),
  github: optionalUrl("Saisissez l'adresse complète de votre profil GitHub (https://github.com/…)."),
  linkedin: optionalUrl("Saisissez l'adresse complète de votre profil LinkedIn (https://www.linkedin.com/in/…)."),
});
