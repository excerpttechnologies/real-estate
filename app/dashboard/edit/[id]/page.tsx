"use client"

import { useState, useEffect, useRef } from "react"
import { useRouter, useParams } from "next/navigation"
import Link from "next/link"
import { SiteHeader } from "@/app/components/site-header"
import { SiteFooter } from "@/app/components/site-footer"
import { Button } from "@/app/components/ui/button"
import { Input } from "@/app/components/ui/input"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/app/components/ui/select"
import { Badge } from "@/app/components/ui/badge"
import { useAuth } from "@/app/lib/auth-context"
import {
  ArrowLeft,
  Camera,
  Check,
  Loader2,
  Save,
  Star,
  Upload,
  X,
} from "lucide-react"

const AMENITIES_LIST = [
  "Swimming Pool", "Gym", "Parking", "Security", "Power Backup",
  "Clubhouse", "Garden", "Lift", "WiFi", "Children Play Area",
]

function formatPriceLabel(price: number, listingType: string): string {
  if (listingType === "rent") return `₹${price.toLocaleString("en-IN")}/mo`
  if (price >= 10000000) return `₹${(price / 10000000).toFixed(2)} Cr`
  if (price >= 100000) return `₹${(price / 100000).toFixed(2)} L`
  return `₹${price.toLocaleString("en-IN")}`
}

export default function EditPropertyPage() {
  const { isLoggedIn, isAdmin, loading: authLoading } = useAuth()
  const router = useRouter()
  const params = useParams()
  const id = params.id as string
  const fileInputRef = useRef<HTMLInputElement>(null)

  const [pageLoading, setPageLoading] = useState(true)
  const [submitting, setSubmitting] = useState(false)
  const [submitError, setSubmitError] = useState("")
  const [submitSuccess, setSubmitSuccess] = useState("")

  // Form fields
  const [listingType, setListingType] = useState<"buy" | "rent" | "commercial">("buy")
  const [propertyType, setPropertyType] = useState("")
  const [bedrooms, setBedrooms] = useState("")
  const [bathrooms, setBathrooms] = useState("")
  const [furnishing, setFurnishing] = useState("")
  const [city, setCity] = useState("")
  const [location, setLocation] = useState("")
  const [address, setAddress] = useState("")
  const [societyName, setSocietyName] = useState("")
  const [area, setArea] = useState("")
  const [price, setPrice] = useState("")
  const [status, setStatus] = useState("")
  const [description, setDescription] = useState("")
  const [selectedAmenities, setSelectedAmenities] = useState<string[]>([])
  const [featured, setFeatured] = useState(false)
  const [verified, setVerified] = useState(false)

  // Images
  const [existingImages, setExistingImages] = useState<string[]>([])
  const [newFiles, setNewFiles] = useState<File[]>([])
  const [newPreviews, setNewPreviews] = useState<string[]>([])
  const [uploadLoading, setUploadLoading] = useState(false)

  // Redirect if not admin
  useEffect(() => {
    if (!authLoading) {
      if (!isLoggedIn) router.push("/login")
      else if (!isAdmin) router.push("/")
    }
  }, [authLoading, isLoggedIn, isAdmin])

  // Fetch property data
  useEffect(() => {
    if (!id) return
    async function fetchProperty() {
      try {
        const res = await fetch(`/api/properties/${id}`)
        const data = await res.json()
        if (!res.ok) {
          router.push("/dashboard")
          return
        }
        const p = data.property
        setListingType(p.listingType || "buy")
        setPropertyType(p.type || "")
        setBedrooms(p.bedrooms ? String(p.bedrooms) : "")
        setBathrooms(p.bathrooms ? String(p.bathrooms) : "")
        setFurnishing(p.furnishing || "")
        setCity(p.city || "")
        setLocation(p.location || "")
        setAddress(p.address || "")
        setSocietyName(p.societyName || "")
        setArea(p.area ? String(p.area) : "")
        setPrice(p.price ? String(p.price) : "")
        setStatus(p.status || "")
        setDescription(p.description || "")
        setSelectedAmenities(p.amenities || [])
        setFeatured(p.featured || false)
        setVerified(p.verified || false)
        setExistingImages(p.images || [])
      } catch {
        router.push("/dashboard")
      } finally {
        setPageLoading(false)
      }
    }
    fetchProperty()
  }, [id])

  function toggleAmenity(amenity: string) {
    setSelectedAmenities((prev) =>
      prev.includes(amenity) ? prev.filter((a) => a !== amenity) : [...prev, amenity]
    )
  }

  function handleFileChange(e: React.ChangeEvent<HTMLInputElement>) {
    const files = Array.from(e.target.files || [])
    if (files.length === 0) return
    const combined = [...newFiles, ...files].slice(0, 10 - existingImages.length)
    setNewFiles(combined)
    setNewPreviews(combined.map((f) => URL.createObjectURL(f)))
  }

  function removeExistingImage(index: number) {
    setExistingImages((prev) => prev.filter((_, i) => i !== index))
  }

  function removeNewImage(index: number) {
    setNewFiles((prev) => prev.filter((_, i) => i !== index))
    setNewPreviews((prev) => prev.filter((_, i) => i !== index))
  }

  async function handleSubmit() {
    setSubmitError("")
    setSubmitSuccess("")
    setSubmitting(true)

    try {
      // Upload new images if any
      let newImageUrls: string[] = []
      if (newFiles.length > 0) {
        setUploadLoading(true)
        const formData = new FormData()
        newFiles.forEach((file) => formData.append("images", file))

        const uploadRes = await fetch("/api/upload", {
          method: "POST",
          body: formData,
          credentials: "include",
        })
        const uploadData = await uploadRes.json()
        if (!uploadRes.ok) {
          setSubmitError(uploadData.error || "Image upload failed")
          setSubmitting(false)
          setUploadLoading(false)
          return
        }
        newImageUrls = uploadData.urls
        setUploadLoading(false)
      }

      const priceNum = parseFloat(price)
      const payload = {
        title: `${bedrooms ? bedrooms + " BHK " : ""}${propertyType} in ${location}, ${city}`,
        description,
        price: priceNum,
        priceLabel: formatPriceLabel(priceNum, listingType),
        listingType,
        type: propertyType,
        status,
        furnishing,
        bedrooms: bedrooms ? parseInt(bedrooms) : 0,
        bathrooms: parseInt(bathrooms) || 0,
        area: parseFloat(area),
        location,
        city,
        address,
        societyName,
        images: [...existingImages, ...newImageUrls],
        amenities: selectedAmenities,
        featured,
        verified,
      }

      const res = await fetch(`/api/properties/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify(payload),
      })

      const data = await res.json()
      if (!res.ok) {
        setSubmitError(data.error || "Failed to update property")
        return
      }

      setSubmitSuccess("Property updated successfully!")
      setTimeout(() => router.push("/dashboard?tab=listings"), 1500)
    } catch {
      setSubmitError("Something went wrong. Please try again.")
    } finally {
      setSubmitting(false)
    }
  }

  if (authLoading || pageLoading) {
    return (
      <div className="flex min-h-screen flex-col">
        <SiteHeader />
        <div className="flex flex-1 items-center justify-center">
          <Loader2 className="h-8 w-8 animate-spin text-primary" />
        </div>
      </div>
    )
  }

  if (!isAdmin) return null

  return (
    <div className="flex min-h-screen flex-col">
      <SiteHeader />
      <main className="flex-1 bg-background">
        <div className="mx-auto max-w-3xl px-4 py-8">

          {/* Header */}
          <div className="mb-6">
            <Link
              href="/dashboard"
              className="mb-3 flex items-center gap-1 text-sm text-muted-foreground hover:text-primary"
            >
              <ArrowLeft className="h-4 w-4" />
              Back to Dashboard
            </Link>
            <h1 className="text-2xl font-bold text-foreground">Edit Property</h1>
            <p className="mt-1 text-sm text-muted-foreground">
              Update the details of your listing
            </p>
          </div>

          <div className="flex flex-col gap-5">

            {/* Success / Error */}
            {submitSuccess && (
              <div className="rounded-xl border border-emerald-200 bg-emerald-50 px-4 py-3 text-sm text-emerald-700">
                {submitSuccess}
              </div>
            )}
            {submitError && (
              <div className="rounded-xl border border-destructive/30 bg-destructive/10 px-4 py-3 text-sm text-destructive">
                {submitError}
              </div>
            )}

            {/* ── BASIC INFO ── */}
            <div className="rounded-2xl border border-border bg-card p-5">
              <h2 className="mb-4 text-base font-bold text-foreground">Basic Information</h2>

              <div className="flex flex-col gap-4">
                {/* Listing Type */}
                <div>
                  <label className="mb-2 block text-sm font-medium text-foreground">
                    Listing Type
                  </label>
                  <div className="flex gap-2">
                    {(["buy", "rent", "commercial"] as const).map((type) => (
                      <button
                        key={type}
                        onClick={() => setListingType(type)}
                        className={`flex-1 rounded-xl border px-4 py-2.5 text-sm font-medium transition-all ${
                          listingType === type
                            ? "border-primary bg-primary/5 text-primary"
                            : "border-border text-muted-foreground hover:border-primary/50"
                        }`}
                      >
                        {type === "commercial" ? "Lease/Commercial" : type === "buy" ? "Sell" : "Rent"}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Property Type */}
                <div>
                  <label className="mb-1.5 block text-sm font-medium text-foreground">
                    Property Type
                  </label>
                  <Select value={propertyType} onValueChange={setPropertyType}>
                    <SelectTrigger className="h-11">
                      <SelectValue placeholder="Select property type" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Apartment">Apartment</SelectItem>
                      <SelectItem value="Villa">Villa</SelectItem>
                      <SelectItem value="Plot">Plot</SelectItem>
                      <SelectItem value="Commercial">Commercial Space</SelectItem>
                      <SelectItem value="Penthouse">Penthouse</SelectItem>
                      <SelectItem value="Studio">Studio</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                {/* Bedrooms & Bathrooms */}
                {propertyType !== "Plot" && propertyType !== "Commercial" && (
                  <div className="grid gap-4 sm:grid-cols-2">
                    <div>
                      <label className="mb-1.5 block text-sm font-medium text-foreground">
                        Bedrooms
                      </label>
                      <div className="flex gap-2">
                        {["1", "2", "3", "4", "5"].map((val) => (
                          <button
                            key={val}
                            onClick={() => setBedrooms(val)}
                            className={`flex-1 rounded-lg border px-3 py-2 text-sm font-medium transition-colors ${
                              bedrooms === val
                                ? "border-primary bg-primary/5 text-primary"
                                : "border-border text-muted-foreground hover:border-primary hover:text-primary"
                            }`}
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
                        {["1", "2", "3", "4"].map((val) => (
                          <button
                            key={val}
                            onClick={() => setBathrooms(val)}
                            className={`flex-1 rounded-lg border px-3 py-2 text-sm font-medium transition-colors ${
                              bathrooms === val
                                ? "border-primary bg-primary/5 text-primary"
                                : "border-border text-muted-foreground hover:border-primary hover:text-primary"
                            }`}
                          >
                            {val}
                          </button>
                        ))}
                      </div>
                    </div>
                  </div>
                )}

                {/* Furnishing */}
                <div>
                  <label className="mb-1.5 block text-sm font-medium text-foreground">
                    Furnishing Status
                  </label>
                  <Select value={furnishing} onValueChange={setFurnishing}>
                    <SelectTrigger className="h-11">
                      <SelectValue placeholder="Select furnishing" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Furnished">Furnished</SelectItem>
                      <SelectItem value="Semi-Furnished">Semi-Furnished</SelectItem>
                      <SelectItem value="Unfurnished">Unfurnished</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
            </div>

            {/* ── LOCATION ── */}
            <div className="rounded-2xl border border-border bg-card p-5">
              <h2 className="mb-4 text-base font-bold text-foreground">Location</h2>
              <div className="flex flex-col gap-4">
                <div>
                  <label className="mb-1.5 block text-sm font-medium text-foreground">City</label>
                  <Select value={city} onValueChange={setCity}>
                    <SelectTrigger className="h-11">
                      <SelectValue placeholder="Select city" />
                    </SelectTrigger>
                    <SelectContent>
                      {["Mumbai", "Bangalore", "Delhi NCR", "Hyderabad", "Pune", "Chennai"].map((c) => (
                        <SelectItem key={c} value={c}>{c}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <label className="mb-1.5 block text-sm font-medium text-foreground">
                    Locality / Area
                  </label>
                  <Input
                    className="h-11"
                    value={location}
                    onChange={(e) => setLocation(e.target.value)}
                    placeholder="e.g., Andheri West"
                  />
                </div>
                <div>
                  <label className="mb-1.5 block text-sm font-medium text-foreground">
                    Full Address
                  </label>
                  <Input
                    className="h-11"
                    value={address}
                    onChange={(e) => setAddress(e.target.value)}
                    placeholder="Enter complete address"
                  />
                </div>
                <div>
                  <label className="mb-1.5 block text-sm font-medium text-foreground">
                    Project / Society Name{" "}
                    <span className="text-muted-foreground">(optional)</span>
                  </label>
                  <Input
                    className="h-11"
                    value={societyName}
                    onChange={(e) => setSocietyName(e.target.value)}
                    placeholder="e.g., Hiranandani Gardens"
                  />
                </div>
              </div>
            </div>

            {/* ── DETAILS ── */}
            <div className="rounded-2xl border border-border bg-card p-5">
              <h2 className="mb-4 text-base font-bold text-foreground">Property Details</h2>
              <div className="flex flex-col gap-4">
                <div className="grid gap-4 sm:grid-cols-2">
                  <div>
                    <label className="mb-1.5 block text-sm font-medium text-foreground">
                      Carpet Area (sqft)
                    </label>
                    <Input
                      type="number"
                      className="h-11"
                      value={area}
                      onChange={(e) => setArea(e.target.value)}
                      placeholder="e.g., 1200"
                    />
                  </div>
                  <div>
                    <label className="mb-1.5 block text-sm font-medium text-foreground">
                      Expected Price (₹)
                    </label>
                    <Input
                      type="number"
                      className="h-11"
                      value={price}
                      onChange={(e) => setPrice(e.target.value)}
                      placeholder="e.g., 15000000"
                    />
                    {price && (
                      <p className="mt-1 text-xs text-muted-foreground">
                        = {formatPriceLabel(parseFloat(price), listingType)}
                      </p>
                    )}
                  </div>
                </div>

                <div>
                  <label className="mb-1.5 block text-sm font-medium text-foreground">
                    Construction Status
                  </label>
                  <Select value={status} onValueChange={setStatus}>
                    <SelectTrigger className="h-11">
                      <SelectValue placeholder="Select status" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Ready to Move">Ready to Move</SelectItem>
                      <SelectItem value="Under Construction">Under Construction</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div>
                  <label className="mb-1.5 block text-sm font-medium text-foreground">
                    Description
                  </label>
                  <textarea
                    className="flex min-h-[120px] w-full rounded-xl border border-input bg-background px-3 py-2 text-sm placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    placeholder="Describe your property..."
                  />
                </div>

                {/* Amenities */}
                <div>
                  <label className="mb-2 block text-sm font-medium text-foreground">
                    Amenities
                  </label>
                  <div className="flex flex-wrap gap-2">
                    {AMENITIES_LIST.map((amenity) => (
                      <Badge
                        key={amenity}
                        variant="outline"
                        onClick={() => toggleAmenity(amenity)}
                        className={`cursor-pointer px-3 py-1.5 text-xs transition-colors ${
                          selectedAmenities.includes(amenity)
                            ? "border-primary bg-primary text-primary-foreground"
                            : "hover:border-primary/50"
                        }`}
                      >
                        {selectedAmenities.includes(amenity) && (
                          <Check className="mr-1 h-3 w-3" />
                        )}
                        {amenity}
                      </Badge>
                    ))}
                  </div>
                </div>

                {/* Featured Toggle */}
                <div
                  className={`flex cursor-pointer items-center justify-between rounded-xl border p-4 transition-colors ${
                    featured ? "border-primary bg-primary/5" : "border-border"
                  }`}
                  onClick={() => setFeatured(!featured)}
                >
                  <div className="flex items-center gap-3">
                    <div className={`flex h-9 w-9 items-center justify-center rounded-lg ${
                      featured ? "bg-primary text-primary-foreground" : "bg-secondary text-muted-foreground"
                    }`}>
                      <Star className="h-4 w-4" />
                    </div>
                    <div>
                      <p className="text-sm font-semibold text-foreground">Featured Property</p>
                      <p className="text-xs text-muted-foreground">Show on home page</p>
                    </div>
                  </div>
                  <div className={`relative h-6 w-11 rounded-full transition-colors ${
                    featured ? "bg-primary" : "bg-secondary border border-border"
                  }`}>
                    <span className={`absolute top-0.5 h-5 w-5 rounded-full bg-white shadow transition-transform ${
                      featured ? "translate-x-5" : "translate-x-0.5"
                    }`} />
                  </div>
                </div>

                {/* Verified Toggle */}
                <div
                  className={`flex cursor-pointer items-center justify-between rounded-xl border p-4 transition-colors ${
                    verified ? "border-emerald-500 bg-emerald-50" : "border-border"
                  }`}
                  onClick={() => setVerified(!verified)}
                >
                  <div className="flex items-center gap-3">
                    <div className={`flex h-9 w-9 items-center justify-center rounded-lg ${
                      verified ? "bg-emerald-500 text-white" : "bg-secondary text-muted-foreground"
                    }`}>
                      <Check className="h-4 w-4" />
                    </div>
                    <div>
                      <p className="text-sm font-semibold text-foreground">Verified Listing</p>
                      <p className="text-xs text-muted-foreground">Mark as verified by admin</p>
                    </div>
                  </div>
                  <div className={`relative h-6 w-11 rounded-full transition-colors ${
                    verified ? "bg-emerald-500" : "bg-secondary border border-border"
                  }`}>
                    <span className={`absolute top-0.5 h-5 w-5 rounded-full bg-white shadow transition-transform ${
                      verified ? "translate-x-5" : "translate-x-0.5"
                    }`} />
                  </div>
                </div>
              </div>
            </div>

            {/* ── PHOTOS ── */}
            <div className="rounded-2xl border border-border bg-card p-5">
              <h2 className="mb-4 text-base font-bold text-foreground">Photos</h2>

              {/* Existing Images */}
              {existingImages.length > 0 && (
                <div className="mb-4">
                  <p className="mb-2 text-sm font-medium text-foreground">
                    Current Photos ({existingImages.length})
                  </p>
                  <div className="grid grid-cols-3 gap-3 sm:grid-cols-4">
                    {existingImages.map((url, i) => (
                      <div key={i} className="relative aspect-square">
                        <img
                          src={url}
                          alt={`Photo ${i + 1}`}
                          className="h-full w-full rounded-xl object-cover"
                        />
                        <button
                          onClick={() => removeExistingImage(i)}
                          className="absolute -right-1.5 -top-1.5 flex h-5 w-5 items-center justify-center rounded-full bg-destructive text-white shadow"
                        >
                          <X className="h-3 w-3" />
                        </button>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Upload New */}
              <div
                className="flex cursor-pointer flex-col items-center justify-center rounded-2xl border-2 border-dashed border-border py-8 transition-colors hover:border-primary/50"
                onClick={() => fileInputRef.current?.click()}
              >
                <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-secondary">
                  <Upload className="h-5 w-5 text-muted-foreground" />
                </div>
                <p className="mt-2 text-sm font-medium text-foreground">Add more photos</p>
                <p className="mt-1 text-xs text-muted-foreground">
                  Click to browse (max 10 total)
                </p>
                <Button variant="outline" size="sm" className="mt-3 gap-1.5" type="button">
                  <Camera className="h-3.5 w-3.5" />
                  Browse Photos
                </Button>
                <input
                  ref={fileInputRef}
                  type="file"
                  accept="image/*"
                  multiple
                  className="hidden"
                  onChange={handleFileChange}
                />
              </div>

              {/* New Previews */}
              {newPreviews.length > 0 && (
                <div className="mt-4">
                  <p className="mb-2 text-sm font-medium text-foreground">
                    New Photos ({newPreviews.length})
                  </p>
                  <div className="grid grid-cols-3 gap-3 sm:grid-cols-4">
                    {newPreviews.map((url, i) => (
                      <div key={i} className="relative aspect-square">
                        <img
                          src={url}
                          alt={`New ${i + 1}`}
                          className="h-full w-full rounded-xl object-cover"
                        />
                        <button
                          onClick={() => removeNewImage(i)}
                          className="absolute -right-1.5 -top-1.5 flex h-5 w-5 items-center justify-center rounded-full bg-destructive text-white shadow"
                        >
                          <X className="h-3 w-3" />
                        </button>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* Submit */}
            <div className="flex gap-3">
              <Button
                variant="outline"
                className="flex-1"
                onClick={() => router.push("/dashboard")}
                disabled={submitting}
              >
                Cancel
              </Button>
              <Button
                className="flex-1 gap-2"
                onClick={handleSubmit}
                disabled={submitting}
              >
                {submitting ? (
                  <>
                    <Loader2 className="h-4 w-4 animate-spin" />
                    {uploadLoading ? "Uploading..." : "Saving..."}
                  </>
                ) : (
                  <>
                    <Save className="h-4 w-4" />
                    Save Changes
                  </>
                )}
              </Button>
            </div>

          </div>
        </div>
      </main>
      <SiteFooter />
    </div>
  )
}
