"use client"

import Image from "next/image"
import Link from "next/link"
import { motion } from "framer-motion"
import { Github, Linkedin, Mail, Download } from "lucide-react"

export default function Hero({ profile }) {
  return (
    <section className="relative min-h-[90vh] flex items-center overflow-hidden bg-navy text-white">
      {/* Discrete geometric shapes inspired by the logo */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute -top-24 -right-24 w-96 h-96 rotate-12 bg-institutional/30 rounded-3xl" />
        <div className="absolute bottom-0 left-0 w-72 h-72 -rotate-6 bg-accent/10 rounded-3xl translate-y-1/3 -translate-x-1/4" />
      </div>

      <div className="relative max-w-6xl mx-auto px-6 py-24 grid md:grid-cols-2 gap-12 items-center w-full">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="space-y-6"
        >
          {profile.available && (
            <span className="inline-flex items-center gap-2 rounded-full bg-white/10 px-4 py-1.5 text-sm text-white/80">
              <span className="h-2 w-2 rounded-full bg-accent" />
              {profile.availabilityLabel}
            </span>
          )}

          <div>
            <p className="text-lg text-white/70">Bonjour, je suis</p>
            <h1 className="font-heading font-extrabold text-4xl md:text-5xl lg:text-6xl">
              {profile.name}
            </h1>
            <p className="mt-2 font-heading text-xl md:text-2xl text-accent">
              {profile.title}
            </p>
          </div>

          <p className="text-white/70 max-w-lg leading-relaxed">{profile.promise}</p>

          <div className="flex flex-wrap gap-4">
            <Link
              href="/projets"
              className="rounded-lg bg-accent px-6 py-3 font-semibold hover:bg-accent/90 transition-colors"
            >
              Découvrir mes réalisations
            </Link>
            <Link
              href="/contact"
              className="rounded-lg border border-white/30 px-6 py-3 font-semibold hover:bg-white/10 transition-colors"
            >
              Me contacter
            </Link>
            <a
              href={profile.cvUrl}
              download
              className="inline-flex items-center gap-2 rounded-lg border border-white/30 px-6 py-3 font-semibold hover:bg-white/10 transition-colors"
            >
              <Download size={18} />
              Télécharger mon CV
            </a>
          </div>

          <div className="flex flex-wrap items-center gap-x-6 gap-y-3 pt-2 text-white/70">
            <span>{profile.location}</span>
            <div className="flex items-center gap-4">
              <a href={profile.github} target="_blank" rel="noopener noreferrer" aria-label="GitHub" className="hover:text-white transition-colors">
                <Github size={20} />
              </a>
              <a href={profile.linkedin} target="_blank" rel="noopener noreferrer" aria-label="LinkedIn" className="hover:text-white transition-colors">
                <Linkedin size={20} />
              </a>
              <a href={`mailto:${profile.email}`} aria-label="Email" className="hover:text-white transition-colors">
                <Mail size={20} />
              </a>
            </div>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, scale: 0.96 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.7, delay: 0.15 }}
          className="relative h-[420px] md:h-[520px] w-full"
        >
          <div className="absolute inset-0 rounded-[2.5rem] overflow-hidden">
            <Image
              src={profile.heroPhoto}
              alt={profile.name}
              fill
              priority
              sizes="(max-width: 768px) 100vw, 50vw"
              className="object-cover object-top"
            />
          </div>
        </motion.div>
      </div>
    </section>
  )
}
