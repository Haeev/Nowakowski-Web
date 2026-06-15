"use client"

import Link from "next/link"
import { useEffect, useState } from "react"

import { getStoredConsent } from "@/lib/consent"
import { applyGoogleConsent } from "@/components/consent/GoogleConsent"

const CookieBanner = () => {
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    if (getStoredConsent() === null) {
      setIsVisible(true)
    }
  }, [])

  const handleChoice = (choice: "accepted" | "rejected") => {
    applyGoogleConsent(choice)
    setIsVisible(false)
  }

  if (!isVisible) return null

  return (
    <div
      role="dialog"
      aria-labelledby="cookie-banner-title"
      aria-describedby="cookie-banner-desc"
      className="fixed inset-x-0 bottom-0 z-[150] border-t border-border bg-surface p-4 shadow-[0_-8px_32px_rgba(0,0,0,0.12)] md:p-6"
    >
      <div className="container flex max-w-4xl flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <div className="space-y-1">
          <p
            id="cookie-banner-title"
            className="font-display text-sm font-bold text-fg md:text-base"
          >
            Ce site utilise des cookies
          </p>
          <p
            id="cookie-banner-desc"
            className="text-sm leading-relaxed text-fg-muted"
          >
            Plausible mesure l&apos;audience sans cookie. Google Analytics
            dépose des cookies de mesure uniquement si vous acceptez.{" "}
            <Link
              href="/politique-confidentialite"
              className="text-fg underline decoration-fg-subtle underline-offset-4 transition-colors hover:text-brand hover:decoration-brand"
            >
              En savoir plus
            </Link>
            .
          </p>
        </div>
        <div className="flex shrink-0 flex-wrap gap-2">
          <button
            type="button"
            onClick={() => handleChoice("rejected")}
            className="inline-flex items-center justify-center rounded-full border border-border bg-bg px-5 py-2.5 text-sm font-semibold text-fg transition-colors hover:border-brand hover:text-brand focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand focus-visible:ring-offset-2 focus-visible:ring-offset-bg"
          >
            Refuser
          </button>
          <button
            type="button"
            onClick={() => handleChoice("accepted")}
            className="inline-flex items-center justify-center rounded-full bg-brand px-5 py-2.5 text-sm font-semibold text-white shadow-soft transition-shadow duration-200 hover:shadow-brand-glow focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand focus-visible:ring-offset-2 focus-visible:ring-offset-bg"
          >
            Accepter
          </button>
        </div>
      </div>
    </div>
  )
}

export default CookieBanner
