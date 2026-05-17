import { FileText, Plus, RefreshCw, MapPin, type LucideIcon } from "lucide-react"

export type Extra = {
  icon: LucideIcon
  title: string
  price: string
}

export const EXTRAS: Extra[] = [
  { icon: FileText, title: "Article SEO supplémentaire", price: "90€ / article" },
  { icon: Plus, title: "Ajout de page", price: "Sur devis réduit" },
  { icon: RefreshCw, title: "Refonte partielle", price: "Sur devis réduit" },
  { icon: MapPin, title: "Google Business Profile", price: "Sur devis" },
]
