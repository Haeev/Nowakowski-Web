import Nav from "@/components/Nav"
import Hero from "@/components/Hero"
import Services from "@/components/Services"
import WhyNowakowski from "@/components/WhyNowakowski"
import Tarifs from "@/components/Tarifs"
import ALaCarte from "@/components/ALaCarte"
import PourquoiMoi from "@/components/PourquoiMoi"
import Realisations from "@/components/Realisations"
import Faq from "@/components/Faq"
import Contact from "@/components/Contact"
import Footer from "@/components/Footer"
import FloatingCallButton from "@/components/FloatingCallButton"
import JsonLd from "@/components/JsonLd"

const HomePage = () => (
  <>
    <JsonLd />
    <Nav />
    <main id="main-content">
      <Hero />
      <Services />
      <WhyNowakowski />
      <Tarifs />
      <ALaCarte />
      <PourquoiMoi />
      <Realisations />
      <Faq />
      <Contact />
    </main>
    <Footer />
    <FloatingCallButton />
  </>
)

export default HomePage
