import {
  CITY_SLUGS,
  getLocalPageBySlug,
  getLocalPagePath,
  PILLAR_SLUG,
} from "@/lib/content/local-pages"

export type NavLink = {
  label: string
  href: string
  id: string
  external?: boolean
}

export const NAV_LINKS: NavLink[] = [
  { label: "Services", href: "/#services", id: "services" },
  { label: "Tarifs", href: "/#tarifs", id: "tarifs" },
  { label: "Réalisations", href: "/#realisations", id: "realisations" },
  { label: "À propos", href: "/about", id: "about", external: true },
  { label: "Contact", href: "/#contact", id: "contact" },
  { label: "Blog", href: "/blog", id: "blog", external: true },
]

export type FooterLink = {
  label: string
  href: string
}

export const FOOTER_PRIMARY_LINKS: FooterLink[] = [
  { label: "Services", href: "/#services" },
  { label: "Tarifs", href: "/#tarifs" },
  { label: "Réalisations", href: "/#realisations" },
  { label: "Audit gratuit", href: "/audit-gratuit" },
  { label: "Blog", href: "/blog" },
  { label: "À propos", href: "/about" },
  { label: "Contact", href: "/#contact" },
]

export const FOOTER_LOCAL_LINKS: FooterLink[] = [
  {
    label: "Moselle-Est",
    href: getLocalPagePath(PILLAR_SLUG),
  },
  ...CITY_SLUGS.map((slug) => {
    const page = getLocalPageBySlug(slug)
    return {
      label: page?.city ?? slug,
      href: getLocalPagePath(slug),
    }
  }),
]

export const FOOTER_LEGAL_LINKS: FooterLink[] = [
  { label: "Mentions légales", href: "/mentions-legales" },
  { label: "CGV", href: "/cgv" },
  { label: "Accessibilité", href: "/accessibilite" },
  { label: "Politique de confidentialité", href: "/politique-confidentialite" },
]
