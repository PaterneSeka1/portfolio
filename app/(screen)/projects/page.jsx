/* eslint-disable @next/next/no-img-element */
"use client";

import { motion } from "framer-motion";
import { FaGithub } from "react-icons/fa";
import { useThemeStore } from "../../store/themeStore";

export default function Projects() {
  const { theme } = useThemeStore();

  const projects = [
    {
      title: "Paterne SEKA Portfolio",
      description:
        "My personal portfolio developed with Next.js, TailwindCSS, and Framer Motion.",
      tech: ["Next.js", "TailwindCSS", "Framer Motion"],
      image: "/projects/portfolio.png",
      live: "https://paternefolio.vercel.app/",
      github: "https://github.com/PaterneSeka1/portfolio",
    },
    {
      title: "PostIt Board",
      description:
        "A collaborative board application to share ideas and notes in real-time.",
      tech: ["Vue Js", "TailwindCSS"],
      image: "/projects/postIT.jpg",
      live: "https://resilient-crisp-06b2d0.netlify.app/",
      github: "",
    },
    {
      title: "Dashboard",
      description: "Create a widget and display",
      tech: ["Next.js", "Prisma", "TailwindCSS"],
      image: "/projects/ecommerce.png",
      live: "",
      github: "",
    },
    {
      title: "Showtime",
      description:
        "Using Rotten Tomatoes API to display movies and series ratings.",
      tech: ["NestJS", "Prisma"],
      image: "/projects/chat_app.png",
      live: "",
      github: "",
    },
  ];

  const placeholder = "/projects/placeholder.png";

  return (
    <main
      className={`relative flex min-h-screen flex-col items-center justify-center px-6 py-12 transition-colors duration-700
        ${theme === "dark"
          ? "bg-gradient-to-b from-gray-900 to-black text-white"
          : "bg-gradient-to-b from-gray-100 to-white text-gray-900"
        }`}
    >
      <section className="w-full max-w-6xl mt-16 space-y-10">
        <div className="text-center">
          <h1 className="text-4xl md:text-5xl font-extrabold mb-4">
            My Projects
          </h1>
          <p
            className={`text-lg ${
              theme === "dark" ? "text-gray-300" : "text-gray-700"
            }`}
          >
            Here is a selection of projects I have worked on recently.
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
                className={`rounded-xl overflow-hidden shadow-lg transition-all duration-300 
                    ${theme === "dark" ? "bg-gray-800" : "bg-white"}`}
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
                      theme === "dark" ? "text-gray-300" : "text-gray-700"
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
                            ? "bg-indigo-500/20 text-indigo-300"
                            : "bg-blue-100 text-blue-600"
                        }`}
                      >
                        {tech}
                      </span>
                    ))}
                  </div>

                  <div className="flex justify-between items-center">
                    {/* Live Demo Button */}
                    <a
                      href={hasLive ? project.live : undefined}
                      target="_blank"
                      rel="noopener noreferrer"
                      className={`px-4 py-2 rounded-md font-semibold text-white transition-colors
                        ${
                          hasLive
                            ? "bg-green-600 hover:bg-green-700"
                            : "bg-gray-300 cursor-not-allowed dark:bg-gray-700 dark:text-gray-400"
                        }`}
                    >
                      Live Demo
                    </a>

                    {/* GitHub */}
                    {hasGithub ? (
                      <a
                        href={project.github}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-gray-800 dark:text-white hover:text-blue-400"
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
