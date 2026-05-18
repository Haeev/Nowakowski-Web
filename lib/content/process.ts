export type ProcessStep = {
  step: number
  title: string
  duration: string
  description: string
}

export const PROCESS_STEPS: ProcessStep[] = [
  {
    step: 1,
    title: "Devis",
    duration: "Sous 24h",
    description:
      "Remplissez le formulaire en 2 minutes ou envoyez-moi un WhatsApp. Je vous réponds dans la journée avec un devis détaillé, un tarif précis et une date de livraison estimée. Aucun engagement de votre côté.",
  },
  {
    step: 2,
    title: "Prise d'info",
    duration: "30 à 60 min",
    description:
      "Un appel ou échange WhatsApp pour comprendre votre activité, vos clients et ce qui vous différencie. Textes, photos, services : je vous guide pas à pas. Rien à préparer à l'avance. Si vous n'avez rien, je m'occupe de tout.",
  },
  {
    step: 3,
    title: "Maquette",
    duration: "Moins de 2 semaines",
    description:
      "Vous recevez un aperçu complet de votre futur site avant toute mise en ligne. Vous validez, je corrige, autant de fois que nécessaire. Rien n'est publié sans votre accord explicite.",
  },
  {
    step: 4,
    title: "Mise en ligne",
    duration: "Le jour J",
    description:
      "Je publie sur votre nom de domaine, configure l'hébergement et active vos emails pro. Votre site est soumis à Google dès le premier jour. Je reste joignable par WhatsApp pour toute question après la livraison.",
  },
]
