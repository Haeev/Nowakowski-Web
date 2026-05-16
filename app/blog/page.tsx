import type { Metadata } from "next"
import Image from "next/image"
import Link from "next/link"
import { ArrowRight, Clock } from "lucide-react"

import Nav from "@/components/Nav"
import Footer from "@/components/Footer"
import { getAllArticles } from "@/sanity/lib/queries"
import { urlForImage } from "@/sanity/lib/image"

export const revalidate = 60

export const metadata: Metadata = {
  title: "Blog : Conseils web pour artisans",
  description:
    "Conseils, astuces et actualités sur la création de sites web pour artisans et PME en Moselle et Grand Est.",
  alternates: {
    canonical: "https://nowakowski-web.fr/blog",
  },
  openGraph: {
    title: "Blog : Conseils web pour artisans | Nowakowski Web",
    description:
      "Conseils, astuces et actualités sur la création de sites web pour artisans et PME en Moselle et Grand Est.",
    url: "https://nowakowski-web.fr/blog",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Blog : Conseils web pour artisans | Nowakowski Web",
    description:
      "Conseils, astuces et actualités sur la création de sites web pour artisans et PME en Moselle et Grand Est.",
  },
}

const formatDate = (iso: string) =>
  new Date(iso).toLocaleDateString("fr-FR", {
    day: "2-digit",
    month: "long",
    year: "numeric",
  })

const CATEGORY_LABELS: Record<string, string> = {
  "creation-site": "Création de site",
  seo: "SEO",
  "conseils-artisans": "Conseils artisans",
  actualites: "Actualités",
  temoignages: "Témoignages",
}

const formatCategory = (slug: string) => CATEGORY_LABELS[slug] ?? slug

const BlogPage = async () => {
  const articles = await getAllArticles()

  return (
    <>
      <Nav />
      <main id="main-content">
        <section className="relative overflow-hidden pt-16 pb-12 md:pt-20 md:pb-16">
          <div
            aria-hidden
            className="pointer-events-none absolute inset-0 -z-10"
            style={{
              background:
                "radial-gradient(ellipse 80% 60% at 50% 0%, rgba(171, 25, 245, 0.16) 0%, transparent 70%)",
            }}
          />
          <div className="container">
            <p className="mb-6 inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.2em] text-brand">
              <span aria-hidden className="inline-block h-px w-8 bg-brand" />
              Le blog
            </p>
            <h1 className="font-display font-extrabold tracking-tight text-balance text-5xl leading-[1.1] sm:text-6xl md:text-7xl">
              Conseils web pour
              <br />
              <span className="text-gradient">artisans et PME</span>.
            </h1>
            <p className="mt-8 max-w-2xl text-lg leading-relaxed text-fg-muted md:text-xl">
              Astuces, retours d'expérience et actualités sur la création de
              sites web professionnels pour les artisans et PME en Moselle et
              Grand Est.
            </p>
          </div>
        </section>

        <section className="py-12 md:py-16">
          <div className="container">
            {articles.length === 0 ? (
              <div className="mx-auto max-w-xl rounded-2xl border border-border bg-surface p-10 text-center">
                <p className="font-display text-2xl font-semibold text-fg">
                  Bientôt en ligne
                </p>
                <p className="mt-3 text-fg-muted">
                  Les premiers articles arrivent très prochainement. Reviens
                  dans quelques jours pour découvrir nos conseils.
                </p>
                <Link
                  href="/#contact"
                  className="mt-6 inline-flex items-center gap-2 text-sm font-semibold text-brand hover:underline"
                >
                  Une question ? Contacte-moi
                  <ArrowRight className="h-4 w-4" aria-hidden />
                </Link>
              </div>
            ) : (
              <ul className="grid gap-6 grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
              {articles.map((article) => {
                const imageUrl = urlForImage(article.mainImage)
                  ?.width(800)
                  .height(500)
                  .url()
                const alt =
                  article.mainImage?.alt || article.title || "Article"
                const readingTime =
                  article.readingTime ?? article.estimatedReadingTime
                return (
                    <li key={article._id}>
                      <Link
                        href={`/blog/${article.slug}`}
                        className="group flex h-full flex-col overflow-hidden rounded-2xl border border-border bg-surface transition-all duration-300 hover:-translate-y-1 hover:border-brand/40 hover:shadow-soft"
                      >
                        <div className="relative aspect-[16/10] w-full overflow-hidden bg-bg">
                          {imageUrl ? (
                            <Image
                              src={imageUrl}
                              alt={alt}
                              fill
                              sizes="(min-width: 1024px) 33vw, (min-width: 768px) 50vw, 100vw"
                              className="object-cover transition-transform duration-500 group-hover:scale-[1.04]"
                            />
                          ) : (
                            <div
                              aria-hidden
                              className="absolute inset-0"
                              style={{
                                background:
                                  "linear-gradient(135deg, rgba(171,25,245,0.25), rgba(245,25,52,0.18))",
                              }}
                            />
                          )}
                        </div>
                        <div className="flex flex-1 flex-col p-6">
                        {article.categories && article.categories.length > 0 && (
                          <p className="mb-3 text-xs font-semibold uppercase tracking-[0.18em] text-brand">
                            {article.categories
                              .slice(0, 2)
                              .map(formatCategory)
                              .join(" · ")}
                          </p>
                        )}
                          <h2 className="font-display text-xl font-bold leading-tight text-fg transition-colors group-hover:text-brand md:text-2xl">
                            {article.title}
                          </h2>
                          {article.excerpt && (
                            <p className="mt-3 line-clamp-3 text-sm leading-relaxed text-fg-muted">
                              {article.excerpt}
                            </p>
                          )}
                          <div className="mt-auto flex items-center gap-4 pt-6 text-xs text-fg-subtle">
                            <time dateTime={article.publishedAt}>
                              {formatDate(article.publishedAt)}
                            </time>
                          {readingTime ? (
                            <span className="inline-flex items-center gap-1.5">
                              <Clock className="h-3.5 w-3.5" aria-hidden />
                              {readingTime} min
                            </span>
                          ) : null}
                          </div>
                        </div>
                      </Link>
                    </li>
                  )
                })}
              </ul>
            )}
          </div>
        </section>
      </main>
      <Footer />
    </>
  )
}

export default BlogPage
