'use client'

import Link from 'next/link'
import { useThemeStore } from '../../store/themeStore'
import { FaGithub, FaLinkedin, FaEnvelope } from 'react-icons/fa'

export default function Footer() {
  const { theme } = useThemeStore()

  return (
    <footer className="section-wrap pb-6" style={{ zIndex: 50 }}>
      <div className="soft-card mt-12 flex flex-col items-center justify-between gap-5 rounded-2xl px-6 py-5 md:flex-row">
      <div className="text-center md:text-left">
        <h2 className="text-lg font-bold">Paterne SEKA</h2>
        <p
          className={`hidden text-sm md:flex ${
            theme === 'dark' ? 'text-gray-400' : 'text-gray-600'
          }`}
        >
          © 2025 Tous droits réservés.
        </p>
      </div>

      <nav className="md:flex flex-col md:flex-row gap-4 text-center md:text-left mb-4 md:mb-0 hidden">
        <Link href="/projects" className="hover:text-sky-500 transition-colors">
          Projets
        </Link>
        <Link href="/expertises" className="hover:text-sky-500 transition-colors">
          Parcours
        </Link>
        <Link href="/skills" className="hover:text-sky-500 transition-colors">
          Compétences
        </Link>
        <Link href="/contact" className="hover:text-sky-500 transition-colors">
          Contact
        </Link>
        <Link href="/about" className="hover:text-sky-500 transition-colors">
          À propos
        </Link>
      </nav>

      <div className="flex gap-4 text-2xl">
        <a
          href="https://github.com/PaterneSeka1"
          target="_blank"
          rel="noopener noreferrer"
          className={`hover:text-sky-500 transition-colors ${
            theme === 'dark' ? 'text-white' : 'text-gray-800'
          }`}
        >
          <FaGithub />
        </a>
        <a
          href="https://www.linkedin.com/in/paterne-seka-522574210/"
          target="_blank"
          rel="noopener noreferrer"
          className={`hover:text-sky-500 transition-colors ${
            theme === 'dark' ? 'text-white' : 'text-gray-800'
          }`}
        >
          <FaLinkedin />
        </a>
        <a
          href="mailto:paterne.seka@epitech.eu"
          className={`hover:text-sky-500 transition-colors ${
            theme === 'dark' ? 'text-white' : 'text-gray-800'
          }`}
        >
          <FaEnvelope />
        </a>
      </div>
      </div>
    </footer>
  )
}
