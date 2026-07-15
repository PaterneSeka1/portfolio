import bcrypt from "bcryptjs";
import { prisma } from "../lib/prisma.js";
import { profile } from "../lib/data/profile.js";
import { expertises } from "../lib/data/expertises.js";
import { experiences } from "../lib/data/experiences.js";
import { projects } from "../lib/data/projects.js";

async function seedProfile() {
  await prisma.profile.upsert({
    where: { id: "profile" },
    update: { ...profile },
    create: { id: "profile", ...profile },
  });
}

async function seedBrandSettings() {
  await prisma.brandSettings.upsert({
    where: { id: "brand" },
    update: {},
    create: { id: "brand" },
  });
}

async function seedSiteSettings() {
  await prisma.siteSettings.upsert({
    where: { id: "site" },
    update: {},
    create: {
      id: "site",
      seoTitle: `${profile.name} — ${profile.title}`,
      seoDescription: profile.promise,
      contactEmail: profile.email,
      contactPhone: profile.phone,
    },
  });
}

async function seedExpertises() {
  await prisma.expertise.deleteMany();
  await prisma.expertise.createMany({
    data: expertises.map((item, index) => ({
      title: item.title,
      description: item.description,
      icon: item.icon,
      technologies: item.technologies,
      order: index,
      visible: true,
    })),
  });
}

async function seedSkills() {
  await prisma.skill.deleteMany();
  const skills = expertises.flatMap((item) =>
    item.technologies.map((name, index) => ({
      category: item.title,
      name,
      order: index,
      visible: true,
    }))
  );
  await prisma.skill.createMany({ data: skills });
}

async function seedExperiences() {
  await prisma.experience.deleteMany();
  await prisma.experience.createMany({
    data: experiences.map((exp, index) => ({
      company: exp.company,
      role: exp.role,
      period: exp.period,
      missions: exp.missions,
      order: index,
      published: true,
    })),
  });
}

async function seedProjects() {
  await prisma.projectImage.deleteMany();
  await prisma.project.deleteMany();

  for (const [index, project] of projects.entries()) {
    await prisma.project.create({
      data: {
        slug: project.slug,
        title: project.title,
        category: project.category,
        visibility: project.visibility,
        summary: project.summary,
        technologies: project.technologies,
        publicUrl: project.publicUrl ?? null,
        githubUrl: project.githubUrl ?? null,
        ctaLabel: project.cta.label,
        ctaHref: project.cta.href,
        order: index,
        published: true,
        caseStudy: project.caseStudy,
      },
    });
  }
}

async function seedAdminUser() {
  const email = process.env.ADMIN_EMAIL;
  const password = process.env.ADMIN_PASSWORD;

  if (!email || !password) {
    console.warn("ADMIN_EMAIL / ADMIN_PASSWORD absents : compte administrateur non créé.");
    return;
  }

  const passwordHash = await bcrypt.hash(password, 12);
  await prisma.user.upsert({
    where: { email },
    update: { passwordHash },
    create: { email, passwordHash },
  });
}

async function main() {
  await seedProfile();
  await seedBrandSettings();
  await seedSiteSettings();
  await seedExpertises();
  await seedSkills();
  await seedExperiences();
  await seedProjects();
  await seedAdminUser();
  console.log("Seed terminé.");
}

main()
  .catch((error) => {
    console.error(error);
    process.exitCode = 1;
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
