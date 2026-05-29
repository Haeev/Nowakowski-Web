import type { AuditCategoryKey } from "@/components/audit/types"

export type AuditCategoryMeta = {
  key: AuditCategoryKey
  label: string
  explanation: string
}

export const CATEGORY_ORDER: AuditCategoryKey[] = [
  "performance",
  "seo",
  "accessibility",
  "bestPractices",
]

export const AUDIT_CATEGORIES: AuditCategoryMeta[] = [
  {
    key: "performance",
    label: "Performance",
    explanation:
      "La performance, c'est la vitesse de chargement de votre site. Un visiteur attend rarement plus de 3 secondes : au-delà, il repart sans vous lire. Un site lent fait fuir les clients avant même qu'ils découvrent votre offre. Google pénalise aussi les sites lents dans son classement, ce qui réduit votre visibilité.",
  },
  {
    key: "seo",
    label: "SEO (référencement)",
    explanation:
      "Le référencement, c'est tout ce qui aide Google à comprendre et bien classer votre site. Si votre site est mal référencé, vos clients ne le trouvent pas quand ils cherchent sur Google. C'est souvent votre concurrent qui récupère l'appel. Un bon référencement technique pose les bases pour attirer des visiteurs qualifiés sans publicité payante.",
  },
  {
    key: "accessibility",
    label: "Accessibilité",
    explanation:
      "L'accessibilité, c'est la capacité de votre site à être utilisé par tout le monde, y compris les personnes âgées, malvoyantes ou en situation de handicap. Un site accessible touche plus de monde et inspire confiance. C'est aussi une obligation légale qui se renforce en France (RGAA). Ce qui est accessible est souvent plus clair pour tous vos visiteurs.",
  },
  {
    key: "bestPractices",
    label: "Bonnes pratiques",
    explanation:
      "Les bonnes pratiques, ce sont les standards techniques de qualité et de sécurité d'un site moderne : HTTPS, code propre, absence d'erreurs. Elles inspirent confiance à vos visiteurs et évitent les avertissements de sécurité qui font fuir. Un site bien construit est plus fiable, plus facile à maintenir et mieux perçu par Google.",
  },
]

export const getCategoryMeta = (key: AuditCategoryKey): AuditCategoryMeta =>
  AUDIT_CATEGORIES.find((category) => category.key === key) ?? AUDIT_CATEGORIES[0]
