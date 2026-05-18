import { PropertyDetail } from "@/components/properties/property-detail"
import { mockProperties } from "@/lib/data"
import type { Metadata } from "next"

interface Props {
  params: Promise<{ slug: string }>
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params
  const property = mockProperties.find((p) => p.slug === slug)
  if (!property) return { title: "Property Not Found — TerraVista" }
  return {
    title: `${property.title} — TerraVista`,
    description: property.description.slice(0, 160),
  }
}

export async function generateStaticParams() {
  return mockProperties.map((p) => ({ slug: p.slug }))
}

export default async function PropertyPage({ params }: Props) {
  const { slug } = await params
  return (
    <div>
      <PropertyDetail slug={slug} />
    </div>
  )
}
