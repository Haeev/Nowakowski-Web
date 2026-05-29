export type AuditStrategy = "mobile" | "desktop"

export type AuditCategoryKey =
  | "performance"
  | "seo"
  | "accessibility"
  | "bestPractices"

export type AuditScores = {
  performance: number | null
  seo: number | null
  accessibility: number | null
  bestPractices: number | null
}

export type AuditIssue = {
  id: string
  category: AuditCategoryKey
  title: string
  detail: string | null
}

export type AuditIssuesByCategory = Record<AuditCategoryKey, AuditIssue[]>

export type AuditStrategyResult = {
  scores: AuditScores
  issuesByCategory: AuditIssuesByCategory
}

export type AuditResult = {
  url: string
  fetchedAt: string
  mobile: AuditStrategyResult | null
  desktop: AuditStrategyResult | null
}

export type AuditErrorCode =
  | "invalid_url"
  | "unreachable"
  | "timeout"
  | "quota"
  | "config"
  | "server"

export type AuditApiSuccess = {
  ok: true
  data: AuditResult
}

export type AuditApiError = {
  ok: false
  error: string
  code: AuditErrorCode
}

export type AuditApiResponse = AuditApiSuccess | AuditApiError

export const EMPTY_ISSUES_BY_CATEGORY = (): AuditIssuesByCategory => ({
  performance: [],
  seo: [],
  accessibility: [],
  bestPractices: [],
})
