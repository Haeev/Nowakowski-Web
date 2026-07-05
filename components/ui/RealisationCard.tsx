"use client"

import Image from "next/image"
import Link from "next/link"
import { useState } from "react"
import { ArrowRight, ExternalLink } from "lucide-react"
import type { Realisation } from "@/lib/realisations"

type RealisationCardProps = {
  realisation: Realisation
}

const getMicrolicnkUrl = (url: string) =>
  `https://api.microlink.io/?url=${encodeURIComponent(url)}&screenshot=true&meta=false&embed=screenshot.url`

const RealisationCard = ({ realisation }: RealisationCardProps) => {
  const [imgError, setImgError] = useState(false)

  const hasUrl = Boolean(realisation.url) && realisation.url !== "#"

  const staticScreenshot = realisation.screenshot ?? null
  const fallbackScreenshot = hasUrl ? getMicrolicnkUrl(realisation.url) : null
  const screenshotUrl = staticScreenshot ?? fallbackScreenshot
  const isStatic = Boolean(staticScreenshot)
  const showScreenshot = Boolean(screenshotUrl) && !imgError

  const Preview = (
    <div className="relative aspect-[3/2] min-h-[280px] overflow-hidden">
      {showScreenshot ? (
        <>
          <Image
            src={screenshotUrl!}
            alt={`Aperçu du site ${realisation.title}`}
            fill
            unoptimized={!isStatic}
            className="object-cover object-top transition-transform duration-500 ease-out group-hover:scale-105"
            onError={() => setImgError(true)}
          />
          <div aria-hidden className="absolute inset-0 bg-black/20" />
        </>
      ) : (
        <div
          className="absolute inset-0"
          style={{ backgroundColor: realisation.couleur }}
        >
          <div
            aria-hidden
            className="absolute inset-0 bg-gradient-to-br from-white/10 via-transparent to-black/30"
          />
          <span className="absolute inset-0 z-10 flex items-center justify-center px-6 text-center font-display text-3xl font-bold leading-tight text-white md:text-4xl">
            {realisation.title}
          </span>
        </div>
      )}

      <div className="absolute inset-0 z-20 flex items-center justify-center gap-2 bg-black/65 opacity-0 transition-opacity duration-300 group-hover:opacity-100">
        <span className="font-medium text-white">Voir l&apos;étude de cas</span>
        <ArrowRight className="h-4 w-4 text-white" aria-hidden />
      </div>
    </div>
  )

  return (
    <article className="group overflow-hidden rounded-2xl border border-border bg-surface transition-all duration-300 hover:scale-[1.03] hover:border-brand">
      <Link
        href={`/realisations/${realisation.slug}`}
        className="block rounded-t-2xl focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand focus-visible:ring-offset-2 focus-visible:ring-offset-bg"
        aria-label={`Étude de cas ${realisation.title}`}
      >
        {Preview}
      </Link>

      <div className="p-5">
        <Link
          href={`/realisations/${realisation.slug}`}
          className="block focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand"
        >
          <h3 className="font-display text-lg font-semibold leading-snug text-fg transition-colors group-hover:text-brand">
            {realisation.title}
          </h3>
          <p className="mt-1 text-sm text-fg-muted">
            {realisation.secteur} · {realisation.ville}
          </p>
        </Link>

        {hasUrl && (
          <a
            href={realisation.url}
            target="_blank"
            rel="nofollow noopener noreferrer"
            className="mt-4 inline-flex items-center gap-1.5 text-sm font-semibold text-brand transition-colors hover:text-brand-red"
            aria-label={`Voir le site ${realisation.title} (nouvelle fenêtre)`}
          >
            Site en ligne
            <ExternalLink className="h-3.5 w-3.5" aria-hidden />
          </a>
        )}
      </div>
    </article>
  )
}

export default RealisationCard
