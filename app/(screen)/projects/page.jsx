/* eslint-disable @next/next/no-img-element */
"use client";

import { motion } from "framer-motion";
import { FaGithub } from "react-icons/fa";
import { useThemeStore } from "../../store/themeStore";

export default function Projects() {
  const { theme } = useThemeStore();

  const projects = [
    {
      title: "Portfolio Paterne SEKA",
      description:
        "Mon portfolio personnel développé avec Next.js, TailwindCSS et Framer Motion.",
      tech: ["Next.js", "TailwindCSS", "Framer Motion"],
      image: "/projects/portfolio.png",
      live: "https://paternefolio.vercel.app/",
      github: "https://github.com/PaterneSeka1/portfolio",
    },
    {
      title: "PostIt Board",
      description:
        "Une application de tableau collaboratif pour partager des idées et des notes en temps réel.",
      tech: ["Vue Js", "TailwindCSS"],
      image: "/projects/postIT.jpg",
      live: "https://resilient-crisp-06b2d0.netlify.app/",
      github: "",
    },
    {
      title: "Tableau de bord",
      description: "Créer et afficher des widgets",
      tech: ["Next.js", "Prisma", "TailwindCSS"],
      image: "/projects/ecommerce.png",
      live: "",
      github: "",
    },
    {
      title: "Showtime",
      description:
        "Utilisation de l&apos;API Rotten Tomatoes pour afficher les notes de films et séries.",
      tech: ["NestJS", "Prisma"],
      image: "/projects/chat_app.png",
      live: "",
      github: "",
    },
  ];

  const placeholder = "/projects/placeholder.png";

  return (
    <main
      className={`relative transition-colors duration-700
        ${theme === "dark"
          ? "bg-gradient-to-b from-gray-900 to-black text-white"
          : "bg-gradient-to-b from-slate-200 via-slate-100 to-slate-200 text-slate-900"
        }`}
    >
      <section className="section-wrap mt-2 space-y-10">
        <div className="soft-card rounded-3xl px-6 py-8 text-center md:px-10">
          <h1 className="text-4xl md:text-5xl font-extrabold mb-4">
            Mes projets
          </h1>
          <p
            className={`text-lg ${
              theme === "dark" ? "text-slate-300" : "text-slate-600"
            }`}
          >
            Voici une sélection de projets sur lesquels j&apos;ai travaillé récemment.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-10">
          {projects.map((project, index) => {
            const hasImage = !!project.image;
            const hasLive = !!project.live;
            const hasGithub = !!project.github;

            return (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20, scale: 0.95 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                transition={{
                  type: "spring",
                  stiffness: 120,
                  damping: 12,
                  delay: index * 0.15,
                }}
                whileHover={{
                  translateY: -5,
                  boxShadow:
                    theme === "dark"
                      ? "0 8px 25px rgba(0,0,0,0.5)"
                      : "0 8px 25px rgba(0,0,0,0.1)",
                }}
                className={`soft-card rounded-xl overflow-hidden transition-all duration-300
                    ${theme === "dark" ? "bg-gray-800/70" : "bg-white/90"}`}
              >
                <img
                  src={hasImage ? project.image : placeholder}
                  alt={project.title}
                  className="w-full h-48 object-cover"
                />

                <div className="p-5">
                  <h3 className="text-xl font-semibold mb-2">{project.title}</h3>
                  <p
                    className={`text-sm mb-4 ${
                      theme === "dark" ? "text-slate-300" : "text-slate-600"
                    }`}
                  >
                    {project.description}
                  </p>

                  <div className="flex flex-wrap gap-2 mb-5">
                    {project.tech.map((tech, i) => (
                      <span
                        key={i}
                        className={`px-3 py-1 text-xs rounded-full ${
                          theme === "dark"
                            ? "bg-sky-500/20 text-sky-300"
                            : "bg-sky-100 text-sky-700"
                        }`}
                      >
                        {tech}
                      </span>
                    ))}
                  </div>

                  <div className="flex justify-between items-center">
                    <a
                      href={hasLive ? project.live : undefined}
                      target="_blank"
                      rel="noopener noreferrer"
                      className={`px-4 py-2 rounded-md font-semibold text-white transition-colors
                        ${
                          hasLive
                            ? "bg-sky-600 hover:bg-sky-700"
                            : "bg-gray-300 cursor-not-allowed dark:bg-gray-700 dark:text-gray-400"
                        }`}
                    >
                      Démo en ligne
                    </a>

                    {hasGithub ? (
                      <a
                        href={project.github}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-gray-800 dark:text-white hover:text-sky-400"
                      >
                        <FaGithub size={32} />
                      </a>
                    ) : (
                      <FaGithub size={32} className="text-gray-400" />
                    )}
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>
      </section>
    </main>
  );
}
