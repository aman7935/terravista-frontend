"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { motion } from "framer-motion"
import { Search, MapPin } from "lucide-react"

export function Hero() {
  const router = useRouter()
  const [searchQuery, setSearchQuery] = useState("")

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault()
    if (searchQuery.trim()) {
      router.push(`/properties?q=${encodeURIComponent(searchQuery.trim())}`)
    }
  }

  return (
    <section className="relative min-h-[90vh] flex items-center overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-b from-violet-500/10 via-transparent to-background" />
      <div className="absolute top-1/4 left-1/4 w-[600px] h-[600px] rounded-full bg-violet-500/10 blur-[120px]" />
      <div className="absolute bottom-1/4 right-1/4 w-[400px] h-[400px] rounded-full bg-indigo-500/10 blur-[100px]" />

      <div className="relative mx-auto max-w-5xl px-4 sm:px-6 text-center">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <h1 className="text-4xl sm:text-5xl md:text-7xl font-bold tracking-tight leading-[1.1] mb-6">
            Find Your Perfect
            <br />
            <span className="bg-gradient-to-r from-violet-400 via-purple-400 to-indigo-400 bg-clip-text text-transparent">
              Property Smarter
            </span>
          </h1>

          <p className="text-lg sm:text-xl text-foreground/60 max-w-2xl mx-auto mb-10 leading-relaxed">
            TerraVista combines AI-powered search with expert local knowledge to
            help you discover, compare, and secure your ideal home or investment
            property.
          </p>

          <form
            onSubmit={handleSearch}
            className="flex items-center gap-2 max-w-xl mx-auto bg-white/5 border border-white/10 rounded-2xl p-2 backdrop-blur-xl"
          >
            <div className="flex items-center gap-2 flex-1 px-3">
              <MapPin className="h-5 w-5 text-foreground/40 shrink-0" />
              <input
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search by city, neighborhood, or address..."
                className="flex-1 bg-transparent text-sm text-foreground placeholder:text-foreground/40 focus:outline-none h-10"
              />
            </div>
            <button
              type="submit"
              className="inline-flex items-center gap-2 rounded-xl bg-gradient-to-r from-violet-600 to-indigo-600 px-5 h-10 text-sm font-medium text-white hover:from-violet-500 hover:to-indigo-500 transition-all duration-200 shadow-lg shadow-violet-500/25"
            >
              <Search className="h-4 w-4" />
              <span className="hidden sm:inline">Search</span>
            </button>
          </form>

          <div className="flex items-center justify-center gap-6 sm:gap-10 mt-8 text-sm text-foreground/50">
            <div>
              <span className="font-bold text-foreground text-lg">10K+</span>
              <p className="text-xs">Properties Listed</p>
            </div>
            <div className="h-8 w-px bg-white/10" />
            <div>
              <span className="font-bold text-foreground text-lg">98%</span>
              <p className="text-xs">Client Satisfaction</p>
            </div>
            <div className="h-8 w-px bg-white/10" />
            <div>
              <span className="font-bold text-foreground text-lg">50+</span>
              <p className="text-xs">Cities Covered</p>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
