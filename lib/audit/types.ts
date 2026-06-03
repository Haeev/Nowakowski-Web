export type AuditCategory =
  | "performance"
  | "seo"
  | "accessibility"
  | "bestPractices"

export type AuditIssue = {
  id: string
  category: AuditCategory
  title: string
  detail: string | null
}

export type AuditStrategyResult = {
  scores: Record<AuditCategory, number>
  issuesByCategory: Record<AuditCategory, AuditIssue[]>
}

export type AuditReport = {
  url: string
  fetchedAt: string
  mobile: AuditStrategyResult | null
  desktop: AuditStrategyResult | null
}

export type AuditApiSuccess = {
  ok: true
  data: AuditReport
}

export type AuditApiError = {
  ok: false
  error: string
  code: "invalid_url" | "config_error" | "upstream_error"
}

export type AuditApiResponse = AuditApiSuccess | AuditApiError
