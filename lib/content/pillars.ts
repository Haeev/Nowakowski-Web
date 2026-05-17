import { MapPin, Zap, ShieldCheck, MessageCircle, type LucideIcon } from "lucide-react"

export type Pillar = {
  icon: LucideIcon
  title: string
  description: string
}

export const PILLARS: Pillar[] = [
  {
    icon: MapPin,
    title: "Direct",
    description:
      "Vous parlez à la personne qui fait votre site, pas à un commercial. Une seule personne, du devis à la livraison.",
  },
  {
    icon: Zap,
    title: "Rapide",
    description: "Site livré en 5 à 7 jours. Pas 3 mois d'attente.",
  },
  {
    icon: ShieldCheck,
    title: "Garantie 30 jours",
    description:
      "Pas satisfait dans le mois suivant la livraison ? Je modifie sans frais ou je rembourse intégralement.",
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
  { value: "1 200€", label: "tarif de base", accent: true },
  { value: "24h", label: "temps de réponse" },
]
