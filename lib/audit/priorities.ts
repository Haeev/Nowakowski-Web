import { AUDIT_CATEGORY_ORDER } from "./categories"
import type { AuditCategory, AuditIssue, AuditStrategyResult } from "./types"

const isPerfectScore = (
  result: AuditStrategyResult,
  category: AuditCategory,
): boolean => result.scores[category] === 100

const getCategoryScore = (
  result: AuditStrategyResult,
  category: AuditCategory,
): number => result.scores[category] ?? 100

export const pickTopPriorities = (
  result: AuditStrategyResult,
): AuditIssue[] => {
  const picked: AuditIssue[] = []
  const seen = new Set<string>()

  const addIssue = (issue: AuditIssue): boolean => {
    if (seen.has(issue.id)) return false
    seen.add(issue.id)
    picked.push(issue)
    return true
  }

  for (const category of AUDIT_CATEGORY_ORDER) {
    if (picked.length >= 4) break
    if (!isPerfectScore(result, category)) {
      const first = result.issuesByCategory[category][0]
      if (first) addIssue(first)
    }
  }

  if (picked.length >= 4) return picked.slice(0, 4)

  const categoriesByScore = [...AUDIT_CATEGORY_ORDER].sort(
    (left, right) => getCategoryScore(result, left) - getCategoryScore(result, right),
  )

  for (const category of categoriesByScore) {
    if (picked.length >= 4) break
    if (isPerfectScore(result, category)) continue

    const issues = result.issuesByCategory[category]
    for (let index = 1; index < issues.length && picked.length < 4; index += 1) {
      addIssue(issues[index])
    }
  }

  return picked.slice(0, 4)
}
