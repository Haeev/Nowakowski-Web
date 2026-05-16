"use client"

import { motion } from "framer-motion"
import { ExternalLink } from "lucide-react"
import { scaleFade } from "./animations"
import type { Realisation } from "@/lib/realisations"

type RealisationCardProps = {
  realisation: Realisation
}

const RealisationCard = ({ realisation }: RealisationCardProps) => {
  const hasUrl = Boolean(realisation.url) && realisation.url !== "#"

  const Inner = (
    <motion.article
      variants={scaleFade}
      whileHover={{ scale: 1.03 }}
      transition={{ duration: 0.3 }}
      className="group block overflow-hidden rounded-2xl border border-border bg-surface transition-colors duration-300 hover:border-brand"
    >
      <div
        className="relative aspect-[3/2] min-h-[280px] overflow-hidden"
        style={{ backgroundColor: realisation.couleur }}
      >
        <div
          aria-hidden
          className="absolute inset-0 bg-gradient-to-br from-white/10 via-transparent to-black/30"
        />
        <span className="absolute inset-0 z-10 flex items-center justify-center px-6 text-center font-display text-3xl font-bold leading-tight text-white md:text-4xl">
          {realisation.title}
        </span>
        {hasUrl && (
          <div className="absolute inset-0 z-20 flex items-center justify-center gap-2 bg-black/65 opacity-0 transition-opacity duration-300 group-hover:opacity-100">
            <span className="font-medium text-white">Voir le site</span>
            <ExternalLink className="h-4 w-4 text-white" aria-hidden />
          </div>
        )}
      </div>
      <div className="p-5">
        <h3 className="font-display text-lg font-semibold leading-snug text-fg">
          {realisation.title}
        </h3>
        <p className="mt-1 text-sm text-fg-muted">
          {realisation.secteur} · {realisation.ville}
        </p>
      </div>
    </motion.article>
  )

  if (!hasUrl) return Inner

  return (
    <a
      href={realisation.url}
      target="_blank"
      rel="nofollow noopener noreferrer"
      aria-label={`Voir le site ${realisation.title} (nouvelle fenêtre)`}
      className="block focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand focus-visible:ring-offset-2 focus-visible:ring-offset-bg rounded-2xl"
    >
      {Inner}
    </a>
  )
}

export default RealisationCard
