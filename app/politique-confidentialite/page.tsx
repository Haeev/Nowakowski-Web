import type { Metadata } from "next"
import Link from "next/link"

import Nav from "@/components/layout/Nav"
import Footer from "@/components/layout/Footer"
import ObfuscatedEmail from "@/components/ui/ObfuscatedEmail"

export const metadata: Metadata = {
  title: "Politique de confidentialité",
  description:
    "Politique de confidentialité de Nowakowski Web : données collectées, finalités, durée de conservation et droits RGPD.",
  robots: {
    index: false,
    follow: true,
  },
  alternates: {
    canonical: "https://nowakowski-web.fr/politique-confidentialite",
  },
}

const PolitiqueConfidentialitePage = () => (
  <>
    <Nav />
    <main id="main-content" className="py-12 md:py-16">
      <div className="container max-w-3xl">
        <header className="mb-10">
          <p className="mb-3 text-xs font-semibold uppercase tracking-[0.2em] text-brand">
            Informations légales
          </p>
          <h1 className="font-display text-4xl font-extrabold tracking-tight md:text-5xl">
            Politique de confidentialité
          </h1>
          <p className="mt-4 text-base leading-relaxed text-fg-muted">
            La présente politique décrit la manière dont vos données
            personnelles sont collectées, utilisées et protégées sur le site
            nowakowski-web.fr. Elle est conforme au Règlement Général sur la
            Protection des Données (RGPD) et à la loi Informatique et
            Libertés.
          </p>
        </header>

        <article className="space-y-10 text-base leading-relaxed text-fg-muted">
          <section>
            <h2 className="font-display text-2xl font-bold tracking-tight text-fg md:text-3xl">
              1. Responsable du traitement
            </h2>
            <div className="mt-4 space-y-2">
              <p>
                Le responsable du traitement des données personnelles
                collectées sur le site est :
              </p>
              <p>
                <span className="font-semibold text-fg">
                  Loïc Nowakowski
                </span>
                , exerçant sous l&apos;enseigne « Nowakowski Web ».
              </p>
              <p>Adresse : Stiring-Wendel, Moselle (57), France.</p>
              <p>
                Email :{" "}
                <ObfuscatedEmail
                  className="text-fg transition-colors hover:text-brand"
                  label="loïc[at]nowakowski-web.fr"
                />
                .
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
                Compte tenu de la taille de la structure, aucun Délégué à la
                Protection des Données (DPO) n&apos;a été désigné : Loïc
                Nowakowski est votre point de contact unique pour toute
                question relative à vos données personnelles.
              </p>
            </div>
          </section>

          <section>
            <h2 className="font-display text-2xl font-bold tracking-tight text-fg md:text-3xl">
              2. Données collectées
            </h2>
            <div className="mt-4 space-y-4">
              <p>
                Le site collecte uniquement les données strictement
                nécessaires aux finalités décrites ci-dessous.
              </p>
              <h3 className="font-display text-lg font-semibold text-fg">
                Via le formulaire de contact
              </h3>
              <ul className="ml-6 list-disc space-y-2">
                <li>Prénom et nom.</li>
                <li>
                  Coordonnées de contact : adresse email et/ou numéro de
                  téléphone.
                </li>
                <li>Contenu du message libre que vous m&apos;adressez.</li>
              </ul>
              <h3 className="font-display text-lg font-semibold text-fg">
                Via la mesure d&apos;audience (Plausible Analytics)
              </h3>
              <p>
                Le site utilise{" "}
                <span className="font-semibold text-fg">
                  Plausible Analytics
                </span>
                , un outil européen et respectueux de la vie privée. Les
                données collectées sont entièrement anonymes et agrégées :
              </p>
              <ul className="ml-6 list-disc space-y-2">
                <li>Page consultée, URL de provenance, pays, navigateur.</li>
                <li>Aucune adresse IP n&apos;est stockée.</li>
                <li>
                  Aucun cookie n&apos;est déposé, aucun identifiant
                  persistant n&apos;est utilisé.
                </li>
                <li>Aucun suivi inter-sites n&apos;est effectué.</li>
              </ul>
              <h3 className="font-display text-lg font-semibold text-fg">
                Via Google Analytics 4 et Google Tag Manager
              </h3>
              <p>
                Si vous acceptez les cookies de mesure via le bandeau affiché
                lors de votre première visite, le site utilise{" "}
                <span className="font-semibold text-fg">
                  Google Analytics 4
                </span>
                {" "}et{" "}
                <span className="font-semibold text-fg">
                  Google Tag Manager
                </span>
                {" "}pour analyser la fréquentation. Les données pouvant être
                collectées incluent :
              </p>
              <ul className="ml-6 list-disc space-y-2">
                <li>Pages consultées, durée de visite, source de trafic.</li>
                <li>Type d&apos;appareil, navigateur, système d&apos;exploitation.</li>
                <li>Pays et ville approximatifs (géolocalisation IP).</li>
                <li>
                  Identifiants via cookies de mesure (notamment{" "}
                  <span className="font-semibold text-fg">_ga</span>
                  ).
                </li>
              </ul>
              <p>
                En cas de refus, ces cookies ne sont pas déposés et aucune
                donnée nominative n&apos;est collectée par Google Analytics.
              </p>
            </div>
          </section>

          <section>
            <h2 className="font-display text-2xl font-bold tracking-tight text-fg md:text-3xl">
              3. Finalités du traitement
            </h2>
            <div className="mt-4 space-y-4">
              <p>Vos données sont traitées pour les finalités suivantes :</p>
              <ul className="ml-6 list-disc space-y-2">
                <li>
                  Répondre à votre demande de contact, établir un devis et
                  assurer le suivi commercial de votre projet.
                </li>
                <li>
                  Exécuter le contrat conclu entre vous et Nowakowski Web
                  (création de site, hébergement, maintenance).
                </li>
                <li>
                  Respecter les obligations légales et comptables
                  (facturation, conservation des justificatifs).
                </li>
                <li>
                  Mesurer la fréquentation du site via Plausible Analytics
                  (anonyme) et, si vous y consentez, via Google Analytics 4.
                </li>
              </ul>
            </div>
          </section>

          <section>
            <h2 className="font-display text-2xl font-bold tracking-tight text-fg md:text-3xl">
              4. Bases légales
            </h2>
            <div className="mt-4 space-y-4">
              <p>Les traitements reposent sur les bases légales suivantes :</p>
              <ul className="ml-6 list-disc space-y-2">
                <li>
                  <span className="font-semibold text-fg">
                    Consentement
                  </span>{" "}
                  : envoi volontaire d&apos;un message via le formulaire de
                  contact, et acceptation des cookies Google Analytics via
                  le bandeau affiché sur le site.
                </li>
                <li>
                  <span className="font-semibold text-fg">
                    Exécution contractuelle
                  </span>{" "}
                  : réalisation des prestations commandées et gestion de la
                  relation client.
                </li>
                <li>
                  <span className="font-semibold text-fg">
                    Obligations légales
                  </span>{" "}
                  : conservation des factures et documents comptables.
                </li>
                <li>
                  <span className="font-semibold text-fg">
                    Intérêt légitime
                  </span>{" "}
                  : mesure d&apos;audience anonyme via Plausible Analytics
                  pour en améliorer le contenu et la performance.
                </li>
              </ul>
            </div>
          </section>

          <section>
            <h2 className="font-display text-2xl font-bold tracking-tight text-fg md:text-3xl">
              5. Durée de conservation
            </h2>
            <div className="mt-4 space-y-4">
              <ul className="ml-6 list-disc space-y-2">
                <li>
                  <span className="font-semibold text-fg">
                    Données issues du formulaire de contact
                  </span>{" "}
                  : conservées 3 ans à compter du dernier échange si aucun
                  contrat n&apos;est conclu.
                </li>
                <li>
                  <span className="font-semibold text-fg">
                    Données client (contrat en cours)
                  </span>{" "}
                  : conservées pendant toute la durée de la relation
                  contractuelle, puis archivées conformément aux obligations
                  légales.
                </li>
                <li>
                  <span className="font-semibold text-fg">
                    Données comptables et fiscales
                  </span>{" "}
                  : conservées 10 ans conformément aux obligations légales.
                </li>
                <li>
                  <span className="font-semibold text-fg">
                    Données d&apos;audience Plausible
                  </span>{" "}
                  : agrégées et anonymes, conservées de manière statistique
                  sans permettre l&apos;identification d&apos;une personne.
                </li>
                <li>
                  <span className="font-semibold text-fg">
                    Cookies Google Analytics
                  </span>{" "}
                  : conservés au maximum 13 mois conformément aux
                  recommandations de la CNIL, ou supprimés immédiatement
                  si vous refusez les cookies de mesure.
                </li>
              </ul>
            </div>
          </section>

          <section>
            <h2 className="font-display text-2xl font-bold tracking-tight text-fg md:text-3xl">
              6. Destinataires des données
            </h2>
            <div className="mt-4 space-y-4">
              <p>
                Vos données ne sont jamais vendues ni cédées à des tiers à
                des fins commerciales. Elles sont accessibles uniquement à
                Loïc Nowakowski.
              </p>
              <p>
                Certaines données peuvent transiter par les sous-traitants
                techniques nécessaires au fonctionnement du site,
                strictement encadrés par contrat :
              </p>
              <ul className="ml-6 list-disc space-y-2">
                <li>
                  <span className="font-semibold text-fg">OVH SAS</span>
                  {" "}(2 rue Kellermann, 59100 Roubaix, France), gestion du
                  nom de domaine et des boîtes mail.
                </li>
                <li>
                  <span className="font-semibold text-fg">Vercel Inc.</span>
                  , hébergement du site sur infrastructure Union Européenne
                  (région Francfort, Allemagne).
                </li>
                <li>
                  <span className="font-semibold text-fg">Resend Inc.</span>
                  , envoi des emails de notification du formulaire de
                  contact via une infrastructure Union Européenne.
                </li>
                <li>
                  <span className="font-semibold text-fg">
                    Plausible Analytics
                  </span>
                  , mesure d&apos;audience anonyme, données hébergées
                  en Union européenne.
                </li>
                <li>
                  <span className="font-semibold text-fg">
                    Google Ireland Limited
                  </span>
                  {" "}(Gordon House, Barrow Street, Dublin 4, Irlande) et{" "}
                  <span className="font-semibold text-fg">Google LLC</span>
                  {" "}(États-Unis), pour Google Analytics 4 et Google Tag
                  Manager. Les données peuvent être transférées vers les
                  États-Unis dans le cadre des clauses contractuelles types
                  approuvées par la Commission européenne.
                </li>
              </ul>
              <p>
                Les données hébergées en Union européenne (Plausible, Vercel,
                Resend) ne font l&apos;objet d&apos;aucun transfert hors UE.
                Seuls les services Google peuvent impliquer un transfert vers
                les États-Unis, soumis à votre consentement préalable pour
                les cookies de mesure.
              </p>
            </div>
          </section>

          <section>
            <h2 className="font-display text-2xl font-bold tracking-tight text-fg md:text-3xl">
              7. Vos droits
            </h2>
            <div className="mt-4 space-y-4">
              <p>
                Conformément au RGPD, vous disposez à tout moment des
                droits suivants sur vos données personnelles :
              </p>
              <ul className="ml-6 list-disc space-y-2">
                <li>Droit d&apos;accès et d&apos;information.</li>
                <li>Droit de rectification.</li>
                <li>
                  Droit à l&apos;effacement (« droit à l&apos;oubli »).
                </li>
                <li>Droit à la limitation du traitement.</li>
                <li>Droit d&apos;opposition.</li>
                <li>Droit à la portabilité de vos données.</li>
                <li>
                  Droit de définir des directives relatives au sort de vos
                  données après votre décès.
                </li>
              </ul>
              <p>
                Pour exercer ces droits, contactez-moi par email à{" "}
                <ObfuscatedEmail
                  className="text-fg transition-colors hover:text-brand"
                  label="loïc[at]nowakowski-web.fr"
                />
                . Une réponse vous sera apportée dans un délai d&apos;un
                mois maximum.
              </p>
              <p>
                Si vous estimez, après m&apos;avoir contacté, que vos droits
                ne sont pas respectés, vous pouvez introduire une
                réclamation auprès de la{" "}
                <a
                  href="https://www.cnil.fr"
                  target="_blank"
                  rel="noreferrer noopener"
                  className="text-fg underline decoration-fg-subtle underline-offset-4 transition-colors hover:text-brand hover:decoration-brand"
                >
                  CNIL
                </a>
                {" "}(Commission Nationale de l&apos;Informatique et des
                Libertés).
              </p>
            </div>
          </section>

          <section>
            <h2 className="font-display text-2xl font-bold tracking-tight text-fg md:text-3xl">
              8. Cookies
            </h2>
            <div className="mt-4 space-y-4">
              <p>
                Le site nowakowski-web.fr utilise les catégories de cookies
                et traceurs suivantes :
              </p>
              <h3 className="font-display text-lg font-semibold text-fg">
                Cookies et traceurs exemptés de consentement
              </h3>
              <ul className="ml-6 list-disc space-y-2">
                <li>
                  <span className="font-semibold text-fg">
                    Plausible Analytics
                  </span>
                  {" "}: mesure d&apos;audience sans cookie ni identifiant
                  persistant.
                </li>
                <li>
                  <span className="font-semibold text-fg">
                    Préférences techniques
                  </span>
                  {" "}: stockage local pour la préférence de thème
                  clair/sombre. Ces données ne permettent pas de vous
                  identifier.
                </li>
              </ul>
              <h3 className="font-display text-lg font-semibold text-fg">
                Cookies soumis à votre consentement
              </h3>
              <p>
                <span className="font-semibold text-fg">
                  Google Analytics 4
                </span>
                {" "}et{" "}
                <span className="font-semibold text-fg">
                  Google Tag Manager
                </span>
                {" "}peuvent déposer des cookies de mesure d&apos;audience
                (notamment <span className="font-semibold text-fg">_ga</span>
                ) uniquement si vous les acceptez via le bandeau affiché lors
                de votre première visite. En cas de refus, aucun cookie
                Google Analytics n&apos;est déposé.
              </p>
              <p>
                Le site ne dépose{" "}
                <span className="font-semibold text-fg">
                  aucun cookie publicitaire
                </span>
                .
              </p>
              <p>
                Vous pouvez modifier votre choix à tout moment en supprimant
                les cookies de votre navigateur et en revisitant le site :
                le bandeau de consentement vous sera à nouveau proposé.
              </p>
            </div>
          </section>

          <section>
            <h2 className="font-display text-2xl font-bold tracking-tight text-fg md:text-3xl">
              9. Sécurité
            </h2>
            <p className="mt-4">
              Nowakowski Web met en œuvre les mesures techniques et
              organisationnelles appropriées pour protéger vos données
              contre toute perte, altération ou accès non autorisé : HTTPS
              généralisé, hébergement chez un prestataire de confiance,
              limitation stricte des accès aux données.
            </p>
          </section>

          <section>
            <h2 className="font-display text-2xl font-bold tracking-tight text-fg md:text-3xl">
              10. Évolutions de la présente politique
            </h2>
            <p className="mt-4">
              La présente politique de confidentialité peut être amenée à
              évoluer. La date de dernière mise à jour figure en bas de
              cette page. En cas de modification substantielle, vous en
              serez informé.
            </p>
            <p className="mt-4">
              Pour toute question, consultez également nos{" "}
              <Link
                href="/mentions-legales"
                className="text-fg underline decoration-fg-subtle underline-offset-4 transition-colors hover:text-brand hover:decoration-brand"
              >
                mentions légales
              </Link>
              .
            </p>
          </section>
        </article>

        <footer className="mt-16 border-t border-border pt-8">
          <p className="text-sm text-fg-subtle">
            Dernière mise à jour : juin 2026.
          </p>
        </footer>
      </div>
    </main>
    <Footer />
  </>
)

export default PolitiqueConfidentialitePage
