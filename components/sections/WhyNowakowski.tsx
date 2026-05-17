import { Check } from "lucide-react"
import { WHY_ITEMS } from "@/lib/content/why-items"
import { siteConfig } from "@/lib/site-config"
import { Container, Section, SectionHeading } from "../ui"

const WhyNowakowski = () => (
  <Section ariaLabelledBy="why-heading">
    <Container>
      <div className="mb-12 max-w-3xl md:mb-16">
        <p className="mb-4 text-xs font-semibold uppercase tracking-[0.2em] text-fg-subtle">
          Pourquoi {siteConfig.name}
        </p>
        <SectionHeading id="why-heading">
          Tout est inclus.
          <br />
          Vous n&apos;avez rien à faire.
        </SectionHeading>
      </div>

      <ul className="grid grid-cols-1 gap-8 md:grid-cols-2 md:gap-x-12 md:gap-y-10">
        {WHY_ITEMS.map((item) => (
          <li key={item.title} className="flex gap-4">
            <div
              aria-hidden
              className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-full border border-brand/30 bg-brand/10"
            >
              <Check className="h-5 w-5 text-brand" strokeWidth={2.5} />
            </div>
            <div>
              <h3 className="font-display text-lg font-semibold">
                {item.title}
              </h3>
              <p className="mt-2 leading-relaxed text-fg-muted">
                {item.description}
              </p>
            </div>
          </li>
        ))}
      </ul>
    </Container>
  </Section>
)

export default WhyNowakowski
