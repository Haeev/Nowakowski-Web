"use client"

import { type ChangeEvent, type FormEvent, useId, useState } from "react"
import { useRouter } from "next/navigation"
import { ArrowRight, Search } from "lucide-react"
import { isLikelyUrl, normalizeUrl } from "@/lib/audit/url"
import { cn } from "@/lib/cn"

type AuditUrlFormProps = {
  autoFocus?: boolean
  className?: string
  compact?: boolean
  onSubmitted?: () => void
}

const AuditUrlForm = ({
  autoFocus = false,
  className,
  compact = false,
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
      <label
        htmlFor={inputId}
        className={cn(
          "mb-2 block font-semibold text-fg",
          compact ? "text-xs" : "text-sm",
        )}
      >
        Adresse de votre site
      </label>
      <div className={cn("flex gap-2", compact ? "flex-col" : "flex-col sm:flex-row sm:gap-3")}>
        <div className="relative flex-1">
          <Search
            className={cn(
              "pointer-events-none absolute top-1/2 -translate-y-1/2 text-fg-subtle",
              compact ? "left-3 h-3.5 w-3.5" : "left-4 h-4 w-4",
            )}
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
            placeholder={compact ? "votre-site.fr" : "Entrez l'URL de votre site"}
            aria-invalid={hasError ? "true" : undefined}
            aria-describedby={hasError ? errorId : undefined}
            className={cn(
              "w-full rounded-xl border-2 border-border bg-bg text-fg placeholder:text-fg-subtle transition-colors focus:border-brand focus:outline-none",
              compact ? "py-2.5 pl-9 pr-3 text-sm" : "py-3 pl-11 pr-4",
            )}
          />
        </div>
        <button
          type="submit"
          className={cn(
            "group inline-flex items-center justify-center gap-2 rounded-xl bg-brand font-semibold text-white shadow-soft transition-shadow duration-200 hover:shadow-brand-glow focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand focus-visible:ring-offset-2 focus-visible:ring-offset-bg",
            compact ? "px-4 py-2.5 text-xs" : "px-6 py-3 text-sm",
          )}
        >
          Analyser gratuitement
          <ArrowRight
            className={cn(
              "transition-transform group-hover:translate-x-1",
              compact ? "h-3.5 w-3.5" : "h-4 w-4",
            )}
            aria-hidden
          />
        </button>
      </div>
      <p className={cn("text-fg-subtle", compact ? "mt-2 text-[11px]" : "mt-3 text-xs")}>
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
