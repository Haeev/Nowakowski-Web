import { MapPin, Zap, Shield, MessageCircle, type LucideIcon } from "lucide-react"

export type Pillar = {
  icon: LucideIcon
  title: string
  description: string
}

export const PILLARS: Pillar[] = [
  {
    icon: MapPin,
    title: "Local",
    description:
      "Moselle et Grand Est. Je connais vos clients parce que je suis d'ici.",
  },
  {
    icon: Zap,
    title: "Rapide",
    description: "Site livré en 5 à 7 jours. Pas 3 mois d'attente.",
  },
  {
    icon: Shield,
    title: "Sans risque",
    description: "Vous payez en deux fois. Pas de mauvaise surprise.",
  },
  {
    icon: MessageCircle,
    title: "Joignable",
    description:
      "Un numéro, un WhatsApp. Pas un formulaire qui disparaît.",
  },
]

export type Stat = {
  value: string
  label: string
  accent?: boolean
}

export const STATS: Stat[] = [
  { value: "5-7", label: "jours de livraison" },
  { value: "1 200€", label: "à partir de", accent: true },
  { value: "24h", label: "temps de réponse" },
]
