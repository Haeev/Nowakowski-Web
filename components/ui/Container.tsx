import type { ElementType, ReactNode } from "react"
import { cn } from "@/lib/cn"

type ContainerProps = {
  children: ReactNode
  className?: string
  as?: ElementType
}

const Container = ({
  children,
  className,
  as: Tag = "div",
}: ContainerProps) => (
  <Tag className={cn("container", className)}>{children}</Tag>
)

export default Container
