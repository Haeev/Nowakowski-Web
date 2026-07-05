import Link from "next/link"
import { ArrowRight, MapPin } from "lucide-react"
import {
  getLocalPageBySlug,
  getLocalPagePath,
  PILLAR_SLUG,
  type LocalPage,
} from "@/lib/content/local-pages"
import {
  AnimatedSection,
  AnimatedItem,
  fadeUp,
  staggerContainer,
} from "../../ui/animations"
import SectionLabel from "../../ui/SectionLabel"
import { Container, Section, SectionHeading } from "../../ui"

type LocalCityLinksProps = {
  page: LocalPage
}

const LocalCityLinks = ({ page }: LocalCityLinksProps) => {
  const isPillar = page.type === "pillar"

  return (
    <Section>
      <Container>
        <AnimatedSection className="max-w-3xl">
          <AnimatedItem>
            <SectionLabel>
              {isPillar ? "Villes couvertes" : "Moselle-Est"}
            </SectionLabel>
          </AnimatedItem>
          <AnimatedItem variants={fadeUp}>
            <SectionHeading>
              {isPillar
                ? "Création de site internet par ville"
                : `Votre agence web en Moselle-Est`}
            </SectionHeading>
          </AnimatedItem>
          {!isPillar && page.pillarSlug && (
            <AnimatedItem variants={fadeUp}>
              <p className="mt-6 text-lg text-fg-muted">
                {page.city} fait partie de ma zone d&apos;intervention en{" "}
                <Link
                  href={getLocalPagePath(page.pillarSlug)}
                  className="font-semibold text-brand transition-colors hover:text-brand-red"
                >
                  Moselle-Est
                </Link>
                . Découvrez aussi mes pages dédiées aux autres villes de la
                région.
              </p>
            </AnimatedItem>
          )}
        </AnimatedSection>

        {isPillar && page.relatedCities && (
          <AnimatedSection
            className="mt-12 grid gap-4 sm:grid-cols-2"
            variants={staggerContainer}
          >
            {page.relatedCities.map((citySlug) => {
              const cityPage = getLocalPageBySlug(citySlug)
              if (!cityPage) return null
              return (
                <AnimatedItem key={citySlug} variants={fadeUp}>
                  <Link
                    href={getLocalPagePath(citySlug)}
                    className="group flex items-center gap-4 rounded-2xl border border-border bg-surface p-6 transition-all duration-300 hover:-translate-y-1 hover:border-brand/60"
                  >
                    <span className="flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-full bg-brand/10 text-brand">
                      <MapPin className="h-5 w-5" aria-hidden />
                    </span>
                    <span className="flex-1">
                      <span className="block font-display text-lg font-semibold group-hover:text-brand">
                        {cityPage.city}
                      </span>
                      <span className="mt-1 block text-sm text-fg-muted">
                        Création de site internet à {cityPage.city}
                      </span>
                    </span>
                    <ArrowRight
                      className="h-5 w-5 flex-shrink-0 text-fg-muted transition-transform group-hover:translate-x-1 group-hover:text-brand"
                      aria-hidden
                    />
                  </Link>
                </AnimatedItem>
              )
            })}
          </AnimatedSection>
        )}

        {!isPillar && page.pillarSlug && (
          <AnimatedSection variants={fadeUp} className="mt-8">
            <Link
              href={getLocalPagePath(page.pillarSlug)}
              className="group inline-flex items-center gap-2 font-semibold text-brand transition-colors hover:text-brand-red"
            >
              Voir toutes les villes de Moselle-Est
              <ArrowRight
                className="h-4 w-4 transition-transform group-hover:translate-x-1"
                aria-hidden
              />
            </Link>
          </AnimatedSection>
        )}

        {page.blogLinks && page.blogLinks.length > 0 && (
          <AnimatedSection variants={fadeUp} className="mt-10">
            <p className="text-sm font-semibold uppercase tracking-wider text-fg-muted">
              Pour aller plus loin
            </p>
            <ul className="mt-4 space-y-2">
              {page.blogLinks.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="inline-flex items-center gap-2 text-brand transition-colors hover:text-brand-red"
                  >
                    {link.label}
                    <ArrowRight className="h-4 w-4" aria-hidden />
                  </Link>
                </li>
              ))}
            </ul>
          </AnimatedSection>
        )}

        {!isPillar && page.relatedCities === undefined && page.pillarSlug && (
          <AnimatedSection
            className="mt-10 grid gap-3 sm:grid-cols-2"
            variants={staggerContainer}
          >
            {[PILLAR_SLUG, ...(getLocalPageBySlug(PILLAR_SLUG)?.relatedCities ?? [])]
              .filter((slug) => slug !== page.slug)
              .slice(0, 4)
              .map((slug) => {
                const linkedPage = getLocalPageBySlug(slug)
                if (!linkedPage || slug === PILLAR_SLUG) return null
                return (
                  <AnimatedItem key={slug} variants={fadeUp}>
                    <Link
                      href={getLocalPagePath(slug)}
                      className="block rounded-xl border border-border px-4 py-3 text-sm text-fg-muted transition-colors hover:border-brand/60 hover:text-brand"
                    >
                      Site internet à {linkedPage.city}
                    </Link>
                  </AnimatedItem>
                )
              })}
          </AnimatedSection>
        )}
      </Container>
    </Section>
  )
}

export default LocalCityLinks
