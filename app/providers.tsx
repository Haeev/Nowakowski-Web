"use client"

import { ThemeProvider } from "next-themes"
import type { ReactNode } from "react"

type ProvidersProps = {
  children: ReactNode
}

const Providers = ({ children }: ProvidersProps) => (
  <ThemeProvider
    attribute="class"
    defaultTheme="dark"
    enableSystem={false}
    disableTransitionOnChange={false}
    storageKey="nowakowski-theme"
  >
    {children}
  </ThemeProvider>
)

export default Providers
