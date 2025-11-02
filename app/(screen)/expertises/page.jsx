'use client'

import { motion } from 'framer-motion'
import { FaGraduationCap, FaBriefcase } from 'react-icons/fa'
import { useThemeStore } from '../../store/themeStore'

export default function FormationExperiences () {
  const { theme } = useThemeStore()

  const formations = [
    {
      title: 'Developper Student Web et Mobile',
      school: 'We.Code - Epitech',
      year: 'in progress',
      description: 'specialization in web and mobile development.'
    },
    {
      title: 'Developper Student',
      school: 'Virtual University in Ivory Coast',
      year: 'in progress',
      description: 'student in development applications and e-services (DAS).'
    },
    {
      title: 'Developper Student Web Junior',
      school: 'Start Up Academy',
      year: 'August - September 2022',
      description:
        'Formation in web development technologies: HTML, CSS, JavaScript.'
    },
    {
      title: 'Baccalauréat',
      school: 'Groupe Sainte Foi Abidjan (GSFA)',
      year: '2021',
      description: 'Série D'
    }
  ]

  const experiences = [
    {
      title: 'Stagiaire Développeur Full Stack',
      company: 'Worldev',
      year: 'February - Mai 2025',
      description: "Create application web with Laravel."
    },
    {
      title: 'Développeur Web Freelance',
      company: 'Freelance',
      year: 'June - August 2024',
      description: "Help to create websites for church with wordpress."
    },
    {
      title: 'Stagiaire Développeur Frontend',
      company: 'Start Up Academy',
      year: 'September - January 2023',
      description: "Create landing pages for small businesses."
    },
  ]

  return (
    <main
      className={`relative flex min-h-screen flex-col items-center justify-center px-6 py-12 transition-colors duration-700 ${
        theme === 'dark'
          ? 'bg-gradient-to-b from-gray-900 to-black text-white'
          : 'bg-gradient-to-b from-gray-100 to-white text-gray-900'
      }`}
    >
      <section className='w-full max-w-5xl mt-16 space-y-16'>
        <div className='text-center'>
          <h1 className='text-4xl md:text-5xl font-extrabold mb-4'>
            Training & Experiences
          </h1>
          <p
            className={`text-lg ${
              theme === 'dark' ? 'text-gray-300' : 'text-gray-700'
            }`}
          >
            Academic background and professional experience.
          </p>
        </div>

        {/* Expériences */}
        <div className='space-y-8 mt-12'>
          <h2
            className={`text-2xl font-semibold mb-4 ${
              theme === 'dark' ? 'text-green-400' : 'text-green-600'
            }`}
          >
            Expériences
          </h2>
          {experiences.map((exp, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.2, duration: 0.5 }}
              className={`relative p-5 rounded-xl shadow-md cursor-pointer transform transition-all duration-300 hover:scale-105 ${
                theme === 'dark' ? 'bg-gray-800' : 'bg-white'
              }`}
            >
              <div className='absolute -top-4 left-4 w-10 h-10 flex items-center justify-center rounded-full bg-green-500 text-white shadow-lg'>
                <FaBriefcase size={20} />
              </div>
              <h3 className='text-xl font-semibold ml-14'>{exp.title}</h3>
              <span className='text-sm text-gray-400 ml-14'>
                {exp.company} | {exp.year}
              </span>
              <p
                className={`mt-2 ml-14 ${
                  theme === 'dark' ? 'text-gray-200' : 'text-gray-700'
                }`}
              >
                {exp.description}
              </p>
            </motion.div>
          ))}
        </div>

        {/* Formation */}
        <div className='space-y-8'>
          <h2
            className={`text-2xl font-semibold mb-4 ${
              theme === 'dark' ? 'text-indigo-400' : 'text-blue-600'
            }`}
          >
            Formation
          </h2>
          {formations.map((f, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.2, duration: 0.5 }}
              className={`relative p-5 rounded-xl shadow-md cursor-pointer transform transition-all duration-300 hover:scale-105 ${
                theme === 'dark' ? 'bg-gray-800' : 'bg-white'
              }`}
            >
              <div className='absolute -top-4 left-4 w-10 h-10 flex items-center justify-center rounded-full bg-indigo-500 text-white shadow-lg'>
                <FaGraduationCap size={20} />
              </div>
              <h3 className='text-xl font-semibold ml-14'>{f.title}</h3>
              <span className='text-sm text-gray-400 ml-14'>
                {f.school} | {f.year}
              </span>
              <p
                className={`mt-2 ml-14 ${
                  theme === 'dark' ? 'text-gray-200' : 'text-gray-700'
                }`}
              >
                {f.description}
              </p>
            </motion.div>
          ))}
        </div>
      </section>
    </main>
  )
}
