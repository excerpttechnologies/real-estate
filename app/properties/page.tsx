"use client"

import { useState, useMemo, useEffect, Suspense } from "react"
import { useSearchParams } from "next/navigation"
import { SiteHeader } from "@/components/site-header"
import { SiteFooter } from "@/components/site-footer"
import { PropertyCard } from "@/components/property-card"
import { FilterSidebar } from "@/components/properties/filter-sidebar"
import { Button } from "@/components/ui/button"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { properties } from "@/lib/data"
import { Grid3X3, List, SlidersHorizontal, X } from "lucide-react"


function PropertiesContent() {
  const searchParams = useSearchParams()
  const initialType = searchParams.get("type") || "all"
  const initialPropertyType = searchParams.get("propertyType") || "all"
  const initialLocation = searchParams.get("location") || ""
  const initialStatus = searchParams.get("status") || "all"
  const initialFeatured = searchParams.get("featured") === "true"

  const [viewMode, setViewMode] = useState<"grid" | "list">("grid")
  const [sortBy, setSortBy] = useState("newest")
  const [showFilters, setShowFilters] = useState(false)
  const [filters, setFilters] = useState({
    listingType: initialType,
    propertyType: initialPropertyType,
    priceRange: [0, 100] as [number, number],
    bedrooms: "any",
    furnishing: "all",
    status: initialStatus,
    postedBy: "all",
    verified: false,
    featured: initialFeatured,
  })

  // Sync filters with URL params when they change
  useEffect(() => {
    setFilters((prev) => ({
      ...prev,
      listingType: searchParams.get("type") || "all",
      propertyType: searchParams.get("propertyType") || "all",
      status: searchParams.get("status") || "all",
      featured: searchParams.get("featured") === "true",
    }))
  }, [searchParams])

  const filteredProperties = useMemo(() => {
    let result = [...properties]

    if (filters.listingType !== "all") {
      result = result.filter((p) => p.listingType === filters.listingType)
    }
    if (filters.propertyType !== "all") {
      result = result.filter((p) => p.type === filters.propertyType)
    }
    if (filters.bedrooms !== "any") {
      const beds =
        filters.bedrooms === "5+" ? 5 : parseInt(filters.bedrooms)
      result = result.filter((p) =>
        filters.bedrooms === "5+" ? p.bedrooms >= 5 : p.bedrooms === beds
      )
    }
    if (filters.furnishing !== "all") {
      result = result.filter((p) => p.furnishing === filters.furnishing)
    }
    if (filters.status !== "all") {
      result = result.filter((p) => p.status === filters.status)
    }
    if (filters.postedBy !== "all") {
      result = result.filter((p) => p.postedBy === filters.postedBy)
    }
    if (filters.verified) {
      result = result.filter((p) => p.verified)
    }
    if (initialLocation) {
      result = result.filter(
        (p) =>
          p.city.toLowerCase().includes(initialLocation.toLowerCase()) ||
          p.location.toLowerCase().includes(initialLocation.toLowerCase())
      )
    }

    // Sort
    switch (sortBy) {
      case "price-low":
        result.sort((a, b) => a.price - b.price)
        break
      case "price-high":
        result.sort((a, b) => b.price - a.price)
        break
      case "area":
        result.sort((a, b) => b.area - a.area)
        break
      default:
        break
    }

    return result
  }, [filters, sortBy, initialLocation])

  return (
    <div className="flex min-h-screen flex-col">
      <SiteHeader />
      <main className="flex-1 bg-background">
        {/* Header */}
        <div className="border-b border-border bg-card">
          <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-4">
            <div>
              <h1 className="text-xl font-bold text-foreground md:text-2xl">
                {filters.status === "Under Construction" ? "New Projects" : "Properties"}{" "}
                {initialLocation && (
                  <span className="text-primary">in {initialLocation}</span>
                )}
              </h1>
              <p className="mt-0.5 text-sm text-muted-foreground">
                {filteredProperties.length} properties found
              </p>
            </div>
            <div className="flex items-center gap-2">
              <Select value={sortBy} onValueChange={setSortBy}>
                <SelectTrigger className="h-9 w-36 text-xs">
                  <SelectValue placeholder="Sort by" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="newest">Newest First</SelectItem>
                  <SelectItem value="price-low">Price: Low to High</SelectItem>
                  <SelectItem value="price-high">Price: High to Low</SelectItem>
                  <SelectItem value="area">Area: Largest</SelectItem>
                </SelectContent>
              </Select>
              <div className="hidden items-center rounded-lg border border-border md:flex">
                <button
                  onClick={() => setViewMode("grid")}
                  className={`flex h-9 w-9 items-center justify-center transition-colors ${viewMode === "grid"
                    ? "bg-primary text-primary-foreground"
                    : "text-muted-foreground hover:text-foreground"
                    } rounded-l-lg`}
                  aria-label="Grid view"
                >
                  <Grid3X3 className="h-4 w-4" />
                </button>
                <button
                  onClick={() => setViewMode("list")}
                  className={`flex h-9 w-9 items-center justify-center transition-colors ${viewMode === "list"
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
                onFilterChange={setFilters}
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
                  onFilterChange={setFilters}
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
            {filteredProperties.length === 0 ? (
              <div className="flex flex-col items-center justify-center rounded-2xl border border-border bg-card py-20">
                <p className="text-lg font-semibold text-foreground">
                  No properties found
                </p>
                <p className="mt-1 text-sm text-muted-foreground">
                  Try adjusting your filters
                </p>
              </div>
            ) : viewMode === "grid" ? (
              <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
                {filteredProperties.map((property) => (
                  <PropertyCard key={property.id} property={property} />
                ))}
              </div>
            ) : (
              <div className="flex flex-col gap-4">
                {filteredProperties.map((property) => (
                  <PropertyCard
                    key={property.id}
                    property={property}
                    layout="list"
                  />
                ))}
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
