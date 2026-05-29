"use client"

import {
  type KeyboardEvent as ReactKeyboardEvent,
  useEffect,
  useRef,
  useState,
} from "react"
import { Check, ChevronLeft, Gauge, X } from "lucide-react"
import AuditUrlForm from "./AuditUrlForm"
import { cn } from "@/lib/cn"

const WIDGET_POINTS = [
  "Performance, SEO, accessibilité",
  "Mobile + ordinateur",
  "Top 3 priorités expliquées",
]

const FOCUSABLE_SELECTOR =
  'a[href], button:not([disabled]), input:not([disabled]), [tabindex]:not([tabindex="-1"])'

const DESKTOP_MEDIA_QUERY = "(min-width: 768px)"

const AuditWidget = () => {
  const [expanded, setExpanded] = useState(false)
  const cardRef = useRef<HTMLDivElement | null>(null)
  const fabRef = useRef<HTMLButtonElement | null>(null)
  const tabRef = useRef<HTMLButtonElement | null>(null)
  const wasExpandedRef = useRef(false)

  const handleExpand = () => setExpanded(true)
  const handleCollapse = () => setExpanded(false)

  useEffect(() => {
    setExpanded(window.matchMedia(DESKTOP_MEDIA_QUERY).matches)
  }, [])

  useEffect(() => {
    if (!expanded) return

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") setExpanded(false)
    }
    window.addEventListener("keydown", handleKeyDown)
    return () => window.removeEventListener("keydown", handleKeyDown)
  }, [expanded])

  useEffect(() => {
    if (wasExpandedRef.current && !expanded) {
      const isDesktop = window.matchMedia(DESKTOP_MEDIA_QUERY).matches
      if (isDesktop) {
        tabRef.current?.focus()
      } else {
        fabRef.current?.focus()
      }
      return
    }
    if (!wasExpandedRef.current && expanded) {
      const focusTimer = window.setTimeout(() => {
        const input = cardRef.current?.querySelector<HTMLInputElement>("input")
        input?.focus()
      }, 120)
      return () => window.clearTimeout(focusTimer)
    }
  }, [expanded])

  useEffect(() => {
    wasExpandedRef.current = expanded
  }, [expanded])

  const handleCardKeyDown = (event: ReactKeyboardEvent<HTMLElement>) => {
    if (event.key !== "Tab") return
    const focusables = cardRef.current?.querySelectorAll<HTMLElement>(
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

  if (!expanded) {
    return (
      <>
        <button
          ref={fabRef}
          type="button"
          onClick={handleExpand}
          aria-expanded={false}
          aria-label="Ouvrir l'audit gratuit de votre site"
          className="fixed bottom-[5.5rem] right-6 z-50 inline-flex h-14 w-14 items-center justify-center rounded-full bg-brand text-white shadow-brand transition-transform duration-200 hover:scale-105 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand focus-visible:ring-offset-2 focus-visible:ring-offset-bg md:hidden"
        >
          <Gauge className="h-5 w-5" aria-hidden />
        </button>

        <button
          ref={tabRef}
          type="button"
          onClick={handleExpand}
          aria-expanded={false}
          aria-label="Ouvrir l'audit gratuit de votre site"
          className={cn(
            "group fixed right-0 top-1/2 z-40 hidden -translate-y-1/2 flex-col items-center gap-2 rounded-l-xl border border-r-0 border-l-4 border-l-brand border-brand/40 bg-brand/10 px-3.5 py-5 shadow-brand-glow backdrop-blur transition-all duration-300 hover:border-brand hover:bg-brand hover:shadow-brand-glow focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand focus-visible:ring-offset-2 focus-visible:ring-offset-bg motion-reduce:animate-none motion-reduce:transition-none motion-safe:animate-[pulse_3s_cubic-bezier(0.4,0,0.6,1)_infinite] md:flex",
          )}
        >
          <Gauge
            className="h-6 w-6 text-brand transition-colors group-hover:text-white"
            aria-hidden
          />
          <span className="text-sm font-semibold uppercase tracking-[0.08em] text-fg transition-colors [writing-mode:vertical-rl] group-hover:text-white">
            Audit gratuit
          </span>
          <ChevronLeft
            className="h-5 w-5 text-brand transition-colors group-hover:text-white"
            aria-hidden
          />
        </button>
      </>
    )
  }

  return (
    <div
      className={cn(
        "fixed z-40",
        "bottom-[9.5rem] right-3 left-3 md:bottom-auto md:left-auto md:right-4 md:top-1/2 md:-translate-y-1/2",
      )}
    >
      <div
        ref={cardRef}
        role="complementary"
        aria-label="Audit gratuit de site web"
        aria-labelledby="audit-widget-title"
        onKeyDown={handleCardKeyDown}
        className={cn(
          "w-full max-w-[390px] md:ml-0 md:w-[min(calc(100vw-1.5rem),390px)] ml-auto rounded-2xl border border-border bg-surface/95 p-5 shadow-xl shadow-brand/15 backdrop-blur motion-reduce:transition-none sm:p-6",
          "transition-all duration-300 ease-[cubic-bezier(0.25,0.1,0.25,1)]",
        )}
      >
        <div className="flex items-start justify-between gap-3">
          <p className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.18em] text-brand">
            <span aria-hidden className="inline-block h-px w-4 bg-brand" />
            Audit gratuit
          </p>
          <button
            type="button"
            onClick={handleCollapse}
            aria-label="Réduire le widget d'audit"
            className="inline-flex h-8 w-8 shrink-0 items-center justify-center rounded-full border border-border text-fg transition-colors hover:border-brand hover:text-brand focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand"
          >
            <X className="h-4 w-4" aria-hidden />
          </button>
        </div>

        <h2
          id="audit-widget-title"
          className="mt-4 font-display text-xl font-bold leading-snug tracking-tight text-fg"
        >
          Votre site est-il à la hauteur ?
        </h2>
        <p className="mt-2.5 text-sm leading-relaxed text-fg-muted">
          Analyse gratuite en 30 secondes : vitesse, SEO et accessibilité.
        </p>

        <div className="mt-5">
          <AuditUrlForm compact onSubmitted={handleCollapse} />
        </div>

        <ul className="mt-5 space-y-2 text-xs text-fg-muted sm:text-sm">
          {WIDGET_POINTS.map((point) => (
            <li key={point} className="flex items-start gap-2">
              <Check className="mt-0.5 h-3.5 w-3.5 shrink-0 text-brand" aria-hidden />
              <span>{point}</span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  )
}

export default AuditWidget
