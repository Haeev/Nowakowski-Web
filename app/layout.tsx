import type { Metadata, Viewport } from "next"
import { Poppins, Inter } from "next/font/google"
import Script from "next/script"
import Providers from "./providers"
import "./globals.css"
import { getSiteUrl, getSiteUrlObject, isProduction } from "@/lib/env"
import { siteConfig } from "@/lib/site-config"
import PreviewBanner from "@/components/ui/PreviewBanner"

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

const SITE_URL = getSiteUrl()

export const metadata: Metadata = {
  metadataBase: getSiteUrlObject(),
  title: {
    default: `${siteConfig.name} : Sites web pour artisans en Moselle et Grand Est`,
    template: `%s | ${siteConfig.name}`,
  },
  description:
    "Création de sites web professionnels pour artisans et PME en Moselle. Conformes RGPD et RGAA. À partir de 1 000€. Livrés sous 2 semaines.",
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
  authors: [
    { name: siteConfig.founder.fullName, url: siteConfig.productionUrl },
  ],
  creator: siteConfig.founder.fullName,
  publisher: siteConfig.name,
  robots: isProduction()
    ? {
        index: true,
        follow: true,
        googleBot: {
          index: true,
          follow: true,
          "max-video-preview": -1,
          "max-image-preview": "large",
          "max-snippet": -1,
        },
      }
    : {
        index: false,
        follow: false,
        nocache: true,
        googleBot: {
          index: false,
          follow: false,
          noimageindex: true,
        },
      },
  openGraph: {
    type: "website",
    locale: "fr_FR",
    url: SITE_URL,
    siteName: siteConfig.name,
    title: `${siteConfig.name} : sites web pour artisans à Forbach et en Moselle`,
    description:
      "Sites web professionnels pour artisans et PME à Forbach et en Moselle. À partir de 1 000€, livré sous 2 semaines. Hébergement inclus.",
    images: [
      {
        url: "/og-image.jpg",
        width: 1200,
        height: 630,
        alt: `${siteConfig.name} : Création de sites web Moselle Grand Est`,
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: `${siteConfig.name} : sites web pour artisans en Moselle`,
    description:
      "Sites web professionnels pour artisans et PME à Forbach et en Moselle. À partir de 1 000€, livré sous 2 semaines. Hébergement inclus.",
    images: ["/og-image.jpg"],
  },
  alternates: {
    canonical: siteConfig.productionUrl,
    languages: {
      "fr-FR": siteConfig.productionUrl,
    },
  },
  ...(process.env.GOOGLE_SITE_VERIFICATION
    ? {
        verification: {
          google: process.env.GOOGLE_SITE_VERIFICATION,
        },
      }
    : {}),
  category: "business",
}

const GTM_ID = "GTM-PF7H6GSD"

const RootLayout = ({ children }: { children: React.ReactNode }) => (
  <html
    lang="fr"
    suppressHydrationWarning
    className={`${poppins.variable} ${inter.variable}`}
  >
    <head>
      {isProduction() && (
        <Script
          id="gtm-script"
          strategy="beforeInteractive"
          dangerouslySetInnerHTML={{
            __html: `(function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
})(window,document,'script','dataLayer','${GTM_ID}');`,
          }}
        />
      )}
    </head>
    <body className="min-h-screen antialiased">
      {isProduction() && (
        <noscript>
          <iframe
            src={`https://www.googletagmanager.com/ns.html?id=${GTM_ID}`}
            height="0"
            width="0"
            style={{ display: "none", visibility: "hidden" }}
          />
        </noscript>
      )}
      <a
        href="#main-content"
        className="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-[100] focus:px-4 focus:py-2 focus:bg-brand focus:text-white focus:rounded focus:shadow-brand"
      >
        Aller au contenu principal
      </a>
      <PreviewBanner />
      <Providers>{children}</Providers>
      {isProduction() && (
        <Script
          defer
          data-domain={siteConfig.analytics.plausibleDomain}
          src={siteConfig.analytics.plausibleScript}
          strategy="afterInteractive"
        />
      )}
    </body>
  </html>
)

export default RootLayout
