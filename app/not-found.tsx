import Link from "next/link"
import type { Metadata } from "next"

import Nav from "@/components/layout/Nav"
import Footer from "@/components/layout/Footer"

export const metadata: Metadata = {
  title: "Page introuvable",
  robots: { index: false, follow: false },
}

const NotFound = () => (
  <>
    <Nav />
    <main
      id="main-content"
      className="flex min-h-[70vh] items-center justify-center px-6 py-16"
    >
      <div className="max-w-xl text-center">
        <p className="mb-4 text-xs font-semibold uppercase tracking-[0.2em] text-brand">
          Erreur 404
        </p>
        <h1 className="font-display text-5xl font-extrabold tracking-tight md:text-7xl">
          Cette page n&apos;existe pas.
        </h1>
        <p className="mt-6 text-lg leading-relaxed text-fg-muted">
          La page que vous cherchez a peut-être été déplacée, ou n&apos;a
          jamais existé.
        </p>
        <Link
          href="/"
          className="mt-10 inline-flex items-center justify-center rounded-full bg-brand px-8 py-4 text-sm font-semibold text-white shadow-soft transition-shadow duration-200 hover:shadow-brand-glow"
        >
          Retour à l&apos;accueil
        </Link>
      </div>
    </main>
    <Footer />
  </>
)

export default NotFound
