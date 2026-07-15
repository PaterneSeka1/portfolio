import Link from 'next/link'
import { FaGithub, FaLinkedin, FaEnvelope } from 'react-icons/fa'
import Logo from './Logo'

const navLinks = [
  { name: 'Accueil', href: '/' },
  { name: 'À propos', href: '/about' },
  { name: 'Expertises', href: '/expertises' },
  { name: 'Réalisations', href: '/projets' },
  { name: 'Parcours', href: '/parcours' },
  { name: 'Contact', href: '/contact' },
]

export default function Footer({ profile, logoUrl }) {
  const year = new Date().getFullYear()

  return (
    <footer className="w-full bg-navy text-white/90">
      <div className="max-w-6xl mx-auto px-6 py-12 grid gap-10 md:grid-cols-3">
        <div className="space-y-3">
          <Logo variant="white" withWordmark className="h-10 w-10" logoUrl={logoUrl} />
          <p className="text-sm text-white/70 max-w-xs">{profile.promise}</p>
        </div>

        <nav className="flex flex-col gap-2 text-sm">
          {navLinks.map(link => (
            <Link key={link.name} href={link.href} className="text-white/70 hover:text-white transition-colors">
              {link.name}
            </Link>
          ))}
        </nav>

        <div className="space-y-4">
          <div className="flex gap-4 text-xl">
            <a href={profile.github} target="_blank" rel="noopener noreferrer" aria-label="GitHub" className="text-white/70 hover:text-white transition-colors">
              <FaGithub />
            </a>
            <a href={profile.linkedin} target="_blank" rel="noopener noreferrer" aria-label="LinkedIn" className="text-white/70 hover:text-white transition-colors">
              <FaLinkedin />
            </a>
            <a href={`mailto:${profile.email}`} aria-label="Email" className="text-white/70 hover:text-white transition-colors">
              <FaEnvelope />
            </a>
          </div>
          <div className="flex flex-col gap-2 text-sm text-white/60">
            <Link href="/mentions-legales" className="hover:text-white transition-colors">Mentions légales</Link>
            <Link href="/confidentialite" className="hover:text-white transition-colors">Confidentialité</Link>
          </div>
        </div>
      </div>

      <div className="border-t border-white/10">
        <div className="max-w-6xl mx-auto px-6 py-4 flex flex-col md:flex-row justify-between items-center gap-2 text-xs text-white/70">
          <p>© {year} {profile.name}. Tous droits réservés.</p>
          <Link href="/admin" className="hover:text-white/70 transition-colors">
            Admin
          </Link>
        </div>
      </div>
    </footer>
  )
}
