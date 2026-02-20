"use client"

import { use, useState } from "react"
import { notFound } from "next/navigation"
import Link from "next/link"
import { SiteHeader } from "@/components/site-header"
import { SiteFooter } from "@/components/site-footer"
import { PropertyCard } from "@/components/property-card"
import { ImageGallery } from "@/components/property/image-gallery"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { properties, formatPrice } from "@/lib/data"
import {
  ArrowLeft,
  Bath,
  Bed,
  Building2,
  Calendar,
  Check,
  Heart,
  MapPin,
  Maximize,
  Phone,
  Share2,
  ShieldCheck,
  User,
  Wallet,
} from "lucide-react"

export default function PropertyDetailPage({
  params,
}: {
  params: Promise<{ id: string }>
}) {
  const { id } = use(params)
  const property = properties.find((p) => p.id === id)
  const [saved, setSaved] = useState(false)
  const [loanAmount, setLoanAmount] = useState("")
  const [loanYears, setLoanYears] = useState("20")
  const [loanRate, setLoanRate] = useState("8.5")

  if (!property) {
    notFound()
  }

  const similarProperties = properties
    .filter(
      (p) => p.id !== property.id && (p.city === property.city || p.type === property.type)
    )
    .slice(0, 3)

  const calculateEMI = () => {
    const principal = loanAmount ? parseFloat(loanAmount) : property.price * 0.8
    const rate = parseFloat(loanRate) / 12 / 100
    const months = parseInt(loanYears) * 12
    if (rate === 0) return Math.round(principal / months)
    const emi =
      (principal * rate * Math.pow(1 + rate, months)) /
      (Math.pow(1 + rate, months) - 1)
    return Math.round(emi)
  }

  return (
    <div className="flex min-h-screen flex-col">
      <SiteHeader />
      <main className="flex-1 bg-background">
        {/* Breadcrumb */}
        <div className="border-b border-border bg-card">
          <div className="mx-auto flex max-w-7xl items-center gap-3 px-4 py-3">
            <Link
              href="/properties"
              className="flex items-center gap-1 text-sm text-muted-foreground transition-colors hover:text-primary"
            >
              <ArrowLeft className="h-4 w-4" />
              Back to Search
            </Link>
            <span className="text-muted-foreground">/</span>
            <span className="text-sm text-muted-foreground">{property.city}</span>
            <span className="text-muted-foreground">/</span>
            <span className="line-clamp-1 text-sm text-foreground">{property.title}</span>
          </div>
        </div>

        <div className="mx-auto max-w-7xl px-4 py-6">
          {/* Image Gallery */}
          <ImageGallery images={property.images} title={property.title} />

          {/* Content */}
          <div className="mt-6 grid gap-6 lg:grid-cols-[1fr_380px]">
            {/* Left: Details */}
            <div className="flex flex-col gap-6">
              {/* Title & Actions */}
              <div className="rounded-2xl border border-border bg-card p-5">
                <div className="flex flex-wrap items-start justify-between gap-3">
                  <div className="flex-1">
                    <div className="flex flex-wrap items-center gap-2">
                      <Badge className="bg-primary/10 text-primary">
                        {property.listingType === "buy"
                          ? "For Sale"
                          : property.listingType === "rent"
                            ? "For Rent"
                            : "Commercial"}
                      </Badge>
                      {property.verified && (
                        <Badge
                          variant="outline"
                          className="gap-1 border-emerald-200 bg-emerald-50 text-emerald-700"
                        >
                          <ShieldCheck className="h-3 w-3" />
                          Verified
                        </Badge>
                      )}
                      {property.featured && (
                        <Badge className="bg-accent text-accent-foreground">
                          Featured
                        </Badge>
                      )}
                      <Badge variant="outline">{property.status}</Badge>
                    </div>
                    <h1 className="mt-2 text-xl font-bold text-foreground md:text-2xl">
                      {property.title}
                    </h1>
                    <p className="mt-1 flex items-center gap-1.5 text-sm text-muted-foreground">
                      <MapPin className="h-4 w-4" />
                      {property.location}
                    </p>
                  </div>
                  <div className="flex items-center gap-2">
                    <Button
                      variant="outline"
                      size="icon"
                      onClick={() => setSaved(!saved)}
                      aria-label={saved ? "Remove from saved" : "Save property"}
                    >
                      <Heart
                        className={`h-4 w-4 ${saved ? "fill-accent text-accent" : ""}`}
                      />
                    </Button>
                    <Button variant="outline" size="icon" aria-label="Share property">
                      <Share2 className="h-4 w-4" />
                    </Button>
                  </div>
                </div>

                {/* Price */}
                <div className="mt-4 flex items-end gap-2">
                  <p className="text-2xl font-bold text-foreground md:text-3xl">
                    {property.priceLabel}
                  </p>
                  {property.listingType === "buy" && property.area > 0 && (
                    <span className="mb-1 text-sm text-muted-foreground">
                      ({formatPrice(Math.round(property.price / property.area))}/sqft)
                    </span>
                  )}
                </div>

                {/* Quick Stats */}
                <div className="mt-4 flex flex-wrap gap-6">
                  {property.bedrooms > 0 && (
                    <div className="flex items-center gap-2">
                      <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-secondary">
                        <Bed className="h-4 w-4 text-secondary-foreground" />
                      </div>
                      <div>
                        <p className="text-sm font-semibold text-foreground">
                          {property.bedrooms} BHK
                        </p>
                        <p className="text-xs text-muted-foreground">Bedrooms</p>
                      </div>
                    </div>
                  )}
                  <div className="flex items-center gap-2">
                    <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-secondary">
                      <Bath className="h-4 w-4 text-secondary-foreground" />
                    </div>
                    <div>
                      <p className="text-sm font-semibold text-foreground">
                        {property.bathrooms}
                      </p>
                      <p className="text-xs text-muted-foreground">Bathrooms</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-secondary">
                      <Maximize className="h-4 w-4 text-secondary-foreground" />
                    </div>
                    <div>
                      <p className="text-sm font-semibold text-foreground">
                        {property.area} sqft
                      </p>
                      <p className="text-xs text-muted-foreground">Carpet Area</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-secondary">
                      <Building2 className="h-4 w-4 text-secondary-foreground" />
                    </div>
                    <div>
                      <p className="text-sm font-semibold text-foreground">
                        {property.furnishing}
                      </p>
                      <p className="text-xs text-muted-foreground">Furnishing</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Description */}
              <div className="rounded-2xl border border-border bg-card p-5">
                <h2 className="text-lg font-bold text-foreground">About this Property</h2>
                <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
                  {property.description}
                </p>
                <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
                  This property is located in one of the most sought-after neighborhoods,
                  offering excellent connectivity to major roads, public transportation,
                  schools, hospitals, and shopping centers. The surrounding area has seen
                  consistent appreciation in property values, making this an excellent
                  investment opportunity.
                </p>
              </div>

              {/* Amenities */}
              <div className="rounded-2xl border border-border bg-card p-5">
                <h2 className="text-lg font-bold text-foreground">Amenities</h2>
                <div className="mt-4 grid grid-cols-2 gap-3 md:grid-cols-3">
                  {property.amenities.map((amenity) => (
                    <div
                      key={amenity}
                      className="flex items-center gap-2 rounded-lg border border-border px-3 py-2.5"
                    >
                      <Check className="h-4 w-4 text-primary" />
                      <span className="text-sm text-foreground">{amenity}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* EMI Calculator */}
              {property.listingType === "buy" && (
                <div className="rounded-2xl border border-border bg-card p-5">
                  <h2 className="flex items-center gap-2 text-lg font-bold text-foreground">
                    <Wallet className="h-5 w-5 text-primary" />
                    EMI Calculator
                  </h2>
                  <div className="mt-4 grid gap-4 md:grid-cols-3">
                    <div>
                      <label className="mb-1 block text-xs font-medium text-muted-foreground">
                        Loan Amount
                      </label>
                      <Input
                        type="number"
                        placeholder={`${Math.round(property.price * 0.8)}`}
                        value={loanAmount}
                        onChange={(e) => setLoanAmount(e.target.value)}
                      />
                    </div>
                    <div>
                      <label className="mb-1 block text-xs font-medium text-muted-foreground">
                        Tenure (Years)
                      </label>
                      <Input
                        type="number"
                        value={loanYears}
                        onChange={(e) => setLoanYears(e.target.value)}
                      />
                    </div>
                    <div>
                      <label className="mb-1 block text-xs font-medium text-muted-foreground">
                        Interest Rate (%)
                      </label>
                      <Input
                        type="number"
                        step="0.1"
                        value={loanRate}
                        onChange={(e) => setLoanRate(e.target.value)}
                      />
                    </div>
                  </div>
                  <div className="mt-4 flex items-center gap-3 rounded-xl bg-secondary p-4">
                    <div>
                      <p className="text-xs text-muted-foreground">Estimated EMI</p>
                      <p className="text-xl font-bold text-foreground">
                        {formatPrice(calculateEMI())}/mo
                      </p>
                    </div>
                  </div>
                </div>
              )}
            </div>

            {/* Right: Contact Card */}
            <div className="flex flex-col gap-4">
              <div className="sticky top-20 flex flex-col gap-4">
                {/* Contact Card */}
                <div className="rounded-2xl border border-border bg-card p-5">
                  <h3 className="text-base font-bold text-foreground">Contact Seller</h3>
                  <div className="mt-3 flex items-center gap-3">
                    <div className="flex h-12 w-12 items-center justify-center rounded-full bg-secondary">
                      <User className="h-5 w-5 text-secondary-foreground" />
                    </div>
                    <div>
                      <p className="text-sm font-semibold text-foreground">
                        {property.postedBy === "Owner"
                          ? "Property Owner"
                          : property.postedBy === "Agent"
                            ? "Verified Agent"
                            : "Builder Representative"}
                      </p>
                      <p className="text-xs text-muted-foreground">
                        Posted by {property.postedBy}
                      </p>
                    </div>
                  </div>
                  <div className="mt-4 flex flex-col gap-2">
                    <Button className="w-full gap-2">
                      <Phone className="h-4 w-4" />
                      Get Phone Number
                    </Button>
                    <Button variant="outline" className="w-full">
                      Send Message
                    </Button>
                  </div>
                </div>

                {/* Property Info Card */}
                <div className="rounded-2xl border border-border bg-card p-5">
                  <h3 className="text-base font-bold text-foreground">Property Info</h3>
                  <div className="mt-3 flex flex-col gap-3">
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-muted-foreground">Type</span>
                      <span className="font-medium text-foreground">{property.type}</span>
                    </div>
                    <div className="h-px bg-border" />
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-muted-foreground">Status</span>
                      <span className="font-medium text-foreground">{property.status}</span>
                    </div>
                    <div className="h-px bg-border" />
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-muted-foreground">Furnishing</span>
                      <span className="font-medium text-foreground">{property.furnishing}</span>
                    </div>
                    <div className="h-px bg-border" />
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-muted-foreground">Listed</span>
                      <span className="flex items-center gap-1 font-medium text-foreground">
                        <Calendar className="h-3.5 w-3.5 text-muted-foreground" />
                        {property.postedDate}
                      </span>
                    </div>
                    <div className="h-px bg-border" />
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-muted-foreground">City</span>
                      <span className="font-medium text-foreground">{property.city}</span>
                    </div>
                  </div>
                </div>

                {/* Safety Tips */}
                <div className="rounded-2xl border border-border bg-secondary/50 p-5">
                  <h3 className="flex items-center gap-1.5 text-sm font-bold text-foreground">
                    <ShieldCheck className="h-4 w-4 text-primary" />
                    Safety Tips
                  </h3>
                  <ul className="mt-2 flex flex-col gap-1.5 text-xs text-muted-foreground">
                    <li className="flex items-start gap-1.5">
                      <Check className="mt-0.5 h-3 w-3 shrink-0 text-primary" />
                      Always verify property documents
                    </li>
                    <li className="flex items-start gap-1.5">
                      <Check className="mt-0.5 h-3 w-3 shrink-0 text-primary" />
                      Visit the property before paying
                    </li>
                    <li className="flex items-start gap-1.5">
                      <Check className="mt-0.5 h-3 w-3 shrink-0 text-primary" />
                      Never pay advance without agreement
                    </li>
                    <li className="flex items-start gap-1.5">
                      <Check className="mt-0.5 h-3 w-3 shrink-0 text-primary" />
                      Check for RERA registration
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>

          {/* Similar Properties */}
          {similarProperties.length > 0 && (
            <div className="mt-10">
              <div className="mb-5 flex items-center justify-between">
                <h2 className="text-xl font-bold text-foreground">Similar Properties</h2>
                <Link
                  href="/properties"
                  className="text-sm font-medium text-primary hover:underline"
                >
                  View All
                </Link>
              </div>
              <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
                {similarProperties.map((p) => (
                  <PropertyCard key={p.id} property={p} />
                ))}
              </div>
            </div>
          )}
        </div>
      </main>
      <SiteFooter />
    </div>
  )
}
