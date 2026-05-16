"use client"

import { useEffect } from "react"
import Link from "next/link"

type ErrorProps = {
  error: Error & { digest?: string }
  reset: () => void
}

const ErrorPage = ({ error, reset }: ErrorProps) => {
  useEffect(() => {
    console.error(error)
  }, [error])

  return (
    <main
      id="main-content"
      className="flex min-h-[70vh] items-center justify-center px-6 py-16"
    >
      <div className="max-w-xl text-center">
        <p className="mb-4 text-xs font-semibold uppercase tracking-[0.2em] text-[#F51934]">
          Une erreur s&apos;est produite
        </p>
        <h1 className="font-display text-5xl font-extrabold tracking-tight md:text-7xl">
          Désolé, quelque chose s&apos;est mal passé.
        </h1>
        <p className="mt-6 text-lg leading-relaxed text-fg-muted">
          Si le problème persiste, contactez-moi directement à
          {" "}
          <a
            href="mailto:loic@nowakowski-web.fr"
            className="text-fg underline decoration-fg-subtle underline-offset-4 transition-colors hover:text-brand hover:decoration-brand"
          >
            loic@nowakowski-web.fr
          </a>
          .
        </p>
        <div className="mt-10 flex flex-wrap items-center justify-center gap-4">
          <button
            type="button"
            onClick={reset}
            className="inline-flex items-center justify-center rounded-full bg-brand px-8 py-4 text-sm font-semibold text-white shadow-soft transition-shadow duration-200 hover:shadow-brand-glow"
          >
            Réessayer
          </button>
          <Link
            href="/"
            className="inline-flex items-center justify-center rounded-full border border-border px-8 py-4 text-sm font-semibold text-fg transition-colors duration-200 hover:bg-surface"
          >
            Accueil
          </Link>
        </div>
      </div>
    </main>
  )
}

export default ErrorPage
