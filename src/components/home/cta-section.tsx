"use client"

import Link from "next/link"
import { motion } from "framer-motion"
import { ArrowRight, Sparkles } from "lucide-react"
import { Button } from "@/components/ui/button"

export function CTASection() {
  return (
    <section className="py-20 sm:py-28">
      <div className="mx-auto max-w-5xl px-4 sm:px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="relative overflow-hidden rounded-3xl border border-violet-500/20 bg-gradient-to-br from-violet-600/20 via-indigo-600/10 to-background p-8 sm:p-12 text-center"
        >
          <div className="absolute top-0 right-0 w-[300px] h-[300px] rounded-full bg-violet-500/20 blur-[100px] -translate-y-1/2 translate-x-1/2" />
          <div className="relative">
            <div className="inline-flex items-center gap-1.5 rounded-full border border-violet-500/30 bg-violet-500/10 px-3 py-1 text-xs text-violet-200 mb-6">
              <Sparkles className="h-3.5 w-3.5" />
              Start Your Journey
            </div>
            <h2 className="text-3xl sm:text-4xl font-bold mb-4">
              Ready to Find Your Dream Property?
            </h2>
            <p className="text-foreground/60 max-w-xl mx-auto mb-8">
              Join thousands of satisfied clients who found their perfect home
              with TerraVista. Let AI guide you to the right choice.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
              <Link href="/properties">
                <Button size="lg" className="gap-2">
                  Browse Properties <ArrowRight className="h-4 w-4" />
                </Button>
              </Link>
              <Link href="/contact">
                <Button variant="outline" size="lg">
                  Talk to an Agent
                </Button>
              </Link>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
