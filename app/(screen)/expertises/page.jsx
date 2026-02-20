'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { FaGraduationCap, FaBriefcase } from 'react-icons/fa'
import { useThemeStore } from '../../store/themeStore'

export default function FormationExperiences() {
  const { theme } = useThemeStore()
  const [activeTab, setActiveTab] = useState("experience")

  const formations = [
    {
      title: "Étudiant Développeur Web & Mobile",
      school: "We.Code - Epitech",
      year: "En cours",
      description: "Spécialisation en développement web et mobile.",
      icon: <FaGraduationCap size={20} />
    },
    {
      title: "Étudiant Développeur",
      school: "Université Virtuelle de Côte d'Ivoire",
      year: "En cours",
      description: "Études en Développement d'Applications et e-Services (DAS).",
      icon: <FaGraduationCap size={20} />
    },
    {
      title: "Formation Développeur Web Junior",
      school: "Start Up Academy",
      year: "Août - Sept 2022",
      description: "Formation aux technologies web : HTML, CSS et JavaScript.",
      icon: <FaGraduationCap size={20} />
    },
    {
      title: "Baccalauréat",
      school: "Groupe Sainte Foi Abidjan (GSFA)",
      year: "2021",
      description: "Série scientifique (Série D).",
      icon: <FaGraduationCap size={20} />
    }
  ]

  const experiences = [
    {
      title: "Stagiaire Développeur Full-Stack",
      company: "Worldev",
      year: "Fév - Mai 2025",
      description: "Développement d'applications web avec Laravel.",
      icon: <FaBriefcase size={20} />
    },
    {
      title: "Développeur Web Freelance",
      company: "Freelance",
      year: "Juin - Août 2024",
      description: "Création de sites web pour des églises via WordPress.",
      icon: <FaBriefcase size={20} />
    },
    {
      title: "Stagiaire Développeur Frontend",
      company: "Start Up Academy",
      year: "Sept 2022 - Jan 2023",
      description: "Création de landing pages pour des petites entreprises.",
      icon: <FaBriefcase size={20} />
    }
  ]

  return (
    <main
      className={`transition-colors duration-700 ${
        theme === 'dark'
          ? 'bg-gradient-to-b from-gray-900 to-black text-white'
          : 'bg-gradient-to-b from-slate-200 via-slate-100 to-slate-200 text-slate-900'
      }`}
    >
      <div className="section-wrap mt-2 mb-10 soft-card rounded-3xl px-6 py-8 text-center md:px-10">
        <h1 className="text-4xl md:text-5xl font-extrabold">
          Formation et expérience
        </h1>
        <p className={`mt-2 text-lg ${theme === 'dark' ? 'text-slate-300' : 'text-slate-600'}`}>
          Parcours académique et expérience professionnelle.
        </p>
      </div>

      <div className="flex justify-center mb-10">
        <div className="flex bg-gray-200 dark:bg-gray-800 p-2 rounded-full">
          <button
            onClick={() => setActiveTab("experience")}
            className={`px-6 py-2 rounded-full font-semibold transition-all ${
              activeTab === "experience"
                ? "bg-sky-600 text-white scale-105"
                : "text-slate-600 dark:text-slate-300"
            }`}
          >
            Expérience
          </button>

          <button
            onClick={() => setActiveTab("training")}
            className={`px-6 py-2 rounded-full font-semibold transition-all ${
              activeTab === "training"
                ? "bg-sky-600 text-white scale-105"
                : "text-slate-600 dark:text-slate-300"
            }`}
          >
            Formation
          </button>
        </div>
      </div>

      <section className="section-wrap max-w-4xl">

        {activeTab === "experience" && (
          <motion.div
            key="experience"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
            className="space-y-10 relative border-l-4 border-sky-600 ml-4"
          >
            {experiences.map((exp, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.15 }}
                className="relative pl-10"
              >
                <div className="absolute -left-5 top-1 w-10 h-10 rounded-full bg-sky-600 flex items-center justify-center text-white">
                  {exp.icon}
                </div>

                <div
                  className={`p-5 rounded-xl transition-all hover:scale-[1.02] ${
                    theme === 'dark' ? 'bg-gray-800/80' : 'bg-white/88'
                  }`}
                >
                  <h3 className="text-xl font-semibold">{exp.title}</h3>
                  <p className="text-sm text-gray-400">
                    {exp.company} • {exp.year}
                  </p>
                  <p className={`mt-2 ${theme === 'dark' ? 'text-slate-300' : 'text-slate-600'}`}>
                    {exp.description}
                  </p>
                </div>
              </motion.div>
            ))}
          </motion.div>
        )}

        {activeTab === "training" && (
          <motion.div
            key="training"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
            className="space-y-10 relative border-l-4 border-sky-600 ml-4"
          >
            {formations.map((f, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.15 }}
                className="relative pl-10"
              >
                <div className="absolute -left-5 top-1 w-10 h-10 rounded-full bg-sky-600 flex items-center justify-center text-white">
                  {f.icon}
                </div>

                <div
                  className={`p-5 rounded-xl transition-all hover:scale-[1.02] ${
                    theme === 'dark' ? 'bg-gray-800/80' : 'bg-white/88'
                  }`}
                >
                  <h3 className="text-xl font-semibold">{f.title}</h3>
                  <p className="text-sm text-gray-400">
                    {f.school} • {f.year}
                  </p>
                  <p className={`mt-2 ${theme === 'dark' ? 'text-slate-300' : 'text-slate-600'}`}>
                    {f.description}
                  </p>
                </div>
              </motion.div>
            ))}
          </motion.div>
        )}

      </section>
    </main>
  )
}
