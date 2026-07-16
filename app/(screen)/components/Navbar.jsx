'use client'

import Link from 'next/link'
import { useState } from 'react'
import { usePathname } from 'next/navigation'
import { FiMenu, FiX } from 'react-icons/fi'
import { Download } from 'lucide-react'
import Logo from './Logo'

const links = [
  { name: 'Accueil', href: '/' },
  { name: 'À propos', href: '/about' },
  { name: 'Expertises', href: '/expertises' },
  { name: 'Réalisations', href: '/projets' },
  { name: 'Parcours', href: '/parcours' },
  { name: 'Contact', href: '/contact' },
]

export default function Navbar({ profile }) {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const pathname = usePathname()
  const activeLink = links.find(l => l.href === pathname)?.name

  const closeMenu = () => setIsMenuOpen(false)

  const linkClass = (name) =>
    `relative text-sm font-medium transition-colors duration-200 ${
      activeLink === name ? 'text-accent' : 'text-white/80 hover:text-accent'
    }`

  return (
    <nav className="w-full flex justify-between items-center py-3 px-6 fixed top-0 left-0 z-50 bg-navy/95 backdrop-blur-md border-b border-white/10">
      <Link href="/" className="flex items-center gap-3" onClick={closeMenu}>
        <Logo variant="white" className="h-10 w-10" />
        <span className="font-heading font-bold text-white hidden sm:inline">
          Paterne SEKA
        </span>
      </Link>

      <div className="hidden md:flex items-center gap-8">
        {links.map(link => (
          <Link key={link.name} href={link.href} className={linkClass(link.name)}>
            {link.name}
          </Link>
        ))}
      </div>

      <div className="hidden md:flex items-center gap-4">
        <a
          href={profile.cvUrl}
          download
          className="inline-flex items-center gap-2 rounded-lg bg-accent px-4 py-2 text-sm font-semibold text-white transition-colors hover:bg-accent/90"
        >
          <Download size={16} />
          Mon CV
        </a>
      </div>

      <button
        onClick={() => setIsMenuOpen(prev => !prev)}
        className="md:hidden p-2 rounded-lg text-white"
        aria-label="Ouvrir le menu"
      >
        {isMenuOpen ? <FiX size={22} /> : <FiMenu size={22} />}
      </button>

      {isMenuOpen && (
        <div className="md:hidden absolute top-full left-0 w-full bg-navy shadow-lg border-t border-white/10">
          <div className="flex flex-col p-6 gap-4">
            {links.map(link => (
              <Link
                key={link.name}
                href={link.href}
                className={linkClass(link.name)}
                onClick={closeMenu}
              >
                {link.name}
              </Link>
            ))}
            <a
              href={profile.cvUrl}
              download
              className="inline-flex items-center justify-center gap-2 rounded-lg bg-accent px-4 py-2 text-sm font-semibold text-white transition-colors hover:bg-accent/90"
              onClick={closeMenu}
            >
              <Download size={16} />
              Mon CV
            </a>
          </div>
        </div>
      )}
    </nav>
  )
}
