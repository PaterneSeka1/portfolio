/* eslint-disable @next/next/no-img-element */
"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import Navbar from "../components/Navbar";
import VideoModal from "../components/VideoModal";
import { FaGithub } from "react-icons/fa";

// Typage du thème
type Theme = "dark" | "light";

// Typage d'un projet
interface Project {
  title: string;
  description: string;
  tech: string[];
  image?: string;
  video?: string;
  github?: string;
}

export default function Projects() {
  const [theme, setTheme] = useState<Theme>("dark");
  const [selectedVideo, setSelectedVideo] = useState<string | null>(null);

  useEffect(() => {
    const savedTheme = localStorage.getItem("theme") as Theme | null;
    const initialTheme: Theme = savedTheme === "light" ? "light" : "dark";
    setTheme(initialTheme);
    document.documentElement.classList.toggle("dark", initialTheme === "dark");
  }, []);

  const toggleTheme = () => {
    const newTheme: Theme = theme === "dark" ? "light" : "dark";
    setTheme(newTheme);
    document.documentElement.classList.toggle("dark", newTheme === "dark");
    localStorage.setItem("theme", newTheme);
  };

  const projects: Project[] = [
    {
      title: "Portfolio Paterne SEKA",
      description:
        "Mon portfolio personnel développé avec Next.js, TailwindCSS et Framer Motion.",
      tech: ["Next.js", "TailwindCSS", "Framer Motion"],
      image: "/projects/portfolio.png",
      video: "/projects/portfolio.mp4",
      github: "https://github.com/tonprofil/portfolio",
    },
    // Ajoutez d'autres projets ici
  ];

  return (
    <main
      className={`relative flex min-h-screen flex-col items-center justify-center px-6 py-12 transition-colors duration-700
        ${theme === "dark"
          ? "bg-gradient-to-b from-gray-900 to-black text-white"
          : "bg-gradient-to-b from-gray-100 to-white text-gray-900"
        }`}
    >
      <Navbar theme={theme} toggleTheme={toggleTheme} />

      <section className="w-full max-w-6xl mt-16 space-y-16">
        <div className="text-center">
          <h1 className="text-4xl md:text-5xl font-extrabold mb-4">Mes Projets</h1>
          <p className={`text-lg ${theme === "dark" ? "text-gray-300" : "text-gray-700"}`}>
            Voici une sélection de projets que j’ai réalisés récemment.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-10">
          {projects.map((project, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              transition={{ type: "spring", stiffness: 120, damping: 12, delay: index * 0.2 }}
              whileHover={{ scale: 1.03 }}
              className={`rounded-xl overflow-hidden shadow-lg transition-all duration-300 cursor-pointer
                ${theme === "dark" ? "bg-gray-800" : "bg-white"}`}
            >
              {project.image && (
                <img
                  src={project.image}
                  alt={project.title}
                  className="w-full h-48 object-cover"
                />
              )}

              <div className="p-5">
                <h3 className="text-xl font-semibold mb-2">{project.title}</h3>
                <p className={`text-sm mb-4 ${theme === "dark" ? "text-gray-300" : "text-gray-700"}`}>
                  {project.description}
                </p>

                <div className="flex flex-wrap gap-2 mb-4">
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
                  {project.video && (
                    <button
                      className="bg-green-500 hover:bg-blue-600 text-white font-semibold px-4 py-2 rounded-md shadow-md transition-colors"
                      onClick={() => setSelectedVideo(project.video!)}
                    >
                      démo
                    </button>
                  )}

                  {project.github && (
                    <a
                      href={project.github}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-gray-100 dark:text-white hover:text-blue-400"
                    >
                      <FaGithub size={35} />
                    </a>
                  )}
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Modal vidéo */}
      <VideoModal
        videoSrc={selectedVideo || ""}
        isOpen={!!selectedVideo}
        onClose={() => setSelectedVideo(null)}
      />
    </main>
  );
}
