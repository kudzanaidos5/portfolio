"use client"

import { motion } from "framer-motion"
import { SectionHeading } from "@/components/ui/section-heading"
import { Card } from "@/components/ui/card"
import { TabsContent, Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { AnimatedCounter } from "@/components/ui/animated-counter"

export default function Skills() {
  const skillCategories = [
    {
      id: "languages",
      label: "Languages",
      skills: [
        { name: "Java", level: 85 },
        { name: "Python", level: 80 },
        { name: "C#", level: 75 },
        { name: "JavaScript", level: 80 },
        { name: "HTML/CSS", level: 85 },
      ],
    },
    {
      id: "frameworks",
      label: "Frameworks",
      skills: [
        { name: "React", level: 80 },
        { name: "Angular", level: 70 },
        { name: "Node.js", level: 75 },
        { name: "Django", level: 70 },
        { name: "Laravel", level: 75 },
      ],
    },
    {
      id: "tools",
      label: "Tools & Others",
      skills: [
        { name: "Git", level: 85 },
        { name: "Database Management", level: 80 },
        { name: "Networking", level: 70 },
        { name: "Object-Oriented Programming", level: 85 },
        { name: "Problem Solving", level: 90 },
      ],
    },
  ]

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
          <Tabs defaultValue="languages" className="w-full">
            <TabsList className="grid grid-cols-3 max-w-md mx-auto mb-12">
              {skillCategories.map((category) => (
                <TabsTrigger key={category.id} value={category.id} className="data-[state=active]:bg-blue-600">
                  {category.label}
                </TabsTrigger>
              ))}
            </TabsList>

            {skillCategories.map((category) => (
              <TabsContent key={category.id} value={category.id} className="mt-0">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {category.skills.map((skill, index) => (
                    <motion.div
                      key={skill.name}
                      initial={{ opacity: 0, y: 20 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.3, delay: index * 0.1 }}
                      viewport={{ once: true }}
                    >
                      <Card className="bg-black/50 border border-white/10 p-6 h-full hover:bg-black/70 transition-colors">
                        <div className="space-y-4">
                          <div className="flex justify-between items-center">
                            <h3 className="text-lg font-medium text-white">{skill.name}</h3>
                            <span className="text-blue-400">
                              <AnimatedCounter from={0} to={skill.level} suffix="%" />
                            </span>
                          </div>
                          <div className="w-full bg-white/10 rounded-full h-2.5 overflow-hidden">
                            <motion.div
                              className="bg-gradient-to-r from-blue-600 to-violet-600 h-2.5 rounded-full"
                              initial={{ width: 0 }}
                              whileInView={{ width: `${skill.level}%` }}
                              transition={{ duration: 1, delay: 0.2 }}
                              viewport={{ once: true }}
                            ></motion.div>
                          </div>
                        </div>
                      </Card>
                    </motion.div>
                  ))}
                </div>
              </TabsContent>
            ))}
          </Tabs>
        </motion.div>
      </div>
    </section>
  )
}
