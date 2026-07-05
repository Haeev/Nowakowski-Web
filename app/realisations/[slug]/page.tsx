import type { Metadata } from "next"
import Image from "next/image"
import Link from "next/link"
import { notFound } from "next/navigation"
import { ArrowLeft, ChevronRight, ExternalLink } from "lucide-react"

import Nav from "@/components/layout/Nav"
import Footer from "@/components/layout/Footer"
import FloatingCallButton from "@/components/ui/FloatingCallButton"
import { getAllRealisations, getRealisationBySlug } from "@/lib/realisations"
import { siteConfig } from "@/lib/site-config"

type PageProps = {
  params: { slug: string }
}

export const generateStaticParams = () =>
  getAllRealisations().map((realisation) => ({ slug: realisation.slug }))

export const generateMetadata = ({ params }: PageProps): Metadata => {
  const realisation = getRealisationBySlug(params.slug)
  if (!realisation) {
    return {
      title: "Réalisation introuvable",
      robots: { index: false, follow: false },
    }
  }

  const url = `https://nowakowski-web.fr/realisations/${realisation.slug}`

  return {
    title: `${realisation.title} : étude de cas`,
    description: realisation.description,
    alternates: { canonical: url },
    openGraph: {
      title: `${realisation.title} | ${siteConfig.name}`,
      description: realisation.description,
      url,
      type: "article",
      images: realisation.screenshot
        ? [{ url: realisation.screenshot }]
        : undefined,
    },
  }
}

const formatDate = (iso: string) =>
  new Date(iso).toLocaleDateString("fr-FR", {
    day: "2-digit",
    month: "long",
    year: "numeric",
  })

const RealisationPage = ({ params }: PageProps) => {
  const realisation = getRealisationBySlug(params.slug)
  if (!realisation) notFound()

  const hasLiveUrl =
    Boolean(realisation.url) && realisation.url !== "#"
  const paragraphs = realisation.content
    .split("\n")
    .map((line) => line.trim())
    .filter(Boolean)

  return (
    <>
      <Nav />
      <main id="main-content">
        <article>
          <header className="relative overflow-hidden pt-16 pb-10 md:pt-20 md:pb-12">
            <div
              aria-hidden
              className="pointer-events-none absolute inset-0 -z-10"
              style={{
                background:
                  "radial-gradient(ellipse 80% 60% at 50% 0%, rgba(171, 25, 245, 0.12) 0%, transparent 70%)",
              }}
            />
            <div className="container">
              <nav aria-label="Fil d'Ariane" className="mb-8 text-sm text-fg-muted">
                <ol className="flex flex-wrap items-center gap-2">
                  <li>
                    <Link href="/" className="transition-colors hover:text-brand">
                      Accueil
                    </Link>
                  </li>
                  <li aria-hidden>
                    <ChevronRight className="h-4 w-4" />
                  </li>
                  <li>
                    <Link
                      href="/#realisations"
                      className="transition-colors hover:text-brand"
                    >
                      Réalisations
                    </Link>
                  </li>
                  <li aria-hidden>
                    <ChevronRight className="h-4 w-4" />
                  </li>
                  <li className="text-fg">{realisation.title}</li>
                </ol>
              </nav>

              <p className="mb-4 text-xs font-semibold uppercase tracking-[0.2em] text-brand">
                {realisation.secteur} · {realisation.ville}
              </p>
              <h1 className="font-display text-4xl font-extrabold tracking-tight text-balance md:text-5xl lg:text-6xl">
                {realisation.title}
              </h1>
              <p className="mt-6 max-w-2xl text-lg text-fg-muted">
                {realisation.description}
              </p>
              {realisation.date && (
                <p className="mt-4 text-sm text-fg-subtle">
                  Livré en {formatDate(realisation.date)}
                </p>
              )}
            </div>
          </header>

          {realisation.screenshot && (
            <div className="container">
              <div className="relative aspect-[16/9] w-full overflow-hidden rounded-2xl border border-border bg-surface">
                <Image
                  src={realisation.screenshot}
                  alt={`Aperçu du site ${realisation.title}`}
                  fill
                  priority
                  sizes="(min-width: 1280px) 1200px, 100vw"
                  className="object-cover object-top"
                />
              </div>
            </div>
          )}

          <div className="container">
            <div className="mx-auto max-w-3xl py-12 md:py-16">
              {paragraphs.length > 0 && (
                <div className="space-y-4 text-lg leading-relaxed text-fg-muted">
                  {paragraphs.map((paragraph) => (
                    <p key={paragraph}>{paragraph}</p>
                  ))}
                </div>
              )}

              <div className="mt-12 flex flex-col gap-4 sm:flex-row sm:flex-wrap">
                {hasLiveUrl && (
                  <a
                    href={realisation.url}
                    target="_blank"
                    rel="nofollow noopener noreferrer"
                    className="inline-flex items-center justify-center gap-2 rounded-full border border-border px-6 py-3 text-sm font-semibold text-fg transition-colors hover:border-brand hover:text-brand"
                  >
                    Voir le site en ligne
                    <ExternalLink className="h-4 w-4" aria-hidden />
                  </a>
                )}
                <Link
                  href="/#contact"
                  className="inline-flex items-center justify-center gap-2 rounded-full bg-brand px-6 py-3 text-sm font-semibold text-white transition-colors hover:bg-brand-red"
                >
                  Un projet similaire ?
                </Link>
              </div>

              <div className="mt-16 border-t border-border pt-8">
                <Link
                  href="/#realisations"
                  className="inline-flex items-center gap-2 text-sm font-semibold text-brand transition-colors hover:text-fg"
                >
                  <ArrowLeft className="h-4 w-4" aria-hidden />
                  Toutes les réalisations
                </Link>
              </div>
            </div>
          </div>
        </article>
      </main>
      <Footer />
      <FloatingCallButton />
    </>
  )
}

export default RealisationPage
