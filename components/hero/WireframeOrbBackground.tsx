"use client"

import { useEffect, useRef, useState } from "react"
import { WireframeOrbCanvas } from "./wireframe-orb"

const HERO_SECTION_ID = "top"

const usePrefersReducedMotion = () => {
  const [reduced, setReduced] = useState(false)

  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)")
    const update = () => setReduced(mq.matches)
    update()
    mq.addEventListener("change", update)
    return () => mq.removeEventListener("change", update)
  }, [])

  return reduced
}

const WireframeOrbBackground = () => {
  const mouse = useRef({ x: 0, y: 0 })
  const [ready, setReady] = useState(false)
  const prefersReducedMotion = usePrefersReducedMotion()

  useEffect(() => {
    if (prefersReducedMotion) return

    const section = document.getElementById(HERO_SECTION_ID)
    if (!section) return

    const handleMouseMove = (event: MouseEvent) => {
      const rect = section.getBoundingClientRect()
      if (rect.width === 0 || rect.height === 0) return

      mouse.current = {
        x: ((event.clientX - rect.left) / rect.width) * 2 - 1,
        y: -(((event.clientY - rect.top) / rect.height) * 2 - 1),
      }
    }

    const handleMouseLeave = () => {
      mouse.current = { x: 0, y: 0 }
    }

    window.addEventListener("mousemove", handleMouseMove, { passive: true })
    section.addEventListener("mouseleave", handleMouseLeave)
    setReady(true)

    return () => {
      window.removeEventListener("mousemove", handleMouseMove)
      section.removeEventListener("mouseleave", handleMouseLeave)
    }
  }, [prefersReducedMotion])

  if (prefersReducedMotion || !ready) {
    return null
  }

  return (
    <div
      aria-hidden
      className="pointer-events-none absolute inset-0 -z-10 overflow-hidden"
      style={{
        maskImage:
          "radial-gradient(ellipse 90% 75% at 50% 35%, black 15%, transparent 72%)",
        WebkitMaskImage:
          "radial-gradient(ellipse 90% 75% at 50% 35%, black 15%, transparent 72%)",
      }}
    >
      <WireframeOrbCanvas
        mouse={mouse}
        parallaxStrength={1.5}
        config={{
          color: "#AB19F5",
          gridSize: 110,
          bloomIntensity: 1.15,
          maxAlpha: 0.34,
        }}
      />
    </div>
  )
}

export default WireframeOrbBackground
