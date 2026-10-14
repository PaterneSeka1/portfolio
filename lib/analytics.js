/**
 * Privacy-friendly event tracking, provider-agnostic.
 *
 * No analytics tool is installed on the site. Interactive elements only carry
 * `data-track="<event>"` (plus optional `data-track-<prop>` attributes) and the
 * AnalyticsListener island forwards clicks here. Events reach a provider only
 * if one has been added to the page (Plausible or Umami); otherwise they are
 * dispatched as a DOM event that a future integration can listen to.
 *
 * Tracked events: cv_download, github_click, linkedin_click, case_study_open,
 * contact_click, contact_submit.
 */
/**
 * @param {import("./types").TrackedEvent} name
 * @param {Record<string, string | undefined>} [props]
 */
export function trackEvent(name, props = {}) {
  if (typeof window === "undefined" || !name) return
  try {
    if (typeof window.plausible === "function") window.plausible(name, { props })
    else if (window.umami?.track) window.umami.track(name, props)
    window.dispatchEvent(new CustomEvent("portfolio:track", { detail: { name, props } }))
  } catch {
    // Analytics must never break the page.
  }
}

/** Reads `data-track-*` attributes (except the event name) as event properties. */
export function trackPropsFrom(element) {
  const props = {}
  for (const [key, value] of Object.entries(element.dataset)) {
    if (key === "track" || !key.startsWith("track")) continue
    const prop = key.slice("track".length)
    props[prop.charAt(0).toLowerCase() + prop.slice(1)] = value
  }
  return props
}
