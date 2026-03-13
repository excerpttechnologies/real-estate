import Link from "next/link"
import { Button } from "@/app/components/ui/button"
import { ArrowRight, Building2, Phone } from "lucide-react"

export function CtaSection() {
  return (
    <section className="mx-auto max-w-7xl px-4 py-16">
      <div className="relative overflow-hidden rounded-3xl bg-primary px-6 py-12 text-center md:px-12 md:py-16">
        {/* Background decoration */}
        <div className="absolute -right-20 -top-20 h-60 w-60 rounded-full bg-accent/20" />
        <div className="absolute -bottom-10 -left-10 h-40 w-40 rounded-full bg-primary-foreground/5" />

        <div className="relative">
          <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-2xl bg-primary-foreground/10">
            <Building2 className="h-7 w-7 text-primary-foreground" />
          </div>
          <h2 className="mx-auto max-w-md text-balance text-2xl font-bold text-primary-foreground md:text-3xl">
            Ready to Find Your Dream Property?
          </h2>
          <p className="mx-auto mt-3 max-w-md text-pretty text-primary-foreground/80">
            Post your property for free or browse thousands of verified listings.
            Our experts are here to help you every step of the way.
          </p>
          <div className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row">
            <Button
              size="lg"
              className="gap-2 bg-accent text-accent-foreground hover:bg-accent/90"
              asChild
            >
              <Link href="/post-property">
                Post Property Free
                <ArrowRight className="h-4 w-4" />
              </Link>
            </Button>
            <Button
              size="lg"
              variant="outline"
              className="gap-2 border-primary-foreground/30 bg-transparent text-primary-foreground hover:bg-primary-foreground/10 hover:text-primary-foreground"
            >
              <Phone className="h-4 w-4" />
              Talk to Expert
            </Button>
          </div>
        </div>
      </div>
    </section>
  )
}
