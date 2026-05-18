import type { Metadata } from "next"
import Link from "next/link"

import Nav from "@/components/layout/Nav"
import Footer from "@/components/layout/Footer"
import ObfuscatedEmail from "@/components/ui/ObfuscatedEmail"

export const metadata: Metadata = {
  title: "Mentions légales",
  description:
    "Mentions légales du site Nowakowski Web : éditeur, hébergeur, propriété intellectuelle et coordonnées.",
  robots: {
    index: false,
    follow: true,
  },
  alternates: {
    canonical: "https://nowakowski-web.fr/mentions-legales",
  },
}

const MentionsLegalesPage = () => (
  <>
    <Nav />
    <main id="main-content" className="py-12 md:py-16">
      <div className="container max-w-3xl">
        <header className="mb-10">
          <p className="mb-3 text-xs font-semibold uppercase tracking-[0.2em] text-brand">
            Informations légales
          </p>
          <h1 className="font-display text-4xl font-extrabold tracking-tight md:text-5xl">
            Mentions légales
          </h1>
          <p className="mt-4 text-base leading-relaxed text-fg-muted">
            Conformément aux dispositions des articles 6-III et 19 de la loi
            n° 2004-575 du 21 juin 2004 pour la Confiance dans l&apos;économie
            numérique, dite L.C.E.N., voici les informations relatives à
            l&apos;édition du site nowakowski-web.fr.
          </p>
        </header>

        <article className="space-y-10 text-base leading-relaxed text-fg-muted">
          <section>
            <h2 className="font-display text-2xl font-bold tracking-tight text-fg md:text-3xl">
              1. Éditeur du site
            </h2>
            <div className="mt-4 space-y-2">
              <p>
                <span className="font-semibold text-fg">Loïc Nowakowski</span>
                , exerçant sous l&apos;enseigne « Nowakowski Web ».
              </p>
              <p>
                Statut juridique :{" "}
                {/* TODO: ajouter le statut juridique (micro-entreprise, EI, SASU, etc.) */}
                <span className="italic text-fg-subtle">
                  à compléter
                </span>
                .
              </p>
              <p>
                Adresse : Stiring-Wendel, Moselle (57), France.
              </p>
              <p>
                Téléphone :{" "}
                <a
                  href="tel:+33652769372"
                  className="text-fg transition-colors hover:text-brand"
                >
                  06 52 76 93 72
                </a>
                .
              </p>
              <p>
                Email :{" "}
                <ObfuscatedEmail
                  className="text-fg transition-colors hover:text-brand"
                  label="loïc[at]nowakowski-web.fr"
                />
                .
              </p>
              <p>
                SIRET :{" "}
                {/* TODO: ajouter le numéro SIRET */}
                <span className="italic text-fg-subtle">à compléter</span>.
              </p>
              <p>
                RCS / RM :{" "}
                {/* TODO: ajouter le numéro RCS ou RM si applicable */}
                <span className="italic text-fg-subtle">
                  à compléter si applicable
                </span>
                .
              </p>
              <p>
                Numéro de TVA intracommunautaire :{" "}
                {/* TODO: ajouter le numéro de TVA ou mentionner "TVA non applicable, art. 293 B du CGI" pour micro-entrepreneur */}
                <span className="italic text-fg-subtle">à compléter</span>.
              </p>
              <p>
                Directeur de la publication : Loïc Nowakowski.
              </p>
            </div>
          </section>

          <section>
            <h2 className="font-display text-2xl font-bold tracking-tight text-fg md:text-3xl">
              2. Hébergement
            </h2>
            <div className="mt-4 space-y-4">
              <p>Site hébergé par :</p>
              <p>
                <span className="font-semibold text-fg">Vercel Inc.</span>
                <br />
                440 N Barranca Ave #4133
                <br />
                Covina, CA 91723
                <br />
                États-Unis
              </p>
              <p>
                Infrastructure utilisée : région européenne (Francfort,
                Allemagne).
              </p>
              <p>
                Site web :{" "}
                <a
                  href="https://vercel.com"
                  target="_blank"
                  rel="noreferrer noopener"
                  className="text-fg underline decoration-fg-subtle underline-offset-4 transition-colors hover:text-brand hover:decoration-brand"
                >
                  vercel.com
                </a>
                .
              </p>

              <p className="pt-2">
                Domaine et boîtes mail gérés par :
              </p>
              <p>
                <span className="font-semibold text-fg">OVH SAS</span>
                <br />
                2 rue Kellermann
                <br />
                59100 Roubaix, France
                <br />
                RCS Lille Métropole 424 761 419
              </p>

              <p className="pt-2">Service d&apos;envoi d&apos;emails :</p>
              <p>
                <span className="font-semibold text-fg">Resend Inc.</span>
                , infrastructure Union Européenne.
              </p>
            </div>
          </section>

          <section>
            <h2 className="font-display text-2xl font-bold tracking-tight text-fg md:text-3xl">
              3. Propriété intellectuelle
            </h2>
            <div className="mt-4 space-y-4">
              <p>
                L&apos;ensemble des éléments composant le site
                nowakowski-web.fr (textes, images, illustrations, logo,
                identité visuelle, code source, structure, mise en page) est
                la propriété exclusive de Loïc Nowakowski, sauf mentions
                spécifiques contraires (icônes, polices et bibliothèques
                tierces utilisées sous licence libre).
              </p>
              <p>
                Toute reproduction, représentation, modification, publication
                ou adaptation, totale ou partielle, des éléments du site,
                quel que soit le moyen ou le procédé utilisé, est interdite
                sans autorisation écrite préalable. Toute exploitation non
                autorisée du site ou de l&apos;un quelconque de ses éléments
                est susceptible d&apos;engager la responsabilité civile et
                pénale de son auteur.
              </p>
            </div>
          </section>

          <section>
            <h2 className="font-display text-2xl font-bold tracking-tight text-fg md:text-3xl">
              4. Données personnelles
            </h2>
            <div className="mt-4 space-y-4">
              <p>
                Le traitement des données personnelles collectées via le site
                (notamment via le formulaire de contact) est détaillé dans
                notre{" "}
                <Link
                  href="/politique-confidentialite"
                  className="text-fg underline decoration-fg-subtle underline-offset-4 transition-colors hover:text-brand hover:decoration-brand"
                >
                  politique de confidentialité
                </Link>
                .
              </p>
              <p>
                Conformément au Règlement Général sur la Protection des
                Données (RGPD) et à la loi Informatique et Libertés, vous
                disposez d&apos;un droit d&apos;accès, de rectification, de
                suppression, d&apos;opposition et de portabilité sur vos
                données.
              </p>
            </div>
          </section>

          <section>
            <h2 className="font-display text-2xl font-bold tracking-tight text-fg md:text-3xl">
              5. Cookies et mesure d&apos;audience
            </h2>
            <div className="mt-4 space-y-4">
              <p>
                Le site utilise{" "}
                <span className="font-semibold text-fg">Plausible Analytics</span>
                {" "}pour mesurer son audience. Plausible est un outil
                respectueux de la vie privée :{" "}
                <span className="font-semibold text-fg">
                  il ne dépose aucun cookie
                </span>
                {" "}et ne collecte aucune donnée personnelle identifiable
                (pas d&apos;adresse IP stockée, pas de fingerprinting, pas de
                suivi inter-sites).
              </p>
              <p>
                Aucun bandeau de consentement n&apos;est donc nécessaire pour
                la mesure d&apos;audience. Le site peut ponctuellement
                utiliser des cookies techniques strictement nécessaires à son
                bon fonctionnement.
              </p>
            </div>
          </section>

          <section>
            <h2 className="font-display text-2xl font-bold tracking-tight text-fg md:text-3xl">
              6. Contact
            </h2>
            <div className="mt-4 space-y-2">
              <p>
                Pour toute question relative aux présentes mentions légales,
                vous pouvez nous contacter par email à{" "}
                <ObfuscatedEmail
                  className="text-fg transition-colors hover:text-brand"
                  label="loïc[at]nowakowski-web.fr"
                />{" "}
                ou par téléphone au{" "}
                <a
                  href="tel:+33652769372"
                  className="text-fg transition-colors hover:text-brand"
                >
                  06 52 76 93 72
                </a>
                .
              </p>
            </div>
          </section>
        </article>

        <footer className="mt-16 border-t border-border pt-8">
          <p className="text-sm text-fg-subtle">
            Dernière mise à jour : mai 2026.
          </p>
        </footer>
      </div>
    </main>
    <Footer />
  </>
)

export default MentionsLegalesPage
