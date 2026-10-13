import { prisma } from "../prisma";
import { localize } from "../i18n/localize";

/** Raw profile (admin). */
export async function getProfile() {
  return prisma.profile.findUnique({ where: { id: "profile" } });
}

/** Profile translated for a public locale. */
export async function getLocalizedProfile(locale) {
  return localize(await getProfile(), locale);
}
