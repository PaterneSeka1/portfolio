import { prisma } from "../prisma";

export async function createContactMessage(data) {
  return prisma.contactMessage.create({
    data: {
      name: data.name,
      email: data.email,
      company: data.company || null,
      phone: data.phone || null,
      projectType: data.projectType,
      budget: data.budget || null,
      timeline: data.timeline,
      message: data.message,
    },
  });
}
