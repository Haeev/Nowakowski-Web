"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"

type LogoProps = {
  className?: string
}

const Logo = ({ className = "" }: LogoProps) => {
  const pathname = usePathname()
  const href = pathname === "/" ? "#top" : "/#top"

  return (
    <Link
      href={href}
      aria-label="Nowakowski Web, retour en haut"
      className={`group inline-flex items-center font-display font-bold tracking-tight text-lg text-fg transition-all duration-300 hover:text-brand ${className}`}
    >
      <span>Nowakowski</span>
      <span
        aria-hidden
        className="ml-0.5 text-brand transition-all duration-300 group-hover:[text-shadow:0_0_18px_rgba(171,25,245,0.7)]"
      >
        .
      </span>
    </Link>
  )
}

export default Logo
