"use client"

import { useState } from "react"
import { ArrowDown, ArrowUp, Eye, EyeOff, Pencil, Plus, Sparkles, Trash2 } from "lucide-react"
import { Icon } from "../../../_components/ui"
import { Badge, Button, Card, EmptyState, IconButton, PageHeader, TextArea, TextInput, Toggle, cx } from "../../_ui/primitives"
import { useAction, useConfirm } from "../../_ui/overlays"
import SheetForm from "../../_ui/SheetForm"
import TagInput from "../../_ui/TagInput"
import { ICONS } from "../../../../lib/validation/expertise"
import {
  deleteExpertiseAction,
  moveExpertiseAction,
  saveExpertiseAction,
  toggleExpertiseVisibleAction,
} from "../../../../lib/actions/expertises"
import { EXPERTISE_EN_SPEC, formatField, translationPairs } from "../../../../lib/admin/form-fields"
import AutoTranslate from "../../_ui/AutoTranslate"

const TRANSLATED = translationPairs(EXPERTISE_EN_SPEC)

function ExpertiseFields({ expertise, errors, suggestions }) {
  const en = expertise?.en ?? {}
  return (
    <>
      <TextInput
        name="title"
        label="Titre"
        description="Une compétence, pas un outil : « Architecture de données » plutôt que « MongoDB »."
        required
        defaultValue={expertise?.title ?? ""}
        error={errors.title}
      />
      <TextArea
        name="description"
        label="Description"
        description="Ce que vous apportez, en une phrase compréhensible par un non-développeur."
        required
        rows={3}
        defaultValue={expertise?.description ?? ""}
        error={errors.description}
      />
      <fieldset>
        <legend className="mb-2 text-sm font-medium text-navy">
          Icône <span className="text-red-600" aria-hidden="true">*</span>
        </legend>
        <div className="grid grid-cols-2 gap-2 sm:grid-cols-4">
          {ICONS.map((icon) => (
            <label key={icon.value} className="cursor-pointer">
              <input type="radio" name="icon" value={icon.value} defaultChecked={(expertise?.icon ?? ICONS[0].value) === icon.value} className="peer sr-only" />
              <span className="flex flex-col items-center gap-1.5 rounded-lg border border-gray-200 px-2 py-3 text-center text-xs text-navy/70 peer-checked:border-accent peer-checked:bg-accent/5 peer-checked:text-navy peer-focus-visible:ring-2 peer-focus-visible:ring-accent/40">
                <Icon name={icon.value} size={18} />
                {icon.label}
              </span>
            </label>
          ))}
        </div>
        {errors.icon && <p className="mt-1.5 text-sm text-red-600">{errors.icon}</p>}
      </fieldset>
      <TagInput
        name="technologies"
        label="Technologies associées"
        required
        defaultValue={expertise?.technologies ?? []}
        suggestions={suggestions}
        error={errors.technologies}
      />
      <Toggle name="visible" label="Afficher sur le site" defaultChecked={expertise?.visible ?? true} />
      <AutoTranslate pairs={TRANSLATED} />
      <details className="rounded-lg border border-gray-200 p-4">
        <summary className="cursor-pointer text-sm font-medium text-accent">Version anglaise (facultatif)</summary>
        <div className="mt-4 space-y-4">
          <TextInput name="en_title" label="Title" optional defaultValue={en.title ?? ""} />
          <TextArea name="en_description" label="Description" optional rows={3} defaultValue={en.description ?? ""} />
          <TextInput name="en_technologies" label="Technologies (comma separated)" optional defaultValue={formatField("csv", en.technologies)} />
        </div>
      </details>
    </>
  )
}

export default function ExpertiseList({ expertises, suggestions }) {
  const [editing, setEditing] = useState(null)
  const { run, pending } = useAction()
  const { ask, dialog } = useConfirm()
  const current = editing && editing !== "new" ? editing : null

  return (
    <>
      <PageHeader
        title="Expertise"
        description="Domaines de compétence affichés sur la page Expertise, avant la liste des technologies."
        actions={
          <Button onClick={() => setEditing("new")}>
            <Plus size={16} aria-hidden="true" />
            Ajouter une expertise
          </Button>
        }
      />
      <Card className={cx("transition-opacity", pending && "opacity-70")} aria-busy={pending}>
        {expertises.length === 0 ? (
          <EmptyState
            icon={Sparkles}
            title="Aucune expertise"
            text="Décrivez vos domaines de compétence (applications métier, architecture…) puis associez-y vos technologies."
            action={<Button onClick={() => setEditing("new")}>Ajouter une expertise</Button>}
          />
        ) : (
          <ul className="divide-y divide-gray-100">
            {expertises.map((item, index) => (
              <li key={item.id} className="flex flex-col gap-3 px-4 py-4 sm:flex-row sm:items-center sm:px-5">
                <button type="button" onClick={() => setEditing(item)} className="flex min-w-0 flex-1 items-start gap-3 rounded-md text-left">
                  <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-accent/10 text-accent">
                    <Icon name={item.icon} size={18} />
                  </span>
                  <span className="min-w-0">
                    <span className="flex flex-wrap items-center gap-2">
                      <span className="font-medium text-navy">{item.title}</span>
                      {!item.visible && <Badge>Masquée</Badge>}
                      {!item.en && <Badge tone="warning">Sans version anglaise</Badge>}
                    </span>
                    <span className="mt-0.5 line-clamp-2 block text-sm text-navy/65">{item.description}</span>
                    <span className="mt-1 block text-xs text-navy/50">{item.technologies.join(" · ")}</span>
                  </span>
                </button>
                <div className="-mr-2 flex items-center gap-0.5 self-end sm:self-auto">
                  <IconButton icon={Pencil} label={`Modifier ${item.title}`} onClick={() => setEditing(item)} />
                  <IconButton icon={ArrowUp} label="Monter" disabled={index === 0} onClick={() => run(() => moveExpertiseAction(item.id, "up"))} />
                  <IconButton icon={ArrowDown} label="Descendre" disabled={index === expertises.length - 1} onClick={() => run(() => moveExpertiseAction(item.id, "down"))} />
                  <IconButton
                    icon={item.visible ? Eye : EyeOff}
                    label={item.visible ? "Masquer du site" : "Afficher sur le site"}
                    onClick={() => run(() => toggleExpertiseVisibleAction(item.id), { success: item.visible ? "Expertise masquée." : "Expertise affichée." })}
                  />
                  <IconButton
                    icon={Trash2}
                    tone="danger"
                    label={`Supprimer ${item.title}`}
                    onClick={() =>
                      ask({
                        title: `Supprimer « ${item.title} » ?`,
                        description: "Cette expertise sera supprimée définitivement. Pour la retirer du site seulement, masquez-la.",
                        onConfirm: () => run(() => deleteExpertiseAction(item.id), { success: "Expertise supprimée." }),
                      })
                    }
                  />
                </div>
              </li>
            ))}
          </ul>
        )}
      </Card>
      {editing && (
        <SheetForm
          key={current?.id ?? "new"}
          open
          onClose={() => setEditing(null)}
          title={current ? `Modifier ${current.title}` : "Nouvelle expertise"}
          action={saveExpertiseAction.bind(null, current?.id ?? null)}
          submitLabel={current ? "Enregistrer" : "Ajouter"}
        >
          {(errors) => <ExpertiseFields expertise={current} errors={errors} suggestions={suggestions} />}
        </SheetForm>
      )}
      {dialog}
    </>
  )
}
