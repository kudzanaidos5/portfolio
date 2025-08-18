"use client"

import { Button } from "@/components/ui/button"
import { Code, Menu, X } from "lucide-react"
import { motion, AnimatePresence } from "framer-motion"
import Link from "next/link"
import { useState, useEffect } from "react"
import type React from "react"

export default function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [isScrolled, setIsScrolled] = useState(false)

  // Handle scroll effect
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10)
    }

    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen)
  }

  // Function to handle CV download
  const handleDownloadCV = () => {
    const link = document.createElement("a")
    link.href = "/cv.pdf"
    link.download = "cv.pdf"
    link.target = "_blank"
    document.body.appendChild(link)
    link.click()
    document.body.removeChild(link)
  }

  // Function to handle smooth scrolling
  const handleNavClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault()
    e.stopPropagation()

    // Close mobile menu if open
    if (isMenuOpen) {
      setIsMenuOpen(false)
    }

    // Get the target element
    const targetId = href.replace("#", "")
    const targetElement = document.getElementById(targetId)

    if (targetElement) {
      // Calculate offset for fixed header
      const headerHeight = 80
      const elementPosition = targetElement.getBoundingClientRect().top
      const offsetPosition = elementPosition + window.pageYOffset - headerHeight

      window.scrollTo({
        top: offsetPosition,
        behavior: "smooth",
      })

      // Update URL without page reload
      window.history.replaceState(null, "", href)
    }
  }

  return (
    <motion.nav
      initial={{ y: -100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{
        duration: 0.6,
        ease: "easeOut",
        delay: 0.2,
      }}
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled ? "bg-black/90 backdrop-blur-md py-3" : "bg-black/50 backdrop-blur-sm py-4"
      } border-b border-white/10`}
    >
      <div className="container mx-auto px-6 flex items-center justify-between">
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5, delay: 0.4 }}
        >
          <Link href="/" className="flex items-center space-x-2">
            <Code className="w-8 h-8 text-teal-500" />
            <span className="text-white font-medium text-xl">Kudzanai Dhospani</span>
          </Link>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.6 }}
          className="hidden md:flex items-center space-x-8"
        >
          <NavLink href="#about" onClick={handleNavClick} delay={0.7}>
            About
          </NavLink>
          <NavLink href="#skills" onClick={handleNavClick} delay={0.8}>
            Skills
          </NavLink>
          <NavLink href="#projects" onClick={handleNavClick} delay={0.9}>
            Projects
          </NavLink>
          <NavLink href="#education" onClick={handleNavClick} delay={1.0}>
            Education
          </NavLink>
          <NavLink href="#references" onClick={handleNavClick} delay={1.1}>
            References
          </NavLink>
          <NavLink href="#contact" onClick={handleNavClick} delay={1.2}>
            Contact
          </NavLink>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5, delay: 0.8 }}
          className="hidden md:flex items-center space-x-4"
        >
          <Button
            className="bg-teal-600 hover:bg-teal-700 text-white transition-colors duration-200"
            onClick={handleDownloadCV}
          >
            Download CV
          </Button>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.3, delay: 0.5 }}
        >
          <Button variant="ghost" size="icon" className="md:hidden text-white hover:bg-white/10" onClick={toggleMenu}>
            <AnimatePresence mode="wait">
              {isMenuOpen ? (
                <motion.div
                  key="close"
                  initial={{ rotate: -90, opacity: 0 }}
                  animate={{ rotate: 0, opacity: 1 }}
                  exit={{ rotate: 90, opacity: 0 }}
                  transition={{ duration: 0.2 }}
                >
                  <X className="w-6 h-6" />
                </motion.div>
              ) : (
                <motion.div
                  key="menu"
                  initial={{ rotate: 90, opacity: 0 }}
                  animate={{ rotate: 0, opacity: 1 }}
                  exit={{ rotate: -90, opacity: 0 }}
                  transition={{ duration: 0.2 }}
                >
                  <Menu className="w-6 h-6" />
                </motion.div>
              )}
            </AnimatePresence>
          </Button>
        </motion.div>
      </div>

      {/* Mobile menu */}
      <AnimatePresence>
        {isMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3, ease: "easeInOut" }}
            className="md:hidden bg-black/95 backdrop-blur-md border-b border-white/10 overflow-hidden"
          >
            <motion.div
              initial={{ y: -20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: -20, opacity: 0 }}
              transition={{ duration: 0.3, delay: 0.1 }}
              className="container mx-auto px-6 py-4 flex flex-col space-y-4"
            >
              <MobileNavLink href="#about" onClick={(e) => handleNavClick(e, "#about")} delay={0.1}>
                About
              </MobileNavLink>
              <MobileNavLink href="#skills" onClick={(e) => handleNavClick(e, "#skills")} delay={0.15}>
                Skills
              </MobileNavLink>
              <MobileNavLink href="#projects" onClick={(e) => handleNavClick(e, "#projects")} delay={0.2}>
                Projects
              </MobileNavLink>
              <MobileNavLink href="#education" onClick={(e) => handleNavClick(e, "#education")} delay={0.25}>
                Education
              </MobileNavLink>
              <MobileNavLink href="#references" onClick={(e) => handleNavClick(e, "#references")} delay={0.3}>
                References
              </MobileNavLink>
              <MobileNavLink href="#contact" onClick={(e) => handleNavClick(e, "#contact")} delay={0.35}>
                Contact
              </MobileNavLink>
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3, delay: 0.4 }}
              >
                <Button
                  className="bg-teal-600 hover:bg-teal-700 text-white w-full transition-colors duration-200"
                  onClick={handleDownloadCV}
                >
                  Download CV
                </Button>
              </motion.div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.nav>
  )
}

function NavLink({
  href,
  children,
  onClick,
  delay = 0,
}: {
  href: string
  children: React.ReactNode
  onClick: (e: React.MouseEvent<HTMLAnchorElement>, href: string) => void
  delay?: number
}) {
  return (
    <motion.div initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.3, delay }}>
      <Link
        href={href}
        className="text-gray-300 hover:text-white transition-colors duration-200 relative group"
        onClick={(e) => onClick(e, href)}
      >
        {children}
        <motion.span
          className="absolute -bottom-1 left-0 h-0.5 bg-teal-500"
          initial={{ width: 0 }}
          whileHover={{ width: "100%" }}
          transition={{ duration: 0.3, ease: "easeInOut" }}
        />
      </Link>
    </motion.div>
  )
}

function MobileNavLink({
  href,
  onClick,
  children,
  delay = 0,
}: {
  href: string
  onClick: (e: React.MouseEvent<HTMLAnchorElement>) => void
  children: React.ReactNode
  delay?: number
}) {
  return (
    <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.3, delay }}>
      <Link
        href={href}
        className="text-gray-300 hover:text-white transition-colors duration-200 py-2 block"
        onClick={onClick}
      >
        {children}
      </Link>
    </motion.div>
  )
}
