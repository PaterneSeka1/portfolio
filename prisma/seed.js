import bcrypt from "bcryptjs";
import { prisma } from "../lib/prisma.js";
import { profile } from "../lib/data/profile.js";
import { expertises } from "../lib/data/expertises.js";
import { experiences } from "../lib/data/experiences.js";
import { projects } from "../lib/data/projects.js";
import { skills } from "../lib/data/skills.js";

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
    create: { id: "brand", logoUrl: "/logo-ps.png" },
  });
}

const SEO_TITLE = "Paterne SEKA — Full-Stack Engineer & Business Applications Developer";
const SEO_DESCRIPTION =
  "Paterne SEKA, Full-Stack Engineer basé à Abidjan. Conception et développement d'applications métier et de solutions digitales, de l'analyse du besoin jusqu'à la mise en production.";

async function seedSiteSettings() {
  await prisma.siteSettings.upsert({
    where: { id: "site" },
    update: { seoTitle: SEO_TITLE, seoDescription: SEO_DESCRIPTION },
    create: {
      id: "site",
      seoTitle: SEO_TITLE,
      seoDescription: SEO_DESCRIPTION,
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
      en: item.en ?? undefined,
    })),
  });
}

async function seedSkills() {
  await prisma.skill.deleteMany();
  await prisma.skill.createMany({
    data: skills.map((skill, index) => ({
      category: skill.category,
      name: skill.name,
      learning: skill.learning,
      order: index,
      visible: true,
      en: skill.en,
    })),
  });
}

async function seedExperiences() {
  await prisma.experience.deleteMany();
  await prisma.experience.createMany({
    data: experiences.map((exp, index) => ({
      company: exp.company,
      role: exp.role,
      period: exp.period,
      missions: exp.missions,
      startDate: exp.startDate ?? null,
      endDate: exp.endDate ?? null,
      current: exp.current ?? false,
      location: exp.location ?? null,
      description: exp.description ?? null,
      technologies: exp.technologies ?? [],
      order: index,
      published: true,
      en: exp.en ?? undefined,
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
        featured: project.featured ?? false,
        order: index,
        status: "published",
        seoTitle: project.seoTitle ?? null,
        seoDescription: project.seoDescription ?? null,
        caseStudy: project.caseStudy,
        en: project.en ?? undefined,
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
