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
  { label: "Blog", href: "/blog" },
  { label: "À propos", href: "/about" },
  { label: "Contact", href: "/#contact" },
]

export const FOOTER_LEGAL_LINKS: FooterLink[] = [
  { label: "Mentions légales", href: "/mentions-legales" },
  { label: "CGV", href: "/cgv" },
  { label: "Accessibilité", href: "/accessibilite" },
  { label: "Politique de confidentialité", href: "/politique-confidentialite" },
]
