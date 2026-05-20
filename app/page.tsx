import dynamic from "next/dynamic"
import Nav from "@/components/layout/Nav"
import Footer from "@/components/layout/Footer"
import Hero from "@/components/sections/Hero"
import WhyNowakowski from "@/components/sections/WhyNowakowski"
import JsonLd from "@/components/sections/JsonLd"
import FloatingCallButton from "@/components/ui/FloatingCallButton"

const Services = dynamic(() => import("@/components/sections/Services"))
const Processus = dynamic(() => import("@/components/sections/Processus"))
const Tarifs = dynamic(() => import("@/components/sections/Tarifs"))
const ALaCarte = dynamic(() => import("@/components/sections/ALaCarte"))
const PourquoiMoi = dynamic(() => import("@/components/sections/PourquoiMoi"))
const Realisations = dynamic(() => import("@/components/sections/Realisations"))
const Faq = dynamic(() => import("@/components/sections/Faq"))
const Contact = dynamic(() => import("@/components/sections/Contact"))

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
