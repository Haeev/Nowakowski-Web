"use client"

import { motion } from "framer-motion"
import {
  AnimatedSection,
  AnimatedItem,
  fadeUp,
  fadeUpFast,
  staggerContainerFast,
} from "../ui/animations"
import SectionLabel from "../ui/SectionLabel"
import { EXTRAS } from "@/lib/content/extras"
import { Container, IconBubble, Section, SectionHeading } from "../ui"

const ALaCarte = () => (
  <Section tone="surface">
    <Container>
      <AnimatedSection className="max-w-3xl">
        <AnimatedItem>
          <SectionLabel accent="red">À la carte</SectionLabel>
        </AnimatedItem>
        <AnimatedItem variants={fadeUp}>
          <SectionHeading>Besoin de plus ?</SectionHeading>
        </AnimatedItem>
      </AnimatedSection>

      <AnimatedSection
        className="mt-12 grid gap-4 grid-cols-1 sm:grid-cols-2"
        variants={staggerContainerFast}
        amount={0.05}
        margin="0px"
      >
        {EXTRAS.map((extra) => (
          <motion.article
            key={extra.title}
            variants={fadeUpFast}
            whileHover={{ x: 4 }}
            transition={{ duration: 0.2 }}
            className="group relative flex items-center gap-5 overflow-hidden rounded-2xl border border-border bg-bg p-5 transition-colors duration-300 hover:border-brand"
          >
            <span
              aria-hidden
              className="absolute inset-y-0 left-0 w-[3px] origin-top scale-y-0 bg-brand transition-transform duration-300 group-hover:scale-y-100"
            />
            <IconBubble icon={extra.icon} size="sm" />
            <div className="flex flex-1 flex-col gap-1">
              <div className="flex flex-wrap items-baseline justify-between gap-x-4 gap-y-1">
                <h3 className="font-display text-lg font-semibold leading-snug">
                  {extra.title}
                </h3>
                <span className="text-sm font-semibold text-brand">
                  {extra.price}
                </span>
              </div>
              {extra.note && (
                <p className="text-xs italic leading-relaxed text-fg-muted">
                  {extra.note}
                </p>
              )}
            </div>
          </motion.article>
        ))}
      </AnimatedSection>

      <AnimatedSection variants={fadeUp}>
        <p className="mt-8 text-fg-muted">
          Un besoin spécifique ? Décrivez-le moi, je reviens sous 24h.
        </p>
        <p className="mt-4 text-sm italic leading-relaxed text-fg-subtle">
          Pour les sites existants non créés par Nowakowski Web, je préfère
          repartir d&apos;un nouveau site complet plutôt qu&apos;une refonte
          partielle (plus propre, plus rapide).
        </p>
      </AnimatedSection>
    </Container>
  </Section>
)

export default ALaCarte
