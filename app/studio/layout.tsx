import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "Nowakowski Web : Studio",
  robots: {
    index: false,
    follow: false,
    nocache: true,
    googleBot: {
      index: false,
      follow: false,
      noimageindex: true,
    },
  },
}

const StudioLayout = ({ children }: { children: React.ReactNode }) => (
  <>{children}</>
)

export default StudioLayout
