"use client"

import Link from "next/link"
import { motion } from "framer-motion"
import { Check } from "lucide-react"
import {
  AnimatedSection,
  AnimatedItem,
  fadeUp,
  staggerContainer,
} from "./animations"
import SectionLabel from "./SectionLabel"

type Plan = {
  name: string
  priceValue: number
  period: string
  features: string[]
  cta: string
}

const PLANS: Plan[] = [
  {
    name: "Présence",
    priceValue: 29,
    period: "/mois",
    features: [
      "Hébergement & domaine inclus",
      "Site en ligne et sécurisé",
      "1 à 2 modifications mineures par mois",
    ],
    cta: "Choisir Présence",
  },
  {
    name: "Visibilité",
    priceValue: 69,
    period: "/mois",
    features: [
      "Tout Présence inclus",
      "Modifications fréquentes (images, textes, sections)",
      "1 article SEO optimisé par mois",
      "Support prioritaire",
    ],
    cta: "Choisir Visibilité",
  },
  {
    name: "Croissance",
    priceValue: 179,
    period: "/mois",
    features: [
      "Tout Visibilité inclus",
      "4 articles ou actualités par mois",
      "Gestion contenu via WhatsApp",
      "Tarif préférentiel sur extras",
    ],
    cta: "Choisir Croissance",
  },
]

const Tarifs = () => (
  <section id="tarifs" className="py-16 md:py-20">
    <div className="container">
      <AnimatedSection className="max-w-3xl">
        <AnimatedItem>
          <SectionLabel>Tarifs</SectionLabel>
        </AnimatedItem>
        <AnimatedItem variants={fadeUp}>
          <h2 className="font-display text-4xl font-bold tracking-tight md:text-5xl lg:text-6xl text-balance">
            Tarifs création de site web : simple et transparent.
          </h2>
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
            <Link
              href="#contact"
              className="inline-flex items-center justify-center rounded-full bg-brand px-6 py-3.5 text-sm font-semibold text-white shadow-soft transition-shadow duration-200 hover:shadow-brand-glow"
            >
              Demander un devis →
            </Link>
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
        {PLANS.map((plan) => (
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
              <Link
                href="#contact"
                className="inline-flex w-full items-center justify-center rounded-full border-2 border-brand px-5 py-3 text-sm font-semibold text-brand transition-all duration-200 hover:bg-brand hover:text-white"
              >
                {plan.cta}
              </Link>
            </motion.div>
          </motion.article>
        ))}
      </AnimatedSection>

      <AnimatedSection variants={fadeUp}>
        <p className="mt-8 text-center text-sm text-fg-muted">
          En cas d'arrêt, votre domaine vous appartient et vous recevez tous les
          fichiers de votre site.
        </p>
      </AnimatedSection>
    </div>
  </section>
)

export default Tarifs
