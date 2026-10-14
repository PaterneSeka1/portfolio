import { test } from "node:test"
import assert from "node:assert/strict"
import { SITE_URL, absoluteUrl } from "../lib/site-url.js"
import { trackPropsFrom } from "../lib/analytics.js"

test("absoluteUrl keeps absolute URLs and prefixes site paths", () => {
  assert.equal(absoluteUrl("https://storage.example.org/a.jpg"), "https://storage.example.org/a.jpg")
  assert.equal(absoluteUrl("/me.jpg"), `${SITE_URL}/me.jpg`)
  assert.equal(absoluteUrl("me.jpg"), `${SITE_URL}/me.jpg`)
  assert.equal(absoluteUrl(null), undefined)
})

test("trackPropsFrom reads data-track-* attributes as event properties", () => {
  const element = { dataset: { track: "case_study_open", trackProject: "intranet", trackFrom: "card", other: "x" } }
  assert.deepEqual(trackPropsFrom(element), { project: "intranet", from: "card" })
})
