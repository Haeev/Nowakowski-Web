import type { Metadata } from "next"

import Nav from "@/components/layout/Nav"
import Footer from "@/components/layout/Footer"

export const metadata: Metadata = {
  title: "Déclaration d'accessibilité",
  description:
    "Déclaration d'accessibilité du site Nowakowski Web : engagement, conformité RGAA, technologies utilisées et voies de recours.",
  robots: { index: true, follow: true },
  alternates: {
    canonical: "https://nowakowski-web.fr/accessibilite",
  },
}

const declarationDate = new Date().toLocaleDateString("fr-FR", {
  year: "numeric",
  month: "long",
})

const AccessibilitePage = () => (
  <>
    <Nav />
    <main id="main-content" className="py-12 md:py-16">
      <div className="container max-w-3xl">
        <header className="mb-10">
          <p className="mb-3 text-xs font-semibold uppercase tracking-[0.2em] text-brand">
            Accessibilité
          </p>
          <h1 className="font-display text-4xl font-extrabold tracking-tight md:text-5xl">
            Déclaration d&apos;accessibilité
          </h1>
        </header>

        <article className="space-y-10 text-base leading-relaxed text-fg-muted">
          <section>
            <h2 className="font-display text-2xl font-bold tracking-tight text-fg md:text-3xl">
              Engagement
            </h2>
            <p className="mt-4">
              Nowakowski Web s&apos;engage à rendre son site internet
              accessible conformément à l&apos;article 47 de la loi n°
              2005-102 du 11 février 2005.
            </p>
          </section>

          <section>
            <h2 className="font-display text-2xl font-bold tracking-tight text-fg md:text-3xl">
              État de conformité
            </h2>
            <p className="mt-4">
              Le site nowakowski-web.fr est en{" "}
              <strong className="text-fg">conformité partielle</strong> avec
              le Référentiel Général d&apos;Amélioration de l&apos;Accessibilité
              (RGAA) version 4.1. Un audit complet est en cours.
            </p>
          </section>

          <section>
            <h2 className="font-display text-2xl font-bold tracking-tight text-fg md:text-3xl">
              Technologies utilisées
            </h2>
            <ul className="mt-4 ml-6 list-disc space-y-2">
              <li>HTML5</li>
              <li>CSS3</li>
              <li>JavaScript (Next.js / React)</li>
            </ul>
          </section>

          <section>
            <h2 className="font-display text-2xl font-bold tracking-tight text-fg md:text-3xl">
              Outils utilisés pour évaluer l&apos;accessibilité
            </h2>
            <ul className="mt-4 ml-6 list-disc space-y-2">
              <li>WAVE (Web Accessibility Evaluation Tool)</li>
              <li>Axe DevTools</li>
              <li>Lighthouse</li>
              <li>Tests manuels au clavier et avec lecteur d&apos;écran (NVDA)</li>
            </ul>
          </section>

          <section>
            <h2 className="font-display text-2xl font-bold tracking-tight text-fg md:text-3xl">
              Retour d&apos;information et contact
            </h2>
            <p className="mt-4">
              Si vous rencontrez un défaut d&apos;accessibilité vous empêchant
              d&apos;accéder à un contenu ou une fonctionnalité du site,
              merci de me contacter :
            </p>
            <ul className="mt-4 ml-6 list-disc space-y-2">
              <li>
                Email :{" "}
                <a
                  href="mailto:loic@nowakowski-web.fr"
                  className="text-fg underline decoration-fg-subtle underline-offset-4 transition-colors hover:text-brand hover:decoration-brand"
                >
                  loic@nowakowski-web.fr
                </a>
              </li>
              <li>
                Téléphone :{" "}
                <a
                  href="tel:+33652769372"
                  className="text-fg underline decoration-fg-subtle underline-offset-4 transition-colors hover:text-brand hover:decoration-brand"
                >
                  06 52 76 93 72
                </a>
              </li>
            </ul>
          </section>

          <section>
            <h2 className="font-display text-2xl font-bold tracking-tight text-fg md:text-3xl">
              Voies de recours
            </h2>
            <p className="mt-4">
              Cette procédure est à utiliser dans le cas suivant : vous avez
              signalé au responsable du site internet un défaut
              d&apos;accessibilité qui vous empêche d&apos;accéder à un
              contenu ou à un service du portail et vous n&apos;avez pas
              obtenu de réponse satisfaisante.
            </p>
            <p className="mt-4">Vous pouvez :</p>
            <ul className="mt-4 ml-6 list-disc space-y-2">
              <li>Écrire un message au Défenseur des droits.</li>
              <li>
                Contacter le délégué du Défenseur des droits dans votre région.
              </li>
              <li>
                Envoyer un courrier par la poste (gratuit, sans timbre) :
                Défenseur des droits, Libre réponse 71120, 75342 Paris CEDEX 07.
              </li>
            </ul>
          </section>
        </article>

        <footer className="mt-16 border-t border-border pt-8">
          <p className="text-sm text-fg-subtle">
            Déclaration établie le {declarationDate}.
          </p>
        </footer>
      </div>
    </main>
    <Footer />
  </>
)

export default AccessibilitePage
