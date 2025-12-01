'use client'

import Link from 'next/link'
import { useState, useEffect } from 'react'
import { useRouter, usePathname } from 'next/navigation'
import { motion, useAnimation } from 'framer-motion'
import { useThemeStore } from '../../store/themeStore'
import { FiSun, FiMoon, FiShare2, FiMenu, FiX } from 'react-icons/fi'

const links = [
  { name: 'home', href: '/' },
  { name: 'projects', href: '/projects' },
  { name: 'expertises', href: '/expertises' },
  { name: 'skills', href: '/skills' },
  { name: 'contact', href: '/contact' },
  { name: 'about', href: '/about' }
]

export default function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const { theme, toggleTheme } = useThemeStore()
  const [activeLink, setActiveLink] = useState('home')
  const controls = useAnimation()
  const router = useRouter()
  const pathname = usePathname()  // Pour détecter l'URL actuelle

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen)
  const closeMenu = () => setIsMenuOpen(false)

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

  // Mettre à jour activeLink selon le pathname actuel
  useEffect(() => {
    const link = links.find(l => l.href === pathname)
    if (link) setActiveLink(link.name)
  }, [pathname])

  // Pulse continu sur le logo
  useEffect(() => {
    controls.start({
      scale: [1, 1.05, 1],
      transition: { duration: 2, repeat: Infinity, ease: 'easeInOut' }
    })
  }, [controls])

  const baseClass = 'relative hover:text-red-500 transition-all duration-300 drop-shadow-md'
  const activeClass = 'text-red-500 font-semibold'

  return (
    <nav
      className={`w-full flex justify-between items-center py-4 px-6 fixed top-0 left-0 z-50 backdrop-blur-md transition-colors duration-500
        ${theme === 'dark' ? 'bg-gray-900/70 text-white' : 'bg-white/70 text-gray-900'}`}
    >
      {/* Logo */}
      <div
        onClick={() => {
          setActiveLink('home')
          router.push('/')
          closeMenu()
        }}
        className='flex items-center gap-3 text-2xl font-bold group cursor-pointer'
      >
        <motion.div
          animate={controls}
          whileHover={{
            rotate: 5,
            boxShadow:
              theme === 'dark'
                ? '0 0 25px rgba(34,197,94,0.8)'
                : '0 0 25px rgba(34,197,94,0.6)'
          }}
          transition={{ type: 'spring', stiffness: 300 }}
          className={`relative w-10 h-10 rounded-full overflow-hidden border-2 py-1 px-1
            ${theme === 'dark' ? 'border-green-400' : 'border-green-600'} 
            bg-gradient-to-r from-blue-400 via-green-400 to-green-600 flex items-center justify-center`}
        >
          <motion.span
            className='text-white font-bold text-lg select-none bg-clip-text bg-gradient-to-r from-pink-400 via-purple-400 to-blue-400 text-transparent'
            whileHover={{
              backgroundPosition: ['0%','100%','0%'],
            }}
            style={{ backgroundSize: '200% auto' }}
          >
            PS
          </motion.span>
        </motion.div>
      </div>

      {/* Desktop Menu */}
      <div className='hidden md:flex items-center gap-6 relative'>
        {links.map(link => (
          <Link
            key={link.name}
            href={link.href}
            className={`${baseClass} ${activeLink === link.name ? activeClass : ''}`}
            onClick={() => setActiveLink(link.name)}
          >
            {link.name.charAt(0).toUpperCase() + link.name.slice(1)}

            {/* Soulignement animé */}
            {activeLink === link.name && (
              <motion.div
                layoutId="underline"
                className={`absolute -bottom-1 left-0 w-full h-[2px] rounded-full bg-red-500`}
              />
            )}
          </Link>
        ))}
      </div>

      {/* Buttons */}
      <div className='flex gap-4 text-2xl'>
        <motion.button
          whileHover={{ scale: 1.1, boxShadow: theme === 'dark' ? '0 0 15px rgba(255,255,255,0.4)' : '0 0 15px rgba(0,0,0,0.2)' }}
          transition={{ duration: 0.3 }}
          onClick={toggleTheme}
          className='p-3 rounded-full shadow-md bg-gray-200 dark:bg-gray-800 dark:text-white text-gray-900'
          title='Toggle theme'
        >
          {theme === 'dark' ? <FiSun size={20} /> : <FiMoon size={20} />}
        </motion.button>

        <motion.button
          whileHover={{ scale: 1.1, boxShadow: theme === 'dark' ? '0 0 15px rgba(255,255,255,0.4)' : '0 0 15px rgba(0,0,0,0.2)' }}
          transition={{ duration: 0.3 }}
          onClick={sharePortfolio}
          className='p-3 rounded-full shadow-md bg-gray-200 dark:bg-gray-800 dark:text-white text-gray-900'
          title='Share portfolio'
        >
          <FiShare2 size={20} />
        </motion.button>
      </div>

      {/* Mobile Menu Toggle */}
      <div className='flex md:hidden items-center gap-2'>
        <button
          onClick={toggleMenu}
          className='p-3 rounded-full shadow-md hover:scale-105 transition-transform focus:outline-none focus:ring-2 focus:ring-red-500'
          aria-label='Open menu'
        >
          {isMenuOpen ? <FiX size={20} /> : <FiMenu size={20} />}
        </button>
      </div>

      {/* Mobile Menu */}
      <motion.div
        initial={{ y: -50, opacity: 0 }}
        animate={{ y: isMenuOpen ? 0 : -50, opacity: isMenuOpen ? 1 : 0 }}
        transition={{ duration: 0.3 }}
        className={`md:hidden absolute top-full left-0 w-full bg-white/95 dark:bg-gray-900/95 text-gray-900 dark:text-white shadow-lg overflow-hidden`}
      >
        <div className='flex flex-col p-6 space-y-4'>
          {links.map(link => (
            <Link
              key={link.name}
              href={link.href}
              className={`${baseClass} ${activeLink === link.name ? activeClass : ''}`}
              onClick={() => {
                setActiveLink(link.name)
                closeMenu()
              }}
            >
              {link.name.charAt(0).toUpperCase() + link.name.slice(1)}

              {activeLink === link.name && (
                <motion.div
                  layoutId="underline"
                  className={`absolute -bottom-1 left-0 w-full h-[2px] rounded-full bg-red-500`}
                />
              )}
            </Link>
          ))}
        </div>
      </motion.div>
    </nav>
  )
}
