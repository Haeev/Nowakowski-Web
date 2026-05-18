import {
  MapPin,
  Zap,
  ShieldCheck,
  MessageCircle,
  type LucideIcon,
} from "lucide-react"

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
    description: "Site livré sous 2 semaines. Pas 3 mois d'attente.",
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

export type Commitment = {
  title: string
  accent?: boolean
}

export const COMMITMENTS: Commitment[] = [
  { title: "Joignable directement" },
  { title: "Sans jargon inutile", accent: true },
  { title: "Garantie 30 jours" },
]
