"use server";

import { cookies, headers } from "next/headers";
import { redirect } from "next/navigation";
import bcrypt from "bcryptjs";
import { z } from "zod";
import { prisma } from "../prisma";
import { createSessionToken, SESSION_COOKIE, SESSION_MAX_AGE } from "./session";
import { checkLoginThrottle, clearLoginFailures, recordLoginFailure } from "./throttle";
import { requireAdmin as requireAdminSession } from "./current-user";

const loginSchema = z.object({
  email: z.string().trim().email("Saisissez une adresse e-mail valide."),
  password: z.string().min(1, "Saisissez votre mot de passe."),
});

// Compared against when the e-mail is unknown, so response time does not reveal which accounts exist.
const DUMMY_HASH = "$2b$12$2ihpoZxqasm1PLjQPGDd4eyfJdDS84k/pku9.fC48rxVx.aEvw1O2";

/** Only allow redirects back inside the admin. */
function safeNext(value) {
  const next = typeof value === "string" ? value : "";
  return next.startsWith("/admin") && !next.startsWith("//") && !next.startsWith("/admin/login") ? next : "/admin";
}

export async function loginAction(prevState, formData) {
  const email = String(formData.get("email") ?? "");
  const parsed = loginSchema.safeParse({ email, password: formData.get("password") });

  if (!parsed.success) {
    const errors = parsed.error.flatten().fieldErrors;
    return { email, fieldErrors: { email: errors.email?.[0], password: errors.password?.[0] } };
  }

  const requestHeaders = await headers();
  const ip = requestHeaders.get("x-forwarded-for")?.split(",")[0]?.trim() || "local";
  const throttleKey = `${ip}:${parsed.data.email.toLowerCase()}`;
  const wait = checkLoginThrottle(throttleKey);
  if (wait > 0) {
    return {
      email,
      error: `Trop de tentatives. Réessayez dans ${Math.ceil(wait / 60)} minute${wait > 60 ? "s" : ""}.`,
    };
  }

  const user = await prisma.user.findUnique({ where: { email: parsed.data.email } });
  const valid = await bcrypt.compare(parsed.data.password, user?.passwordHash ?? DUMMY_HASH);

  if (!user || !valid) {
    recordLoginFailure(throttleKey);
    return { email, error: "E-mail ou mot de passe incorrect." };
  }

  clearLoginFailures(throttleKey);
  const token = await createSessionToken(user);
  const cookieStore = await cookies();
  cookieStore.set(SESSION_COOKIE, token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    path: "/",
    maxAge: SESSION_MAX_AGE,
  });

  redirect(safeNext(formData.get("next")));
}

export async function logoutAction() {
  const cookieStore = await cookies();
  cookieStore.delete(SESSION_COOKIE);
  redirect("/admin/login?logout=1");
}

const passwordSchema = z
  .object({
    current: z.string().min(1, "Saisissez votre mot de passe actuel."),
    next: z.string().min(12, "Le nouveau mot de passe doit contenir au moins 12 caractères."),
    confirm: z.string(),
  })
  .refine((data) => data.next === data.confirm, { path: ["confirm"], message: "Les deux mots de passe ne correspondent pas." })
  .refine((data) => data.next !== data.current, { path: ["next"], message: "Choisissez un mot de passe différent de l'actuel." });

export async function changePasswordAction(prevState, formData) {
  const session = await requireAdminSession();
  const parsed = passwordSchema.safeParse({
    current: formData.get("current") ?? "",
    next: formData.get("next") ?? "",
    confirm: formData.get("confirm") ?? "",
  });
  if (!parsed.success) {
    const fieldErrors = Object.fromEntries(
      Object.entries(parsed.error.flatten().fieldErrors).map(([key, messages]) => [key, messages?.[0]])
    );
    return { error: "Le mot de passe n'a pas été modifié.", fieldErrors, at: Date.now() };
  }

  const user = await prisma.user.findUnique({ where: { id: session.id } });
  const valid = user ? await bcrypt.compare(parsed.data.current, user.passwordHash) : false;
  if (!valid) {
    return { error: "Le mot de passe n'a pas été modifié.", fieldErrors: { current: "Mot de passe actuel incorrect." }, at: Date.now() };
  }

  await prisma.user.update({ where: { id: user.id }, data: { passwordHash: await bcrypt.hash(parsed.data.next, 12) } });
  return { success: true, message: "Mot de passe modifié.", at: Date.now() };
}
