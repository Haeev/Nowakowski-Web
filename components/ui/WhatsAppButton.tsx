import type { ReactNode } from "react"
import { cn } from "@/lib/cn"
import { getWhatsAppHref } from "@/lib/site-config"

type WhatsAppVariant = "primary" | "outline" | "icon"
type WhatsAppSize = "md" | "lg" | "block"

type WhatsAppButtonProps = {
  variant?: WhatsAppVariant
  size?: WhatsAppSize
  className?: string
  children?: ReactNode
  ariaLabel?: string
  message?: string
}

const WHATSAPP_GREEN = "#25D366"
const WHATSAPP_GREEN_HOVER = "#1ebe5d"

const baseClasses =
  "inline-flex items-center justify-center gap-2 rounded-full font-semibold transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-offset-bg"

const variantClasses: Record<WhatsAppVariant, string> = {
  primary:
    "bg-[#25D366] text-white shadow-soft hover:bg-[#1ebe5d] hover:shadow-brand-glow focus-visible:ring-[#25D366]",
  outline:
    "border-2 border-[#25D366] text-[#1ebe5d] hover:bg-[#25D366] hover:text-white focus-visible:ring-[#25D366]",
  icon:
    "h-12 w-12 bg-[#25D366] text-white shadow-soft hover:bg-[#1ebe5d] hover:shadow-brand-glow focus-visible:ring-[#25D366]",
}

const sizeClasses: Record<WhatsAppSize, string> = {
  md: "px-5 py-2.5 text-sm",
  lg: "px-7 py-3.5 text-sm",
  block: "w-full px-6 py-3.5 text-sm",
}

const WhatsAppLogo = ({ className }: { className?: string }) => (
  <svg
    aria-hidden
    viewBox="0 0 32 32"
    fill="currentColor"
    className={className}
  >
    <path d="M16.001 2.667c-7.364 0-13.333 5.97-13.333 13.333 0 2.354.616 4.65 1.787 6.674L2.667 29.333l6.844-1.785a13.27 13.27 0 0 0 6.49 1.685h.005c7.363 0 13.328-5.97 13.328-13.333S23.36 2.667 16 2.667zm0 24.226h-.004a11.07 11.07 0 0 1-5.643-1.546l-.405-.24-4.063 1.06 1.084-3.957-.264-.42a11.04 11.04 0 0 1-1.694-5.891c0-6.114 4.974-11.088 11.094-11.088 2.962 0 5.745 1.155 7.838 3.25a11.005 11.005 0 0 1 3.245 7.843c-.003 6.114-4.977 11.089-11.088 11.089zm6.078-8.305c-.333-.167-1.97-.972-2.275-1.082-.304-.111-.526-.166-.748.167s-.857 1.083-1.052 1.305c-.193.222-.387.25-.72.083-.333-.167-1.405-.518-2.677-1.654-.99-.883-1.659-1.974-1.854-2.307-.193-.333-.02-.513.146-.679.15-.149.333-.388.5-.582.166-.194.222-.333.333-.555.111-.222.055-.417-.028-.583-.083-.167-.748-1.808-1.024-2.474-.27-.65-.546-.561-.748-.572-.193-.011-.415-.013-.638-.013s-.583.083-.888.417c-.305.333-1.166 1.139-1.166 2.778s1.193 3.22 1.36 3.443c.166.222 2.349 3.585 5.69 5.025.795.343 1.415.548 1.898.701.797.253 1.523.218 2.097.132.64-.095 1.97-.806 2.249-1.585.277-.78.277-1.45.194-1.585-.083-.139-.305-.222-.638-.389z" />
  </svg>
)

const WhatsAppButton = ({
  variant = "primary",
  size = "lg",
  className,
  children = "Discuter sur WhatsApp",
  ariaLabel,
  message,
}: WhatsAppButtonProps) => {
  if (variant === "icon") {
    return (
      <a
        href={getWhatsAppHref(message)}
        target="_blank"
        rel="noopener noreferrer"
        aria-label={ariaLabel ?? "Discuter sur WhatsApp"}
        className={cn(baseClasses, variantClasses.icon, className)}
      >
        <WhatsAppLogo className="h-5 w-5" />
      </a>
    )
  }

  return (
    <a
      href={getWhatsAppHref(message)}
      target="_blank"
      rel="noopener noreferrer"
      aria-label={ariaLabel}
      className={cn(
        baseClasses,
        variantClasses[variant],
        sizeClasses[size],
        className,
      )}
    >
      <WhatsAppLogo className="h-4 w-4" />
      <span>{children}</span>
    </a>
  )
}

export default WhatsAppButton
