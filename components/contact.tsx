"use client"

import type React from "react"

import { useState } from "react"
import { motion } from "framer-motion"
import { SectionHeading } from "@/components/ui/section-heading"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Mail, Phone, MapPin, Send, Loader2, CheckCircle, AlertCircle, ExternalLink } from "lucide-react"

export default function Contact() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  })
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isSubmitted, setIsSubmitted] = useState(false)
  const [submitMessage, setSubmitMessage] = useState("")
  const [submitError, setSubmitError] = useState("")

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
    // Clear any previous errors when user starts typing
    if (submitError) setSubmitError("")
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)
    setSubmitError("")
    setSubmitMessage("")

    try {
      // Client-side validation
      const trimmedData = {
        name: formData.name.trim(),
        email: formData.email.trim(),
        subject: formData.subject.trim(),
        message: formData.message.trim(),
      }

      if (!trimmedData.name || !trimmedData.email || !trimmedData.subject || !trimmedData.message) {
        setSubmitError("Please fill in all fields.")
        setIsSubmitting(false)
        return
      }

      // Email validation
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
      if (!emailRegex.test(trimmedData.email)) {
        setSubmitError("Please enter a valid email address.")
        setIsSubmitting(false)
        return
      }

      console.log("Submitting form data:", trimmedData)

      // Send to API
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(trimmedData),
      })

      console.log("API Response status:", response.status)

      const result = await response.json()
      console.log("API Response data:", result)

      if (!response.ok) {
        throw new Error(result.error || `Server error: ${response.status}`)
      }

      // Success
      setSubmitMessage(result.message || "Message sent successfully!")
      setFormData({ name: "", email: "", subject: "", message: "" })
      setIsSubmitted(true)

      // Reset success state after 5 seconds
      setTimeout(() => {
        setIsSubmitted(false)
        setSubmitMessage("")
      }, 5000)
    } catch (error) {
      console.error("Form submission error:", error)
      const errorMessage = error instanceof Error ? error.message : "Unknown error occurred"
      setSubmitError(`Failed to send message: ${errorMessage}`)
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <section id="contact" className="py-20">
      <div className="container mx-auto">
        <SectionHeading>Contact Me</SectionHeading>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 mt-16">
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
          >
            <h3 className="text-2xl font-semibold text-white mb-6">Get In Touch</h3>
            <p className="text-gray-300 mb-8">
              Feel free to contact me for any work or suggestions. I'm always open to discussing new projects, creative
              ideas or opportunities to be part of your vision.
            </p>

            <div className="space-y-6">
              <ContactInfo icon={<Mail className="w-6 h-6 text-blue-500" />} title="Email">
                <a href="mailto:kudzanaidos5@gmail.com" className="text-gray-300 hover:text-blue-400 transition-colors">
                  kudzanaidos5@gmail.com
                </a>
              </ContactInfo>

              <ContactInfo icon={<Phone className="w-6 h-6 text-blue-500" />} title="Phone">
                <a href="tel:+263784603001" className="text-gray-300 hover:text-blue-400 transition-colors">
                  +263 78 460 3001
                </a>
              </ContactInfo>

              <ContactInfo icon={<MapPin className="w-6 h-6 text-blue-500" />} title="Location">
                <span className="text-gray-300">Harare, Zimbabwe</span>
              </ContactInfo>
            </div>

            {/* Alternative contact methods */}
            <div className="mt-8 p-4 bg-blue-500/10 border border-blue-500/20 rounded-lg">
              <div className="flex items-center gap-2 mb-2">
                <AlertCircle className="w-5 h-5 text-blue-400" />
                <h4 className="text-blue-400 font-medium">Alternative Contact</h4>
              </div>
              <p className="text-gray-300 text-sm mb-3">If the form isn't working, you can reach me directly:</p>
              <div className="flex flex-col gap-2">
                <a
                  href="mailto:kudzanaidos5@gmail.com?subject=Portfolio Contact"
                  className="text-blue-400 hover:text-blue-300 text-sm flex items-center gap-1"
                >
                  <ExternalLink className="w-4 h-4" />
                  Send direct email
                </a>
                <a
                  href="https://linkedin.com/in/kudzanai-dhospani"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-400 hover:text-blue-300 text-sm flex items-center gap-1"
                >
                  <ExternalLink className="w-4 h-4" />
                  LinkedIn message
                </a>
              </div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
          >
            <Card className="bg-black/50 border border-white/10 p-6 backdrop-blur-sm">
              <h3 className="text-2xl font-semibold text-white mb-6">Send Message</h3>

              {/* Success Message */}
              {submitMessage && (
                <div className="mb-4 p-3 bg-green-500/10 border border-green-500/20 rounded-lg">
                  <p className="text-green-400 text-sm">{submitMessage}</p>
                </div>
              )}

              {/* Error Message */}
              {submitError && (
                <div className="mb-4 p-3 bg-red-500/10 border border-red-500/20 rounded-lg">
                  <p className="text-red-400 text-sm">{submitError}</p>
                </div>
              )}

              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <Input
                    type="text"
                    name="name"
                    placeholder="Your Name *"
                    value={formData.name}
                    onChange={handleChange}
                    required
                    className="bg-white/10 border-white/20 text-white placeholder:text-gray-400 focus:border-blue-500"
                    disabled={isSubmitting}
                  />
                </div>

                <div>
                  <Input
                    type="email"
                    name="email"
                    placeholder="Your Email *"
                    value={formData.email}
                    onChange={handleChange}
                    required
                    className="bg-white/10 border-white/20 text-white placeholder:text-gray-400 focus:border-blue-500"
                    disabled={isSubmitting}
                  />
                </div>

                <div>
                  <Input
                    type="text"
                    name="subject"
                    placeholder="Subject *"
                    value={formData.subject}
                    onChange={handleChange}
                    required
                    className="bg-white/10 border-white/20 text-white placeholder:text-gray-400 focus:border-blue-500"
                    disabled={isSubmitting}
                  />
                </div>

                <div>
                  <Textarea
                    name="message"
                    placeholder="Your Message *"
                    value={formData.message}
                    onChange={handleChange}
                    required
                    className="bg-white/10 border-white/20 text-white placeholder:text-gray-400 min-h-32 focus:border-blue-500"
                    disabled={isSubmitting}
                  />
                </div>

                <Button
                  type="submit"
                  className={`w-full transition-all duration-300 ${
                    isSubmitted ? "bg-green-600 hover:bg-green-700" : "bg-blue-600 hover:bg-blue-700"
                  } text-white`}
                  disabled={isSubmitting || isSubmitted}
                >
                  {isSubmitting ? (
                    <>
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                      Sending Message...
                    </>
                  ) : isSubmitted ? (
                    <>
                      <CheckCircle className="mr-2 h-4 w-4" />
                      Message Sent!
                    </>
                  ) : (
                    <>
                      <Send className="mr-2 h-4 w-4" />
                      Send Message
                    </>
                  )}
                </Button>

                <p className="text-xs text-gray-400 text-center">
                  * Required fields. Your information will be kept confidential.
                </p>
              </form>
            </Card>
          </motion.div>
        </div>
      </div>
    </section>
  )
}

function ContactInfo({ icon, title, children }: { icon: React.ReactNode; title: string; children: React.ReactNode }) {
  return (
    <div className="flex items-start">
      <div className="bg-blue-500/20 p-3 rounded-full mr-4">{icon}</div>
      <div>
        <h4 className="text-lg font-medium text-white mb-1">{title}</h4>
        {children}
      </div>
    </div>
  )
}
