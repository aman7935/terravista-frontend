import { Hero } from "@/components/home/hero"
import { FeaturedProperties } from "@/components/home/featured-properties"
import { WhyTerraVista } from "@/components/home/why-terravista"
import { Testimonials } from "@/components/home/testimonials"
import { CTASection } from "@/components/home/cta-section"

export default function Home() {
  return (
    <>
      <Hero />
      <FeaturedProperties />
      <WhyTerraVista />
      <Testimonials />
      <CTASection />
    </>
  )
}
