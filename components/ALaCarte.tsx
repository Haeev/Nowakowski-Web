"use client"

import { motion } from "framer-motion"
import { FileText, Plus, RefreshCw, MapPin } from "lucide-react"
import type { LucideIcon } from "lucide-react"
import {
  AnimatedSection,
  AnimatedItem,
  fadeUp,
  fadeUpFast,
  staggerContainerFast,
} from "./animations"
import SectionLabel from "./SectionLabel"

type Extra = {
  icon: LucideIcon
  title: string
  price: string
}

const EXTRAS: Extra[] = [
  { icon: FileText, title: "Article SEO supplémentaire", price: "90€ / article" },
  { icon: Plus, title: "Ajout de page", price: "Sur devis réduit" },
  { icon: RefreshCw, title: "Refonte partielle", price: "Sur devis réduit" },
  { icon: MapPin, title: "Google Business Profile", price: "Sur devis" },
]

const ALaCarte = () => (
  <section
    className="py-16 md:py-20"
    style={{ backgroundColor: "rgb(var(--surface) / 1)" }}
  >
    <div className="container">
      <AnimatedSection className="max-w-3xl">
        <AnimatedItem>
          <SectionLabel accent="red">À la carte</SectionLabel>
        </AnimatedItem>
        <AnimatedItem variants={fadeUp}>
          <h2 className="font-display text-4xl font-bold tracking-tight md:text-5xl lg:text-6xl text-balance">
            Besoin de plus ?
          </h2>
        </AnimatedItem>
      </AnimatedSection>

      <AnimatedSection
        className="mt-12 grid gap-4 grid-cols-1 sm:grid-cols-2"
        variants={staggerContainerFast}
        amount={0.05}
        margin="0px"
      >
        {EXTRAS.map((extra) => {
          const Icon = extra.icon
          return (
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
              <div
                className="inline-flex h-11 w-11 flex-shrink-0 items-center justify-center rounded-xl"
                style={{
                  background:
                    "linear-gradient(135deg, rgba(171,25,245,0.2) 0%, rgba(171,25,245,0.05) 100%)",
                }}
              >
                <Icon
                  className="h-5 w-5"
                  style={{ color: "#AB19F5" }}
                  aria-hidden
                />
              </div>
              <div className="flex flex-1 items-center justify-between gap-4">
                <h3 className="font-display text-lg font-semibold leading-snug">
                  {extra.title}
                </h3>
                <span className="whitespace-nowrap text-sm font-semibold text-brand">
                  {extra.price}
                </span>
              </div>
            </motion.article>
          )
        })}
      </AnimatedSection>

      <AnimatedSection variants={fadeUp}>
        <p className="mt-8 text-fg-muted">
          Un besoin spécifique ? Décrivez-le moi, je reviens sous 24h.
        </p>
      </AnimatedSection>
    </div>
  </section>
)

export default ALaCarte
