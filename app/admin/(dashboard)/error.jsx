"use client"

import { AlertTriangle, RotateCcw } from "lucide-react"
import { Button, ButtonLink, Card } from "../_ui/primitives"

export default function AdminError({ reset }) {
  return (
    <Card className="mx-auto mt-10 max-w-lg p-8 text-center">
      <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-xl bg-red-50 text-red-600">
        <AlertTriangle size={22} aria-hidden="true" />
      </div>
      <h1 className="font-heading text-lg font-semibold text-navy">Cette page n&apos;a pas pu se charger</h1>
      <p className="mt-2 text-sm text-navy/60">
        Une erreur est survenue côté serveur (base de données indisponible, par exemple). Vos données n&apos;ont pas été modifiées.
      </p>
      <div className="mt-6 flex justify-center gap-2">
        <Button onClick={reset}>
          <RotateCcw size={16} aria-hidden="true" />
          Réessayer
        </Button>
        <ButtonLink href="/admin" variant="secondary">
          Tableau de bord
        </ButtonLink>
      </div>
    </Card>
  )
}
