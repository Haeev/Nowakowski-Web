import { Monitor, Server, FileText, type LucideIcon } from "lucide-react"

export type Service = {
  icon: LucideIcon
  title: string
  description: string
  detail: string
}

export const SERVICES: Service[] = [
  {
    icon: Monitor,
    title: "Site vitrine professionnel",
    description:
      "Rapide, moderne, visible sur Google. Conçu pour convertir vos visiteurs en clients. Livré en 5 à 7 jours.",
    detail: "À partir de 1 200€",
  },
  {
    icon: Server,
    title: "Hébergement & maintenance",
    description:
      "Je m'occupe de tout. Votre site reste en ligne, à jour et sécurisé. Un problème ? Je suis joignable.",
    detail: "Dès 20€/mois",
  },
  {
    icon: FileText,
    title: "Contenu & référencement",
    description:
      "Articles de blog, actualités, nouvelles réalisations : je gère votre contenu pour que Google vous trouve avant vos concurrents.",
    detail: "Inclus selon formule",
  },
]
