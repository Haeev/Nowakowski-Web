import type { LucideIcon } from "lucide-react"
import { cn } from "@/lib/cn"

type IconBubbleProps = {
  icon: LucideIcon
  size?: "sm" | "md" | "lg"
  className?: string
}

const sizeClasses: Record<NonNullable<IconBubbleProps["size"]>, string> = {
  sm: "h-11 w-11",
  md: "h-12 w-12",
  lg: "h-14 w-14 md:h-16 md:w-16",
}

const iconSizeClasses: Record<NonNullable<IconBubbleProps["size"]>, string> = {
  sm: "h-5 w-5",
  md: "h-6 w-6",
  lg: "h-7 w-7 md:h-8 md:w-8",
}

const IconBubble = ({ icon: Icon, size = "md", className }: IconBubbleProps) => (
  <div
    aria-hidden
    className={cn(
      "inline-flex flex-shrink-0 items-center justify-center rounded-xl bg-gradient-to-br from-brand/[0.22] to-brand/[0.05]",
      sizeClasses[size],
      className,
    )}
  >
    <Icon className={cn("text-brand", iconSizeClasses[size])} aria-hidden />
  </div>
)

export default IconBubble
