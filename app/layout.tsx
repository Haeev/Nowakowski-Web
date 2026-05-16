import type { Metadata, Viewport } from "next"
import { Poppins, Inter } from "next/font/google"
import Script from "next/script"
import Providers from "./providers"
import "./globals.css"

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800"],
  variable: "--font-poppins",
  display: "swap",
})

const inter = Inter({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  variable: "--font-inter",
  display: "swap",
})

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#FFFFFF" },
    { media: "(prefers-color-scheme: dark)", color: "#0D0D0D" },
  ],
}

export const metadata: Metadata = {
  metadataBase: new URL("https://nowakowski-web.fr"),
  title: {
    default: "Nowakowski Web — Sites web pour artisans à Forbach",
    template: "%s | Nowakowski Web",
  },
  description:
    "Création de sites web professionnels pour artisans et PME en Moselle. Conformes RGPD et RGAA. À partir de 1 200€. Livrés en 5 à 7 jours.",
  manifest: "/manifest.json",
  keywords: [
    "création site web Forbach",
    "création site web Moselle",
    "site internet artisan Forbach",
    "site web plombier Moselle",
    "création site web Sarreguemines",
    "site internet PME 57",
    "agence web Forbach",
    "site web artisan Grand Est",
    "création site web Stiring-Wendel",
    "site internet électricien Moselle",
    "hébergement site web Moselle",
    "maintenance site web Forbach",
  ],
  authors: [{ name: "Loïc Nowakowski", url: "https://nowakowski-web.fr" }],
  creator: "Loïc Nowakowski",
  publisher: "Nowakowski Web",
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  openGraph: {
    type: "website",
    locale: "fr_FR",
    url: "https://nowakowski-web.fr",
    siteName: "Nowakowski Web",
    title:
      "Nowakowski Web : sites web pour artisans à Forbach et en Moselle",
    description:
      "Sites web professionnels pour artisans et PME à Forbach et en Moselle. À partir de 1 200€, livré en 5 à 7 jours. Hébergement inclus.",
    images: [
      {
        url: "/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "Nowakowski Web — Création de sites web Forbach Moselle",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Nowakowski Web : sites web pour artisans en Moselle",
    description:
      "Sites web professionnels pour artisans et PME à Forbach et en Moselle. À partir de 1 200€, livré en 5 à 7 jours. Hébergement inclus.",
    images: ["/og-image.jpg"],
  },
  alternates: {
    canonical: "https://nowakowski-web.fr",
    languages: {
      "fr-FR": "https://nowakowski-web.fr",
    },
  },
  verification: {
    google:
      process.env.GOOGLE_SITE_VERIFICATION ??
      "TODO_GOOGLE_SEARCH_CONSOLE_CODE",
  },
  category: "business",
}

const RootLayout = ({ children }: { children: React.ReactNode }) => (
  <html
    lang="fr"
    suppressHydrationWarning
    className={`${poppins.variable} ${inter.variable}`}
  >
    <body className="min-h-screen antialiased">
      <Providers>{children}</Providers>
      <Script
        defer
        data-domain="nowakowski-web.fr"
        src="https://plausible.io/js/script.js"
        strategy="afterInteractive"
      />
    </body>
  </html>
)

export default RootLayout
