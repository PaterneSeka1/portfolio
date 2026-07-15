import { z } from "zod";

export const skillSchema = z.object({
  category: z.string().trim().min(2, "La catégorie est requise."),
  name: z.string().trim().min(1, "Le nom est requis."),
  icon: z.string().trim().optional().or(z.literal("")),
  order: z.coerce.number().int().default(0),
  visible: z.coerce.boolean(),
});
