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
      "Vous me décrivez votre projet, je vous envoie un devis clair et sans surprise dans la journée.",
  },
  {
    step: 2,
    title: "Prise d'info",
    duration: "1 à 2h max",
    description:
      "Vous me transmettez vos textes, photos et services. Si vous n'avez rien, je vous guide. Pas besoin d'être technique.",
  },
  {
    step: 3,
    title: "Maquette",
    duration: "Quelques jours",
    description:
      "Je vous montre le site avant publication. Vous pouvez demander des ajustements.",
  },
  {
    step: 4,
    title: "Mise en ligne",
    duration: "Le jour J",
    description:
      "Je publie sur votre nom de domaine. Vos emails pro sont activés. Vous êtes en ligne.",
  },
]
