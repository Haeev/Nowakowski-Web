export const normalizeAuditUrl = (raw: string): string => {
  const trimmed = raw.trim()
  if (trimmed === "") return ""
  if (/^https?:\/\//i.test(trimmed)) return trimmed
  return `https://${trimmed}`
}

export const isValidAuditUrl = (raw: string): boolean => {
  const normalized = normalizeAuditUrl(raw)
  if (normalized === "") return false

  try {
    const parsed = new URL(normalized)
    return (
      (parsed.protocol === "http:" || parsed.protocol === "https:") &&
      parsed.hostname.includes(".")
    )
  } catch {
    return false
  }
}

export const formatAuditUrlLabel = (url: string): string =>
  url.replace(/^https?:\/\//, "").replace(/\/$/, "")

/** Unique run id forces a fresh client fetch and remount of results. */
export const createAuditRunToken = (): string => String(Date.now())

export const buildAuditGratuitHref = (
  rawUrl: string,
  runToken: string = createAuditRunToken(),
): string => {
  const normalized = normalizeAuditUrl(rawUrl)
  return `/audit-gratuit?url=${encodeURIComponent(normalized)}&run=${encodeURIComponent(runToken)}`
}
