import { SiteHeader } from "@/app/components/site-header"
import { SiteFooter } from "@/app/components/site-footer"
import { HeroSection } from "@/app/components/home/hero-section"
import { FeaturedProperties } from "@/app/components/home/featured-properties"
import { CategoriesSection } from "@/app/components/home/categories-section"
import { ExploreCities } from "@/app/components/home/explore-cities"
import { BuildersSection } from "@/app/components/home/builders-section"
import { TestimonialsSection } from "@/app/components/home/testimonials-section"
import { CtaSection } from "@/app/components/home/cta-section"

export default function HomePage() {
  return (
    <div className="flex min-h-screen flex-col">
      <SiteHeader />
      <main className="flex-1">
        <HeroSection />
        <FeaturedProperties />
        <CategoriesSection />
        <ExploreCities />
        <BuildersSection />
        <TestimonialsSection />
        <CtaSection />
      </main>
      <SiteFooter />
    </div>
  )
}
