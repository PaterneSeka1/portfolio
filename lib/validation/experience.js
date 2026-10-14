import { z } from "zod";

const month = z
  .string()
  .trim()
  .refine((value) => value === "" || /^\d{4}-\d{2}$/.test(value), { message: "Choisissez un mois et une année." });

export const experienceSchema = z
  .object({
    company: z.string().trim().min(2, "Indiquez l'entreprise ou l'organisation (2 caractères minimum)."),
    role: z.string().trim().min(2, "Indiquez le poste occupé (2 caractères minimum)."),
    location: z.string().trim().max(120, "Le lieu est trop long."),
    startDate: month,
    endDate: month,
    current: z.boolean(),
    period: z.string().trim().max(80, "La période est trop longue (80 caractères maximum)."),
    description: z.string().trim().max(400, "Le contexte est trop long (400 caractères maximum)."),
    missions: z.string().trim().min(1, "Ajoutez au moins une responsabilité."),
    technologies: z.string().trim(),
    published: z.boolean(),
  })
  .refine((data) => !data.endDate || !data.startDate || data.endDate >= data.startDate, {
    path: ["endDate"],
    message: "La date de fin doit être postérieure à la date de début.",
  })
  .refine((data) => !data.endDate || data.startDate, {
    path: ["startDate"],
    message: "Indiquez aussi la date de début.",
  });
