'use client'

import Link from 'next/link'
import { useState, useEffect } from 'react'
import { useRouter, usePathname } from 'next/navigation'
import { motion, useAnimation } from 'framer-motion'
import { useThemeStore } from '../../store/themeStore'
import { FiSun, FiMoon, FiShare2, FiMenu, FiX } from 'react-icons/fi'

const links = [
  { name: 'accueil', href: '/' },
  { name: 'projets', href: '/projects' },
  { name: 'parcours', href: '/expertises' },
  { name: 'competences', href: '/skills' },
  { name: 'contact', href: '/contact' },
  { name: 'apropos', href: '/about' }
]

const linkLabel = {
  accueil: 'Accueil',
  projets: 'Projets',
  parcours: 'Parcours',
  competences: 'Compétences',
  contact: 'Contact',
  apropos: 'À propos'
}

export default function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const { theme, toggleTheme } = useThemeStore()
  const controls = useAnimation()
  const router = useRouter()
  const pathname = usePathname()
  const activeLink = links.find((link) => link.href === pathname)?.name || 'accueil'

  const toggleMenu = () => setIsMenuOpen(prev => !prev)
  const closeMenu = () => setIsMenuOpen(false)

  const sharePortfolio = async () => {
    const shareData = { title: 'Paterne SEKA', url: window.location.origin }
    try {
      if (navigator.share) {
        await navigator.share(shareData)
      } else {
        await navigator.clipboard.writeText(shareData.url)
        alert('Lien copié dans le presse-papiers !')
      }
    } catch (err) {
      console.error('Erreur de partage :', err)
    }
  }

  useEffect(() => {
    controls.start({
      scale: [1, 1.05, 1],
      transition: { duration: 2, repeat: Infinity, ease: 'easeInOut' }
    })
  }, [controls])

  const baseClass = 'relative hover:text-sky-500 transition-all duration-300 select-none'
  const activeClass = 'text-sky-500 font-semibold'

  return (
    <nav className="fixed inset-x-0 top-0 z-50">
      <div className="section-wrap pt-4">
        <div className="soft-card flex items-center justify-between rounded-2xl px-4 py-3 md:px-6">
      <div
        onClick={() => {
          router.push('/')
          closeMenu()
        }}
        className="flex cursor-pointer items-center gap-3 text-2xl font-bold"
      >
        <motion.div
          animate={controls}
          whileHover={{
            rotate: 4,
            boxShadow:
              theme === 'dark'
                ? '0 0 25px rgba(56,189,248,0.45)'
                : '0 0 25px rgba(56,189,248,0.35)'
          }}
          transition={{ type: 'spring', stiffness: 300 }}
          className="relative flex h-10 w-10 items-center justify-center overflow-hidden rounded-full border-2 border-sky-500/70 bg-gradient-to-r from-sky-500 via-sky-500 to-sky-600 p-1"
        >
          <motion.span
            className="text-white font-bold text-lg select-none bg-clip-text bg-gradient-to-r from-sky-200 via-sky-200 to-sky-100 text-transparent"
            whileHover={{ backgroundPosition: ['0%','100%','0%'] }}
            style={{ backgroundSize: '200% auto' }}
          >
            PS
          </motion.span>
        </motion.div>
      </div>

      <div className="hidden md:flex items-center gap-6 relative">
        {links.map(link => (
          <Link
            key={link.name}
            href={link.href}
            className={`${baseClass} ${activeLink === link.name ? activeClass : ''}`}
          >
            {linkLabel[link.name]}

            {activeLink === link.name && (
              <motion.div
                layoutId="underline"
                className="absolute -bottom-1 left-0 w-full h-[2px] rounded-full bg-sky-500"
              />
            )}
          </Link>
        ))}
      </div>

      <div className="flex gap-2 text-2xl">
        <motion.button
          whileHover={{ scale: 1.1 }}
          transition={{ duration: 0.3 }}
          onClick={toggleTheme}
          className="rounded-xl border p-2.5 text-slate-700 transition-colors dark:text-slate-100"
          style={{ borderColor: "var(--border)" }}
          title="Changer de thème"
        >
          {theme === 'dark' ? <FiSun size={20} /> : <FiMoon size={20} />}
        </motion.button>

        <motion.button
          whileHover={{ scale: 1.1 }}
          transition={{ duration: 0.3 }}
          onClick={sharePortfolio}
          className="rounded-xl border p-2.5 text-slate-700 transition-colors dark:text-slate-100"
          style={{ borderColor: "var(--border)" }}
          title="Partager le portfolio"
        >
          <FiShare2 size={20} />
        </motion.button>
      </div>

      <div className="flex md:hidden items-center">
        <button
          onClick={toggleMenu}
          className="rounded-xl border p-2.5 transition-transform hover:scale-105"
          style={{ borderColor: "var(--border)" }}
        >
          {isMenuOpen ? <FiX size={20} /> : <FiMenu size={20} />}
        </button>
      </div>

      <motion.div
        initial={{ opacity: 0, y: -40 }}
        animate={{ opacity: isMenuOpen ? 1 : 0, y: isMenuOpen ? 0 : -40 }}
        transition={{ duration: 0.25 }}
        className={`
          md:hidden absolute top-full left-0 w-full 
          soft-card text-gray-900 dark:text-white overflow-hidden
          ${isMenuOpen ? 'pointer-events-auto' : 'pointer-events-none'}
        `}
      >
        <div className="flex flex-col p-6 space-y-4">
          {links.map(link => (
            <Link
              key={link.name}
              href={link.href}
              className={`${baseClass} ${activeLink === link.name ? activeClass : ''}`}
              onClick={() => {
                closeMenu()
              }}
            >
              {linkLabel[link.name]}

              {activeLink === link.name && (
                <motion.div
                  layoutId="underline"
                  className="absolute -bottom-1 left-0 w-full h-[2px] rounded-full bg-sky-500"
                />
              )}
            </Link>
          ))}
        </div>
      </motion.div>
        </div>
      </div>
    </nav>
  )
}
