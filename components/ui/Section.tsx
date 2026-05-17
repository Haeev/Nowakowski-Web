import type { CSSProperties, ReactNode } from "react"
import { cn } from "@/lib/cn"

type SectionTone = "default" | "surface"

type SectionProps = {
  children: ReactNode
  id?: string
  className?: string
  tone?: SectionTone
  ariaLabelledBy?: string
  style?: CSSProperties
}

const toneClasses: Record<SectionTone, string> = {
  default: "",
  surface: "bg-surface",
}

const Section = ({
  children,
  id,
  className,
  tone = "default",
  ariaLabelledBy,
  style,
}: SectionProps) => (
  <section
    id={id}
    aria-labelledby={ariaLabelledBy}
    className={cn(
      "py-16 md:py-20",
      toneClasses[tone],
      className,
    )}
    style={style}
  >
    {children}
  </section>
)

export default Section
