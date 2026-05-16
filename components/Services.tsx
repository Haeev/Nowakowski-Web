"use client"

import { motion } from "framer-motion"
import { Monitor, Server, FileText } from "lucide-react"
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
    </div>
  </section>
)

export default Services
