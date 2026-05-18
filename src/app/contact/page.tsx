"use client"

import { motion } from "framer-motion"
import { Mail, Phone, MapPin, Clock } from "lucide-react"
import { Card, CardContent } from "@/components/ui/card"
import { ContactForm } from "@/components/contact/contact-form"

const contactInfo = [
  {
    icon: Phone,
    label: "Phone",
    value: "+1 (800) 555-TERRA",
    desc: "Mon-Fri 9am-6pm EST",
  },
  {
    icon: Mail,
    label: "Email",
    value: "hello@terravista.com",
    desc: "We respond within 24 hours",
  },
  {
    icon: MapPin,
    label: "Office",
    value: "200 Innovation Drive",
    desc: "San Francisco, CA 94105",
  },
  {
    icon: Clock,
    label: "Hours",
    value: "9:00 AM - 6:00 PM",
    desc: "Weekend appointments available",
  },
]

export default function ContactPage() {
  return (
    <div className="mx-auto max-w-5xl px-4 sm:px-6 py-16 sm:py-24">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center mb-12"
      >
        <h1 className="text-4xl sm:text-5xl font-bold mb-4">Get in Touch</h1>
        <p className="text-lg text-foreground/60 max-w-xl mx-auto">
          Have a question about a property or ready to start your search?
          We&apos;d love to hear from you.
        </p>
      </motion.div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.1 }}
        >
          <Card>
            <CardContent className="p-6">
              <h2 className="text-xl font-semibold mb-6">Send a Message</h2>
              <ContactForm />
            </CardContent>
          </Card>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.2 }}
          className="space-y-4"
        >
          {contactInfo.map((info) => (
            <Card key={info.label}>
              <CardContent className="p-5 flex items-start gap-4">
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-gradient-to-br from-violet-500/20 to-indigo-500/10 border border-violet-500/20">
                  <info.icon className="h-5 w-5 text-violet-400" />
                </div>
                <div>
                  <p className="text-xs font-medium text-foreground/50 uppercase tracking-wider">
                    {info.label}
                  </p>
                  <p className="font-medium">{info.value}</p>
                  <p className="text-sm text-foreground/50">{info.desc}</p>
                </div>
              </CardContent>
            </Card>
          ))}
        </motion.div>
      </div>
    </div>
  )
}
