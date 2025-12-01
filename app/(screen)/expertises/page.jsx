'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { FaGraduationCap, FaBriefcase } from 'react-icons/fa'
import { useThemeStore } from '../../store/themeStore'

export default function FormationExperiences() {
  const { theme } = useThemeStore()
  const [activeTab, setActiveTab] = useState("experience") // valeur par défaut

  const formations = [
    {
      title: "Web & Mobile Developer Student",
      school: "We.Code - Epitech",
      year: "In progress",
      description: "Specialization in web and mobile development.",
      icon: <FaGraduationCap size={20} />
    },
    {
      title: "Developer Student",
      school: "Virtual University of Côte d'Ivoire",
      year: "In progress",
      description: "Studying Application Development and E-Services (DAS).",
      icon: <FaGraduationCap size={20} />
    },
    {
      title: "Junior Web Developer Training",
      school: "Start Up Academy",
      year: "Aug – Sep 2022",
      description: "Training in web technologies: HTML, CSS, and JavaScript.",
      icon: <FaGraduationCap size={20} />
    },
    {
      title: "High School Diploma",
      school: "Groupe Sainte Foi Abidjan (GSFA)",
      year: "2021",
      description: "Science track (Series D).",
      icon: <FaGraduationCap size={20} />
    }
  ]

  const experiences = [
    {
      title: "Full-Stack Developer Intern",
      company: "Worldev",
      year: "Feb – May 2025",
      description: "Developed web applications using Laravel.",
      icon: <FaBriefcase size={20} />
    },
    {
      title: "Freelance Web Developer",
      company: "Freelance",
      year: "Jun – Aug 2024",
      description: "Created websites for churches using WordPress.",
      icon: <FaBriefcase size={20} />
    },
    {
      title: "Frontend Developer Intern",
      company: "Start Up Academy",
      year: "Sep 2022 – Jan 2023",
      description: "Built landing pages for small businesses.",
      icon: <FaBriefcase size={20} />
    }
  ]

  return (
    <main
      className={`min-h-screen px-6 py-16 transition-colors duration-700 ${
        theme === 'dark'
          ? 'bg-gradient-to-b from-gray-900 to-black text-white'
          : 'bg-gradient-to-b from-gray-100 to-white text-gray-900'
      }`}
    >
      <div className="text-center mt-10 mb-10">
        <h1 className="text-4xl md:text-5xl font-extrabold">
          Training & Experience
        </h1>
        <p className={`mt-2 text-lg ${theme === 'dark' ? 'text-gray-300' : 'text-gray-700'}`}>
          Academic background and professional experience.
        </p>
      </div>

      {/* TABS */}
      <div className="flex justify-center mb-10">
        <div className="flex bg-gray-200 dark:bg-gray-800 p-2 rounded-full shadow-lg">
          
          {/* Experience Tab */}
          <button
            onClick={() => setActiveTab("experience")}
            className={`px-6 py-2 rounded-full font-semibold transition-all ${
              activeTab === "experience"
                ? "bg-green-500 text-white shadow-md scale-105"
                : "text-gray-700 dark:text-gray-300"
            }`}
          >
            Experience
          </button>

          {/* Training Tab */}
          <button
            onClick={() => setActiveTab("training")}
            className={`px-6 py-2 rounded-full font-semibold transition-all ${
              activeTab === "training"
                ? "bg-indigo-500 text-white shadow-md scale-105"
                : "text-gray-700 dark:text-gray-300"
            }`}
          >
            Training
          </button>
        </div>
      </div>

      {/* CONTENU DES TABS */}
      <section className="max-w-4xl mx-auto">

        {activeTab === "experience" && (
          <motion.div
            key="experience"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
            className="space-y-10 relative border-l-4 border-green-500 ml-4"
          >
            {experiences.map((exp, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.15 }}
                className="relative pl-10"
              >
                <div className="absolute -left-5 top-1 w-10 h-10 rounded-full bg-green-500 flex items-center justify-center text-white shadow-lg">
                  {exp.icon}
                </div>

                <div
                  className={`p-5 rounded-xl shadow-md transition-all hover:scale-[1.02] ${
                    theme === 'dark' ? 'bg-gray-800' : 'bg-white'
                  }`}
                >
                  <h3 className="text-xl font-semibold">{exp.title}</h3>
                  <p className="text-sm text-gray-400">
                    {exp.company} • {exp.year}
                  </p>
                  <p className={`mt-2 ${theme === 'dark' ? 'text-gray-200' : 'text-gray-700'}`}>
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
            className="space-y-10 relative border-l-4 border-indigo-500 ml-4"
          >
            {formations.map((f, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.15 }}
                className="relative pl-10"
              >
                <div className="absolute -left-5 top-1 w-10 h-10 rounded-full bg-indigo-500 flex items-center justify-center text-white shadow-lg">
                  {f.icon}
                </div>

                <div
                  className={`p-5 rounded-xl shadow-md transition-all hover:scale-[1.02] ${
                    theme === 'dark' ? 'bg-gray-800' : 'bg-white'
                  }`}
                >
                  <h3 className="text-xl font-semibold">{f.title}</h3>
                  <p className="text-sm text-gray-400">
                    {f.school} • {f.year}
                  </p>
                  <p className={`mt-2 ${theme === 'dark' ? 'text-gray-200' : 'text-gray-700'}`}>
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
