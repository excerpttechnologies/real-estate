// "use client"

// import { useState, useMemo, useEffect, Suspense } from "react"
// import { useSearchParams } from "next/navigation"
// import { SiteHeader } from "@/app/components/site-header"
// import { SiteFooter } from "@/app/components/site-footer"
// import { PropertyCard } from "@/app/components/property-card"
// import { FilterSidebar } from "@/app/components/properties/filter-sidebar"
// import { Button } from "@/app/components/ui/button"
// import {
//   Select,
//   SelectContent,
//   SelectItem,
//   SelectTrigger,
//   SelectValue,
// } from "@/app/components/ui/select"
// import { properties } from "@/app/lib/data"
// import { Grid3X3, List, SlidersHorizontal, X } from "lucide-react"


// function PropertiesContent() {
//   const searchParams = useSearchParams()
//   const initialType = searchParams.get("type") || "all"
//   const initialPropertyType = searchParams.get("propertyType") || "all"
//   const initialLocation = searchParams.get("location") || ""
//   const initialStatus = searchParams.get("status") || "all"
//   const initialFeatured = searchParams.get("featured") === "true"

//   const [viewMode, setViewMode] = useState<"grid" | "list">("grid")
//   const [sortBy, setSortBy] = useState("newest")
//   const [showFilters, setShowFilters] = useState(false)
//   const [filters, setFilters] = useState({
//     listingType: initialType,
//     propertyType: initialPropertyType,
//     priceRange: [0, 100] as [number, number],
//     bedrooms: "any",
//     furnishing: "all",
//     status: initialStatus,
//     postedBy: "all",
//     verified: false,
//     featured: initialFeatured,
//   })

//   // Sync filters with URL params when they change
//   useEffect(() => {
//     setFilters((prev) => ({
//       ...prev,
//       listingType: searchParams.get("type") || "all",
//       propertyType: searchParams.get("propertyType") || "all",
//       status: searchParams.get("status") || "all",
//       featured: searchParams.get("featured") === "true",
//     }))
//   }, [searchParams])

//   const filteredProperties = useMemo(() => {
//     let result = [...properties]

//     if (filters.listingType !== "all") {
//       result = result.filter((p) => p.listingType === filters.listingType)
//     }
//     if (filters.propertyType !== "all") {
//       result = result.filter((p) => p.type === filters.propertyType)
//     }
//     if (filters.bedrooms !== "any") {
//       const beds =
//         filters.bedrooms === "5+" ? 5 : parseInt(filters.bedrooms)
//       result = result.filter((p) =>
//         filters.bedrooms === "5+" ? p.bedrooms >= 5 : p.bedrooms === beds
//       )
//     }
//     if (filters.furnishing !== "all") {
//       result = result.filter((p) => p.furnishing === filters.furnishing)
//     }
//     if (filters.status !== "all") {
//       result = result.filter((p) => p.status === filters.status)
//     }
//     if (filters.postedBy !== "all") {
//       result = result.filter((p) => p.postedBy === filters.postedBy)
//     }
//     if (filters.verified) {
//       result = result.filter((p) => p.verified)
//     }
//     if (initialLocation) {
//       result = result.filter(
//         (p) =>
//           p.city.toLowerCase().includes(initialLocation.toLowerCase()) ||
//           p.location.toLowerCase().includes(initialLocation.toLowerCase())
//       )
//     }

//     // Sort
//     switch (sortBy) {
//       case "price-low":
//         result.sort((a, b) => a.price - b.price)
//         break
//       case "price-high":
//         result.sort((a, b) => b.price - a.price)
//         break
//       case "area":
//         result.sort((a, b) => b.area - a.area)
//         break
//       default:
//         break
//     }

//     return result
//   }, [filters, sortBy, initialLocation])

//   return (
//     <div className="flex min-h-screen flex-col">
//       <SiteHeader />
//       <main className="flex-1 bg-background">
//         {/* Header */}
//         <div className="border-b border-border bg-card">
//           <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-4">
//             <div>
//               <h1 className="text-xl font-bold text-foreground md:text-2xl">
//                 {filters.status === "Under Construction" ? "New Projects" : "Properties"}{" "}
//                 {initialLocation && (
//                   <span className="text-primary">in {initialLocation}</span>
//                 )}
//               </h1>
//               <p className="mt-0.5 text-sm text-muted-foreground">
//                 {filteredProperties.length} properties found
//               </p>
//             </div>
//             <div className="flex items-center gap-2">
//               <Select value={sortBy} onValueChange={setSortBy}>
//                 <SelectTrigger className="h-9 w-36 text-xs">
//                   <SelectValue placeholder="Sort by" />
//                 </SelectTrigger>
//                 <SelectContent>
//                   <SelectItem value="newest">Newest First</SelectItem>
//                   <SelectItem value="price-low">Price: Low to High</SelectItem>
//                   <SelectItem value="price-high">Price: High to Low</SelectItem>
//                   <SelectItem value="area">Area: Largest</SelectItem>
//                 </SelectContent>
//               </Select>
//               <div className="hidden items-center rounded-lg border border-border md:flex">
//                 <button
//                   onClick={() => setViewMode("grid")}
//                   className={`flex h-9 w-9 items-center justify-center transition-colors ${viewMode === "grid"
//                     ? "bg-primary text-primary-foreground"
//                     : "text-muted-foreground hover:text-foreground"
//                     } rounded-l-lg`}
//                   aria-label="Grid view"
//                 >
//                   <Grid3X3 className="h-4 w-4" />
//                 </button>
//                 <button
//                   onClick={() => setViewMode("list")}
//                   className={`flex h-9 w-9 items-center justify-center transition-colors ${viewMode === "list"
//                     ? "bg-primary text-primary-foreground"
//                     : "text-muted-foreground hover:text-foreground"
//                     } rounded-r-lg`}
//                   aria-label="List view"
//                 >
//                   <List className="h-4 w-4" />
//                 </button>
//               </div>
//               <Button
//                 variant="outline"
//                 size="sm"
//                 className="gap-1.5 md:hidden"
//                 onClick={() => setShowFilters(!showFilters)}
//               >
//                 <SlidersHorizontal className="h-3.5 w-3.5" />
//                 Filters
//               </Button>
//             </div>
//           </div>
//         </div>

//         <div className="mx-auto flex max-w-7xl gap-6 px-4 py-6">
//           {/* Desktop Sidebar */}
//           <aside className="hidden w-72 shrink-0 md:block">
//             <div className="sticky top-20">
//               <FilterSidebar
//                 filters={filters}
//                 onFilterChange={setFilters}
//               />
//             </div>
//           </aside>

//           {/* Mobile Filters */}
//           {showFilters && (
//             <div className="fixed inset-0 z-50 bg-foreground/50 md:hidden">
//               <div className="absolute bottom-0 left-0 right-0 max-h-[85vh] overflow-y-auto rounded-t-2xl bg-background p-4">
//                 <div className="mb-3 flex items-center justify-between">
//                   <h3 className="text-lg font-bold text-foreground">Filters</h3>
//                   <button
//                     onClick={() => setShowFilters(false)}
//                     aria-label="Close filters"
//                   >
//                     <X className="h-5 w-5" />
//                   </button>
//                 </div>
//                 <FilterSidebar
//                   filters={filters}
//                   onFilterChange={setFilters}
//                 />
//                 <Button
//                   className="mt-4 w-full"
//                   onClick={() => setShowFilters(false)}
//                 >
//                   Apply Filters
//                 </Button>
//               </div>
//             </div>
//           )}

//           {/* Properties Grid */}
//           <div className="flex-1">
//             {filteredProperties.length === 0 ? (
//               <div className="flex flex-col items-center justify-center rounded-2xl border border-border bg-card py-20">
//                 <p className="text-lg font-semibold text-foreground">
//                   No properties found
//                 </p>
//                 <p className="mt-1 text-sm text-muted-foreground">
//                   Try adjusting your filters
//                 </p>
//               </div>
//             ) : viewMode === "grid" ? (
//               <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
//                 {filteredProperties.map((property) => (
//                   <PropertyCard key={property.id} property={property} />
//                 ))}
//               </div>
//             ) : (
//               <div className="flex flex-col gap-4">
//                 {filteredProperties.map((property) => (
//                   <PropertyCard
//                     key={property.id}
//                     property={property}
//                     layout="list"
//                   />
//                 ))}
//               </div>
//             )}
//           </div>
//         </div>
//       </main>
//       <SiteFooter />
//     </div>
//   )
// }

// export default function PropertiesPage() {
//   return (
//     <Suspense>
//       <PropertiesContent />
//     </Suspense>
//   )
// }





"use client"

import { useState, useEffect, Suspense } from "react"
import { useSearchParams } from "next/navigation"
import { SiteHeader } from "@/app/components/site-header"
import { SiteFooter } from "@/app/components/site-footer"
import { PropertyCard } from "@/app/components/property-card"
import { FilterSidebar } from "@/app/components/properties/filter-sidebar"
import { Button } from "@/app/components/ui/button"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/app/components/ui/select"
import { Grid3X3, List, SlidersHorizontal, X, Loader2 } from "lucide-react"

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
  postedBy: string
  verified: boolean
  featured: boolean
  images: string[]
  amenities: string[]
  listingType: string
  description: string
  createdAt: string
}

interface Filters {
  listingType: string
  propertyType: string
  priceRange: [number, number]
  bedrooms: string
  furnishing: string
  status: string
  postedBy: string
  verified: boolean
  featured: boolean
}

function PropertiesContent() {
  const searchParams = useSearchParams()

  const [properties, setProperties] = useState<Property[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState("")
  const [totalCount, setTotalCount] = useState(0)
  const [page, setPage] = useState(1)
  const [totalPages, setTotalPages] = useState(1)
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid")
  const [sortBy, setSortBy] = useState("newest")
  const [showFilters, setShowFilters] = useState(false)

  const [filters, setFilters] = useState<Filters>({
    listingType: searchParams.get("type") || "all",
    propertyType: searchParams.get("propertyType") || "all",
    priceRange: [0, 100],
    bedrooms: "any",
    furnishing: "all",
    status: searchParams.get("status") || "all",
    postedBy: "all",
    verified: false,
    featured: searchParams.get("featured") === "true",
  })

  // Sync filters when URL params change
  useEffect(() => {
    setFilters((prev) => ({
      ...prev,
      listingType: searchParams.get("type") || "all",
      propertyType: searchParams.get("propertyType") || "all",
      status: searchParams.get("status") || "all",
      featured: searchParams.get("featured") === "true",
    }))
    setPage(1)
  }, [searchParams])

  // Fetch properties from API whenever filters, sort, or page changes
  useEffect(() => {
    fetchProperties()
  }, [filters, sortBy, page])

  async function fetchProperties() {
    setLoading(true)
    setError("")

    try {
      // Build query params
      const params: Record<string, string> = {
        page: String(page),
        limit: "12",
        sort: sortBy,
      }

      if (filters.listingType !== "all") params.listing_type = filters.listingType
      if (filters.propertyType !== "all") params.property_type = filters.propertyType
      if (filters.bedrooms !== "any") params.bedrooms = filters.bedrooms
      if (filters.furnishing !== "all") params.furnishing = filters.furnishing
      if (filters.status !== "all") params.status = filters.status
      if (filters.postedBy !== "all") params.posted_by = filters.postedBy
      if (filters.verified) params.verified = "true"
      if (filters.featured) params.featured = "true"

      const location = searchParams.get("location")
      if (location) params.location = location

      const query = new URLSearchParams(params).toString()
      const res = await fetch(`/api/properties?${query}`)
      const data = await res.json()

      if (!res.ok) {
        setError(data.error || "Failed to fetch properties")
        return
      }

      setProperties(data.properties)
      setTotalCount(data.pagination.total)
      setTotalPages(data.pagination.pages)
    } catch {
      setError("Something went wrong. Please try again.")
    } finally {
      setLoading(false)
    }
  }

  const initialLocation = searchParams.get("location") || ""

  return (
    <div className="flex min-h-screen flex-col">
      <SiteHeader />
      <main className="flex-1 bg-background">

        {/* Header */}
        <div className="border-b border-border bg-card">
          <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-4">
            <div>
              <h1 className="text-xl font-bold text-foreground md:text-2xl">
                {filters.status === "Under Construction"
                  ? "New Projects"
                  : "Properties"}{" "}
                {initialLocation && (
                  <span className="text-primary">in {initialLocation}</span>
                )}
              </h1>
              <p className="mt-0.5 text-sm text-muted-foreground">
                {loading ? "Searching..." : `${totalCount} properties found`}
              </p>
            </div>
            <div className="flex items-center gap-2">
              <Select
                value={sortBy}
                onValueChange={(val) => {
                  setSortBy(val)
                  setPage(1)
                }}
              >
                <SelectTrigger className="h-9 w-36 text-xs">
                  <SelectValue placeholder="Sort by" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="newest">Newest First</SelectItem>
                  <SelectItem value="price_low">Price: Low to High</SelectItem>
                  <SelectItem value="price_high">Price: High to Low</SelectItem>
                  <SelectItem value="area">Area: Largest</SelectItem>
                </SelectContent>
              </Select>
              <div className="hidden items-center rounded-lg border border-border md:flex">
                <button
                  onClick={() => setViewMode("grid")}
                  className={`flex h-9 w-9 items-center justify-center transition-colors ${
                    viewMode === "grid"
                      ? "bg-primary text-primary-foreground"
                      : "text-muted-foreground hover:text-foreground"
                  } rounded-l-lg`}
                  aria-label="Grid view"
                >
                  <Grid3X3 className="h-4 w-4" />
                </button>
                <button
                  onClick={() => setViewMode("list")}
                  className={`flex h-9 w-9 items-center justify-center transition-colors ${
                    viewMode === "list"
                      ? "bg-primary text-primary-foreground"
                      : "text-muted-foreground hover:text-foreground"
                  } rounded-r-lg`}
                  aria-label="List view"
                >
                  <List className="h-4 w-4" />
                </button>
              </div>
              <Button
                variant="outline"
                size="sm"
                className="gap-1.5 md:hidden"
                onClick={() => setShowFilters(!showFilters)}
              >
                <SlidersHorizontal className="h-3.5 w-3.5" />
                Filters
              </Button>
            </div>
          </div>
        </div>

        <div className="mx-auto flex max-w-7xl gap-6 px-4 py-6">

          {/* Desktop Sidebar */}
          <aside className="hidden w-72 shrink-0 md:block">
            <div className="sticky top-20">
              <FilterSidebar
                filters={filters}
                onFilterChange={(newFilters) => {
                  setFilters(newFilters)
                  setPage(1)
                }}
              />
            </div>
          </aside>

          {/* Mobile Filters */}
          {showFilters && (
            <div className="fixed inset-0 z-50 bg-foreground/50 md:hidden">
              <div className="absolute bottom-0 left-0 right-0 max-h-[85vh] overflow-y-auto rounded-t-2xl bg-background p-4">
                <div className="mb-3 flex items-center justify-between">
                  <h3 className="text-lg font-bold text-foreground">Filters</h3>
                  <button
                    onClick={() => setShowFilters(false)}
                    aria-label="Close filters"
                  >
                    <X className="h-5 w-5" />
                  </button>
                </div>
                <FilterSidebar
                  filters={filters}
                  onFilterChange={(newFilters) => {
                    setFilters(newFilters)
                    setPage(1)
                  }}
                />
                <Button
                  className="mt-4 w-full"
                  onClick={() => setShowFilters(false)}
                >
                  Apply Filters
                </Button>
              </div>
            </div>
          )}

          {/* Properties Grid */}
          <div className="flex-1">

            {/* Loading */}
            {loading ? (
              <div className="flex flex-col items-center justify-center py-20">
                <Loader2 className="h-8 w-8 animate-spin text-primary" />
                <p className="mt-3 text-sm text-muted-foreground">
                  Loading properties...
                </p>
              </div>

            ) : error ? (
              // Error state
              <div className="flex flex-col items-center justify-center rounded-2xl border border-destructive/30 bg-destructive/10 py-20">
                <p className="text-lg font-semibold text-destructive">
                  {error}
                </p>
                <Button
                  variant="outline"
                  className="mt-4"
                  onClick={fetchProperties}
                >
                  Try Again
                </Button>
              </div>

            ) : properties.length === 0 ? (
              // Empty state
              <div className="flex flex-col items-center justify-center rounded-2xl border border-border bg-card py-20">
                <p className="text-lg font-semibold text-foreground">
                  No properties found
                </p>
                <p className="mt-1 text-sm text-muted-foreground">
                  Try adjusting your filters
                </p>
                <Button
                  variant="outline"
                  className="mt-4"
                  onClick={() => {
                    setFilters({
                      listingType: "all",
                      propertyType: "all",
                      priceRange: [0, 100],
                      bedrooms: "any",
                      furnishing: "all",
                      status: "all",
                      postedBy: "all",
                      verified: false,
                      featured: false,
                    })
                    setPage(1)
                  }}
                >
                  Clear Filters
                </Button>
              </div>

            ) : viewMode === "grid" ? (
              <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
                {properties.map((property) => (
                  <PropertyCard
                    key={property._id}
                    property={{ ...property, id: property._id }}
                  />
                ))}
              </div>
            ) : (
              <div className="flex flex-col gap-4">
                {properties.map((property) => (
                  <PropertyCard
                    key={property._id}
                    property={{ ...property, id: property._id }}
                    layout="list"
                  />
                ))}
              </div>
            )}

            {/* Pagination */}
            {!loading && totalPages > 1 && (
              <div className="mt-8 flex items-center justify-center gap-2">
                <Button
                  variant="outline"
                  size="sm"
                  disabled={page === 1}
                  onClick={() => setPage((p) => p - 1)}
                >
                  Previous
                </Button>
                <div className="flex items-center gap-1">
                  {Array.from({ length: totalPages }, (_, i) => i + 1).map((p) => (
                    <button
                      key={p}
                      onClick={() => setPage(p)}
                      className={`flex h-8 w-8 items-center justify-center rounded-lg text-sm font-medium transition-colors ${
                        p === page
                          ? "bg-primary text-primary-foreground"
                          : "text-muted-foreground hover:bg-secondary"
                      }`}
                    >
                      {p}
                    </button>
                  ))}
                </div>
                <Button
                  variant="outline"
                  size="sm"
                  disabled={page === totalPages}
                  onClick={() => setPage((p) => p + 1)}
                >
                  Next
                </Button>
              </div>
            )}
          </div>
        </div>
      </main>
      <SiteFooter />
    </div>
  )
}

export default function PropertiesPage() {
  return (
    <Suspense>
      <PropertiesContent />
    </Suspense>
  )
}
