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
  DIAGNOSTIC_AUDIT_IDS,
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

const PASS_THRESHOLD = 1
const MAX_ISSUES_PER_CATEGORY = 3
const DIAGNOSTICS_GROUP = "diagnostics"

const isPerfectCategoryScore = (score: number | null): boolean =>
  score === 100

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
  overallSavingsBytes?: number
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
  group?: string
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

const isOpportunity = (audit: PsiAudit): boolean =>
  audit.details?.type === "opportunity"

const hasEstimatedSavings = (audit: PsiAudit): boolean => {
  const ms = audit.details?.overallSavingsMs ?? 0
  const bytes = audit.details?.overallSavingsBytes ?? 0
  return ms > 0 || bytes > 0
}

const isEligibleAudit = (
  ref: PsiAuditRef,
  audit: PsiAudit,
): boolean => {
  if (METRIC_AUDIT_IDS.has(ref.id)) return false
  if (DIAGNOSTIC_AUDIT_IDS.has(ref.id)) return false
  if (ref.group === DIAGNOSTICS_GROUP) return false
  if (isSkippable(audit)) return false
  if (typeof audit.score !== "number" || audit.score >= PASS_THRESHOLD) return false

  if (isOpportunity(audit)) return hasEstimatedSavings(audit)
  return true
}

const collectCategoryIssues = (
  categoryKey: AuditCategoryKey,
  auditRefs: PsiAuditRef[] | undefined,
  audits: Record<string, PsiAudit>,
): AuditIssue[] => {
  if (!auditRefs) return []

  type Candidate = {
    id: string
    audit: PsiAudit
    isOpportunity: boolean
    savings: number
    score: number
  }
  const candidates: Candidate[] = []

  auditRefs.forEach((ref) => {
    const audit = audits[ref.id]
    if (!audit) return
    if (!isEligibleAudit(ref, audit)) return

    candidates.push({
      id: ref.id,
      audit,
      isOpportunity: isOpportunity(audit),
      savings: audit.details?.overallSavingsMs ?? 0,
      score: audit.score as number,
    })
  })

  candidates.sort((a, b) => {
    if (a.isOpportunity && b.isOpportunity) return b.savings - a.savings
    if (a.isOpportunity !== b.isOpportunity) return a.isOpportunity ? -1 : 1
    return a.score - b.score
  })

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
    issuesByCategory: (() => {
      const issuesByCategory = collectIssuesByCategory(lighthouse)
      // Lighthouse peut signaler des audits faible poids alors que le score
      // arrondi affiche 100 : on n'affiche rien à corriger pour ces catégories.
      ;(
        Object.keys(issuesByCategory) as AuditCategoryKey[]
      ).forEach((key) => {
        if (isPerfectCategoryScore(scores[key])) {
          issuesByCategory[key] = []
        }
      })
      return issuesByCategory
    })(),
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
