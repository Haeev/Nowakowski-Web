import { siteConfig } from "./site-config"

export type VercelEnv = "production" | "preview" | "development"

export const getVercelEnv = (): VercelEnv => {
  const value = process.env.VERCEL_ENV
  if (value === "production" || value === "preview") return value
  return "development"
}

export const isProduction = (): boolean =>
  getVercelEnv() === "production"

export const isPreview = (): boolean => getVercelEnv() === "preview"

export const getSiteUrl = (): string => {
  if (process.env.NEXT_PUBLIC_SITE_URL) {
    return process.env.NEXT_PUBLIC_SITE_URL.replace(/\/$/, "")
  }
  if (isProduction()) return siteConfig.productionUrl
  if (process.env.VERCEL_URL) return `https://${process.env.VERCEL_URL}`
  return "http://localhost:3000"
}

export const getSiteUrlObject = (): URL => new URL(getSiteUrl())
