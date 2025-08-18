"use client"

import { useEffect, useRef, useState } from "react"

export const CursorGlow = () => {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 })
  const [isVisible, setIsVisible] = useState(false)
  const glowRef = useRef<HTMLDivElement>(null)
  const lastUpdateTimeRef = useRef<number>(0)
  const isMobileRef = useRef<boolean>(false)

  useEffect(() => {
    // Check if device is mobile - don't show cursor glow on mobile
    isMobileRef.current = window.innerWidth < 768 || "ontouchstart" in window
    if (isMobileRef.current) {
      return
    }

    const updateMousePosition = (e: MouseEvent) => {
      // Throttle updates
      const now = Date.now()
      if (now - lastUpdateTimeRef.current < 50) return
      lastUpdateTimeRef.current = now

      if (glowRef.current) {
        glowRef.current.style.transform = `translate(${e.clientX - 128}px, ${e.clientY - 128}px)`
        if (!isVisible) {
          setIsVisible(true)
        }
      }
    }

    const handleMouseLeave = () => {
      setIsVisible(false)
    }

    window.addEventListener("mousemove", updateMousePosition)
    document.addEventListener("mouseleave", handleMouseLeave)

    return () => {
      window.removeEventListener("mousemove", updateMousePosition)
      document.removeEventListener("mouseleave", handleMouseLeave)
    }
  }, [isVisible])

  // Don't render on mobile
  if (typeof window !== "undefined" && isMobileRef.current) {
    return null
  }

  return (
    <div
      ref={glowRef}
      className="fixed top-0 left-0 w-64 h-64 pointer-events-none z-10 rounded-full opacity-0 bg-gradient-to-br from-blue-500 to-violet-600 blur-3xl"
      style={{
        opacity: isVisible ? 0.15 : 0,
        willChange: "transform, opacity",
        transition: "opacity 0.3s ease",
      }}
    />
  )
}
