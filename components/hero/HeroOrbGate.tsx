"use client"

import dynamic from "next/dynamic"
import { useEffect, useState } from "react"
import { DESKTOP_ORB_MEDIA } from "@/lib/hero-orb-media"

const ParticleOrbBackground = dynamic(
  () => import("@/components/hero/ParticleOrbBackground"),
  { ssr: false }
)

const HeroOrbGate = () => {
  const [showOrb, setShowOrb] = useState(false)

  useEffect(() => {
    const mq = window.matchMedia(DESKTOP_ORB_MEDIA)
    const update = () => setShowOrb(mq.matches)
    update()
    mq.addEventListener("change", update)
    return () => mq.removeEventListener("change", update)
  }, [])

  if (!showOrb) return null

  return <ParticleOrbBackground />
}

export default HeroOrbGate
