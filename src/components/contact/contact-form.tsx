"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { Send, Check } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"

export function ContactForm() {
  const [submitted, setSubmitted] = useState(false)

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setSubmitted(true)
  }

  if (submitted) {
    return (
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        className="flex flex-col items-center justify-center py-12 text-center"
      >
        <div className="flex h-16 w-16 items-center justify-center rounded-full bg-emerald-500/20 mb-4">
          <Check className="h-8 w-8 text-emerald-400" />
        </div>
        <h3 className="text-xl font-semibold mb-2">Message Sent!</h3>
        <p className="text-foreground/50">
          Thanks for reaching out. We&apos;ll get back to you within 24 hours.
        </p>
      </motion.div>
    )
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium mb-1.5">First Name</label>
          <Input
            required
            placeholder="John"
            className="bg-white/5 border-white/10"
          />
        </div>
        <div>
          <label className="block text-sm font-medium mb-1.5">Last Name</label>
          <Input
            required
            placeholder="Doe"
            className="bg-white/5 border-white/10"
          />
        </div>
      </div>
      <div>
        <label className="block text-sm font-medium mb-1.5">Email</label>
        <Input
          required
          type="email"
          placeholder="john@example.com"
          className="bg-white/5 border-white/10"
        />
      </div>
      <div>
        <label className="block text-sm font-medium mb-1.5">Phone</label>
        <Input
          type="tel"
          placeholder="+1 (555) 000-0000"
          className="bg-white/5 border-white/10"
        />
      </div>
      <div>
        <label className="block text-sm font-medium mb-1.5">Message</label>
        <textarea
          required
          rows={5}
          placeholder="Tell us about your real estate needs..."
          className="w-full rounded-xl border border-white/10 bg-white/5 px-3 py-2 text-sm text-foreground placeholder:text-foreground/40 focus:outline-none focus:ring-2 focus:ring-violet-500/50 focus:border-violet-500/50 transition-all resize-none"
        />
      </div>
      <Button type="submit" className="w-full gap-2">
        <Send className="h-4 w-4" />
        Send Message
      </Button>
    </form>
  )
}
