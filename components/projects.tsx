"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { SectionHeading } from "@/components/ui/section-heading"
import { CardContent, CardFooter } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { ExternalLink, Github, ChevronLeft, ChevronRight } from "lucide-react"
import Image from "next/image"
import { Card3d } from "@/components/ui/3d-card"
import { AnimatedTooltip } from "@/components/ui/animated-tooltip"

export default function Projects() {
  const [activeProject, setActiveProject] = useState(0)

  const projects = [
    {
      title: "HATS (HIT Asset Tracking System)",
      description:
        "Developed a system capable of tracking the assets which belong to HIT using the Laravel framework. The system was able to tag assets using QR codes, facilitate the transfer of ownership of assets between staff members and schedule maintenance plans for assets.",
      image: "/hats-logo.png",
      imageFit: "contain" as const,
      imageBg: "bg-white",
      technologies: ["Laravel", "PHP", "MySQL", "QR Code", "JavaScript"],
      demoLink: "https://hit-asset-tracking.vercel.app",
      codeLink: "https://github.com/kudzanaidos5/hats",
    },
    {
      title: "Anti-Money Laundering System",
      description:
        "A system to help financial institutions to easily pick-up, prevent and control money laundering activities. It monitors financial transactions in real time, identify suspicious activities and alert the enforcement in real time to potential fraudulent activities.",
      image: "/placeholder.svg?height=400&width=600",
      technologies: ["Python", "Machine Learning", "Database", "Real-time Monitoring", "Security"],
      demoLink: "https://aml-system-demo.vercel.app",
      codeLink: "https://github.com/kudzanaidos5/aml-system",
    },
    {
      title: "Portfolio Website",
      description:
        "A personal portfolio website built with Next.js and Tailwind CSS to showcase my projects and skills. Features animations, responsive design, and contact form.",
        image: "/portfolio-logo.png",
        imageFit: "contain" as const,
        imageBg: "bg-black",
      technologies: ["Next.js", "React", "TypeScript", "Tailwind CSS", "Framer Motion"],
      demoLink: "https://kudzys-portfolio.vercel.app",
      codeLink: "https://github.com/kudzanaidos5/portfolio",
    },
  ]

  const nextProject = () => {
    setActiveProject((prev) => (prev === projects.length - 1 ? 0 : prev + 1))
  }

  const prevProject = () => {
    setActiveProject((prev) => (prev === 0 ? projects.length - 1 : prev - 1))
  }

  return (
    <section id="projects" className="py-20">
      <div className="container mx-auto">
        <SectionHeading>My Projects</SectionHeading>

        <div className="mt-16 relative">
          <div className="absolute top-1/2 -left-4 md:-left-8 -translate-y-1/2 z-10">
            <Button
              variant="outline"
              size="icon"
              className="rounded-full bg-black/50 border border-white/10 text-white hover:bg-blue-600 hover:text-white"
              onClick={prevProject}
            >
              <ChevronLeft className="h-5 w-5" />
              <span className="sr-only">Previous project</span>
            </Button>
          </div>

          <div className="absolute top-1/2 -right-4 md:-right-8 -translate-y-1/2 z-10">
            <Button
              variant="outline"
              size="icon"
              className="rounded-full bg-black/50 border border-white/10 text-white hover:bg-blue-600 hover:text-white"
              onClick={nextProject}
            >
              <ChevronRight className="h-5 w-5" />
              <span className="sr-only">Next project</span>
            </Button>
          </div>

          <div className="overflow-hidden px-4">
            <motion.div
              className="flex transition-all duration-500 ease-in-out"
              animate={{ x: `-${activeProject * 100}%` }}
              transition={{ duration: 0.5, ease: "easeInOut" }}
            >
              {projects.map((project, index) => (
                <div key={index} className="w-full flex-shrink-0 px-4">
                  <Card3d className="bg-black/50 border border-white/10 overflow-hidden backdrop-blur-sm rounded-xl">
                    <div className={`relative h-64 md:h-80 ${project.imageBg ?? ""}`}>
                      <Image
                        src={project.image || "/placeholder.svg"}
                        alt={project.title}
                        fill
                        className={project.imageFit === "contain" ? "object-contain p-6" : "object-cover"}
                        priority={index === 0}
                      />
                      {project.imageFit !== "contain" && (
                        <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent" />
                      )}
                    </div>
                    <CardContent className="p-6">
                      <h3 className="text-2xl font-semibold text-white mb-3">{project.title}</h3>
                      <p className="text-gray-300 mb-6">{project.description}</p>

                      <div className="flex flex-wrap gap-2 mb-6">
                        {project.technologies.map((tech, techIndex) => (
                          <AnimatedTooltip key={techIndex} content={`Built with ${tech}`} direction="top">
                            <Badge variant="outline" className="bg-blue-500/10 text-blue-400 border-blue-500/30">
                              {tech}
                            </Badge>
                          </AnimatedTooltip>
                        ))}
                      </div>
                    </CardContent>
                    <CardFooter className="px-6 pb-6 pt-0 flex flex-col sm:flex-row gap-3 sm:gap-4 items-stretch sm:items-center">
                      <a href={project.demoLink} target="_blank" rel="noopener noreferrer" className="w-full sm:w-auto">
                        <Button className="w-full sm:w-auto bg-blue-600 hover:bg-blue-700 text-white">
                          <ExternalLink className="mr-2 h-4 w-4" />
                          Live Demo
                        </Button>
                      </a>
                      <a href={project.codeLink} target="_blank" rel="noopener noreferrer" className="w-full sm:w-auto">
                        <Button variant="outline" className="w-full sm:w-auto text-white border-blue-500 hover:bg-blue-500/20">
                          <Github className="mr-2 h-4 w-4" />
                          Source Code
                        </Button>
                      </a>
                    </CardFooter>
                  </Card3d>
                </div>
              ))}
            </motion.div>
          </div>

          <div className="flex justify-center mt-8 gap-2">
            {projects.map((_, index) => (
              <motion.button
                key={index}
                className={`w-3 h-3 rounded-full transition-colors ${
                  activeProject === index ? "bg-blue-600" : "bg-white/20"
                }`}
                onClick={() => setActiveProject(index)}
                aria-label={`Go to project ${index + 1}`}
                whileHover={{ scale: 1.2 }}
                whileTap={{ scale: 0.9 }}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
