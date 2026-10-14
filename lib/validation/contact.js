import { z } from "zod";

/** Project type keys; labels come from the i18n dictionaries (contact.projectTypes). */
export const projectTypeKeys = ["business", "saas", "website", "ai", "api", "other"];

const defaultMessages = {
  name: "Votre nom doit contenir au moins 2 caractères.",
  email: "Adresse e-mail invalide.",
  projectType: "Sélectionnez un type de projet.",
  message: "Votre message doit contenir au moins 10 caractères.",
};

/** Same rules on the client (localised messages) and on the server. */
export function createContactSchema(messages = defaultMessages) {
  return z.object({
    name: z.string().trim().min(2, messages.name).max(120, messages.name),
    company: z.string().trim().max(160).optional().or(z.literal("")),
    email: z.string().trim().email(messages.email).max(200, messages.email),
    projectType: z.enum(projectTypeKeys, { message: messages.projectType }),
    message: z.string().trim().min(10, messages.message).max(5000),
    // Honeypot: must stay empty (hidden from real users).
    website: z.string().trim().max(0).optional().or(z.literal("")),
    locale: z.enum(["fr", "en"]).optional(),
    project: z.string().trim().max(80).optional().or(z.literal("")),
  });
}

export const contactSchema = createContactSchema();
