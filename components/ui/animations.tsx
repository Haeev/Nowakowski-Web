"use client"

import {
  createContext,
  useContext,
  useEffect,
  useRef,
  useState,
  type ElementType,
  type ReactNode,
} from "react"
import { cn } from "@/lib/cn"

export type VariantName =
  | "fadeUp"
  | "fadeUpFast"
  | "fadeIn"
  | "fadeLeft"
  | "fadeRight"
  | "scaleFade"

export type StaggerVariant = "staggerContainer" | "staggerContainerFast"

export const fadeUp: VariantName = "fadeUp"
export const fadeUpFast: VariantName = "fadeUpFast"
export const fadeIn: VariantName = "fadeIn"
export const fadeLeft: VariantName = "fadeLeft"
export const fadeRight: VariantName = "fadeRight"
export const scaleFade: VariantName = "scaleFade"
export const staggerContainer: StaggerVariant = "staggerContainer"
export const staggerContainerFast: StaggerVariant = "staggerContainerFast"

const STAGGER_CLASS: Record<StaggerVariant, string> = {
  staggerContainer: "stagger-container",
  staggerContainerFast: "stagger-container-fast",
}

const REVEAL_CLASS: Record<VariantName, string> = {
  fadeUp: "reveal-fade-up",
  fadeUpFast: "reveal-fade-up-fast",
  fadeIn: "reveal-fade-in",
  fadeLeft: "reveal-fade-left",
  fadeRight: "reveal-fade-right",
  scaleFade: "reveal-scale-fade",
}

const isStaggerVariant = (
  variants?: VariantName | StaggerVariant,
): variants is StaggerVariant =>
  variants === "staggerContainer" || variants === "staggerContainerFast"

type StaggerContextValue = {
  visible: boolean
  stagger: StaggerVariant
}

const StaggerContext = createContext<StaggerContextValue | null>(null)

const useInViewOnce = (
  amount = 0.1,
  margin = "0px",
  once = true,
): [React.RefObject<HTMLElement | null>, boolean] => {
  const ref = useRef<HTMLElement | null>(null)
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    const node = ref.current
    if (!node || visible) return

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry?.isIntersecting) {
          setVisible(true)
          if (once) observer.disconnect()
        } else if (!once) {
          setVisible(false)
        }
      },
      { threshold: amount, rootMargin: margin },
    )

    observer.observe(node)
    return () => observer.disconnect()
  }, [amount, margin, once, visible])

  return [ref, visible]
}

type AnimatedSectionProps = {
  children: ReactNode
  className?: string
  as?: ElementType
  variants?: VariantName | StaggerVariant
  amount?: number
  margin?: string
  once?: boolean
}

export const AnimatedSection = ({
  children,
  className,
  as: Tag = "div",
  variants = fadeUp,
  amount = 0.1,
  margin = "0px",
  once = true,
}: AnimatedSectionProps) => {
  const [ref, visible] = useInViewOnce(amount, margin, once)
  const stagger = isStaggerVariant(variants) ? variants : null
  const revealClass = stagger ? undefined : REVEAL_CLASS[variants as VariantName]

  const content = (
    <Tag
      ref={ref as React.Ref<HTMLElement>}
      className={cn(
        stagger ? STAGGER_CLASS[stagger] : revealClass,
        visible && "is-visible",
        className,
      )}
    >
      {children}
    </Tag>
  )

  if (!stagger) return content

  return (
    <StaggerContext.Provider value={{ visible, stagger }}>
      {content}
    </StaggerContext.Provider>
  )
}

type AnimatedItemProps = {
  children: ReactNode
  className?: string
  as?: ElementType
  variants?: VariantName
}

export const AnimatedItem = ({
  children,
  className,
  as: Tag = "div",
  variants = fadeUp,
}: AnimatedItemProps) => {
  const staggerContext = useContext(StaggerContext)
  const [ref, selfVisible] = useInViewOnce(0.1, "0px", true)
  const revealClass = REVEAL_CLASS[variants]
  const visible = staggerContext?.visible ?? selfVisible

  return (
    <Tag
      ref={staggerContext ? undefined : (ref as React.Ref<HTMLElement>)}
      className={cn(
        staggerContext && "stagger-item",
        revealClass,
        visible && "is-visible",
        className,
      )}
    >
      {children}
    </Tag>
  )
}
