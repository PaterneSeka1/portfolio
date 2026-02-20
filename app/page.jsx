"use client"

import Link from "next/link"
import { motion } from "framer-motion"
import { useThemeStore } from "./store/themeStore"

const atouts = [
  {
    titre: "Développement Web Moderne",
    description: "Applications rapides et maintenables avec une architecture propre et scalable."
  },
  {
    titre: "UX & Interfaces Soignées",
    description: "Interfaces fluides, lisibles et orientées conversion, sur desktop comme mobile."
  },
  {
    titre: "Livraison Axée Résultat",
    description: "Approche pragmatique: délais tenus, qualité du code, valeur métier mesurable."
  }
]

const chiffres = [
  { valeur: "10+", label: "Projets réalisés" },
  { valeur: "3+", label: "Stacks maîtrisées" },
  { valeur: "100%", label: "Approche orientée qualité" }
]

const stack = ["Next.js", "React", "Node.js", "NestJS", "Laravel", "MongoDB", "Prisma", "TailwindCSS"]

export default function Home() {
  const { theme } = useThemeStore()

  const bgGradient =
    theme === "dark"
      ? "bg-gradient-to-b from-slate-900 via-slate-900 to-slate-950 text-slate-100"
      : "bg-gradient-to-b from-slate-300 via-slate-200 to-slate-300 text-slate-950"

  const cardClass =
    theme === "dark"
      ? "bg-slate-800/45 border-slate-600/35"
      : "bg-white/80 border-slate-300/90"

  const btnPrimary =
    theme === "dark"
      ? "bg-gradient-to-r from-sky-600 to-sky-500 hover:from-sky-500 hover:to-sky-600 text-white"
      : "bg-gradient-to-r from-sky-600 to-sky-500 hover:from-sky-500 hover:to-sky-600 text-white"

  const name = "Paterne SEKA"
  const letters = name.split("")

  return (
    <main className={`relative min-h-screen overflow-hidden transition-colors duration-700 ${bgGradient}`}>
      <motion.div
        className="absolute inset-0 -z-10"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1.2 }}
      >
        <div
          className={`absolute -top-40 left-1/2 h-[920px] w-[920px] -translate-x-1/2 rounded-full blur-[200px] opacity-25 ${
            theme === "dark" ? "bg-slate-700" : "bg-sky-400/55"
          }`}
        />
        <div
          className={`absolute bottom-0 right-0 h-[520px] w-[520px] rounded-full blur-[180px] opacity-20 ${
            theme === "dark" ? "bg-sky-800" : "bg-sky-300/45"
          }`}
        />
      </motion.div>

      <section className="section-wrap space-y-8">
        <motion.div
          initial={{ opacity: 0, y: 28 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
          className={`soft-card rounded-3xl border p-8 md:p-12 backdrop-blur-xl ${cardClass}`}
        >
          <p className="mb-4 text-sm font-semibold uppercase tracking-[0.2em] text-sky-700 dark:text-sky-300">
            Développeur Full-Stack
          </p>

          <h1 className="text-4xl font-extrabold leading-[1.08] md:text-6xl">
            Je transforme des idées en produits web
            <span className="block mt-2">
              {letters.map((letter, index) => (
                <motion.span
                  key={index}
                  initial={{ y: 30, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ delay: index * 0.03, type: "spring", stiffness: 110 }}
                  className={
                    letter === " "
                      ? "inline-block w-3"
                      : "text-transparent bg-clip-text bg-gradient-to-r from-sky-400 via-sky-500 to-sky-600"
                  }
                >
                  {letter}
                </motion.span>
              ))}
            </span>
          </h1>

          <p className="text-secondary mt-6 max-w-3xl text-lg leading-8 md:text-xl md:leading-9">
            Je conçois des applications performantes, élégantes et orientées métier. Mon objectif: offrir une expérience utilisateur fluide avec une base technique solide.
          </p>

          <div className="mt-8 flex flex-wrap gap-3">
            <Link href="/projects" className={`rounded-xl px-6 py-3 text-base font-semibold transition-all ${btnPrimary}`}>
              Voir mes projets
            </Link>
            <Link
              href="/contact"
              className={`rounded-xl border px-6 py-3 text-base font-semibold transition-colors ${
                theme === "dark" ? "border-slate-500/60 hover:bg-slate-700/50" : "border-slate-300 hover:bg-slate-200"
              }`}
            >
              Me contacter
            </Link>
          </div>
        </motion.div>

        <section className="grid gap-4 sm:grid-cols-3">
          {chiffres.map((item, index) => (
            <motion.article
              key={item.label}
              initial={{ opacity: 0, y: 18 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.08, duration: 0.5 }}
              className={`soft-card rounded-2xl border p-6 text-center backdrop-blur-lg ${cardClass}`}
            >
              <p className="text-3xl font-extrabold text-sky-600 dark:text-sky-300">{item.valeur}</p>
              <p className="text-secondary mt-2 text-base font-medium">{item.label}</p>
            </motion.article>
          ))}
        </section>

        <section className="grid gap-4 lg:grid-cols-3">
          {atouts.map((bloc, index) => (
            <motion.article
              key={bloc.titre}
              initial={{ opacity: 0, y: 18 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1, duration: 0.5 }}
              className={`soft-card rounded-2xl border p-6 backdrop-blur-lg ${cardClass}`}
            >
              <h2 className="text-2xl font-bold">{bloc.titre}</h2>
              <p className="text-secondary mt-3 text-base leading-8">{bloc.description}</p>
            </motion.article>
          ))}
        </section>

        <section className={`soft-card rounded-2xl border p-6 md:p-8 backdrop-blur-lg ${cardClass}`}>
          <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
            <div>
              <h2 className="text-xl font-bold md:text-2xl">Stack principale</h2>
              <p className="text-secondary mt-2 text-base leading-7">
                Technologies que j&apos;utilise au quotidien pour construire des produits robustes.
              </p>
            </div>
            <Link
              href="/skills"
              className={`w-fit rounded-lg border px-4 py-2 text-sm font-semibold ${
                theme === "dark" ? "border-slate-500/60 hover:bg-slate-700/50" : "border-slate-300 hover:bg-slate-200"
              }`}
            >
              Voir toutes les compétences
            </Link>
          </div>

          <div className="mt-5 flex flex-wrap gap-2">
            {stack.map((tech) => (
              <span
                key={tech}
                className={`rounded-full border px-3 py-1.5 text-xs font-semibold md:text-sm ${
                  theme === "dark"
                    ? "border-slate-500/60 bg-slate-800/70 text-slate-100"
                    : "border-slate-400 bg-white text-slate-950"
                }`}
              >
                {tech}
              </span>
            ))}
          </div>
        </section>
      </section>
    </main>
  )
}
