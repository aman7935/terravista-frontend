"use client"

import Link from "next/link"
import { motion } from "framer-motion"
import { Bed, Bath, Square, MapPin } from "lucide-react"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Skeleton } from "@/components/ui/skeleton"
import type { Property } from "@/types"

const typeColors: Record<string, "default" | "secondary" | "outline"> = {
  sale: "default",
  rent: "secondary",
  invest: "outline",
}

interface PropertyGridProps {
  properties: Property[]
  isLoading?: boolean
}

function PropertyCard({ property, index }: { property: Property; index: number }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3, delay: index * 0.03 }}
    >
      <Link href={`/properties/${property.slug}`}>
        <Card className="group overflow-hidden hover:border-violet-500/30 hover:shadow-xl hover:shadow-violet-500/5 transition-all duration-500 cursor-pointer h-full">
          <div className="relative overflow-hidden aspect-[16/11]">
            <img
              src={property.images[0]}
              alt={property.title}
              className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-110"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent" />
            <div className="absolute top-3 left-3">
              <Badge
                variant={typeColors[property.listingType]}
                className="capitalize"
              >
                For {property.listingType}
              </Badge>
            </div>
            {property.status === "sold" && (
              <div className="absolute top-3 right-3">
                <Badge variant="destructive">Sold</Badge>
              </div>
            )}
            <div className="absolute bottom-3 left-3 right-3">
              <p className="text-lg font-bold text-white">
                {property.priceLabel}
              </p>
            </div>
          </div>
          <CardContent className="p-4">
            <h3 className="font-semibold text-sm leading-snug mb-1.5 line-clamp-1 group-hover:text-violet-200 transition-colors">
              {property.title}
            </h3>
            <div className="flex items-center gap-1 text-xs text-foreground/50 mb-3">
              <MapPin className="h-3 w-3 shrink-0" />
              <span className="truncate">
                {property.city}, {property.state} {property.zip}
              </span>
            </div>
            <div className="flex items-center gap-4 text-xs text-foreground/60">
              <span className="flex items-center gap-1">
                <Bed className="h-3.5 w-3.5" /> {property.bedrooms}
              </span>
              <span className="flex items-center gap-1">
                <Bath className="h-3.5 w-3.5" /> {property.bathrooms}
              </span>
              <span className="flex items-center gap-1">
                <Square className="h-3.5 w-3.5" /> {property.sqft.toLocaleString()}
              </span>
            </div>
          </CardContent>
        </Card>
      </Link>
    </motion.div>
  )
}

function CardSkeleton() {
  return (
    <Card className="overflow-hidden">
      <Skeleton className="aspect-[16/11] rounded-none" />
      <CardContent className="p-4 space-y-2">
        <Skeleton className="h-4 w-3/4" />
        <Skeleton className="h-3 w-1/2" />
        <div className="flex gap-4 pt-1">
          <Skeleton className="h-3 w-12" />
          <Skeleton className="h-3 w-12" />
          <Skeleton className="h-3 w-16" />
        </div>
      </CardContent>
    </Card>
  )
}

export function PropertyGrid({ properties, isLoading }: PropertyGridProps) {
  if (isLoading) {
    return (
      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-5">
        {[...Array(9)].map((_, i) => (
          <CardSkeleton key={i} />
        ))}
      </div>
    )
  }

  if (properties.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-20 text-center">
        <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-white/5 border border-white/10 mb-4">
          <MapPin className="h-8 w-8 text-foreground/30" />
        </div>
        <p className="text-lg font-medium mb-1">No properties found</p>
        <p className="text-sm text-foreground/50">
          Try adjusting your filters or search criteria
        </p>
      </div>
    )
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-5">
      {properties.map((property, index) => (
        <PropertyCard key={property.id} property={property} index={index} />
      ))}
    </div>
  )
}
