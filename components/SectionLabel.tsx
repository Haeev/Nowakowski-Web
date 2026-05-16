type SectionLabelProps = {
  children: string
  accent?: "violet" | "red"
}

const SectionLabel = ({ children, accent = "violet" }: SectionLabelProps) => {
  const isRed = accent === "red"
  return (
    <p
      className={`mb-4 inline-flex items-center gap-3 text-xs font-semibold uppercase tracking-[0.2em] ${
        isRed ? "text-[#F51934]" : "text-brand"
      }`}
    >
      <span
        aria-hidden
        className={`inline-block h-px w-6 ${isRed ? "bg-[#F51934]" : "bg-brand"}`}
      />
      {children}
    </p>
  )
}

export default SectionLabel
