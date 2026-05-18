import { FileText, Plus, MapPin, type LucideIcon } from "lucide-react"

export type Extra = {
  icon: LucideIcon
  title: string
  price: string
  note?: string
}

export const EXTRAS: Extra[] = [
  {
    icon: FileText,
    title: "Article SEO supplémentaire",
    price: "90€ / article (60€ pour abonnés Visibilité ou Croissance)",
  },
  {
    icon: Plus,
    title: "Ajout de page",
    price: "Sur devis (-33% pour abonnés Croissance)",
  },
  {
    icon: MapPin,
    title: "Google Business Profile",
    price: "Sur devis",
  },
]
