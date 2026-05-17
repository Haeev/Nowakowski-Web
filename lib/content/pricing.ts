export type Plan = {
  name: string
  priceValue: number
  period: string
  features: string[]
  cta: string
}

export const PRICING_PLANS: Plan[] = [
  {
    name: "Présence",
    priceValue: 20,
    period: "/mois",
    features: [
      "Hébergement & domaine inclus",
      "Site en ligne et sécurisé",
      "1 à 2 modifications mineures par mois",
    ],
    cta: "Choisir Présence",
  },
  {
    name: "Visibilité",
    priceValue: 80,
    period: "/mois",
    features: [
      "Tout Présence inclus",
      "Modifications fréquentes (images, textes, sections)",
      "1 article SEO optimisé par mois",
      "Support prioritaire",
    ],
    cta: "Choisir Visibilité",
  },
  {
    name: "Croissance",
    priceValue: 150,
    period: "/mois",
    features: [
      "Tout Visibilité inclus",
      "4 articles ou actualités par mois",
      "Gestion contenu via WhatsApp",
      "Tarif préférentiel sur extras",
    ],
    cta: "Choisir Croissance",
  },
]
