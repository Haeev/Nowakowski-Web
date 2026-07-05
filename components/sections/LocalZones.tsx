import Link from "next/link"
import { ArrowRight, MapPin } from "lucide-react"
import {
  CITY_SLUGS,
  getLocalPageBySlug,
  getLocalPagePath,
  PILLAR_SLUG,
} from "@/lib/content/local-pages"
import {
  AnimatedSection,
  AnimatedItem,
  fadeUp,
  staggerContainer,
} from "../ui/animations"
import SectionLabel from "../ui/SectionLabel"
import { Button, Container, Section, SectionHeading } from "../ui"

const LocalZones = () => {
  const pillar = getLocalPageBySlug(PILLAR_SLUG)

  return (
    <Section id="zones">
      <Container>
        <AnimatedSection className="max-w-3xl">
          <AnimatedItem>
            <SectionLabel accent="red">Zones d&apos;intervention</SectionLabel>
          </AnimatedItem>
          <AnimatedItem variants={fadeUp}>
            <SectionHeading>
              Création de site internet en Moselle-Est
            </SectionHeading>
          </AnimatedItem>
          <AnimatedItem variants={fadeUp}>
            <p className="mt-6 text-lg text-fg-muted">
              Pages dédiées par ville pour les artisans et PME de la région :
              contenu local, tarifs transparents et devis gratuit sous 24h.
            </p>
          </AnimatedItem>
        </AnimatedSection>

        <AnimatedSection
          className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-3"
          variants={staggerContainer}
        >
          {CITY_SLUGS.map((slug) => {
            const cityPage = getLocalPageBySlug(slug)
            if (!cityPage) return null
            return (
              <AnimatedItem key={slug} variants={fadeUp}>
                <Link
                  href={getLocalPagePath(slug)}
                  className="group flex h-full items-center gap-4 rounded-2xl border border-border bg-surface p-6 transition-all duration-300 hover:-translate-y-1 hover:border-brand/60"
                >
                  <span className="flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-full bg-brand/10 text-brand">
                    <MapPin className="h-5 w-5" aria-hidden />
                  </span>
                  <span className="flex-1">
                    <span className="block font-display text-lg font-semibold group-hover:text-brand">
                      {cityPage.city}
                    </span>
                    <span className="mt-1 block text-sm text-fg-muted">
                      Site internet à {cityPage.city}
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

        {pillar && (
          <AnimatedSection variants={fadeUp} className="mt-10 flex flex-col items-start gap-4 sm:flex-row sm:items-center">
            <Button href={getLocalPagePath(PILLAR_SLUG)}>
              Voir Moselle-Est
            </Button>
            <Link
              href={getLocalPagePath(PILLAR_SLUG)}
              className="group inline-flex items-center gap-2 text-sm font-semibold text-brand transition-colors hover:text-brand-red"
            >
              Toutes les villes couvertes
              <ArrowRight
                className="h-4 w-4 transition-transform group-hover:translate-x-1"
                aria-hidden
              />
            </Link>
          </AnimatedSection>
        )}
      </Container>
    </Section>
  )
}

export default LocalZones
