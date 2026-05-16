import Link from "next/link"
import ObfuscatedEmail from "./ObfuscatedEmail"

const FOOTER_LINKS = [
  { label: "Services", href: "/#services" },
  { label: "Tarifs", href: "/#tarifs" },
  { label: "Réalisations", href: "/#realisations" },
  { label: "À propos", href: "/about" },
  { label: "Contact", href: "/#contact" },
  { label: "Blog", href: "/blog" },
]

const LEGAL_LINKS = [
  { label: "Mentions légales", href: "/mentions-legales" },
  { label: "CGV", href: "/cgv" },
  { label: "Politique de confidentialité", href: "/politique-confidentialite" },
]

const Footer = () => (
  <footer className="relative bg-neutral-100 dark:bg-[#111111]">
    <div aria-hidden className="h-[2px] w-full bg-gradient-brand" />
    <div className="container py-14">
      <div className="grid gap-10 md:grid-cols-3 md:gap-8">
        <div>
          <p className="font-display text-xl font-bold tracking-tight text-neutral-900 dark:text-white">
            Nowakowski<span className="text-brand">.</span>
          </p>
          <p className="mt-2 text-sm text-fg-muted">
            © 2026 · Stiring-Wendel, Moselle
          </p>
        </div>

        <nav aria-label="Navigation pied de page" className="md:justify-self-center">
          <ul className="flex flex-wrap items-center gap-x-6 gap-y-2 text-sm">
            {FOOTER_LINKS.map((link) => (
              <li key={link.href}>
                <Link
                  href={link.href}
                  className="text-fg-muted transition-colors hover:text-brand"
                >
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        <div className="md:justify-self-end md:text-right">
          <p className="text-sm">
            <ObfuscatedEmail className="text-fg transition-colors hover:text-brand" />
          </p>
          <p className="mt-1 text-sm">
            <a
              href="tel:+33652769372"
              className="text-fg transition-colors hover:text-brand"
            >
              06 52 76 93 72
            </a>
          </p>
          <p className="mt-1 text-sm text-fg-muted">
            Stiring-Wendel, Moselle (57)
          </p>
        </div>
      </div>

      <div className="mt-10 border-t border-border pt-6">
        <nav
          aria-label="Liens légaux"
          className="flex flex-col items-center gap-y-3 text-xs sm:flex-row sm:justify-center sm:gap-x-6"
        >
          {LEGAL_LINKS.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="text-fg-subtle transition-colors hover:text-fg"
            >
              {link.label}
            </Link>
          ))}
        </nav>
        <p className="mt-6 text-center text-xs text-fg-subtle">
          Création de sites web pour artisans et PME · Forbach · Sarreguemines ·
          Metz · Moselle · Grand Est
        </p>
      </div>
    </div>
  </footer>
)

export default Footer
