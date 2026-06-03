const SCORE_LEGEND = [
  { color: "#16A34A", label: "90-100 : bon" },
  { color: "#D97706", label: "50-89 : à améliorer" },
  { color: "#F51934", label: "0-49 : faible" },
] as const

const AuditScoreLegend = () => (
  <ul className="mt-6 flex flex-wrap items-center justify-center gap-x-6 gap-y-2 text-xs text-fg-muted">
    {SCORE_LEGEND.map((item) => (
      <li className="flex items-center gap-2" key={item.label}>
        <span
          aria-hidden
          className="inline-block h-2.5 w-2.5 rounded-full"
          style={{ backgroundColor: item.color }}
        />
        {item.label}
      </li>
    ))}
  </ul>
)

export default AuditScoreLegend
