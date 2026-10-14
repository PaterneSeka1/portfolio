/**
 * Free French → English machine translation for the admin, called from the
 * browser: both services allow cross-origin requests, need no key, and
 * rate-limit server IPs far more than a person's browser.
 *
 *  1. Google Translate's public endpoint, one request per ~1,800 characters
 *     (segments joined by line breaks, which it preserves);
 *  2. MyMemory as a fallback (lower quality, 5,000 characters/day).
 */
const GOOGLE_URL = "https://translate.googleapis.com/translate_a/single"
const MYMEMORY_URL = "https://api.mymemory.translated.net/get"
const CHUNK_CHARACTERS = 1800

async function translateChunkWithGoogle(lines) {
  const url = new URL(GOOGLE_URL)
  url.search = new URLSearchParams({ client: "gtx", sl: "fr", tl: "en", dt: "t", q: lines.join("\n") }).toString()
  const response = await fetch(url)
  if (!response.ok) throw new Error(`Google ${response.status}`)
  const data = await response.json()
  // The answer is split by sentence: [[["translated", "source", …], …], …]
  const result = data[0].map((part) => part[0]).join("").split("\n").map((line) => line.trim())
  if (result.length !== lines.length) throw new Error("Google: unexpected line count")
  return result
}

async function translateWithGoogle(lines) {
  const results = []
  let chunk = []
  let size = 0
  for (const line of lines) {
    if (chunk.length && size + line.length > CHUNK_CHARACTERS) {
      results.push(...(await translateChunkWithGoogle(chunk)))
      chunk = []
      size = 0
    }
    chunk.push(line)
    size += line.length + 1
  }
  if (chunk.length) results.push(...(await translateChunkWithGoogle(chunk)))
  return results
}

async function translateWithMyMemory(lines) {
  const results = []
  for (const line of lines) {
    const url = new URL(MYMEMORY_URL)
    url.search = new URLSearchParams({ q: line, langpair: "fr|en" }).toString()
    const response = await fetch(url)
    const data = response.ok ? await response.json() : null
    if (Number(data?.responseStatus) !== 200 || data.quotaFinished) throw new Error("MyMemory unavailable")
    results.push(data.responseData.translatedText)
  }
  return results
}

/** Translates each text, keeping its line breaks. Throws with a French message when no service answers. */
export async function translateFrToEn(texts) {
  const lines = [...new Set(texts.flatMap((text) => text.split("\n")).map((line) => line.trim()).filter(Boolean))]
  let translated
  try {
    translated = await translateWithGoogle(lines)
  } catch {
    try {
      translated = await translateWithMyMemory(lines)
    } catch {
      throw new Error("Le service de traduction est momentanément indisponible. Réessayez dans un instant ou traduisez à la main.")
    }
  }
  const byLine = new Map(lines.map((line, index) => [line, translated[index]]))
  return texts.map((text) =>
    text
      .split("\n")
      .map((line) => byLine.get(line.trim()) ?? line)
      .join("\n")
  )
}
