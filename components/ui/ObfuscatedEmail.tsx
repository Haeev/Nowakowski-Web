"use client"

import { getEmail, siteConfig } from "@/lib/site-config"

type ObfuscatedEmailProps = {
  className?: string
  label?: string
  showIcon?: boolean
}

const ObfuscatedEmail = ({
  className,
  label = siteConfig.contact.emailLabel,
  showIcon,
}: ObfuscatedEmailProps) => {
  const handleClick = () => {
    window.location.href = `mailto:${getEmail()}`
  }

  return (
    <button type="button" onClick={handleClick} className={className}>
      {showIcon && <span aria-hidden="true">→ </span>}
      {label}
    </button>
  )
}

export default ObfuscatedEmail
