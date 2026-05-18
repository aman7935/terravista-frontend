"use client"

import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import {
  SlidersHorizontal,
  ChevronDown,
  Search,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { cn } from "@/lib/utils"

interface Filters {
  query: string
  listingType: string
  type: string
  minPrice: string
  maxPrice: string
  bedrooms: string
}

interface PropertyFiltersProps {
  filters: Filters
  onFiltersChange: (filters: Filters) => void
}

const listingTypes = [
  { value: "", label: "All" },
  { value: "sale", label: "For Sale" },
  { value: "rent", label: "For Rent" },
  { value: "invest", label: "Investment" },
]

const propertyTypes = [
  { value: "", label: "Any Type" },
  { value: "house", label: "House" },
  { value: "apartment", label: "Apartment" },
  { value: "condo", label: "Condo" },
  { value: "townhouse", label: "Townhouse" },
  { value: "villa", label: "Villa" },
]

const bedroomOptions = [
  { value: "", label: "Any Beds" },
  { value: "1", label: "1+" },
  { value: "2", label: "2+" },
  { value: "3", label: "3+" },
  { value: "4", label: "4+" },
  { value: "5", label: "5+" },
]

export function PropertyFilters({ filters, onFiltersChange }: PropertyFiltersProps) {
  const [showMobile, setShowMobile] = useState(false)

  const update = (key: keyof Filters, value: string) => {
    onFiltersChange({ ...filters, [key]: value })
  }

  const activeCount = Object.entries(filters).filter(
    ([k, v]) => k !== "query" && v !== "",
  ).length

  return (
    <div>
      <div className="hidden lg:flex items-center gap-3 flex-wrap">
        <div className="relative flex-1 max-w-xs">
          <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-foreground/40" />
          <Input
            placeholder="Search by city or address..."
            value={filters.query}
            onChange={(e) => update("query", e.target.value)}
            className="pl-10 h-10 bg-white/5 border-white/10"
          />
        </div>

        <div className="flex gap-2">
          {listingTypes.map((lt) => (
            <button
              key={lt.value}
              onClick={() => update("listingType", lt.value)}
              className={cn(
                "rounded-xl px-4 py-2 text-sm font-medium transition-all duration-200",
                filters.listingType === lt.value
                  ? "bg-violet-500/15 text-violet-200 border border-violet-500/30"
                  : "bg-white/5 text-foreground/60 hover:text-foreground hover:bg-white/10 border border-transparent",
              )}
            >
              {lt.label}
            </button>
          ))}
        </div>

        <select
          value={filters.type}
          onChange={(e) => update("type", e.target.value)}
          className="h-10 rounded-xl border border-white/10 bg-white/5 px-3 text-sm text-foreground focus:outline-none focus:border-violet-500/50"
        >
          {propertyTypes.map((pt) => (
            <option key={pt.value} value={pt.value}>
              {pt.label}
            </option>
          ))}
        </select>

        <select
          value={filters.bedrooms}
          onChange={(e) => update("bedrooms", e.target.value)}
          className="h-10 rounded-xl border border-white/10 bg-white/5 px-3 text-sm text-foreground focus:outline-none focus:border-violet-500/50"
        >
          {bedroomOptions.map((b) => (
            <option key={b.value} value={b.value}>
              {b.label}
            </option>
          ))}
        </select>

        <div className="flex items-center gap-2">
          <Input
            placeholder="Min price"
            value={filters.minPrice}
            onChange={(e) => update("minPrice", e.target.value)}
            className="w-28 h-10 bg-white/5 border-white/10 text-sm"
            type="number"
          />
          <span className="text-foreground/30">—</span>
          <Input
            placeholder="Max price"
            value={filters.maxPrice}
            onChange={(e) => update("maxPrice", e.target.value)}
            className="w-28 h-10 bg-white/5 border-white/10 text-sm"
            type="number"
          />
        </div>
      </div>

      <div className="lg:hidden">
        <Button
          variant="outline"
          onClick={() => setShowMobile(!showMobile)}
          className="w-full justify-between"
        >
          <span className="flex items-center gap-2">
            <SlidersHorizontal className="h-4 w-4" />
            Filters
            {activeCount > 0 && (
              <span className="flex h-5 w-5 items-center justify-center rounded-full bg-violet-500 text-[10px] font-medium text-white">
                {activeCount}
              </span>
            )}
          </span>
          <ChevronDown className={cn("h-4 w-4 transition-transform", showMobile && "rotate-180")} />
        </Button>

        <AnimatePresence>
          {showMobile && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              className="overflow-hidden"
            >
              <div className="pt-4 space-y-3">
                <Input
                  placeholder="Search city or address..."
                  value={filters.query}
                  onChange={(e) => update("query", e.target.value)}
                  className="bg-white/5 border-white/10"
                />
                <div className="flex flex-wrap gap-2">
                  {listingTypes.map((lt) => (
                    <button
                      key={lt.value}
                      onClick={() => update("listingType", lt.value)}
                      className={cn(
                        "rounded-lg px-3 py-1.5 text-xs font-medium transition-all",
                        filters.listingType === lt.value
                          ? "bg-violet-500/15 text-violet-200"
                          : "bg-white/5 text-foreground/60",
                      )}
                    >
                      {lt.label}
                    </button>
                  ))}
                </div>
                <div className="grid grid-cols-2 gap-3">
                  <select
                    value={filters.type}
                    onChange={(e) => update("type", e.target.value)}
                    className="h-10 rounded-xl border border-white/10 bg-white/5 px-3 text-sm text-foreground"
                  >
                    {propertyTypes.map((pt) => (
                      <option key={pt.value} value={pt.value}>
                        {pt.label}
                      </option>
                    ))}
                  </select>
                  <select
                    value={filters.bedrooms}
                    onChange={(e) => update("bedrooms", e.target.value)}
                    className="h-10 rounded-xl border border-white/10 bg-white/5 px-3 text-sm text-foreground"
                  >
                    {bedroomOptions.map((b) => (
                      <option key={b.value} value={b.value}>
                        {b.label}
                      </option>
                    ))}
                  </select>
                </div>
                <div className="flex items-center gap-2">
                  <Input
                    placeholder="Min"
                    value={filters.minPrice}
                    onChange={(e) => update("minPrice", e.target.value)}
                    className="h-10 bg-white/5 border-white/10 text-sm"
                    type="number"
                  />
                  <span className="text-foreground/30 shrink-0">to</span>
                  <Input
                    placeholder="Max"
                    value={filters.maxPrice}
                    onChange={(e) => update("maxPrice", e.target.value)}
                    className="h-10 bg-white/5 border-white/10 text-sm"
                    type="number"
                  />
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  )
}
