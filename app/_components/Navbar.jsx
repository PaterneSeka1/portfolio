"use client"

import Link from "next/link"
import { useEffect, useState } from "react"
import { usePathname } from "next/navigation"
import { Download, Menu, X } from "lucide-react"
import Logo from "./Logo"
import { localePath, stripLocale } from "../../lib/i18n/config"

const ITEMS = [
  { key: "home", path: "/" },
  { key: "work", path: "/work" },
  { key: "expertise", path: "/expertise" },
  { key: "about", path: "/about" },
  { key: "contact", path: "/contact" },
]

function isActive(current, path) {
  if (path === "/") return current === "/"
  return current === path || current.startsWith(`${path}/`)
}

export default function Navbar({ locale, nav, a11y, cvUrl }) {
  const pathname = usePathname() ?? "/"
  const current = stripLocale(pathname)
  const [open, setOpen] = useState(false)
  const [openedAt, setOpenedAt] = useState(pathname)

  // Close the mobile menu after navigation (state reset during render, no effect needed).
  if (open && openedAt !== pathname) {
    setOpen(false)
  }

  useEffect(() => {
    if (!open) return
    const onKeyDown = (event) => {
      if (event.key === "Escape") setOpen(false)
    }
    window.addEventListener("keydown", onKeyDown)
    return () => window.removeEventListener("keydown", onKeyDown)
  }, [open])

  const otherLocale = locale === "fr" ? "en" : "fr"
  const switchHref = localePath(otherLocale, current)

  const toggle = () => {
    setOpenedAt(pathname)
    setOpen((value) => !value)
  }

  const linkClass = (active) =>
    `text-sm font-medium transition-colors ${
      active ? "text-white" : "text-white/65 hover:text-white"
    }`

  return (
    <header className="fixed inset-x-0 top-0 z-50 border-b border-white/[0.08] bg-ink/85 backdrop-blur-md supports-[backdrop-filter]:bg-ink/70">
      <nav
        aria-label={a11y.mainNav}
        className="mx-auto flex h-16 max-w-6xl items-center justify-between gap-4 px-4 sm:px-6"
      >
        <Link
          href={localePath(locale, "/")}
          className="flex items-center gap-3 rounded-lg"
          aria-label={`Paterne SEKA — ${nav.home}`}
        >
          <Logo variant="white" className="h-9 w-9" />
          <span className="font-heading text-[15px] font-bold tracking-tight text-white">Paterne SEKA</span>
        </Link>

        <ul className="hidden items-center gap-7 md:flex">
          {ITEMS.map((item) => {
            const active = isActive(current, item.path)
            return (
              <li key={item.key}>
                <Link
                  href={localePath(locale, item.path)}
                  aria-current={active ? "page" : undefined}
                  className={`relative py-1 ${linkClass(active)} ${
                    active ? "after:absolute after:inset-x-0 after:-bottom-[21px] after:h-px after:bg-accent-light" : ""
                  }`}
                >
                  {nav[item.key]}
                </Link>
              </li>
            )
          })}
        </ul>

        <div className="hidden items-center gap-3 md:flex">
          <Link
            href={switchHref}
            hrefLang={otherLocale}
            lang={otherLocale}
            className="rounded-md px-2 py-1 text-xs font-semibold tracking-wider text-white/65 transition-colors hover:text-white"
            title={nav.switchLanguage}
          >
            <span aria-hidden="true">{nav.switchLanguageShort}</span>
            <span className="sr-only">{nav.switchLanguage}</span>
          </Link>
          {cvUrl && (
            <a
              href={cvUrl}
              download
              className="inline-flex items-center gap-2 rounded-lg border border-white/15 px-3.5 py-2 text-sm font-medium text-white transition-colors hover:border-white/30 hover:bg-white/5"
            >
              <Download size={15} aria-hidden="true" />
              {nav.resume}
            </a>
          )}
        </div>

        <button
          type="button"
          onClick={toggle}
          className="-mr-2 inline-flex h-11 w-11 items-center justify-center rounded-lg text-white md:hidden"
          aria-expanded={open}
          aria-controls="mobile-menu"
          aria-label={open ? a11y.closeMenu : a11y.openMenu}
        >
          {open ? <X size={22} aria-hidden="true" /> : <Menu size={22} aria-hidden="true" />}
        </button>
      </nav>

      {open && (
        <div id="mobile-menu" className="border-t border-white/[0.08] bg-ink md:hidden">
          <ul className="mx-auto flex max-w-6xl flex-col px-4 py-3 sm:px-6">
            {ITEMS.map((item) => {
              const active = isActive(current, item.path)
              return (
                <li key={item.key}>
                  <Link
                    href={localePath(locale, item.path)}
                    aria-current={active ? "page" : undefined}
                    onClick={() => setOpen(false)}
                    className={`block rounded-lg px-2 py-3 text-base ${linkClass(active)}`}
                  >
                    {nav[item.key]}
                  </Link>
                </li>
              )
            })}
          </ul>
          <div className="mx-auto flex max-w-6xl items-center gap-3 border-t border-white/[0.08] px-4 py-4 sm:px-6">
            {cvUrl && (
              <a
                href={cvUrl}
                download
                className="inline-flex flex-1 items-center justify-center gap-2 rounded-lg border border-white/15 px-4 py-2.5 text-sm font-medium text-white"
              >
                <Download size={15} aria-hidden="true" />
                {nav.downloadResume}
              </a>
            )}
            <Link
              href={switchHref}
              hrefLang={otherLocale}
              lang={otherLocale}
              onClick={() => setOpen(false)}
              className="inline-flex items-center justify-center rounded-lg border border-white/15 px-4 py-2.5 text-sm font-medium text-white"
            >
              {nav.switchLanguage}
            </Link>
          </div>
        </div>
      )}
    </header>
  )
}
