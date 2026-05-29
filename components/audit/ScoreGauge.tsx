"use client"

import { useEffect, useState } from "react"

type ScoreGaugeProps = {
  label: string
  score: number | null
}

const SIZE = 120
const STROKE = 10
const RADIUS = (SIZE - STROKE) / 2
const CIRCUMFERENCE = 2 * Math.PI * RADIUS

const getColor = (score: number | null): string => {
  if (score === null) return "#909090"
  if (score >= 90) return "#16A34A"
  if (score >= 50) return "#D97706"
  return "#F51934"
}

const ScoreGauge = ({ label, score }: ScoreGaugeProps) => {
  const target = score ?? 0
  const [progress, setProgress] = useState(0)

  useEffect(() => {
    const frame = requestAnimationFrame(() => setProgress(target))
    return () => cancelAnimationFrame(frame)
  }, [target])

  const color = getColor(score)
  const offset = CIRCUMFERENCE - (progress / 100) * CIRCUMFERENCE
  const display = score === null ? "—" : String(score)
  const ariaLabel =
    score === null
      ? `${label} : score indisponible`
      : `${label} : ${score} sur 100`

  return (
    <div className="flex flex-col items-center gap-3">
      <div
        className="relative h-[120px] w-[120px]"
        role="img"
        aria-label={ariaLabel}
      >
        <svg
          width={SIZE}
          height={SIZE}
          viewBox={`0 0 ${SIZE} ${SIZE}`}
          className="-rotate-90"
          aria-hidden
        >
          <circle
            cx={SIZE / 2}
            cy={SIZE / 2}
            r={RADIUS}
            fill="none"
            strokeWidth={STROKE}
            className="stroke-border"
          />
          <circle
            cx={SIZE / 2}
            cy={SIZE / 2}
            r={RADIUS}
            fill="none"
            strokeWidth={STROKE}
            strokeLinecap="round"
            strokeDasharray={CIRCUMFERENCE}
            className="transition-[stroke-dashoffset] duration-700 ease-out"
            style={{ stroke: color, strokeDashoffset: offset }}
          />
        </svg>
        <div className="absolute inset-0 flex items-center justify-center">
          <span
            className="font-display text-3xl font-extrabold"
            style={{ color }}
          >
            {display}
          </span>
        </div>
      </div>
      <span className="text-center text-sm font-semibold text-fg">{label}</span>
    </div>
  )
}

export default ScoreGauge
