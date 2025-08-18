"use client"

import { useEffect, useRef, useState } from "react"
import { motion } from "framer-motion"

export function LoadingAnimation() {
  const [progress, setProgress] = useState(0)
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const [dimensions, setDimensions] = useState({ width: 0, height: 0 })
  const [showSkipButton, setShowSkipButton] = useState(false)

  // Update dimensions on mount and window resize
  useEffect(() => {
    const updateDimensions = () => {
      setDimensions({
        width: window.innerWidth,
        height: window.innerHeight,
      })
    }

    updateDimensions()
    window.addEventListener("resize", updateDimensions)

    // Show skip button after a short delay
    const timer = setTimeout(() => {
      setShowSkipButton(true)
    }, 1000)

    return () => {
      window.removeEventListener("resize", updateDimensions)
      clearTimeout(timer)
    }
  }, [])

  // Matrix rain effect
  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext("2d")
    if (!ctx) return

    canvas.width = dimensions.width
    canvas.height = dimensions.height

    const fontSize = 14
    const columns = Math.floor(dimensions.width / fontSize)

    // Characters to display (mix of binary, hex, and symbols)
    const chars = "01アイウエオカキクケコサシスセソタチツテトナニヌネノハヒフヘホマミムメモヤユヨラリルレロワヲン"

    // Initialize drops at random positions
    const drops: number[] = []
    for (let i = 0; i < columns; i++) {
      drops[i] = Math.random() * -100
    }

    let animationFrameId: number

    const draw = () => {
      // Semi-transparent black to create fade effect
      ctx.fillStyle = "rgba(0, 0, 0, 0.05)"
      ctx.fillRect(0, 0, canvas.width, canvas.height)

      // Text color - using blue gradient
      const blueShade = Math.floor(Math.random() * 50) + 150
      ctx.fillStyle = `rgb(0, ${blueShade}, ${blueShade + 50})`
      ctx.font = `${fontSize}px monospace`

      for (let i = 0; i < drops.length; i++) {
        // Random character
        const text = chars[Math.floor(Math.random() * chars.length)]

        // x coordinate of the drop
        const x = i * fontSize

        // y coordinate of the drop
        const y = drops[i] * fontSize

        // Draw the character
        ctx.fillText(text, x, y)

        // Reset drop to top with random delay if it's at the bottom
        if (y > canvas.height && Math.random() > 0.975) {
          drops[i] = 0
        }

        // Move drop down
        drops[i]++
      }

      animationFrameId = requestAnimationFrame(draw)
    }

    draw()

    return () => {
      cancelAnimationFrame(animationFrameId)
    }
  }, [dimensions])

  // Simulate loading progress
  useEffect(() => {
    const interval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval)
          return 100
        }
        return prev + 1
      })
    }, 30)

    return () => clearInterval(interval)
  }, [])

  return (
    <motion.div
      className="fixed inset-0 bg-black z-50 flex flex-col items-center justify-center overflow-hidden"
      initial={{ opacity: 1 }}
      animate={{ opacity: progress === 100 ? 0 : 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5 }}
    >
      {/* Matrix rain background */}
      <canvas ref={canvasRef} className="absolute inset-0" />

      {/* Central loading element */}
      <div className="relative z-10 flex flex-col items-center justify-center">
        {/* Animated logo */}
        <motion.div
          className="mb-8 relative"
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.5 }}
        >
          <div className="relative w-32 h-32">
            {/* Rotating circles */}
            <motion.div
              className="absolute inset-0 rounded-full border-4 border-t-blue-500 border-r-transparent border-b-transparent border-l-transparent"
              animate={{ rotate: 360 }}
              transition={{ duration: 2, repeat: Number.POSITIVE_INFINITY, ease: "linear" }}
            />
            <motion.div
              className="absolute inset-2 rounded-full border-4 border-r-violet-500 border-t-transparent border-b-transparent border-l-transparent"
              animate={{ rotate: -360 }}
              transition={{ duration: 3, repeat: Number.POSITIVE_INFINITY, ease: "linear" }}
            />
            <motion.div
              className="absolute inset-4 rounded-full border-4 border-b-teal-500 border-t-transparent border-r-transparent border-l-transparent"
              animate={{ rotate: 360 }}
              transition={{ duration: 2.5, repeat: Number.POSITIVE_INFINITY, ease: "linear" }}
            />

            {/* Central icon */}
            <div className="absolute inset-0 flex items-center justify-center">
              <motion.div
                className="text-4xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-500 via-violet-500 to-teal-500"
                animate={{ scale: [1, 1.1, 1] }}
                transition={{ duration: 2, repeat: Number.POSITIVE_INFINITY }}
              >
                KD
              </motion.div>
            </div>
          </div>
        </motion.div>

        {/* Loading text */}
        <motion.div
          className="text-center mb-8"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
        >
          <h2 className="text-2xl font-bold text-white mb-2">
            <LoadingText />
          </h2>
          <p className="text-blue-400 font-mono">Initializing Portfolio</p>
        </motion.div>

        {/* Progress bar */}
        <div className="w-64 md:w-96">
          <div className="w-full bg-gray-800 rounded-full h-2.5 mb-2 overflow-hidden">
            <motion.div
              className="h-full rounded-full bg-gradient-to-r from-blue-600 via-violet-600 to-teal-600 relative"
              style={{ width: `${progress}%` }}
              initial={{ width: "0%" }}
              animate={{
                width: `${progress}%`,
                background: [
                  "linear-gradient(to right, #2563eb, #7c3aed, #0d9488)",
                  "linear-gradient(to right, #7c3aed, #0d9488, #2563eb)",
                  "linear-gradient(to right, #0d9488, #2563eb, #7c3aed)",
                  "linear-gradient(to right, #2563eb, #7c3aed, #0d9488)",
                ],
              }}
              transition={{
                duration: 0.2,
                background: {
                  duration: 3,
                  repeat: Number.POSITIVE_INFINITY,
                  ease: "linear",
                },
              }}
            />
          </div>
          <div className="flex justify-between items-center">
            <div className="text-xs text-gray-400 font-mono">Compiling</div>
            <div className="text-xs text-gray-400 font-mono">{progress}%</div>
          </div>
        </div>

        {/* Skip button */}
        {showSkipButton && (
          <motion.button
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="mt-8 px-4 py-2 text-sm text-gray-400 hover:text-white bg-white/5 hover:bg-white/10 rounded-md transition-colors"
            onClick={() => setProgress(100)}
          >
            Skip Animation
          </motion.button>
        )}
      </div>
    </motion.div>
  )
}

// Animated loading text component
function LoadingText() {
  const phrases = [
    "Compiling Algorithms",
    "Initializing Components",
    "Loading Experience",
    "Rendering Skills",
    "Optimizing Portfolio",
  ]

  const [index, setIndex] = useState(0)

  useEffect(() => {
    const interval = setInterval(() => {
      setIndex((prev) => (prev + 1) % phrases.length)
    }, 2000)

    return () => clearInterval(interval)
  }, [])

  return (
    <motion.span
      key={phrases[index]}
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -10 }}
      transition={{ duration: 0.3 }}
    >
      {phrases[index]}
    </motion.span>
  )
}
