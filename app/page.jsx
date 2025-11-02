'use client'

import { motion } from 'framer-motion'
import { useThemeStore } from './store/themeStore'

export default function Home() {
  const { theme } = useThemeStore()

  const bgGradient =
    theme === 'dark'
      ? 'bg-gradient-to-b from-gray-900 to-black text-white'
      : 'bg-gradient-to-b from-gray-100 to-white text-gray-900'

  const nameGradient =
    theme === 'dark'
      ? 'from-blue-400 to-green-500'
      : 'from-blue-600 to-green-700'

  const btnClasses =
    theme === 'dark'
      ? 'bg-blue-500 hover:bg-green-600 text-white'
      : 'bg-blue-600 hover:bg-green-500 text-white'

  return (
    <main
      className={`relative flex flex-col items-center justify-center min-h-screen overflow-hidden px-6 transition-colors duration-700 ${bgGradient}`}
    >
      {/* Animated background */}
      <motion.div
        className="absolute inset-0 -z-10"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 2 }}
      >
        <div
          className={`absolute top-1/2 left-1/2 w-[1200px] h-[1200px] rounded-full blur-[180px] opacity-25 animate-pulse -translate-x-1/2 -translate-y-1/2 ${
            theme === 'dark' ? 'bg-indigo-600' : 'bg-blue-300'
          }`}
        />
      </motion.div>

      {/* Main Title */}
      <motion.h1
        initial={{ opacity: 0, y: -50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1 }}
        className="text-5xl md:text-7xl font-extrabold mb-4 text-center"
      >
        Welcome to my portfolio, I am
        <br />
        <span
          className={`text-transparent bg-clip-text bg-gradient-to-r ${nameGradient}`}
        >
          Paterne SEKA
        </span>
      </motion.h1>

      {/* Subtitle */}
      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.4, duration: 1 }}
        className={`text-lg md:text-xl mb-8 text-center max-w-2xl ${
          theme === 'dark' ? 'text-gray-300' : 'text-gray-700'
        }`}
      >
        Full-stack developer passionate about creating innovative and performant
        web experiences.
      </motion.p>

      {/* Button to Projects */}
      <motion.a
        href="/projects"
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        className={`px-6 py-3 rounded-lg font-medium transition-all shadow-lg ${btnClasses}`}
      >
        View My Projects
      </motion.a>
    </main>
  )
}
