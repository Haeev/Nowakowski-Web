"use client"

import {
  type CookieConsentChoice,
  setStoredConsent,
} from "@/lib/consent"

declare global {
  interface Window {
    gtag?: (...args: unknown[]) => void
  }
}

const GOOGLE_CONSENT_GRANTED = {
  analytics_storage: "granted",
  ad_storage: "denied",
  ad_user_data: "denied",
  ad_personalization: "denied",
} as const

const GOOGLE_CONSENT_DENIED = {
  analytics_storage: "denied",
  ad_storage: "denied",
  ad_user_data: "denied",
  ad_personalization: "denied",
} as const

export const applyGoogleConsent = (choice: CookieConsentChoice): void => {
  setStoredConsent(choice)

  if (typeof window.gtag !== "function") return

  window.gtag(
    "consent",
    "update",
    choice === "accepted" ? GOOGLE_CONSENT_GRANTED : GOOGLE_CONSENT_DENIED,
  )
}
