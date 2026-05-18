import type { Property } from "@/types"

function snakeToCamel(str: string): string {
  return str.replace(/_([a-z])/g, (_, c) => c.toUpperCase())
}

export function normalizeProperty(raw: Record<string, unknown>): Property {
  const out: Record<string, unknown> = {}
  for (const [key, value] of Object.entries(raw)) {
    out[snakeToCamel(key)] = value
  }

  const images = out.images
  const imageArr = Array.isArray(images)
    ? (images as string[])
    : typeof images === "string"
      ? [images as string]
      : []

  const listingType = ((out.listingType as string) || "sale").toLowerCase()
  const price = (out.price as number) || 0

  let priceLabel = out.priceLabel as string
  if (!priceLabel) {
    priceLabel = new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
      maximumFractionDigits: 0,
    }).format(price)
  }
  if (listingType === "rent" && !priceLabel.includes("/mo")) {
    priceLabel = `${priceLabel}/mo`
  }

  return {
    id: (out.id as string) || "",
    title: (out.title as string) || "Untitled Property",
    slug: (out.slug as string) || "",
    price,
    priceLabel,
    currency: (out.currency as string) || "USD",
    address: (out.address as string) || "",
    city: (out.city as string) || "",
    state: (out.state as string) || "",
    zip: (out.zip as string) || "",
    bedrooms: (out.bedrooms as number) || 0,
    bathrooms: (out.bathrooms as number) || 0,
    sqft: (out.sqft as number) || 0,
    lotSize: (out.lotSize as string) || undefined,
    yearBuilt: (out.yearBuilt as number) || 0,
    type: (out.type as string) || "house",
    listingType,
    description: (out.description as string) || "",
    features: (out.features as string[]) || [],
    images: imageArr,
    status: ((out.status as string) || "available").toLowerCase(),
    agentName: (out.agentName as string) || "",
    agentPhoto: (out.agentPhoto as string) || "",
    agentPhone: (out.agentPhone as string) || "",
    agentEmail: (out.agentEmail as string) || "",
    latitude: (out.latitude as number) || 0,
    longitude: (out.longitude as number) || 0,
    listedDate: (out.listedDate as string) || "",
  }
}

export function normalizeProperties(raw: unknown[]): Property[] {
  return raw.map((item) => normalizeProperty(item as Record<string, unknown>))
}
