"use client"

import { motion } from "framer-motion"
import { SectionHeading } from "@/components/ui/section-heading"
import { Card } from "@/components/ui/card"
import { GraduationCap, Calendar, MapPin } from "lucide-react"

export default function Education() {
  return (
    <section id="education" className="py-20">
      <div className="container mx-auto">
        <SectionHeading>Education</SectionHeading>

        <div className="max-w-3xl mx-auto mt-16">
          <div className="relative">
            {/* Timeline line */}
            <motion.div
              className="absolute left-0 md:left-1/2 top-0 h-full w-px bg-gradient-to-b from-blue-600 to-violet-600 transform md:-translate-x-1/2"
              initial={{ height: 0 }}
              whileInView={{ height: "100%" }}
              transition={{ duration: 1.5 }}
              viewport={{ once: true }}
            ></motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              viewport={{ once: true }}
              className="relative z-10 mb-12"
            >
              <div className="flex flex-col md:flex-row items-center">
                <div className="flex-1 md:text-right md:pr-8 order-2 md:order-1">
                  <motion.div whileHover={{ scale: 1.03 }} transition={{ type: "spring", stiffness: 300, damping: 10 }}>
                    <Card className="bg-black/50 border border-white/10 p-6 backdrop-blur-sm">
                      <h3 className="text-xl font-semibold text-white">Bachelor of Technology in Computer Science</h3>
                      <h4 className="text-lg text-blue-400 mb-2">Harare Institute of Technology</h4>
                      <div className="flex items-center justify-end mb-4 text-gray-400">
                        <Calendar className="w-4 h-4 mr-2" />
                        <span>2023 – 2027</span>
                      </div>
                      <p className="text-gray-300">
                        Currently pursuing a Bachelor's degree in Computer Science, focusing on software development,
                        algorithms, data structures, and database management. Participating in various projects and
                        extracurricular activities to enhance practical skills.
                      </p>
                    </Card>
                  </motion.div>
                </div>

                <motion.div
                  className="order-1 md:order-2 mb-4 md:mb-0"
                  initial={{ scale: 0 }}
                  whileInView={{ scale: 1 }}
                  transition={{ type: "spring", stiffness: 260, damping: 20 }}
                  viewport={{ once: true }}
                >
                  <div className="w-12 h-12 rounded-full bg-gradient-to-r from-blue-600 to-violet-600 flex items-center justify-center mx-auto">
                    <GraduationCap className="w-6 h-6 text-white" />
                  </div>
                </motion.div>

                <div className="flex-1 md:pl-8 order-3">
                  <motion.div
                    className="flex items-center text-gray-400 mb-2"
                    initial={{ opacity: 0, x: 20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.5, delay: 0.2 }}
                    viewport={{ once: true }}
                  >
                    <MapPin className="w-4 h-4 mr-2" />
                    <span>Harare, Zimbabwe</span>
                  </motion.div>
                </div>
              </div>
            </motion.div>

            {/* Additional education entries can be added here */}
          </div>
        </div>
      </div>
    </section>
  )
}
