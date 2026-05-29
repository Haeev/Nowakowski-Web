import { NextRequest, NextResponse } from "next/server"
import { AuditError, runPageSpeed } from "@/lib/audit/pagespeed"
import { validateAuditUrl } from "@/lib/audit/url"
import type {
  AuditApiResponse,
  AuditResult,
  AuditStrategyResult,
} from "@/components/audit/types"

export const runtime = "nodejs"
export const dynamic = "force-dynamic"
export const maxDuration = 60

const TIMEOUT_MS = 45_000

const settledValue = (
  result: PromiseSettledResult<AuditStrategyResult>,
): AuditStrategyResult | null =>
  result.status === "fulfilled" ? result.value : null

const pickError = (
  results: PromiseSettledResult<AuditStrategyResult>[],
): AuditError => {
  for (const result of results) {
    if (result.status === "rejected" && result.reason instanceof AuditError) {
      return result.reason
    }
  }
  return new AuditError(
    "server",
    "L'analyse a échoué. Réessayez dans un instant.",
    502,
  )
}

export async function GET(req: NextRequest) {
  const validation = validateAuditUrl(req.nextUrl.searchParams.get("url"))
  if (!validation.ok) {
    const body: AuditApiResponse = {
      ok: false,
      error: validation.error,
      code: "invalid_url",
    }
    return NextResponse.json(body, { status: 400 })
  }

  const key = process.env.PAGESPEED_API_KEY
  if (!key) {
    console.error("Audit API: missing PAGESPEED_API_KEY")
    const body: AuditApiResponse = {
      ok: false,
      error: "L'outil d'audit n'est pas encore configuré. Réessayez plus tard.",
      code: "config",
    }
    return NextResponse.json(body, { status: 500 })
  }

  const controller = new AbortController()
  const timeout = setTimeout(() => controller.abort(), TIMEOUT_MS)

  try {
    const settled = await Promise.allSettled([
      runPageSpeed(validation.url, "mobile", key, controller.signal),
      runPageSpeed(validation.url, "desktop", key, controller.signal),
    ])

    const mobile = settledValue(settled[0])
    const desktop = settledValue(settled[1])

    if (!mobile && !desktop) {
      const error = pickError(settled)
      const body: AuditApiResponse = {
        ok: false,
        error: error.message,
        code: error.code,
      }
      return NextResponse.json(body, { status: error.status })
    }

    const data: AuditResult = {
      url: validation.url,
      fetchedAt: new Date().toISOString(),
      mobile,
      desktop,
    }
    const body: AuditApiResponse = { ok: true, data }
    return NextResponse.json(body)
  } catch (error) {
    console.error("Audit API error:", error)
    const body: AuditApiResponse = {
      ok: false,
      error:
        "Une erreur est survenue pendant l'analyse. Réessayez dans un instant.",
      code: "server",
    }
    return NextResponse.json(body, { status: 500 })
  } finally {
    clearTimeout(timeout)
  }
}
