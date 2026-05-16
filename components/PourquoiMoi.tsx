"use client"

import { motion } from "framer-motion"
import Link from "next/link"
import { MapPin, Zap, Shield, MessageCircle } from "lucide-react"
import type { LucideIcon } from "lucide-react"
import {
  AnimatedSection,
  AnimatedItem,
  fadeLeft,
  fadeRight,
  fadeUp,
  staggerContainer,
} from "./animations"
import SectionLabel from "./SectionLabel"

type Pillar = {
  icon: LucideIcon
  title: string
  description: string
}

const PILLARS: Pillar[] = [
  {
    icon: MapPin,
    title: "Local",
    description:
      "Moselle et Grand Est. Je connais vos clients parce que je suis d'ici.",
  },
  {
    icon: Zap,
    title: "Rapide",
    description: "Site livré en 5 à 7 jours. Pas 3 mois d'attente.",
  },
  {
    icon: Shield,
    title: "Sans risque",
    description: "Vous payez en deux fois. Pas de mauvaise surprise.",
  },
  {
    icon: MessageCircle,
    title: "Joignable",
    description:
      "Un numéro, un WhatsApp. Pas un formulaire qui disparaît.",
  },
]

const STATS = [
  { value: "5-7", label: "jours de livraison" },
  { value: "1 200€", label: "à partir de", accent: true as const },
  { value: "24h", label: "temps de réponse" },
]

const PourquoiMoi = () => (
  <section className="relative overflow-hidden py-16 md:py-20">
    <div
      aria-hidden
      className="pointer-events-none absolute inset-0 -z-10"
      style={{
        background:
          "radial-gradient(ellipse 70% 50% at 50% 0%, rgba(171, 25, 245, 0.08) 0%, transparent 70%)",
      }}
    />
    <div className="container">
      <AnimatedSection>
        <SectionLabel>Pourquoi Nowakowski Web</SectionLabel>
      </AnimatedSection>

      <div className="mt-2 grid gap-12 lg:grid-cols-12 lg:gap-16">
        <AnimatedSection
          className="lg:col-span-7"
          variants={staggerContainer}
        >
          <AnimatedItem variants={fadeLeft}>
            <h2 className="font-display text-4xl font-bold tracking-tight md:text-5xl lg:text-6xl text-balance">
              Local. Réactif. Honnête.
            </h2>
          </AnimatedItem>
          <AnimatedItem variants={fadeUp}>
            <p className="mt-8 max-w-xl text-lg leading-relaxed text-fg-muted">
              Je ne suis pas une agence avec 15 intermédiaires. Je suis Loïc,
              basé à Stiring-Wendel, et je travaille directement avec vous,
              de la première conversation à la livraison.
            </p>
            <Link
              href="/about"
              className="text-brand text-sm underline mt-4 inline-block"
            >
              En savoir plus sur Loïc →
            </Link>
          </AnimatedItem>

          <AnimatedItem variants={fadeUp}>
            <div className="mt-10 grid grid-cols-3 gap-6 sm:gap-8">
              {STATS.map((stat) => (
                <div key={stat.label}>
                  <span
                    className={`block font-display text-3xl font-bold leading-none md:text-4xl ${
                      stat.accent ? "text-brand" : "text-fg"
                    }`}
                  >
                    {stat.value}
                  </span>
                  <p className="mt-2 text-sm leading-snug text-fg-muted">
                    {stat.label}
                  </p>
                </div>
              ))}
            </div>
          </AnimatedItem>
        </AnimatedSection>

        <AnimatedSection
          className="lg:col-span-5"
          variants={staggerContainer}
          as="ul"
        >
          {PILLARS.map((pillar) => {
            const Icon = pillar.icon
            return (
              <motion.li
                key={pillar.title}
                variants={fadeRight}
                className="mb-4 flex gap-4 rounded-xl border border-border bg-surface p-5 transition-colors duration-300 hover:border-brand"
              >
                <div
                  className="inline-flex h-11 w-11 flex-shrink-0 items-center justify-center rounded-xl"
                  style={{
                    background:
                      "linear-gradient(135deg, rgba(171,25,245,0.22) 0%, rgba(171,25,245,0.05) 100%)",
                  }}
                >
                  <Icon
                    className="h-5 w-5"
                    style={{ color: "#AB19F5" }}
                    aria-hidden
                  />
                </div>
                <div>
                  <h3 className="font-display text-lg font-semibold">
                    {pillar.title}
                  </h3>
                  <p className="mt-1 text-sm leading-relaxed text-fg-muted">
                    {pillar.description}
                  </p>
                </div>
              </motion.li>
            )
          })}
        </AnimatedSection>
      </div>
    </div>
  </section>
)

export default PourquoiMoi
