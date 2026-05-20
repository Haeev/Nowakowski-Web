"use client"

import { useEffect, useState } from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import Logo from "../ui/Logo"
import ThemeToggle from "../ui/ThemeToggle"
import { NAV_LINKS } from "@/lib/content/navigation"
import { cn } from "@/lib/cn"
import { Button } from "../ui"

const Nav = () => {
  const pathname = usePathname()
  const isBlogPath = pathname?.startsWith("/blog") ?? false
  const [mobileOpen, setMobileOpen] = useState(false)
  const [activeId, setActiveId] = useState<string>("")
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50)
    handleScroll()
    window.addEventListener("scroll", handleScroll, { passive: true })
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  useEffect(() => {
    if (isBlogPath) {
      setActiveId("blog")
      return
    }
    const sections = NAV_LINKS.filter((link) => !link.external)
      .map((link) => document.getElementById(link.id))
      .filter((el): el is HTMLElement => el !== null)
    if (sections.length === 0) return

    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((entry) => entry.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0]
        if (visible) setActiveId(visible.target.id)
      },
      { rootMargin: "-40% 0px -45% 0px", threshold: [0, 0.25, 0.5, 0.75, 1] },
    )

    sections.forEach((section) => observer.observe(section))
    return () => observer.disconnect()
  }, [isBlogPath])

  useEffect(() => {
    if (mobileOpen) {
      document.body.style.overflow = "hidden"
    } else {
      document.body.style.overflow = ""
    }
    return () => {
      document.body.style.overflow = ""
    }
  }, [mobileOpen])

  const handleClose = () => setMobileOpen(false)

  return (
    <header
      className="sticky top-0 z-50 transition-colors duration-300"
      style={{
        backgroundColor: scrolled
          ? "rgb(var(--bg) / 0.85)"
          : "transparent",
        backdropFilter: scrolled ? "blur(12px)" : "none",
        WebkitBackdropFilter: scrolled ? "blur(12px)" : "none",
        borderBottom: scrolled
          ? "1px solid rgba(171, 25, 245, 0.2)"
          : "1px solid transparent",
      }}
    >
      <div className="container flex h-[72px] items-center justify-between gap-6">
        <Logo />

        <nav aria-label="Navigation principale" className="hidden md:block">
          <ul className="flex items-center gap-1 rounded-full border border-border bg-surface/70 p-1 backdrop-blur">
            {NAV_LINKS.map((link) => {
              const isActive = activeId === link.id
              return (
                <li key={link.id} className="flex items-center">
                  {link.external && (
                    <span
                      aria-hidden
                      className="mx-1 h-4 w-px bg-border"
                    />
                  )}
                  <Link
                    href={link.href}
                    className={cn(
                      "group relative inline-flex items-center rounded-full px-4 py-2 text-sm font-medium transition-colors duration-200",
                      isActive
                        ? "bg-brand text-white"
                        : link.external
                          ? "text-fg-muted hover:text-fg"
                          : "text-fg-muted hover:text-fg",
                    )}
                    aria-current={isActive ? "page" : undefined}
                  >
                    {link.label}
                    {!isActive && (
                      <span
                        aria-hidden
                        className="absolute bottom-1 left-4 right-4 h-px origin-left scale-x-0 bg-brand transition-transform duration-300 group-hover:scale-x-100"
                      />
                    )}
                  </Link>
                </li>
              )
            })}
          </ul>
        </nav>

        <div className="hidden md:flex items-center gap-3">
          <ThemeToggle />
          <div className="transition-transform duration-200 hover:scale-[1.03] active:scale-[0.97]">
            <Button href="/#contact" size="md">
              Demander un devis
            </Button>
          </div>
        </div>

        <div className="flex md:hidden items-center gap-2">
          <ThemeToggle />
          <button
            type="button"
            aria-label={mobileOpen ? "Fermer le menu" : "Ouvrir le menu"}
            aria-expanded={mobileOpen}
            onClick={() => setMobileOpen((open) => !open)}
            className="relative inline-flex h-10 w-10 items-center justify-center rounded-full border border-border bg-surface text-fg transition-colors hover:border-brand hover:text-brand"
          >
            <span className="sr-only">Menu</span>
            <span
              className="absolute block h-[2px] w-5 origin-center bg-current transition-transform duration-300"
              style={{
                transform: mobileOpen
                  ? "translateY(0) rotate(45deg)"
                  : "translateY(-5px) rotate(0)",
              }}
            />
            <span
              className="absolute block h-[2px] w-5 bg-current transition-opacity duration-200"
              style={{ opacity: mobileOpen ? 0 : 1 }}
            />
            <span
              className="absolute block h-[2px] w-5 origin-center bg-current transition-transform duration-300"
              style={{
                transform: mobileOpen
                  ? "translateY(0) rotate(-45deg)"
                  : "translateY(5px) rotate(0)",
              }}
            />
          </button>
        </div>
      </div>

      <div
        className={cn(
          "fixed inset-0 z-50 md:hidden",
          mobileOpen ? "visible" : "invisible pointer-events-none",
        )}
        aria-hidden={!mobileOpen}
      >
        <button
          type="button"
          aria-label="Fermer le menu"
          onClick={handleClose}
          tabIndex={mobileOpen ? 0 : -1}
          className={cn(
            "absolute inset-0 bg-black/60 backdrop-blur-sm transition-opacity duration-200",
            mobileOpen ? "opacity-100" : "opacity-0",
          )}
        />
        <aside
          role="dialog"
          aria-modal="true"
          aria-label="Menu mobile"
          className={cn(
            "absolute right-0 top-0 h-full w-[85%] max-w-sm border-l border-border bg-bg p-6 shadow-xl transition-transform duration-300 ease-[cubic-bezier(0.25,0.1,0.25,1)]",
            mobileOpen ? "translate-x-0" : "translate-x-full",
          )}
        >
          <div className="flex items-center justify-between mb-8">
            <Logo />
          </div>
          <ul className="flex flex-col gap-2">
            {NAV_LINKS.map((link) => (
              <li
                key={link.id}
                className={
                  link.external ? "mt-2 border-t border-border pt-2" : ""
                }
              >
                <Link
                  href={link.href}
                  onClick={handleClose}
                  tabIndex={mobileOpen ? 0 : -1}
                  className={cn(
                    "block rounded-xl px-4 py-3 font-display text-2xl font-semibold transition-colors hover:text-brand",
                    link.external ? "text-fg-muted" : "text-fg",
                  )}
                >
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
          <div className="mt-8">
            <Button href="/#contact" size="block" onClick={handleClose}>
              Demander un devis
            </Button>
          </div>
        </aside>
      </div>
    </header>
  )
}

export default Nav
