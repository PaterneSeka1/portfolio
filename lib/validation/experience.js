import { z } from "zod";

export const experienceSchema = z.object({
  company: z.string().trim().min(2, "L'entreprise est requise."),
  role: z.string().trim().min(2, "Le poste est requis."),
  period: z.string().trim().optional().or(z.literal("")),
  missions: z.string().trim().min(1, "Indiquez au moins une mission."),
  order: z.coerce.number().int().default(0),
  published: z.coerce.boolean(),
});
