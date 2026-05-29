import type { Metadata } from "next"
import { Accessibility, Search, ShieldCheck, Zap } from "lucide-react"

import Nav from "@/components/layout/Nav"
import Footer from "@/components/layout/Footer"
import FloatingCallButton from "@/components/ui/FloatingCallButton"
import JsonLdScript from "@/components/seo/JsonLdScript"
import SectionLabel from "@/components/ui/SectionLabel"
import AuditUrlForm from "@/components/audit/AuditUrlForm"
import AuditReport from "@/components/audit/AuditReport"
import { buildAuditPageJsonLd } from "@/lib/audit/schema"
import { validateAuditUrl } from "@/lib/audit/url"
import { siteConfig } from "@/lib/site-config"

const PAGE_URL = `${siteConfig.productionUrl}/audit-gratuit`

const PAGE_DESCRIPTION =
  "Analysez gratuitement la performance, le référencement, l'accessibilité et les bonnes pratiques de votre site. Résultats mobile et ordinateur en 30 secondes, sans inscription."

export const metadata: Metadata = {
  title: "Audit gratuit de votre site web",
  description: PAGE_DESCRIPTION,
  alternates: {
    canonical: PAGE_URL,
  },
  openGraph: {
    title: "Audit gratuit de votre site web | Nowakowski Web",
    description: PAGE_DESCRIPTION,
    url: PAGE_URL,
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Audit gratuit de votre site web | Nowakowski Web",
    description: PAGE_DESCRIPTION,
  },
}

type AuditPageProps = {
  searchParams: { url?: string | string[] }
}

type CheckItem = {
  icon: typeof Zap
  title: string
  description: string
}

const CHECKS: CheckItem[] = [
  {
    icon: Zap,
    title: "Performance",
    description:
      "Vitesse de chargement sur mobile et ordinateur. Un site lent fait fuir vos visiteurs avant même qu'ils ne vous lisent.",
  },
  {
    icon: Search,
    title: "Référencement (SEO)",
    description:
      "Les bases techniques qui aident Google à comprendre et à afficher votre site dans ses résultats.",
  },
  {
    icon: Accessibility,
    title: "Accessibilité",
    description:
      "La capacité de votre site à être utilisé par tous, y compris les personnes en situation de handicap.",
  },
  {
    icon: ShieldCheck,
    title: "Bonnes pratiques",
    description:
      "Sécurité, fiabilité et standards du web : les signaux de confiance pour vos visiteurs et les moteurs.",
  },
]

const AuditGratuitPage = ({ searchParams }: AuditPageProps) => {
  const rawUrl = Array.isArray(searchParams.url)
    ? searchParams.url[0]
    : searchParams.url
  const validation = validateAuditUrl(rawUrl ?? null)
  const validatedUrl = validation.ok ? validation.url : null

  return (
    <>
      <JsonLdScript data={buildAuditPageJsonLd()} />
      <Nav />
      <main id="main-content">
        <section className="relative overflow-hidden pt-16 pb-10 md:pt-20 md:pb-14">
          <div
            aria-hidden
            className="pointer-events-none absolute inset-0 -z-10"
            style={{
              background:
                "radial-gradient(ellipse 80% 60% at 50% 0%, rgba(171, 25, 245, 0.16) 0%, transparent 70%)",
            }}
          />
          <div className="container">
            <SectionLabel>Audit gratuit</SectionLabel>
            <h1 className="font-display font-extrabold tracking-tight text-balance text-4xl leading-[1.1] sm:text-5xl md:text-6xl">
              Audit gratuit de votre{" "}
              <span className="text-gradient">site internet</span>
            </h1>
            <p className="mt-6 max-w-2xl text-lg leading-relaxed text-fg-muted md:text-xl">
              Performance, référencement, accessibilité, bonnes pratiques :
              découvrez en 30 secondes ce que voient Google et vos visiteurs —
              et les premières choses à corriger.
            </p>
          </div>
        </section>

        {validatedUrl ? (
          <AuditReport url={validatedUrl} />
        ) : (
          <>
            <section className="pb-12 md:pb-16">
              <div className="container">
                <div className="mx-auto max-w-2xl rounded-2xl border border-border bg-surface p-6 md:p-8">
                  <h2 className="font-display text-xl font-bold tracking-tight text-fg">
                    Lancez votre analyse
                  </h2>
                  <p className="mt-2 text-sm text-fg-muted">
                    Entrez l'adresse de votre site, je m'occupe du reste.
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
                    Ce que l'audit analyse
                  </h2>
                  <ul className="mt-8 grid gap-5 sm:grid-cols-2">
                    {CHECKS.map((check) => {
                      const Icon = check.icon
                      return (
                        <li
                          key={check.title}
                          className="flex gap-4 rounded-2xl border border-border bg-surface p-6"
                        >
                          <div
                            className="inline-flex h-11 w-11 shrink-0 items-center justify-center rounded-xl"
                            style={{
                              background:
                                "linear-gradient(135deg, rgba(171,25,245,0.22) 0%, rgba(171,25,245,0.05) 100%)",
                            }}
                          >
                            <Icon
                              className="h-5 w-5 text-brand"
                              aria-hidden
                            />
                          </div>
                          <div>
                            <h3 className="font-display text-lg font-semibold text-fg">
                              {check.title}
                            </h3>
                            <p className="mt-2 text-sm leading-relaxed text-fg-muted">
                              {check.description}
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
      </main>
      <Footer />
      <FloatingCallButton />
    </>
  )
}

export default AuditGratuitPage
