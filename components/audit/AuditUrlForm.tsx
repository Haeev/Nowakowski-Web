"use client"

import { type ChangeEvent, type FormEvent, useId, useState } from "react"
import { useRouter } from "next/navigation"
import { ArrowRight, Search } from "lucide-react"
import { isLikelyUrl, normalizeUrl } from "@/lib/audit/url"
import { cn } from "@/lib/cn"

type AuditUrlFormProps = {
  autoFocus?: boolean
  className?: string
  onSubmitted?: () => void
}

const AuditUrlForm = ({
  autoFocus = false,
  className,
  onSubmitted,
}: AuditUrlFormProps) => {
  const router = useRouter()
  const inputId = useId()
  const errorId = useId()
  const [value, setValue] = useState("")
  const [error, setError] = useState("")

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    setValue(event.target.value)
    if (error !== "") setError("")
  }

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    const trimmed = value.trim()

    if (trimmed === "") {
      setError("Entrez l'adresse de votre site pour lancer l'analyse.")
      return
    }
    if (!isLikelyUrl(trimmed)) {
      setError("Cette adresse ne ressemble pas à une URL valide (ex. mon-site.fr).")
      return
    }

    setError("")
    onSubmitted?.()
    router.push(`/audit-gratuit?url=${encodeURIComponent(normalizeUrl(trimmed))}`)
  }

  const hasError = error !== ""

  return (
    <form onSubmit={handleSubmit} noValidate className={cn("w-full", className)}>
      <label htmlFor={inputId} className="mb-2 block text-sm font-semibold text-fg">
        Adresse de votre site
      </label>
      <div className="flex flex-col gap-3 sm:flex-row">
        <div className="relative flex-1">
          <Search
            className="pointer-events-none absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-fg-subtle"
            aria-hidden
          />
          <input
            id={inputId}
            name="url"
            type="url"
            inputMode="url"
            autoComplete="url"
            autoFocus={autoFocus}
            value={value}
            onChange={handleChange}
            placeholder="Entrez l'URL de votre site"
            aria-invalid={hasError ? "true" : undefined}
            aria-describedby={hasError ? errorId : undefined}
            className="w-full rounded-xl border-2 border-border bg-bg py-3 pl-11 pr-4 text-fg placeholder:text-fg-subtle transition-colors focus:border-brand focus:outline-none"
          />
        </div>
        <button
          type="submit"
          className="group inline-flex items-center justify-center gap-2 rounded-xl bg-brand px-6 py-3 text-sm font-semibold text-white shadow-soft transition-shadow duration-200 hover:shadow-brand-glow focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand focus-visible:ring-offset-2 focus-visible:ring-offset-bg"
        >
          Analyser gratuitement
          <ArrowRight
            className="h-4 w-4 transition-transform group-hover:translate-x-1"
            aria-hidden
          />
        </button>
      </div>
      <p className="mt-3 text-xs text-fg-subtle">
        Gratuit, sans inscription, résultats en 30 secondes.
      </p>
      <p
        id={errorId}
        role="alert"
        aria-live="assertive"
        className="mt-2 min-h-[1rem] text-sm font-medium text-brand-red"
      >
        {error}
      </p>
    </form>
  )
}

export default AuditUrlForm
