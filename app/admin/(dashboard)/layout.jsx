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
} from "lucide-react"
import Logo from "../../(screen)/components/Logo"
import { requireAdmin } from "../../../lib/auth/current-user"
import { logoutAction } from "../../../lib/auth/actions"
import { getBrandSettings } from "../../../lib/db/brand"

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

export default async function AdminLayout({ children }) {
  const [session, brand] = await Promise.all([requireAdmin(), getBrandSettings()])

  return (
    <div className="min-h-screen bg-gray-light flex">
      <aside className="w-64 shrink-0 bg-navy text-white/90 flex flex-col">
        <div className="p-6">
          <Logo variant="white" withWordmark className="h-9 w-9" logoUrl={brand?.logoUrl} />
        </div>
        <nav className="flex-1 px-3 space-y-1">
          {navItems.map((item) => {
            const Icon = item.icon
            return (
              <Link
                key={item.href}
                href={item.href}
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

      <div className="flex-1 flex flex-col">
        <header className="h-16 bg-white border-b border-gray-200 flex items-center justify-between px-8">
          <span className="text-sm text-navy/60">{session.email}</span>
          <form action={logoutAction}>
            <button type="submit" className="text-sm font-medium text-navy/70 hover:text-accent transition-colors">
              Déconnexion
            </button>
          </form>
        </header>
        <main className="flex-1 p-8">{children}</main>
      </div>
    </div>
  )
}
