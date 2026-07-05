import Image from "next/image"
import Link from "next/link"
import { ArrowRight, Clock } from "lucide-react"
import { getAllArticlesSafe } from "@/sanity/lib/fetch-articles-safe"
import { urlForImage } from "@/sanity/lib/image"
import {
  AnimatedSection,
  AnimatedItem,
  fadeUp,
  staggerContainer,
} from "../ui/animations"
import SectionLabel from "../ui/SectionLabel"
import { Container, Section, SectionHeading } from "../ui"

const formatDate = (iso: string) =>
  new Date(iso).toLocaleDateString("fr-FR", {
    day: "2-digit",
    month: "long",
    year: "numeric",
  })

const BlogTeaser = async () => {
  const articles = await getAllArticlesSafe()
  const latest = articles.slice(0, 3)

  if (latest.length === 0) return null

  return (
    <Section id="blog">
      <Container>
        <AnimatedSection className="max-w-3xl">
          <AnimatedItem>
            <SectionLabel>Le blog</SectionLabel>
          </AnimatedItem>
          <AnimatedItem variants={fadeUp}>
            <SectionHeading>Derniers articles</SectionHeading>
          </AnimatedItem>
          <AnimatedItem variants={fadeUp}>
            <p className="mt-6 text-lg text-fg-muted">
              Conseils pratiques sur la création de site, le référencement et la
              visibilité en ligne pour artisans et PME.
            </p>
          </AnimatedItem>
        </AnimatedSection>

        <AnimatedSection
          className="mt-12 grid gap-6 grid-cols-1 md:grid-cols-3"
          variants={staggerContainer}
        >
          {latest.map((article) => {
            const imageUrl = urlForImage(article.mainImage)
              ?.width(800)
              .height(500)
              .url()
            const alt = article.mainImage?.alt || article.title || "Article"
            const readingTime =
              article.readingTime ?? article.estimatedReadingTime

            return (
              <AnimatedItem key={article._id} variants={fadeUp}>
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
                        sizes="(min-width: 768px) 33vw, 100vw"
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
                    <h3 className="font-display text-lg font-bold leading-tight text-fg transition-colors group-hover:text-brand">
                      {article.title}
                    </h3>
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
              </AnimatedItem>
            )
          })}
        </AnimatedSection>

        <AnimatedSection variants={fadeUp} className="mt-10">
          <Link
            href="/blog"
            className="group inline-flex items-center gap-2 font-semibold text-brand transition-colors hover:text-brand-red"
          >
            Voir tous les articles
            <ArrowRight
              className="h-4 w-4 transition-transform group-hover:translate-x-1"
              aria-hidden
            />
          </Link>
        </AnimatedSection>
      </Container>
    </Section>
  )
}

export default BlogTeaser
