"use client"

import { useState } from "react"
import { useQuery } from "@tanstack/react-query"
import { motion, AnimatePresence } from "framer-motion"
import {
  Bed,
  Bath,
  Square,
  MapPin,
  Calendar,
  Home,
  ChevronLeft,
  ChevronRight,
  Phone,
  Mail,
  Share2,
  Heart,
  Check,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent } from "@/components/ui/card"
import { Avatar } from "@/components/ui/avatar"
import { Separator } from "@/components/ui/separator"
import { Skeleton } from "@/components/ui/skeleton"
import { fetchPropertyBySlug } from "@/lib/api"
import { cn } from "@/lib/utils"

interface PropertyDetailProps {
  slug: string
}

export function PropertyDetail({ slug }: PropertyDetailProps) {
  const [currentImage, setCurrentImage] = useState(0)

  const { data: property, isLoading } = useQuery({
    queryKey: ["property", slug],
    queryFn: () => fetchPropertyBySlug(slug),
  })

  if (isLoading) {
    return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-8 space-y-6">
        <Skeleton className="h-[400px] rounded-2xl" />
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2 space-y-4">
            <Skeleton className="h-8 w-3/4" />
            <Skeleton className="h-4 w-1/2" />
            <Skeleton className="h-32 w-full" />
          </div>
          <div className="space-y-4">
            <Skeleton className="h-48 w-full rounded-2xl" />
          </div>
        </div>
      </div>
    )
  }

  if (!property) {
    return (
      <div className="flex flex-col items-center justify-center py-32 text-center">
        <Home className="h-16 w-16 text-foreground/20 mb-4" />
        <p className="text-xl font-medium mb-2">Property not found</p>
        <p className="text-foreground/50 mb-4">
          This property may have been removed or the link is invalid.
        </p>
        <Button onClick={() => window.history.back()}>Go Back</Button>
      </div>
    )
  }

  const nextImage = () =>
    setCurrentImage((p) => (p + 1) % property.images.length)
  const prevImage = () =>
    setCurrentImage((p) => (p - 1 + property.images.length) % property.images.length)

  const badgeVariant: Record<string, "default" | "secondary" | "outline"> = {
    sale: "default",
    rent: "secondary",
    invest: "outline",
  }

  return (
    <div className="mx-auto max-w-7xl px-4 sm:px-6 py-8">
      <div className="relative mb-6 rounded-2xl overflow-hidden bg-white/5">
        <div className="aspect-[16/9] sm:aspect-[21/9] relative">
          <AnimatePresence mode="wait">
            <motion.img
              key={currentImage}
              src={property.images[currentImage]}
              alt={property.title}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
              className="h-full w-full object-cover"
            />
          </AnimatePresence>

          <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent" />

          <div className="absolute top-4 left-4 flex gap-2">
            <Badge
              variant={badgeVariant[property.listingType]}
              className="capitalize text-sm px-3 py-1"
            >
              For {property.listingType}
            </Badge>
            {property.status === "sold" && (
              <Badge variant="destructive" className="text-sm px-3 py-1">
                Sold
              </Badge>
            )}
          </div>

          <div className="absolute top-4 right-4 flex gap-2">
            <Button
              variant="secondary"
              size="icon"
              className="h-9 w-9 bg-black/40 backdrop-blur-sm hover:bg-black/60"
            >
              <Share2 className="h-4 w-4" />
            </Button>
            <Button
              variant="secondary"
              size="icon"
              className="h-9 w-9 bg-black/40 backdrop-blur-sm hover:bg-black/60"
            >
              <Heart className="h-4 w-4" />
            </Button>
          </div>

          {property.images.length > 1 && (
            <>
              <button
                onClick={prevImage}
                className="absolute left-4 top-1/2 -translate-y-1/2 flex h-10 w-10 items-center justify-center rounded-full bg-black/40 backdrop-blur-sm text-white hover:bg-black/60 transition-colors"
              >
                <ChevronLeft className="h-5 w-5" />
              </button>
              <button
                onClick={nextImage}
                className="absolute right-4 top-1/2 -translate-y-1/2 flex h-10 w-10 items-center justify-center rounded-full bg-black/40 backdrop-blur-sm text-white hover:bg-black/60 transition-colors"
              >
                <ChevronRight className="h-5 w-5" />
              </button>
            </>
          )}

          <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-1.5">
            {property.images.map((_, i) => (
              <button
                key={i}
                onClick={() => setCurrentImage(i)}
                className={cn(
                  "h-1.5 rounded-full transition-all duration-300",
                  i === currentImage
                    ? "w-8 bg-white"
                    : "w-1.5 bg-white/50 hover:bg-white/80",
                )}
              />
            ))}
          </div>
        </div>

        <div className="flex gap-2 p-2 overflow-x-auto">
          {property.images.map((img, i) => (
            <button
              key={i}
              onClick={() => setCurrentImage(i)}
              className={cn(
                "shrink-0 rounded-lg overflow-hidden border-2 transition-all duration-200",
                i === currentImage
                  ? "border-violet-500 opacity-100"
                  : "border-transparent opacity-60 hover:opacity-100",
              )}
            >
              <img
                src={img}
                alt=""
                className="h-16 w-24 object-cover"
              />
            </button>
          ))}
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 space-y-6">
          <div>
            <h1 className="text-2xl sm:text-3xl font-bold mb-2">
              {property.title}
            </h1>
            <div className="flex items-center gap-2 text-foreground/50 text-sm mb-4">
              <MapPin className="h-4 w-4" />
              <span>
                {property.address}, {property.city}, {property.state}{" "}
                {property.zip}
              </span>
            </div>
            <p className="text-3xl font-bold text-violet-300">
              {property.priceLabel}
            </p>
          </div>

          <div className="flex flex-wrap gap-6 p-4 rounded-2xl bg-white/5 border border-white/10">
            <div className="flex items-center gap-2">
              <Bed className="h-5 w-5 text-foreground/50" />
              <div>
                <p className="text-lg font-semibold">{property.bedrooms}</p>
                <p className="text-xs text-foreground/50">Bedrooms</p>
              </div>
            </div>
            <div className="h-8 w-px bg-white/10" />
            <div className="flex items-center gap-2">
              <Bath className="h-5 w-5 text-foreground/50" />
              <div>
                <p className="text-lg font-semibold">{property.bathrooms}</p>
                <p className="text-xs text-foreground/50">Bathrooms</p>
              </div>
            </div>
            <div className="h-8 w-px bg-white/10" />
            <div className="flex items-center gap-2">
              <Square className="h-5 w-5 text-foreground/50" />
              <div>
                <p className="text-lg font-semibold">
                  {property.sqft.toLocaleString()}
                </p>
                <p className="text-xs text-foreground/50">Sq. Ft.</p>
              </div>
            </div>
            <div className="h-8 w-px bg-white/10" />
            <div className="flex items-center gap-2">
              <Calendar className="h-5 w-5 text-foreground/50" />
              <div>
                <p className="text-lg font-semibold">{property.yearBuilt}</p>
                <p className="text-xs text-foreground/50">Year Built</p>
              </div>
            </div>
            {property.lotSize && (
              <>
                <div className="h-8 w-px bg-white/10" />
                <div className="flex items-center gap-2">
                  <Home className="h-5 w-5 text-foreground/50" />
                  <div>
                    <p className="text-lg font-semibold">{property.lotSize}</p>
                    <p className="text-xs text-foreground/50">Lot Size</p>
                  </div>
                </div>
              </>
            )}
          </div>

          <div>
            <h2 className="text-lg font-semibold mb-3">About This Property</h2>
            <p className="text-foreground/70 leading-relaxed text-sm">
              {property.description}
            </p>
          </div>

          <Separator />

          <div>
            <h2 className="text-lg font-semibold mb-3">Features & Amenities</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
              {property.features.map((f) => (
                <div key={f} className="flex items-center gap-2 text-sm text-foreground/70">
                  <Check className="h-4 w-4 text-emerald-400 shrink-0" />
                  {f}
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="space-y-4">
          <Card className="sticky top-24">
            <CardContent className="p-5 space-y-4">
              <div className="text-center">
                <p className="text-2xl font-bold">{property.priceLabel}</p>
                <p className="text-xs text-foreground/50">
                  {property.listingType === "rent"
                    ? "per month"
                    : "asking price"}
                </p>
              </div>

              <Separator />

              <div className="flex items-center gap-3">
                <Avatar
                  fallback={property.agentName}
                  src={property.agentPhoto}
                  className="h-12 w-12"
                />
                <div>
                  <p className="font-medium text-sm">{property.agentName}</p>
                  <p className="text-xs text-foreground/50">Listing Agent</p>
                </div>
              </div>

              <div className="space-y-2">
                <Button className="w-full gap-2">
                  <Phone className="h-4 w-4" />
                  Call {property.agentPhone}
                </Button>
                <Button variant="outline" className="w-full gap-2">
                  <Mail className="h-4 w-4" />
                  Email Agent
                </Button>
              </div>

              <p className="text-[11px] text-foreground/30 text-center">
                Listed on {new Date(property.listedDate).toLocaleDateString("en-US", {
                  month: "long",
                  day: "numeric",
                  year: "numeric",
                })}
              </p>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
