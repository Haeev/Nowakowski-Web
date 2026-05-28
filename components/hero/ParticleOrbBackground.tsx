"use client"

import { useCallback, useEffect, useRef, useState } from "react"
import { ParticleOrbCanvas } from "./particle-orb"

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

const ParticleOrbBackground = () => {
  const mouse = useRef({ x: 0, y: 0 })
  const sectionRef = useRef<HTMLElement | null>(null)
  const [ready, setReady] = useState(false)
  const prefersReducedMotion = usePrefersReducedMotion()

  const updateMouse = useCallback((clientX: number, clientY: number) => {
    const section = sectionRef.current
    if (!section) return

    const rect = section.getBoundingClientRect()
    if (rect.width === 0 || rect.height === 0) return

    mouse.current = {
      x: ((clientX - rect.left) / rect.width) * 2 - 1,
      y: -(((clientY - rect.top) / rect.height) * 2 - 1),
    }
  }, [])

  useEffect(() => {
    if (prefersReducedMotion) return

    const section = document.getElementById(HERO_SECTION_ID)
    if (!section) return

    sectionRef.current = section

    const handlePointerMove = (event: PointerEvent) => {
      updateMouse(event.clientX, event.clientY)
    }

    const handlePointerLeave = () => {
      mouse.current = { x: 0, y: 0 }
    }

    section.addEventListener("pointermove", handlePointerMove, { passive: true })
    section.addEventListener("pointerleave", handlePointerLeave)
    setReady(true)

    return () => {
      section.removeEventListener("pointermove", handlePointerMove)
      section.removeEventListener("pointerleave", handlePointerLeave)
      sectionRef.current = null
    }
  }, [prefersReducedMotion, updateMouse])

  if (prefersReducedMotion || !ready) {
    return null
  }

  return (
    <div
      aria-hidden
      className="pointer-events-none absolute -inset-[50%] -z-10 overflow-visible opacity-[0.5]"
      style={{
        maskImage:
          "radial-gradient(ellipse 100% 92% at 50% 42%, black 28%, transparent 84%)",
        WebkitMaskImage:
          "radial-gradient(ellipse 100% 92% at 50% 42%, black 28%, transparent 84%)",
      }}
    >
      <ParticleOrbCanvas
        mouse={mouse}
        parallaxStrength={0.42}
        cameraZ={2.55}
        config={{
          color: 0xab19f5,
          radius: 1.9,
          detail: 36,
          rotationSpeed: 0.07,
          noiseTimeScale: 0.1,
          particleSizeMin: 0.007,
          particleSizeMax: 0.05,
        }}
      />
    </div>
  )
}

export default ParticleOrbBackground
