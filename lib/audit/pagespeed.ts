import { getAuditTitleFr } from "./issues-fr"
import type {
  AuditCategory,
  AuditIssue,
  AuditReport,
  AuditStrategyResult,
} from "./types"

type LighthouseCategoryKey =
  | "performance"
  | "seo"
  | "accessibility"
  | "best-practices"

type LighthouseAudit = {
  id?: string
  title?: string
  score?: number | null
  scoreDisplayMode?: string
  displayValue?: string
}

type LighthouseCategory = {
  score?: number | null
  auditRefs?: Array<{ id: string }>
}

type LighthouseResult = {
  categories?: Partial<Record<LighthouseCategoryKey, LighthouseCategory>>
  audits?: Record<string, LighthouseAudit>
}

type PageSpeedResponse = {
  lighthouseResult?: LighthouseResult
}

const LH_TO_AUDIT_CATEGORY: Record<LighthouseCategoryKey, AuditCategory> = {
  performance: "performance",
  seo: "seo",
  accessibility: "accessibility",
  "best-practices": "bestPractices",
}

const emptyIssues = (): Record<AuditCategory, AuditIssue[]> => ({
  performance: [],
  seo: [],
  accessibility: [],
  bestPractices: [],
})

const emptyScores = (): Record<AuditCategory, number> => ({
  performance: 0,
  seo: 0,
  accessibility: 0,
  bestPractices: 0,
})

const scoreToPercent = (score: number | null | undefined): number => {
  if (score === null || score === undefined) return 0
  return Math.round(score * 100)
}

const isFailingAudit = (audit: LighthouseAudit): boolean => {
  if (audit.scoreDisplayMode === "notApplicable") return false
  if (audit.scoreDisplayMode === "manual") return false
  if (audit.scoreDisplayMode === "informative") return false
  if (typeof audit.score !== "number") return false
  return audit.score < 1
}

const buildAuditCategoryMap = (
  lighthouse: LighthouseResult,
): Map<string, AuditCategory> => {
  const map = new Map<string, AuditCategory>()

  for (const [lhKey, auditCategory] of Object.entries(LH_TO_AUDIT_CATEGORY)) {
    const category = lighthouse.categories?.[lhKey as LighthouseCategoryKey]
    for (const ref of category?.auditRefs ?? []) {
      map.set(ref.id, auditCategory)
    }
  }

  return map
}

const guessCategory = (auditId: string): AuditCategory => {
  if (
    auditId.includes("seo") ||
    auditId.startsWith("meta-") ||
    auditId.startsWith("document-") ||
    auditId.startsWith("hreflang") ||
    auditId.startsWith("canonical") ||
    auditId.startsWith("robots") ||
    auditId.startsWith("link-text") ||
    auditId.startsWith("crawl")
  ) {
    return "seo"
  }

  if (
    auditId.includes("accessibility") ||
    auditId.startsWith("color-") ||
    auditId.startsWith("aria-") ||
    auditId.startsWith("label-") ||
    auditId.startsWith("html-has-lang")
  ) {
    return "accessibility"
  }

  if (
    auditId.startsWith("is-on-https") ||
    auditId.startsWith("errors-in-console") ||
    auditId.startsWith("charset") ||
    auditId.startsWith("deprecations") ||
    auditId.startsWith("valid-source-maps") ||
    auditId.startsWith("geolocation") ||
    auditId.startsWith("notification")
  ) {
    return "bestPractices"
  }

  return "performance"
}

const parseStrategyResult = (
  lighthouse: LighthouseResult,
): AuditStrategyResult => {
  const scores = emptyScores()
  const issuesByCategory = emptyIssues()
  const auditCategoryMap = buildAuditCategoryMap(lighthouse)

  for (const [lhKey, auditCategory] of Object.entries(LH_TO_AUDIT_CATEGORY)) {
    scores[auditCategory] = scoreToPercent(
      lighthouse.categories?.[lhKey as LighthouseCategoryKey]?.score,
    )
  }

  for (const [auditId, audit] of Object.entries(lighthouse.audits ?? {})) {
    if (!isFailingAudit(audit)) continue

    const category = auditCategoryMap.get(auditId) ?? guessCategory(auditId)
    const detail =
      typeof audit.displayValue === "string" && audit.displayValue.trim() !== ""
        ? audit.displayValue.trim()
        : null

    issuesByCategory[category].push({
      id: auditId,
      category,
      title: getAuditTitleFr(auditId, audit.title),
      detail,
    })
  }

  for (const category of Object.keys(issuesByCategory) as AuditCategory[]) {
    issuesByCategory[category].sort((left, right) =>
      left.title.localeCompare(right.title, "fr"),
    )
  }

  return { scores, issuesByCategory }
}

const runPageSpeed = async (
  url: string,
  strategy: "mobile" | "desktop",
  apiKey: string,
): Promise<AuditStrategyResult | null> => {
  const endpoint = new URL(
    "https://www.googleapis.com/pagespeedonline/v5/runPagespeed",
  )
  endpoint.searchParams.set("url", url)
  endpoint.searchParams.set("key", apiKey)
  endpoint.searchParams.set("strategy", strategy)
  endpoint.searchParams.set("locale", "fr")
  for (const category of [
    "PERFORMANCE",
    "SEO",
    "ACCESSIBILITY",
    "BEST_PRACTICES",
  ]) {
    endpoint.searchParams.append("category", category)
  }

  const response = await fetch(endpoint.toString(), {
    cache: "no-store",
    next: { revalidate: 0 },
  })

  if (!response.ok) return null

  const payload = (await response.json()) as PageSpeedResponse
  if (!payload.lighthouseResult) return null

  return parseStrategyResult(payload.lighthouseResult)
}

export const runSiteAudit = async (url: string): Promise<AuditReport> => {
  const apiKey = process.env.PAGESPEED_API_KEY

  if (!apiKey) {
    throw new Error("PAGESPEED_API_KEY is not configured")
  }

  const [mobile, desktop] = await Promise.all([
    runPageSpeed(url, "mobile", apiKey),
    runPageSpeed(url, "desktop", apiKey),
  ])

  return {
    url,
    fetchedAt: new Date().toISOString(),
    mobile,
    desktop,
  }
}
