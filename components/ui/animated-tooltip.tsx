"use client"

import type React from "react"

import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"

interface AnimatedTooltipProps {
  content: React.ReactNode
  children: React.ReactNode
  direction?: "top" | "bottom" | "left" | "right"
}

export const AnimatedTooltip = ({ content, children, direction = "top" }: AnimatedTooltipProps) => {
  const [isTooltipVisible, setTooltipVisible] = useState(false)

  const directionMap = {
    top: { y: -10, x: 0 },
    bottom: { y: 10, x: 0 },
    left: { y: 0, x: -10 },
    right: { y: 0, x: 10 },
  }

  const tooltipVariants = {
    hidden: {
      opacity: 0,
      scale: 0.8,
      ...directionMap[direction],
    },
    visible: {
      opacity: 1,
      scale: 1,
      y: direction === "top" ? -5 : direction === "bottom" ? 5 : 0,
      x: direction === "left" ? -5 : direction === "right" ? 5 : 0,
    },
  }

  return (
    <div
      className="relative inline-block"
      onMouseEnter={() => setTooltipVisible(true)}
      onMouseLeave={() => setTooltipVisible(false)}
    >
      {children}
      <AnimatePresence>
        {isTooltipVisible && (
          <motion.div
            className={`absolute z-50 w-max max-w-xs bg-black/90 text-white text-sm py-1.5 px-3 rounded-md shadow-lg backdrop-blur-sm border border-white/10
              ${direction === "top" ? "bottom-full left-1/2 -translate-x-1/2 mb-2" : ""}
              ${direction === "bottom" ? "top-full left-1/2 -translate-x-1/2 mt-2" : ""}
              ${direction === "left" ? "right-full top-1/2 -translate-y-1/2 mr-2" : ""}
              ${direction === "right" ? "left-full top-1/2 -translate-y-1/2 ml-2" : ""}
            `}
            initial="hidden"
            animate="visible"
            exit="hidden"
            variants={tooltipVariants}
            transition={{ duration: 0.2 }}
          >
            {content}
            <div
              className={`absolute w-2 h-2 bg-black/90 border-white/10 transform rotate-45
                ${direction === "top" ? "top-full left-1/2 -translate-x-1/2 -mt-1 border-r border-b" : ""}
                ${direction === "bottom" ? "bottom-full left-1/2 -translate-x-1/2 -mb-1 border-l border-t" : ""}
                ${direction === "left" ? "left-full top-1/2 -translate-y-1/2 -ml-1 border-t border-r" : ""}
                ${direction === "right" ? "right-full top-1/2 -translate-y-1/2 -mr-1 border-b border-l" : ""}
              `}
            />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}
