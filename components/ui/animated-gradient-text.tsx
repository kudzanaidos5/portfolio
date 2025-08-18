"use client"

import { cn } from "@/lib/utils"
import { motion } from "framer-motion"
import type React from "react"

export const AnimatedGradientText = ({
  children,
  className,
}: {
  children: React.ReactNode
  className?: string
}) => {
  return (
    <motion.span
      className={cn(
        "bg-clip-text text-transparent bg-gradient-to-r from-blue-500 via-violet-500 to-purple-500",
        className,
      )}
      initial={{ backgroundPosition: "0% 50%" }}
      animate={{
        backgroundPosition: ["0% 50%", "100% 50%", "0% 50%"],
      }}
      transition={{ duration: 5, repeat: Number.POSITIVE_INFINITY, ease: "linear" }}
    >
      {children}
    </motion.span>
  )
}
