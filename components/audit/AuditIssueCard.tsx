import { getAuditCategoryMeta } from "@/lib/audit/categories"
import type { AuditIssue } from "@/lib/audit/types"
import { cn } from "@/lib/cn"

type AuditIssueCardProps = {
  issue: AuditIssue
  index?: number
  showCategoryBadge?: boolean
  className?: string
}

const AuditIssueCard = ({
  issue,
  index,
  showCategoryBadge = false,
  className,
}: AuditIssueCardProps) => {
  const categoryLabel = getAuditCategoryMeta(issue.category).label

  return (
    <article
      className={cn(
        "flex gap-4 rounded-2xl border border-border bg-surface p-5",
        className,
      )}
    >
      {typeof index === "number" && (
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

export default AuditIssueCard
