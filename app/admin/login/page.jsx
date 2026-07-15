"use client"

import { useActionState } from "react"
import Logo from "../../(screen)/components/Logo"
import { loginAction } from "../../../lib/auth/actions"

const initialState = { error: null }

export default function AdminLoginPage() {
  const [state, formAction, isPending] = useActionState(loginAction, initialState)

  return (
    <div className="min-h-screen bg-navy flex items-center justify-center px-6">
      <div className="w-full max-w-sm space-y-8">
        <div className="flex flex-col items-center gap-3">
          <Logo variant="white" className="h-12 w-12" />
          <h1 className="font-heading text-xl font-bold text-white">Administration</h1>
        </div>

        <form action={formAction} className="space-y-4 bg-white rounded-2xl p-6">
          <div>
            <label className="block text-sm font-medium text-navy mb-1.5">Email</label>
            <input
              type="email"
              name="email"
              required
              autoComplete="username"
              className="w-full rounded-lg border border-gray-200 px-4 py-2.5 text-navy focus:outline-none focus:ring-2 focus:ring-accent"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-navy mb-1.5">Mot de passe</label>
            <input
              type="password"
              name="password"
              required
              autoComplete="current-password"
              className="w-full rounded-lg border border-gray-200 px-4 py-2.5 text-navy focus:outline-none focus:ring-2 focus:ring-accent"
            />
          </div>

          {state?.error && <p className="text-sm text-red-600">{state.error}</p>}

          <button
            type="submit"
            disabled={isPending}
            className="w-full rounded-lg bg-navy text-white font-semibold py-2.5 hover:bg-institutional transition-colors disabled:opacity-50"
          >
            {isPending ? "Connexion..." : "Se connecter"}
          </button>
        </form>
      </div>
    </div>
  )
}
