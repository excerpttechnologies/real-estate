// "use client"

// import { useState } from "react"
// import Link from "next/link"
// import { SiteHeader } from "@/app/components/site-header"
// import { SiteFooter } from "@/app/components/site-footer"
// import { Button } from "@/app/components/ui/button"
// import { Input } from "@/app/components/ui/input"
// import {
//   Select,
//   SelectContent,
//   SelectItem,
//   SelectTrigger,
//   SelectValue,
// } from "@/app/components/ui/select"
// import { Badge } from "@/app/components/ui/badge"
// import {
//   ArrowLeft,
//   ArrowRight,
//   Building2,
//   Camera,
//   Check,
//   Home,
//   MapPin,
//   Upload,
// } from "lucide-react"

// const steps = [
//   { id: 1, title: "Basic Info", icon: Home },
//   { id: 2, title: "Location", icon: MapPin },
//   { id: 3, title: "Details", icon: Building2 },
//   { id: 4, title: "Photos", icon: Camera },
// ]

// export default function PostPropertyPage() {
//   const [currentStep, setCurrentStep] = useState(1)
//   const [listingType, setListingType] = useState<"sell" | "rent" | "commercial">("sell")

//   return (
//     <div className="flex min-h-screen flex-col">
//       <SiteHeader />
//       <main className="flex-1 bg-background">
//         <div className="mx-auto max-w-3xl px-4 py-8">
//           {/* Header */}
//           <div className="mb-6">
//             <Link
//               href="/"
//               className="mb-3 flex items-center gap-1 text-sm text-muted-foreground hover:text-primary"
//             >
//               <ArrowLeft className="h-4 w-4" />
//               Back to Home
//             </Link>
//             <h1 className="text-2xl font-bold text-foreground">Post Your Property</h1>
//             <p className="mt-1 text-sm text-muted-foreground">
//               Fill in the details below to list your property for free
//             </p>
//           </div>

//           {/* Progress Steps */}
//           <div className="mb-8 flex items-center justify-between">
//             {steps.map((step, i) => (
//               <div key={step.id} className="flex items-center gap-2">
//                 <div className="flex flex-col items-center gap-1">
//                   <div
//                     className={`flex h-10 w-10 items-center justify-center rounded-full text-sm font-medium transition-colors ${
//                       currentStep >= step.id
//                         ? "bg-primary text-primary-foreground"
//                         : "bg-secondary text-muted-foreground"
//                     }`}
//                   >
//                     {currentStep > step.id ? (
//                       <Check className="h-4 w-4" />
//                     ) : (
//                       <step.icon className="h-4 w-4" />
//                     )}
//                   </div>
//                   <span className="hidden text-xs font-medium text-muted-foreground sm:block">
//                     {step.title}
//                   </span>
//                 </div>
//                 {i < steps.length - 1 && (
//                   <div
//                     className={`mx-2 h-0.5 w-12 rounded-full sm:w-20 ${
//                       currentStep > step.id ? "bg-primary" : "bg-border"
//                     }`}
//                   />
//                 )}
//               </div>
//             ))}
//           </div>

//           {/* Form Content */}
//           <div className="rounded-2xl border border-border bg-card p-6">
//             {currentStep === 1 && (
//               <div className="flex flex-col gap-5">
//                 <h2 className="text-lg font-bold text-foreground">Basic Information</h2>

//                 <div>
//                   <label className="mb-2 block text-sm font-medium text-foreground">
//                     I want to
//                   </label>
//                   <div className="flex gap-2">
//                     {(["sell", "rent", "commercial"] as const).map((type) => (
//                       <button
//                         key={type}
//                         onClick={() => setListingType(type)}
//                         className={`flex-1 rounded-xl border px-4 py-3 text-sm font-medium capitalize transition-all ${
//                           listingType === type
//                             ? "border-primary bg-primary/5 text-primary"
//                             : "border-border text-muted-foreground hover:border-primary/50"
//                         }`}
//                       >
//                         {type === "commercial" ? "Lease/Commercial" : type}
//                       </button>
//                     ))}
//                   </div>
//                 </div>

//                 <div>
//                   <label className="mb-1.5 block text-sm font-medium text-foreground">
//                     Property Type
//                   </label>
//                   <Select>
//                     <SelectTrigger className="h-11">
//                       <SelectValue placeholder="Select property type" />
//                     </SelectTrigger>
//                     <SelectContent>
//                       <SelectItem value="apartment">Apartment</SelectItem>
//                       <SelectItem value="villa">Villa</SelectItem>
//                       <SelectItem value="plot">Plot</SelectItem>
//                       <SelectItem value="commercial">Commercial Space</SelectItem>
//                       <SelectItem value="penthouse">Penthouse</SelectItem>
//                       <SelectItem value="studio">Studio</SelectItem>
//                     </SelectContent>
//                   </Select>
//                 </div>

//                 <div className="grid gap-4 sm:grid-cols-2">
//                   <div>
//                     <label className="mb-1.5 block text-sm font-medium text-foreground">
//                       Bedrooms
//                     </label>
//                     <div className="flex gap-2">
//                       {["1", "2", "3", "4", "5+"].map((val) => (
//                         <button
//                           key={val}
//                           className="flex-1 rounded-lg border border-border px-3 py-2 text-sm text-muted-foreground transition-colors hover:border-primary hover:text-primary"
//                         >
//                           {val}
//                         </button>
//                       ))}
//                     </div>
//                   </div>
//                   <div>
//                     <label className="mb-1.5 block text-sm font-medium text-foreground">
//                       Bathrooms
//                     </label>
//                     <div className="flex gap-2">
//                       {["1", "2", "3", "4+"].map((val) => (
//                         <button
//                           key={val}
//                           className="flex-1 rounded-lg border border-border px-3 py-2 text-sm text-muted-foreground transition-colors hover:border-primary hover:text-primary"
//                         >
//                           {val}
//                         </button>
//                       ))}
//                     </div>
//                   </div>
//                 </div>

//                 <div>
//                   <label className="mb-1.5 block text-sm font-medium text-foreground">
//                     Furnishing Status
//                   </label>
//                   <Select>
//                     <SelectTrigger className="h-11">
//                       <SelectValue placeholder="Select furnishing" />
//                     </SelectTrigger>
//                     <SelectContent>
//                       <SelectItem value="furnished">Furnished</SelectItem>
//                       <SelectItem value="semi">Semi-Furnished</SelectItem>
//                       <SelectItem value="unfurnished">Unfurnished</SelectItem>
//                     </SelectContent>
//                   </Select>
//                 </div>
//               </div>
//             )}

//             {currentStep === 2 && (
//               <div className="flex flex-col gap-5">
//                 <h2 className="text-lg font-bold text-foreground">Location Details</h2>

//                 <div>
//                   <label className="mb-1.5 block text-sm font-medium text-foreground">
//                     City
//                   </label>
//                   <Select>
//                     <SelectTrigger className="h-11">
//                       <SelectValue placeholder="Select city" />
//                     </SelectTrigger>
//                     <SelectContent>
//                       {["Mumbai", "Bangalore", "Delhi NCR", "Hyderabad", "Pune", "Chennai"].map(
//                         (city) => (
//                           <SelectItem key={city} value={city.toLowerCase()}>
//                             {city}
//                           </SelectItem>
//                         )
//                       )}
//                     </SelectContent>
//                   </Select>
//                 </div>

//                 <div>
//                   <label className="mb-1.5 block text-sm font-medium text-foreground">
//                     Locality / Area
//                   </label>
//                   <Input className="h-11" placeholder="e.g., Andheri West, Koramangala" />
//                 </div>

//                 <div>
//                   <label className="mb-1.5 block text-sm font-medium text-foreground">
//                     Full Address
//                   </label>
//                   <Input className="h-11" placeholder="Enter complete address" />
//                 </div>

//                 <div>
//                   <label className="mb-1.5 block text-sm font-medium text-foreground">
//                     Project / Society Name (optional)
//                   </label>
//                   <Input className="h-11" placeholder="e.g., Hiranandani Gardens" />
//                 </div>
//               </div>
//             )}

//             {currentStep === 3 && (
//               <div className="flex flex-col gap-5">
//                 <h2 className="text-lg font-bold text-foreground">Property Details</h2>

//                 <div className="grid gap-4 sm:grid-cols-2">
//                   <div>
//                     <label className="mb-1.5 block text-sm font-medium text-foreground">
//                       Built-up Area (sqft)
//                     </label>
//                     <Input type="number" className="h-11" placeholder="e.g., 1200" />
//                   </div>
//                   <div>
//                     <label className="mb-1.5 block text-sm font-medium text-foreground">
//                       Carpet Area (sqft)
//                     </label>
//                     <Input type="number" className="h-11" placeholder="e.g., 1000" />
//                   </div>
//                 </div>

//                 <div className="grid gap-4 sm:grid-cols-2">
//                   <div>
//                     <label className="mb-1.5 block text-sm font-medium text-foreground">
//                       Expected Price
//                     </label>
//                     <Input type="number" className="h-11" placeholder="e.g., 15000000" />
//                   </div>
//                   <div>
//                     <label className="mb-1.5 block text-sm font-medium text-foreground">
//                       Construction Status
//                     </label>
//                     <Select>
//                       <SelectTrigger className="h-11">
//                         <SelectValue placeholder="Select status" />
//                       </SelectTrigger>
//                       <SelectContent>
//                         <SelectItem value="ready">Ready to Move</SelectItem>
//                         <SelectItem value="under-construction">
//                           Under Construction
//                         </SelectItem>
//                       </SelectContent>
//                     </Select>
//                   </div>
//                 </div>

//                 <div>
//                   <label className="mb-1.5 block text-sm font-medium text-foreground">
//                     Description
//                   </label>
//                   <textarea
//                     className="flex min-h-[120px] w-full rounded-xl border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
//                     placeholder="Describe your property in detail..."
//                   />
//                 </div>

//                 <div>
//                   <label className="mb-2 block text-sm font-medium text-foreground">
//                     Amenities
//                   </label>
//                   <div className="flex flex-wrap gap-2">
//                     {[
//                       "Swimming Pool",
//                       "Gym",
//                       "Parking",
//                       "Security",
//                       "Power Backup",
//                       "Clubhouse",
//                       "Garden",
//                       "Lift",
//                       "WiFi",
//                       "Children Play Area",
//                     ].map((amenity) => (
//                       <Badge
//                         key={amenity}
//                         variant="outline"
//                         className="cursor-pointer px-3 py-1.5 text-xs transition-colors hover:bg-primary hover:text-primary-foreground"
//                       >
//                         {amenity}
//                       </Badge>
//                     ))}
//                   </div>
//                 </div>
//               </div>
//             )}

//             {currentStep === 4 && (
//               <div className="flex flex-col gap-5">
//                 <h2 className="text-lg font-bold text-foreground">Upload Photos</h2>
//                 <p className="text-sm text-muted-foreground">
//                   Add high-quality photos to attract more buyers. Properties with photos get
//                   5x more views.
//                 </p>

//                 <div className="flex flex-col items-center justify-center rounded-2xl border-2 border-dashed border-border py-12 transition-colors hover:border-primary/50">
//                   <div className="flex h-14 w-14 items-center justify-center rounded-xl bg-secondary">
//                     <Upload className="h-6 w-6 text-muted-foreground" />
//                   </div>
//                   <p className="mt-3 text-sm font-medium text-foreground">
//                     Drag & drop photos here
//                   </p>
//                   <p className="mt-1 text-xs text-muted-foreground">
//                     or click to browse (max 10 photos, 5MB each)
//                   </p>
//                   <Button variant="outline" size="sm" className="mt-4 gap-1.5">
//                     <Camera className="h-3.5 w-3.5" />
//                     Browse Photos
//                   </Button>
//                 </div>

//                 <div className="rounded-xl bg-secondary/50 p-4">
//                   <h3 className="text-sm font-semibold text-foreground">Photo Tips</h3>
//                   <ul className="mt-2 flex flex-col gap-1 text-xs text-muted-foreground">
//                     <li className="flex items-center gap-1.5">
//                       <Check className="h-3 w-3 text-primary" />
//                       Use natural lighting for best results
//                     </li>
//                     <li className="flex items-center gap-1.5">
//                       <Check className="h-3 w-3 text-primary" />
//                       Include photos of all rooms
//                     </li>
//                     <li className="flex items-center gap-1.5">
//                       <Check className="h-3 w-3 text-primary" />
//                       Add exterior and neighborhood shots
//                     </li>
//                     <li className="flex items-center gap-1.5">
//                       <Check className="h-3 w-3 text-primary" />
//                       Keep images landscape oriented
//                     </li>
//                   </ul>
//                 </div>
//               </div>
//             )}

//             {/* Navigation */}
//             <div className="mt-6 flex items-center justify-between border-t border-border pt-4">
//               <Button
//                 variant="outline"
//                 onClick={() => setCurrentStep(Math.max(1, currentStep - 1))}
//                 disabled={currentStep === 1}
//                 className="gap-1.5"
//               >
//                 <ArrowLeft className="h-4 w-4" />
//                 Previous
//               </Button>
//               {currentStep < 4 ? (
//                 <Button
//                   onClick={() => setCurrentStep(Math.min(4, currentStep + 1))}
//                   className="gap-1.5"
//                 >
//                   Next Step
//                   <ArrowRight className="h-4 w-4" />
//                 </Button>
//               ) : (
//                 <Button className="gap-1.5 bg-accent text-accent-foreground hover:bg-accent/90">
//                   <Check className="h-4 w-4" />
//                   Submit Property
//                 </Button>
//               )}
//             </div>
//           </div>
//         </div>
//       </main>
//       <SiteFooter />
//     </div>
//   )
// }





"use client"

import { useState, useEffect, useRef } from "react"
import { useRouter } from "next/navigation"
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
  ArrowRight,
  Building2,
  Camera,
  Check,
  Home,
  Loader2,
  MapPin,
  Upload,
  X,
} from "lucide-react"

const steps = [
  { id: 1, title: "Basic Info", icon: Home },
  { id: 2, title: "Location", icon: MapPin },
  { id: 3, title: "Details", icon: Building2 },
  { id: 4, title: "Photos", icon: Camera },
]

const AMENITIES_LIST = [
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
]

function formatPriceLabel(price: number, listingType: string): string {
  if (listingType === "rent") {
    return `₹${price.toLocaleString("en-IN")}/mo`
  }
  if (price >= 10000000)
    return `₹${(price / 10000000).toFixed(2)} Cr`
  if (price >= 100000)
    return `₹${(price / 100000).toFixed(2)} L`
  return `₹${price.toLocaleString("en-IN")}`
}

export default function PostPropertyPage() {
  const { isLoggedIn, isAdmin, loading: authLoading } = useAuth()
  const router = useRouter()
  const fileInputRef = useRef<HTMLInputElement>(null)

  const [currentStep, setCurrentStep] = useState(1)
  const [submitting, setSubmitting] = useState(false)
  const [submitError, setSubmitError] = useState("")

  // Step 1 — Basic Info
  const [listingType, setListingType] = useState<"buy" | "rent" | "commercial">("buy")
  const [propertyType, setPropertyType] = useState("")
  const [bedrooms, setBedrooms] = useState("")
  const [bathrooms, setBathrooms] = useState("")
  const [furnishing, setFurnishing] = useState("")

  // Step 2 — Location
  const [city, setCity] = useState("")
  const [location, setLocation] = useState("")
  const [address, setAddress] = useState("")
  const [societyName, setSocietyName] = useState("")

  // Step 3 — Details
  const [area, setArea] = useState("")
  const [price, setPrice] = useState("")
  const [status, setStatus] = useState("")
  const [description, setDescription] = useState("")
  const [selectedAmenities, setSelectedAmenities] = useState<string[]>([])

  // Step 4 — Photos
  const [selectedFiles, setSelectedFiles] = useState<File[]>([])
  const [previewUrls, setPreviewUrls] = useState<string[]>([])
  const [uploadLoading, setUploadLoading] = useState(false)
  const [uploadedUrls, setUploadedUrls] = useState<string[]>([])

  // Redirect if not logged in or not admin
  useEffect(() => {
    if (!authLoading) {
      if (!isLoggedIn) {
        router.push("/login")
      } else if (!isAdmin) {
        router.push("/")
      }
    }
  }, [authLoading, isLoggedIn, isAdmin])

  function toggleAmenity(amenity: string) {
    setSelectedAmenities((prev) =>
      prev.includes(amenity)
        ? prev.filter((a) => a !== amenity)
        : [...prev, amenity]
    )
  }

  function handleFileChange(e: React.ChangeEvent<HTMLInputElement>) {
    const files = Array.from(e.target.files || [])
    if (files.length === 0) return

    // Max 10 images
    const newFiles = [...selectedFiles, ...files].slice(0, 10)
    setSelectedFiles(newFiles)

    // Generate previews
    const previews = newFiles.map((file) => URL.createObjectURL(file))
    setPreviewUrls(previews)
  }

  function removeImage(index: number) {
    const newFiles = selectedFiles.filter((_, i) => i !== index)
    const newPreviews = previewUrls.filter((_, i) => i !== index)
    setSelectedFiles(newFiles)
    setPreviewUrls(newPreviews)
  }

  // Validate each step before proceeding
  function validateStep(step: number): string {
    if (step === 1) {
      if (!propertyType) return "Please select a property type"
      if (!furnishing) return "Please select furnishing status"
      if (propertyType !== "Plot" && propertyType !== "Commercial") {
        if (!bedrooms) return "Please select number of bedrooms"
        if (!bathrooms) return "Please select number of bathrooms"
      }
    }
    if (step === 2) {
      if (!city) return "Please select a city"
      if (!location) return "Please enter locality / area"
    }
    if (step === 3) {
      if (!area) return "Please enter area in sqft"
      if (!price) return "Please enter expected price"
      if (!status) return "Please select construction status"
      if (!description) return "Please enter a description"
    }
    return ""
  }

  function handleNext() {
    const error = validateStep(currentStep)
    if (error) {
      setSubmitError(error)
      return
    }
    setSubmitError("")
    setCurrentStep((prev) => Math.min(4, prev + 1))
  }

  async function handleSubmit() {
    setSubmitError("")
    setSubmitting(true)

    try {
      // Upload images first if any
      let imageUrls: string[] = []
      if (selectedFiles.length > 0) {
        setUploadLoading(true)
        const formData = new FormData()
        selectedFiles.forEach((file) => formData.append("images", file))

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
        imageUrls = uploadData.urls
        setUploadedUrls(imageUrls)
        setUploadLoading(false)
      }

      // Build property payload
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
        images: imageUrls,
        amenities: selectedAmenities,
        verified: false,
        featured: false,
      }

      const res = await fetch("/api/properties", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify(payload),
      })

     const data = await res.json()

if (!res.ok) {
  console.log("❌ API Error details:", JSON.stringify(data, null, 2))
  console.log("❌ Payload sent:", JSON.stringify(payload, null, 2))
  setSubmitError(data.error || "Failed to post property")
  return
}

      // Success — redirect to the new property page
      router.push(`/property/${data.property._id}`)
    } catch {
      setSubmitError("Something went wrong. Please try again.")
    } finally {
      setSubmitting(false)
    }
  }

  // Auth loading
  if (authLoading) {
    return (
      <div className="flex min-h-screen flex-col">
        <SiteHeader />
        <div className="flex flex-1 items-center justify-center">
          <Loader2 className="h-8 w-8 animate-spin text-primary" />
        </div>
      </div>
    )
  }

  // Not admin
  if (!isAdmin) return null

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
            <h1 className="text-2xl font-bold text-foreground">
              Post Your Property
            </h1>
            <p className="mt-1 text-sm text-muted-foreground">
              Fill in the details below to list your property
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

          {/* Form */}
          <div className="rounded-2xl border border-border bg-card p-6">

            {/* Error */}
            {submitError && (
              <div className="mb-4 rounded-xl border border-destructive/30 bg-destructive/10 px-4 py-3 text-sm text-destructive">
                {submitError}
              </div>
            )}

            {/* ── STEP 1 — Basic Info ── */}
            {currentStep === 1 && (
              <div className="flex flex-col gap-5">
                <h2 className="text-lg font-bold text-foreground">
                  Basic Information
                </h2>

                {/* Listing Type */}
                <div>
                  <label className="mb-2 block text-sm font-medium text-foreground">
                    I want to
                  </label>
                  <div className="flex gap-2">
                    {(["buy", "rent", "commercial"] as const).map((type) => (
                      <button
                        key={type}
                        onClick={() => setListingType(type)}
                        className={`flex-1 rounded-xl border px-4 py-3 text-sm font-medium capitalize transition-all ${
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

                {/* Bedrooms & Bathrooms — hide for Plot/Commercial */}
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
            )}

            {/* ── STEP 2 — Location ── */}
            {currentStep === 2 && (
              <div className="flex flex-col gap-5">
                <h2 className="text-lg font-bold text-foreground">
                  Location Details
                </h2>

                <div>
                  <label className="mb-1.5 block text-sm font-medium text-foreground">
                    City
                  </label>
                  <Select value={city} onValueChange={setCity}>
                    <SelectTrigger className="h-11">
                      <SelectValue placeholder="Select city" />
                    </SelectTrigger>
                    <SelectContent>
                      {[
                        "Mumbai",
                        "Bangalore",
                        "Delhi NCR",
                        "Hyderabad",
                        "Pune",
                        "Chennai",
                      ].map((c) => (
                        <SelectItem key={c} value={c}>
                          {c}
                        </SelectItem>
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
                    placeholder="e.g., Andheri West, Koramangala"
                    value={location}
                    onChange={(e) => setLocation(e.target.value)}
                  />
                </div>

                <div>
                  <label className="mb-1.5 block text-sm font-medium text-foreground">
                    Full Address
                  </label>
                  <Input
                    className="h-11"
                    placeholder="Enter complete address"
                    value={address}
                    onChange={(e) => setAddress(e.target.value)}
                  />
                </div>

                <div>
                  <label className="mb-1.5 block text-sm font-medium text-foreground">
                    Project / Society Name{" "}
                    <span className="text-muted-foreground">(optional)</span>
                  </label>
                  <Input
                    className="h-11"
                    placeholder="e.g., Hiranandani Gardens"
                    value={societyName}
                    onChange={(e) => setSocietyName(e.target.value)}
                  />
                </div>
              </div>
            )}

            {/* ── STEP 3 — Details ── */}
            {currentStep === 3 && (
              <div className="flex flex-col gap-5">
                <h2 className="text-lg font-bold text-foreground">
                  Property Details
                </h2>

                <div className="grid gap-4 sm:grid-cols-2">
                  <div>
                    <label className="mb-1.5 block text-sm font-medium text-foreground">
                      Carpet Area (sqft)
                    </label>
                    <Input
                      type="number"
                      className="h-11"
                      placeholder="e.g., 1200"
                      value={area}
                      onChange={(e) => setArea(e.target.value)}
                    />
                  </div>
                  <div>
                    <label className="mb-1.5 block text-sm font-medium text-foreground">
                      Expected Price (₹)
                    </label>
                    <Input
                      type="number"
                      className="h-11"
                      placeholder="e.g., 15000000"
                      value={price}
                      onChange={(e) => setPrice(e.target.value)}
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
                      <SelectItem value="Under Construction">
                        Under Construction
                      </SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div>
                  <label className="mb-1.5 block text-sm font-medium text-foreground">
                    Description
                  </label>
                  <textarea
                    className="flex min-h-[120px] w-full rounded-xl border border-input bg-background px-3 py-2 text-sm placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
                    placeholder="Describe your property in detail..."
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                  />
                </div>

                <div>
                  <label className="mb-2 block text-sm font-medium text-foreground">
                    Amenities{" "}
                    <span className="text-muted-foreground">(select all that apply)</span>
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
              </div>
            )}

            {/* ── STEP 4 — Photos ── */}
            {currentStep === 4 && (
              <div className="flex flex-col gap-5">
                <h2 className="text-lg font-bold text-foreground">
                  Upload Photos
                </h2>
                <p className="text-sm text-muted-foreground">
                  Add high-quality photos to attract more buyers. Properties
                  with photos get 5x more views.
                </p>

                {/* Upload Area */}
                <div
                  className="flex flex-col items-center justify-center rounded-2xl border-2 border-dashed border-border py-12 transition-colors hover:border-primary/50 cursor-pointer"
                  onClick={() => fileInputRef.current?.click()}
                >
                  <div className="flex h-14 w-14 items-center justify-center rounded-xl bg-secondary">
                    <Upload className="h-6 w-6 text-muted-foreground" />
                  </div>
                  <p className="mt-3 text-sm font-medium text-foreground">
                    Drag & drop photos here
                  </p>
                  <p className="mt-1 text-xs text-muted-foreground">
                    or click to browse (max 10 photos, 5MB each)
                  </p>
                  <Button
                    variant="outline"
                    size="sm"
                    className="mt-4 gap-1.5"
                    type="button"
                  >
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

                {/* Image Previews */}
                {previewUrls.length > 0 && (
                  <div>
                    <p className="mb-2 text-sm font-medium text-foreground">
                      {previewUrls.length} photo{previewUrls.length > 1 ? "s" : ""} selected
                    </p>
                    <div className="grid grid-cols-3 gap-3 sm:grid-cols-4">
                      {previewUrls.map((url, i) => (
                        <div key={i} className="relative aspect-square">
                          <img
                            src={url}
                            alt={`Preview ${i + 1}`}
                            className="h-full w-full rounded-xl object-cover"
                          />
                          <button
                            onClick={() => removeImage(i)}
                            className="absolute -right-1.5 -top-1.5 flex h-5 w-5 items-center justify-center rounded-full bg-destructive text-white shadow"
                          >
                            <X className="h-3 w-3" />
                          </button>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* Photo Tips */}
                <div className="rounded-xl bg-secondary/50 p-4">
                  <h3 className="text-sm font-semibold text-foreground">
                    Photo Tips
                  </h3>
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

            {/* Navigation Buttons */}
            <div className="mt-6 flex items-center justify-between border-t border-border pt-4">
              <Button
                variant="outline"
                onClick={() => {
                  setSubmitError("")
                  setCurrentStep((prev) => Math.max(1, prev - 1))
                }}
                disabled={currentStep === 1}
                className="gap-1.5"
              >
                <ArrowLeft className="h-4 w-4" />
                Previous
              </Button>

              {currentStep < 4 ? (
                <Button onClick={handleNext} className="gap-1.5">
                  Next Step
                  <ArrowRight className="h-4 w-4" />
                </Button>
              ) : (
                <Button
                  onClick={handleSubmit}
                  disabled={submitting}
                  className="gap-1.5 bg-accent text-accent-foreground hover:bg-accent/90"
                >
                  {submitting ? (
                    <>
                      <Loader2 className="h-4 w-4 animate-spin" />
                      {uploadLoading ? "Uploading photos..." : "Submitting..."}
                    </>
                  ) : (
                    <>
                      <Check className="h-4 w-4" />
                      Submit Property
                    </>
                  )}
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
