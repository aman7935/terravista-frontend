export interface Property {
  id: string
  title: string
  slug: string
  price: number
  priceLabel: string
  currency: string
  address: string
  city: string
  state: string
  zip: string
  bedrooms: number
  bathrooms: number
  sqft: number
  lotSize?: string
  yearBuilt: number
  type: string
  listingType: string
  description: string
  features: string[]
  images: string[]
  status: string
  agentName: string
  agentPhoto: string
  agentPhone: string
  agentEmail: string
  latitude: number
  longitude: number
  listedDate: string
}

export interface Message {
  id: string
  role: "user" | "assistant"
  content: string
  timestamp: number
}

export interface SuggestedPrompt {
  id: string
  text: string
}

export interface Testimonial {
  id: string
  name: string
  role: string
  content: string
  rating: number
  avatar: string
}

export interface BlogPost {
  id: string
  title: string
  excerpt: string
  image: string
  date: string
  category: string
  author: string
}
