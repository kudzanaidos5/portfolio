"use client"

import type React from "react"

import { useEffect, useState } from "react"
import { motion, AnimatePresence } from "framer-motion"

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
  const [typingSpeed, setTypingSpeed] = useState(150)

  useEffect(() => {
    const timeout = setTimeout(() => {
      // Current word being processed
      const currentWord = words[currentWordIndex].text

      // If deleting
      if (isDeleting) {
        setCurrentText(currentWord.substring(0, currentText.length - 1))
        setTypingSpeed(50) // Faster when deleting
      } else {
        // If typing
        setCurrentText(currentWord.substring(0, currentText.length + 1))
        setTypingSpeed(150) // Normal speed when typing
      }

      // If word is complete and not deleting yet, start deleting after a pause
      if (!isDeleting && currentText === currentWord) {
        setTimeout(() => setIsDeleting(true), 1500)
      }
      // If word is deleted
      else if (isDeleting && currentText === "") {
        setIsDeleting(false)
        // Move to next word
        setCurrentWordIndex((prev) => (prev + 1) % words.length)
      }
    }, typingSpeed)

    return () => clearTimeout(timeout)
  }, [currentText, currentWordIndex, isDeleting, typingSpeed, words])

  return (
    <div className={`flex items-center ${className}`}>
      <AnimatePresence mode="wait">
        <motion.div
          key={currentText}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="mr-1"
        >
          {currentText}
        </motion.div>
      </AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{
          duration: 0.5,
          repeat: Number.POSITIVE_INFINITY,
          repeatType: "reverse",
        }}
        className={`inline-block w-1 h-6 bg-teal-500 ${cursorClassName}`}
      />
    </div>
  )
}
