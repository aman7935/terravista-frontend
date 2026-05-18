"use client"

import { useQuery } from "@tanstack/react-query"
import Link from "next/link"
import { motion } from "framer-motion"
import { ArrowRight, Bed, Bath, Square, MapPin } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Skeleton } from "@/components/ui/skeleton"
import { fetchFeaturedProperties } from "@/lib/api"
import { cn } from "@/lib/utils"
import type { Property } from "@/types"

const typeColors: Record<string, "default" | "secondary" | "outline"> = {
  sale: "default",
  rent: "secondary",
  invest: "outline",
}

function PropertyCard({ property, index }: { property: Property; index: number }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.4, delay: index * 0.1 }}
    >
      <Link href={`/properties/${property.slug}`}>
        <Card className="group overflow-hidden hover:border-violet-500/30 hover:shadow-xl hover:shadow-violet-500/5 transition-all duration-500 cursor-pointer h-full">
          <div className="relative overflow-hidden aspect-[4/3]">
            <img
              src={property.images[0]}
              alt={property.title}
              className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-110"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
            <div className="absolute top-3 left-3 flex gap-2">
              <Badge
                variant={typeColors[property.listingType]}
                className="capitalize"
              >
                For {property.listingType}
              </Badge>
              {property.status === "sold" && (
                <Badge variant="destructive">Sold</Badge>
              )}
            </div>
            <div className="absolute bottom-3 left-3 right-3">
              <p className="text-xl font-bold text-white">
                {property.priceLabel}
              </p>
            </div>
          </div>
          <CardContent className="p-4">
            <h3 className="font-semibold text-sm leading-snug mb-2 line-clamp-1 group-hover:text-violet-200 transition-colors">
              {property.title}
            </h3>
            <div className="flex items-center gap-1 text-xs text-foreground/50 mb-3">
              <MapPin className="h-3 w-3 shrink-0" />
              <span className="truncate">
                {property.city}, {property.state}
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
                <Square className="h-3.5 w-3.5" /> {property.sqft.toLocaleString()} ft²
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
      <Skeleton className="aspect-[4/3] rounded-none" />
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

export function FeaturedProperties() {
  const { data: properties, isLoading } = useQuery({
    queryKey: ["featured-properties"],
    queryFn: fetchFeaturedProperties,
  })

  return (
    <section className="py-20 sm:py-28">
      <div className="mx-auto max-w-7xl px-4 sm:px-6">
        <div className="flex flex-col sm:flex-row items-start sm:items-end justify-between gap-4 mb-10">
          <div>
            <p className="text-xs font-medium text-violet-400 uppercase tracking-widest mb-2">
              Featured Listings
            </p>
            <h2 className="text-3xl sm:text-4xl font-bold">
              Premium Properties
            </h2>
            <p className="text-foreground/50 mt-2">
              Hand-picked selections from our finest listings
            </p>
          </div>
          <Link href="/properties">
            <Button variant="outline" className="gap-2 shrink-0">
              View All <ArrowRight className="h-4 w-4" />
            </Button>
          </Link>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {isLoading
            ? [...Array(6)].map((_, i) => <CardSkeleton key={i} />)
            : properties?.map((p, i) => (
                <PropertyCard key={p.id} property={p} index={i} />
              ))}
        </div>
      </div>
    </section>
  )
}
