import { readFile } from "node:fs/promises"
import path from "node:path"
import { ImageResponse } from "next/og"
import { getDictionary } from "../../../lib/i18n"
import { isLocale, locales } from "../../../lib/i18n/config"

export const dynamic = "force-static"

export function generateStaticParams() {
  return locales.map((locale) => ({ locale }))
}

const SIZE = { width: 1200, height: 630 }

const TAGLINES = {
  fr: "Applications métier & solutions digitales",
  en: "Business Applications & Digital Solutions",
}

/** Social sharing card (LinkedIn, WhatsApp, X, Facebook): 1200×630 PNG. */
export async function GET(_request, { params }) {
  const { locale: requested } = await params
  const locale = isLocale(requested) ? requested : "fr"
  const dict = getDictionary(locale)
  const logo = await readFile(path.join(process.cwd(), "public", "logo-ps-blanc.png"))
  const logoSrc = `data:image/png;base64,${logo.toString("base64")}`

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          padding: "72px 80px",
          background: "#09131e",
          color: "#ffffff",
          position: "relative",
        }}
      >
        <div
          style={{
            position: "absolute",
            right: -120,
            top: -140,
            width: 520,
            height: 520,
            borderRadius: 80,
            background: "#133a7c",
            opacity: 0.45,
            transform: "rotate(12deg)",
          }}
        />
        <div style={{ display: "flex", alignItems: "center", gap: 20 }}>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src={logoSrc} width={84} height={84} alt="" />
          <div style={{ display: "flex", fontSize: 26, color: "rgba(255,255,255,0.65)", letterSpacing: 1 }}>
            Portfolio
          </div>
        </div>

        <div style={{ display: "flex", flexDirection: "column" }}>
          <div style={{ display: "flex", fontSize: 92, fontWeight: 800, letterSpacing: -2, lineHeight: 1 }}>
            Paterne SEKA
          </div>
          <div style={{ display: "flex", marginTop: 28, fontSize: 44, fontWeight: 700, color: "#7cb2ff" }}>
            Full-Stack Engineer
          </div>
          <div style={{ display: "flex", marginTop: 10, fontSize: 40, color: "rgba(255,255,255,0.9)" }}>
            {TAGLINES[locale]}
          </div>
        </div>

        <div style={{ display: "flex", alignItems: "center", gap: 16, fontSize: 24, color: "rgba(255,255,255,0.6)" }}>
          <div style={{ display: "flex", width: 48, height: 4, borderRadius: 2, background: "#2563eb" }} />
          {dict.hero.focus.join("  ·  ")}
        </div>
      </div>
    ),
    {
      ...SIZE,
      headers: { "Cache-Control": "public, max-age=86400, immutable" },
    }
  )
}
