"use client"

import { useEffect } from "react"
import { useParams } from "next/navigation"
import { RotateCw } from "lucide-react"
import { ButtonLink, Container, buttonClasses } from "../_components/ui"
import { localePath } from "../../lib/i18n/config"

// Kept inline: importing the dictionaries would ship both of them to the browser.
const MESSAGES = {
  fr: {
    title: "Cette page n’a pas pu être chargée",
    text: "Un incident temporaire empêche l’affichage du contenu. Vous pouvez réessayer ou revenir à l’accueil.",
    retry: "Réessayer",
    home: "Retour à l’accueil",
  },
  en: {
    title: "This page could not be loaded",
    text: "A temporary issue prevents the content from being displayed. You can try again or go back home.",
    retry: "Try again",
    home: "Back to home",
  },
}

/** Public error boundary: the header and footer stay usable, the page can be retried. */
export default function PublicError({ error, reset }) {
  const params = useParams()
  const locale = params?.locale === "en" ? "en" : "fr"
  const t = MESSAGES[locale]

  useEffect(() => {
    console.error(error)
  }, [error])

  return (
    <Container className="flex min-h-[60vh] flex-col items-start justify-center py-20">
      <p className="font-heading text-sm font-bold text-accent-light">500</p>
      <h1 className="mt-3 font-heading text-3xl font-bold text-white sm:text-4xl">{t.title}</h1>
      <p className="mt-4 max-w-xl text-white/70">{t.text}</p>
      <div className="mt-8 flex flex-col gap-3 xs:flex-row">
        <button type="button" onClick={() => reset()} className={buttonClasses("primary")}>
          <RotateCw size={16} aria-hidden="true" />
          {t.retry}
        </button>
        <ButtonLink href={localePath(locale, "/")} variant="secondary">
          {t.home}
        </ButtonLink>
      </div>
    </Container>
  )
}
