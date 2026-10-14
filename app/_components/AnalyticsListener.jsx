"use client"

import { useEffect } from "react"
import { trackEvent, trackPropsFrom } from "../../lib/analytics"

/** One delegated listener for every `[data-track]` element (see lib/analytics.js). */
export default function AnalyticsListener() {
  useEffect(() => {
    const onClick = (event) => {
      const element = event.target instanceof Element ? event.target.closest("[data-track]") : null
      if (element) trackEvent(element.dataset.track, trackPropsFrom(element))
    }
    document.addEventListener("click", onClick, { capture: true, passive: true })
    return () => document.removeEventListener("click", onClick, { capture: true })
  }, [])

  return null
}
