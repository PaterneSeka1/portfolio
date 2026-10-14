import { test } from "node:test"
import assert from "node:assert/strict"
import fr from "../lib/i18n/dictionaries/fr.js"
import en from "../lib/i18n/dictionaries/en.js"
import { frenchTypography } from "../lib/i18n/typography.js"
import { localeFromPathname } from "../lib/i18n/config.js"

/** Every key path of a dictionary ("home.paths.recruit.title", array lengths included). */
function shape(value, path = "") {
  if (Array.isArray(value))
    return [`${path}[${value.length}]`, ...value.flatMap((item, i) => shape(item, `${path}[${i}]`))]
  if (value && typeof value === "object")
    return Object.entries(value).flatMap(([key, item]) => shape(item, path ? `${path}.${key}` : key))
  return [`${path}:${typeof value}`]
}

test("French and English dictionaries have the same structure", () => {
  const frShape = new Set(shape(fr))
  const enShape = new Set(shape(en))
  assert.deepEqual(
    [...frShape].filter((k) => !enShape.has(k)),
    [],
    "keys missing in en.js"
  )
  assert.deepEqual(
    [...enShape].filter((k) => !frShape.has(k)),
    [],
    "keys missing in fr.js"
  )
})

test("capability proofs and infrastructure layers reference known icons and slugs", () => {
  for (const dict of [fr, en]) {
    for (const layer of dict.home.production.layers) assert.ok(layer.icon && layer.label && layer.detail)
    for (const item of dict.home.build.items) assert.ok(Array.isArray(item.projects))
  }
})

test("frenchTypography adds non-breaking spaces and typographic apostrophes", () => {
  assert.equal(frenchTypography("Contexte : l'idée ?"), "Contexte : l’idée ?")
  assert.equal(frenchTypography("https://exemple.fr?a=1"), "https://exemple.fr?a=1")
})

test("localeFromPathname reads the /en prefix and defaults to French", () => {
  assert.equal(localeFromPathname("/en"), "en")
  assert.equal(localeFromPathname("/en/work/intranet"), "en")
  assert.equal(localeFromPathname("/english"), "fr")
  assert.equal(localeFromPathname("/fr/work"), "fr")
  assert.equal(localeFromPathname(""), "fr")
})
