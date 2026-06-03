import { NextRequest, NextResponse } from "next/server"

import { runSiteAudit } from "@/lib/audit/pagespeed"
import { isValidAuditUrl, normalizeAuditUrl } from "@/lib/audit/url"
import type { AuditApiResponse } from "@/lib/audit/types"

export const runtime = "nodejs"
export const dynamic = "force-dynamic"

const noStoreHeaders = {
  "Cache-Control": "private, no-store, max-age=0, must-revalidate",
}

export async function GET(req: NextRequest) {
  const rawUrl = req.nextUrl.searchParams.get("url")?.trim() ?? ""

  if (!rawUrl) {
    const body: AuditApiResponse = {
      ok: false,
      error: "Adresse manquante.",
      code: "invalid_url",
    }
    return NextResponse.json(body, { status: 400, headers: noStoreHeaders })
  }

  if (!isValidAuditUrl(rawUrl)) {
    const body: AuditApiResponse = {
      ok: false,
      error: "Cette adresse ne ressemble pas à une URL valide.",
      code: "invalid_url",
    }
    return NextResponse.json(body, { status: 400, headers: noStoreHeaders })
  }

  const normalizedUrl = normalizeAuditUrl(rawUrl)

  try {
    const data = await runSiteAudit(normalizedUrl)

    if (!data.mobile && !data.desktop) {
      const body: AuditApiResponse = {
        ok: false,
        error: "Impossible de lancer l'analyse pour le moment. Réessayez dans un instant.",
        code: "upstream_error",
      }
      return NextResponse.json(body, { status: 502, headers: noStoreHeaders })
    }

    const body: AuditApiResponse = {
      ok: true,
      data: {
        ...data,
        url: normalizedUrl.endsWith("/")
          ? normalizedUrl
          : `${normalizedUrl}/`,
      },
    }

    return NextResponse.json(body, { headers: noStoreHeaders })
  } catch (error) {
    console.error("Audit API error:", error)

    const body: AuditApiResponse = {
      ok: false,
      error:
        error instanceof Error && error.message.includes("PAGESPEED_API_KEY")
          ? "L'outil d'audit n'est pas configuré sur ce environnement."
          : "Impossible de lancer l'analyse pour le moment. Réessayez dans un instant.",
      code:
        error instanceof Error && error.message.includes("PAGESPEED_API_KEY")
          ? "config_error"
          : "upstream_error",
    }

    return NextResponse.json(body, { status: 500, headers: noStoreHeaders })
  }
}
