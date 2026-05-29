import type {
  AuditCategoryKey,
  AuditErrorCode,
  AuditIssue,
  AuditIssuesByCategory,
  AuditScores,
  AuditStrategy,
  AuditStrategyResult,
} from "@/components/audit/types"
import { EMPTY_ISSUES_BY_CATEGORY } from "@/components/audit/types"
import {
  METRIC_AUDIT_IDS,
  translateIssue,
} from "@/lib/audit/issue-labels"

const PSI_ENDPOINT =
  "https://www.googleapis.com/pagespeedonline/v5/runPagespeed"

const PSI_CATEGORIES = [
  "performance",
  "accessibility",
  "best-practices",
  "seo",
] as const

const PASS_THRESHOLD = 0.9
const MAX_ISSUES_PER_CATEGORY = 3

const PSI_TO_AUDIT_KEY: Record<
  (typeof PSI_CATEGORIES)[number],
  AuditCategoryKey
> = {
  performance: "performance",
  seo: "seo",
  accessibility: "accessibility",
  "best-practices": "bestPractices",
}

export class AuditError extends Error {
  readonly code: AuditErrorCode
  readonly status: number

  constructor(code: AuditErrorCode, message: string, status = 502) {
    super(message)
    this.name = "AuditError"
    this.code = code
    this.status = status
  }
}

type PsiAuditDetails = {
  type?: string
  overallSavingsMs?: number
}

type PsiAudit = {
  title?: string
  description?: string
  score: number | null
  scoreDisplayMode?: string
  displayValue?: string
  details?: PsiAuditDetails
}

type PsiAuditRef = {
  id: string
  weight: number
}

type PsiCategory = {
  score: number | null
  auditRefs?: PsiAuditRef[]
}

type PsiCategories = {
  performance?: PsiCategory
  seo?: PsiCategory
  accessibility?: PsiCategory
  "best-practices"?: PsiCategory
}

type PsiLighthouseResult = {
  categories?: PsiCategories
  audits?: Record<string, PsiAudit>
}

type PsiResponse = {
  lighthouseResult?: PsiLighthouseResult
}

const scoreToPercent = (score: number | null | undefined): number | null => {
  if (typeof score !== "number" || Number.isNaN(score)) return null
  return Math.round(score * 100)
}

const isSkippable = (audit: PsiAudit): boolean =>
  audit.scoreDisplayMode === "informative" ||
  audit.scoreDisplayMode === "notApplicable" ||
  audit.scoreDisplayMode === "manual"

const collectCategoryIssues = (
  categoryKey: AuditCategoryKey,
  auditRefs: PsiAuditRef[] | undefined,
  audits: Record<string, PsiAudit>,
): AuditIssue[] => {
  if (!auditRefs) return []

  type Candidate = { id: string; audit: PsiAudit; priority: number }
  const candidates: Candidate[] = []

  auditRefs.forEach((ref) => {
    const audit = audits[ref.id]
    if (!audit) return
    if (METRIC_AUDIT_IDS.has(ref.id)) return
    if (isSkippable(audit)) return
    if (typeof audit.score !== "number") return
    if (audit.score >= PASS_THRESHOLD) return

    const savings = audit.details?.overallSavingsMs ?? 0
    const priority =
      savings > 0
        ? 1_000_000 + savings
        : (1 - audit.score) * (ref.weight + 1) * 100

    candidates.push({ id: ref.id, audit, priority })
  })

  candidates.sort((a, b) => b.priority - a.priority)

  const issues: AuditIssue[] = []
  for (const candidate of candidates) {
    if (issues.length >= MAX_ISSUES_PER_CATEGORY) break
    const title = translateIssue(candidate.id, candidate.audit.title)
    if (!title) continue
    issues.push({
      id: candidate.id,
      category: categoryKey,
      title,
      detail: candidate.audit.displayValue ?? null,
    })
  }

  return issues
}

const collectIssuesByCategory = (
  lighthouse: PsiLighthouseResult,
): AuditIssuesByCategory => {
  const categories = lighthouse.categories ?? {}
  const audits = lighthouse.audits ?? {}
  const result = EMPTY_ISSUES_BY_CATEGORY()

  ;(
    Object.entries(PSI_TO_AUDIT_KEY) as [
      keyof PsiCategories,
      AuditCategoryKey,
    ][]
  ).forEach(([psiKey, auditKey]) => {
    result[auditKey] = collectCategoryIssues(
      auditKey,
      categories[psiKey]?.auditRefs,
      audits,
    )
  })

  return result
}

const parseStrategyResult = (
  lighthouse: PsiLighthouseResult,
): AuditStrategyResult => {
  const categories = lighthouse.categories ?? {}
  const scores: AuditScores = {
    performance: scoreToPercent(categories.performance?.score),
    seo: scoreToPercent(categories.seo?.score),
    accessibility: scoreToPercent(categories.accessibility?.score),
    bestPractices: scoreToPercent(categories["best-practices"]?.score),
  }
  return {
    scores,
    issuesByCategory: collectIssuesByCategory(lighthouse),
  }
}

const buildRequestUrl = (
  targetUrl: string,
  strategy: AuditStrategy,
  key: string,
): string => {
  const params = new URLSearchParams()
  params.set("url", targetUrl)
  params.set("key", key)
  params.set("strategy", strategy)
  params.set("locale", "fr")
  PSI_CATEGORIES.forEach((category) => params.append("category", category))
  return `${PSI_ENDPOINT}?${params.toString()}`
}

export const runPageSpeed = async (
  targetUrl: string,
  strategy: AuditStrategy,
  key: string,
  signal: AbortSignal,
): Promise<AuditStrategyResult> => {
  let res: Response
  try {
    res = await fetch(buildRequestUrl(targetUrl, strategy, key), {
      signal,
      headers: { Accept: "application/json" },
    })
  } catch (error) {
    if (error instanceof Error && error.name === "AbortError") {
      throw new AuditError(
        "timeout",
        "L'analyse a pris trop de temps. Réessayez dans un instant.",
        504,
      )
    }
    throw new AuditError(
      "unreachable",
      "Impossible de contacter le service d'analyse. Réessayez dans un instant.",
      502,
    )
  }

  if (!res.ok) {
    if (res.status === 429) {
      throw new AuditError(
        "quota",
        "Le nombre d'analyses autorisées est atteint pour le moment. Réessayez dans quelques minutes.",
        429,
      )
    }
    if (res.status === 400 || res.status === 404 || res.status === 422) {
      throw new AuditError(
        "unreachable",
        "Ce site n'a pas pu être analysé. Vérifiez que l'adresse est correcte et que le site est en ligne.",
        422,
      )
    }
    throw new AuditError(
      "server",
      "Le service d'analyse a renvoyé une erreur. Réessayez dans un instant.",
      502,
    )
  }

  let json: PsiResponse
  try {
    json = (await res.json()) as PsiResponse
  } catch {
    throw new AuditError(
      "server",
      "Réponse inattendue du service d'analyse.",
      502,
    )
  }

  const lighthouse = json.lighthouseResult
  if (!lighthouse || !lighthouse.categories) {
    throw new AuditError(
      "unreachable",
      "Ce site n'a pas pu être analysé. Vérifiez que l'adresse est correcte et que le site est en ligne.",
      422,
    )
  }

  return parseStrategyResult(lighthouse)
}
