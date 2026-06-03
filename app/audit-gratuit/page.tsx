import type { Metadata } from "next"
import { Suspense } from "react"
import {
  Accessibility,
  Search,
  ShieldCheck,
  Zap,
  type LucideIcon,
} from "lucide-react"
import { redirect } from "next/navigation"

import AuditResults from "@/components/audit/AuditResults"
import AuditUrlForm from "@/components/audit/AuditUrlForm"
import Footer from "@/components/layout/Footer"
import Nav from "@/components/layout/Nav"
import FloatingCallButton from "@/components/ui/FloatingCallButton"
import { AUDIT_CATEGORIES } from "@/lib/audit/categories"
import type { AuditCategory } from "@/lib/audit/types"
import { isValidAuditUrl, normalizeAuditUrl } from "@/lib/audit/url"
import { siteConfig } from "@/lib/site-config"

export const dynamic = "force-dynamic"

export const metadata: Metadata = {
  title: "Audit gratuit de votre site web",
  description:
    "Analyse gratuite de votre site : performance, SEO, accessibilité et bonnes pratiques. Résultats en 30 secondes, sans inscription.",
  alternates: {
    canonical: `${siteConfig.productionUrl}/audit-gratuit`,
  },
  robots: {
    index: true,
    follow: true,
  },
}

const CATEGORY_ICONS: Record<AuditCategory, LucideIcon> = {
  performance: Zap,
  seo: Search,
  accessibility: Accessibility,
  bestPractices: ShieldCheck,
}

type AuditGratuitPageProps = {
  searchParams: {
    url?: string
    run?: string
  }
}

const AuditGratuitPage = ({ searchParams }: AuditGratuitPageProps) => {
  const rawUrl = searchParams.url?.trim() ?? ""
  const hasUrl = rawUrl !== "" && isValidAuditUrl(rawUrl)
  const normalizedUrl = hasUrl ? normalizeAuditUrl(rawUrl) : ""
  const resultsKey = `${normalizedUrl}-${searchParams.run ?? "initial"}`

  if (rawUrl !== "" && !hasUrl) {
    redirect("/audit-gratuit")
  }

  return (
    <>
      <Nav />
      <main id="main-content">
        <section className="grain-overlay border-b border-border bg-white pb-10 pt-28 dark:bg-[#0D0D0D] md:pb-14 md:pt-32">
          <div className="container">
            <div className="mx-auto max-w-3xl text-center">
              <p className="text-xs font-semibold uppercase tracking-wider text-brand">
                Audit gratuit
              </p>
              <h1 className="mt-4 font-display text-3xl font-bold tracking-tight text-fg md:text-4xl">
                Audit gratuit de votre site internet
              </h1>
              <p className="mx-auto mt-6 max-w-2xl text-lg text-fg-muted">
                Performance, référencement, accessibilité, bonnes pratiques :
                découvrez en 30 secondes ce que voient Google et vos visiteurs,
                et les premières choses à corriger.
              </p>
            </div>
          </div>
        </section>

        {!hasUrl && (
          <>
            <section className="pb-10 pt-10 md:pb-14">
              <div className="container">
                <div className="mx-auto max-w-xl">
                  <h2 className="font-display text-xl font-bold tracking-tight text-fg">
                    Lancez votre analyse
                  </h2>
                  <p className="mt-2 text-sm text-fg-muted">
                    Entrez l&apos;adresse de votre site, je m&apos;occupe du reste.
                  </p>
                  <div className="mt-5">
                    <AuditUrlForm autoFocus />
                  </div>
                </div>
              </div>
            </section>

            <section className="pb-16 md:pb-24">
              <div className="container">
                <div className="mx-auto max-w-4xl">
                  <h2 className="font-display text-2xl font-bold tracking-tight text-fg md:text-3xl">
                    Ce que l&apos;audit analyse
                  </h2>
                  <ul className="mt-8 grid gap-5 sm:grid-cols-2">
                    {AUDIT_CATEGORIES.map((category) => {
                      const Icon = CATEGORY_ICONS[category.key]

                      return (
                        <li
                          key={category.key}
                          className="flex gap-4 rounded-2xl border border-border bg-surface p-6"
                        >
                          <div
                            className="inline-flex h-11 w-11 shrink-0 items-center justify-center rounded-xl"
                            style={{
                              background:
                                "linear-gradient(135deg, rgba(171,25,245,0.22) 0%, rgba(171,25,245,0.05) 100%)",
                            }}
                          >
                            <Icon className="h-5 w-5 text-brand" aria-hidden />
                          </div>
                          <div>
                            <h3 className="font-display text-lg font-semibold text-fg">
                              {category.label}
                            </h3>
                            <p className="mt-2 text-sm leading-relaxed text-fg-muted">
                              {category.explanation}
                            </p>
                          </div>
                        </li>
                      )
                    })}
                  </ul>
                </div>
              </div>
            </section>
          </>
        )}

        {hasUrl && (
          <Suspense
            fallback={
              <div
                role="status"
                className="container py-16 text-center text-fg-muted"
              >
                Chargement de l&apos;analyse…
              </div>
            }
          >
            <AuditResults key={resultsKey} url={normalizedUrl} />
          </Suspense>
        )}
      </main>
      <Footer />
      <FloatingCallButton />
    </>
  )
}

export default AuditGratuitPage
