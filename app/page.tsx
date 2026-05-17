import Nav from "@/components/layout/Nav"
import Footer from "@/components/layout/Footer"
import Hero from "@/components/sections/Hero"
import Services from "@/components/sections/Services"
import WhyNowakowski from "@/components/sections/WhyNowakowski"
import Processus from "@/components/sections/Processus"
import Tarifs from "@/components/sections/Tarifs"
import ALaCarte from "@/components/sections/ALaCarte"
import PourquoiMoi from "@/components/sections/PourquoiMoi"
import Realisations from "@/components/sections/Realisations"
import Faq from "@/components/sections/Faq"
import Contact from "@/components/sections/Contact"
import JsonLd from "@/components/sections/JsonLd"
import FloatingCallButton from "@/components/ui/FloatingCallButton"

const HomePage = () => (
  <>
    <JsonLd />
    <Nav />
    <main id="main-content">
      <Hero />
      <Services />
      <WhyNowakowski />
      <Processus />
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
