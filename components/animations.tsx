"use client"

import { motion, useInView, useMotionValue, useSpring, useTransform } from "framer-motion"
import type { Variants, Transition, MotionProps } from "framer-motion"
import { useEffect, useRef, type ReactNode, type ElementType } from "react"

const EASE: [number, number, number, number] = [0.25, 0.1, 0.25, 1]

export const fadeUp: Variants = {
  hidden: { opacity: 0, y: 40 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: EASE },
  },
}

export const fadeUpFast: Variants = {
  hidden: { opacity: 0, y: 16 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.35, ease: EASE },
  },
}

export const fadeIn: Variants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { duration: 0.8 } },
}

export const fadeLeft: Variants = {
  hidden: { opacity: 0, x: -60 },
  visible: { opacity: 1, x: 0, transition: { duration: 0.6, ease: EASE } },
}

export const fadeRight: Variants = {
  hidden: { opacity: 0, x: 40 },
  visible: { opacity: 1, x: 0, transition: { duration: 0.5, ease: EASE } },
}

export const scaleFade: Variants = {
  hidden: { opacity: 0, scale: 0.92, y: 24 },
  visible: {
    opacity: 1,
    scale: 1,
    y: 0,
    transition: { duration: 0.55, ease: EASE },
  },
}

export const staggerContainer: Variants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.12, delayChildren: 0.1 } },
}

export const staggerContainerFast: Variants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.08, delayChildren: 0.05 } },
}

type AnimatedSectionProps = {
  children: ReactNode
  className?: string
  as?: ElementType
  variants?: Variants
  amount?: number
  margin?: string
  once?: boolean
} & Omit<MotionProps, "variants" | "initial" | "whileInView" | "viewport">

export const AnimatedSection = ({
  children,
  className,
  as = "div",
  variants = fadeUp,
  amount = 0.1,
  margin = "0px",
  once = true,
  ...rest
}: AnimatedSectionProps) => {
  const Tag = motion(as as any)
  return (
    <Tag
      className={className}
      initial="hidden"
      whileInView="visible"
      viewport={{ once, amount, margin: margin as any }}
      variants={variants}
      {...rest}
    >
      {children}
    </Tag>
  )
}

type AnimatedItemProps = {
  children: ReactNode
  className?: string
  as?: ElementType
  variants?: Variants
} & Omit<MotionProps, "variants" | "initial" | "animate">

export const AnimatedItem = ({
  children,
  className,
  as = "div",
  variants = fadeUp,
  ...rest
}: AnimatedItemProps) => {
  const Tag = motion(as as any)
  return (
    <Tag className={className} variants={variants} {...rest}>
      {children}
    </Tag>
  )
}

type CounterProps = {
  value: number
  duration?: number
  className?: string
  prefix?: string
  suffix?: string
}

export const Counter = ({
  value,
  duration = 1.2,
  className = "",
  prefix = "",
  suffix = "",
}: CounterProps) => {
  const ref = useRef<HTMLSpanElement | null>(null)
  const isInView = useInView(ref, { once: true, margin: "0px", amount: 0.1 })
  const motionValue = useMotionValue(0)
  const spring = useSpring(motionValue, {
    duration: duration * 1000,
    bounce: 0,
  })
  const rounded = useTransform(spring, (latest) => Math.round(latest))

  useEffect(() => {
    if (isInView) motionValue.set(value)
  }, [isInView, value, motionValue])

  useEffect(() => {
    const node = ref.current
    if (!node) return
    const unsubscribe = rounded.on("change", (latest) => {
      node.textContent = `${prefix}${latest}${suffix}`
    })
    return () => unsubscribe()
  }, [rounded, prefix, suffix])

  return (
    <span ref={ref} className={className}>
      {`${prefix}0${suffix}`}
    </span>
  )
}
