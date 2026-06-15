export const COOKIE_CONSENT_KEY = "nowakowski-cookie-consent"

export type CookieConsentChoice = "accepted" | "rejected"

export const getGoogleConsentInitScript = (): string => {
  const key = COOKIE_CONSENT_KEY
  return `(function(){window.dataLayer=window.dataLayer||[];function gtag(){dataLayer.push(arguments);}window.gtag=gtag;gtag('consent','default',{analytics_storage:'denied',ad_storage:'denied',ad_user_data:'denied',ad_personalization:'denied',wait_for_update:500});try{var c=localStorage.getItem("${key}");if(c==="accepted"){gtag('consent','update',{analytics_storage:'granted',ad_storage:'denied',ad_user_data:'denied',ad_personalization:'denied'})}}catch(e){}})();`
}

export const getStoredConsent = (): CookieConsentChoice | null => {
  if (typeof window === "undefined") return null
  try {
    const value = localStorage.getItem(COOKIE_CONSENT_KEY)
    if (value === "accepted" || value === "rejected") return value
    return null
  } catch {
    return null
  }
}

export const setStoredConsent = (choice: CookieConsentChoice): void => {
  try {
    localStorage.setItem(COOKIE_CONSENT_KEY, choice)
  } catch {
    // localStorage unavailable
  }
}
