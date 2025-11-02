/* eslint-disable react/no-unescaped-entities */
"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import Navbar from "./(screen)/components/Navbar";

export default function Home() {
  // Lazy initialization pour éviter l'usage de useEffect pour le thème
  const [theme, setTheme] = useState(() => {
    if (typeof window !== "undefined") {
      return localStorage.getItem("theme") || "dark";
    }
    return "dark";
  });

  // Synchroniser le thème avec le DOM dès le rendu
  useEffect(() => {
    document.documentElement.classList.toggle("dark", theme === "dark");
  }, [theme]);

  const toggleTheme = () => {
    const newTheme = theme === "dark" ? "light" : "dark";
    setTheme(newTheme);
    localStorage.setItem("theme", newTheme);
  };

  return (
    <main
      className={`relative flex min-h-screen flex-col items-center justify-center overflow-hidden px-6 transition-colors duration-700 ${
        theme === "dark"
          ? "bg-gradient-to-b from-gray-900 to-black text-white"
          : "bg-gradient-to-b from-gray-100 to-white text-gray-900"
      }`}
    >
      {/* Navbar */}
      <Navbar theme={theme} toggleTheme={toggleTheme} />

      {/* Fond animé */}
      <motion.div
        className="absolute inset-0 -z-10"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 2 }}
      >
        <div
          className={`absolute top-1/2 left-1/2 w-[1200px] h-[1200px] rounded-full blur-[180px] opacity-25 animate-pulse -translate-x-1/2 -translate-y-1/2 ${
            theme === "dark" ? "bg-indigo-600" : "bg-blue-300"
          }`}
        />
      </motion.div>

      {/* Titre principal */}
      <motion.h1
        initial={{ opacity: 0, y: -50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1 }}
        className="text-5xl md:text-7xl font-extrabold mb-4 text-center"
      >
        Bienvenue sur mon portfolio, je suis
        <br />
        <span
          className={`text-transparent bg-clip-text bg-gradient-to-r ${
            theme === "dark"
              ? "from-blue-400 to-green-500"
              : "from-blue-600 to-green-700"
          }`}
        >
          Paterne SEKA
        </span>
      </motion.h1>

      {/* Sous-titre */}
      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.4, duration: 1 }}
        className={`text-lg md:text-xl mb-8 text-center max-w-2xl ${
          theme === "dark" ? "text-gray-300" : "text-gray-700"
        }`}
      >
        Développeur full stack passionné par la création d'expériences web
        innovantes et performantes.
      </motion.p>

      {/* Bouton vers les projets */}
      <motion.a
        href="projects"
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        className={`px-6 py-3 rounded-lg font-medium transition-all shadow-lg ${
          theme === "dark"
            ? "bg-blue-500 hover:bg-green-600 text-white"
            : "bg-blue-600 hover:bg-green-500 text-white"
        }`}
      >
        Voir mes projets
      </motion.a>
    </main>
  );
}
