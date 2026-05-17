"use client"

import { motion } from "framer-motion"
import Link from "next/link"
import {
  AnimatedSection,
  AnimatedItem,
  fadeLeft,
  fadeRight,
  fadeUp,
  staggerContainer,
} from "../ui/animations"
import SectionLabel from "../ui/SectionLabel"
import { PILLARS, STATS } from "@/lib/content/pillars"
import { siteConfig } from "@/lib/site-config"
import { cn } from "@/lib/cn"
import { Container, IconBubble, Section, SectionHeading } from "../ui"

const PourquoiMoi = () => (
  <Section className="relative overflow-hidden">
    <div
      aria-hidden
      className="pointer-events-none absolute inset-0 -z-10"
      style={{
        background:
          "radial-gradient(ellipse 70% 50% at 50% 0%, rgba(171, 25, 245, 0.08) 0%, transparent 70%)",
      }}
    />
    <Container>
      <AnimatedSection>
        <SectionLabel>Pourquoi {siteConfig.name}</SectionLabel>
      </AnimatedSection>

      <div className="mt-2 grid gap-12 lg:grid-cols-12 lg:gap-16">
        <AnimatedSection
          className="lg:col-span-7"
          variants={staggerContainer}
        >
          <AnimatedItem variants={fadeLeft}>
            <SectionHeading>Local. Réactif. Honnête.</SectionHeading>
          </AnimatedItem>
          <AnimatedItem variants={fadeUp}>
            <p className="mt-8 max-w-xl text-lg leading-relaxed text-fg-muted">
              Je ne suis pas une agence : je suis une personne. Vous n&apos;êtes
              pas un dossier dans un CRM, vous parlez avec moi directement, du
              premier message à la livraison. Je suis{" "}
              {siteConfig.founder.givenName}, basé à{" "}
              {siteConfig.address.locality}.
            </p>
            <Link
              href="/about"
              className="text-brand text-sm underline mt-4 inline-block"
            >
              En savoir plus sur {siteConfig.founder.givenName} →
            </Link>
          </AnimatedItem>

          <AnimatedItem variants={fadeUp}>
            <div className="mt-10 grid grid-cols-3 gap-6 sm:gap-8">
              {STATS.map((stat) => (
                <div key={stat.label}>
                  <span
                    className={cn(
                      "block font-display text-3xl font-bold leading-none md:text-4xl",
                      stat.accent ? "text-brand" : "text-fg",
                    )}
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
          {PILLARS.map((pillar) => (
            <motion.li
              key={pillar.title}
              variants={fadeRight}
              className="mb-4 flex gap-4 rounded-xl border border-border bg-surface p-5 transition-colors duration-300 hover:border-brand"
            >
              <IconBubble icon={pillar.icon} size="sm" />
              <div>
                <h3 className="font-display text-lg font-semibold">
                  {pillar.title}
                </h3>
                <p className="mt-1 text-sm leading-relaxed text-fg-muted">
                  {pillar.description}
                </p>
              </div>
            </motion.li>
          ))}
        </AnimatedSection>
      </div>
    </Container>
  </Section>
)

export default PourquoiMoi
