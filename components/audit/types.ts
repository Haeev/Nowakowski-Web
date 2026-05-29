export type AuditStrategy = "mobile" | "desktop"

export type AuditScores = {
  performance: number | null
  seo: number | null
  accessibility: number | null
  bestPractices: number | null
}

export type AuditIssue = {
  id: string
  title: string
  detail: string | null
}

export type AuditStrategyResult = {
  scores: AuditScores
  issues: AuditIssue[]
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
