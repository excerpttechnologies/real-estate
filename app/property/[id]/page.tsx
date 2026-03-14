





// "use client"

// import { use, useState, useEffect } from "react"
// import { notFound, useRouter } from "next/navigation"
// import Link from "next/link"
// import { SiteHeader } from "@/app/components/site-header"
// import { SiteFooter } from "@/app/components/site-footer"
// import { PropertyCard } from "@/app/components/property-card"
// import { ImageGallery } from "@/app/components/property/image-gallery"
// import { Badge } from "@/app/components/ui/badge"
// import { Button } from "@/app/components/ui/button"
// import { Input } from "@/app/components/ui/input"
// import { useAuth } from "@/app/lib/auth-context"
// import {
//   ArrowLeft,
//   Bath,
//   Bed,
//   Building2,
//   Calendar,
//   Check,
//   Heart,
//   Loader2,
//   MapPin,
//   Maximize,
//   MessageSquare,
//   Phone,
//   Share2,
//   ShieldCheck,
//   User,
//   Wallet,
//   X,
// } from "lucide-react"

// interface Property {
//   _id: string
//   title: string
//   price: number
//   priceLabel: string
//   location: string
//   city: string
//   area: number
//   bedrooms: number
//   bathrooms: number
//   type: string
//   status: string
//   furnishing: string
//   postedBy: { _id: string; name: string; email: string; phone?: string } | string
//   verified: boolean
//   featured: boolean
//   images: string[]
//   amenities: string[]
//   listingType: string
//   description: string
//   createdAt: string
// }

// function formatPrice(amount: number): string {
//   if (amount >= 10000000) return `₹${(amount / 10000000).toFixed(2)} Cr`
//   if (amount >= 100000) return `₹${(amount / 100000).toFixed(2)} L`
//   return `₹${amount.toLocaleString("en-IN")}`
// }

// export default function PropertyDetailPage({
//   params,
// }: {
//   params: Promise<{ id: string }>
// }) {
//   const { id } = use(params)
//   const { isLoggedIn } = useAuth()
//   const router = useRouter()

//   const [property, setProperty] = useState<Property | null>(null)
//   const [similarProperties, setSimilarProperties] = useState<Property[]>([])
//   const [loading, setLoading] = useState(true)
//   const [error, setError] = useState("")

//   // Save state
//   const [saved, setSaved] = useState(false)
//   const [saveLoading, setSaveLoading] = useState(false)

//   // Inquiry modal
//   const [showInquiry, setShowInquiry] = useState(false)
//   const [inquiryMessage, setInquiryMessage] = useState("")
//   const [inquiryLoading, setInquiryLoading] = useState(false)
//   const [inquirySuccess, setInquirySuccess] = useState(false)

//   // EMI Calculator
//   const [loanAmount, setLoanAmount] = useState("")
//   const [loanYears, setLoanYears] = useState("20")
//   const [loanRate, setLoanRate] = useState("8.5")

//   useEffect(() => {
//     fetchProperty()
//   }, [id])

//   async function fetchProperty() {
//     setLoading(true)
//     setError("")
//     try {
//       const res = await fetch(`/api/properties/${id}`)
//       const data = await res.json()

//       if (!res.ok) {
//         if (res.status === 404) notFound()
//         setError(data.error || "Failed to load property")
//         return
//       }

//       setProperty(data.property)
//       setSimilarProperties(data.similar || [])
//     } catch {
//       setError("Something went wrong. Please try again.")
//     } finally {
//       setLoading(false)
//     }
//   }

//   async function handleSave() {
//     if (!isLoggedIn) {
//       router.push("/login")
//       return
//     }

//     setSaveLoading(true)
//     try {
//       const method = saved ? "DELETE" : "POST"
//       const res = await fetch(`/api/saved/${id}`, {
//         method,
//         credentials: "include",
//       })

//       if (res.ok) {
//         setSaved(!saved)
//       }
//     } catch {
//       console.error("Save error")
//     } finally {
//       setSaveLoading(false)
//     }
//   }

//   async function handleInquiry() {
//     if (!isLoggedIn) {
//       router.push("/login")
//       return
//     }

//     if (!inquiryMessage.trim()) return

//     setInquiryLoading(true)
//     try {
//       const res = await fetch("/api/inquiries", {
//         method: "POST",
//         headers: { "Content-Type": "application/json" },
//         credentials: "include",
//         body: JSON.stringify({
//           propertyId: id,
//           message: inquiryMessage,
//         }),
//       })

//       if (res.ok) {
//         setInquirySuccess(true)
//         setInquiryMessage("")
//         setTimeout(() => {
//           setShowInquiry(false)
//           setInquirySuccess(false)
//         }, 2000)
//       }
//     } catch {
//       console.error("Inquiry error")
//     } finally {
//       setInquiryLoading(false)
//     }
//   }

//   function calculateEMI() {
//     if (!property) return 0
//     const principal = loanAmount
//       ? parseFloat(loanAmount)
//       : property.price * 0.8
//     const rate = parseFloat(loanRate) / 12 / 100
//     const months = parseInt(loanYears) * 12
//     if (rate === 0) return Math.round(principal / months)
//     const emi =
//       (principal * rate * Math.pow(1 + rate, months)) /
//       (Math.pow(1 + rate, months) - 1)
//     return Math.round(emi)
//   }

//   // ── Loading ──
//   if (loading) {
//     return (
//       <div className="flex min-h-screen flex-col">
//         <SiteHeader />
//         <div className="flex flex-1 items-center justify-center">
//           <div className="flex flex-col items-center gap-3">
//             <Loader2 className="h-8 w-8 animate-spin text-primary" />
//             <p className="text-sm text-muted-foreground">Loading property...</p>
//           </div>
//         </div>
//       </div>
//     )
//   }

//   // ── Error ──
//   if (error || !property) {
//     return (
//       <div className="flex min-h-screen flex-col">
//         <SiteHeader />
//         <div className="flex flex-1 items-center justify-center">
//           <div className="flex flex-col items-center gap-3">
//             <p className="text-lg font-semibold text-destructive">{error}</p>
//             <Button variant="outline" onClick={fetchProperty}>
//               Try Again
//             </Button>
//           </div>
//         </div>
//       </div>
//     )
//   }

//   const postedByName =
//     typeof property.postedBy === "object"
//       ? property.postedBy.name
//       : property.postedBy

//   return (
//     <div className="flex min-h-screen flex-col">
//       <SiteHeader />
//       <main className="flex-1 bg-background">

//         {/* Breadcrumb */}
//         <div className="border-b border-border bg-card">
//           <div className="mx-auto flex max-w-7xl items-center gap-3 px-4 py-3">
//             <Link
//               href="/properties"
//               className="flex items-center gap-1 text-sm text-muted-foreground transition-colors hover:text-primary"
//             >
//               <ArrowLeft className="h-4 w-4" />
//               Back to Search
//             </Link>
//             <span className="text-muted-foreground">/</span>
//             <span className="text-sm text-muted-foreground">{property.city}</span>
//             <span className="text-muted-foreground">/</span>
//             <span className="line-clamp-1 text-sm text-foreground">
//               {property.title}
//             </span>
//           </div>
//         </div>

//         <div className="mx-auto max-w-7xl px-4 py-6">

//           {/* Image Gallery */}
//           <ImageGallery images={property.images} title={property.title} />

//           {/* Content */}
//           <div className="mt-6 grid gap-6 lg:grid-cols-[1fr_380px]">

//             {/* Left: Details */}
//             <div className="flex flex-col gap-6">

//               {/* Title & Actions */}
//               <div className="rounded-2xl border border-border bg-card p-5">
//                 <div className="flex flex-wrap items-start justify-between gap-3">
//                   <div className="flex-1">
//                     <div className="flex flex-wrap items-center gap-2">
//                       <Badge className="bg-primary/10 text-primary">
//                         {property.listingType === "buy"
//                           ? "For Sale"
//                           : property.listingType === "rent"
//                           ? "For Rent"
//                           : "Commercial"}
//                       </Badge>
//                       {property.verified && (
//                         <Badge
//                           variant="outline"
//                           className="gap-1 border-emerald-200 bg-emerald-50 text-emerald-700"
//                         >
//                           <ShieldCheck className="h-3 w-3" />
//                           Verified
//                         </Badge>
//                       )}
//                       {property.featured && (
//                         <Badge className="bg-accent text-accent-foreground">
//                           Featured
//                         </Badge>
//                       )}
//                       <Badge variant="outline">{property.status}</Badge>
//                     </div>
//                     <h1 className="mt-2 text-xl font-bold text-foreground md:text-2xl">
//                       {property.title}
//                     </h1>
//                     <p className="mt-1 flex items-center gap-1.5 text-sm text-muted-foreground">
//                       <MapPin className="h-4 w-4" />
//                       {property.location}
//                     </p>
//                   </div>
//                   <div className="flex items-center gap-2">
//                     <Button
//                       variant="outline"
//                       size="icon"
//                       onClick={handleSave}
//                       disabled={saveLoading}
//                       aria-label={saved ? "Remove from saved" : "Save property"}
//                     >
//                       {saveLoading ? (
//                         <Loader2 className="h-4 w-4 animate-spin" />
//                       ) : (
//                         <Heart
//                           className={`h-4 w-4 ${
//                             saved ? "fill-red-500 text-red-500" : ""
//                           }`}
//                         />
//                       )}
//                     </Button>
//                     <Button
//                       variant="outline"
//                       size="icon"
//                       aria-label="Share property"
//                       onClick={() => {
//                         navigator.clipboard.writeText(window.location.href)
//                       }}
//                     >
//                       <Share2 className="h-4 w-4" />
//                     </Button>
//                   </div>
//                 </div>

//                 {/* Price */}
//                 <div className="mt-4 flex items-end gap-2">
//                   <p className="text-2xl font-bold text-foreground md:text-3xl">
//                     {property.priceLabel}
//                   </p>
//                   {property.listingType === "buy" && property.area > 0 && (
//                     <span className="mb-1 text-sm text-muted-foreground">
//                       ({formatPrice(Math.round(property.price / property.area))}
//                       /sqft)
//                     </span>
//                   )}
//                 </div>

//                 {/* Quick Stats */}
//                 <div className="mt-4 flex flex-wrap gap-6">
//                   {property.bedrooms > 0 && (
//                     <div className="flex items-center gap-2">
//                       <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-secondary">
//                         <Bed className="h-4 w-4 text-secondary-foreground" />
//                       </div>
//                       <div>
//                         <p className="text-sm font-semibold text-foreground">
//                           {property.bedrooms} BHK
//                         </p>
//                         <p className="text-xs text-muted-foreground">Bedrooms</p>
//                       </div>
//                     </div>
//                   )}
//                   <div className="flex items-center gap-2">
//                     <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-secondary">
//                       <Bath className="h-4 w-4 text-secondary-foreground" />
//                     </div>
//                     <div>
//                       <p className="text-sm font-semibold text-foreground">
//                         {property.bathrooms}
//                       </p>
//                       <p className="text-xs text-muted-foreground">Bathrooms</p>
//                     </div>
//                   </div>
//                   <div className="flex items-center gap-2">
//                     <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-secondary">
//                       <Maximize className="h-4 w-4 text-secondary-foreground" />
//                     </div>
//                     <div>
//                       <p className="text-sm font-semibold text-foreground">
//                         {property.area} sqft
//                       </p>
//                       <p className="text-xs text-muted-foreground">Carpet Area</p>
//                     </div>
//                   </div>
//                   <div className="flex items-center gap-2">
//                     <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-secondary">
//                       <Building2 className="h-4 w-4 text-secondary-foreground" />
//                     </div>
//                     <div>
//                       <p className="text-sm font-semibold text-foreground">
//                         {property.furnishing}
//                       </p>
//                       <p className="text-xs text-muted-foreground">Furnishing</p>
//                     </div>
//                   </div>
//                 </div>
//               </div>

//               {/* Description */}
//               <div className="rounded-2xl border border-border bg-card p-5">
//                 <h2 className="text-lg font-bold text-foreground">
//                   About this Property
//                 </h2>
//                 <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
//                   {property.description}
//                 </p>
//               </div>

//               {/* Amenities */}
//               {property.amenities?.length > 0 && (
//                 <div className="rounded-2xl border border-border bg-card p-5">
//                   <h2 className="text-lg font-bold text-foreground">Amenities</h2>
//                   <div className="mt-4 grid grid-cols-2 gap-3 md:grid-cols-3">
//                     {property.amenities.map((amenity) => (
//                       <div
//                         key={amenity}
//                         className="flex items-center gap-2 rounded-lg border border-border px-3 py-2.5"
//                       >
//                         <Check className="h-4 w-4 text-primary" />
//                         <span className="text-sm text-foreground">{amenity}</span>
//                       </div>
//                     ))}
//                   </div>
//                 </div>
//               )}

//               {/* EMI Calculator */}
//               {property.listingType === "buy" && (
//                 <div className="rounded-2xl border border-border bg-card p-5">
//                   <h2 className="flex items-center gap-2 text-lg font-bold text-foreground">
//                     <Wallet className="h-5 w-5 text-primary" />
//                     EMI Calculator
//                   </h2>
//                   <div className="mt-4 grid gap-4 md:grid-cols-3">
//                     <div>
//                       <label className="mb-1 block text-xs font-medium text-muted-foreground">
//                         Loan Amount
//                       </label>
//                       <Input
//                         type="number"
//                         placeholder={`${Math.round(property.price * 0.8)}`}
//                         value={loanAmount}
//                         onChange={(e) => setLoanAmount(e.target.value)}
//                       />
//                     </div>
//                     <div>
//                       <label className="mb-1 block text-xs font-medium text-muted-foreground">
//                         Tenure (Years)
//                       </label>
//                       <Input
//                         type="number"
//                         value={loanYears}
//                         onChange={(e) => setLoanYears(e.target.value)}
//                       />
//                     </div>
//                     <div>
//                       <label className="mb-1 block text-xs font-medium text-muted-foreground">
//                         Interest Rate (%)
//                       </label>
//                       <Input
//                         type="number"
//                         step="0.1"
//                         value={loanRate}
//                         onChange={(e) => setLoanRate(e.target.value)}
//                       />
//                     </div>
//                   </div>
//                   <div className="mt-4 flex items-center gap-3 rounded-xl bg-secondary p-4">
//                     <div>
//                       <p className="text-xs text-muted-foreground">Estimated EMI</p>
//                       <p className="text-xl font-bold text-foreground">
//                         {formatPrice(calculateEMI())}/mo
//                       </p>
//                     </div>
//                   </div>
//                 </div>
//               )}
//             </div>

//             {/* Right: Contact Card */}
//             <div className="flex flex-col gap-4">
//               <div className="sticky top-20 flex flex-col gap-4">

//                 {/* Contact Card */}
//                 <div className="rounded-2xl border border-border bg-card p-5">
//                   <h3 className="text-base font-bold text-foreground">
//                     Contact Seller
//                   </h3>
//                   <div className="mt-3 flex items-center gap-3">
//                     <div className="flex h-12 w-12 items-center justify-center rounded-full bg-secondary">
//                       <User className="h-5 w-5 text-secondary-foreground" />
//                     </div>
//                     <div>
//                       <p className="text-sm font-semibold text-foreground">
//                         {postedByName}
//                       </p>
//                       <p className="text-xs text-muted-foreground">
//                         Property Owner
//                       </p>
//                     </div>
//                   </div>
//                   <div className="mt-4 flex flex-col gap-2">
//                     {typeof property.postedBy === "object" &&
//                       property.postedBy.phone && (
//                         <Button className="w-full gap-2" asChild>
//                           <a href={`tel:${property.postedBy.phone}`}>
//                             <Phone className="h-4 w-4" />
//                             {property.postedBy.phone}
//                           </a>
//                         </Button>
//                       )}
//                     <Button
//                       variant="outline"
//                       className="w-full gap-2"
//                       onClick={() => {
//                         if (!isLoggedIn) {
//                           router.push("/login")
//                           return
//                         }
//                         setShowInquiry(true)
//                       }}
//                     >
//                       <MessageSquare className="h-4 w-4" />
//                       Send Message
//                     </Button>
//                   </div>
//                 </div>

//                 {/* Property Info Card */}
//                 <div className="rounded-2xl border border-border bg-card p-5">
//                   <h3 className="text-base font-bold text-foreground">
//                     Property Info
//                   </h3>
//                   <div className="mt-3 flex flex-col gap-3">
//                     <div className="flex items-center justify-between text-sm">
//                       <span className="text-muted-foreground">Type</span>
//                       <span className="font-medium text-foreground">
//                         {property.type}
//                       </span>
//                     </div>
//                     <div className="h-px bg-border" />
//                     <div className="flex items-center justify-between text-sm">
//                       <span className="text-muted-foreground">Status</span>
//                       <span className="font-medium text-foreground">
//                         {property.status}
//                       </span>
//                     </div>
//                     <div className="h-px bg-border" />
//                     <div className="flex items-center justify-between text-sm">
//                       <span className="text-muted-foreground">Furnishing</span>
//                       <span className="font-medium text-foreground">
//                         {property.furnishing}
//                       </span>
//                     </div>
//                     <div className="h-px bg-border" />
//                     <div className="flex items-center justify-between text-sm">
//                       <span className="text-muted-foreground">Listed</span>
//                       <span className="flex items-center gap-1 font-medium text-foreground">
//                         <Calendar className="h-3.5 w-3.5 text-muted-foreground" />
//                         {new Date(property.createdAt).toLocaleDateString(
//                           "en-IN",
//                           {
//                             day: "numeric",
//                             month: "short",
//                             year: "numeric",
//                           }
//                         )}
//                       </span>
//                     </div>
//                     <div className="h-px bg-border" />
//                     <div className="flex items-center justify-between text-sm">
//                       <span className="text-muted-foreground">City</span>
//                       <span className="font-medium text-foreground">
//                         {property.city}
//                       </span>
//                     </div>
//                   </div>
//                 </div>

//                 {/* Safety Tips */}
//                 <div className="rounded-2xl border border-border bg-secondary/50 p-5">
//                   <h3 className="flex items-center gap-1.5 text-sm font-bold text-foreground">
//                     <ShieldCheck className="h-4 w-4 text-primary" />
//                     Safety Tips
//                   </h3>
//                   <ul className="mt-2 flex flex-col gap-1.5 text-xs text-muted-foreground">
//                     <li className="flex items-start gap-1.5">
//                       <Check className="mt-0.5 h-3 w-3 shrink-0 text-primary" />
//                       Always verify property documents
//                     </li>
//                     <li className="flex items-start gap-1.5">
//                       <Check className="mt-0.5 h-3 w-3 shrink-0 text-primary" />
//                       Visit the property before paying
//                     </li>
//                     <li className="flex items-start gap-1.5">
//                       <Check className="mt-0.5 h-3 w-3 shrink-0 text-primary" />
//                       Never pay advance without agreement
//                     </li>
//                     <li className="flex items-start gap-1.5">
//                       <Check className="mt-0.5 h-3 w-3 shrink-0 text-primary" />
//                       Check for RERA registration
//                     </li>
//                   </ul>
//                 </div>
//               </div>
//             </div>
//           </div>

//           {/* Similar Properties */}
//           {similarProperties.length > 0 && (
//             <div className="mt-10">
//               <div className="mb-5 flex items-center justify-between">
//                 <h2 className="text-xl font-bold text-foreground">
//                   Similar Properties
//                 </h2>
//                 <Link
//                   href="/properties"
//                   className="text-sm font-medium text-primary hover:underline"
//                 >
//                   View All
//                 </Link>
//               </div>
//               <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
//                 {similarProperties.map((p) => (
//                   <PropertyCard
//                     key={p._id}
//                     property={{ ...p, id: p._id }}
//                   />
//                 ))}
//               </div>
//             </div>
//           )}
//         </div>
//       </main>
//       <SiteFooter />

//       {/* Inquiry Modal */}
//       {showInquiry && (
//         <div className="fixed inset-0 z-50 flex items-center justify-center bg-foreground/50 p-4">
//           <div className="w-full max-w-md rounded-2xl border border-border bg-card p-6 shadow-xl">
//             <div className="mb-4 flex items-center justify-between">
//               <h3 className="text-lg font-bold text-foreground">
//                 Send Inquiry
//               </h3>
//               <button
//                 onClick={() => setShowInquiry(false)}
//                 className="text-muted-foreground hover:text-foreground"
//               >
//                 <X className="h-5 w-5" />
//               </button>
//             </div>

//             {inquirySuccess ? (
//               <div className="flex flex-col items-center gap-3 py-6">
//                 <div className="flex h-14 w-14 items-center justify-center rounded-full bg-emerald-100">
//                   <Check className="h-7 w-7 text-emerald-600" />
//                 </div>
//                 <p className="text-base font-semibold text-foreground">
//                   Inquiry Sent!
//                 </p>
//                 <p className="text-sm text-muted-foreground">
//                   The seller will contact you soon.
//                 </p>
//               </div>
//             ) : (
//               <>
//                 <p className="mb-3 text-sm text-muted-foreground">
//                   Sending inquiry for:{" "}
//                   <span className="font-medium text-foreground">
//                     {property.title}
//                   </span>
//                 </p>
//                 <textarea
//                   className="w-full rounded-xl border border-border bg-background p-3 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary"
//                   rows={4}
//                   placeholder="Hi, I'm interested in this property. Please share more details..."
//                   value={inquiryMessage}
//                   onChange={(e) => setInquiryMessage(e.target.value)}
//                 />
//                 <div className="mt-4 flex gap-2">
//                   <Button
//                     variant="outline"
//                     className="flex-1"
//                     onClick={() => setShowInquiry(false)}
//                   >
//                     Cancel
//                   </Button>
//                   <Button
//                     className="flex-1 gap-2"
//                     onClick={handleInquiry}
//                     disabled={inquiryLoading || !inquiryMessage.trim()}
//                   >
//                     {inquiryLoading ? (
//                       <Loader2 className="h-4 w-4 animate-spin" />
//                     ) : (
//                       <MessageSquare className="h-4 w-4" />
//                     )}
//                     Send
//                   </Button>
//                 </div>
//               </>
//             )}
//           </div>
//         </div>
//       )}
//     </div>
//   )
// }



// 14/03/26


"use client"

import { use, useState, useEffect } from "react"
import { notFound, useRouter } from "next/navigation"
import Link from "next/link"
import { SiteHeader } from "@/app/components/site-header"
import { SiteFooter } from "@/app/components/site-footer"
import { PropertyCard } from "@/app/components/property-card"
import { ImageGallery } from "@/app/components/property/image-gallery"
import { Badge } from "@/app/components/ui/badge"
import { Button } from "@/app/components/ui/button"
import { Input } from "@/app/components/ui/input"
import { useAuth } from "@/app/lib/auth-context"
import {
  ArrowLeft,
  Bath,
  Bed,
  Building2,
  Calendar,
  Check,
  Clock,
  Heart,
  Loader2,
  MapPin,
  Maximize,
  MessageSquare,
  Phone,
  Share2,
  ShieldCheck,
  User,
  Wallet,
  X,
} from "lucide-react"

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
  postedBy: { _id: string; name: string; email: string; phone?: string } | string
  verified: boolean
  featured: boolean
  images: string[]
  amenities: string[]
  listingType: string
  description: string
  createdAt: string
}

const TIME_SLOTS = [
  "9:00 AM - 10:00 AM",
  "10:00 AM - 11:00 AM",
  "11:00 AM - 12:00 PM",
  "12:00 PM - 1:00 PM",
  "2:00 PM - 3:00 PM",
  "3:00 PM - 4:00 PM",
  "4:00 PM - 5:00 PM",
  "5:00 PM - 6:00 PM",
]

function formatPrice(amount: number): string {
  if (amount >= 10000000) return `₹${(amount / 10000000).toFixed(2)} Cr`
  if (amount >= 100000) return `₹${(amount / 100000).toFixed(2)} L`
  return `₹${amount.toLocaleString("en-IN")}`
}

// Get minimum date (tomorrow)
function getMinDate() {
  const tomorrow = new Date()
  tomorrow.setDate(tomorrow.getDate() + 1)
  return tomorrow.toISOString().split("T")[0]
}

// Get maximum date (3 months from now)
function getMaxDate() {
  const maxDate = new Date()
  maxDate.setMonth(maxDate.getMonth() + 3)
  return maxDate.toISOString().split("T")[0]
}

export default function PropertyDetailPage({
  params,
}: {
  params: Promise<{ id: string }>
}) {
  const { id } = use(params)
  const { isLoggedIn, user } = useAuth()
  const router = useRouter()

  const [property, setProperty] = useState<Property | null>(null)
  const [similarProperties, setSimilarProperties] = useState<Property[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState("")

  // Save state
  const [saved, setSaved] = useState(false)
  const [saveLoading, setSaveLoading] = useState(false)

  // Inquiry modal
  const [showInquiry, setShowInquiry] = useState(false)
  const [inquiryMessage, setInquiryMessage] = useState("")
  const [inquiryLoading, setInquiryLoading] = useState(false)
  const [inquirySuccess, setInquirySuccess] = useState(false)

  // Visit modal
  const [showVisit, setShowVisit] = useState(false)
  const [visitForm, setVisitForm] = useState({
    name: "",
    email: "",
    phone: "",
    date: "",
    timeSlot: "",
    message: "",
  })
  const [visitLoading, setVisitLoading] = useState(false)
  const [visitSuccess, setVisitSuccess] = useState(false)
  const [visitError, setVisitError] = useState("")

  // EMI Calculator
  const [loanAmount, setLoanAmount] = useState("")
  const [loanYears, setLoanYears] = useState("20")
  const [loanRate, setLoanRate] = useState("8.5")

  useEffect(() => {
    fetchProperty()
  }, [id])

  // Prefill visit form with user data
  useEffect(() => {
    if (user) {
      setVisitForm((prev) => ({
        ...prev,
        name: user.name || "",
        email: user.email || "",
        phone: user.phone || "",
      }))
    }
  }, [user])

  async function fetchProperty() {
    setLoading(true)
    setError("")
    try {
      const res = await fetch(`/api/properties/${id}`)
      const data = await res.json()
      if (!res.ok) {
        if (res.status === 404) notFound()
        setError(data.error || "Failed to load property")
        return
      }
      setProperty(data.property)
      setSimilarProperties(data.similar || [])
    } catch {
      setError("Something went wrong. Please try again.")
    } finally {
      setLoading(false)
    }
  }

  async function handleSave() {
    if (!isLoggedIn) {
      router.push("/login")
      return
    }
    setSaveLoading(true)
    try {
      const method = saved ? "DELETE" : "POST"
      const res = await fetch(`/api/saved/${id}`, {
        method,
        credentials: "include",
      })
      if (res.ok) setSaved(!saved)
    } catch {
      console.error("Save error")
    } finally {
      setSaveLoading(false)
    }
  }

  async function handleInquiry() {
    if (!isLoggedIn) {
      router.push("/login")
      return
    }
    if (!inquiryMessage.trim()) return
    setInquiryLoading(true)
    try {
      const res = await fetch("/api/inquiries", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify({ propertyId: id, message: inquiryMessage }),
      })
      if (res.ok) {
        setInquirySuccess(true)
        setInquiryMessage("")
        setTimeout(() => {
          setShowInquiry(false)
          setInquirySuccess(false)
        }, 2000)
      }
    } catch {
      console.error("Inquiry error")
    } finally {
      setInquiryLoading(false)
    }
  }

  async function handleVisit() {
    if (!isLoggedIn) {
      router.push("/login")
      return
    }
    setVisitError("")

    if (!visitForm.name || !visitForm.email || !visitForm.phone || !visitForm.date || !visitForm.timeSlot) {
      setVisitError("Please fill all required fields")
      return
    }

    setVisitLoading(true)
    try {
      const res = await fetch("/api/visits", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify({
          propertyId: id,
          ...visitForm,
        }),
      })
      const data = await res.json()
      if (!res.ok) {
        setVisitError(data.error || "Failed to schedule visit")
        return
      }
      setVisitSuccess(true)
      setTimeout(() => {
        setShowVisit(false)
        setVisitSuccess(false)
        setVisitForm((prev) => ({ ...prev, date: "", timeSlot: "", message: "" }))
      }, 2500)
    } catch {
      setVisitError("Something went wrong. Please try again.")
    } finally {
      setVisitLoading(false)
    }
  }

  function calculateEMI() {
    if (!property) return 0
    const principal = loanAmount ? parseFloat(loanAmount) : property.price * 0.8
    const rate = parseFloat(loanRate) / 12 / 100
    const months = parseInt(loanYears) * 12
    if (rate === 0) return Math.round(principal / months)
    const emi = (principal * rate * Math.pow(1 + rate, months)) / (Math.pow(1 + rate, months) - 1)
    return Math.round(emi)
  }

  if (loading) {
    return (
      <div className="flex min-h-screen flex-col">
        <SiteHeader />
        <div className="flex flex-1 items-center justify-center">
          <div className="flex flex-col items-center gap-3">
            <Loader2 className="h-8 w-8 animate-spin text-primary" />
            <p className="text-sm text-muted-foreground">Loading property...</p>
          </div>
        </div>
      </div>
    )
  }

  if (error || !property) {
    return (
      <div className="flex min-h-screen flex-col">
        <SiteHeader />
        <div className="flex flex-1 items-center justify-center">
          <div className="flex flex-col items-center gap-3">
            <p className="text-lg font-semibold text-destructive">{error}</p>
            <Button variant="outline" onClick={fetchProperty}>Try Again</Button>
          </div>
        </div>
      </div>
    )
  }

  const postedByName =
    typeof property.postedBy === "object"
      ? property.postedBy.name
      : property.postedBy

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
                        {property.listingType === "buy" ? "For Sale" : property.listingType === "rent" ? "For Rent" : "Commercial"}
                      </Badge>
                      {property.verified && (
                        <Badge variant="outline" className="gap-1 border-emerald-200 bg-emerald-50 text-emerald-700">
                          <ShieldCheck className="h-3 w-3" />
                          Verified
                        </Badge>
                      )}
                      {property.featured && (
                        <Badge className="bg-accent text-accent-foreground">Featured</Badge>
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
                      onClick={handleSave}
                      disabled={saveLoading}
                    >
                      {saveLoading ? (
                        <Loader2 className="h-4 w-4 animate-spin" />
                      ) : (
                        <Heart className={`h-4 w-4 ${saved ? "fill-red-500 text-red-500" : ""}`} />
                      )}
                    </Button>
                    <Button
                      variant="outline"
                      size="icon"
                      onClick={() => navigator.clipboard.writeText(window.location.href)}
                    >
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
                        <p className="text-sm font-semibold text-foreground">{property.bedrooms} BHK</p>
                        <p className="text-xs text-muted-foreground">Bedrooms</p>
                      </div>
                    </div>
                  )}
                  <div className="flex items-center gap-2">
                    <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-secondary">
                      <Bath className="h-4 w-4 text-secondary-foreground" />
                    </div>
                    <div>
                      <p className="text-sm font-semibold text-foreground">{property.bathrooms}</p>
                      <p className="text-xs text-muted-foreground">Bathrooms</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-secondary">
                      <Maximize className="h-4 w-4 text-secondary-foreground" />
                    </div>
                    <div>
                      <p className="text-sm font-semibold text-foreground">{property.area} sqft</p>
                      <p className="text-xs text-muted-foreground">Carpet Area</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-secondary">
                      <Building2 className="h-4 w-4 text-secondary-foreground" />
                    </div>
                    <div>
                      <p className="text-sm font-semibold text-foreground">{property.furnishing}</p>
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
              </div>

              {/* Amenities */}
              {property.amenities?.length > 0 && (
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
              )}

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
                      <p className="text-sm font-semibold text-foreground">{postedByName}</p>
                      <p className="text-xs text-muted-foreground">Property Owner</p>
                    </div>
                  </div>
                  <div className="mt-4 flex flex-col gap-2">
                    {typeof property.postedBy === "object" && property.postedBy.phone && (
                      <Button className="w-full gap-2" asChild>
                        <a href={`tel:${property.postedBy.phone}`}>
                          <Phone className="h-4 w-4" />
                          {property.postedBy.phone}
                        </a>
                      </Button>
                    )}
                    <Button
                      variant="outline"
                      className="w-full gap-2"
                      onClick={() => {
                        if (!isLoggedIn) { router.push("/login"); return }
                        setShowInquiry(true)
                      }}
                    >
                      <MessageSquare className="h-4 w-4" />
                      Send Message
                    </Button>

                    {/* ✅ Schedule Visit Button */}
                    <Button
                      variant="outline"
                      className="w-full gap-2 border-primary/30 text-primary hover:bg-primary/5"
                      onClick={() => {
                        if (!isLoggedIn) { router.push("/login"); return }
                        setShowVisit(true)
                      }}
                    >
                      <Calendar className="h-4 w-4" />
                      Schedule Site Visit
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
                        {new Date(property.createdAt).toLocaleDateString("en-IN", {
                          day: "numeric", month: "short", year: "numeric",
                        })}
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
                <Link href="/properties" className="text-sm font-medium text-primary hover:underline">
                  View All
                </Link>
              </div>
              <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
                {similarProperties.map((p) => (
                  <PropertyCard key={p._id} property={{ ...p, id: p._id }} />
                ))}
              </div>
            </div>
          )}
        </div>
      </main>
      <SiteFooter />

      {/* ── Inquiry Modal ── */}
      {showInquiry && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-foreground/50 p-4">
          <div className="w-full max-w-md rounded-2xl border border-border bg-card p-6 shadow-xl">
            <div className="mb-4 flex items-center justify-between">
              <h3 className="text-lg font-bold text-foreground">Send Inquiry</h3>
              <button onClick={() => setShowInquiry(false)} className="text-muted-foreground hover:text-foreground">
                <X className="h-5 w-5" />
              </button>
            </div>
            {inquirySuccess ? (
              <div className="flex flex-col items-center gap-3 py-6">
                <div className="flex h-14 w-14 items-center justify-center rounded-full bg-emerald-100">
                  <Check className="h-7 w-7 text-emerald-600" />
                </div>
                <p className="text-base font-semibold text-foreground">Inquiry Sent!</p>
                <p className="text-sm text-muted-foreground">The seller will contact you soon.</p>
              </div>
            ) : (
              <>
                <p className="mb-3 text-sm text-muted-foreground">
                  Sending inquiry for:{" "}
                  <span className="font-medium text-foreground">{property.title}</span>
                </p>
                <textarea
                  className="w-full rounded-xl border border-border bg-background p-3 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary"
                  rows={4}
                  placeholder="Hi, I'm interested in this property. Please share more details..."
                  value={inquiryMessage}
                  onChange={(e) => setInquiryMessage(e.target.value)}
                />
                <div className="mt-4 flex gap-2">
                  <Button variant="outline" className="flex-1" onClick={() => setShowInquiry(false)}>
                    Cancel
                  </Button>
                  <Button
                    className="flex-1 gap-2"
                    onClick={handleInquiry}
                    disabled={inquiryLoading || !inquiryMessage.trim()}
                  >
                    {inquiryLoading ? <Loader2 className="h-4 w-4 animate-spin" /> : <MessageSquare className="h-4 w-4" />}
                    Send
                  </Button>
                </div>
              </>
            )}
          </div>
        </div>
      )}

      {/* ── Schedule Visit Modal ── */}
      {showVisit && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-foreground/50 p-4">
          <div className="w-full max-w-lg rounded-2xl border border-border bg-card p-6 shadow-xl">
            <div className="mb-4 flex items-center justify-between">
              <div>
                <h3 className="text-lg font-bold text-foreground">Schedule Site Visit</h3>
                <p className="text-xs text-muted-foreground">{property.title}</p>
              </div>
              <button
                onClick={() => { setShowVisit(false); setVisitError("") }}
                className="text-muted-foreground hover:text-foreground"
              >
                <X className="h-5 w-5" />
              </button>
            </div>

            {visitSuccess ? (
              <div className="flex flex-col items-center gap-3 py-8">
                <div className="flex h-16 w-16 items-center justify-center rounded-full bg-emerald-100">
                  <Calendar className="h-8 w-8 text-emerald-600" />
                </div>
                <p className="text-base font-semibold text-foreground">Visit Scheduled!</p>
                <p className="text-center text-sm text-muted-foreground">
                  Your site visit has been requested. The admin will confirm your slot shortly.
                </p>
              </div>
            ) : (
              <div className="flex flex-col gap-4">
                {visitError && (
                  <div className="rounded-xl border border-destructive/30 bg-destructive/10 px-4 py-3 text-sm text-destructive">
                    {visitError}
                  </div>
                )}

                {/* Name + Phone */}
                <div className="grid gap-3 sm:grid-cols-2">
                  <div>
                    <label className="mb-1.5 block text-sm font-medium text-foreground">
                      Your Name <span className="text-destructive">*</span>
                    </label>
                    <Input
                      className="h-10"
                      placeholder="Full name"
                      value={visitForm.name}
                      onChange={(e) => setVisitForm({ ...visitForm, name: e.target.value })}
                    />
                  </div>
                  <div>
                    <label className="mb-1.5 block text-sm font-medium text-foreground">
                      Phone <span className="text-destructive">*</span>
                    </label>
                    <Input
                      className="h-10"
                      placeholder="Mobile number"
                      value={visitForm.phone}
                      onChange={(e) => setVisitForm({ ...visitForm, phone: e.target.value })}
                    />
                  </div>
                </div>

                {/* Email */}
                <div>
                  <label className="mb-1.5 block text-sm font-medium text-foreground">
                    Email <span className="text-destructive">*</span>
                  </label>
                  <Input
                    className="h-10"
                    type="email"
                    placeholder="your@email.com"
                    value={visitForm.email}
                    onChange={(e) => setVisitForm({ ...visitForm, email: e.target.value })}
                  />
                </div>

                {/* Date */}
                <div>
                  <label className="mb-1.5 block text-sm font-medium text-foreground">
                    Preferred Date <span className="text-destructive">*</span>
                  </label>
                  <input
                    type="date"
                    min={getMinDate()}
                    max={getMaxDate()}
                    value={visitForm.date}
                    onChange={(e) => setVisitForm({ ...visitForm, date: e.target.value })}
                    className="flex h-10 w-full rounded-xl border border-input bg-background px-3 py-2 text-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
                  />
                </div>

                {/* Time Slot */}
                <div>
                  <label className="mb-2 block text-sm font-medium text-foreground">
                    Preferred Time <span className="text-destructive">*</span>
                  </label>
                  <div className="grid grid-cols-2 gap-2">
                    {TIME_SLOTS.map((slot) => (
                      <button
                        key={slot}
                        onClick={() => setVisitForm({ ...visitForm, timeSlot: slot })}
                        className={`flex items-center gap-2 rounded-xl border px-3 py-2 text-xs font-medium transition-all ${
                          visitForm.timeSlot === slot
                            ? "border-primary bg-primary/5 text-primary"
                            : "border-border text-muted-foreground hover:border-primary/50"
                        }`}
                      >
                        <Clock className="h-3 w-3" />
                        {slot}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Message */}
                <div>
                  <label className="mb-1.5 block text-sm font-medium text-foreground">
                    Additional Note{" "}
                    <span className="text-muted-foreground">(optional)</span>
                  </label>
                  <textarea
                    className="w-full rounded-xl border border-border bg-background p-3 text-sm placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary"
                    rows={2}
                    placeholder="Any specific requirements or questions..."
                    value={visitForm.message}
                    onChange={(e) => setVisitForm({ ...visitForm, message: e.target.value })}
                  />
                </div>

                {/* Buttons */}
                <div className="flex gap-2">
                  <Button
                    variant="outline"
                    className="flex-1"
                    onClick={() => { setShowVisit(false); setVisitError("") }}
                  >
                    Cancel
                  </Button>
                  <Button
                    className="flex-1 gap-2"
                    onClick={handleVisit}
                    disabled={visitLoading}
                  >
                    {visitLoading ? (
                      <Loader2 className="h-4 w-4 animate-spin" />
                    ) : (
                      <Calendar className="h-4 w-4" />
                    )}
                    Book Visit
                  </Button>
                </div>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  )
}
