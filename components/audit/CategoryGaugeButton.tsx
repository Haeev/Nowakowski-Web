import ScoreGauge from "./ScoreGauge"
import { cn } from "@/lib/cn"

type CategoryGaugeButtonProps = {
  label: string
  score: number | null
  isActive: boolean
  isExpanded: boolean
  panelId: string
  onClick: () => void
}

const CategoryGaugeButton = ({
  label,
  score,
  isActive,
  isExpanded,
  panelId,
  onClick,
}: CategoryGaugeButtonProps) => {
  const scoreLabel =
    score === null ? "score indisponible" : `${score} sur 100`
  const actionLabel = isExpanded ? "masquer le détail" : "voir le détail"

  return (
    <button
      type="button"
      onClick={onClick}
      aria-expanded={isExpanded}
      aria-controls={panelId}
      aria-label={`${label} : ${scoreLabel}, ${actionLabel}`}
      className={cn(
        "rounded-2xl p-2 transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand focus-visible:ring-offset-2 focus-visible:ring-offset-bg motion-reduce:transition-none",
        isActive && "bg-brand/10 ring-2 ring-brand shadow-soft",
        !isActive && "hover:bg-surface",
      )}
    >
      <ScoreGauge label={label} score={score} decorative />
    </button>
  )
}

export default CategoryGaugeButton
