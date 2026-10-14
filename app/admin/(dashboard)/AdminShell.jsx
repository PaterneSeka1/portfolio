"use client"

import { useEffect, useState } from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import {
  Briefcase,
  ExternalLink,
  FolderKanban,
  Image as ImageIcon,
  LayoutDashboard,
  LogOut,
  Menu,
  MessageSquare,
  Search,
  Settings,
  Sparkles,
  UserRound,
  Wrench,
  X,
} from "lucide-react"
import Logo from "../../_components/Logo"
import { cx } from "../_ui/primitives"

const NAV = [
  { items: [{ href: "/admin", label: "Tableau de bord", icon: LayoutDashboard, exact: true }] },
  {
    title: "Contenu",
    items: [
      { href: "/admin/projets", label: "Réalisations", icon: FolderKanban },
      { href: "/admin/experiences", label: "Expérience", icon: Briefcase },
      { href: "/admin/expertises", label: "Expertise", icon: Sparkles },
      { href: "/admin/competences", label: "Technologies", icon: Wrench },
      { href: "/admin/profil", label: "Profil & accueil", icon: UserRound },
    ],
  },
  {
    title: "Site",
    items: [
      { href: "/admin/messages", label: "Messages", icon: MessageSquare, badge: "unread" },
      { href: "/admin/medias", label: "Médiathèque", icon: ImageIcon },
      { href: "/admin/seo", label: "Référencement", icon: Search },
    ],
  },
  { title: "Système", items: [{ href: "/admin/parametres", label: "Paramètres", icon: Settings }] },
]

const isActive = (pathname, item) =>
  item.exact ? pathname === item.href : pathname === item.href || pathname.startsWith(`${item.href}/`)

function SidebarContent({ pathname, email, unread, logoutAction, onNavigate }) {
  return (
    <div className="flex h-full flex-col">
      <div className="flex h-16 shrink-0 items-center gap-3 px-5">
        <Logo variant="white" className="h-8 w-8" />
        <div className="leading-tight">
          <p className="font-heading text-sm font-bold text-white">Paterne SEKA</p>
          <p className="text-xs text-white/50">Administration</p>
        </div>
      </div>

      <nav aria-label="Navigation de l'administration" className="flex-1 space-y-6 overflow-y-auto px-3 py-4">
        {NAV.map((group, index) => (
          <div key={group.title ?? index}>
            {group.title && (
              <p className="mb-1.5 px-3 text-[11px] font-semibold uppercase tracking-[0.12em] text-white/40">
                {group.title}
              </p>
            )}
            <ul className="space-y-0.5">
              {group.items.map((item) => {
                const active = isActive(pathname, item)
                const Icon = item.icon
                const count = item.badge === "unread" ? unread : 0
                return (
                  <li key={item.href}>
                    <Link
                      href={item.href}
                      onClick={onNavigate}
                      aria-current={active ? "page" : undefined}
                      className={cx(
                        "group flex min-h-10 items-center gap-3 rounded-lg px-3 py-2 text-sm font-medium transition-colors",
                        active ? "bg-white/[0.1] text-white" : "text-white/65 hover:bg-white/[0.06] hover:text-white"
                      )}
                    >
                      <Icon
                        size={18}
                        aria-hidden="true"
                        className={active ? "text-accent-light" : "text-white/50 group-hover:text-white/80"}
                      />
                      <span className="flex-1">{item.label}</span>
                      {count > 0 && (
                        <span className="rounded-full bg-accent px-1.5 py-0.5 text-[11px] font-semibold leading-none text-white">
                          {count}
                          <span className="sr-only"> non lu{count > 1 ? "s" : ""}</span>
                        </span>
                      )}
                    </Link>
                  </li>
                )
              })}
            </ul>
          </div>
        ))}
      </nav>

      <div className="shrink-0 space-y-1 border-t border-white/10 p-3">
        <a
          href="/"
          target="_blank"
          rel="noopener noreferrer"
          className="flex min-h-10 items-center gap-3 rounded-lg px-3 py-2 text-sm font-medium text-white/65 hover:bg-white/[0.06] hover:text-white"
        >
          <ExternalLink size={18} aria-hidden="true" className="text-white/50" />
          Voir le portfolio
          <span className="sr-only">(nouvel onglet)</span>
        </a>
        <div className="flex items-center gap-3 rounded-lg px-3 py-2">
          <span
            aria-hidden="true"
            className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-institutional text-xs font-bold uppercase text-white"
          >
            {email?.[0] ?? "A"}
          </span>
          <p className="min-w-0 flex-1 truncate text-xs text-white/60" title={email}>
            {email}
          </p>
          <form action={logoutAction}>
            <button
              type="submit"
              aria-label="Se déconnecter"
              title="Se déconnecter"
              className="inline-flex h-9 w-9 items-center justify-center rounded-lg text-white/60 hover:bg-white/10 hover:text-white"
            >
              <LogOut size={17} aria-hidden="true" />
            </button>
          </form>
        </div>
      </div>
    </div>
  )
}

export default function AdminShell({ children, email, unread, logoutAction }) {
  const pathname = usePathname() ?? "/admin"
  const [open, setOpen] = useState(false)
  const [openedAt, setOpenedAt] = useState(pathname)

  if (open && openedAt !== pathname) setOpen(false)

  useEffect(() => {
    if (!open) return
    const onKey = (event) => event.key === "Escape" && setOpen(false)
    document.addEventListener("keydown", onKey)
    const overflow = document.body.style.overflow
    document.body.style.overflow = "hidden"
    return () => {
      document.removeEventListener("keydown", onKey)
      document.body.style.overflow = overflow
    }
  }, [open])

  const current = NAV.flatMap((group) => group.items).find((item) => isActive(pathname, item))

  return (
    <div className="min-h-screen bg-[#f5f6f8]">
      <a
        href="#admin-main"
        className="sr-only focus:not-sr-only focus:fixed focus:left-3 focus:top-3 focus:z-[80] focus:rounded-lg focus:bg-navy focus:px-4 focus:py-2 focus:text-white"
      >
        Aller au contenu
      </a>

      {/* Desktop sidebar */}
      <aside className="fixed inset-y-0 left-0 z-40 hidden w-64 bg-navy lg:block">
        <SidebarContent pathname={pathname} email={email} unread={unread} logoutAction={logoutAction} />
      </aside>

      {/* Mobile top bar + drawer */}
      <div className="sticky top-0 z-30 flex h-14 items-center gap-3 border-b border-gray-200 bg-white/95 px-3 backdrop-blur lg:hidden">
        <button
          type="button"
          onClick={() => {
            setOpenedAt(pathname)
            setOpen(true)
          }}
          aria-label="Ouvrir le menu"
          aria-expanded={open}
          aria-controls="admin-drawer"
          className="inline-flex h-10 w-10 items-center justify-center rounded-lg text-navy hover:bg-navy/5"
        >
          <Menu size={22} aria-hidden="true" />
        </button>
        <p className="flex-1 truncate font-heading text-[15px] font-semibold text-navy">
          {current?.label ?? "Administration"}
        </p>
        {unread > 0 && (
          <Link
            href="/admin/messages"
            aria-label={`${unread} message${unread > 1 ? "s" : ""} non lu${unread > 1 ? "s" : ""}`}
            className="relative inline-flex h-10 w-10 items-center justify-center rounded-lg text-navy/70 hover:bg-navy/5"
          >
            <MessageSquare size={20} aria-hidden="true" />
            <span className="absolute right-1.5 top-1.5 h-2.5 w-2.5 rounded-full bg-accent ring-2 ring-white" />
          </Link>
        )}
      </div>

      {open && (
        <div id="admin-drawer" className="fixed inset-0 z-50 lg:hidden" role="dialog" aria-modal="true" aria-label="Menu">
          <div className="absolute inset-0 bg-navy/50" onClick={() => setOpen(false)} aria-hidden="true" />
          <div className="relative h-full w-[min(20rem,85vw)] bg-navy shadow-2xl animate-[sheet-in_0.2s_ease-out]">
            <button
              type="button"
              onClick={() => setOpen(false)}
              aria-label="Fermer le menu"
              className="absolute right-2 top-3 z-10 inline-flex h-10 w-10 items-center justify-center rounded-lg text-white/70 hover:bg-white/10 hover:text-white"
            >
              <X size={20} aria-hidden="true" />
            </button>
            <SidebarContent
              pathname={pathname}
              email={email}
              unread={unread}
              logoutAction={logoutAction}
              onNavigate={() => setOpen(false)}
            />
          </div>
        </div>
      )}

      <main id="admin-main" tabIndex={-1} className="outline-none lg:pl-64">
        <div className="mx-auto w-full max-w-6xl px-4 py-6 sm:px-6 sm:py-8 lg:px-10 lg:py-10">{children}</div>
      </main>
    </div>
  )
}
