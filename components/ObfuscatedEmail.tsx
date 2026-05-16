"use client"

type ObfuscatedEmailProps = {
  className?: string
  label?: string
  showIcon?: boolean
}

const ObfuscatedEmail = ({
  className,
  label = "M'écrire par email",
  showIcon,
}: ObfuscatedEmailProps) => {
  const handleClick = () => {
    const email = ["loic", "@", "nowakowski-web", ".", "fr"].join("")
    window.location.href = `mailto:${email}`
  }

  return (
    <button type="button" onClick={handleClick} className={className}>
      {showIcon && <span aria-hidden="true">→ </span>}
      {label}
    </button>
  )
}

export default ObfuscatedEmail
