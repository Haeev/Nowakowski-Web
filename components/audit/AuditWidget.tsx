"use client"

import {
  type KeyboardEvent as ReactKeyboardEvent,
  useEffect,
  useRef,
  useState,
} from "react"
import { Check, Gauge, X } from "lucide-react"
import AuditUrlForm from "./AuditUrlForm"
import { cn } from "@/lib/cn"

const WIDGET_POINTS = [
  "Performance, SEO, accessibilité et bonnes pratiques",
  "Vue mobile et ordinateur",
  "Les 3 priorités à corriger, expliquées simplement",
]

const FOCUSABLE_SELECTOR =
  'a[href], button:not([disabled]), input:not([disabled]), [tabindex]:not([tabindex="-1"])'

const AuditWidget = () => {
  const [open, setOpen] = useState(false)
  const panelRef = useRef<HTMLDivElement | null>(null)
  const handleRef = useRef<HTMLButtonElement | null>(null)
  const wasOpenRef = useRef(false)

  const handleOpen = () => setOpen(true)
  const handleClose = () => setOpen(false)

  useEffect(() => {
    if (!open) return

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") setOpen(false)
    }
    window.addEventListener("keydown", handleKeyDown)

    const previousOverflow = document.body.style.overflow
    document.body.style.overflow = "hidden"

    const focusTimer = window.setTimeout(() => {
      const input = panelRef.current?.querySelector<HTMLInputElement>("input")
      input?.focus()
    }, 80)

    return () => {
      window.removeEventListener("keydown", handleKeyDown)
      document.body.style.overflow = previousOverflow
      window.clearTimeout(focusTimer)
    }
  }, [open])

  useEffect(() => {
    if (wasOpenRef.current && !open) handleRef.current?.focus()
    wasOpenRef.current = open
  }, [open])

  const handlePanelKeyDown = (event: ReactKeyboardEvent<HTMLElement>) => {
    if (event.key !== "Tab") return
    const focusables = panelRef.current?.querySelectorAll<HTMLElement>(
      FOCUSABLE_SELECTOR,
    )
    if (!focusables || focusables.length === 0) return

    const first = focusables[0]
    const last = focusables[focusables.length - 1]

    if (event.shiftKey && document.activeElement === first) {
      event.preventDefault()
      last.focus()
      return
    }
    if (!event.shiftKey && document.activeElement === last) {
      event.preventDefault()
      first.focus()
    }
  }

  return (
    <>
      <button
        ref={handleRef}
        type="button"
        onClick={handleOpen}
        aria-haspopup="dialog"
        aria-expanded={open}
        aria-label="Ouvrir l'audit gratuit de votre site"
        className={cn(
          "group fixed right-0 top-1/2 z-40 flex -translate-y-1/2 flex-col items-center gap-2 rounded-l-2xl border border-r-0 border-border bg-surface/95 px-2.5 py-4 shadow-brand backdrop-blur transition-all duration-300 hover:bg-brand focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand focus-visible:ring-offset-2 focus-visible:ring-offset-bg",
          open ? "pointer-events-none translate-x-full opacity-0" : "opacity-100",
        )}
      >
        <Gauge
          className="h-5 w-5 text-brand transition-colors group-hover:text-white"
          aria-hidden
        />
        <span className="text-xs font-semibold uppercase tracking-[0.15em] text-fg transition-colors [writing-mode:vertical-rl] group-hover:text-white">
          Audit gratuit
        </span>
      </button>

      <div
        className={cn(
          "fixed inset-0 z-[60]",
          open ? "visible" : "pointer-events-none invisible",
        )}
        aria-hidden={!open}
      >
        <button
          type="button"
          aria-label="Fermer l'audit"
          tabIndex={-1}
          onClick={handleClose}
          className={cn(
            "absolute inset-0 bg-black/60 backdrop-blur-sm transition-opacity duration-300",
            open ? "opacity-100" : "opacity-0",
          )}
        />
        <aside
          ref={panelRef}
          role="dialog"
          aria-modal="true"
          aria-labelledby="audit-widget-title"
          onKeyDown={handlePanelKeyDown}
          className={cn(
            "absolute right-0 top-0 flex h-full w-full max-w-md flex-col overflow-y-auto border-l border-border bg-bg p-6 shadow-xl transition-transform duration-300 ease-[cubic-bezier(0.25,0.1,0.25,1)] sm:p-8",
            open ? "translate-x-0" : "translate-x-full",
          )}
        >
          <div className="flex items-start justify-between gap-4">
            <p className="inline-flex items-center gap-3 text-xs font-semibold uppercase tracking-[0.2em] text-brand">
              <span aria-hidden className="inline-block h-px w-6 bg-brand" />
              Audit gratuit
            </p>
            <button
              type="button"
              onClick={handleClose}
              aria-label="Fermer l'audit"
              tabIndex={open ? 0 : -1}
              className="inline-flex h-9 w-9 shrink-0 items-center justify-center rounded-full border border-border text-fg transition-colors hover:border-brand hover:text-brand focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand"
            >
              <X className="h-4 w-4" aria-hidden />
            </button>
          </div>

          <h2
            id="audit-widget-title"
            className="mt-5 font-display text-2xl font-bold tracking-tight text-fg"
          >
            Votre site est-il à la hauteur ?
          </h2>
          <p className="mt-3 text-sm leading-relaxed text-fg-muted">
            Analysez gratuitement la vitesse, le référencement et
            l'accessibilité de votre site. Vous saurez en 30 secondes ce qui
            peut être amélioré.
          </p>

          <div className="mt-6">
            <AuditUrlForm onSubmitted={handleClose} />
          </div>

          <ul className="mt-8 space-y-3 text-sm text-fg-muted">
            {WIDGET_POINTS.map((point) => (
              <li key={point} className="flex items-start gap-2">
                <Check className="mt-0.5 h-4 w-4 shrink-0 text-brand" aria-hidden />
                <span>{point}</span>
              </li>
            ))}
          </ul>
        </aside>
      </div>
    </>
  )
}

export default AuditWidget
