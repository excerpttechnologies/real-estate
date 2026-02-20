import Link from "next/link"
import { builders } from "@/lib/data"
import { Star, ArrowRight } from "lucide-react"
import { Button } from "@/components/ui/button"

export function BuildersSection() {
  return (
    <section className="mx-auto max-w-7xl px-4 py-16">
      <div className="mb-8 flex items-end justify-between">
        <div>
          <span className="text-sm font-semibold uppercase tracking-wider text-primary">
            Trusted Partners
          </span>
          <h2 className="mt-1 text-2xl font-bold text-foreground md:text-3xl">
            Top Builders
          </h2>
          <p className="mt-2 text-muted-foreground">
            Work with India&apos;s most reputed property developers
          </p>
        </div>
        <Button variant="ghost" className="hidden gap-1.5 text-primary md:inline-flex">
          View All
          <ArrowRight className="h-4 w-4" />
        </Button>
      </div>

      <div className="grid grid-cols-2 gap-4 md:grid-cols-3 lg:grid-cols-6">
        {builders.map((builder) => (
          <Link
            key={builder.id}
            href="/properties"
            className="flex flex-col items-center rounded-2xl border border-border bg-card p-6 text-center shadow-sm transition-all hover:shadow-md"
          >
            <div className="flex h-14 w-14 items-center justify-center rounded-xl bg-primary/10 text-xl font-bold text-primary">
              {builder.logo}
            </div>
            <h3 className="mt-3 text-sm font-semibold text-foreground">
              {builder.name}
            </h3>
            <div className="mt-1.5 flex items-center gap-1">
              <Star className="h-3 w-3 fill-accent text-accent" />
              <span className="text-xs font-medium text-foreground">
                {builder.rating}
              </span>
            </div>
            <p className="mt-1 text-xs text-muted-foreground">
              {builder.projects} Projects
            </p>
          </Link>
        ))}
      </div>
    </section>
  )
}
