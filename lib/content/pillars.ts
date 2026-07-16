import {
  SearchCheck,
  ShieldCheck,
  Clock,
  Scale,
  type LucideIcon,
} from "lucide-react"

export type Pillar = {
  icon: LucideIcon
  title: string
  description: string
}

export const PILLARS: Pillar[] = [
  {
    icon: SearchCheck,
    title: "Audit gratuit",
    description:
      "Analyse de votre présence en ligne : vitesse, SEO, mobile. Vous savez où vous en êtes avant de décider.",
  },
  {
    icon: ShieldCheck,
    title: "Garantie 30 jours",
    description:
      "Pas satisfait dans le mois suivant la livraison ? Je modifie sans frais ou je rembourse intégralement.",
  },
  {
    icon: Clock,
    title: "Devis sous 24h",
    description:
      "Vous décrivez votre projet, je vous renvoie un devis clair et chiffré dans la journée. Sans engagement.",
  },
  {
    icon: Scale,
    title: "RGPD & RGAA",
    description:
      "Sites conformes au RGPD et accessibles (RGAA). Vos données et vos visiteurs sont protégés.",
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
