import Link from "next/link"
import { Check } from "lucide-react"
import { PRICING_PLANS } from "@/lib/content/pricing"
import {
  AnimatedSection,
  AnimatedItem,
  fadeUp,
  staggerContainer,
} from "../../ui/animations"
import SectionLabel from "../../ui/SectionLabel"
import { Button, Container, Section, SectionHeading } from "../../ui"

type LocalPricingTeaserProps = {
  city: string
}

const LocalPricingTeaser = ({ city }: LocalPricingTeaserProps) => (
  <Section id="tarifs">
    <Container>
      <AnimatedSection className="max-w-3xl">
        <AnimatedItem>
          <SectionLabel>Tarifs</SectionLabel>
        </AnimatedItem>
        <AnimatedItem variants={fadeUp}>
          <SectionHeading>
            Tarifs transparents pour {city}
          </SectionHeading>
        </AnimatedItem>
        <AnimatedItem variants={fadeUp}>
          <p className="mt-6 text-lg text-fg-muted">
            Un site vitrine, puis un abonnement pour le garder en vie. Pas de
            surprise, pas d&apos;acompte.
          </p>
        </AnimatedItem>
      </AnimatedSection>

      <AnimatedSection variants={fadeUp}>
        <div className="relative mt-12 overflow-hidden rounded-3xl border-2 border-brand/60 bg-surface p-8 shadow-brand-glow md:p-12">
          <span className="inline-flex items-center rounded-full border border-brand/40 bg-brand/10 px-3 py-1 text-xs font-semibold uppercase tracking-wider text-brand">
            Création
          </span>
          <h3 className="mt-5 font-display text-3xl font-bold tracking-tight md:text-4xl text-balance">
            Site vitrine professionnel
          </h3>
          <p className="mt-6 font-display text-4xl font-bold tracking-tight text-brand md:text-5xl">
            À partir de 1 000€
          </p>
          <p className="mt-5 max-w-2xl text-base text-fg-muted md:text-lg">
            Devis personnalisé · Livraison sous 2 semaines en moyenne ·
            Paiement à la livraison · Aucun acompte
          </p>
          <div className="mt-8 inline-block transition-transform duration-200 hover:scale-[1.03] active:scale-[0.97]">
            <Button href="#contact">Demander un devis →</Button>
          </div>
        </div>
      </AnimatedSection>

      <AnimatedSection
        className="mt-12 grid items-stretch gap-6 grid-cols-1 md:grid-cols-3"
        variants={staggerContainer}
      >
        {PRICING_PLANS.map((plan) => (
          <AnimatedItem
            key={plan.name}
            as="article"
            variants={fadeUp}
            className="flex h-full flex-col rounded-2xl border border-border bg-surface p-6"
          >
            <h3 className="font-display text-xl font-semibold">{plan.name}</h3>
            <div className="mt-3 flex items-baseline gap-1">
              <span className="font-display text-3xl font-bold tracking-tight">
                {plan.priceValue}€
              </span>
              <span className="text-sm text-fg-muted">{plan.period}</span>
            </div>
            <ul className="mt-6 flex-1 space-y-2">
              {plan.features.slice(0, 3).map((feature) => (
                <li
                  key={feature}
                  className="flex items-start gap-2 text-sm text-fg-muted"
                >
                  <Check
                    className="mt-0.5 h-4 w-4 flex-shrink-0 text-brand"
                    aria-hidden
                  />
                  <span>{feature}</span>
                </li>
              ))}
            </ul>
          </AnimatedItem>
        ))}
      </AnimatedSection>

      <AnimatedSection variants={fadeUp}>
        <p className="mt-8 text-center text-sm text-fg-muted">
          <Link
            href="/#tarifs"
            className="font-semibold text-brand transition-colors hover:text-brand-red"
          >
            Voir tous les détails des tarifs sur la page d&apos;accueil →
          </Link>
        </p>
      </AnimatedSection>
    </Container>
  </Section>
)

export default LocalPricingTeaser
