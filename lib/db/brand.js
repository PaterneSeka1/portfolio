import { prisma } from "../prisma";

export async function getBrandSettings() {
  return prisma.brandSettings.findUnique({ where: { id: "brand" } });
}
