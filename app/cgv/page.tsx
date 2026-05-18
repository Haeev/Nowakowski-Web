import type { Metadata } from "next"
import Link from "next/link"

import Nav from "@/components/layout/Nav"
import Footer from "@/components/layout/Footer"
import ObfuscatedEmail from "@/components/ui/ObfuscatedEmail"

export const metadata: Metadata = {
  title: "Conditions Générales de Vente",
  description:
    "Conditions Générales de Vente de Nowakowski Web : prestations, prix, délais, paiement, responsabilité et droit applicable.",
  robots: {
    index: false,
    follow: true,
  },
  alternates: {
    canonical: "https://nowakowski-web.fr/cgv",
  },
}

const CgvPage = () => (
  <>
    <Nav />
    <main id="main-content" className="py-12 md:py-16">
      <div className="container max-w-3xl">
        <header className="mb-10">
          <p className="mb-3 text-xs font-semibold uppercase tracking-[0.2em] text-brand">
            Informations légales
          </p>
          <h1 className="font-display text-4xl font-extrabold tracking-tight md:text-5xl">
            Conditions Générales de Vente
          </h1>
          <p className="mt-4 text-base leading-relaxed text-fg-muted">
            Les présentes Conditions Générales de Vente (CGV) régissent les
            relations contractuelles entre Loïc Nowakowski, exerçant sous
            l&apos;enseigne « Nowakowski Web » (ci-après « le Prestataire »),
            et toute personne physique ou morale faisant appel à ses
            services (ci-après « le Client »).
          </p>
        </header>

        <article className="space-y-10 text-base leading-relaxed text-fg-muted">
          <section>
            <h2 className="font-display text-2xl font-bold tracking-tight text-fg md:text-3xl">
              1. Objet
            </h2>
            <p className="mt-4">
              Les présentes CGV ont pour objet de définir les conditions
              dans lesquelles le Prestataire fournit au Client des
              prestations de création, hébergement et maintenance de sites
              web. Toute commande passée auprès du Prestataire implique
              l&apos;adhésion sans réserve du Client aux présentes
              conditions.
            </p>
          </section>

          <section>
            <h2 className="font-display text-2xl font-bold tracking-tight text-fg md:text-3xl">
              2. Prestations proposées
            </h2>
            <div className="mt-4 space-y-4">
              <p>
                Le Prestataire propose les prestations suivantes :
              </p>
              <ul className="ml-6 list-disc space-y-2">
                <li>
                  <span className="font-semibold text-fg">
                    Création de site vitrine
                  </span>
                  {" "}: à partir de 1 000€ TTC, livraison sous 2 semaines
                  en moyenne pour un site vitrine standard. Le tarif peut
                  varier à la hausse selon la complexité du projet et le
                  degré de personnalisation demandé.
                </li>
                <li>
                  <span className="font-semibold text-fg">
                    Formule Présence
                  </span>
                  {" "}: abonnement mensuel de 29€ TTC comprenant
                  l&apos;hébergement, le nom de domaine, les sauvegardes,
                  les mises à jour techniques et de sécurité, ainsi que
                  2 adresses email professionnelles @votredomaine.fr.
                </li>
                <li>
                  <span className="font-semibold text-fg">
                    Formule Visibilité
                  </span>
                  {" "}: abonnement mensuel de 69€ TTC comprenant
                  l&apos;intégralité de la formule Présence, 1 article SEO
                  rédigé et publié chaque mois, le suivi du référencement
                  local, ainsi que 3 adresses email professionnelles
                  @votredomaine.fr.
                </li>
                <li>
                  <span className="font-semibold text-fg">
                    Formule Croissance
                  </span>
                  {" "}: abonnement mensuel de 179€ TTC comprenant
                  l&apos;intégralité de la formule Visibilité, 4 articles
                  SEO par mois, la gestion des modifications de contenu et
                  la publication d&apos;articles via WhatsApp à partir des
                  informations transmises par le Client, une remise de 33%
                  sur l&apos;ensemble des services à la carte, ainsi que
                  5 adresses email professionnelles @votredomaine.fr.
                </li>
              </ul>
              <p>
                Le contenu précis de chaque prestation est défini au cas
                par cas dans le devis remis au Client avant signature.
              </p>
            </div>
          </section>

          <section>
            <h2 className="font-display text-2xl font-bold tracking-tight text-fg md:text-3xl">
              3. Devis et commande
            </h2>
            <div className="mt-4 space-y-4">
              <p>
                Toute prestation fait l&apos;objet d&apos;un devis détaillé
                et gratuit, remis au Client. Le devis précise la nature des
                prestations, leur prix, les délais et les modalités de
                paiement.
              </p>
              <p>
                Le devis est valable trente (30) jours à compter de sa date
                d&apos;émission. La commande est considérée comme ferme et
                définitive à réception du devis signé par le Client et du
                versement de l&apos;acompte prévu.
              </p>
            </div>
          </section>

          <section>
            <h2 className="font-display text-2xl font-bold tracking-tight text-fg md:text-3xl">
              4. Prix et modalités de paiement
            </h2>
            <div className="mt-4 space-y-4">
              <p>
                Les prix sont indiqués en euros. Le statut fiscal du
                Prestataire est précisé dans les{" "}
                <Link
                  href="/mentions-legales"
                  className="text-fg underline decoration-fg-subtle underline-offset-4 transition-colors hover:text-brand hover:decoration-brand"
                >
                  mentions légales
                </Link>
                .{" "}
                {/* TODO: confirmer "TVA non applicable, art. 293 B du CGI" pour micro-entreprise, ou indiquer le taux de TVA applicable */}
              </p>
              <p>
                <span className="font-semibold text-fg">
                  Création de site vitrine
                </span>
                {" "}: le paiement s&apos;effectue en deux versements, 50% à
                la commande (acompte) et 50% à la livraison du site, avant
                mise en ligne. Le paiement est réalisé par virement
                bancaire.
              </p>
              <p>
                <span className="font-semibold text-fg">
                  Abonnements mensuels
                </span>
                {" "}: les formules Présence, Visibilité et Croissance sont
                facturées mensuellement, par prélèvement ou virement, à la
                date anniversaire de la souscription.
              </p>
              <p>
                Tout retard de paiement entraîne, sans mise en demeure
                préalable, l&apos;application de pénalités de retard au
                taux légal en vigueur, ainsi qu&apos;une indemnité
                forfaitaire pour frais de recouvrement de 40€ conformément à
                l&apos;article L441-10 du Code de commerce.
              </p>
            </div>
          </section>

          <section>
            <h2 className="font-display text-2xl font-bold tracking-tight text-fg md:text-3xl">
              5. Délais de livraison
            </h2>
            <div className="mt-4 space-y-4">
              <p>
                Pour un site vitrine standard, le délai de livraison est de
                2 semaines en moyenne à compter de la réception de
                l&apos;acompte et des éléments nécessaires (textes, photos,
                logo, accès au nom de domaine le cas échéant).
              </p>
              <p>
                Ces délais sont donnés à titre indicatif et peuvent être
                ajustés selon la complexité du projet ou les délais de
                retour du Client sur les validations intermédiaires. Tout
                retard imputable au Client (validation tardive, contenus
                non transmis, etc.) prolonge d&apos;autant le délai de
                livraison.
              </p>
            </div>
          </section>

          <section>
            <h2 className="font-display text-2xl font-bold tracking-tight text-fg md:text-3xl">
              6. Garantie satisfait ou remboursé 30 jours
            </h2>
            <div className="mt-4 space-y-4">
              <p>
                Pour les sites créés (prestation de création unique), le
                Client dispose d&apos;une garantie de 30 jours à compter de
                la livraison du site. Si le Client n&apos;est pas satisfait
                du résultat, il peut demander :
              </p>
              <ul className="ml-6 list-disc space-y-2">
                <li>
                  soit des modifications sans frais supplémentaires jusqu&apos;à
                  ce que le site corresponde à ses attentes initiales (dans
                  la limite du cahier des charges convenu) ;
                </li>
                <li>
                  soit le remboursement intégral du montant versé pour la
                  création du site.
                </li>
              </ul>
              <p>
                La demande doit être adressée au Prestataire par email ou
                WhatsApp dans le délai de 30 jours suivant la livraison. La
                garantie ne couvre pas les frais d&apos;abonnement mensuel
                déjà consommés (hébergement, nom de domaine, etc.), ni les
                demandes hors périmètre du devis initial.
              </p>
            </div>
          </section>

          <section>
            <h2 className="font-display text-2xl font-bold tracking-tight text-fg md:text-3xl">
              7. Hébergement et maintenance
            </h2>
            <div className="mt-4 space-y-4">
              <p>
                L&apos;hébergement du site est assuré dans le cadre des
                formules d&apos;abonnement Présence, Visibilité ou
                Croissance. Le site est hébergé sur l&apos;infrastructure
                Vercel (États-Unis / Europe), partenaire technique du
                Prestataire.
              </p>
              <p>
                La maintenance comprend les mises à jour de sécurité, les
                correctifs techniques et la surveillance de la
                disponibilité du site. Les évolutions fonctionnelles ou
                graphiques majeures font l&apos;objet d&apos;un devis
                spécifique.
              </p>
            </div>
          </section>

          <section>
            <h2 className="font-display text-2xl font-bold tracking-tight text-fg md:text-3xl">
              8. Obligations du Client
            </h2>
            <div className="mt-4 space-y-4">
              <p>
                Le Client s&apos;engage à fournir au Prestataire, dans des
                délais raisonnables, l&apos;ensemble des éléments
                nécessaires à la réalisation des prestations : contenus
                rédactionnels, photographies, logo, identité visuelle,
                accès aux services tiers (nom de domaine, comptes
                existants).
              </p>
              <p>
                Le Client garantit qu&apos;il dispose des droits
                d&apos;exploitation sur l&apos;ensemble des éléments
                transmis et que ceux-ci ne portent pas atteinte aux droits
                de tiers. Le Client est seul responsable du contenu publié
                sur son site.
              </p>
            </div>
          </section>

          <section>
            <h2 className="font-display text-2xl font-bold tracking-tight text-fg md:text-3xl">
              9. Propriété intellectuelle
            </h2>
            <div className="mt-4 space-y-4">
              <p>
                Pendant la durée de l&apos;abonnement, le Client dispose
                d&apos;un droit d&apos;usage exclusif sur le site livré.
                Les fichiers sources (code, design, contenus) restent
                hébergés et maintenus par le Prestataire.
              </p>
              <p>
                À la fin de l&apos;abonnement, et conformément à
                l&apos;engagement public du Prestataire, l&apos;ensemble
                des fichiers sources du site est transmis au Client, qui en
                devient pleinement propriétaire et peut les héberger
                ailleurs s&apos;il le souhaite.
              </p>
              <p>
                Les bibliothèques, polices et icônes tierces utilisées
                restent soumises à leurs licences respectives.
              </p>
            </div>
          </section>

          <section>
            <h2 className="font-display text-2xl font-bold tracking-tight text-fg md:text-3xl">
              10. Résiliation
            </h2>
            <div className="mt-4 space-y-4">
              <p>
                Les abonnements mensuels sont sans engagement de durée et
                sans frais de résiliation. Le Client peut résilier son
                abonnement à tout moment, par email ou WhatsApp adressé au
                Prestataire. La résiliation prend effet à la fin du cycle
                de facturation suivant le mois en cours : le mois en cours
                ainsi que le mois suivant restent dus, puis le Client est
                libre.
              </p>
              <p>
                En cas de manquement grave de l&apos;une des parties à ses
                obligations, l&apos;autre partie pourra résilier le contrat
                de plein droit, après mise en demeure restée sans effet
                pendant trente (30) jours.
              </p>
            </div>
          </section>

          <section>
            <h2 className="font-display text-2xl font-bold tracking-tight text-fg md:text-3xl">
              11. Responsabilité
            </h2>
            <div className="mt-4 space-y-4">
              <p>
                Le Prestataire est tenu à une obligation de moyens dans
                l&apos;exécution de ses prestations. Il met en œuvre toutes
                les diligences raisonnables pour assurer la qualité, la
                sécurité et la disponibilité du site.
              </p>
              <p>
                La responsabilité du Prestataire ne saurait être engagée en
                cas de force majeure, de défaillance des réseaux de
                télécommunication, d&apos;interruption des services
                d&apos;hébergement par un tiers, ou de mauvaise utilisation
                du site par le Client.
              </p>
              <p>
                En tout état de cause, la responsabilité du Prestataire est
                plafonnée au montant total effectivement perçu pour la
                prestation concernée au cours des douze (12) derniers
                mois.
              </p>
            </div>
          </section>

          <section>
            <h2 className="font-display text-2xl font-bold tracking-tight text-fg md:text-3xl">
              12. Données personnelles
            </h2>
            <p className="mt-4">
              Les modalités de traitement des données personnelles dans le
              cadre de l&apos;exécution des présentes sont détaillées dans
              la{" "}
              <Link
                href="/politique-confidentialite"
                className="text-fg underline decoration-fg-subtle underline-offset-4 transition-colors hover:text-brand hover:decoration-brand"
              >
                politique de confidentialité
              </Link>
              .
            </p>
          </section>

          <section>
            <h2 className="font-display text-2xl font-bold tracking-tight text-fg md:text-3xl">
              13. Médiation de la consommation
            </h2>
            <p className="mt-4">
              Conformément aux articles L611-1 et suivants du Code de la
              consommation, le Client consommateur a la possibilité de
              recourir gratuitement à un médiateur de la consommation en
              cas de litige. Coordonnées du médiateur :{" "}
              {/* TODO: ajouter le nom et les coordonnées du médiateur de la consommation référencé */}
              <span className="italic text-fg-subtle">
                à compléter
              </span>
              .
            </p>
          </section>

          <section>
            <h2 className="font-display text-2xl font-bold tracking-tight text-fg md:text-3xl">
              14. Litiges et droit applicable
            </h2>
            <div className="mt-4 space-y-4">
              <p>
                Les présentes CGV sont régies par le droit français. En
                cas de litige, et après tentative de résolution amiable, les
                tribunaux français seront seuls compétents.
              </p>
              <p>
                Pour les Clients consommateurs, la juridiction compétente
                est celle du lieu de leur domicile ou du lieu d&apos;exécution
                de la prestation. Pour les Clients professionnels, le
                tribunal compétent est celui du ressort du siège social du
                Prestataire.
              </p>
            </div>
          </section>

          <section>
            <h2 className="font-display text-2xl font-bold tracking-tight text-fg md:text-3xl">
              15. Contact
            </h2>
            <p className="mt-4">
              Pour toute question relative aux présentes CGV, vous pouvez
              contacter le Prestataire par email à{" "}
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

export default CgvPage
