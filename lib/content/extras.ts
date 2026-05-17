import { FileText, Plus, RefreshCw, MapPin, type LucideIcon } from "lucide-react"

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
    price: "Sur devis (-30% pour abonnés Croissance)",
  },
  {
    icon: RefreshCw,
    title: "Refonte d'un site existant fait par moi",
    price: "Tarif réduit (-30% pour clients abonnés)",
    note: "Uniquement pour les sites déjà créés par Nowakowski Web.",
  },
  {
    icon: MapPin,
    title: "Google Business Profile",
    price: "Sur devis",
  },
]
