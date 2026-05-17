import type { ReactNode } from "react"
import { cn } from "@/lib/cn"

type SectionLabelProps = {
  children: ReactNode
  accent?: "violet" | "red"
}

const SectionLabel = ({ children, accent = "violet" }: SectionLabelProps) => {
  const isRed = accent === "red"
  return (
    <p
      className={cn(
        "mb-4 inline-flex items-center gap-3 text-xs font-semibold uppercase tracking-[0.2em]",
        isRed ? "text-brand-red" : "text-brand",
      )}
    >
      <span
        aria-hidden
        className={cn(
          "inline-block h-px w-6",
          isRed ? "bg-brand-red" : "bg-brand",
        )}
      />
      {children}
    </p>
  )
}

export default SectionLabel
