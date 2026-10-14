"use client"

import { useEffect } from "react"
import { usePathname } from "next/navigation"

const SELECTOR = "[data-reveal]:not([data-revealed]), [data-reveal-children]:not([data-revealed])"

/**
 * Single client island behind every scroll reveal of the public site.
 *
 * Sections stay Server Components and only carry `data-reveal` (or
 * `data-reveal-children` to stagger their direct children). This observer:
 * - marks what is already on screen as revealed *before* enabling the hidden
 *   state, so the first paint never flashes or delays the LCP;
 * - reveals the rest once as it enters the viewport, then stops observing it;
 * - re-scans after each client navigation, which gives new pages a short,
 *   non-blocking entrance.
 * Without JavaScript, or with prefers-reduced-motion, nothing is ever hidden.
 */
export default function MotionObserver() {
  const pathname = usePathname()

  useEffect(() => {
    const root = document.documentElement
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)")
    const reveal = (element) => element.setAttribute("data-revealed", "")

    const elements = Array.from(document.querySelectorAll(SELECTOR))

    if (reduce.matches || !("IntersectionObserver" in window)) {
      elements.forEach(reveal)
      return
    }

    const isFirstRun = !root.classList.contains("motion-ready")
    const viewportHeight = window.innerHeight
    const pending = []

    for (const element of elements) {
      // On first load, content on screen (or above it, after a restored scroll
      // position or an anchor) was already painted by the server: keep it as is.
      if (isFirstRun && element.getBoundingClientRect().top < viewportHeight) reveal(element)
      else pending.push(element)
    }

    root.classList.add("motion-ready")

    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (!entry.isIntersecting) continue
          reveal(entry.target)
          observer.unobserve(entry.target)
        }
      },
      { rootMargin: "0px 0px -6% 0px", threshold: 0.01 }
    )
    pending.forEach((element) => observer.observe(element))

    // Safety net for fast scrolls (fling, End key, anchor jump) that skip past an
    // element between two frames: once scrolling settles, anything above the
    // bottom of the viewport is revealed.
    let settleTimer = 0
    const sweep = () => {
      const bottomEdge = window.innerHeight
      for (const element of document.querySelectorAll(SELECTOR)) {
        if (element.getBoundingClientRect().top < bottomEdge) {
          reveal(element)
          observer.unobserve(element)
        }
      }
    }
    const onScroll = () => {
      clearTimeout(settleTimer)
      settleTimer = window.setTimeout(sweep, 140)
    }
    window.addEventListener("scroll", onScroll, { passive: true })

    // Switching to reduced motion mid-session reveals everything immediately.
    const onPreferenceChange = (event) => {
      if (!event.matches) return
      document.querySelectorAll(SELECTOR).forEach(reveal)
      observer.disconnect()
    }
    reduce.addEventListener("change", onPreferenceChange)

    return () => {
      observer.disconnect()
      clearTimeout(settleTimer)
      window.removeEventListener("scroll", onScroll)
      reduce.removeEventListener("change", onPreferenceChange)
    }
  }, [pathname])

  return null
}
