import Link from "next/link"
import { ArrowRight } from "lucide-react"
import HeroOrbGate from "@/components/hero/HeroOrbGate"
import { TRUST_BADGES } from "@/lib/content/trust-badges"
import { siteConfig } from "@/lib/site-config"
import { Button, Container, WhatsAppButton } from "../ui"

const Hero = () => (
  <section
    id="top"
    className="relative overflow-hidden pt-16 pb-12 md:pt-20 md:pb-16"
  >
    <HeroOrbGate />

    <div
      aria-hidden
      className="pointer-events-none absolute inset-0 -z-10"
      style={{
        background:
          "radial-gradient(ellipse 80% 60% at 50% 0%, rgba(171, 25, 245, 0.12) 0%, transparent 70%)",
      }}
    />

    <span
      aria-hidden
      className="pointer-events-none absolute right-[-4%] top-1/2 -z-10 hidden -translate-y-1/2 select-none font-display text-[28vw] font-extrabold leading-none tracking-tighter text-fg lg:block"
      style={{ opacity: 0.04 }}
    >
      WEB
    </span>

    <Container className="relative z-10">
      <p className="mb-6 inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.2em] text-brand">
        <span aria-hidden className="inline-block h-px w-8 bg-brand" />
        {siteConfig.name} · {siteConfig.address.locality},{" "}
        {siteConfig.address.region}
      </p>

      <h1 className="font-display font-extrabold tracking-tight text-balance text-5xl leading-[1.1] sm:text-6xl md:text-7xl lg:text-8xl lg:leading-[1.05]">
        <span className="block">Votre entreprise</span>
        <span className="block">mérite un site qui</span>
        <span className="block">
          <span className="text-gradient text-glow">travaille</span> pour vous.
        </span>
      </h1>

      <div
        aria-hidden
        className="animate-hero-line mt-8 h-[2px] w-full max-w-md bg-gradient-brand"
      />

      <p
        className="animate-hero-fade-up mt-8 max-w-2xl text-lg leading-relaxed text-fg-muted md:text-xl"
        style={{ animationDelay: "0.5s" }}
      >
        Votre prochain client vous cherche sur Google. Je crée le site qui lui
        donne envie de{" "}
        <span
          className="font-bold text-brand"
          style={{ textShadow: "0 0 18px rgba(171,25,245,0.5)" }}
        >
          vous
        </span>{" "}
        appeler, pas votre concurrent. Artisans et PME en Moselle et Grand Est.
      </p>

      <div
        className="animate-hero-fade-up mt-10 flex flex-col items-start gap-4 sm:flex-row sm:flex-wrap sm:items-center"
        style={{ animationDelay: "0.65s" }}
      >
        <div className="transition-transform duration-200 hover:scale-[1.03] active:scale-[0.97]">
          <Button href="#tarifs">Voir les tarifs</Button>
        </div>
        <div className="transition-transform duration-200 hover:scale-[1.03] active:scale-[0.97]">
          <WhatsAppButton variant="outline" size="lg" />
        </div>
        <Link
          href="#realisations"
          className="group inline-flex items-center gap-2 text-sm font-semibold text-fg transition-colors duration-200 hover:text-brand-red"
        >
          Voir les réalisations
          <ArrowRight
            className="h-4 w-4 transition-transform duration-200 group-hover:translate-x-1"
            aria-hidden
          />
        </Link>
      </div>

      <ul
        className="animate-hero-fade-up mt-10 flex flex-wrap items-center gap-x-2 gap-y-2 text-sm text-fg-muted"
        style={{ animationDelay: "0.8s" }}
      >
        {TRUST_BADGES.map((badge, i) => (
          <li key={badge} className="flex items-center gap-2">
            <span>{badge}</span>
            {i < TRUST_BADGES.length - 1 && (
              <span aria-hidden className="text-fg-subtle">
                ·
              </span>
            )}
          </li>
        ))}
      </ul>
    </Container>

    <a
      href="#services"
      className="animate-scroll-hint absolute bottom-6 left-1/2 hidden -translate-x-1/2 items-center gap-2 text-xs font-semibold uppercase tracking-[0.25em] text-fg-subtle transition-colors duration-200 hover:text-brand md:inline-flex"
    >
      <span aria-hidden>↓</span>
      Services
    </a>
  </section>
)

export default Hero
