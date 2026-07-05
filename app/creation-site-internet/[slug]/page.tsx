import type { Metadata } from "next"
import { notFound } from "next/navigation"

import Nav from "@/components/layout/Nav"
import Footer from "@/components/layout/Footer"
import FloatingCallButton from "@/components/ui/FloatingCallButton"
import JsonLdScript from "@/components/seo/JsonLdScript"
import LocalPageHero from "@/components/sections/local/LocalPageHero"
import LocalIntro from "@/components/sections/local/LocalIntro"
import LocalSectors from "@/components/sections/local/LocalSectors"
import LocalPricingTeaser from "@/components/sections/local/LocalPricingTeaser"
import LocalFaq from "@/components/sections/local/LocalFaq"
import LocalCityLinks from "@/components/sections/local/LocalCityLinks"
import LocalContactIntro from "@/components/sections/local/LocalContactIntro"
import WhyNowakowski from "@/components/sections/WhyNowakowski"
import Processus from "@/components/sections/Processus"
import Realisations from "@/components/sections/Realisations"
import Contact from "@/components/sections/Contact"
import {
  getAllLocalPageSlugs,
  getLocalPageBySlug,
  getLocalPagePath,
  type LocalPage,
  type LocalPageSection,
} from "@/lib/content/local-pages"
import { buildLocalPageJsonLd, SCHEMA_SITE_URL } from "@/lib/schema"

type PageProps = {
  params: { slug: string }
}

export const generateStaticParams = () =>
  getAllLocalPageSlugs().map((slug) => ({ slug }))

export const generateMetadata = ({
  params,
}: PageProps): Metadata => {
  const page = getLocalPageBySlug(params.slug)
  if (!page) {
    return {
      title: "Page introuvable",
      robots: { index: false, follow: false },
    }
  }

  const url = `${SCHEMA_SITE_URL}${getLocalPagePath(page.slug)}`
  const ogImage = `${SCHEMA_SITE_URL}/og-image.jpg`

  return {
    title: page.seo.title,
    description: page.seo.description,
    alternates: { canonical: url },
    openGraph: {
      type: "website",
      url,
      title: page.seo.title,
      description: page.seo.description,
      images: [
        {
          url: ogImage,
          width: 1200,
          height: 630,
          alt: page.seo.title,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: page.seo.title,
      description: page.seo.description,
      images: [ogImage],
    },
  }
}

const renderSection = (section: LocalPageSection, page: LocalPage) => {
  switch (section) {
    case "intro":
      return (
        <LocalIntro
          key="intro"
          heading={page.intro.heading}
          paragraphs={page.intro.paragraphs}
        />
      )
    case "sectors":
      return (
        <LocalSectors
          key="sectors"
          heading={page.sectors.heading}
          items={page.sectors.items}
        />
      )
    case "pricing":
      return <LocalPricingTeaser key="pricing" city={page.city} />
    case "trust":
      return <WhyNowakowski key="trust" />
    case "realisations":
      return page.realisationVille ? (
        <Realisations key="realisations" ville={page.realisationVille} />
      ) : null
    case "process":
      return <Processus key="process" />
    case "faq":
      return (
        <LocalFaq key="faq" items={page.faq} city={page.city} />
      )
    case "links":
      return <LocalCityLinks key="links" page={page} />
    default:
      return null
  }
}

const LocalPage = ({ params }: PageProps) => {
  const page = getLocalPageBySlug(params.slug)
  if (!page) notFound()

  const contactIntro =
    page.contactIntro ??
    `Décrivez votre projet à ${page.city}. Je reviens vers vous sous 24h.`

  return (
    <>
      <JsonLdScript data={buildLocalPageJsonLd(page)} />
      <Nav />
      <main id="main-content">
        <LocalPageHero
          city={page.city}
          h1={page.hero.h1}
          subtitle={page.hero.subtitle}
          ctaLabel={page.hero.ctaLabel}
        />
        {page.sectionOrder.map((section) => renderSection(section, page))}
        <LocalContactIntro intro={contactIntro} city={page.city} />
        <Contact />
      </main>
      <Footer />
      <FloatingCallButton />
    </>
  )
}

export default LocalPage
