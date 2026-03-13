"use client"

import { Button } from "@/app/components/ui/button"
import { Input } from "@/app/components/ui/input"
import { Label } from "@/app/components/ui/label"
import { Slider } from "@/app/components/ui/slider"
import { Switch } from "@/app/components/ui/switch"
import {
  propertyTypes,
  furnishingTypes,
  statusTypes,
  postedByTypes,
} from "@/app/lib/data"
import { RotateCcw } from "lucide-react"

interface FilterState {
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

interface FilterSidebarProps {
  filters: FilterState
  onFilterChange: (filters: FilterState) => void
}

export function FilterSidebar({ filters, onFilterChange }: FilterSidebarProps) {
  const update = (partial: Partial<FilterState>) =>
    onFilterChange({ ...filters, ...partial })

  return (
    <div className="rounded-2xl border border-border bg-card p-5 shadow-sm">
      <div className="mb-4 flex items-center justify-between">
        <h3 className="text-base font-semibold text-foreground">Filters</h3>
        <Button
          variant="ghost"
          size="sm"
          className="h-8 gap-1 text-xs text-muted-foreground"
          onClick={() =>
            onFilterChange({
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
          }
        >
          <RotateCcw className="h-3 w-3" />
          Reset
        </Button>
      </div>

      {/* Listing Type */}
      <div className="mb-5">
        <Label className="mb-2 block text-xs font-medium text-muted-foreground">
          Listing Type
        </Label>
        <div className="flex flex-wrap gap-2">
          {["all", "buy", "rent", "commercial"].map((type) => (
            <button
              key={type}
              onClick={() => update({ listingType: type })}
              className={`rounded-lg px-3 py-1.5 text-xs font-medium capitalize transition-colors ${filters.listingType === type
                  ? "bg-primary text-primary-foreground"
                  : "bg-secondary text-secondary-foreground hover:bg-secondary/80"
                }`}
            >
              {type}
            </button>
          ))}
        </div>
      </div>

      {/* Property Type */}
      <div className="mb-5">
        <Label className="mb-2 block text-xs font-medium text-muted-foreground">
          Property Type
        </Label>
        <div className="flex flex-wrap gap-2">
          <button
            onClick={() => update({ propertyType: "all" })}
            className={`rounded-lg px-3 py-1.5 text-xs font-medium transition-colors ${filters.propertyType === "all"
                ? "bg-primary text-primary-foreground"
                : "bg-secondary text-secondary-foreground hover:bg-secondary/80"
              }`}
          >
            All
          </button>
          {propertyTypes.map((type) => (
            <button
              key={type}
              onClick={() => update({ propertyType: type })}
              className={`rounded-lg px-3 py-1.5 text-xs font-medium transition-colors ${filters.propertyType === type
                  ? "bg-primary text-primary-foreground"
                  : "bg-secondary text-secondary-foreground hover:bg-secondary/80"
                }`}
            >
              {type}
            </button>
          ))}
        </div>
      </div>

      {/* Budget */}
      <div className="mb-5">
        <Label className="mb-2 block text-xs font-medium text-muted-foreground">
          Budget Range
        </Label>
        <Slider
          value={filters.priceRange}
          onValueChange={(val) =>
            update({ priceRange: val as [number, number] })
          }
          max={100}
          step={5}
          className="mt-3"
        />
        <div className="mt-2 flex items-center justify-between text-xs text-muted-foreground">
          <span>Min</span>
          <span>Max</span>
        </div>
      </div>

      {/* Bedrooms */}
      <div className="mb-5">
        <Label className="mb-2 block text-xs font-medium text-muted-foreground">
          Bedrooms
        </Label>
        <div className="flex gap-2">
          {["any", "1", "2", "3", "4", "5+"].map((bed) => (
            <button
              key={bed}
              onClick={() => update({ bedrooms: bed })}
              className={`flex-1 rounded-lg py-1.5 text-xs font-medium capitalize transition-colors ${filters.bedrooms === bed
                  ? "bg-primary text-primary-foreground"
                  : "bg-secondary text-secondary-foreground hover:bg-secondary/80"
                }`}
            >
              {bed === "any" ? "Any" : `${bed}`}
            </button>
          ))}
        </div>
      </div>

      {/* Furnishing */}
      <div className="mb-5">
        <Label className="mb-2 block text-xs font-medium text-muted-foreground">
          Furnishing
        </Label>
        <div className="flex flex-wrap gap-2">
          <button
            onClick={() => update({ furnishing: "all" })}
            className={`rounded-lg px-3 py-1.5 text-xs font-medium transition-colors ${filters.furnishing === "all"
                ? "bg-primary text-primary-foreground"
                : "bg-secondary text-secondary-foreground hover:bg-secondary/80"
              }`}
          >
            All
          </button>
          {furnishingTypes.map((type) => (
            <button
              key={type}
              onClick={() => update({ furnishing: type })}
              className={`rounded-lg px-3 py-1.5 text-xs font-medium transition-colors ${filters.furnishing === type
                  ? "bg-primary text-primary-foreground"
                  : "bg-secondary text-secondary-foreground hover:bg-secondary/80"
                }`}
            >
              {type}
            </button>
          ))}
        </div>
      </div>

      {/* Status */}
      <div className="mb-5">
        <Label className="mb-2 block text-xs font-medium text-muted-foreground">
          Status
        </Label>
        <div className="flex flex-wrap gap-2">
          <button
            onClick={() => update({ status: "all" })}
            className={`rounded-lg px-3 py-1.5 text-xs font-medium transition-colors ${filters.status === "all"
                ? "bg-primary text-primary-foreground"
                : "bg-secondary text-secondary-foreground hover:bg-secondary/80"
              }`}
          >
            All
          </button>
          {statusTypes.map((type) => (
            <button
              key={type}
              onClick={() => update({ status: type })}
              className={`rounded-lg px-3 py-1.5 text-xs font-medium transition-colors ${filters.status === type
                  ? "bg-primary text-primary-foreground"
                  : "bg-secondary text-secondary-foreground hover:bg-secondary/80"
                }`}
            >
              {type}
            </button>
          ))}
        </div>
      </div>

      {/* Posted By */}
      <div className="mb-5">
        <Label className="mb-2 block text-xs font-medium text-muted-foreground">
          Posted By
        </Label>
        <div className="flex flex-wrap gap-2">
          <button
            onClick={() => update({ postedBy: "all" })}
            className={`rounded-lg px-3 py-1.5 text-xs font-medium transition-colors ${filters.postedBy === "all"
                ? "bg-primary text-primary-foreground"
                : "bg-secondary text-secondary-foreground hover:bg-secondary/80"
              }`}
          >
            All
          </button>
          {postedByTypes.map((type) => (
            <button
              key={type}
              onClick={() => update({ postedBy: type })}
              className={`rounded-lg px-3 py-1.5 text-xs font-medium transition-colors ${filters.postedBy === type
                  ? "bg-primary text-primary-foreground"
                  : "bg-secondary text-secondary-foreground hover:bg-secondary/80"
                }`}
            >
              {type}
            </button>
          ))}
        </div>
      </div>

      {/* Verified only */}
      <div className="flex items-center justify-between rounded-xl bg-secondary p-3">
        <Label className="text-sm font-medium text-foreground">
          Verified Only
        </Label>
        <Switch
          checked={filters.verified}
          onCheckedChange={(val) => update({ verified: val })}
        />
      </div>
    </div>
  )
}
