import type { Metadata } from "next"
import Link from "next/link"
import { ArrowRight, MapPin, Handshake, Compass, Sparkles } from "lucide-react"

import Nav from "@/components/Nav"
import Footer from "@/components/Footer"
import FloatingCallButton from "@/components/FloatingCallButton"
import SectionLabel from "@/components/SectionLabel"
import {
  AnimatedSection,
  AnimatedItem,
  fadeLeft,
  fadeUp,
  staggerContainer,
} from "@/components/animations"

export const metadata: Metadata = {
  title: "À propos : Loïc Nowakowski, créateur de sites web en Moselle",
  description:
    "Loïc Nowakowski, créateur de sites web pour les artisans et PME de Moselle et du Grand Est. Basé à Stiring-Wendel, je travaille en direct, sans intermédiaire.",
  alternates: {
    canonical: "https://nowakowski-web.fr/about",
  },
  openGraph: {
    title:
      "À propos : Loïc Nowakowski, créateur de sites web en Moselle | Nowakowski Web",
    description:
      "Loïc Nowakowski, créateur de sites web pour les artisans et PME de Moselle et du Grand Est. Basé à Stiring-Wendel, je travaille en direct, sans intermédiaire.",
    url: "https://nowakowski-web.fr/about",
    type: "profile",
  },
  twitter: {
    card: "summary_large_image",
    title:
      "À propos : Loïc Nowakowski, créateur de sites web en Moselle | Nowakowski Web",
    description:
      "Loïc Nowakowski, créateur de sites web pour les artisans et PME de Moselle et du Grand Est. Basé à Stiring-Wendel, je travaille en direct, sans intermédiaire.",
  },
}

type Value = {
  icon: typeof Compass
  title: string
  description: string
}

const VALUES: Value[] = [
  {
    icon: Compass,
    title: "Une approche directe",
    description:
      "Pas de chef de projet, pas de sous-traitance, pas de réunion à rallonge. Vous parlez à la personne qui code, design et livre votre site.",
  },
  {
    icon: Handshake,
    title: "L'honnêteté avant tout",
    description:
      "Un devis clair, des délais tenus, un prix qui ne bouge pas en cours de route. Si quelque chose ne va pas vous servir, je vous le dis.",
  },
  {
    icon: Sparkles,
    title: "Du soin sur les détails",
    description:
      "Performance, accessibilité, référencement local : ce sont les détails qui font qu'un site travaille vraiment pour vous, pas juste un site qui « fait joli ».",
  },
  {
    icon: MapPin,
    title: "Ancré localement",
    description:
      "Basé à Stiring-Wendel, je connais le tissu économique de la Moselle. Vos clients ne sont pas qu'un trafic web : ce sont vos voisins.",
  },
]

const AboutPage = () => (
  <>
    <Nav />
    <main id="main-content">
      <section className="relative overflow-hidden pt-16 pb-12 md:pt-20 md:pb-16">
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0 -z-10"
          style={{
            background:
              "radial-gradient(ellipse 80% 60% at 50% 0%, rgba(171, 25, 245, 0.16) 0%, transparent 70%)",
          }}
        />
        <div className="container">
          <AnimatedSection>
            <SectionLabel>À propos</SectionLabel>
          </AnimatedSection>
          <AnimatedSection variants={staggerContainer}>
            <AnimatedItem variants={fadeLeft}>
              <h1 className="font-display font-extrabold tracking-tight text-balance text-5xl leading-[1.1] sm:text-6xl md:text-7xl">
                Loïc Nowakowski.
                <br />
                <span className="text-gradient">
                  Le web, sans intermédiaire.
                </span>
              </h1>
            </AnimatedItem>
            <AnimatedItem variants={fadeUp}>
              <p className="mt-8 max-w-2xl text-lg leading-relaxed text-fg-muted md:text-xl">
                Je crée des sites web professionnels pour les artisans et PME
                de Moselle et du Grand Est. Pas une agence, pas une plateforme
                automatisée : une seule personne qui prend le temps de
                comprendre votre activité et la traduit en site qui travaille
                pour vous.
              </p>
            </AnimatedItem>
          </AnimatedSection>
        </div>
      </section>

      <section className="py-12 md:py-16">
        <div className="container">
          <div className="grid gap-12 lg:grid-cols-12 lg:gap-16">
            <AnimatedSection
              className="lg:col-span-7"
              variants={staggerContainer}
            >
              <AnimatedItem variants={fadeLeft}>
                <SectionLabel>Mon histoire</SectionLabel>
              </AnimatedItem>
              <AnimatedItem variants={fadeUp}>
                <h2 className="font-display text-3xl font-bold tracking-tight md:text-4xl">
                  Pourquoi Nowakowski Web existe.
                </h2>
              </AnimatedItem>
              <AnimatedItem variants={fadeUp}>
                <div className="mt-6 space-y-5 text-base leading-relaxed text-fg-muted md:text-lg">
                  <p>
                    En discutant avec des artisans autour de moi (plombiers,
                    électriciens, entreprises de nettoyage), j'ai vu le même
                    schéma se répéter : soit un site oublié sur un coin
                    d'internet, soit une promesse d'agence qui n'a jamais
                    abouti, soit une plateforme grand public qui plafonne au
                    bout de quelques mois.
                  </p>
                  <p>
                    Le problème, ce n'est pas le web. C'est la distance entre
                    celui qui code et celui qui dirige l'entreprise. Quand
                    chaque modification passe par trois intermédiaires, un
                    devis et deux semaines de délai, plus personne n'a envie
                    de faire vivre son site.
                  </p>
                  <p>
                    Nowakowski Web, c'est l'inverse : un interlocuteur unique,
                    joignable, qui livre vite et qui reste là après la
                    livraison pour faire évoluer votre site au rythme de votre
                    activité.
                  </p>
                </div>
              </AnimatedItem>
            </AnimatedSection>

            <AnimatedSection
              className="lg:col-span-5"
              variants={staggerContainer}
            >
              <AnimatedItem variants={fadeUp}>
                <div className="rounded-2xl border border-border bg-surface p-6 md:p-8">
                  <p className="text-xs font-semibold uppercase tracking-[0.2em] text-brand">
                    En bref
                  </p>
                  <dl className="mt-6 space-y-5">
                    <div>
                      <dt className="text-xs font-semibold uppercase tracking-wider text-fg-subtle">
                        Nom
                      </dt>
                      <dd className="mt-1 font-display text-lg font-semibold text-fg">
                        Loïc Nowakowski
                      </dd>
                    </div>
                    <div>
                      <dt className="text-xs font-semibold uppercase tracking-wider text-fg-subtle">
                        Localisation
                      </dt>
                      <dd className="mt-1 font-display text-lg font-semibold text-fg">
                        Stiring-Wendel, Moselle (57)
                      </dd>
                    </div>
                    <div>
                      <dt className="text-xs font-semibold uppercase tracking-wider text-fg-subtle">
                        Zone d'intervention
                      </dt>
                      <dd className="mt-1 text-fg">
                        Forbach, Sarreguemines, Metz et l'ensemble du Grand Est
                      </dd>
                    </div>
                    <div>
                      <dt className="text-xs font-semibold uppercase tracking-wider text-fg-subtle">
                        Spécialités
                      </dt>
                      <dd className="mt-1 text-fg">
                        Sites vitrine, référencement local, hébergement et
                        maintenance pour artisans et PME
                      </dd>
                    </div>
                  </dl>
                </div>
              </AnimatedItem>
            </AnimatedSection>
          </div>
        </div>
      </section>

      <section className="relative overflow-hidden py-16 md:py-20">
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0 -z-10"
          style={{
            background:
              "radial-gradient(ellipse 70% 50% at 50% 100%, rgba(171, 25, 245, 0.08) 0%, transparent 70%)",
          }}
        />
        <div className="container">
          <AnimatedSection>
            <SectionLabel>Mon approche</SectionLabel>
          </AnimatedSection>
          <AnimatedSection variants={staggerContainer}>
            <AnimatedItem variants={fadeUp}>
              <h2 className="font-display text-3xl font-bold tracking-tight md:text-4xl">
                Quatre valeurs qui guident chaque projet.
              </h2>
            </AnimatedItem>
            <AnimatedSection
              className="mt-10 grid gap-5 sm:grid-cols-2"
              variants={staggerContainer}
              as="ul"
            >
              {VALUES.map((value) => {
                const Icon = value.icon
                return (
                  <AnimatedItem
                    key={value.title}
                    as="li"
                    variants={fadeUp}
                    className="flex gap-4 rounded-2xl border border-border bg-surface p-6 transition-colors duration-300 hover:border-brand/60"
                  >
                    <div
                      className="inline-flex h-11 w-11 flex-shrink-0 items-center justify-center rounded-xl"
                      style={{
                        background:
                          "linear-gradient(135deg, rgba(171,25,245,0.22) 0%, rgba(171,25,245,0.05) 100%)",
                      }}
                    >
                      <Icon
                        className="h-5 w-5"
                        style={{ color: "#AB19F5" }}
                        aria-hidden
                      />
                    </div>
                    <div>
                      <h3 className="font-display text-lg font-semibold text-fg">
                        {value.title}
                      </h3>
                      <p className="mt-2 text-sm leading-relaxed text-fg-muted">
                        {value.description}
                      </p>
                    </div>
                  </AnimatedItem>
                )
              })}
            </AnimatedSection>
          </AnimatedSection>
        </div>
      </section>

      <section className="py-16 md:py-20">
        <div className="container">
          <AnimatedSection
            className="rounded-3xl border border-border bg-surface p-8 md:p-12"
            variants={staggerContainer}
          >
            <AnimatedItem variants={fadeUp}>
              <SectionLabel>On en discute ?</SectionLabel>
            </AnimatedItem>
            <AnimatedItem variants={fadeUp}>
              <h2 className="font-display text-3xl font-bold tracking-tight text-balance md:text-4xl">
                Un projet, une question, un simple doute ?
              </h2>
            </AnimatedItem>
            <AnimatedItem variants={fadeUp}>
              <p className="mt-4 max-w-2xl text-base leading-relaxed text-fg-muted md:text-lg">
                Le plus simple, c'est de m'en parler. Je réponds sous 24h,
                sans engagement, sans jargon.
              </p>
            </AnimatedItem>
            <AnimatedItem variants={fadeUp}>
              <div className="mt-8 flex flex-wrap items-center gap-4">
                <Link
                  href="/#contact"
                  className="inline-flex items-center gap-2 rounded-xl bg-brand px-6 py-3 text-sm font-semibold text-white transition-transform duration-300 hover:-translate-y-0.5"
                >
                  Me contacter
                  <ArrowRight className="h-4 w-4" aria-hidden />
                </Link>
                <Link
                  href="/#tarifs"
                  className="text-sm font-semibold text-brand underline-offset-4 hover:underline"
                >
                  Voir les tarifs →
                </Link>
              </div>
            </AnimatedItem>
          </AnimatedSection>
        </div>
      </section>
    </main>
    <Footer />
    <FloatingCallButton />
  </>
)

export default AboutPage
