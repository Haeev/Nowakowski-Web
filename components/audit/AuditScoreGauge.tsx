"use client"

import { useEffect, useState } from "react"

type AuditScoreGaugeProps = {
  label: string
  score: number | null
  decorative?: boolean
}

const GAUGE_RADIUS = 55
const GAUGE_CIRCUMFERENCE = Math.PI * 2 * GAUGE_RADIUS

const getScoreColor = (score: number | null): string => {
  if (score === null) return "#909090"
  if (score >= 90) return "#16A34A"
  if (score >= 50) return "#D97706"
  return "#F51934"
}

const AuditScoreGauge = ({
  label,
  score,
  decorative = false,
}: AuditScoreGaugeProps) => {
  const [animatedScore, setAnimatedScore] = useState(0)
  const targetScore = score ?? 0

  useEffect(() => {
    const frame = requestAnimationFrame(() => setAnimatedScore(targetScore))
    return () => cancelAnimationFrame(frame)
  }, [targetScore])

  const strokeColor = getScoreColor(score)
  const displayValue = score === null ? "?" : String(score)
  const ariaLabel =
    score === null
      ? `${label} : score indisponible`
      : `${label} : ${score} sur 100`

  return (
    <div className="flex flex-col items-center gap-3">
      <div
        className="relative h-[120px] w-[120px]"
        {...(decorative
          ? { "aria-hidden": true }
          : { role: "img", "aria-label": ariaLabel })}
      >
        <svg
          width={120}
          height={120}
          viewBox="0 0 120 120"
          className="-rotate-90"
          aria-hidden
        >
          <circle
            cx={60}
            cy={60}
            r={GAUGE_RADIUS}
            fill="none"
            strokeWidth={10}
            className="stroke-border"
          />
          <circle
            cx={60}
            cy={60}
            r={GAUGE_RADIUS}
            fill="none"
            strokeWidth={10}
            strokeLinecap="round"
            strokeDasharray={GAUGE_CIRCUMFERENCE}
            className="transition-[stroke-dashoffset] duration-700 ease-out"
            style={{
              stroke: strokeColor,
              strokeDashoffset:
                GAUGE_CIRCUMFERENCE - (animatedScore / 100) * GAUGE_CIRCUMFERENCE,
            }}
          />
        </svg>
        <div className="absolute inset-0 flex items-center justify-center">
          <span
            className="font-display text-3xl font-extrabold"
            style={{ color: strokeColor }}
          >
            {displayValue}
          </span>
        </div>
      </div>
      <span className="text-center text-sm font-semibold text-fg">{label}</span>
    </div>
  )
}

export default AuditScoreGauge
