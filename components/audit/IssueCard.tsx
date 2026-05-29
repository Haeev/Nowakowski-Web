import type { AuditCategoryKey, AuditIssue } from "./types"
import { getCategoryMeta } from "@/lib/audit/categories"
import { cn } from "@/lib/cn"

type IssueCardProps = {
  issue: AuditIssue
  index?: number
  showCategoryBadge?: boolean
  className?: string
}

const IssueCard = ({
  issue,
  index,
  showCategoryBadge = false,
  className,
}: IssueCardProps) => {
  const categoryLabel = getCategoryMeta(issue.category).label
  const isNumbered = typeof index === "number"

  return (
    <article
      className={cn(
        "flex gap-4 rounded-2xl border border-border bg-surface p-5",
        className,
      )}
    >
      {isNumbered && (
        <span
          aria-hidden
          className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-brand/10 font-display text-sm font-bold text-brand"
        >
          {index + 1}
        </span>
      )}
      <div className="min-w-0 flex-1">
        {showCategoryBadge && (
          <p className="mb-1 text-xs font-semibold uppercase tracking-wide text-brand">
            {categoryLabel}
          </p>
        )}
        <p className="font-medium text-fg">{issue.title}</p>
        {issue.detail && (
          <p className="mt-1 text-sm text-fg-subtle">{issue.detail}</p>
        )}
      </div>
    </article>
  )
}

export default IssueCard
