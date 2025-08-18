"use client"

import type React from "react"

import { useEffect, useRef, useState } from "react"
import { motion } from "framer-motion"

interface TypewriterEffectProps {
  words: {
    text: string
  }[]
  className?: string
  cursorClassName?: string
}

export const TypewriterEffect: React.FC<TypewriterEffectProps> = ({ words, className = "", cursorClassName = "" }) => {
  const [currentWordIndex, setCurrentWordIndex] = useState(0)
  const [currentText, setCurrentText] = useState("")
  const [isDeleting, setIsDeleting] = useState(false)
  const timeoutRef = useRef<NodeJS.Timeout | null>(null)
  const pauseTimeoutRef = useRef<NodeJS.Timeout | null>(null)

  // Clean up function to clear timeouts
  const clearTimeouts = () => {
    if (timeoutRef.current) clearTimeout(timeoutRef.current)
    if (pauseTimeoutRef.current) clearTimeout(pauseTimeoutRef.current)
  }

  useEffect(() => {
    // Clear any existing timeouts to prevent memory leaks
    clearTimeouts()

    const currentWord = words[currentWordIndex].text
    const typingSpeed = isDeleting ? 50 : 150

    timeoutRef.current = setTimeout(() => {
      if (isDeleting) {
        // Deleting text
        setCurrentText(currentWord.substring(0, currentText.length - 1))

        // If all text is deleted, move to next word
        if (currentText.length === 1) {
          setIsDeleting(false)
          setCurrentWordIndex((prev) => (prev + 1) % words.length)
        }
      } else {
        // Typing text
        setCurrentText(currentWord.substring(0, currentText.length + 1))

        // If word is complete, pause then start deleting
        if (currentText.length === currentWord.length) {
          pauseTimeoutRef.current = setTimeout(() => {
            setIsDeleting(true)
          }, 1500)
        }
      }
    }, typingSpeed)

    // Cleanup function
    return clearTimeouts
  }, [currentText, currentWordIndex, isDeleting, words])

  return (
    <div className={`flex items-center ${className}`}>
      <div className="mr-1">
        <span className="text-blue-500">{currentText}</span>
      </div>
      <motion.div
        animate={{ opacity: [1, 0, 1] }}
        transition={{
          duration: 0.8,
          repeat: Number.POSITIVE_INFINITY,
          repeatType: "loop",
        }}
        className={`inline-block w-1 h-6 bg-blue-500 ${cursorClassName}`}
      />
    </div>
  )
}
