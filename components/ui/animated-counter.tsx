"use client"

import { useEffect, useRef, useState } from "react"
import { useInView, motion } from "framer-motion"

interface CounterProps {
  from: number
  to: number
  duration?: number
  className?: string
  suffix?: string
}

export const AnimatedCounter = ({ from, to, duration = 1.5, className = "", suffix = "" }: CounterProps) => {
  const [count, setCount] = useState(from)
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: "-100px" })

  useEffect(() => {
    if (!isInView) return

    let startTime: number
    let animationFrame: number

    const startAnimation = (timestamp: number) => {
      if (!startTime) startTime = timestamp
      const progress = (timestamp - startTime) / (duration * 1000)

      if (progress < 1) {
        const currentCount = Math.floor(from + (to - from) * progress)
        setCount(currentCount)
        animationFrame = requestAnimationFrame(startAnimation)
      } else {
        setCount(to)
      }
    }

    animationFrame = requestAnimationFrame(startAnimation)

    return () => {
      if (animationFrame) {
        cancelAnimationFrame(animationFrame)
      }
    }
  }, [from, to, duration, isInView])

  return (
    <motion.span
      ref={ref}
      className={className}
      initial={{ opacity: 0, scale: 0.5 }}
      animate={isInView ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.5 }}
      transition={{ type: "spring", stiffness: 100, damping: 10 }}
    >
      {count}
      {suffix}
    </motion.span>
  )
}
