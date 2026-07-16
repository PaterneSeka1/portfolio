"use client"

import { useState } from "react"
import Link from "next/link"
import {
  LayoutDashboard,
  User,
  Palette,
  Briefcase,
  Sparkles,
  GraduationCap,
  Wrench,
  Image as ImageIcon,
  MessageSquare,
  Settings,
  Menu,
  X,
} from "lucide-react"
import Logo from "../../(screen)/components/Logo"

const navItems = [
  { href: "/admin", label: "Dashboard", icon: LayoutDashboard },
  { href: "/admin/profil", label: "Profil", icon: User },
  { href: "/admin/identite", label: "Identité", icon: Palette },
  { href: "/admin/projets", label: "Projets", icon: Briefcase },
  { href: "/admin/expertises", label: "Expertises", icon: Sparkles },
  { href: "/admin/experiences", label: "Expériences", icon: GraduationCap },
  { href: "/admin/competences", label: "Compétences", icon: Wrench },
  { href: "/admin/medias", label: "Médias", icon: ImageIcon },
  { href: "/admin/messages", label: "Messages", icon: MessageSquare },
  { href: "/admin/parametres", label: "Paramètres", icon: Settings },
]

export default function AdminShell({ children, email, logoUrl, logoutAction }) {
  const [mobileOpen, setMobileOpen] = useState(false)

  return (
    <div className="min-h-screen bg-gray-light">
      {mobileOpen && (
        <div
          className="fixed inset-0 z-30 bg-black/50 lg:hidden"
          onClick={() => setMobileOpen(false)}
        />
      )}

      <aside
        className={`fixed inset-y-0 left-0 z-40 w-64 bg-navy text-white/90 flex flex-col transition-transform duration-300 lg:translate-x-0 ${
          mobileOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <div className="p-6 flex items-center justify-between">
          <Logo variant="white" withWordmark className="h-9 w-9" logoUrl={logoUrl} />
          <button
            type="button"
            onClick={() => setMobileOpen(false)}
            className="lg:hidden text-white/70 hover:text-white transition-colors"
            aria-label="Fermer le menu"
          >
            <X size={20} />
          </button>
        </div>
        <nav className="flex-1 px-3 space-y-1 overflow-y-auto">
          {navItems.map((item) => {
            const Icon = item.icon
            return (
              <Link
                key={item.href}
                href={item.href}
                onClick={() => setMobileOpen(false)}
                className="flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium text-white/70 hover:text-white hover:bg-white/10 transition-colors"
              >
                <Icon size={18} />
                {item.label}
              </Link>
            )
          })}
        </nav>
        <div className="p-4 border-t border-white/10">
          <Link href="/" className="block text-xs text-white/50 hover:text-white/80 mb-3">
            ← Retour au site public
          </Link>
        </div>
      </aside>

      <div className="flex flex-col min-h-screen lg:pl-64">
        <header className="h-16 bg-white border-b border-gray-200 flex items-center justify-between px-4 sm:px-6 lg:px-8 gap-3">
          <div className="flex items-center gap-3 min-w-0">
            <button
              type="button"
              onClick={() => setMobileOpen(true)}
              className="lg:hidden text-navy/70 hover:text-navy transition-colors shrink-0"
              aria-label="Ouvrir le menu"
            >
              <Menu size={22} />
            </button>
            <span className="text-sm text-navy/60 truncate">{email}</span>
          </div>
          <form action={logoutAction} className="shrink-0">
            <button type="submit" className="text-sm font-medium text-navy/70 hover:text-accent transition-colors">
              Déconnexion
            </button>
          </form>
        </header>
        <main className="flex-1 p-4 sm:p-6 lg:p-8">
          <div className="max-w-6xl mx-auto">{children}</div>
        </main>
      </div>
    </div>
  )
}
