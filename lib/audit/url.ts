export type AuditUrlValidation =
  | { ok: true; url: string }
  | { ok: false; error: string }

const MAX_URL_LENGTH = 2000

export const normalizeUrl = (raw: string): string => {
  const trimmed = raw.trim()
  if (trimmed === "") return ""
  if (!/^https?:\/\//i.test(trimmed)) return `https://${trimmed}`
  return trimmed
}

export const isLikelyUrl = (raw: string): boolean => {
  const normalized = normalizeUrl(raw)
  if (normalized === "") return false
  try {
    const parsed = new URL(normalized)
    const isHttp = parsed.protocol === "http:" || parsed.protocol === "https:"
    return isHttp && parsed.hostname.includes(".")
  } catch {
    return false
  }
}

const isPrivateHost = (host: string): boolean => {
  if (host === "localhost" || host.endsWith(".localhost")) return true
  if (host === "0.0.0.0" || host === "::1" || host === "[::1]") return true
  if (/^127\./.test(host)) return true
  if (/^10\./.test(host)) return true
  if (/^192\.168\./.test(host)) return true
  if (/^169\.254\./.test(host)) return true
  if (/^172\.(1[6-9]|2\d|3[01])\./.test(host)) return true
  return false
}

export const validateAuditUrl = (
  raw: string | null | undefined,
): AuditUrlValidation => {
  if (typeof raw !== "string" || raw.trim() === "") {
    return { ok: false, error: "Adresse manquante." }
  }
  if (raw.length > MAX_URL_LENGTH) {
    return { ok: false, error: "Adresse trop longue." }
  }

  let parsed: URL
  try {
    parsed = new URL(normalizeUrl(raw))
  } catch {
    return {
      ok: false,
      error: "Cette adresse ne ressemble pas à une URL valide.",
    }
  }

  if (parsed.protocol !== "http:" && parsed.protocol !== "https:") {
    return {
      ok: false,
      error: "Seules les adresses http et https sont prises en charge.",
    }
  }

  const host = parsed.hostname.toLowerCase()
  if (!host.includes(".")) {
    return {
      ok: false,
      error: "Cette adresse ne ressemble pas à une URL valide.",
    }
  }
  if (isPrivateHost(host)) {
    return { ok: false, error: "Cette adresse ne peut pas être analysée." }
  }

  return { ok: true, url: parsed.toString() }
}
