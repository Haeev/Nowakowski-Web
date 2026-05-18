export type Plan = {
  name: string
  priceValue: number
  period: string
  details?: string
  features: string[]
  cta: string
}

export const PRICING_PLANS: Plan[] = [
  {
    name: "Présence",
    priceValue: 29,
    period: "TTC/mois",
    features: [
      "Hébergement, nom de domaine et sauvegardes inclus",
      "Mises à jour techniques et de sécurité",
      "2 adresses email pro @votredomaine.fr",
      "Modifications de contenu via WhatsApp : un message, c'est en ligne dans la journée",
    ],
    cta: "Choisir Présence",
  },
  {
    name: "Visibilité",
    priceValue: 69,
    period: "TTC/mois",
    features: [
      "Tout Présence inclus",
      "1 article SEO rédigé chaque mois",
      "Suivi SEO local",
      "3 adresses email pro @votredomaine.fr",
      "Modifications de contenu via WhatsApp : un message, c'est en ligne dans la journée",
    ],
    cta: "Choisir Visibilité",
  },
  {
    name: "Croissance",
    priceValue: 179,
    period: "TTC/mois",
    features: [
      "Tout Visibilité inclus",
      "4 articles SEO par mois",
      "Publication d'articles via WhatsApp à partir des infos que vous m'envoyez (photos d'un chantier, quelques mots). Sans idée ? Je publie des articles optimisés liés à votre activité",
      "-33% sur tous les services à la carte",
      "5 adresses email pro @votredomaine.fr",
    ],
    cta: "Choisir Croissance",
  },
]
