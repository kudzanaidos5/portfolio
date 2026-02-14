"use client"

import { useState, useEffect } from "react"
import { motion } from "framer-motion"
import { SectionHeading } from "@/components/ui/section-heading"
import { Card } from "@/components/ui/card"
import { TabsContent, Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { getIcon } from "@/lib/icon-library"
import { Code2 } from "lucide-react"

interface Skill {
  name: string
  icon?: string
}

interface SkillCategory {
  id: string
  label: string
  skills: Skill[]
}

export default function Skills() {
  const [skillCategories, setSkillCategories] = useState<SkillCategory[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchSkills = async () => {
      try {
        const response = await fetch("/api/skills")
        if (response.ok) {
          const data = await response.json()
          setSkillCategories(data.categories || [])
        }
      } catch (error) {
        console.error("Failed to fetch skills:", error)
        // Fallback to default data if API fails
        setSkillCategories([
          {
            id: "languages",
            label: "Languages",
            skills: [
              { name: "Java" },
              { name: "Python" },
              { name: "C#" },
              { name: "JavaScript" },
              { name: "HTML/CSS" },
            ],
          },
          {
            id: "frameworks",
            label: "Frameworks",
            skills: [
              { name: "React" },
              { name: "Angular" },
              { name: "Node.js" },
              { name: "Django" },
              { name: "Laravel" },
            ],
          },
          {
            id: "tools",
            label: "Tools & Others",
            skills: [
              { name: "Git" },
              { name: "Database Management" },
              { name: "Networking" },
              { name: "Object-Oriented Programming" },
              { name: "Problem Solving" },
            ],
          },
        ])
      } finally {
        setLoading(false)
      }
    }

    fetchSkills()
  }, [])

  if (loading) {
    return (
      <section id="skills" className="py-20">
        <div className="container mx-auto">
          <SectionHeading>My Skills</SectionHeading>
          <div className="mt-16 text-center text-gray-400">Loading skills...</div>
        </div>
      </section>
    )
  }

  if (skillCategories.length === 0) {
    return (
      <section id="skills" className="py-20">
        <div className="container mx-auto">
          <SectionHeading>My Skills</SectionHeading>
          <div className="mt-16 text-center text-gray-400">No skills to display.</div>
        </div>
      </section>
    )
  }

  return (
    <section id="skills" className="py-20">
      <div className="container mx-auto">
        <SectionHeading>My Skills</SectionHeading>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
          className="mt-16"
        >
          <Tabs defaultValue={skillCategories[0]?.id || "languages"} className="w-full">
            <TabsList className="grid grid-cols-3 max-w-md mx-auto mb-12">
              {skillCategories.map((category) => (
                <TabsTrigger key={category.id} value={category.id} className="data-[state=active]:bg-blue-600">
                  {category.label}
                </TabsTrigger>
              ))}
            </TabsList>

            {skillCategories.map((category) => (
              <TabsContent key={category.id} value={category.id} className="mt-0">
                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-6">
                  {category.skills.map((skill, index) => {
                    const IconComponent = skill.icon ? getIcon(skill.icon) : Code2
                    if (!IconComponent) return null
                    
                    return (
                      <motion.div
                        key={`${skill.name}-${index}`}
                        initial={{ opacity: 0, scale: 0.8 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        transition={{ duration: 0.3, delay: index * 0.05 }}
                        viewport={{ once: true }}
                      >
                        <Card className="bg-black/50 border border-white/10 p-6 h-full hover:bg-black/70 hover:border-blue-500/50 transition-all duration-300 group cursor-pointer">
                          <div className="flex flex-col items-center justify-center space-y-3">
                            <div className="relative">
                              <IconComponent className="w-12 h-12 text-blue-400 group-hover:text-blue-300 transition-colors" />
                              <div className="absolute inset-0 bg-blue-500/20 rounded-full blur-xl opacity-0 group-hover:opacity-100 transition-opacity -z-10" />
                            </div>
                            <h3 className="text-sm font-medium text-white text-center group-hover:text-blue-300 transition-colors">
                              {skill.name}
                            </h3>
                          </div>
                        </Card>
                      </motion.div>
                    )
                  })}
                </div>
              </TabsContent>
            ))}
          </Tabs>
        </motion.div>
      </div>
    </section>
  )
}
