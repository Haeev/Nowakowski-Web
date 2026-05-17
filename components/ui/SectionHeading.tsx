import type { ReactNode } from "react"
import { cn } from "@/lib/cn"

type SectionHeadingProps = {
  children: ReactNode
  id?: string
  className?: string
  size?: "default" | "large"
}

const sizeClasses: Record<NonNullable<SectionHeadingProps["size"]>, string> = {
  default:
    "font-display text-4xl font-bold tracking-tight md:text-5xl lg:text-6xl text-balance",
  large:
    "font-display text-5xl font-extrabold tracking-tight md:text-6xl lg:text-7xl text-balance",
}

const SectionHeading = ({
  children,
  id,
  className,
  size = "default",
}: SectionHeadingProps) => (
  <h2 id={id} className={cn(sizeClasses[size], className)}>
    {children}
  </h2>
)

export default SectionHeading
