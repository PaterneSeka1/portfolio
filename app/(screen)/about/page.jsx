/* eslint-disable @next/next/no-img-element */
'use client'

import { motion } from 'framer-motion'
import { useThemeStore } from '../../store/themeStore'

export default function About() {
  const { theme } = useThemeStore()

  const skills = ['Next.js', 'React.js', 'TailwindCSS', 'Framer Motion', 'Node.js', 'Express', 'MongoDB']

  return (
    <main
      className={`relative overflow-hidden transition-colors duration-700
        ${
          theme === 'dark'
            ? 'bg-gradient-to-b from-gray-900 to-black text-white'
            : 'bg-gradient-to-b from-slate-200 via-slate-100 to-slate-200 text-slate-900'
        }`}
    >
      <motion.div
        className="absolute inset-0 -z-10"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 2 }}
      >
        <div
          className={`absolute top-1/2 left-1/2 w-[1200px] h-[1200px] rounded-full blur-[180px] opacity-25 animate-pulse -translate-x-1/2 -translate-y-1/2 
          ${theme === 'dark' ? 'bg-sky-600' : 'bg-sky-300'}`}
        />
      </motion.div>

      <motion.section
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1 }}
        className="section-wrap soft-card mt-2 flex flex-col items-center justify-center gap-10 rounded-3xl p-8 md:flex-row md:p-10"
      >
        <motion.div
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          whileHover={{ scale: 1.05, rotate: 2 }}
          transition={{ duration: 0.8 }}
          className="flex-shrink-0 rounded-full overflow-hidden border-4 border-sky-500 shadow-lg w-52 h-52 md:w-64 md:h-64 bg-gray-200 dark:bg-gray-700 z-40"
        >
          <img
            src="/me.jpg"
            alt="Photo de profil"
            className="object-cover object-top w-full h-full scale-105"
          />
        </motion.div>

        <motion.div
          initial={{ opacity: 0, x: 40 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.3, duration: 1 }}
          className="max-w-xl text-center md:text-left space-y-4"
        >
          <h1 className="text-4xl md:text-5xl font-extrabold mb-4">À propos de moi</h1>
          <p className={`text-lg leading-relaxed ${theme === 'dark' ? 'text-slate-300' : 'text-slate-600'}`}>
            Bonjour, je suis{' '}
            <span className="font-semibold text-sky-600 dark:text-sky-300">Paterne SEKA</span>, un développeur passionné spécialisé dans la création d&apos;applications web modernes, performantes et élégantes. J&apos;aime concevoir des interfaces fluides, intuitives et visuellement agréables.
            <br /><br />
            Mes principales technologies incluent <span className="font-semibold">Next.js, React, TailwindCSS</span> et <span className="font-semibold">Framer Motion</span>. Mon objectif est de combiner fonctionnalité et design pour offrir des expériences numériques de qualité.
            <br /><br />
            En dehors du code, j&apos;aime la musique, la photographie et explorer des idées créatives.
          </p>

          <div className="flex flex-wrap gap-3 mt-4">
            {skills.map((skill, i) => (
              <span
                key={i}
                className="bg-sky-100 dark:bg-sky-700 text-sky-800 dark:text-sky-100 px-3 py-1 rounded-full text-sm font-medium"
              >
                {skill}
              </span>
            ))}
          </div>

          <div className="mt-4 text-sm md:text-base">
            <p>
              <strong>Téléphone :</strong>{' '}
              <a href="tel:+2250702418667" className="text-sky-600 hover:underline">+225 07 02 41 86 67</a> /{' '}
              <a href="tel:+2250546670693" className="text-sky-600 hover:underline">+225 05 46 67 06 93</a>
            </p>
            <p>
              <strong>Email :</strong>{' '}
              <a href="mailto:sekapaterne25@gmail.com" className="text-sky-600 hover:underline">sekapaterne25@gmail.com</a> /{' '}
              <a href="mailto:paterne.seka@epitech.eu" className="text-sky-600 hover:underline">paterne.seka@epitech.eu</a>
            </p>
          </div>

          <div className="mt-6 flex flex-wrap gap-4">
            <motion.a
              href="https://wa.me/2250702418667"
              target="_blank"
              rel="noopener noreferrer"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="inline-block bg-sky-600 hover:bg-sky-700 text-white font-semibold px-6 py-2 rounded-md transition-colors"
            >
              Discuter sur WhatsApp
            </motion.a>

            <motion.a
              href="/CV.pdf"
              download
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="inline-block bg-sky-600 hover:bg-sky-700 text-white font-semibold px-6 py-2 rounded-md transition-colors"
            >
              Télécharger mon CV
            </motion.a>
          </div>
        </motion.div>
      </motion.section>
    </main>
  )
}
