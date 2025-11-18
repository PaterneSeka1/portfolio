'use client'

import Link from 'next/link'
import { useThemeStore } from '../../store/themeStore'
import { FaGithub, FaLinkedin, FaEnvelope } from 'react-icons/fa'

export default function Footer() {
  const { theme } = useThemeStore()

  return (
    <footer
      className={`w-full py-6 px-6 flex flex-col md:flex-row justify-between items-center border-t transition-colors duration-500
        ${theme === 'dark'
          ? 'bottom-0 left-0 bg-gray-900 text-white border-gray-700'
          : 'bottom-0 left-0 bg-white text-gray-900 border-gray-200'
        }`}
      style={{ zIndex: 50 }}
    >
      {/* Branding */}
      <div className="mb-4 md:mb-0 text-center md:text-left">
        <h2 className="text-lg font-bold">Paterne SEKA</h2>
        <p
          className={`text-sm hidden md:flex ${
            theme === 'dark' ? 'text-gray-400' : 'text-gray-500'
          }`}
        >
          © 2025 Tous droits réservés.
        </p>
      </div>

      {/* Navigation Links */}
      <nav className="md:flex flex-col md:flex-row gap-4 text-center md:text-left mb-4 md:mb-0 hidden">
        <Link href="/projects" className="hover:text-red-500 transition-colors">
          Projects
        </Link>
        <Link href="/expertises" className="hover:text-red-500 transition-colors">
          Expertises
        </Link>
        <Link href="/skills" className="hover:text-red-500 transition-colors">
          Skills
        </Link>
        <Link href="/contact" className="hover:text-red-500 transition-colors">
          Contact
        </Link>
        <Link href="/about" className="hover:text-red-500 transition-colors">
          About
        </Link>
      </nav>

      {/* Social Links with Icons */}
      <div className="flex gap-4 text-2xl">
        <a
          href="https://github.com/PaterneSeka1"
          target="_blank"
          rel="noopener noreferrer"
          className={`hover:text-blue-500 transition-colors ${
            theme === 'dark' ? 'text-white' : 'text-gray-800'
          }`}
        >
          <FaGithub />
        </a>
        <a
          href="https://www.linkedin.com/in/paterne-seka-522574210/"
          target="_blank"
          rel="noopener noreferrer"
          className={`hover:text-blue-500 transition-colors ${
            theme === 'dark' ? 'text-white' : 'text-gray-800'
          }`}
        >
          <FaLinkedin />
        </a>
        <a
          href="mailto:paterne.seka@epitech.eu"
          className={`hover:text-green-500 transition-colors ${
            theme === 'dark' ? 'text-white' : 'text-gray-800'
          }`}
        >
          <FaEnvelope />
        </a>
      </div>
    </footer>
  )
}
