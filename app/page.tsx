"use client"

import { Suspense, lazy, useState, useEffect } from "react"
import Header from "@/components/header"
import Hero from "@/components/hero"
import About from "@/components/about"
import Skills from "@/components/skills"
import Projects from "@/components/projects"
import Education from "@/components/education"
import Contact from "@/components/contact"
import References from "@/components/references"
import Footer from "@/components/footer"
import { BackgroundBeams } from "@/components/ui/background-beams"
import { TracingBeam } from "@/components/ui/tracing-beam"
import { FloatingNavbar } from "@/components/ui/floating-navbar"
import { LoadingAnimation } from "@/components/loading-animation"
import { Toaster } from "@/components/ui/toaster"

// Lazy load the cursor glow effect
const CursorGlow = lazy(() => import("@/components/ui/cursor-glow").then((mod) => ({ default: mod.CursorGlow })))

export default function Home() {
  const [isLoading, setIsLoading] = useState(false)

  useEffect(() => {
    // Check if this is the first visit
    const hasVisited = localStorage.getItem("hasVisitedPortfolio")

    if (!hasVisited) {
      // First time visitor - show loading animation
      setIsLoading(true)

      // Mark as visited
      localStorage.setItem("hasVisitedPortfolio", "true")

      // Show loading animation for 3.5 seconds
      const timer = setTimeout(() => {
        setIsLoading(false)
      }, 3500)

      return () => clearTimeout(timer)
    } else {
      // Returning visitor - skip loading animation
      setIsLoading(false)
    }
  }, [])

  const navItems = [
    { name: "About", href: "#about" },
    { name: "Skills", href: "#skills" },
    { name: "Projects", href: "#projects" },
    { name: "Education", href: "#education" },
    { name: "References", href: "#references" },
    { name: "Contact", href: "#contact" },
  ]

  return (
    <>
      {isLoading ? (
        <LoadingAnimation />
      ) : (
        <main className="min-h-screen bg-black text-white overflow-hidden">
          {/* Background effect */}
          <BackgroundBeams />

          {/* Cursor glow effect - lazy loaded */}
          <Suspense fallback={null}>
            <CursorGlow />
          </Suspense>

          {/* Floating navbar */}
          <FloatingNavbar navItems={navItems} />

          {/* Main Header - using only one navbar component */}
          <Header />

          {/* Main content with tracing beam effect */}
          <TracingBeam className="px-6">
            <Hero />
            <About />
            <Skills />
            <Projects />
            <Education />
            <References />
            <Contact />
          </TracingBeam>

          {/* Footer */}
          <Footer />

          {/* Toast notifications */}
          <Toaster />
        </main>
      )}
    </>
  )
}
