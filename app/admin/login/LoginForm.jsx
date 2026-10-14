"use client"

import { useActionState, useState } from "react"
import Link from "next/link"
import { AlertCircle, ArrowLeft, Eye, EyeOff, Info } from "lucide-react"
import Logo from "../../_components/Logo"
import { loginAction } from "../../../lib/auth/actions"
import { Button, TextInput, cx, inputBase } from "../_ui/primitives"

export default function LoginForm({ next, notice }) {
  const [state, formAction, isPending] = useActionState(loginAction, null)
  const [showPassword, setShowPassword] = useState(false)
  const fieldErrors = state?.fieldErrors ?? {}

  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-[#f5f6f8] px-4 py-10">
      <div className="w-full max-w-[400px]">
        <div className="mb-8 flex flex-col items-center text-center">
          <span className="flex h-12 w-12 items-center justify-center rounded-xl bg-navy">
            <Logo variant="white" className="h-8 w-8" />
          </span>
          <h1 className="mt-5 font-heading text-2xl font-bold text-navy">Espace d&apos;administration</h1>
          <p className="mt-1.5 text-sm text-navy/60">Connectez-vous pour gérer le contenu du portfolio.</p>
        </div>

        <div className="rounded-xl border border-gray-200 bg-white p-6 shadow-sm sm:p-8">
          {notice && !state && (
            <p
              role="status"
              className={cx(
                "mb-5 flex gap-2.5 rounded-lg px-3.5 py-3 text-sm",
                notice.tone === "warning" ? "bg-amber-50 text-amber-900" : "bg-blue-50 text-blue-900"
              )}
            >
              <Info size={18} className="mt-px shrink-0" aria-hidden="true" />
              {notice.text}
            </p>
          )}
          {state?.error && (
            <p role="alert" className="mb-5 flex gap-2.5 rounded-lg bg-red-50 px-3.5 py-3 text-sm text-red-800">
              <AlertCircle size={18} className="mt-px shrink-0" aria-hidden="true" />
              {state.error}
            </p>
          )}

          <form action={formAction} className="space-y-5" noValidate>
            <input type="hidden" name="next" value={next} />
            <TextInput
              name="email"
              type="email"
              label="E-mail"
              autoComplete="username"
              inputMode="email"
              required
              defaultValue={state?.email ?? ""}
              error={fieldErrors.email}
            />

            <div>
              <label htmlFor="password" className="mb-1.5 block text-sm font-medium text-navy">
                Mot de passe <span className="text-red-600" aria-hidden="true">*</span>
              </label>
              <div className="relative">
                <input
                  id="password"
                  name="password"
                  type={showPassword ? "text" : "password"}
                  autoComplete="current-password"
                  required
                  aria-invalid={fieldErrors.password ? "true" : undefined}
                  aria-describedby={fieldErrors.password ? "password-error" : undefined}
                  className={cx(inputBase, "pr-12")}
                />
                <button
                  type="button"
                  onClick={() => setShowPassword((value) => !value)}
                  aria-label={showPassword ? "Masquer le mot de passe" : "Afficher le mot de passe"}
                  aria-pressed={showPassword}
                  className="absolute inset-y-0 right-0 flex w-11 items-center justify-center rounded-r-lg text-navy/50 hover:text-navy"
                >
                  {showPassword ? <EyeOff size={18} aria-hidden="true" /> : <Eye size={18} aria-hidden="true" />}
                </button>
              </div>
              {fieldErrors.password && (
                <p id="password-error" className="mt-1.5 text-sm text-red-600">
                  {fieldErrors.password}
                </p>
              )}
            </div>

            <Button type="submit" size="lg" className="w-full" pending={isPending} pendingLabel="Connexion…">
              Se connecter
            </Button>
          </form>
        </div>

        <Link
          href="/"
          className="mx-auto mt-6 flex w-fit items-center gap-1.5 rounded text-sm text-navy/60 hover:text-navy"
        >
          <ArrowLeft size={15} aria-hidden="true" />
          Retour au portfolio
        </Link>
      </div>
    </div>
  )
}
