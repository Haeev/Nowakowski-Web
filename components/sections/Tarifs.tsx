"use client"

import { motion } from "framer-motion"
import { Check } from "lucide-react"
import {
  AnimatedSection,
  AnimatedItem,
  fadeUp,
  staggerContainer,
} from "../ui/animations"
import SectionLabel from "../ui/SectionLabel"
import { PRICING_PLANS } from "@/lib/content/pricing"
import { Button, Container, Section, SectionHeading } from "../ui"

const Tarifs = () => (
  <Section id="tarifs">
    <Container>
      <AnimatedSection className="max-w-3xl">
        <AnimatedItem>
          <SectionLabel>Tarifs</SectionLabel>
        </AnimatedItem>
        <AnimatedItem variants={fadeUp}>
          <SectionHeading>
            Tarifs création de site web : simple et transparent.
          </SectionHeading>
        </AnimatedItem>
        <AnimatedItem variants={fadeUp}>
          <p className="mt-6 text-lg text-fg-muted">
            Commencez par un site, gardez-le vivant avec un abonnement.
          </p>
        </AnimatedItem>
      </AnimatedSection>

      <AnimatedSection variants={fadeUp}>
        <div className="relative mt-12 overflow-hidden rounded-3xl border-2 border-brand/60 bg-surface p-8 shadow-brand-glow md:p-12">
          <span className="inline-flex items-center rounded-full border border-brand/40 bg-brand/10 px-3 py-1 text-xs font-semibold uppercase tracking-wider text-brand">
            Étape 1
          </span>
          <h3 className="mt-5 font-display text-3xl font-bold tracking-tight md:text-4xl lg:text-5xl text-balance">
            Création de site vitrine
          </h3>
          <p className="mt-6 font-display text-4xl font-bold tracking-tight text-brand md:text-5xl">
            À partir de 1 200€
          </p>
          <p className="mt-5 max-w-2xl text-base text-fg-muted md:text-lg">
            Devis personnalisé · Livraison en 5 à 7 jours · 50% à la commande,
            50% à la livraison
          </p>
          <motion.div
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.97 }}
            className="mt-8 inline-block"
          >
            <Button href="#contact">Demander un devis →</Button>
          </motion.div>
        </div>
      </AnimatedSection>

      <div
        className="my-12 flex items-center md:my-16"
        role="separator"
        aria-label="Puis, maintenez votre site en vie"
      >
        <span className="h-px flex-1 bg-border" aria-hidden />
        <span className="px-4 text-sm uppercase tracking-wider text-fg-muted">
          Puis, maintenez votre site en vie
        </span>
        <span className="h-px flex-1 bg-border" aria-hidden />
      </div>

      <AnimatedSection
        className="grid items-stretch gap-6 grid-cols-1 md:grid-cols-3"
        variants={staggerContainer}
      >
        {PRICING_PLANS.map((plan) => (
          <motion.article
            key={plan.name}
            variants={fadeUp}
            whileHover={{ y: -6 }}
            transition={{ duration: 0.25 }}
            className="relative flex h-full flex-col rounded-2xl border border-border bg-surface p-8 transition-colors duration-300 hover:border-brand/60"
          >
            <h3 className="font-display text-2xl font-semibold">{plan.name}</h3>
            <div className="mt-4 flex items-baseline gap-1">
              <span className="font-display text-5xl font-bold tracking-tight">
                {plan.priceValue}€
              </span>
              <span className="text-sm font-medium text-fg-muted">
                {plan.period}
              </span>
            </div>
            <ul className="mt-8 flex-1 space-y-3">
              {plan.features.map((feature) => (
                <li
                  key={feature}
                  className="flex items-start gap-3 text-sm leading-relaxed text-fg-muted"
                >
                  <Check
                    className="mt-0.5 h-4 w-4 flex-shrink-0 text-brand"
                    aria-hidden
                  />
                  <span>{feature}</span>
                </li>
              ))}
            </ul>
            <motion.div whileTap={{ scale: 0.97 }} className="mt-8">
              <Button href="#contact" variant="outline" size="block">
                {plan.cta}
              </Button>
            </motion.div>
          </motion.article>
        ))}
      </AnimatedSection>

      <AnimatedSection variants={fadeUp}>
        <p className="mt-8 text-center text-sm text-fg-muted">
          En cas d&apos;arrêt, votre domaine vous appartient et vous recevez
          tous les fichiers de votre site.
        </p>
      </AnimatedSection>
    </Container>
  </Section>
)

export default Tarifs
