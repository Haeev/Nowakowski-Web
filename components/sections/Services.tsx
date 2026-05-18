"use client"

import { motion } from "framer-motion"
import { MessageCircle } from "lucide-react"
import { AnimatedSection, AnimatedItem, fadeUp, staggerContainer } from "../ui/animations"
import SectionLabel from "../ui/SectionLabel"
import { SERVICES } from "@/lib/content/services"
import { Button, Container, IconBubble, Section, SectionHeading } from "../ui"

const Services = () => (
  <Section id="services" tone="surface">
    <Container>
      <AnimatedSection className="max-w-3xl">
        <AnimatedItem>
          <SectionLabel>Services</SectionLabel>
        </AnimatedItem>
        <AnimatedItem variants={fadeUp}>
          <SectionHeading>
            Création de site web professionnel, zéro prise de tête.
          </SectionHeading>
        </AnimatedItem>
      </AnimatedSection>

      <AnimatedSection
        className="mt-12 grid gap-6 grid-cols-1 md:grid-cols-3"
        variants={staggerContainer}
      >
        {SERVICES.map((service) => (
          <motion.article
            key={service.title}
            variants={fadeUp}
            whileHover={{ y: -4 }}
            transition={{ duration: 0.25 }}
            className="group h-full rounded-2xl border border-border bg-bg p-8 transition-colors duration-300 hover:border-brand"
          >
            <IconBubble icon={service.icon} className="mb-6" />
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
        ))}
      </AnimatedSection>

      <AnimatedSection className="mt-10" variants={fadeUp}>
        <article
          aria-labelledby="tranquillite-heading"
          className="grid gap-6 rounded-2xl border border-brand/30 bg-brand/[0.06] p-6 md:grid-cols-[auto,1fr] md:gap-8 md:p-10"
        >
          <IconBubble
            icon={MessageCircle}
            size="lg"
            className="rounded-2xl bg-brand/15 from-transparent to-transparent"
          />
          <div>
            <h3
              id="tranquillite-heading"
              className="font-display text-2xl font-bold tracking-tight md:text-3xl"
            >
              Une seule personne pour tout.
            </h3>
            <p className="mt-4 text-base leading-relaxed text-fg-muted md:text-lg">
              Pas d&apos;admin compliqué à apprendre, pas de plugin à mettre à
              jour, pas de panne à 3h du matin. Vous voulez changer une photo ?
              Ajouter un service ? Mettre à jour vos horaires ? Vous
              m&apos;envoyez un WhatsApp. C&apos;est en ligne dans la journée.
              Vous restez concentré sur votre métier.
            </p>
          </div>
        </article>
      </AnimatedSection>

      <AnimatedSection variants={fadeUp} className="mt-10 text-center">
        <motion.div
          whileHover={{ scale: 1.03 }}
          whileTap={{ scale: 0.97 }}
          className="inline-block"
        >
          <Button href="#tarifs">Voir les tarifs →</Button>
        </motion.div>
      </AnimatedSection>
    </Container>
  </Section>
)

export default Services
