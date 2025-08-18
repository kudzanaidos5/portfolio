"use client"

import type React from "react"

import { motion } from "framer-motion"
import { Github, Linkedin } from "lucide-react"

export default function Footer() {
  const currentYear = new Date().getFullYear()

  return (
    <footer className="py-8 border-t border-white/10">
      <div className="container mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
          className="flex flex-col md:flex-row justify-between items-center"
        >
          <div className="flex items-center mb-4 md:mb-0">
            <span className="text-white font-medium">
              Kudzanai<span className="text-blue-500">.</span>
            </span>
          </div>

          <div className="text-gray-400 text-sm">
            &copy; {currentYear} Kudzanai Denzel Dhospani. All Rights Reserved
          </div>

          <div className="flex space-x-4 mt-4 md:mt-0">
            <SocialLink href="https://github.com/kudzanaidos5" aria-label="GitHub">
              <Github className="w-5 h-5" />
            </SocialLink>
            <SocialLink href="https://linkedin.com/in/kudzanai-dhospani" aria-label="LinkedIn">
              <Linkedin className="w-5 h-5" />
            </SocialLink>
          </div>
        </motion.div>
      </div>
    </footer>
  )
}

function SocialLink({
  href,
  "aria-label": ariaLabel,
  children,
}: { href: string; "aria-label": string; children: React.ReactNode }) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      aria-label={ariaLabel}
      className="text-gray-400 hover:text-blue-500 transition-colors w-10 h-10 rounded-full bg-white/10 flex items-center justify-center hover:bg-white/20"
    >
      {children}
    </a>
  )
}
