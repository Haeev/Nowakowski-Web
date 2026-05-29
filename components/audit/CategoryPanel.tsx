import type { AuditCategoryKey, AuditIssue } from "./types"
import IssueCard from "./IssueCard"
import { getCategoryMeta } from "@/lib/audit/categories"
import { cn } from "@/lib/cn"

type CategoryPanelProps = {
  category: AuditCategoryKey
  issues: AuditIssue[]
  isExpanded: boolean
  panelId: string
}

const CategoryPanel = ({
  category,
  issues,
  isExpanded,
  panelId,
}: CategoryPanelProps) => {
  const meta = getCategoryMeta(category)

  return (
    <div
      id={panelId}
      role="region"
      aria-labelledby={`${panelId}-title`}
      hidden={!isExpanded}
      className={cn(
        "overflow-hidden transition-all duration-300 motion-reduce:transition-none",
        isExpanded ? "max-h-[2000px] opacity-100" : "max-h-0 opacity-0",
      )}
    >
      <div className="rounded-2xl border border-border bg-surface p-6 md:p-8">
        <h3
          id={`${panelId}-title`}
          className="font-display text-lg font-bold tracking-tight text-fg md:text-xl"
        >
          {meta.label}
        </h3>
        <p className="mt-3 text-sm leading-relaxed text-fg-muted md:text-base">
          {meta.explanation}
        </p>

        <h4 className="mt-6 text-sm font-semibold uppercase tracking-wide text-fg-muted">
          Points à corriger dans cette catégorie
        </h4>

        {issues.length === 0 ? (
          <p className="mt-4 rounded-xl border border-border bg-bg p-4 text-sm text-fg-muted">
            Rien à signaler ici, cette catégorie est au top.
          </p>
        ) : (
          <ul className="mt-4 space-y-3">
            {issues.map((issue) => (
              <li key={issue.id}>
                <IssueCard issue={issue} />
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  )
}

export default CategoryPanel
