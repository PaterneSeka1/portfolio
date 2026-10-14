"use client"

import { useState } from "react"
import { ArrowDown, ArrowUp, Briefcase, Eye, EyeOff, MapPin, Pencil, Plus, Trash2 } from "lucide-react"
import { Badge, Button, Card, EmptyState, IconButton, PageHeader, TextArea, TextInput, Toggle, cx } from "../../_ui/primitives"
import { useAction, useConfirm } from "../../_ui/overlays"
import SheetForm from "../../_ui/SheetForm"
import TagInput from "../../_ui/TagInput"
import {
  deleteExperienceAction,
  moveExperienceAction,
  saveExperienceAction,
  toggleExperiencePublishedAction,
} from "../../../../lib/actions/experiences"
import { formatExperiencePeriod } from "../../../../lib/format"
import { EXPERIENCE_EN_SPEC, translationPairs } from "../../../../lib/admin/form-fields"
import AutoTranslate from "../../_ui/AutoTranslate"

const TRANSLATED = translationPairs(EXPERIENCE_EN_SPEC)

const toMonth = (value) => (value ? String(value).slice(0, 7) : "")

function ExperienceFields({ experience, errors, suggestions }) {
  const [current, setCurrent] = useState(experience?.current ?? false)
  const en = experience?.en ?? {}
  return (
    <>
      <TextInput name="company" label="Entreprise / organisation" required defaultValue={experience?.company ?? ""} error={errors.company} />
      <TextInput
        name="role"
        label="Poste"
        description="Intitulé exact, y compris s'il s'agit d'un stage."
        required
        defaultValue={experience?.role ?? ""}
        error={errors.role}
      />
      <TextInput name="location" label="Lieu" optional defaultValue={experience?.location ?? ""} error={errors.location} />

      <fieldset className="space-y-4 rounded-lg border border-gray-200 p-4">
        <legend className="px-1 text-sm font-medium text-navy">Période</legend>
        <div className="grid gap-4 sm:grid-cols-2">
          <TextInput name="startDate" type="month" label="Début" defaultValue={toMonth(experience?.startDate)} error={errors.startDate} />
          <TextInput
            name="endDate"
            type="month"
            label="Fin"
            disabled={current}
            defaultValue={toMonth(experience?.endDate)}
            error={errors.endDate}
          />
        </div>
        <Toggle name="current" label="Poste actuel" description="Affiche « aujourd'hui » comme date de fin." checked={current} onChange={(event) => setCurrent(event.target.checked)} />
        <TextInput
          name="period"
          label="Période en texte libre"
          description="Utilisée seulement si aucune date de début n'est renseignée."
          optional
          defaultValue={experience?.period ?? ""}
          error={errors.period}
        />
      </fieldset>

      <TextArea
        name="description"
        label="Contexte"
        description="Une phrase sur le périmètre du poste."
        optional
        rows={2}
        defaultValue={experience?.description ?? ""}
        error={errors.description}
      />
      <TextArea
        name="missions"
        label="Responsabilités"
        description="Une par ligne, orientées résultat et compréhensibles par un recruteur."
        required
        rows={5}
        defaultValue={(experience?.missions ?? []).join("\n")}
        error={errors.missions}
      />
      <TagInput name="technologies" label="Technologies" description="Facultatif." defaultValue={experience?.technologies ?? []} suggestions={suggestions} />
      <Toggle name="published" label="Afficher sur le site" defaultChecked={experience?.published ?? true} />

      <AutoTranslate pairs={TRANSLATED} />
      <details className="rounded-lg border border-gray-200 p-4">
        <summary className="cursor-pointer text-sm font-medium text-accent">Version anglaise (facultatif)</summary>
        <div className="mt-4 space-y-4">
          <TextInput name="en_role" label="Role" optional defaultValue={en.role ?? ""} />
          <TextInput name="en_location" label="Location" optional defaultValue={en.location ?? ""} />
          <TextInput name="en_period" label="Free-text period" optional defaultValue={en.period ?? ""} />
          <TextArea name="en_description" label="Context" optional rows={2} defaultValue={en.description ?? ""} />
          <TextArea name="en_missions" label="Responsibilities (one per line)" optional rows={4} defaultValue={(en.missions ?? []).join("\n")} />
        </div>
      </details>
    </>
  )
}

export default function ExperienceList({ experiences, suggestions }) {
  const [editing, setEditing] = useState(null) // null | "new" | experience
  const { run, pending } = useAction()
  const { ask, dialog } = useConfirm()
  const close = () => setEditing(null)
  const current = editing && editing !== "new" ? editing : null

  return (
    <>
      <PageHeader
        title="Expérience"
        description="Parcours affiché sur la page À propos, dans cet ordre."
        actions={
          <Button onClick={() => setEditing("new")}>
            <Plus size={16} aria-hidden="true" />
            Ajouter une expérience
          </Button>
        }
      />

      <Card className={cx("transition-opacity", pending && "opacity-70")} aria-busy={pending}>
        {experiences.length === 0 ? (
          <EmptyState
            icon={Briefcase}
            title="Aucune expérience"
            text="Ajoutez votre poste actuel en premier : il apparaîtra en tête de la page À propos."
            action={
              <Button onClick={() => setEditing("new")}>
                <Plus size={16} aria-hidden="true" />
                Ajouter une expérience
              </Button>
            }
          />
        ) : (
          <ul className="divide-y divide-gray-100">
            {experiences.map((experience, index) => {
              const period = formatExperiencePeriod(experience, "fr", "aujourd'hui")
              return (
                <li key={experience.id} className="flex flex-col gap-3 px-4 py-4 sm:flex-row sm:items-center sm:px-5">
                  <button type="button" onClick={() => setEditing(experience)} className="min-w-0 flex-1 rounded-md text-left">
                    <span className="flex flex-wrap items-center gap-2">
                      <span className="font-medium text-navy">{experience.company}</span>
                      {experience.current && <Badge tone="success">Poste actuel</Badge>}
                      {!experience.published && <Badge tone="neutral">Masquée</Badge>}
                    </span>
                    <span className="mt-0.5 block text-sm text-navy/70">{experience.role}</span>
                    <span className="mt-1 flex flex-wrap gap-x-3 text-xs text-navy/50">
                      {period ? <span>{period}</span> : <span className="text-amber-700">Période non renseignée</span>}
                      {experience.location && (
                        <span className="inline-flex items-center gap-1">
                          <MapPin size={12} aria-hidden="true" />
                          {experience.location}
                        </span>
                      )}
                      <span>{experience.missions.length} responsabilité{experience.missions.length > 1 ? "s" : ""}</span>
                    </span>
                  </button>
                  <div className="-mr-2 flex items-center gap-0.5 self-end sm:self-auto">
                    <IconButton icon={Pencil} label={`Modifier ${experience.company}`} onClick={() => setEditing(experience)} />
                    <IconButton icon={ArrowUp} label="Monter" disabled={index === 0} onClick={() => run(() => moveExperienceAction(experience.id, "up"))} />
                    <IconButton icon={ArrowDown} label="Descendre" disabled={index === experiences.length - 1} onClick={() => run(() => moveExperienceAction(experience.id, "down"))} />
                    <IconButton
                      icon={experience.published ? Eye : EyeOff}
                      label={experience.published ? "Masquer du site" : "Afficher sur le site"}
                      onClick={() => run(() => toggleExperiencePublishedAction(experience.id), { success: experience.published ? "Expérience masquée du site." : "Expérience affichée sur le site." })}
                    />
                    <IconButton
                      icon={Trash2}
                      tone="danger"
                      label={`Supprimer ${experience.company}`}
                      onClick={() =>
                        ask({
                          title: `Supprimer l'expérience « ${experience.company} » ?`,
                          description: "Elle sera retirée du site et de l'administration. Cette action est irréversible. Pour la retirer du site seulement, masquez-la.",
                          onConfirm: () => run(() => deleteExperienceAction(experience.id), { success: "Expérience supprimée." }),
                        })
                      }
                    />
                  </div>
                </li>
              )
            })}
          </ul>
        )}
      </Card>

      {editing && (
        <SheetForm
          key={current?.id ?? "new"}
          open
          onClose={close}
          title={current ? `Modifier ${current.company}` : "Nouvelle expérience"}
          description="Les champs marqués * sont obligatoires."
          action={saveExperienceAction.bind(null, current?.id ?? null)}
          submitLabel={current ? "Enregistrer" : "Ajouter"}
        >
          {(errors) => <ExperienceFields experience={current} errors={errors} suggestions={suggestions} />}
        </SheetForm>
      )}
      {dialog}
    </>
  )
}
