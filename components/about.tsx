"use client"

import type React from "react"

import { motion } from "framer-motion"
import { SectionHeading } from "@/components/ui/section-heading"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Mail, Phone, MapPin } from "lucide-react"

export default function About() {
  return (
    <section id="about" className="py-20">
      <div className="container mx-auto">
        <SectionHeading>About Me</SectionHeading>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 mt-16">
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
            className="space-y-6"
          >
            <p className="text-gray-300 text-lg leading-relaxed">
              A highly motivated Computer Science student with a passion for innovation, I possess a knack for tackling
              complex challenges and have developed intermediate-level proficiency in a diverse range of programming
              languages, including Java, Python, and C#.
            </p>
            <p className="text-gray-300 text-lg leading-relaxed">
              My skills extend to a solid understanding of Web development principles and technologies, allowing me to
              contribute meaningfully to projects. I am a quick and enthusiastic learner, eager to further refine my
              technical skills and analytical abilities to develop impactful solutions within a dynamic team
              environment.
            </p>

            <div className="flex flex-wrap gap-3 pt-4">
              <Badge variant="outline" className="bg-blue-500/10 text-blue-400 border-blue-500/30">
                Problem Solving
              </Badge>
              <Badge variant="outline" className="bg-blue-500/10 text-blue-400 border-blue-500/30">
                Team Collaboration
              </Badge>
              <Badge variant="outline" className="bg-blue-500/10 text-blue-400 border-blue-500/30">
                Adaptability
              </Badge>
              <Badge variant="outline" className="bg-blue-500/10 text-blue-400 border-blue-500/30">
                Critical Thinking
              </Badge>
              <Badge variant="outline" className="bg-blue-500/10 text-blue-400 border-blue-500/30">
                Continuous Learning
              </Badge>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
          >
            <Card className="bg-black/50 border border-white/10 overflow-hidden backdrop-blur-sm">
              <CardContent className="p-6">
                <h3 className="text-xl font-semibold text-white mb-6">Personal Information</h3>

                <div className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <InfoItem label="Full Name" value="Kudzanai Denzel Dhospani" />
                    <InfoItem label="Education" value="Bachelor of Technology" />
                    <InfoItem label="Major" value="Computer Science" />
                    <InfoItem label="Study Period" value="2023 - 2027" />
                  </div>

                  <div className="pt-4 space-y-4">
                    <ContactItem icon={<Mail className="w-5 h-5 text-blue-500" />} value="kudzanaidos5@gmail.com" />
                    <ContactItem icon={<Phone className="w-5 h-5 text-blue-500" />} value="+263 78 460 3001" />
                    <ContactItem icon={<MapPin className="w-5 h-5 text-blue-500" />} value="Harare, Zimbabwe" />
                  </div>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        </div>
      </div>
    </section>
  )
}

function InfoItem({ label, value }: { label: string; value: string }) {
  return (
    <div className="space-y-1">
      <p className="text-gray-400 text-sm">{label}</p>
      <p className="text-white font-medium">{value}</p>
    </div>
  )
}

function ContactItem({ icon, value }: { icon: React.ReactNode; value: string }) {
  return (
    <div className="flex items-center gap-3">
      <div className="w-10 h-10 rounded-full bg-blue-500/10 flex items-center justify-center">{icon}</div>
      <span className="text-gray-300">{value}</span>
    </div>
  )
}
