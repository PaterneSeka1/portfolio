"use client"

import { motion } from "framer-motion"
import { useThemeStore } from "./store/themeStore"

export default function Home() {
  const { theme } = useThemeStore()

  const bgGradient =
    theme === "dark"
      ? "bg-gradient-to-b from-gray-900 via-black to-gray-950 text-white"
      : "bg-gradient-to-b from-blue-50 via-white to-gray-100 text-gray-900"

  const btnClasses =
    theme === "dark"
      ? "bg-gradient-to-r from-blue-600 to-green-600 hover:from-green-600 hover:to-blue-600 text-white"
      : "bg-gradient-to-r from-blue-600 to-green-500 hover:from-green-500 hover:to-blue-600 text-white"

  // Animated letters for name with extra space between Paterne and SEKA
  const name = "Paterne  SEKA" // double space added
  const letters = name.split("")

  return (
    <main
      className={`relative flex flex-col items-center justify-center min-h-screen overflow-hidden px-6 transition-colors duration-700 ${bgGradient}`}
    >
      {/* Background */}
      <motion.div
        className="absolute inset-0 -z-10"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1.5 }}
      >
        <div
          className={`absolute -top-32 left-1/2 w-[900px] h-[900px] rounded-full blur-[200px] opacity-25 -translate-x-1/2 ${
            theme === "dark" ? "bg-indigo-700" : "bg-blue-300"
          }`}
        />
        <div
          className={`absolute bottom-0 right-0 w-[500px] h-[500px] rounded-full blur-[180px] opacity-20 ${
            theme === "dark" ? "bg-purple-700" : "bg-teal-300"
          }`}
        />
      </motion.div>

      {/* Floating Card */}
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="backdrop-blur-xl bg-white/5 dark:bg-white/10 p-10 rounded-3xl shadow-2xl border border-white/10 max-w-3xl text-center"
      >
        <h1 className="text-5xl md:text-7xl font-extrabold mb-6 leading-snug">
          Welcome to my portfolio,
          <br />
          I am
          <br />
          <span className="inline-block">
            {letters.map((letter, index) => (
              <motion.span
                key={index}
                initial={{ y: 50, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: index * 0.05, type: "spring", stiffness: 120 }}
                className={
                  letter === ' ' 
                    ? 'inline-block w-4' 
                    : 'text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-teal-400 to-green-500 inline-block'
                }
              >
                {letter}
              </motion.span>
            ))}
          </span>
        </h1>

        <p
          className={`text-lg md:text-xl mb-10 ${
            theme === "dark" ? "text-gray-300" : "text-gray-700"
          }`}
        >
          Full-stack developer passionate about creating innovative, elegant and performant digital experiences.
        </p>

        <motion.a
          href="/projects"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className={`px-7 py-4 rounded-xl font-semibold transition-all shadow-xl inline-flex items-center gap-2 ${btnClasses}`}
        >
          View My Projects
        </motion.a>
      </motion.div>
    </main>
  )
}
