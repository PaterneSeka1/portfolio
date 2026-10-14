import { z } from "zod";

export const SKILL_CATEGORIES = ["Frontend", "Backend", "Données", "Infrastructure", "Intégration IA", "Mobile", "Outils"];

export const skillSchema = z.object({
  name: z.string().trim().min(1, "Indiquez le nom de la technologie.").max(60, "Le nom est trop long."),
  category: z.string().trim().min(2, "Choisissez ou saisissez une catégorie.").max(40, "La catégorie est trop longue."),
  visible: z.boolean(),
  learning: z.boolean(),
});
