import Link from "next/link"
import type {
  AnchorHTMLAttributes,
  ButtonHTMLAttributes,
  ReactNode,
} from "react"
import { cn } from "@/lib/cn"

type ButtonVariant = "primary" | "outline"
type ButtonSize = "md" | "lg" | "block"

const baseClasses =
  "inline-flex items-center justify-center gap-2 rounded-full font-semibold transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand focus-visible:ring-offset-2 focus-visible:ring-offset-bg disabled:cursor-not-allowed disabled:opacity-80"

const variantClasses: Record<ButtonVariant, string> = {
  primary:
    "bg-brand text-white shadow-soft hover:shadow-brand-glow",
  outline:
    "border-2 border-brand text-brand hover:bg-brand hover:text-white",
}

const sizeClasses: Record<ButtonSize, string> = {
  md: "px-5 py-2.5 text-sm",
  lg: "px-7 py-3.5 text-sm",
  block: "w-full px-6 py-3.5 text-sm",
}

type CommonProps = {
  variant?: ButtonVariant
  size?: ButtonSize
  className?: string
  children: ReactNode
}

type ButtonAsButton = CommonProps &
  Omit<ButtonHTMLAttributes<HTMLButtonElement>, "className" | "children"> & {
    href?: undefined
  }

type ButtonAsLink = CommonProps &
  Omit<AnchorHTMLAttributes<HTMLAnchorElement>, "className" | "children" | "href"> & {
    href: string
  }

type ButtonProps = ButtonAsButton | ButtonAsLink

const buttonClasses = ({
  variant = "primary",
  size = "lg",
  className,
}: Pick<CommonProps, "variant" | "size" | "className">) =>
  cn(baseClasses, variantClasses[variant], sizeClasses[size], className)

export const Button = (props: ButtonProps) => {
  const { variant = "primary", size = "lg", className, children } = props

  if ("href" in props && props.href !== undefined) {
    const { href, children: _children, className: _className, variant: _variant, size: _size, ...anchorProps } =
      props as ButtonAsLink
    const isExternal = /^https?:\/\//.test(href)
    if (isExternal) {
      return (
        <a
          {...anchorProps}
          href={href}
          className={buttonClasses({ variant, size, className })}
        >
          {children}
        </a>
      )
    }
    return (
      <Link
        {...anchorProps}
        href={href}
        className={buttonClasses({ variant, size, className })}
      >
        {children}
      </Link>
    )
  }

  const { children: _children, className: _className, variant: _variant, size: _size, ...buttonProps } =
    props as ButtonAsButton
  return (
    <button
      {...buttonProps}
      className={buttonClasses({ variant, size, className })}
    >
      {children}
    </button>
  )
}

export default Button
