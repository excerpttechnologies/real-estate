"use client"

import { useState } from "react"
import Link from "next/link"
import { SiteHeader } from "@/components/site-header"
import { SiteFooter } from "@/components/site-footer"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { Badge } from "@/components/ui/badge"
import {
  ArrowLeft,
  ArrowRight,
  Building2,
  Camera,
  Check,
  Home,
  MapPin,
  Upload,
} from "lucide-react"

const steps = [
  { id: 1, title: "Basic Info", icon: Home },
  { id: 2, title: "Location", icon: MapPin },
  { id: 3, title: "Details", icon: Building2 },
  { id: 4, title: "Photos", icon: Camera },
]

export default function PostPropertyPage() {
  const [currentStep, setCurrentStep] = useState(1)
  const [listingType, setListingType] = useState<"sell" | "rent" | "commercial">("sell")

  return (
    <div className="flex min-h-screen flex-col">
      <SiteHeader />
      <main className="flex-1 bg-background">
        <div className="mx-auto max-w-3xl px-4 py-8">
          {/* Header */}
          <div className="mb-6">
            <Link
              href="/"
              className="mb-3 flex items-center gap-1 text-sm text-muted-foreground hover:text-primary"
            >
              <ArrowLeft className="h-4 w-4" />
              Back to Home
            </Link>
            <h1 className="text-2xl font-bold text-foreground">Post Your Property</h1>
            <p className="mt-1 text-sm text-muted-foreground">
              Fill in the details below to list your property for free
            </p>
          </div>

          {/* Progress Steps */}
          <div className="mb-8 flex items-center justify-between">
            {steps.map((step, i) => (
              <div key={step.id} className="flex items-center gap-2">
                <div className="flex flex-col items-center gap-1">
                  <div
                    className={`flex h-10 w-10 items-center justify-center rounded-full text-sm font-medium transition-colors ${
                      currentStep >= step.id
                        ? "bg-primary text-primary-foreground"
                        : "bg-secondary text-muted-foreground"
                    }`}
                  >
                    {currentStep > step.id ? (
                      <Check className="h-4 w-4" />
                    ) : (
                      <step.icon className="h-4 w-4" />
                    )}
                  </div>
                  <span className="hidden text-xs font-medium text-muted-foreground sm:block">
                    {step.title}
                  </span>
                </div>
                {i < steps.length - 1 && (
                  <div
                    className={`mx-2 h-0.5 w-12 rounded-full sm:w-20 ${
                      currentStep > step.id ? "bg-primary" : "bg-border"
                    }`}
                  />
                )}
              </div>
            ))}
          </div>

          {/* Form Content */}
          <div className="rounded-2xl border border-border bg-card p-6">
            {currentStep === 1 && (
              <div className="flex flex-col gap-5">
                <h2 className="text-lg font-bold text-foreground">Basic Information</h2>

                <div>
                  <label className="mb-2 block text-sm font-medium text-foreground">
                    I want to
                  </label>
                  <div className="flex gap-2">
                    {(["sell", "rent", "commercial"] as const).map((type) => (
                      <button
                        key={type}
                        onClick={() => setListingType(type)}
                        className={`flex-1 rounded-xl border px-4 py-3 text-sm font-medium capitalize transition-all ${
                          listingType === type
                            ? "border-primary bg-primary/5 text-primary"
                            : "border-border text-muted-foreground hover:border-primary/50"
                        }`}
                      >
                        {type === "commercial" ? "Lease/Commercial" : type}
                      </button>
                    ))}
                  </div>
                </div>

                <div>
                  <label className="mb-1.5 block text-sm font-medium text-foreground">
                    Property Type
                  </label>
                  <Select>
                    <SelectTrigger className="h-11">
                      <SelectValue placeholder="Select property type" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="apartment">Apartment</SelectItem>
                      <SelectItem value="villa">Villa</SelectItem>
                      <SelectItem value="plot">Plot</SelectItem>
                      <SelectItem value="commercial">Commercial Space</SelectItem>
                      <SelectItem value="penthouse">Penthouse</SelectItem>
                      <SelectItem value="studio">Studio</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="grid gap-4 sm:grid-cols-2">
                  <div>
                    <label className="mb-1.5 block text-sm font-medium text-foreground">
                      Bedrooms
                    </label>
                    <div className="flex gap-2">
                      {["1", "2", "3", "4", "5+"].map((val) => (
                        <button
                          key={val}
                          className="flex-1 rounded-lg border border-border px-3 py-2 text-sm text-muted-foreground transition-colors hover:border-primary hover:text-primary"
                        >
                          {val}
                        </button>
                      ))}
                    </div>
                  </div>
                  <div>
                    <label className="mb-1.5 block text-sm font-medium text-foreground">
                      Bathrooms
                    </label>
                    <div className="flex gap-2">
                      {["1", "2", "3", "4+"].map((val) => (
                        <button
                          key={val}
                          className="flex-1 rounded-lg border border-border px-3 py-2 text-sm text-muted-foreground transition-colors hover:border-primary hover:text-primary"
                        >
                          {val}
                        </button>
                      ))}
                    </div>
                  </div>
                </div>

                <div>
                  <label className="mb-1.5 block text-sm font-medium text-foreground">
                    Furnishing Status
                  </label>
                  <Select>
                    <SelectTrigger className="h-11">
                      <SelectValue placeholder="Select furnishing" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="furnished">Furnished</SelectItem>
                      <SelectItem value="semi">Semi-Furnished</SelectItem>
                      <SelectItem value="unfurnished">Unfurnished</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
            )}

            {currentStep === 2 && (
              <div className="flex flex-col gap-5">
                <h2 className="text-lg font-bold text-foreground">Location Details</h2>

                <div>
                  <label className="mb-1.5 block text-sm font-medium text-foreground">
                    City
                  </label>
                  <Select>
                    <SelectTrigger className="h-11">
                      <SelectValue placeholder="Select city" />
                    </SelectTrigger>
                    <SelectContent>
                      {["Mumbai", "Bangalore", "Delhi NCR", "Hyderabad", "Pune", "Chennai"].map(
                        (city) => (
                          <SelectItem key={city} value={city.toLowerCase()}>
                            {city}
                          </SelectItem>
                        )
                      )}
                    </SelectContent>
                  </Select>
                </div>

                <div>
                  <label className="mb-1.5 block text-sm font-medium text-foreground">
                    Locality / Area
                  </label>
                  <Input className="h-11" placeholder="e.g., Andheri West, Koramangala" />
                </div>

                <div>
                  <label className="mb-1.5 block text-sm font-medium text-foreground">
                    Full Address
                  </label>
                  <Input className="h-11" placeholder="Enter complete address" />
                </div>

                <div>
                  <label className="mb-1.5 block text-sm font-medium text-foreground">
                    Project / Society Name (optional)
                  </label>
                  <Input className="h-11" placeholder="e.g., Hiranandani Gardens" />
                </div>
              </div>
            )}

            {currentStep === 3 && (
              <div className="flex flex-col gap-5">
                <h2 className="text-lg font-bold text-foreground">Property Details</h2>

                <div className="grid gap-4 sm:grid-cols-2">
                  <div>
                    <label className="mb-1.5 block text-sm font-medium text-foreground">
                      Built-up Area (sqft)
                    </label>
                    <Input type="number" className="h-11" placeholder="e.g., 1200" />
                  </div>
                  <div>
                    <label className="mb-1.5 block text-sm font-medium text-foreground">
                      Carpet Area (sqft)
                    </label>
                    <Input type="number" className="h-11" placeholder="e.g., 1000" />
                  </div>
                </div>

                <div className="grid gap-4 sm:grid-cols-2">
                  <div>
                    <label className="mb-1.5 block text-sm font-medium text-foreground">
                      Expected Price
                    </label>
                    <Input type="number" className="h-11" placeholder="e.g., 15000000" />
                  </div>
                  <div>
                    <label className="mb-1.5 block text-sm font-medium text-foreground">
                      Construction Status
                    </label>
                    <Select>
                      <SelectTrigger className="h-11">
                        <SelectValue placeholder="Select status" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="ready">Ready to Move</SelectItem>
                        <SelectItem value="under-construction">
                          Under Construction
                        </SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                <div>
                  <label className="mb-1.5 block text-sm font-medium text-foreground">
                    Description
                  </label>
                  <textarea
                    className="flex min-h-[120px] w-full rounded-xl border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
                    placeholder="Describe your property in detail..."
                  />
                </div>

                <div>
                  <label className="mb-2 block text-sm font-medium text-foreground">
                    Amenities
                  </label>
                  <div className="flex flex-wrap gap-2">
                    {[
                      "Swimming Pool",
                      "Gym",
                      "Parking",
                      "Security",
                      "Power Backup",
                      "Clubhouse",
                      "Garden",
                      "Lift",
                      "WiFi",
                      "Children Play Area",
                    ].map((amenity) => (
                      <Badge
                        key={amenity}
                        variant="outline"
                        className="cursor-pointer px-3 py-1.5 text-xs transition-colors hover:bg-primary hover:text-primary-foreground"
                      >
                        {amenity}
                      </Badge>
                    ))}
                  </div>
                </div>
              </div>
            )}

            {currentStep === 4 && (
              <div className="flex flex-col gap-5">
                <h2 className="text-lg font-bold text-foreground">Upload Photos</h2>
                <p className="text-sm text-muted-foreground">
                  Add high-quality photos to attract more buyers. Properties with photos get
                  5x more views.
                </p>

                <div className="flex flex-col items-center justify-center rounded-2xl border-2 border-dashed border-border py-12 transition-colors hover:border-primary/50">
                  <div className="flex h-14 w-14 items-center justify-center rounded-xl bg-secondary">
                    <Upload className="h-6 w-6 text-muted-foreground" />
                  </div>
                  <p className="mt-3 text-sm font-medium text-foreground">
                    Drag & drop photos here
                  </p>
                  <p className="mt-1 text-xs text-muted-foreground">
                    or click to browse (max 10 photos, 5MB each)
                  </p>
                  <Button variant="outline" size="sm" className="mt-4 gap-1.5">
                    <Camera className="h-3.5 w-3.5" />
                    Browse Photos
                  </Button>
                </div>

                <div className="rounded-xl bg-secondary/50 p-4">
                  <h3 className="text-sm font-semibold text-foreground">Photo Tips</h3>
                  <ul className="mt-2 flex flex-col gap-1 text-xs text-muted-foreground">
                    <li className="flex items-center gap-1.5">
                      <Check className="h-3 w-3 text-primary" />
                      Use natural lighting for best results
                    </li>
                    <li className="flex items-center gap-1.5">
                      <Check className="h-3 w-3 text-primary" />
                      Include photos of all rooms
                    </li>
                    <li className="flex items-center gap-1.5">
                      <Check className="h-3 w-3 text-primary" />
                      Add exterior and neighborhood shots
                    </li>
                    <li className="flex items-center gap-1.5">
                      <Check className="h-3 w-3 text-primary" />
                      Keep images landscape oriented
                    </li>
                  </ul>
                </div>
              </div>
            )}

            {/* Navigation */}
            <div className="mt-6 flex items-center justify-between border-t border-border pt-4">
              <Button
                variant="outline"
                onClick={() => setCurrentStep(Math.max(1, currentStep - 1))}
                disabled={currentStep === 1}
                className="gap-1.5"
              >
                <ArrowLeft className="h-4 w-4" />
                Previous
              </Button>
              {currentStep < 4 ? (
                <Button
                  onClick={() => setCurrentStep(Math.min(4, currentStep + 1))}
                  className="gap-1.5"
                >
                  Next Step
                  <ArrowRight className="h-4 w-4" />
                </Button>
              ) : (
                <Button className="gap-1.5 bg-accent text-accent-foreground hover:bg-accent/90">
                  <Check className="h-4 w-4" />
                  Submit Property
                </Button>
              )}
            </div>
          </div>
        </div>
      </main>
      <SiteFooter />
    </div>
  )
}
