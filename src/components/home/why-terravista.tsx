"use client"

import { motion } from "framer-motion"
import { Brain, Shield, Zap, BarChart3, Users, Globe } from "lucide-react"

const features = [
  {
    icon: Brain,
    title: "AI-Powered Matching",
    description:
      "Our intelligent algorithms analyze your preferences to find properties that truly match your needs — not just keywords.",
  },
  {
    icon: Shield,
    title: "Verified Listings",
    description:
      "Every property is verified for accuracy. No outdated listings, no surprises when you arrive for a viewing.",
  },
  {
    icon: Zap,
    title: "Instant Insights",
    description:
      "Get real-time market data, neighborhood analytics, and price comparisons at your fingertips.",
  },
  {
    icon: BarChart3,
    title: "Smart Analytics",
    description:
      "Track market trends, investment potential, and property value projections with data-driven intelligence.",
  },
  {
    icon: Users,
    title: "Expert Agents",
    description:
      "Connect with top-rated local agents who know the neighborhoods, schools, and hidden gems.",
  },
  {
    icon: Globe,
    title: "Nationwide Coverage",
    description:
      "From coastal villas to urban lofts, we cover 50+ cities across the United States.",
  },
]

export function WhyTerraVista() {
  return (
    <section className="py-20 sm:py-28 bg-gradient-to-b from-transparent via-violet-500/[0.02] to-transparent">
      <div className="mx-auto max-w-7xl px-4 sm:px-6">
        <div className="text-center mb-16">
          <p className="text-xs font-medium text-violet-400 uppercase tracking-widest mb-2">
            Why TerraVista
          </p>
          <h2 className="text-3xl sm:text-4xl font-bold mb-4">
            Smarter Way to Find Your Space
          </h2>
          <p className="text-foreground/50 max-w-2xl mx-auto">
            We combine cutting-edge AI technology with deep real estate expertise
            to deliver a property search experience that&apos;s faster, smarter,
            and more personal.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {features.map((feature, i) => (
            <motion.div
              key={feature.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: i * 0.08 }}
            >
              <div className="group rounded-2xl border border-white/10 bg-gradient-to-b from-white/[0.04] to-transparent p-6 hover:border-violet-500/30 hover:bg-violet-500/[0.03] transition-all duration-300">
                <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-br from-violet-500/20 to-indigo-500/10 border border-violet-500/20 mb-4 group-hover:scale-110 transition-transform duration-300">
                  <feature.icon className="h-6 w-6 text-violet-400" />
                </div>
                <h3 className="font-semibold mb-2">{feature.title}</h3>
                <p className="text-sm text-foreground/60 leading-relaxed">
                  {feature.description}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
