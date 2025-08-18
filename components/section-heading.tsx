import type React from "react"
;('"use client')

export function SectionHeading({ children }: { children: React.ReactNode }) {
  return <h2 className="text-3xl md:text-4xl font-bold text-white text-center">{children}</h2>
}
