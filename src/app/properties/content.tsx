"use client"

import { useState, useEffect } from "react"
import { useQuery } from "@tanstack/react-query"
import { useSearchParams } from "next/navigation"
import { motion } from "framer-motion"
import { PropertyGrid } from "@/components/properties/property-grid"
import { PropertyFilters } from "@/components/properties/property-filters"
import { fetchProperties } from "@/lib/api"

interface Filters {
  query: string
  listingType: string
  type: string
  minPrice: string
  maxPrice: string
  bedrooms: string
}

export function PropertiesPageContent() {
  const searchParams = useSearchParams()

  const [filters, setFilters] = useState<Filters>({
    query: "",
    listingType: "",
    type: "",
    minPrice: "",
    maxPrice: "",
    bedrooms: "",
  })

  useEffect(() => {
    const q = searchParams.get("q") || ""
    const sale = searchParams.has("sale") ? "sale" : ""
    const rent = searchParams.has("rent") ? "rent" : ""
    setFilters((prev) => ({
      ...prev,
      query: q,
      listingType: sale || rent || "",
    }))
  }, [searchParams])

  const { data: properties, isLoading } = useQuery({
    queryKey: ["properties", filters],
    queryFn: () =>
      fetchProperties({
        city: filters.query || undefined,
        listingType: filters.listingType || undefined,
        type: filters.type || undefined,
        minPrice: filters.minPrice ? Number(filters.minPrice) : undefined,
        maxPrice: filters.maxPrice ? Number(filters.maxPrice) : undefined,
        bedrooms: filters.bedrooms ? Number(filters.bedrooms) : undefined,
      }),
  })

  return (
    <div className="mx-auto max-w-7xl px-4 sm:px-6 py-8">
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        className="mb-8"
      >
        <h1 className="text-3xl font-bold mb-2">Browse Properties</h1>
        <p className="text-foreground/50">
          {isLoading
            ? "Searching..."
            : `${properties?.length || 0} properties found`}
        </p>
      </motion.div>

      <div className="mb-6">
        <PropertyFilters filters={filters} onFiltersChange={setFilters} />
      </div>

      <PropertyGrid properties={properties || []} isLoading={isLoading} />
    </div>
  )
}
