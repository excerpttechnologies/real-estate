// "use client"

// import { useState } from "react"
// import Link from "next/link"
// import { Button } from "@/app/components/ui/button"
// import { PropertyCard } from "@/app/components/property-card"
// import { properties } from "@/app/lib/data"
// import { ArrowRight, ChevronLeft, ChevronRight } from "lucide-react"

// export function FeaturedProperties() {
//   const featured = properties.filter((p) => p.featured)
//   const [startIndex, setStartIndex] = useState(0)
//   const visibleCount = 3

//   const canGoBack = startIndex > 0
//   const canGoForward = startIndex + visibleCount < featured.length

//   return (
//     <section className="mx-auto max-w-7xl px-4 py-16">
//       <div className="mb-8 flex items-end justify-between">
//         <div>
//           <span className="text-sm font-semibold uppercase tracking-wider text-primary">
//             Handpicked for You
//           </span>
//           <h2 className="mt-1 text-2xl font-bold text-foreground md:text-3xl">
//             Featured Properties
//           </h2>
//           <p className="mt-2 text-muted-foreground">
//             Premium listings verified by our team
//           </p>
//         </div>
//         <div className="hidden items-center gap-2 md:flex">
//           <button
//             onClick={() => setStartIndex(Math.max(0, startIndex - 1))}
//             disabled={!canGoBack}
//             className="flex h-9 w-9 items-center justify-center rounded-full border border-border text-foreground transition-colors hover:bg-secondary disabled:opacity-30"
//             aria-label="Previous"
//           >
//             <ChevronLeft className="h-4 w-4" />
//           </button>
//           <button
//             onClick={() =>
//               setStartIndex(
//                 Math.min(featured.length - visibleCount, startIndex + 1)
//               )
//             }
//             disabled={!canGoForward}
//             className="flex h-9 w-9 items-center justify-center rounded-full border border-border text-foreground transition-colors hover:bg-secondary disabled:opacity-30"
//             aria-label="Next"
//           >
//             <ChevronRight className="h-4 w-4" />
//           </button>
//         </div>
//       </div>

//       <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
//         {featured.slice(startIndex, startIndex + visibleCount).map((property) => (
//           <PropertyCard key={property.id} property={property} />
//         ))}
//       </div>

//       <div className="mt-8 text-center">
//         <Button variant="outline" className="gap-2" asChild>
//           <Link href="/properties">
//             View All Properties
//             <ArrowRight className="h-4 w-4" />
//           </Link>
//         </Button>
//       </div>
//     </section>
//   )
// }



"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { Button } from "@/app/components/ui/button"
import { PropertyCard } from "@/app/components/property-card"
import { ArrowRight, ChevronLeft, ChevronRight, Loader2 } from "lucide-react"

interface Property {
  _id: string
  title: string
  price: number
  priceLabel: string
  location: string
  city: string
  area: number
  bedrooms: number
  bathrooms: number
  type: string
  status: string
  furnishing: string
  postedBy: string | { name: string }
  verified: boolean
  featured: boolean
  images: string[]
  listingType: string
}

export function FeaturedProperties() {
  const [properties, setProperties] = useState<Property[]>([])
  const [loading, setLoading] = useState(true)
  const [startIndex, setStartIndex] = useState(0)
  const visibleCount = 3

  useEffect(() => {
    async function fetchFeatured() {
      try {
        const res = await fetch("/api/properties?featured=true&limit=6")
        const data = await res.json()
        if (res.ok) setProperties(data.properties || [])
      } catch {
        console.error("Failed to fetch featured properties")
      } finally {
        setLoading(false)
      }
    }
    fetchFeatured()
  }, [])

  const canGoBack = startIndex > 0
  const canGoForward = startIndex + visibleCount < properties.length

  return (
    <section className="mx-auto max-w-7xl px-4 py-16">
      <div className="mb-8 flex items-end justify-between">
        <div>
          <span className="text-sm font-semibold uppercase tracking-wider text-primary">
            Handpicked for You
          </span>
          <h2 className="mt-1 text-2xl font-bold text-foreground md:text-3xl">
            Featured Properties
          </h2>
          <p className="mt-2 text-muted-foreground">
            Premium listings verified by our team
          </p>
        </div>
        <div className="hidden items-center gap-2 md:flex">
          <button
            onClick={() => setStartIndex(Math.max(0, startIndex - 1))}
            disabled={!canGoBack}
            className="flex h-9 w-9 items-center justify-center rounded-full border border-border text-foreground transition-colors hover:bg-secondary disabled:opacity-30"
            aria-label="Previous"
          >
            <ChevronLeft className="h-4 w-4" />
          </button>
          <button
            onClick={() =>
              setStartIndex(
                Math.min(properties.length - visibleCount, startIndex + 1)
              )
            }
            disabled={!canGoForward}
            className="flex h-9 w-9 items-center justify-center rounded-full border border-border text-foreground transition-colors hover:bg-secondary disabled:opacity-30"
            aria-label="Next"
          >
            <ChevronRight className="h-4 w-4" />
          </button>
        </div>
      </div>

      {loading ? (
        <div className="flex justify-center py-16">
          <Loader2 className="h-8 w-8 animate-spin text-primary" />
        </div>
      ) : properties.length === 0 ? (
        <div className="py-16 text-center text-muted-foreground">
          No featured properties yet.
        </div>
      ) : (
        <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
          {properties.slice(startIndex, startIndex + visibleCount).map((p) => (
            <PropertyCard key={p._id} property={{ ...p, id: p._id }} />
          ))}
        </div>
      )}

      <div className="mt-8 text-center">
        <Button variant="outline" className="gap-2" asChild>
          <Link href="/properties">
            View All Properties
            <ArrowRight className="h-4 w-4" />
          </Link>
        </Button>
      </div>
    </section>
  )
}
