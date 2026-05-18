import type { Property, SuggestedPrompt } from "@/types"
import { apiFetch, streamChat } from "./client"
import { mockProperties, mockPromptSuggestions } from "./data"
import { normalizeProperty, normalizeProperties } from "./normalize"

function encodeQuery(params: Record<string, string | number | undefined>): string {
  const entries = Object.entries(params).filter(
    ([, v]) => v !== undefined && v !== "",
  )
  if (entries.length === 0) return ""
  return "?" + entries.map(([k, v]) => `${k}=${encodeURIComponent(String(v))}`).join("&")
}

export async function fetchProperties(filters?: {
  city?: string
  type?: string
  listingType?: string
  minPrice?: number
  maxPrice?: number
  bedrooms?: number
}): Promise<Property[]> {
  try {
    const data = await apiFetch<unknown[]>(
      `/api/properties${encodeQuery({
        city: filters?.city,
        type: filters?.type,
        listing_type: filters?.listingType,
        min_price: filters?.minPrice,
        max_price: filters?.maxPrice,
        bedrooms: filters?.bedrooms,
      })}`,
    )
    return normalizeProperties(data) as Property[]
  } catch {
    let filtered = [...mockProperties]
    if (filters?.city) filtered = filtered.filter((p) => p.city.toLowerCase().includes(filters.city!.toLowerCase()))
    if (filters?.type) filtered = filtered.filter((p) => p.type === filters.type)
    if (filters?.listingType) filtered = filtered.filter((p) => p.listingType === filters.listingType)
    if (filters?.minPrice) filtered = filtered.filter((p) => p.price >= filters.minPrice!)
    if (filters?.maxPrice) filtered = filtered.filter((p) => p.price <= filters.maxPrice!)
    if (filters?.bedrooms) filtered = filtered.filter((p) => p.bedrooms >= filters.bedrooms!)
    return filtered
  }
}

export async function fetchPropertyBySlug(
  slug: string,
): Promise<Property | undefined> {
  try {
    const data = await apiFetch<Record<string, unknown>>(`/api/properties/${slug}`)
    return normalizeProperty(data) as unknown as Property
  } catch {
    return mockProperties.find((p) => p.slug === slug)
  }
}

export async function fetchFeaturedProperties(): Promise<Property[]> {
  try {
    const data = await apiFetch<unknown[]>("/api/properties/featured")
    return normalizeProperties(data) as Property[]
  } catch {
    return mockProperties.slice(0, 6)
  }
}

export async function sendChatMessage(
  messages: { role: string; content: string }[],
  newMessage: string,
): Promise<string> {
  const res = await apiFetch<{ response: string }>("/api/chat", {
    method: "POST",
    body: JSON.stringify({ messages, message: newMessage }),
  })
  return res.response
}

export function streamChatMessage(
  messages: { role: string; content: string }[],
  newMessage: string,
  signal?: AbortSignal,
): AsyncGenerator<string> {
  return streamChat("/api/chat", { messages, message: newMessage }, signal)
}

export function getSuggestedPrompts(): SuggestedPrompt[] {
  return mockPromptSuggestions
}

export async function healthCheck(): Promise<{ status: string }> {
  return apiFetch<{ status: string }>("/health")
}
