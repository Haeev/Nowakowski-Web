import { getAllRealisations } from "@/lib/realisations"
import { AnimatedSection, AnimatedItem, staggerContainer, fadeUp } from "./animations"
import SectionLabel from "./SectionLabel"
import RealisationCard from "./RealisationCard"

const Realisations = () => {
  const realisations = getAllRealisations()

  return (
    <section id="realisations" className="py-16 md:py-20">
      <div className="container">
        <AnimatedSection className="max-w-3xl">
          <AnimatedItem>
            <SectionLabel accent="red">Réalisations</SectionLabel>
          </AnimatedItem>
          <AnimatedItem variants={fadeUp}>
            <h2 className="font-display text-4xl font-bold tracking-tight md:text-5xl lg:text-6xl text-balance">
              Des sites qui travaillent.
            </h2>
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
              <RealisationCard key={realisation.slug} realisation={realisation} />
            ))}
          </AnimatedSection>
        )}
      </div>
    </section>
  )
}

export default Realisations
