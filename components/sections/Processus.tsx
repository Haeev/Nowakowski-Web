import {
  AnimatedSection,
  AnimatedItem,
  fadeUp,
  staggerContainer,
} from "../ui/animations"
import SectionLabel from "../ui/SectionLabel"
import { PROCESS_STEPS } from "@/lib/content/process"
import { Container, Section, SectionHeading } from "../ui"

const Processus = () => (
  <Section id="processus">
    <Container>
      <AnimatedSection className="max-w-3xl">
        <AnimatedItem>
          <SectionLabel>Processus</SectionLabel>
        </AnimatedItem>
        <AnimatedItem variants={fadeUp}>
          <SectionHeading>
            De la première discussion à la mise en ligne, en 2 semaines en
            moyenne.
          </SectionHeading>
        </AnimatedItem>
        <AnimatedItem variants={fadeUp}>
          <p className="mt-6 text-lg text-fg-muted">
            Souvent moins. Le délai dépend surtout de votre disponibilité pour
            me transmettre vos infos.
          </p>
        </AnimatedItem>
      </AnimatedSection>

      <AnimatedSection
        className="mt-12 grid gap-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-4"
        variants={staggerContainer}
      >
        {PROCESS_STEPS.map((processStep) => (
          <AnimatedItem
            key={processStep.step}
            variants={fadeUp}
            as="article"
            className="group relative flex h-full flex-col rounded-2xl border border-border bg-surface p-6 transition-colors duration-300 hover:border-brand md:p-8"
          >
            <span
              aria-hidden
              className="font-display text-5xl font-extrabold leading-none tracking-tight text-brand md:text-6xl"
            >
              0{processStep.step}
            </span>
            <h3 className="mt-6 font-display text-xl font-semibold tracking-tight md:text-2xl">
              {processStep.title}
            </h3>
            <p className="mt-2 inline-flex w-fit items-center rounded-full border border-brand/30 bg-brand/10 px-3 py-1 text-xs font-semibold uppercase tracking-wider text-brand">
              {processStep.duration}
            </p>
            <p className="mt-4 text-sm leading-relaxed text-fg-muted">
              {processStep.description}
            </p>
          </AnimatedItem>
        ))}
      </AnimatedSection>
    </Container>
  </Section>
)

export default Processus
