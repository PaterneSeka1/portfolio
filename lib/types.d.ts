/**
 * Shapes of the public site data, as returned by lib/db/* after localisation.
 * The code base is JavaScript: these types document the contracts and power
 * editor autocompletion through JSDoc (`@param {import("…/lib/types").Project}`).
 */

export type ProjectCategory = "business" | "saas" | "website" | "ai"
export type ProjectVisibility = "public" | "private"
export type ProjectStatus = "draft" | "published" | "archived"

/** Screenshot uploaded in the admin (Réalisations → Captures). The first one is the cover. */
export interface ProjectImage {
  id: string
  url: string
  alt?: string | null
  order: number
}

/** Case study content; every key is optional and empty values are not rendered. */
export interface CaseStudy {
  headline?: string
  context?: string
  problem?: string
  objectives?: string[]
  constraints?: string[]
  solution?: string
  /** 2 to 4 short, verifiable strengths shown on cards, the spotlight and the case study header. */
  highlights?: string[]
  features?: string[]
  users?: string[]
  role?: string[]
  collaboration?: string
  architecture?: string
  /** One node per line "Label | detail"; "- " prefix for parallel branches. */
  architectureDiagram?: string
  stack?: string[]
  challenges?: string[]
  decisions?: string[]
  /** Factual only: no invented figures. */
  results?: string[]
  nextSteps?: string[]
  ctaTitle?: string
}

export interface Project {
  id: string
  slug: string
  title: string
  category: ProjectCategory
  visibility: ProjectVisibility
  status: ProjectStatus
  summary: string
  technologies: string[]
  publicUrl?: string | null
  githubUrl?: string | null
  featured: boolean
  order: number
  seoTitle?: string | null
  seoDescription?: string | null
  caseStudy: CaseStudy
  cta: { label: string; href: string }
  images: ProjectImage[]
}

export interface Profile {
  name: string
  title: string
  tagline?: string | null
  promise: string
  location: string
  available: boolean
  availabilityLabel: string
  email: string
  phone?: string | null
  github?: string | null
  linkedin?: string | null
  cvUrl?: string | null
  heroPhoto?: string | null
}

/** Analytics events forwarded by lib/analytics.js (see data-track attributes). */
export type TrackedEvent =
  | "cv_download"
  | "github_click"
  | "linkedin_click"
  | "case_study_open"
  | "contact_click"
  | "contact_submit"
