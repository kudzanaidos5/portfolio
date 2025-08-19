"use client"

import type React from "react"
import { useEffect, useRef, useState } from "react"

export const BackgroundBeams = ({ children }: { children?: React.ReactNode }) => {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 })
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext("2d")
    if (!ctx) return

    // Set canvas dimensions
    const handleResize = () => {
      if (canvas) {
        canvas.width = window.innerWidth
        canvas.height = window.innerHeight
      }
    }
    handleResize()
    window.addEventListener("resize", handleResize)

    // Track mouse position
    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({ x: e.clientX, y: e.clientY })
    }
    window.addEventListener("mousemove", handleMouseMove)

    // Animation
    let animationFrameId: number
    const render = () => {
      if (!ctx || !canvas) return

      // Clear canvas
      ctx.clearRect(0, 0, canvas.width, canvas.height)

      // Create gradient background
      const gradient = ctx.createLinearGradient(0, 0, canvas.width, canvas.height)
      gradient.addColorStop(0, "rgba(0, 0, 0, 1)")
      gradient.addColorStop(1, "rgba(0, 0, 10, 1)")
      ctx.fillStyle = gradient
      ctx.fillRect(0, 0, canvas.width, canvas.height)

      // Draw beams
      const beamCount = 5
      for (let i = 0; i < beamCount; i++) {
        const angle = (i / beamCount) * Math.PI * 2
        const distance = 300
        const x = mousePosition.x + Math.cos(angle) * distance
        const y = mousePosition.y + Math.sin(angle) * distance

        // Create beam gradient
        const beamGradient = ctx.createRadialGradient(
          mousePosition.x,
          mousePosition.y,
          0,
          mousePosition.x,
          mousePosition.y,
          distance * 2,
        )
        beamGradient.addColorStop(0, "rgba(37, 99, 235, 0.15)")
        beamGradient.addColorStop(0.5, "rgba(139, 92, 246, 0.05)")
        beamGradient.addColorStop(1, "rgba(0, 0, 0, 0)")

        ctx.beginPath()
        ctx.moveTo(mousePosition.x, mousePosition.y)
        ctx.lineTo(x, y)
        ctx.lineWidth = 150
        ctx.strokeStyle = beamGradient
        ctx.stroke()
      }

      // Add noise overlay
      ctx.fillStyle = "rgba(0, 0, 0, 0.03)"
      ctx.fillRect(0, 0, canvas.width, canvas.height)

      animationFrameId = requestAnimationFrame(render)
    }

    render()

    return () => {
      window.removeEventListener("resize", handleResize)
      window.removeEventListener("mousemove", handleMouseMove)
      cancelAnimationFrame(animationFrameId)
    }
  }, [mousePosition])

  return (
    <div className="h-full w-full">
      <canvas ref={canvasRef} className="fixed inset-0 z-0 h-full w-full bg-black opacity-80 pointer-events-none" />
      {children}
    </div>
  )
}
