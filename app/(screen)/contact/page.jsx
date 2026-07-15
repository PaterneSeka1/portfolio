import ContactForm from "./ContactForm"
import { getProfile } from "../../../lib/db/profile"
import { getProjectBySlug } from "../../../lib/db/projects"
import { Mail, Phone, MapPin } from "lucide-react"

export const dynamic = "force-dynamic"

export const metadata = {
  title: "Contact — Paterne SEKA",
  description: "Construisons une solution utile et performante.",
}

export default async function Contact({ searchParams }) {
  const { projet } = await searchParams
  const [profile, referencedProject] = await Promise.all([
    getProfile(),
    projet ? getProjectBySlug(projet) : Promise.resolve(null),
  ])

  return (
    <div className="max-w-5xl mx-auto px-6 py-20 grid md:grid-cols-3 gap-12">
      <div className="md:col-span-2">
        <h1 className="font-heading text-3xl md:text-4xl font-bold text-navy">
          Construisons une solution utile et performante
        </h1>
        <p className="mt-3 text-navy/70 text-lg max-w-xl">
          Parlez-moi de votre projet, je vous répondrai rapidement.
        </p>

        <div className="mt-10">
          <ContactForm referencedProject={referencedProject} />
        </div>
      </div>

      <aside className="space-y-4 h-fit rounded-2xl border border-gray-100 p-6">
        <div className="flex items-start gap-3">
          <Mail size={18} className="text-institutional mt-0.5" />
          <a href={`mailto:${profile.email}`} className="text-navy/80 hover:text-accent break-all">
            {profile.email}
          </a>
        </div>
        {profile.phone && (
          <div className="flex items-start gap-3">
            <Phone size={18} className="text-institutional mt-0.5" />
            <a href={`tel:${profile.phone.replace(/\s/g, "")}`} className="text-navy/80 hover:text-accent">
              {profile.phone}
            </a>
          </div>
        )}
        <div className="flex items-start gap-3">
          <MapPin size={18} className="text-institutional mt-0.5" />
          <span className="text-navy/80">{profile.location}</span>
        </div>
      </aside>
    </div>
  )
}
