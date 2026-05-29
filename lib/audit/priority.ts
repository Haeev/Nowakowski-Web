import { CATEGORY_ORDER } from "@/lib/audit/categories"
import type {
  AuditCategoryKey,
  AuditIssue,
  AuditStrategyResult,
} from "@/components/audit/types"

const TARGET_COUNT = 4

const getCategoryScore = (
  result: AuditStrategyResult,
  category: AuditCategoryKey,
): number => result.scores[category] ?? 100

const sortCategoriesByWorstScore = (
  result: AuditStrategyResult,
): AuditCategoryKey[] =>
  [...CATEGORY_ORDER].sort(
    (a, b) => getCategoryScore(result, a) - getCategoryScore(result, b),
  )

export const selectPriorityIssues = (
  result: AuditStrategyResult,
): AuditIssue[] => {
  const selected: AuditIssue[] = []
  const usedIds = new Set<string>()

  const pushIssue = (issue: AuditIssue) => {
    if (usedIds.has(issue.id)) return false
    usedIds.add(issue.id)
    selected.push(issue)
    return true
  }

  for (const category of CATEGORY_ORDER) {
    if (selected.length >= TARGET_COUNT) break
    const top = result.issuesByCategory[category][0]
    if (top) pushIssue(top)
  }

  if (selected.length >= TARGET_COUNT) return selected.slice(0, TARGET_COUNT)

  const worstFirst = sortCategoriesByWorstScore(result)
  for (const category of worstFirst) {
    if (selected.length >= TARGET_COUNT) break
    const issues = result.issuesByCategory[category]
    for (let index = 1; index < issues.length; index += 1) {
      if (selected.length >= TARGET_COUNT) break
      pushIssue(issues[index])
    }
  }

  return selected.slice(0, TARGET_COUNT)
}
