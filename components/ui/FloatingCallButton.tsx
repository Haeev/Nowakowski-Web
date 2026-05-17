import { Phone } from "lucide-react"
import { getTelHref, siteConfig } from "@/lib/site-config"

const FloatingCallButton = () => (
  <a
    href={getTelHref()}
    aria-label={`Appeler ${siteConfig.founder.fullName} au ${siteConfig.contact.phoneDisplay}`}
    className="fixed bottom-6 right-6 z-50 inline-flex h-14 w-14 items-center justify-center rounded-full bg-brand text-white shadow-brand transition-transform duration-200 hover:scale-105 animate-pulse-ring md:hidden"
  >
    <Phone className="h-5 w-5" aria-hidden />
  </a>
)

export default FloatingCallButton
