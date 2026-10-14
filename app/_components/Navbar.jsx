"use client"

import Link from "next/link"
import { useEffect, useRef, useState } from "react"
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
  const toggleRef = useRef(null)
  const menuRef = useRef(null)

  // Close the mobile menu after navigation (state reset during render, no effect needed).
  if (open && openedAt !== pathname) {
    setOpen(false)
  }

  useEffect(() => {
    if (!open) return
    // Move focus into the menu so keyboard and screen reader users land on the links.
    menuRef.current?.querySelector("a")?.focus()

    const onKeyDown = (event) => {
      if (event.key !== "Escape") return
      setOpen(false)
      toggleRef.current?.focus()
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

  return (
    <>
      <header className="site-header fixed inset-x-0 top-0 z-50 border-b backdrop-blur-md">
        <nav
          aria-label={a11y.mainNav}
          className="mx-auto flex h-16 max-w-page items-center justify-between gap-4 px-4 sm:px-6"
        >
          <Link
            href={localePath(locale, "/")}
            className="group flex min-h-11 items-center gap-3 rounded-lg"
            aria-label={`Paterne SEKA — ${nav.home}`}
          >
            <Logo className="h-9 w-9 transition-surface group-hover:scale-105" />
            <span className="font-heading text-[15px] font-bold tracking-tight text-white">Paterne SEKA</span>
          </Link>

          <ul className="hidden items-center gap-1 md:flex">
            {ITEMS.map((item) => {
              const active = isActive(current, item.path)
              return (
                <li key={item.key}>
                  <Link
                    href={localePath(locale, item.path)}
                    aria-current={active ? "page" : undefined}
                    className={`inline-flex min-h-10 items-center rounded-full px-3.5 text-sm font-medium transition-surface ${
                      active ? "bg-white/[0.08] text-white" : "text-white/65 hover:bg-white/[0.05] hover:text-white"
                    }`}
                  >
                    {nav[item.key]}
                  </Link>
                </li>
              )
            })}
          </ul>

          <div className="hidden items-center gap-2 md:flex">
            <Link
              href={switchHref}
              hrefLang={otherLocale}
              lang={otherLocale}
              className="inline-flex min-h-10 items-center rounded-full px-3 text-xs font-semibold tracking-wider text-white/65 transition-surface hover:bg-white/[0.05] hover:text-white"
              title={nav.switchLanguage}
            >
              <span aria-hidden="true">{nav.switchLanguageShort}</span>
              <span className="sr-only">{nav.switchLanguage}</span>
            </Link>
            {cvUrl && (
              <a
                href={cvUrl}
                download
                data-track="cv_download"
                data-track-from="header"
                className="group inline-flex min-h-10 items-center gap-2 rounded-control border border-white/15 px-3.5 text-sm font-medium text-white transition-surface hover:border-white/30 hover:bg-white/[0.06]"
              >
                <Download size={15} aria-hidden="true" className="transition-surface group-hover:translate-y-px" />
                {nav.resume}
              </a>
            )}
          </div>

          <button
            ref={toggleRef}
            type="button"
            onClick={toggle}
            className="-mr-2 inline-flex h-11 w-11 items-center justify-center rounded-lg text-white transition-surface hover:bg-white/[0.06] md:hidden"
            aria-expanded={open}
            aria-controls="mobile-menu"
            aria-label={open ? a11y.closeMenu : a11y.openMenu}
          >
            {open ? <X size={22} aria-hidden="true" /> : <Menu size={22} aria-hidden="true" />}
          </button>
        </nav>

        {open && (
          <div
            id="mobile-menu"
            ref={menuRef}
            className="menu-panel relative max-h-[calc(100dvh-4rem)] overflow-y-auto border-t border-line bg-ink md:hidden"
          >
            <ul className="mx-auto flex max-w-page flex-col px-4 py-3 sm:px-6">
              {ITEMS.map((item) => {
                const active = isActive(current, item.path)
                return (
                  <li key={item.key}>
                    <Link
                      href={localePath(locale, item.path)}
                      aria-current={active ? "page" : undefined}
                      onClick={() => setOpen(false)}
                      className={`flex min-h-12 items-center justify-between rounded-lg px-3 text-base font-medium transition-surface ${
                        active ? "bg-white/[0.06] text-white" : "text-white/70 hover:bg-white/[0.04] hover:text-white"
                      }`}
                    >
                      {nav[item.key]}
                      {active && <span aria-hidden="true" className="h-1.5 w-1.5 rounded-full bg-accent-light" />}
                    </Link>
                  </li>
                )
              })}
            </ul>
            <div className="mx-auto flex max-w-page flex-col gap-3 border-t border-line px-4 py-4 xs:flex-row sm:px-6">
              {cvUrl && (
                <a
                  href={cvUrl}
                  download
                  data-track="cv_download"
                  data-track-from="mobile_menu"
                  className="inline-flex min-h-11 flex-1 items-center justify-center gap-2 rounded-control border border-white/15 px-4 text-sm font-medium text-white"
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
                className="inline-flex min-h-11 items-center justify-center rounded-control border border-white/15 px-4 text-sm font-medium text-white"
              >
                {nav.switchLanguage}
              </Link>
            </div>
          </div>
        )}
      </header>
      {open && (
        // Tapping outside the panel closes the menu. Outside <header>: its backdrop-filter
        // would otherwise become the containing block of this fixed layer.
        <div
          aria-hidden="true"
          onClick={() => setOpen(false)}
          className="fixed inset-x-0 top-16 bottom-0 z-40 bg-ink/60 backdrop-blur-[2px] md:hidden"
        />
      )}
    </>
  )
}
