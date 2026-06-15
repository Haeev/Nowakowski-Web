import Link from "next/link"
import { Linkedin } from "lucide-react"
import ObfuscatedEmail from "../ui/ObfuscatedEmail"
import { getTelHref, siteConfig } from "@/lib/site-config"
import {
  FOOTER_LEGAL_LINKS,
  FOOTER_PRIMARY_LINKS,
} from "@/lib/content/navigation"

const Footer = () => (
  <footer className="relative bg-neutral-100 dark:bg-[#111111]">
    <div aria-hidden className="h-[2px] w-full bg-gradient-brand" />
    <div className="container py-14">
      <div className="grid gap-10 md:grid-cols-3 md:gap-8">
        <div>
          <p className="font-display text-xl font-bold tracking-tight text-neutral-900 dark:text-white">
            {siteConfig.name}
            <span className="text-brand">.</span>
          </p>
          <p className="mt-2 text-sm text-fg-muted">
            © {new Date().getFullYear()} · {siteConfig.address.locality},{" "}
            {siteConfig.address.region} ({siteConfig.address.departmentCode})
          </p>
        </div>

        <nav
          aria-label="Navigation pied de page"
          className="md:justify-self-center"
        >
          <ul className="flex flex-wrap items-center gap-x-6 gap-y-2 text-sm">
            {FOOTER_PRIMARY_LINKS.map((link) => (
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
              href={getTelHref()}
              className="text-fg transition-colors hover:text-brand"
            >
              {siteConfig.contact.phoneDisplay}
            </a>
          </p>
          <p className="mt-1 text-sm">
            <a
              href={siteConfig.social.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-end gap-1.5 text-fg transition-colors hover:text-brand md:ml-auto"
            >
              <Linkedin className="h-4 w-4 shrink-0" aria-hidden />
              LinkedIn
              <span className="sr-only">
                {" "}
                — profil de {siteConfig.founder.fullName}, nouvel onglet
              </span>
            </a>
          </p>
          <p className="mt-1 text-sm text-fg-muted">
            {siteConfig.address.locality}, {siteConfig.address.region} (
            {siteConfig.address.departmentCode})
          </p>
        </div>
      </div>

      <div className="mt-10 border-t border-border pt-6">
        <nav
          aria-label="Liens légaux"
          className="flex flex-col items-center gap-y-3 text-xs sm:flex-row sm:justify-center sm:gap-x-6"
        >
          {FOOTER_LEGAL_LINKS.map((link) => (
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
          <span aria-hidden>🇫🇷</span> Domaine et emails en France ·
          Infrastructure européenne · Conforme RGPD &amp; RGAA
        </p>
        <p className="mt-3 text-center text-xs text-fg-subtle">
          Création de sites web pour artisans et PME · Forbach · Sarreguemines ·
          Metz · Moselle · Grand Est
        </p>
      </div>
    </div>
  </footer>
)

export default Footer
