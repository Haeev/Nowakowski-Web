import {
  AnimatedSection,
  AnimatedItem,
  fadeUp,
} from "../../ui/animations"
import SectionLabel from "../../ui/SectionLabel"
import { Container, Section, SectionHeading } from "../../ui"

type LocalIntroProps = {
  heading: string
  paragraphs: string[]
}

const LocalIntro = ({ heading, paragraphs }: LocalIntroProps) => (
  <Section>
    <Container>
      <AnimatedSection className="max-w-3xl">
        <AnimatedItem>
          <SectionLabel>Contexte local</SectionLabel>
        </AnimatedItem>
        <AnimatedItem variants={fadeUp}>
          <SectionHeading>{heading}</SectionHeading>
        </AnimatedItem>
        <AnimatedItem variants={fadeUp}>
          <div className="mt-8 space-y-6 text-lg leading-relaxed text-fg-muted">
            {paragraphs.map((paragraph) => (
              <p key={paragraph.slice(0, 40)}>{paragraph}</p>
            ))}
          </div>
        </AnimatedItem>
      </AnimatedSection>
    </Container>
  </Section>
)

export default LocalIntro
