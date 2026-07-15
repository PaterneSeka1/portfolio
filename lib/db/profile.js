import { prisma } from "../prisma";

export async function getProfile() {
  return prisma.profile.findUnique({ where: { id: "profile" } });
}
