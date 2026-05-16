"use client"

import { useEffect, useState } from "react"
import { useTheme } from "next-themes"
import { Moon, Sun } from "lucide-react"

const ThemeToggle = () => {
  const { resolvedTheme, setTheme } = useTheme()
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  const isDark = mounted ? resolvedTheme === "dark" : true

  const handleClick = () => {
    setTheme(isDark ? "light" : "dark")
  }

  return (
    <button
      type="button"
      onClick={handleClick}
      aria-label={isDark ? "Activer le thème clair" : "Activer le thème sombre"}
      className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-border bg-surface text-fg transition-colors duration-200 hover:border-brand hover:text-brand"
    >
      {mounted ? (
        isDark ? <Sun className="h-4 w-4" aria-hidden /> : <Moon className="h-4 w-4" aria-hidden />
      ) : (
        <Sun className="h-4 w-4 opacity-0" aria-hidden />
      )}
    </button>
  )
}

export default ThemeToggle
