"use client"

import { motion } from "framer-motion"
import { Monitor, Server, FileText, MessageCircle } from "lucide-react"
import type { LucideIcon } from "lucide-react"
import { AnimatedSection, AnimatedItem, fadeUp, staggerContainer } from "./animations"
import SectionLabel from "./SectionLabel"

type Service = {
  icon: LucideIcon
  title: string
  description: string
  detail: string
}

const SERVICES: Service[] = [
  {
    icon: Monitor,
    title: "Site vitrine professionnel",
    description:
      "Rapide, moderne, visible sur Google. Conçu pour convertir vos visiteurs en clients. Livré en 5 à 7 jours.",
    detail: "À partir de 1 200€",
  },
  {
    icon: Server,
    title: "Hébergement & maintenance",
    description:
      "Je m'occupe de tout. Votre site reste en ligne, à jour et sécurisé. Un problème ? Je suis joignable.",
    detail: "Dès 29€/mois",
  },
  {
    icon: FileText,
    title: "Contenu & référencement",
    description:
      "Articles de blog, actualités, nouvelles réalisations : je gère votre contenu pour que Google vous trouve avant vos concurrents.",
    detail: "Inclus selon formule",
  },
]

const Services = () => (
  <section
    id="services"
    className="py-16 md:py-20"
    style={{ backgroundColor: "rgb(var(--surface) / 1)" }}
  >
    <div className="container">
      <AnimatedSection className="max-w-3xl">
        <AnimatedItem>
          <SectionLabel>Services</SectionLabel>
        </AnimatedItem>
        <AnimatedItem variants={fadeUp}>
          <h2 className="font-display text-4xl font-bold tracking-tight md:text-5xl lg:text-6xl text-balance">
            Création de site web professionnel, zéro prise de tête.
          </h2>
        </AnimatedItem>
      </AnimatedSection>

      <AnimatedSection
        className="mt-12 grid gap-6 grid-cols-1 md:grid-cols-3"
        variants={staggerContainer}
      >
        {SERVICES.map((service) => {
          const Icon = service.icon
          return (
            <motion.article
              key={service.title}
              variants={fadeUp}
              whileHover={{ y: -4 }}
              transition={{ duration: 0.25 }}
              className="group h-full rounded-2xl border border-border bg-bg p-8 transition-colors duration-300 hover:border-brand"
            >
              <div
                className="mb-6 inline-flex h-12 w-12 items-center justify-center rounded-xl"
                style={{
                  background:
                    "linear-gradient(135deg, rgba(171,25,245,0.22) 0%, rgba(171,25,245,0.05) 100%)",
                }}
              >
                <Icon
                  className="h-6 w-6"
                  style={{ color: "#AB19F5" }}
                  aria-hidden
                />
              </div>
              <h3 className="font-display text-2xl font-semibold tracking-tight">
                {service.title}
              </h3>
              <p className="mt-4 leading-relaxed text-fg-muted">
                {service.description}
              </p>
              <p className="mt-8 text-sm font-semibold uppercase tracking-wider text-brand">
                {service.detail}
              </p>
            </motion.article>
          )
        })}
      </AnimatedSection>

      <AnimatedSection className="mt-10" variants={fadeUp}>
        <article
          aria-labelledby="tranquillite-heading"
          className="grid gap-6 rounded-2xl border border-brand/30 bg-brand/[0.06] p-6 md:grid-cols-[auto,1fr] md:gap-8 md:p-10"
        >
          <div
            aria-hidden
            className="flex h-14 w-14 items-center justify-center rounded-2xl bg-brand/15 md:h-16 md:w-16"
          >
            <MessageCircle
              className="h-7 w-7 md:h-8 md:w-8"
              style={{ color: "#AB19F5" }}
              aria-hidden
            />
          </div>
          <div>
            <h3
              id="tranquillite-heading"
              className="font-display text-2xl font-bold tracking-tight md:text-3xl"
            >
              Vous ne gérez rien. Jamais.
            </h3>
            <p className="mt-4 text-base leading-relaxed text-fg-muted md:text-lg">
              Pas d&apos;admin compliqué à apprendre, pas de plugin à mettre à
              jour, pas de panne à 3h du matin. Vous voulez changer une photo ?
              Ajouter un service ? Mettre à jour vos horaires ? Vous m&apos;envoyez
              un WhatsApp. C&apos;est en ligne dans la journée. Vous restez
              concentré sur votre métier — moi, je m&apos;occupe du vôtre.
            </p>
          </div>
        </article>
      </AnimatedSection>
    </div>
  </section>
)

export default Services
