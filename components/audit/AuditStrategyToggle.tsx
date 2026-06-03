"use client"

import { Monitor, Smartphone } from "lucide-react"

import { cn } from "@/lib/cn"

type AuditStrategyToggleProps = {
  strategy: "mobile" | "desktop"
  mobileAvailable: boolean
  desktopAvailable: boolean
  onChange: (strategy: "mobile" | "desktop") => void
}

const toggleButtonClass =
  "inline-flex items-center gap-2 rounded-full px-4 py-2 text-sm font-semibold transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand focus-visible:ring-offset-2 focus-visible:ring-offset-bg disabled:cursor-not-allowed disabled:opacity-40"

const AuditStrategyToggle = ({
  strategy,
  mobileAvailable,
  desktopAvailable,
  onChange,
}: AuditStrategyToggleProps) => (
  <div
    className="inline-flex items-center gap-1 rounded-full border border-border bg-surface p-1"
    role="group"
    aria-label="Choisir l'appareil analysé"
  >
    <button
      type="button"
      onClick={() => onChange("mobile")}
      disabled={!mobileAvailable}
      aria-pressed={strategy === "mobile"}
      className={cn(
        toggleButtonClass,
        strategy === "mobile"
          ? "bg-brand text-white"
          : "text-fg-muted hover:text-fg",
      )}
    >
      <Smartphone className="h-4 w-4" aria-hidden />
      Mobile
    </button>
    <button
      type="button"
      onClick={() => onChange("desktop")}
      disabled={!desktopAvailable}
      aria-pressed={strategy === "desktop"}
      className={cn(
        toggleButtonClass,
        strategy === "desktop"
          ? "bg-brand text-white"
          : "text-fg-muted hover:text-fg",
      )}
    >
      <Monitor className="h-4 w-4" aria-hidden />
      Ordinateur
    </button>
  </div>
)

export default AuditStrategyToggle
