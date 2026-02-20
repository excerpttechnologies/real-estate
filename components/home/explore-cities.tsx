import Image from "next/image"
import Link from "next/link"
import { cities } from "@/lib/data"
import { MapPin } from "lucide-react"

export function ExploreCities() {
  return (
    <section className="bg-secondary/50 py-16">
      <div className="mx-auto max-w-7xl px-4">
        <div className="mb-8 text-center">
          <span className="text-sm font-semibold uppercase tracking-wider text-primary">
            Explore by Location
          </span>
          <h2 className="mt-1 text-2xl font-bold text-foreground md:text-3xl">
            Top Cities
          </h2>
          <p className="mt-2 text-muted-foreground">
            Discover properties in India&apos;s most sought-after cities
          </p>
        </div>

        <div className="grid grid-cols-2 gap-4 md:grid-cols-3 lg:grid-cols-6">
          {cities.map((city) => (
            <Link
              key={city.name}
              href={`/properties?location=${city.name}`}
              className="group relative overflow-hidden rounded-2xl"
            >
              <div className="relative aspect-[3/4]">
                <Image
                  src={city.image}
                  alt={city.name}
                  fill
                  className="object-cover transition-transform duration-300 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-foreground/80 via-foreground/20 to-transparent" />
                <div className="absolute bottom-0 left-0 right-0 p-4">
                  <h3 className="text-sm font-bold text-background md:text-base">
                    {city.name}
                  </h3>
                  <p className="mt-0.5 flex items-center gap-1 text-xs text-background/70">
                    <MapPin className="h-3 w-3" />
                    {city.properties.toLocaleString()} properties
                  </p>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  )
}
