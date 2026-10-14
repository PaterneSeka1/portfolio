import { test } from "node:test"
import assert from "node:assert/strict"
import { pickShowcaseProjects, projectHighlights, isPrivateProject } from "../lib/projects.js"

const project = (slug, extra = {}) => ({ slug, featured: true, visibility: "private", caseStudy: {}, ...extra })

test("projectHighlights prefers the dedicated field and caps its length", () => {
  const p = project("a", { caseStudy: { highlights: ["1", "2", "3", "4", "5"], features: ["f"] } })
  assert.deepEqual(projectHighlights(p), ["1", "2", "3", "4"])
  assert.deepEqual(projectHighlights(p, 2), ["1", "2"])
})

test("projectHighlights falls back to at most three features", () => {
  const p = project("a", { caseStudy: { features: ["f1", "f2", "f3", "f4"] } })
  assert.deepEqual(projectHighlights(p), ["f1", "f2", "f3"])
  assert.deepEqual(projectHighlights(project("b", { caseStudy: null })), [])
})

test("pickShowcaseProjects keeps the configured order and fills missing slots", () => {
  const projects = [
    project("rh-vedem"),
    project("scout-ascci"),
    project("intranet"),
    project("other", { featured: false }),
  ]
  assert.deepEqual(
    pickShowcaseProjects(projects).map((p) => p.slug),
    ["intranet", "scout-ascci", "rh-vedem"]
  )
})

test("pickShowcaseProjects ignores projects that are not featured", () => {
  assert.deepEqual(pickShowcaseProjects([project("intranet", { featured: false })]), [])
})

test("isPrivateProject", () => {
  assert.equal(isPrivateProject(project("a")), true)
  assert.equal(isPrivateProject(project("a", { visibility: "public" })), false)
})
