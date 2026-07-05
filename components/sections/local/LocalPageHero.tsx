import { siteConfig } from "@/lib/site-config"
import { Button, Container } from "../../ui"

type LocalPageHeroProps = {
  city: string
  h1: string
  subtitle: string
  ctaLabel: string
}

const LocalPageHero = ({ city, h1, subtitle, ctaLabel }: LocalPageHeroProps) => (
  <section className="relative overflow-hidden pt-16 pb-12 md:pt-20 md:pb-16">
    <div
      aria-hidden
      className="pointer-events-none absolute inset-0 -z-10"
      style={{
        background:
          "radial-gradient(ellipse 80% 60% at 50% 0%, rgba(171, 25, 245, 0.12) 0%, transparent 70%)",
      }}
    />

    <Container className="relative z-10">
      <p className="mb-6 inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.2em] text-brand">
        <span aria-hidden className="inline-block h-px w-8 bg-brand" />
        {siteConfig.name} · {city}
      </p>

      <h1 className="max-w-4xl font-display text-4xl font-extrabold leading-[1.1] tracking-tight text-balance sm:text-5xl md:text-6xl lg:text-7xl">
        {h1}
      </h1>

      <div
        aria-hidden
        className="animate-hero-line mt-8 h-[2px] w-full max-w-md bg-gradient-brand"
      />

      <p className="mt-8 max-w-2xl text-lg leading-relaxed text-fg-muted md:text-xl">
        {subtitle}
      </p>

      <div className="mt-10">
        <div className="transition-transform duration-200 hover:scale-[1.03] active:scale-[0.97]">
          <Button href="#contact" size="lg">
            {ctaLabel} →
          </Button>
        </div>
      </div>
    </Container>
  </section>
)

export default LocalPageHero
