"use client"

import { useMemo, useState } from "react"
import { ArrowLeft, ArrowRight, Eye, EyeOff, GraduationCap, Pencil, Plus, Trash2, Wrench } from "lucide-react"
import { Badge, Button, Card, CardHeader, EmptyState, IconButton, PageHeader, TextInput, Toggle, cx } from "../../_ui/primitives"
import { DropdownMenu, useAction, useConfirm } from "../../_ui/overlays"
import SheetForm from "../../_ui/SheetForm"
import { SKILL_CATEGORIES } from "../../../../lib/validation/skill"
import { deleteSkillAction, moveSkillAction, saveSkillAction, toggleSkillAction } from "../../../../lib/actions/skills"
import { SKILL_EN_SPEC, translationPairs } from "../../../../lib/admin/form-fields"
import AutoTranslate from "../../_ui/AutoTranslate"

const TRANSLATED = translationPairs(SKILL_EN_SPEC)

function SkillFields({ skill, defaultCategory, categories, errors }) {
  const en = skill?.en ?? {}
  return (
    <>
      <TextInput name="name" label="Nom" required defaultValue={skill?.name ?? ""} error={errors.name} placeholder="Ex. PostgreSQL" />
      <div>
        <TextInput
          name="category"
          label="Catégorie"
          description="Regroupe les technologies sur la page Expertise."
          required
          list="skill-categories"
          defaultValue={skill?.category ?? defaultCategory ?? ""}
          error={errors.category}
        />
        <datalist id="skill-categories">
          {categories.map((category) => (
            <option key={category} value={category} />
          ))}
        </datalist>
      </div>
      <Toggle
        name="learning"
        label="En progression"
        description="Affiche un badge « en progression » : à utiliser pour un domaine que vous développez encore."
        defaultChecked={skill?.learning ?? false}
      />
      <Toggle name="visible" label="Afficher sur le site" defaultChecked={skill?.visible ?? true} />
      <AutoTranslate pairs={TRANSLATED} />
      <details className="rounded-lg border border-gray-200 p-4">
        <summary className="cursor-pointer text-sm font-medium text-accent">Version anglaise (facultatif)</summary>
        <div className="mt-4 space-y-4">
          <TextInput name="en_name" label="Name" description="Only if it differs (e.g. « API REST » → « REST APIs »)." optional defaultValue={en.name ?? ""} />
          <TextInput name="en_category" label="Category" optional defaultValue={en.category ?? ""} />
        </div>
      </details>
    </>
  )
}

export default function SkillBoard({ skills }) {
  const [editing, setEditing] = useState(null) // { skill } | { category }
  const { run, pending } = useAction()
  const { ask, dialog } = useConfirm()

  const groups = useMemo(() => {
    const map = new Map()
    for (const skill of skills) {
      if (!map.has(skill.category)) map.set(skill.category, [])
      map.get(skill.category).push(skill)
    }
    return [...map.entries()]
  }, [skills])
  const categories = [...new Set([...groups.map(([category]) => category), ...SKILL_CATEGORIES])]

  return (
    <>
      <PageHeader
        title="Technologies"
        description="Outils regroupés par usage, affichés après les domaines d'expertise. Ils servent aussi de suggestions dans les réalisations. Pas de pourcentage : marquez « en progression » ce que vous apprenez encore."
        actions={
          <Button onClick={() => setEditing({})}>
            <Plus size={16} aria-hidden="true" />
            Ajouter une technologie
          </Button>
        }
      />

      {groups.length === 0 ? (
        <Card>
          <EmptyState
            icon={Wrench}
            title="Aucune technologie"
            text="Ajoutez les outils que vous utilisez réellement, par catégorie (Frontend, Backend, Données…)."
            action={<Button onClick={() => setEditing({})}>Ajouter une technologie</Button>}
          />
        </Card>
      ) : (
        <div className={cx("grid gap-4 transition-opacity md:grid-cols-2", pending && "opacity-70")} aria-busy={pending}>
          {groups.map(([category, items]) => (
            <Card key={category} aria-labelledby={`cat-${category}`} className="min-w-0">
              <CardHeader
                id={`cat-${category}`}
                title={category}
                description={`${items.length} technologie${items.length > 1 ? "s" : ""}${items.every((s) => s.learning) ? " · en progression" : ""}`}
                actions={
                  <Button variant="ghost" size="sm" onClick={() => setEditing({ category })}>
                    <Plus size={15} aria-hidden="true" />
                    Ajouter
                  </Button>
                }
              />
              <ul className="divide-y divide-gray-100">
                {items.map((skill, index) => (
                  <li key={skill.id} className="flex items-center gap-2 py-1 pl-5 pr-2">
                    <span className={cx("min-w-0 flex-1 truncate text-sm", skill.visible ? "text-navy" : "text-navy/40 line-through")}>
                      {skill.name}
                    </span>
                    {skill.learning && <Badge tone="warning">En progression</Badge>}
                    {!skill.visible && <Badge>Masquée</Badge>}
                    <div className="ml-auto flex items-center">
                      <IconButton size={16} className="h-9 w-9" icon={Pencil} label={`Modifier ${skill.name}`} onClick={() => setEditing({ skill })} />
                      <DropdownMenu
                        label={`Actions pour ${skill.name}`}
                        items={[
                          index > 0 && { key: "up", label: "Déplacer avant", icon: ArrowLeft, onSelect: () => run(() => moveSkillAction(skill.id, "up")) },
                          index < items.length - 1 && { key: "down", label: "Déplacer après", icon: ArrowRight, onSelect: () => run(() => moveSkillAction(skill.id, "down")) },
                          {
                            key: "learning",
                            label: skill.learning ? "Retirer « en progression »" : "Marquer « en progression »",
                            icon: GraduationCap,
                            onSelect: () => run(() => toggleSkillAction(skill.id, "learning"), { success: skill.learning ? "Badge retiré." : "Marquée « en progression »." }),
                          },
                          {
                            key: "visible",
                            label: skill.visible ? "Masquer du site" : "Afficher sur le site",
                            icon: skill.visible ? EyeOff : Eye,
                            onSelect: () => run(() => toggleSkillAction(skill.id, "visible"), { success: skill.visible ? "Technologie masquée." : "Technologie affichée." }),
                          },
                          { key: "sep", separator: true },
                          {
                            key: "delete",
                            label: "Supprimer",
                            icon: Trash2,
                            danger: true,
                            onSelect: () =>
                              ask({
                                title: `Supprimer « ${skill.name} » ?`,
                                description: "Elle disparaîtra de la page Expertise et des suggestions. Les réalisations qui la citent ne sont pas modifiées.",
                                onConfirm: () => run(() => deleteSkillAction(skill.id), { success: "Technologie supprimée." }),
                              }),
                          },
                        ]}
                      />
                    </div>
                  </li>
                ))}
              </ul>
            </Card>
          ))}
        </div>
      )}

      {editing && (
        <SheetForm
          key={editing.skill?.id ?? `new-${editing.category ?? ""}`}
          open
          onClose={() => setEditing(null)}
          title={editing.skill ? `Modifier ${editing.skill.name}` : "Nouvelle technologie"}
          action={saveSkillAction.bind(null, editing.skill?.id ?? null)}
          submitLabel={editing.skill ? "Enregistrer" : "Ajouter"}
        >
          {(errors) => <SkillFields skill={editing.skill} defaultCategory={editing.category} categories={categories} errors={errors} />}
        </SheetForm>
      )}
      {dialog}
    </>
  )
}
