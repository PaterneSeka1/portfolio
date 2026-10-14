import { z } from "zod";

// Must match the icons rendered by app/_components/ui.jsx.
export const ICONS = [
  { value: "Building2", label: "Applications métier" },
  { value: "Network", label: "Architecture" },
  { value: "Plug", label: "API / intégration" },
  { value: "Database", label: "Données" },
  { value: "Server", label: "Infrastructure" },
  { value: "Sparkles", label: "IA" },
  { value: "LayoutDashboard", label: "Plateforme" },
  { value: "LayoutTemplate", label: "Frontend" },
  { value: "Rocket", label: "Déploiement" },
  { value: "Radio", label: "Temps réel" },
  { value: "Layers", label: "SaaS" },
  { value: "Handshake", label: "Conseil" },
];

export const expertiseSchema = z.object({
  title: z.string().trim().min(3, "Le titre doit contenir au moins 3 caractères (ex. « Architecture de données »)."),
  description: z
    .string()
    .trim()
    .min(20, "Décrivez l'expertise en une phrase d'au moins 20 caractères.")
    .max(300, "La description est trop longue (300 caractères maximum)."),
  icon: z.enum(ICONS.map((icon) => icon.value), { message: "Choisissez une icône." }),
  technologies: z.string().trim().min(1, "Ajoutez au moins une technologie liée à cette expertise."),
  visible: z.boolean(),
});
