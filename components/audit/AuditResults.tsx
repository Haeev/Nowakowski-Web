"use client"

import { useCallback, useEffect, useState } from "react"
import Link from "next/link"
import { ArrowRight, RotateCw } from "lucide-react"
import { useRouter, useSearchParams } from "next/navigation"

import AuditCategoryDetailPanel from "@/components/audit/AuditCategoryDetailPanel"
import AuditCategoryScoreButton from "@/components/audit/AuditCategoryScoreButton"
import AuditIssueCard from "@/components/audit/AuditIssueCard"
import AuditResultsError from "@/components/audit/AuditResultsError"
import AuditResultsSkeleton from "@/components/audit/AuditResultsSkeleton"
import AuditScoreLegend from "@/components/audit/AuditScoreLegend"
import AuditStrategyToggle from "@/components/audit/AuditStrategyToggle"
import {
  AUDIT_CATEGORY_ORDER,
  getAuditCategoryMeta,
} from "@/lib/audit/categories"
import { getAuditPanelId } from "@/lib/audit/panel-id"
import { cn } from "@/lib/cn"
import { pickTopPriorities } from "@/lib/audit/priorities"
import {
  buildAuditGratuitHref,
  createAuditRunToken,
  formatAuditUrlLabel,
} from "@/lib/audit/url"
import type {
  AuditApiResponse,
  AuditCategory,
  AuditReport,
  AuditStrategyResult,
} from "@/lib/audit/types"

type LoadStatus = "loading" | "success" | "error"

type AuditResultsProps = {
  url: string
}

const AuditResults = ({ url }: AuditResultsProps) => {
  const router = useRouter()
  const searchParams = useSearchParams()
  const runToken = searchParams.get("run") ?? "initial"

  const [status, setStatus] = useState<LoadStatus>("loading")
  const [report, setReport] = useState<AuditReport | null>(null)
  const [errorMessage, setErrorMessage] = useState("")
  const [strategy, setStrategy] = useState<"mobile" | "desktop">("mobile")
  const [expandedCategory, setExpandedCategory] = useState<AuditCategory | null>(
    null,
  )

  const runAnalysis = useCallback(async () => {
    setStatus("loading")
    setErrorMessage("")
    setReport(null)
    setExpandedCategory(null)

    try {
      const response = await fetch(
        `/api/audit?url=${encodeURIComponent(url)}&run=${encodeURIComponent(runToken)}`,
        {
          cache: "no-store",
          headers: {
            "Cache-Control": "no-cache",
            Pragma: "no-cache",
          },
        },
      )
      const payload = (await response.json().catch(() => null)) as
        | AuditApiResponse
        | null

      if (!payload) {
        setErrorMessage(
          "Réponse inattendue du serveur. Réessayez dans un instant.",
        )
        setStatus("error")
        return
      }

      if (!payload.ok) {
        setErrorMessage(payload.error)
        setStatus("error")
        return
      }

      setReport(payload.data)
      setStrategy(payload.data.mobile ? "mobile" : "desktop")
      setStatus("success")
    } catch {
      setErrorMessage(
        "Impossible de lancer l'analyse pour le moment. Réessayez dans un instant.",
      )
      setStatus("error")
    }
  }, [url, runToken])

  useEffect(() => {
    runAnalysis()
  }, [runAnalysis])

  const handleRelaunch = () => {
    router.push(buildAuditGratuitHref(url, createAuditRunToken()))
  }

  const handleToggleCategory = (category: AuditCategory) => {
    setExpandedCategory((current) => (current === category ? null : category))
  }

  const activeResult: AuditStrategyResult | null = report
    ? strategy === "mobile"
      ? report.mobile
      : report.desktop
    : null

  const priorities = activeResult ? pickTopPriorities(activeResult) : []
  const displayUrl = formatAuditUrlLabel(url)

  return (
    <section
      className="pb-16 md:pb-24"
      aria-labelledby="audit-results-title"
    >
      <div className="container">
        <div className="mx-auto max-w-4xl">
          <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
            <div>
              <h2
                id="audit-results-title"
                className="font-display text-2xl font-bold tracking-tight text-fg md:text-3xl"
              >
                Résultats de l&apos;analyse
              </h2>
              <p className="mt-2 break-all text-sm text-fg-muted">
                Site analysé :{" "}
                <span className="font-semibold text-fg">{displayUrl}</span>
              </p>
              {status === "success" && report?.fetchedAt && (
                <p className="mt-1 text-xs text-fg-subtle">
                  Analyse du{" "}
                  {new Date(report.fetchedAt).toLocaleString("fr-FR", {
                    dateStyle: "short",
                    timeStyle: "short",
                  })}
                </p>
              )}
            </div>

            <div className="flex flex-col items-stretch gap-3 sm:items-end">
              {(status === "success" || status === "loading") && (
                <button
                  type="button"
                  onClick={handleRelaunch}
                  disabled={status === "loading"}
                  className="inline-flex items-center justify-center gap-2 rounded-full border border-border bg-bg px-5 py-2.5 text-sm font-semibold text-fg transition-colors hover:border-brand hover:text-brand focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand focus-visible:ring-offset-2 focus-visible:ring-offset-bg disabled:cursor-not-allowed disabled:opacity-60"
                >
                  <RotateCw
                    className={cn(
                      "h-4 w-4",
                      status === "loading" && "motion-safe:animate-spin",
                    )}
                    aria-hidden
                  />
                  Relancer l&apos;analyse
                </button>
              )}

            {status === "success" && report && (
              <AuditStrategyToggle
                strategy={strategy}
                mobileAvailable={Boolean(report.mobile)}
                desktopAvailable={Boolean(report.desktop)}
                onChange={(nextStrategy) => {
                  setStrategy(nextStrategy)
                  setExpandedCategory(null)
                }}
              />
            )}
            </div>
          </div>

          <div className="mt-8">
            {status === "loading" && <AuditResultsSkeleton />}

            {status === "error" && (
              <AuditResultsError message={errorMessage} onRetry={handleRelaunch} />
            )}

            {status === "success" && activeResult && (
              <>
                <h3 className="sr-only">Scores par catégorie</h3>
                <p className="mb-4 text-sm text-fg-muted">
                  Cliquez sur une catégorie pour voir ce qu&apos;elle signifie et
                  les points à corriger.
                </p>
                <div className="grid grid-cols-2 gap-4 sm:grid-cols-4 sm:gap-6">
                  {AUDIT_CATEGORY_ORDER.map((category) => (
                    <AuditCategoryScoreButton
                      key={category}
                      label={getAuditCategoryMeta(category).label}
                      score={activeResult.scores[category]}
                      isActive={expandedCategory === category}
                      isExpanded={expandedCategory === category}
                      panelId={getAuditPanelId(category)}
                      onClick={() => handleToggleCategory(category)}
                    />
                  ))}
                </div>

                <div className="mt-6 space-y-4" aria-live="polite">
                  {AUDIT_CATEGORY_ORDER.map((category) => (
                    <AuditCategoryDetailPanel
                      key={category}
                      category={category}
                      issues={activeResult.issuesByCategory[category]}
                      isExpanded={expandedCategory === category}
                      panelId={getAuditPanelId(category)}
                    />
                  ))}
                </div>

                <AuditScoreLegend />

                <h3 className="mt-12 font-display text-xl font-bold tracking-tight text-fg">
                  À corriger en priorité
                </h3>
                <p className="mt-2 text-sm text-fg-muted">
                  Les points qui auront le plus d&apos;impact pour vos visiteurs
                  et votre référencement, un par catégorie quand c&apos;est
                  possible.
                </p>
                <div className="mt-5">
                  {priorities.length === 0 ? (
                    <p className="rounded-2xl border border-border bg-surface p-6 text-sm text-fg-muted">
                      Aucun problème majeur détecté sur cette vue. Beau travail,
                      votre site part sur de bonnes bases.
                    </p>
                  ) : (
                    <ol className="space-y-4">
                      {priorities.map((issue, index) => (
                        <li key={issue.id}>
                          <AuditIssueCard
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

export default AuditResults
