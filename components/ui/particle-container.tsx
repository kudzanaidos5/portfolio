"use client"

import { useEffect, useRef } from "react"

/**
 * Lightweight, canvas-based particle background.
 * No React setState calls after mount – eliminates the
 * “Maximum update depth exceeded” error.
 */
interface ParticleContainerProps {
  className?: string
  particleCount?: number
  colors?: string[]
}

interface Particle {
  x: number
  y: number
  vx: number
  vy: number
  size: number
  color: string
  life: number
  maxLife: number
}

export function ParticleContainer({
  className = "",
  particleCount = 15,
  colors = ["#3b82f6", "#8b5cf6", "#6366f1"],
}: ParticleContainerProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const animationId = useRef<number>()

  // ---------------------------------------------------------------------------
  // Helpers
  // ---------------------------------------------------------------------------
  const createParticle = (w: number, h: number): Particle => ({
    x: Math.random() * w,
    y: Math.random() * h,
    vx: (Math.random() - 0.5) * 0.4,
    vy: (Math.random() - 0.5) * 0.4,
    size: Math.random() * 3 + 1,
    color: colors[Math.floor(Math.random() * colors.length)],
    life: Math.random() * 200 + 100,
    maxLife: 300,
  })

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext("2d")
    if (!ctx) return

    // Respect prefers-reduced-motion
    const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches
    if (prefersReducedMotion) return

    // Resize handler ----------------------------------------------------------
    const setSize = () => {
      canvas.width = window.innerWidth
      canvas.height = window.innerHeight
    }
    setSize()
    window.addEventListener("resize", setSize)

    // Initialise particles ----------------------------------------------------
    const isMobile = window.innerWidth < 768
    const count = isMobile ? Math.min(8, particleCount) : particleCount
    const particles: Particle[] = Array.from({ length: count }, () => createParticle(canvas.width, canvas.height))

    // Animation loop ----------------------------------------------------------
    let last = 0
    const animate = (ts: number) => {
      if (ts - last > 33) {
        last = ts
        ctx.clearRect(0, 0, canvas.width, canvas.height)

        particles.forEach((p, i) => {
          // Update
          p.x += p.vx
          p.y += p.vy
          if (p.x < 0 || p.x > canvas.width) p.vx *= -1
          if (p.y < 0 || p.y > canvas.height) p.vy *= -1
          p.life -= 1
          if (p.life <= 0) particles[i] = createParticle(canvas.width, canvas.height)

          // Draw
          ctx.globalAlpha = (p.life / p.maxLife) * 0.4
          ctx.fillStyle = p.color
          ctx.beginPath()
          ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2)
          ctx.fill()
        })
      }
      animationId.current = requestAnimationFrame(animate)
    }
    animationId.current = requestAnimationFrame(animate)

    // Cleanup -----------------------------------------------------------------
    return () => {
      window.removeEventListener("resize", setSize)
      if (animationId.current) cancelAnimationFrame(animationId.current)
    }
  }, [particleCount, colors])

  return (
    <canvas
      ref={canvasRef}
      className={`absolute inset-0 ${className}`}
      aria-hidden="true"
      // Prevent pointer events so UI is clickable
      style={{ pointerEvents: "none" }}
    />
  )
}
