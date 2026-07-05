import { Check } from "lucide-react"
import {
  AnimatedSection,
  AnimatedItem,
  fadeUp,
  staggerContainer,
} from "../../ui/animations"
import SectionLabel from "../../ui/SectionLabel"
import { Container, Section, SectionHeading } from "../../ui"

type LocalSectorsProps = {
  heading: string
  items: string[]
}

const LocalSectors = ({ heading, items }: LocalSectorsProps) => (
  <Section tone="surface">
    <Container>
      <AnimatedSection className="max-w-3xl">
        <AnimatedItem>
          <SectionLabel accent="red">Secteurs</SectionLabel>
        </AnimatedItem>
        <AnimatedItem variants={fadeUp}>
          <SectionHeading>{heading}</SectionHeading>
        </AnimatedItem>
      </AnimatedSection>

      <AnimatedSection
        className="mt-12 grid gap-4 sm:grid-cols-2"
        variants={staggerContainer}
      >
        {items.map((item) => (
          <AnimatedItem
            key={item}
            variants={fadeUp}
            className="flex items-start gap-3 rounded-xl border border-border bg-bg p-5"
          >
            <Check
              className="mt-0.5 h-5 w-5 flex-shrink-0 text-brand"
              aria-hidden
            />
            <span className="text-fg-muted">{item}</span>
          </AnimatedItem>
        ))}
      </AnimatedSection>
    </Container>
  </Section>
)

export default LocalSectors
