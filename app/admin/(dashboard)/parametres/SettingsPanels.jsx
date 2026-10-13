"use client"

import { useActionState, useEffect, useRef, useState, useTransition } from "react"
import { useRouter } from "next/navigation"
import toast from "react-hot-toast"
import { Download, FileJson, LogOut, Upload } from "lucide-react"
import { Button, Card, CardHeader, TextInput } from "../../_ui/primitives"
import { ConfirmDialog } from "../../_ui/overlays"
import { exportDataAction, importDataAction } from "../../../../lib/actions/settings"
import { changePasswordAction, logoutAction } from "../../../../lib/auth/actions"

function ExportPanel() {
  const [pending, start] = useTransition()
  const download = () =>
    start(async () => {
      try {
        const data = await exportDataAction()
        const blob = new Blob([JSON.stringify(data, null, 2)], { type: "application/json" })
        const url = URL.createObjectURL(blob)
        const link = document.createElement("a")
        link.href = url
        link.download = `portfolio-export-${data.exportedAt.slice(0, 10)}.json`
        link.click()
        URL.revokeObjectURL(url)
        toast.success("Export téléchargé.")
      } catch {
        toast.error("L'export a échoué. Réessayez.")
      }
    })
  return (
    <Button variant="secondary" onClick={download} pending={pending} pendingLabel="Préparation…">
      <Download size={16} aria-hidden="true" />
      Télécharger l&apos;export (JSON)
    </Button>
  )
}

function PasswordForm() {
  const [state, formAction, isPending] = useActionState(changePasswordAction, null)
  const formRef = useRef(null)
  const errors = state?.fieldErrors ?? {}

  useEffect(() => {
    if (!state?.at) return
    if (state.error) toast.error(state.error)
    else {
      toast.success(state.message)
      formRef.current?.reset()
    }
  }, [state])

  return (
    <form ref={formRef} action={formAction} noValidate className="space-y-4">
      <TextInput name="current" type="password" autoComplete="current-password" label="Mot de passe actuel" required error={errors.current} />
      <TextInput
        name="next"
        type="password"
        autoComplete="new-password"
        label="Nouveau mot de passe"
        description="12 caractères minimum."
        required
        error={errors.next}
      />
      <TextInput name="confirm" type="password" autoComplete="new-password" label="Confirmer le nouveau mot de passe" required error={errors.confirm} />
      <Button type="submit" variant="secondary" pending={isPending} pendingLabel="Modification…">
        Changer le mot de passe
      </Button>
    </form>
  )
}

function ImportPanel() {
  const router = useRouter()
  const [state, formAction, isPending] = useActionState(importDataAction, null)
  const [file, setFile] = useState(null)
  const [confirming, setConfirming] = useState(false)
  const formRef = useRef(null)

  useEffect(() => {
    if (!state?.at) return
    if (state.error) toast.error(state.error)
    else {
      toast.success(state.message)
      router.refresh()
    }
  }, [state, router])

  return (
    <form ref={formRef} action={formAction} className="space-y-3">
      <label className="flex cursor-pointer items-center gap-3 rounded-lg border border-dashed border-gray-300 bg-gray-50/60 px-4 py-3 text-sm text-navy/70 hover:border-accent focus-within:ring-2 focus-within:ring-accent/30">
        <FileJson size={18} aria-hidden="true" className="shrink-0 text-navy/50" />
        <span className="min-w-0 flex-1 truncate">{file ? file.name : "Choisir un fichier d'export (.json)"}</span>
        <input type="file" name="file" accept="application/json,.json" className="sr-only" onChange={(event) => setFile(event.target.files?.[0] ?? null)} />
      </label>
      {state?.error && <p className="text-sm text-red-600">{state.error}</p>}
      <Button variant="secondary" disabled={!file} pending={isPending} pendingLabel="Import en cours…" onClick={() => setConfirming(true)}>
        <Upload size={16} aria-hidden="true" />
        Importer
      </Button>
      <ConfirmDialog
        open={confirming}
        title="Remplacer tout le contenu ?"
        description="Le profil, les réalisations, l'expérience, l'expertise et les technologies seront remplacés par ceux du fichier. Téléchargez d'abord un export si vous voulez pouvoir revenir en arrière."
        confirmLabel="Remplacer le contenu"
        onCancel={() => setConfirming(false)}
        onConfirm={() => {
          setConfirming(false)
          formRef.current?.requestSubmit()
        }}
      />
    </form>
  )
}

export default function SettingsPanels({ email }) {
  return (
    <div className="grid gap-6 lg:grid-cols-2">
      <Card aria-labelledby="backup">
        <CardHeader
          id="backup"
          title="Sauvegarde du contenu"
          description="Exportez tout le contenu (profil, réalisations, expérience, expertise, technologies, référencement) dans un fichier JSON, ou restaurez un export."
        />
        <div className="space-y-6 px-5 py-5 sm:px-6">
          <div>
            <p className="mb-2 text-sm font-medium text-navy">Exporter</p>
            <ExportPanel />
          </div>
          <div className="border-t border-gray-100 pt-5">
            <p className="mb-2 text-sm font-medium text-navy">Restaurer un export</p>
            <ImportPanel />
          </div>
        </div>
      </Card>

      <Card aria-labelledby="account">
        <CardHeader id="account" title="Compte" description="Accès à l'administration." />
        <dl className="space-y-4 px-5 py-5 text-sm sm:px-6">
          <div>
            <dt className="text-xs font-medium uppercase tracking-wide text-navy/50">Connecté en tant que</dt>
            <dd className="mt-0.5 text-navy">{email}</dd>
          </div>
          <div>
            <dt className="text-xs font-medium uppercase tracking-wide text-navy/50">Session</dt>
            <dd className="mt-0.5 text-navy/80">Valable 7 jours, puis reconnexion demandée.</dd>
          </div>
        </dl>
        <div className="border-t border-gray-100 px-5 py-5 sm:px-6">
          <p className="mb-3 text-sm font-medium text-navy">Mot de passe</p>
          <PasswordForm />
        </div>
        <div className="border-t border-gray-100 px-5 py-4 sm:px-6">
          <form action={logoutAction}>
            <Button type="submit" variant="secondary">
              <LogOut size={16} aria-hidden="true" />
              Se déconnecter
            </Button>
          </form>
        </div>
      </Card>
    </div>
  )
}
