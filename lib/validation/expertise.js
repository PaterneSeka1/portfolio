import { z } from "zod";

export const ICONS = ["LayoutTemplate", "Server", "Database", "Network", "Rocket", "Radio", "Layers", "Handshake"];

export const expertiseSchema = z.object({
  title: z.string().trim().min(2, "Le titre est requis."),
  description: z.string().trim().min(10, "La description est trop courte."),
  icon: z.enum(ICONS, { message: "Icône invalide." }),
  technologies: z.string().trim().min(1, "Indiquez au moins une technologie."),
  order: z.coerce.number().int().default(0),
  visible: z.coerce.boolean(),
});
