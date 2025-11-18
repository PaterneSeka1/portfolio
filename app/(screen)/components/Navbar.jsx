'use client'

import Link from 'next/link'
import { useState } from 'react'
import { useThemeStore } from '../../store/themeStore'
import { FiSun, FiMoon, FiShare2, FiMenu, FiX } from 'react-icons/fi'

const links = ['projects', 'expertises', 'skills', 'contact', 'about']

export default function Navbar () {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const { theme, toggleTheme } = useThemeStore()

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen)
  const closeMenu = () => setIsMenuOpen(false)
  const [activeLink, setActiveLink] = useState(null)

  const baseClass = 'hover:text-red-500 transition-colors'
  const activeClass = 'text-red-500 font-semibold'

  const sharePortfolio = async () => {
    const shareData = { title: 'Paterne SEKA', url: window.location.origin }
    try {
      if (navigator.share) {
        await navigator.share(shareData)
      } else {
        await navigator.clipboard.writeText(shareData.url)
        alert('Link copied to clipboard!')
      }
    } catch (err) {
      console.error('Error sharing:', err)
    }
  }

  return (
    <nav
      className={`w-full flex justify-between items-center py-4 px-6 fixed top-0 left-0 z-50 backdrop-blur-md transition-colors duration-500
        ${
          theme === 'dark'
            ? 'bg-gray-900/70 text-white'
            : 'bg-white/70 text-gray-900'
        }`}
    >
      {/* Logo */}
      <Link
        href='/'
        className='flex items-center gap-3 text-2xl font-bold group'
        onClick={closeMenu}
      >
        <div
          className={`relative w-10 h-10 rounded-full overflow-hidden border-2 transition-all duration-300 py-1 px-1
            ${
              theme === 'dark'
                ? 'border-green-400 group-hover:border-green-300'
                : 'border-green-600 group-hover:border-green-500'
            }
            group-hover:scale-110 group-hover:shadow-[0_0_15px_rgba(34,197,94,0.6)]`}
        >
          <span
          className={`text-transparent bg-clip-text bg-gradient-to-r
            ${
              theme === 'dark'
                ? 'from-blue-400 to-green-500'
                : 'from-blue-600 to-green-700'
            }`}
        >
          PS
        </span>
        </div>
      </Link>

      {/* Desktop Menu */}
      <div className='hidden md:flex items-center gap-4'>
        {links.map(link => (
          <Link
            key={link}
            href={`/${link}`}
            className={`${baseClass} ${activeLink === link ? activeClass : ''}`}
            onClick={() => setActiveLink(link)}
          >
            {link.charAt(0).toUpperCase() + link.slice(1)}
          </Link>
        ))}
      </div>
      
      <div className='flex gap-4 text-2xl'>
        {/* Theme Toggle */}
        <button
          onClick={toggleTheme}
          className='p-3 rounded-full shadow-md hover:scale-105 transition-transform bg-gray-200 text-gray-900 dark:bg-gray-800 dark:text-white'
          title='Toggle theme'
        >
          {theme === 'dark' ? <FiSun size={20} /> : <FiMoon size={20} />}
        </button>

        {/* Share Button */}
        <button
          onClick={sharePortfolio}
          className='p-3 rounded-full shadow-md hover:scale-105 transition-transform bg-gray-200 text-gray-900 dark:bg-gray-800 dark:text-white'
          title='Share portfolio'
        >
          <FiShare2 size={20} />
        </button>
      </div>

      {/* Mobile Menu */}
      <div className='flex md:hidden items-center gap-2'>
        <button
          onClick={sharePortfolio}
          className='p-3 rounded-full shadow-md hover:scale-105 transition-transform bg-gray-200 dark:bg-gray-800 hidden'
        >
          <FiShare2 size={20} />
        </button>

        <button
          onClick={toggleMenu}
          className='p-3 rounded-full shadow-md hover:scale-105 transition-transform focus:outline-none focus:ring-2 focus:ring-red-500 '
          aria-label='Open menu'
        >
          {isMenuOpen ? <FiX size={20} /> : <FiMenu size={20} />}
        </button>
      </div>

      {/* Mobile Links */}
      <div
        className={`md:hidden absolute top-full left-0 w-full transition-all duration-300 ease-in-out shadow-lg
          ${
            theme === 'dark'
              ? 'bg-gray-900/95 text-white'
              : 'bg-white/95 text-gray-900'
          }
          ${
            isMenuOpen
              ? 'max-h-screen opacity-100 visible'
              : 'max-h-0 opacity-0 invisible overflow-hidden'
          }`}
      >
        <div className='flex flex-col p-6 space-y-4'>
          {links.map(link => (
            <Link
              key={link}
              href={`/${link}`}
              className={`${baseClass} ${
                activeLink === link ? activeClass : ''
              }`}
              onClick={() => {
                setActiveLink(link)
                closeMenu()
              }}
            >
              {link.charAt(0).toUpperCase() + link.slice(1)}
            </Link>
          ))}
        </div>
      </div>
    </nav>
  )
}
