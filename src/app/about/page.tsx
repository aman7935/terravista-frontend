"use client"

import { motion } from "framer-motion"
import { Building2, Target, Shield, Zap } from "lucide-react"

const stats = [
  { value: "10K+", label: "Properties Listed" },
  { value: "98%", label: "Client Satisfaction" },
  { value: "50+", label: "Cities Covered" },
  { value: "5K+", label: "Happy Clients" },
]

const values = [
  {
    icon: Target,
    title: "Our Mission",
    desc: "To transform the real estate experience through AI-powered intelligence, making property discovery smarter, faster, and more personal.",
  },
  {
    icon: Shield,
    title: "Trust & Transparency",
    desc: "Every listing is verified, every agent is vetted, and every transaction is handled with the highest standards of integrity.",
  },
  {
    icon: Zap,
    title: "Innovation First",
    desc: "We invest heavily in AI and machine learning to give our clients a competitive edge in finding and securing their ideal properties.",
  },
]

export default function AboutPage() {
  return (
    <div>
      <section className="py-20 sm:py-28 text-center">
        <div className="mx-auto max-w-3xl px-4 sm:px-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
          >
            <div className="mx-auto mb-6 flex h-16 w-16 items-center justify-center rounded-2xl bg-gradient-to-br from-violet-500/20 to-indigo-500/10 border border-violet-500/20">
              <Building2 className="h-8 w-8 text-violet-400" />
            </div>
            <h1 className="text-4xl sm:text-5xl font-bold mb-4">
              About TerraVista
            </h1>
            <p className="text-lg text-foreground/60 leading-relaxed">
              We&apos;re redefining real estate with artificial intelligence.
              Founded in 2024, TerraVista has helped thousands of clients find
              their perfect properties across the United States.
            </p>
          </motion.div>
        </div>
      </section>

      <section className="pb-20">
        <div className="mx-auto max-w-5xl px-4 sm:px-6">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {stats.map((stat, i) => (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="text-center rounded-2xl border border-white/10 bg-white/[0.03] p-6"
              >
                <p className="text-3xl font-bold text-violet-300">
                  {stat.value}
                </p>
                <p className="text-sm text-foreground/50 mt-1">{stat.label}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <section className="pb-28">
        <div className="mx-auto max-w-5xl px-4 sm:px-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {values.map((v, i) => (
              <motion.div
                key={v.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="rounded-2xl border border-white/10 bg-gradient-to-b from-white/[0.04] to-transparent p-6"
              >
                <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-br from-violet-500/20 to-indigo-500/10 border border-violet-500/20 mb-4">
                  <v.icon className="h-6 w-6 text-violet-400" />
                </div>
                <h3 className="font-semibold mb-2">{v.title}</h3>
                <p className="text-sm text-foreground/60 leading-relaxed">
                  {v.desc}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </div>
  )
}
