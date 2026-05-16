import { Check } from "lucide-react"

type WhyItem = {
  title: string
  description: string
}

const items: WhyItem[] = [
  {
    title: "Vous ne gérez rien",
    description:
      "Un WhatsApp, c'est en ligne dans la journée. Vous restez sur votre métier.",
  },
  {
    title: "Conforme RGPD & RGAA",
    description:
      "Protection des données, accessibilité, mentions légales. Vous êtes en règle dès le premier jour.",
  },
  {
    title: "Domaine et emails français",
    description:
      "Gérés par OVH, leader européen du cloud. Infrastructure de site en région européenne.",
  },
  {
    title: "Votre site vous appartient",
    description:
      "Pas de verrouillage. Si vous partez, vous repartez avec tout : domaine, code, contenus.",
  },
  {
    title: "Performance maximale pour Google",
    description:
      "Construit avec la même technologie que Netflix ou TikTok. Chargement ultra-rapide, SEO béton.",
  },
  {
    title: "Tarifs annoncés, jamais de surprise",
    description:
      "1 200€ pour la création. C'est tout. Pas de « petit supplément » en cours de route.",
  },
  {
    title: "Livraison en 5 à 7 jours",
    description:
      "Pas 3 mois d'allers-retours. Vous donnez les infos, une semaine plus tard c'est en ligne.",
  },
  {
    title: "Local, à 5 min de Forbach",
    description:
      "Pas un standard parisien. Vous savez qui fait votre site, et qui le maintient.",
  },
]

const WhyNowakowski = () => (
  <section
    aria-labelledby="why-heading"
    className="py-16 md:py-20"
  >
    <div className="container">
      <div className="mb-12 max-w-3xl md:mb-16">
        <p className="mb-4 text-xs font-semibold uppercase tracking-[0.2em] text-fg-subtle">
          Pourquoi Nowakowski Web
        </p>
        <h2
          id="why-heading"
          className="font-display text-4xl font-bold tracking-tight md:text-5xl lg:text-6xl text-balance"
        >
          Tout est inclus.
          <br />
          Vous n&apos;avez rien à faire.
        </h2>
      </div>

      <ul className="grid grid-cols-1 gap-8 md:grid-cols-2 md:gap-x-12 md:gap-y-10">
        {items.map((item) => (
          <li key={item.title} className="flex gap-4">
            <div
              aria-hidden
              className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-full border border-brand/30 bg-brand/10"
            >
              <Check className="h-5 w-5 text-brand" strokeWidth={2.5} />
            </div>
            <div>
              <h3 className="font-display text-lg font-semibold">
                {item.title}
              </h3>
              <p className="mt-2 leading-relaxed text-fg-muted">
                {item.description}
              </p>
            </div>
          </li>
        ))}
      </ul>
    </div>
  </section>
)

export default WhyNowakowski
