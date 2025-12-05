/* eslint-disable @next/next/no-img-element */
'use client'

import { motion } from 'framer-motion'
import { useThemeStore } from '../../store/themeStore'

export default function About() {
  const { theme } = useThemeStore()

  const skills = ['Next.js', 'React.js', 'TailwindCSS', 'Framer Motion', 'Node.js', 'Express', 'MongoDB']

  return (
    <main
      className={`relative flex min-h-screen flex-col items-center justify-center overflow-hidden px-6 py-12 transition-colors duration-700
        ${
          theme === 'dark'
            ? 'bg-gradient-to-b from-gray-900 to-black text-white'
            : 'bg-gradient-to-b from-gray-100 to-white text-gray-900'
        }`}
    >
      {/* Background effect */}
      <motion.div
        className="absolute inset-0 -z-10"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 2 }}
      >
        <div
          className={`absolute top-1/2 left-1/2 w-[1200px] h-[1200px] rounded-full blur-[180px] opacity-25 animate-pulse -translate-x-1/2 -translate-y-1/2 
          ${theme === 'dark' ? 'bg-indigo-600' : 'bg-blue-300'}`}
        />
      </motion.div>

      <motion.section
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1 }}
        className="flex flex-col md:flex-row items-center justify-center gap-10 max-w-5xl mt-16"
      >
        {/* Profile Image */}
        <motion.div
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          whileHover={{ scale: 1.05, rotate: 2 }}
          transition={{ duration: 0.8 }}
          className="flex-shrink-0 rounded-full overflow-hidden border-4 border-blue-500 shadow-lg w-52 h-52 md:w-64 md:h-64 bg-gray-200 dark:bg-gray-700 z-40"
        >
          <img
            src="/me.png"
            alt="Profile photo"
            className="object-cover w-full h-full"
          />
        </motion.div>

        {/* About text */}
        <motion.div
          initial={{ opacity: 0, x: 40 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.3, duration: 1 }}
          className="max-w-xl text-center md:text-left space-y-4"
        >
          <h1 className="text-4xl md:text-5xl font-extrabold mb-4">About Me</h1>
          <p className={`text-lg leading-relaxed ${theme === 'dark' ? 'text-gray-300' : 'text-gray-700'}`}>
            Hi, I’m{' '}
            <span className="font-semibold text-blue-500 dark:text-blue-400">Paterne SEKA</span>, a passionate developer specialized in creating modern, performant, and elegant web applications. I enjoy crafting smooth, intuitive, and visually appealing user interfaces.
            <br /><br />
            My main technologies include <span className="font-semibold">Next.js, React, TailwindCSS</span>, and <span className="font-semibold">Framer Motion</span>. I aim to combine functionality with design to deliver outstanding digital experiences.
            <br /><br />
            Outside coding, I enjoy music, photography, and exploring creative ideas.
          </p>

          {/* Skills badges */}
          <div className="flex flex-wrap gap-3 mt-4">
            {skills.map((skill, i) => (
              <span
                key={i}
                className="bg-blue-100 dark:bg-blue-700 text-blue-800 dark:text-blue-200 px-3 py-1 rounded-full text-sm font-medium"
              >
                {skill}
              </span>
            ))}
          </div>

          {/* Contacts */}
          <div className="mt-4 text-sm md:text-base">
            <p>
              <strong>Phone:</strong>{' '}
              <a href="tel:+2250702418667" className="text-blue-500 hover:underline">+225 07 02 41 86 67</a> /{' '}
              <a href="tel:+2250546670693" className="text-blue-500 hover:underline">+225 05 46 67 06 93</a>
            </p>
            <p>
              <strong>Email:</strong>{' '}
              <a href="mailto:sekapaterne25@gmail.com" className="text-blue-500 hover:underline">sekapaterne25@gmail.com</a> /{' '}
              <a href="mailto:paterne.seka@epitech.eu" className="text-blue-500 hover:underline">paterne.seka@epitech.eu</a>
            </p>
          </div>

          {/* Action buttons */}
          <div className="mt-6 flex flex-wrap gap-4">
            <motion.a
              href="https://wa.me/2250702418667"
              target="_blank"
              rel="noopener noreferrer"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="inline-block bg-green-500 hover:bg-green-600 text-white font-semibold px-6 py-2 rounded-md shadow-md transition-colors"
            >
              Chat on WhatsApp
            </motion.a>

            <motion.a
              href="/CV.pdf"
              download
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="inline-block bg-blue-500 hover:bg-blue-600 text-white font-semibold px-6 py-2 rounded-md shadow-md transition-colors"
            >
              Download My CV
            </motion.a>
          </div>
        </motion.div>
      </motion.section>
    </main>
  )
}
