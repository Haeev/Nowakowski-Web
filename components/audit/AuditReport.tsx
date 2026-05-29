"use client"

import { useCallback, useEffect, useState } from "react"
import Link from "next/link"
import {
  AlertTriangle,
  ArrowRight,
  Loader2,
  Monitor,
  RotateCw,
  Smartphone,
} from "lucide-react"
import CategoryGaugeButton from "./CategoryGaugeButton"
import CategoryPanel from "./CategoryPanel"
import IssueCard from "./IssueCard"
import { cn } from "@/lib/cn"
import { CATEGORY_ORDER, getCategoryMeta } from "@/lib/audit/categories"
import { selectPriorityIssues } from "@/lib/audit/priority"
import type {
  AuditApiResponse,
  AuditCategoryKey,
  AuditResult,
  AuditStrategy,
  AuditStrategyResult,
} from "./types"

type AuditReportProps = {
  url: string
}

type Status = "loading" | "success" | "error"

const LEGEND = [
  { color: "#16A34A", label: "90-100 : bon" },
  { color: "#D97706", label: "50-89 : à améliorer" },
  { color: "#F51934", label: "0-49 : faible" },
]

const toDisplayUrl = (url: string): string =>
  url.replace(/^https?:\/\//, "").replace(/\/$/, "")

const getPanelId = (category: AuditCategoryKey) => `audit-panel-${category}`

const StrategyToggle = ({
  strategy,
  mobileAvailable,
  desktopAvailable,
  onChange,
}: {
  strategy: AuditStrategy
  mobileAvailable: boolean
  desktopAvailable: boolean
  onChange: (next: AuditStrategy) => void
}) => {
  const baseButton =
    "inline-flex items-center gap-2 rounded-full px-4 py-2 text-sm font-semibold transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand focus-visible:ring-offset-2 focus-visible:ring-offset-bg disabled:cursor-not-allowed disabled:opacity-40"

  return (
    <div
      className="inline-flex items-center gap-1 rounded-full border border-border bg-surface p-1"
      role="group"
      aria-label="Choisir l'appareil analysé"
    >
      <button
        type="button"
        onClick={() => onChange("mobile")}
        disabled={!mobileAvailable}
        aria-pressed={strategy === "mobile"}
        className={cn(
          baseButton,
          strategy === "mobile"
            ? "bg-brand text-white"
            : "text-fg-muted hover:text-fg",
        )}
      >
        <Smartphone className="h-4 w-4" aria-hidden />
        Mobile
      </button>
      <button
        type="button"
        onClick={() => onChange("desktop")}
        disabled={!desktopAvailable}
        aria-pressed={strategy === "desktop"}
        className={cn(
          baseButton,
          strategy === "desktop"
            ? "bg-brand text-white"
            : "text-fg-muted hover:text-fg",
        )}
      >
        <Monitor className="h-4 w-4" aria-hidden />
        Ordinateur
      </button>
    </div>
  )
}

const Legend = () => (
  <ul className="mt-6 flex flex-wrap items-center justify-center gap-x-6 gap-y-2 text-xs text-fg-muted">
    {LEGEND.map((item) => (
      <li key={item.label} className="flex items-center gap-2">
        <span
          aria-hidden
          className="inline-block h-2.5 w-2.5 rounded-full"
          style={{ backgroundColor: item.color }}
        />
        {item.label}
      </li>
    ))}
  </ul>
)

const LoadingState = () => (
  <div role="status" aria-live="polite">
    <div className="grid grid-cols-2 gap-6 sm:grid-cols-4">
      {CATEGORY_ORDER.map((category) => (
        <div key={category} className="flex flex-col items-center gap-3">
          <div className="h-[120px] w-[120px] animate-pulse rounded-full bg-surface-2" />
          <div className="h-4 w-20 animate-pulse rounded bg-surface-2" />
        </div>
      ))}
    </div>
    <div className="mt-8 h-40 animate-pulse rounded-2xl border border-border bg-surface" />
    <div className="mt-10 space-y-4">
      {[0, 1, 2, 3].map((row) => (
        <div
          key={row}
          className="h-20 animate-pulse rounded-2xl border border-border bg-surface"
        />
      ))}
    </div>
    <p className="mt-8 flex items-center justify-center gap-2 text-sm text-fg-muted">
      <Loader2 className="h-4 w-4 animate-spin text-brand" aria-hidden />
      Analyse en cours, cela prend une trentaine de secondes…
    </p>
  </div>
)

const ErrorState = ({
  message,
  onRetry,
}: {
  message: string
  onRetry: () => void
}) => (
  <div
    role="alert"
    className="rounded-2xl border border-brand-red/30 bg-brand-red/5 p-6 text-center"
  >
    <AlertTriangle className="mx-auto h-8 w-8 text-brand-red" aria-hidden />
    <p className="mt-3 font-display text-lg font-semibold text-fg">
      L'analyse n'a pas pu aboutir
    </p>
    <p className="mx-auto mt-2 max-w-md text-sm text-fg-muted">{message}</p>
    <button
      type="button"
      onClick={onRetry}
      className="mt-5 inline-flex items-center gap-2 rounded-full bg-brand px-6 py-3 text-sm font-semibold text-white shadow-soft transition-shadow duration-200 hover:shadow-brand-glow focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand focus-visible:ring-offset-2 focus-visible:ring-offset-bg"
    >
      <RotateCw className="h-4 w-4" aria-hidden />
      Relancer l'analyse
    </button>
  </div>
)

const AuditReport = ({ url }: AuditReportProps) => {
  const [status, setStatus] = useState<Status>("loading")
  const [data, setData] = useState<AuditResult | null>(null)
  const [error, setError] = useState("")
  const [strategy, setStrategy] = useState<AuditStrategy>("mobile")
  const [selectedCategory, setSelectedCategory] =
    useState<AuditCategoryKey | null>(null)

  const runAudit = useCallback(async () => {
    setStatus("loading")
    setError("")
    setSelectedCategory(null)
    try {
      const res = await fetch(`/api/audit?url=${encodeURIComponent(url)}`, {
        cache: "no-store",
      })
      const json = (await res.json().catch(() => null)) as AuditApiResponse | null

      if (!json) {
        setError("Réponse inattendue du serveur. Réessayez dans un instant.")
        setStatus("error")
        return
      }
      if (!json.ok) {
        setError(json.error)
        setStatus("error")
        return
      }

      setData(json.data)
      setStrategy(json.data.mobile ? "mobile" : "desktop")
      setStatus("success")
    } catch {
      setError(
        "Impossible de lancer l'analyse pour le moment. Réessayez dans un instant.",
      )
      setStatus("error")
    }
  }, [url])

  useEffect(() => {
    void runAudit()
  }, [runAudit])

  const handleStrategyChange = (next: AuditStrategy) => {
    setStrategy(next)
    setSelectedCategory(null)
  }

  const handleCategoryToggle = (category: AuditCategoryKey) => {
    setSelectedCategory((current) =>
      current === category ? null : category,
    )
  }

  const current: AuditStrategyResult | null = data
    ? strategy === "mobile"
      ? data.mobile
      : data.desktop
    : null

  const priorityIssues = current ? selectPriorityIssues(current) : []

  return (
    <section className="pb-16 md:pb-24" aria-labelledby="audit-results-title">
      <div className="container">
        <div className="mx-auto max-w-4xl">
          <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
            <div>
              <h2
                id="audit-results-title"
                className="font-display text-2xl font-bold tracking-tight text-fg md:text-3xl"
              >
                Résultats de l'analyse
              </h2>
              <p className="mt-2 break-all text-sm text-fg-muted">
                Site analysé :{" "}
                <span className="font-semibold text-fg">
                  {toDisplayUrl(url)}
                </span>
              </p>
            </div>
            {status === "success" && (
              <StrategyToggle
                strategy={strategy}
                mobileAvailable={Boolean(data?.mobile)}
                desktopAvailable={Boolean(data?.desktop)}
                onChange={handleStrategyChange}
              />
            )}
          </div>

          <div className="mt-8">
            {status === "loading" && <LoadingState />}
            {status === "error" && (
              <ErrorState message={error} onRetry={() => void runAudit()} />
            )}
            {status === "success" && current && (
              <>
                <h3 className="sr-only">Scores par catégorie</h3>
                <p className="mb-4 text-sm text-fg-muted">
                  Cliquez sur une catégorie pour voir ce qu'elle signifie et les
                  points à corriger.
                </p>
                <div className="grid grid-cols-2 gap-4 sm:grid-cols-4 sm:gap-6">
                  {CATEGORY_ORDER.map((category) => (
                    <CategoryGaugeButton
                      key={category}
                      label={getCategoryMeta(category).label}
                      score={current.scores[category]}
                      isActive={selectedCategory === category}
                      isExpanded={selectedCategory === category}
                      panelId={getPanelId(category)}
                      onClick={() => handleCategoryToggle(category)}
                    />
                  ))}
                </div>

                <div className="mt-6 space-y-4" aria-live="polite">
                  {CATEGORY_ORDER.map((category) => (
                    <CategoryPanel
                      key={category}
                      category={category}
                      issues={current.issuesByCategory[category]}
                      isExpanded={selectedCategory === category}
                      panelId={getPanelId(category)}
                    />
                  ))}
                </div>

                <Legend />

                <h3 className="mt-12 font-display text-xl font-bold tracking-tight text-fg">
                  À corriger en priorité
                </h3>
                <p className="mt-2 text-sm text-fg-muted">
                  Les points qui auront le plus d'impact pour vos visiteurs et
                  votre référencement, un par catégorie quand c'est possible.
                </p>
                <div className="mt-5">
                  {priorityIssues.length === 0 ? (
                    <p className="rounded-2xl border border-border bg-surface p-6 text-sm text-fg-muted">
                      Aucun problème majeur détecté sur cette vue. Beau travail,
                      votre site part sur de bonnes bases.
                    </p>
                  ) : (
                    <ol className="space-y-4">
                      {priorityIssues.map((issue, index) => (
                        <li key={issue.id}>
                          <IssueCard
                            issue={issue}
                            index={index}
                            showCategoryBadge
                          />
                        </li>
                      ))}
                    </ol>
                  )}
                </div>
              </>
            )}
          </div>

          {status === "success" && (
            <div className="mt-12 rounded-3xl border border-border bg-surface p-8 text-center md:p-12">
              <h2 className="font-display text-2xl font-bold tracking-tight text-balance text-fg md:text-3xl">
                Vous voulez régler tout ça ? Parlons-en.
              </h2>
              <p className="mx-auto mt-4 max-w-xl text-base leading-relaxed text-fg-muted">
                Je transforme ces points en un site rapide, bien référencé et
                accessible. Décrivez-moi votre projet, je reviens vers vous sous
                24h.
              </p>
              <Link
                href="/#contact"
                className="mt-7 inline-flex items-center gap-2 rounded-full bg-brand px-7 py-3.5 text-sm font-semibold text-white shadow-soft transition-shadow duration-200 hover:shadow-brand-glow focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand focus-visible:ring-offset-2 focus-visible:ring-offset-bg"
              >
                Me contacter
                <ArrowRight className="h-4 w-4" aria-hidden />
              </Link>
            </div>
          )}
        </div>
      </div>
    </section>
  )
}

export default AuditReport
