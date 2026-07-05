import {
  AnimatedSection,
  AnimatedItem,
  fadeUp,
} from "../../ui/animations"
import { Container, Section, SectionHeading } from "../../ui"

type LocalContactIntroProps = {
  intro: string
  city: string
}

const LocalContactIntro = ({ intro, city }: LocalContactIntroProps) => (
  <Section className="pb-0">
    <Container>
      <AnimatedSection className="mx-auto max-w-3xl text-center">
        <AnimatedItem variants={fadeUp}>
          <SectionHeading size="large">
            Votre projet à {city}
          </SectionHeading>
        </AnimatedItem>
        <AnimatedItem variants={fadeUp}>
          <p className="mx-auto mt-6 max-w-xl text-lg text-fg-muted">
            {intro}
          </p>
        </AnimatedItem>
      </AnimatedSection>
    </Container>
  </Section>
)

export default LocalContactIntro
