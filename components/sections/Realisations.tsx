import { getAllRealisations } from "@/lib/realisations"
import { AnimatedSection, AnimatedItem, staggerContainer, fadeUp } from "../ui/animations"
import SectionLabel from "../ui/SectionLabel"
import RealisationCard from "../ui/RealisationCard"
import { Container, Section, SectionHeading } from "../ui"

const Realisations = () => {
  const realisations = getAllRealisations()

  return (
    <Section id="realisations">
      <Container>
        <AnimatedSection className="max-w-3xl">
          <AnimatedItem>
            <SectionLabel accent="red">Réalisations</SectionLabel>
          </AnimatedItem>
          <AnimatedItem variants={fadeUp}>
            <SectionHeading>Des sites qui travaillent.</SectionHeading>
          </AnimatedItem>
        </AnimatedSection>

        {realisations.length === 0 ? (
          <p className="mt-12 text-fg-muted">
            Premières réalisations bientôt en ligne.
          </p>
        ) : (
          <AnimatedSection
            className="mt-12 grid gap-6 grid-cols-1 md:grid-cols-2 lg:grid-cols-3"
            variants={staggerContainer}
          >
            {realisations.map((realisation) => (
              <RealisationCard
                key={realisation.slug}
                realisation={realisation}
              />
            ))}
          </AnimatedSection>
        )}
      </Container>
    </Section>
  )
}

export default Realisations
