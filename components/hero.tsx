"use client"

import type React from "react"
import { motion } from "framer-motion"
import { FileDown, Mail, Github, Linkedin } from "lucide-react"
import { TypewriterEffect } from "@/components/ui/typewriter-effect"
import { AnimatedGradientText } from "@/components/ui/animated-gradient-text"
import { MagneticButton } from "@/components/ui/magnetic-button"
import { ParticleContainer } from "@/components/ui/particle-container"
import { useEffect, useState } from "react"
import { toast } from "@/components/ui/use-toast"

export default function Hero() {
  const words = [
    { text: "Computer" },
    { text: "Science" },
    { text: "Student" },
    { text: "Java" },
    { text: "Developer" },
    { text: "Python" },
    { text: "Developer" },
    { text: "Web" },
    { text: "Developer" },
  ]

  // Only show particles on desktop
  const [showParticles, setShowParticles] = useState(false)

  useEffect(() => {
    // Check if device is desktop
    setShowParticles(window.innerWidth >= 768)

    // Add resize listener
    const handleResize = () => {
      setShowParticles(window.innerWidth >= 768)
    }

    window.addEventListener("resize", handleResize)
    return () => window.removeEventListener("resize", handleResize)
  }, [])

  // Function to handle CV download
  const handleDownloadCV = async () => {
    console.log("Download CV button clicked")
    const cvUrl = "/cv.pdf"

    try {
      const headResponse = await fetch(cvUrl, { method: "HEAD" })
      if (!headResponse.ok) {
        throw new Error("CV not found")
      }

      const link = document.createElement("a")
      link.href = cvUrl
      link.download = "Kudzanai-Dhospani-CV.pdf"
      link.target = "_blank"
      document.body.appendChild(link)
      link.click()
      document.body.removeChild(link)
    } catch (error) {
      toast({ title: "CV not available", description: "Add public/cv.pdf" })
      // Fallback: open link anyway (in case HEAD blocked by host)
      const link = document.createElement("a")
      link.href = cvUrl
      link.target = "_blank"
      document.body.appendChild(link)
      link.click()
      document.body.removeChild(link)
    }
  }

  // Function to handle contact navigation
  const handleContactClick = (e: React.MouseEvent) => {
    console.log("Contact Me button clicked")
    e.preventDefault()
    e.stopPropagation()

    const contactElement = document.getElementById("contact")
    if (contactElement) {
      const headerHeight = 80
      const elementPosition = contactElement.getBoundingClientRect().top
      const offsetPosition = elementPosition + window.pageYOffset - headerHeight

      window.scrollTo({
        top: offsetPosition,
        behavior: "smooth",
      })

      // Update URL without page reload
      window.history.replaceState(null, "", "#contact")
    } else {
      toast({
        title: "Section not found",
        description: "Couldn't find the contact section on this page.",
      })
    }
  }

  return (
    <section className="min-h-screen flex flex-col justify-center pt-20 pb-10 relative">
      {/* Particle background - only on desktop */}
      {showParticles && <ParticleContainer className="absolute inset-0 z-0" />}

      <div className="container mx-auto relative z-10">
        <div className="flex flex-col items-center text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="mb-4"
          >
            <div className="inline-block relative">
              <div className="absolute inset-0 bg-gradient-to-r from-blue-600 to-violet-600 blur-xl opacity-20 rounded-full"></div>
              <h2 className="text-xl md:text-2xl font-medium text-blue-500 relative z-10">Hello, I'm</h2>
            </div>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="text-4xl md:text-6xl lg:text-7xl font-bold mb-6"
          >
            <AnimatedGradientText>Kudzanai Dhospani</AnimatedGradientText>
          </motion.h1>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.4 }}
            className="mb-8 h-8"
          >
            <TypewriterEffect words={words} />
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.6 }}
            className="mb-10"
          >
            <p className="text-gray-400 text-lg md:text-xl max-w-2xl">
              A highly motivated Computer Science student with a passion for innovation and expertise in Java, Python,
              C# and Web development. I am eager to apply my skills to develop impactful solutions.
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.8 }}
            className="flex flex-col sm:flex-row items-center gap-4 mb-16"
          >
            <MagneticButton
              className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-3 rounded-md font-medium"
              onClick={(e) => {
                e.preventDefault()
                handleDownloadCV()
              }}
            >
              <FileDown className="mr-2 h-5 w-5 inline" />
              Download CV
            </MagneticButton>

            <MagneticButton
              className="bg-transparent border border-blue-500 hover:bg-blue-500/20 text-white px-8 py-3 rounded-md font-medium"
              onClick={handleContactClick}
            >
              <Mail className="mr-2 h-5 w-5 inline" />
              Contact Me
            </MagneticButton>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 1 }}
            className="flex items-center gap-6"
          >
            <SocialLink href="https://github.com/kudzanaidos5" icon={<Github size={20} />} />
            <SocialLink href="https://linkedin.com/in/kudzanai-dhospani" icon={<Linkedin size={20} />} />
          </motion.div>
        </div>
      </div>
    </section>
  )
}

function SocialLink({ href, icon }: { href: string; icon: React.ReactNode }) {
  return (
    <motion.a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center hover:bg-blue-600 transition-colors duration-300"
      whileHover={{
        scale: 1.2,
        rotate: 5,
        backgroundColor: "rgba(37, 99, 235, 1)",
      }}
      transition={{ type: "spring", stiffness: 400, damping: 10 }}
    >
      {icon}
    </motion.a>
  )
}
