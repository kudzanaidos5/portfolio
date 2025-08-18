"use client"

import type React from "react"

import { motion } from "framer-motion"

export function SectionHeading({ children }: { children: React.ReactNode }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      viewport={{ once: true }}
      className="text-center"
    >
      <h2 className="text-3xl md:text-4xl font-bold text-white inline-block relative">
        {children}
        <span className="absolute -bottom-2 left-0 right-0 h-1 bg-gradient-to-r from-blue-600 to-violet-600 rounded-full"></span>
      </h2>
    </motion.div>
  )
}
