"use client"

import { motion } from "framer-motion"
import { SectionHeading } from "@/components/ui/section-heading"
import { Card } from "@/components/ui/card"
import { Mail, Phone, User } from "lucide-react"

export default function References() {
  const references = [
    {
      name: "Mr Ediger Mutevani",
      position: "Mentor",
      organization: "Harare Institute of Technology",
      email: "emutevani@hit.ac.zw",
      phone: "+263 77 330 1456",
    },
    {
      name: "Mr Arthur Ndlovu",
      position: "Internship Co-ordinator",
      organization: "Harare Institute of Technology",
      email: "andlovu@hit.ac.zw",
      phone: "+263 77 734 0492",
    },
  ]

  return (
    <section id="references" className="py-20">
      <div className="container mx-auto">
        <SectionHeading>References</SectionHeading>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-16">
          {references.map((reference, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.2 }}
              viewport={{ once: true }}
            >
              <Card className="bg-black/50 border border-white/10 p-6 h-full backdrop-blur-sm hover:border-blue-500/30 transition-colors">
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 rounded-full bg-blue-500/20 flex items-center justify-center flex-shrink-0">
                    <User className="w-6 h-6 text-blue-400" />
                  </div>
                  <div className="space-y-4">
                    <div>
                      <h3 className="text-xl font-semibold text-white">{reference.name}</h3>
                      <p className="text-blue-400">{reference.position}</p>
                      <p className="text-gray-400">{reference.organization}</p>
                    </div>
                    <div className="space-y-2">
                      <div className="flex items-center gap-2 text-gray-300">
                        <Mail className="w-4 h-4 text-blue-500" />
                        <a href={`mailto:${reference.email}`} className="hover:text-blue-400 transition-colors">
                          {reference.email}
                        </a>
                      </div>
                      <div className="flex items-center gap-2 text-gray-300">
                        <Phone className="w-4 h-4 text-blue-500" />
                        <a href={`tel:${reference.phone}`} className="hover:text-blue-400 transition-colors">
                          {reference.phone}
                        </a>
                      </div>
                    </div>
                  </div>
                </div>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
