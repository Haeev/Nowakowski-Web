import { LoaderCircle } from "lucide-react"

import { AUDIT_CATEGORY_ORDER } from "@/lib/audit/categories"

const AuditResultsSkeleton = () => (
  <div role="status" aria-live="polite">
    <div className="grid grid-cols-2 gap-6 sm:grid-cols-4">
      {AUDIT_CATEGORY_ORDER.map((category) => (
        <div className="flex flex-col items-center gap-3" key={category}>
          <div className="h-[120px] w-[120px] animate-pulse rounded-full bg-surface-2" />
          <div className="h-4 w-20 animate-pulse rounded bg-surface-2" />
        </div>
      ))}
    </div>
    <div className="mt-8 h-40 animate-pulse rounded-2xl border border-border bg-surface" />
    <div className="mt-10 space-y-4">
      {[0, 1, 2, 3].map((index) => (
        <div
          className="h-20 animate-pulse rounded-2xl border border-border bg-surface"
          key={index}
        />
      ))}
    </div>
    <p className="mt-8 flex items-center justify-center gap-2 text-sm text-fg-muted">
      <LoaderCircle className="h-4 w-4 animate-spin text-brand" aria-hidden />
      Analyse en cours, cela prend une trentaine de secondes…
    </p>
  </div>
)

export default AuditResultsSkeleton
