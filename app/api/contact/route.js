import { NextResponse } from "next/server";
import nodemailer from "nodemailer";
import { contactSchema } from "../../../lib/validation/contact";
import { createContactMessage } from "../../../lib/db/contact";

export async function POST(req) {
  try {
    const body = await req.json();
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

    const { name, email, company, phone, projectType, budget, timeline, message } = parsed.data;

    await createContactMessage(parsed.data);

    if (process.env.EMAIL_USER && process.env.EMAIL_PASS) {
      const transporter = nodemailer.createTransport({
        service: "gmail",
        auth: {
          user: process.env.EMAIL_USER,
          pass: process.env.EMAIL_PASS,
        },
      });

      await transporter.sendMail({
        from: `${name} <${process.env.EMAIL_USER}>`,
        replyTo: email,
        to: process.env.EMAIL_USER,
        subject: `Nouvelle demande de contact — ${name}`,
        html: `
          <h2>Nouvelle demande de contact</h2>
          <p><strong>Nom :</strong> ${name}</p>
          <p><strong>Email :</strong> ${email}</p>
          <p><strong>Entreprise :</strong> ${company || "—"}</p>
          <p><strong>Téléphone :</strong> ${phone || "—"}</p>
          <p><strong>Type de projet :</strong> ${projectType}</p>
          <p><strong>Budget :</strong> ${budget || "—"}</p>
          <p><strong>Délai :</strong> ${timeline}</p>
          <p><strong>Message :</strong></p>
          <p>${message}</p>
        `,
      });
    }

    return NextResponse.json({ message: "Message envoyé" }, { status: 200 });
  } catch (error) {
    console.error("Error sending contact message:", error);
    return NextResponse.json(
      { message: "Échec de l'envoi du message", error: error?.message },
      { status: 500 }
    );
  }
}
