"use client"

import Link from "next/link"
import { motion } from "framer-motion"
import { ArrowRight } from "lucide-react"

const TRUST_BADGES = [
  "✓ Livraison en 5 à 7 jours",
  "✓ Hébergement inclus",
  "✓ Support réactif",
]

const EASE: [number, number, number, number] = [0.25, 0.1, 0.25, 1]

const lineFade = {
  hidden: { opacity: 0, y: 32 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.7, ease: EASE } },
}

const Hero = () => (
  <section
    id="top"
    className="relative overflow-hidden pt-16 pb-12 md:pt-20 md:pb-16"
  >
    <div
      aria-hidden
      className="pointer-events-none absolute inset-0 -z-10"
      style={{
        background:
          "radial-gradient(ellipse 80% 60% at 50% 0%, rgba(171, 25, 245, 0.16) 0%, transparent 70%)",
      }}
    />

    <span
      aria-hidden
      className="pointer-events-none absolute right-[-4%] top-1/2 -z-10 hidden -translate-y-1/2 select-none font-display text-[28vw] font-extrabold leading-none tracking-tighter text-fg lg:block"
      style={{ opacity: 0.04 }}
    >
      WEB
    </span>

    <div className="container">
      <motion.p
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, ease: EASE }}
        className="mb-6 inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.2em] text-brand"
      >
        <span aria-hidden className="inline-block h-px w-8 bg-brand" />
        Nowakowski Web · Stiring-Wendel, Moselle
      </motion.p>

      <h1 className="font-display font-extrabold tracking-tight text-balance text-5xl leading-[1.1] sm:text-6xl md:text-7xl lg:text-8xl lg:leading-[1.05]">
        <motion.span
          initial="hidden"
          animate="visible"
          variants={lineFade}
          transition={{ delay: 0 }}
          className="block"
        >
          Votre entreprise
        </motion.span>
        <motion.span
          initial="hidden"
          animate="visible"
          variants={lineFade}
          transition={{ delay: 0.15 }}
          className="block"
        >
          mérite un site qui
        </motion.span>
        <motion.span
          initial="hidden"
          animate="visible"
          variants={lineFade}
          transition={{ delay: 0.3 }}
          className="block"
        >
          <span className="text-gradient text-glow">travaille</span> pour vous.
        </motion.span>
      </h1>

      <motion.div
        initial={{ scaleX: 0, opacity: 0 }}
        animate={{ scaleX: 1, opacity: 1 }}
        transition={{ delay: 0.55, duration: 0.9, ease: EASE }}
        style={{ transformOrigin: "left center" }}
        className="mt-8 h-[2px] w-full max-w-md bg-gradient-brand"
        aria-hidden
      />

      <motion.p
        initial={{ opacity: 0, y: 24 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5, duration: 0.6, ease: EASE }}
        className="mt-8 max-w-2xl text-lg leading-relaxed text-fg-muted md:text-xl"
      >
        Je crée des sites web professionnels pour les artisans et PME de
        Moselle et du Grand Est. Rapide, visible sur Google, et géré de A à Z.
      </motion.p>

      <motion.div
        initial={{ opacity: 0, y: 24 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.65, duration: 0.6, ease: EASE }}
        className="mt-10 flex flex-col items-start gap-4 sm:flex-row sm:items-center"
      >
        <motion.div
          whileHover={{ scale: 1.03 }}
          whileTap={{ scale: 0.97 }}
          transition={{ duration: 0.2 }}
        >
          <Link
            href="#tarifs"
            className="inline-flex items-center justify-center rounded-full bg-brand px-7 py-3.5 text-sm font-semibold text-white shadow-soft transition-shadow duration-200 hover:shadow-brand-glow"
          >
            Voir les tarifs
          </Link>
        </motion.div>
        <Link
          href="#realisations"
          className="group inline-flex items-center gap-2 text-sm font-semibold text-fg transition-colors duration-200 hover:text-[#F51934]"
        >
          Voir les réalisations
          <ArrowRight
            className="h-4 w-4 transition-transform duration-200 group-hover:translate-x-1"
            aria-hidden
          />
        </Link>
      </motion.div>

      <motion.ul
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.8, duration: 0.6 }}
        className="mt-10 flex flex-wrap items-center gap-x-2 gap-y-2 text-sm text-fg-muted"
      >
        {TRUST_BADGES.map((badge, i) => (
          <li key={badge} className="flex items-center gap-2">
            <span>{badge}</span>
            {i < TRUST_BADGES.length - 1 && (
              <span aria-hidden className="text-fg-subtle">
                ·
              </span>
            )}
          </li>
        ))}
      </motion.ul>

    </div>

    <motion.a
      href="#services"
      aria-label="Faire défiler vers la section services"
      animate={{ y: [0, 8, 0] }}
      transition={{ repeat: Infinity, duration: 1.8, ease: "easeInOut" }}
      className="absolute bottom-6 left-1/2 hidden -translate-x-1/2 items-center gap-2 text-xs font-semibold uppercase tracking-[0.25em] text-fg-subtle transition-colors duration-200 hover:text-brand md:inline-flex"
    >
      ↓ scroll
    </motion.a>
  </section>
)

export default Hero
