"use client"

import { RotateCw, TriangleAlert } from "lucide-react"

type AuditResultsErrorProps = {
  message: string
  onRetry: () => void
}

const AuditResultsError = ({ message, onRetry }: AuditResultsErrorProps) => (
  <div
    role="alert"
    className="rounded-2xl border border-brand-red/30 bg-brand-red/5 p-6 text-center"
  >
    <TriangleAlert className="mx-auto h-8 w-8 text-brand-red" aria-hidden />
    <p className="mt-3 font-display text-lg font-semibold text-fg">
      L&apos;analyse n&apos;a pas pu aboutir
    </p>
    <p className="mx-auto mt-2 max-w-md text-sm text-fg-muted">{message}</p>
    <button
      type="button"
      onClick={onRetry}
      className="mt-5 inline-flex items-center gap-2 rounded-full bg-brand px-6 py-3 text-sm font-semibold text-white shadow-soft transition-shadow duration-200 hover:shadow-brand-glow focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand focus-visible:ring-offset-2 focus-visible:ring-offset-bg"
    >
      <RotateCw className="h-4 w-4" aria-hidden />
      Relancer l&apos;analyse
    </button>
  </div>
)

export default AuditResultsError
