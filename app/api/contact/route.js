import { NextResponse } from "next/server";
import nodemailer from "nodemailer";
import { contactSchema } from "../../../lib/validation/contact";
import { createContactMessage } from "../../../lib/db/contact";
import { getDictionary } from "../../../lib/i18n";

const escapeHtml = (value = "") =>
  String(value)
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");

export async function POST(req) {
  let body;
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ message: "Requête invalide" }, { status: 400 });
  }

  const parsed = contactSchema.safeParse(body);
  if (!parsed.success) {
    return NextResponse.json(
      { message: "Données invalides", errors: parsed.error.flatten().fieldErrors },
      { status: 400 }
    );
  }

  // Honeypot: a filled hidden field means the submission came from a bot.
  if (parsed.data.website) {
    return NextResponse.json({ message: "Message envoyé" }, { status: 200 });
  }

  const { name, email, company, projectType, message, project, locale } = parsed.data;
  // Stored with the French label so the admin inbox stays readable.
  const projectTypeLabel = getDictionary("fr").contact.projectTypes[projectType] ?? projectType;
  const fullMessage = project ? `[${project}] ${message}` : message;

  try {
    await createContactMessage({ name, email, company, projectType: projectTypeLabel, message: fullMessage });
  } catch (error) {
    console.error("Contact message could not be stored:", error);
    return NextResponse.json({ message: "Échec de l'envoi du message" }, { status: 500 });
  }

  if (process.env.EMAIL_USER && process.env.EMAIL_PASS) {
    try {
      const transporter = nodemailer.createTransport({
        service: "gmail",
        auth: { user: process.env.EMAIL_USER, pass: process.env.EMAIL_PASS },
      });

      await transporter.sendMail({
        from: `Portfolio <${process.env.EMAIL_USER}>`,
        replyTo: email,
        to: process.env.EMAIL_USER,
        subject: `Nouvelle demande de contact — ${name.replace(/[\r\n]+/g, " ")}`,
        text: [
          `Nom : ${name}`,
          `E-mail : ${email}`,
          `Entreprise : ${company || "—"}`,
          `Type de projet : ${projectTypeLabel}`,
          `Projet cité : ${project || "—"}`,
          `Langue : ${locale || "fr"}`,
          "",
          message,
        ].join("\n"),
        html: `
          <h2>Nouvelle demande de contact</h2>
          <p><strong>Nom :</strong> ${escapeHtml(name)}</p>
          <p><strong>E-mail :</strong> ${escapeHtml(email)}</p>
          <p><strong>Entreprise :</strong> ${escapeHtml(company || "—")}</p>
          <p><strong>Type de projet :</strong> ${escapeHtml(projectTypeLabel)}</p>
          <p><strong>Projet cité :</strong> ${escapeHtml(project || "—")}</p>
          <p><strong>Langue :</strong> ${escapeHtml(locale || "fr")}</p>
          <p><strong>Message :</strong></p>
          <p style="white-space:pre-line">${escapeHtml(message)}</p>
        `,
      });
    } catch (error) {
      // The message is already saved in the admin inbox: do not fail the request.
      console.error("Contact notification email failed:", error);
    }
  }

  return NextResponse.json({ message: "Message envoyé" }, { status: 200 });
}
