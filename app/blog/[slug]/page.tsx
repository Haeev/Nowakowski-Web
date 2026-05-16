import type { Metadata } from "next"
import Image from "next/image"
import Link from "next/link"
import Script from "next/script"
import { notFound } from "next/navigation"
import { PortableText } from "@portabletext/react"
import { ArrowLeft, ChevronRight, Clock } from "lucide-react"

import Nav from "@/components/Nav"
import Footer from "@/components/Footer"
import { portableTextComponents } from "@/components/PortableTextComponents"
import {
  getArticleBySlug,
  getArticlesSlugs,
} from "@/sanity/lib/queries"
import { urlForImage } from "@/sanity/lib/image"

export const revalidate = 60
export const dynamicParams = true

const SITE_URL = "https://nowakowski-web.fr"

type PageProps = {
  params: { slug: string }
}

export const generateStaticParams = async () => {
  const slugs = await getArticlesSlugs()
  return slugs.map((slug) => ({ slug }))
}

export const generateMetadata = async ({
  params,
}: PageProps): Promise<Metadata> => {
  const article = await getArticleBySlug(params.slug)
  if (!article) {
    return {
      title: "Article introuvable",
      robots: { index: false, follow: false },
    }
  }

  const title = article.seoTitle || article.title
  const description =
    article.seoDescription ||
    article.excerpt ||
    "Article du blog Nowakowski Web"
  const url = `${SITE_URL}/blog/${article.slug}`
  const ogImage = urlForImage(article.mainImage)
    ?.width(1200)
    .height(630)
    .fit("crop")
    .url()

  return {
    title,
    description,
    alternates: { canonical: url },
    openGraph: {
      type: "article",
      url,
      title,
      description,
      publishedTime: article.publishedAt,
      authors: ["Loïc Nowakowski"],
      images: ogImage
        ? [{ url: ogImage, width: 1200, height: 630, alt: title }]
        : undefined,
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: ogImage ? [ogImage] : undefined,
    },
  }
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

const ArticlePage = async ({ params }: PageProps) => {
  const article = await getArticleBySlug(params.slug)
  if (!article) notFound()

  const heroImage = urlForImage(article.mainImage)?.width(1600).height(900).url()
  const heroAlt = article.mainImage?.alt || article.title
  const ogImage = urlForImage(article.mainImage)
    ?.width(1200)
    .height(630)
    .fit("crop")
    .url()
  const url = `${SITE_URL}/blog/${article.slug}`
  const readingTime = article.readingTime ?? article.estimatedReadingTime

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: article.title,
    datePublished: article.publishedAt,
    dateModified: article.publishedAt,
    author: { "@type": "Person", name: "Loïc Nowakowski" },
    publisher: {
      "@type": "Organization",
      name: "Nowakowski Web",
      logo: {
        "@type": "ImageObject",
        url: `${SITE_URL}/icon.svg`,
      },
    },
    image: ogImage ? [ogImage] : undefined,
    url,
    mainEntityOfPage: { "@type": "WebPage", "@id": url },
    description: article.excerpt || article.seoDescription || "",
  }

  return (
    <>
      <Nav />
      <main>
        <article>
          <header className="relative overflow-hidden pt-12 pb-10 md:pt-16 md:pb-12">
            <div
              aria-hidden
              className="pointer-events-none absolute inset-0 -z-10"
              style={{
                background:
                  "radial-gradient(ellipse 80% 60% at 50% 0%, rgba(171, 25, 245, 0.12) 0%, transparent 70%)",
              }}
            />
            <div className="container">
              <nav
                aria-label="Fil d'Ariane"
                className="mb-6 flex flex-wrap items-center gap-1.5 text-xs text-fg-subtle"
              >
                <Link href="/" className="transition-colors hover:text-brand">
                  Accueil
                </Link>
                <ChevronRight className="h-3.5 w-3.5" aria-hidden />
                <Link href="/blog" className="transition-colors hover:text-brand">
                  Blog
                </Link>
                <ChevronRight className="h-3.5 w-3.5" aria-hidden />
                <span className="line-clamp-1 text-fg-muted">
                  {article.title}
                </span>
              </nav>

            {article.categories && article.categories.length > 0 && (
              <p className="mb-4 text-xs font-semibold uppercase tracking-[0.2em] text-brand">
                {article.categories.map(formatCategory).join(" · ")}
              </p>
            )}

              <h1 className="font-display text-4xl font-extrabold tracking-tight text-balance md:text-5xl lg:text-6xl">
                {article.title}
              </h1>

              <div className="mt-6 flex flex-wrap items-center gap-x-4 gap-y-2 text-sm text-fg-subtle">
                <time dateTime={article.publishedAt}>
                  {formatDate(article.publishedAt)}
                </time>
              {readingTime ? (
                <span className="inline-flex items-center gap-1.5">
                  <Clock className="h-4 w-4" aria-hidden />
                  {readingTime} min de lecture
                </span>
              ) : null}
                <span className="text-fg-subtle">Par Loïc Nowakowski</span>
              </div>
            </div>
          </header>

          {heroImage && (
            <div className="container">
              <div className="relative aspect-[16/9] w-full overflow-hidden rounded-2xl border border-border bg-surface">
                <Image
                  src={heroImage}
                  alt={heroAlt}
                  fill
                  priority
                  sizes="(min-width: 1280px) 1200px, 100vw"
                  className="object-cover"
                />
              </div>
            </div>
          )}

          <div className="container">
            <div className="mx-auto max-w-3xl py-12 md:py-16">
              {article.body && Array.isArray(article.body) && (
                <PortableText
                  value={article.body}
                  components={portableTextComponents}
                />
              )}

              <div className="mt-16 border-t border-border pt-8">
                <Link
                  href="/blog"
                  className="inline-flex items-center gap-2 text-sm font-semibold text-brand transition-colors hover:text-fg"
                >
                  <ArrowLeft className="h-4 w-4" aria-hidden />
                  Retour au blog
                </Link>
              </div>
            </div>
          </div>
        </article>
      </main>
      <Footer />

      <Script
        id="article-jsonld"
        type="application/ld+json"
        strategy="afterInteractive"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
    </>
  )
}

export default ArticlePage
