// "use client"

// import Image from "next/image"
// import Link from "next/link"
// import { Badge } from "@/app/components/ui/badge"
// import { Button } from "@/app/components/ui/button"
// import type { Property } from "@/app/lib/data"
// import {
//   Bath,
//   Bed,
//   Heart,
//   MapPin,
//   Maximize,
//   Phone,
//   ShieldCheck,
// } from "lucide-react"
// import { useState } from "react"

// interface PropertyCardProps {
//   property: Property
//   layout?: "grid" | "list"
// }

// export function PropertyCard({ property, layout = "grid" }: PropertyCardProps) {
//   const [saved, setSaved] = useState(false)

//   if (layout === "list") {
//     return (
//       <div className="group flex overflow-hidden rounded-2xl border border-border bg-card shadow-sm transition-shadow hover:shadow-md">
//         <div className="relative h-auto w-72 shrink-0">
//           <Image
//             src={property.images[0]}
//             alt={property.title}
//             fill
//             className="object-cover"
//           />
//           {property.featured && (
//             <Badge className="absolute left-3 top-3 bg-accent text-accent-foreground">
//               Featured
//             </Badge>
//           )}
//           <button
//             onClick={(e) => {
//               e.preventDefault()
//               setSaved(!saved)
//             }}
//             className="absolute right-3 top-3 flex h-8 w-8 items-center justify-center rounded-full bg-card/80 backdrop-blur-sm transition-colors hover:bg-card"
//             aria-label={saved ? "Remove from saved" : "Save property"}
//           >
//             <Heart
//               className={`h-4 w-4 ${saved ? "fill-accent text-accent" : "text-muted-foreground"}`}
//             />
//           </button>
//         </div>
//         <div className="flex flex-1 flex-col justify-between p-5">
//           <div>
//             <div className="mb-1 flex items-center gap-2">
//               <span className="text-xs font-medium uppercase tracking-wider text-primary">
//                 {property.listingType === "buy"
//                   ? "For Sale"
//                   : property.listingType === "rent"
//                     ? "For Rent"
//                     : "Commercial"}
//               </span>
//               {property.verified && (
//                 <span className="flex items-center gap-1 text-xs text-emerald-600">
//                   <ShieldCheck className="h-3 w-3" />
//                   Verified
//                 </span>
//               )}
//             </div>
//             <Link href={`/property/${property.id}`}>
//               <h3 className="text-base font-semibold text-foreground transition-colors hover:text-primary">
//                 {property.title}
//               </h3>
//             </Link>
//             <p className="mt-1 flex items-center gap-1 text-sm text-muted-foreground">
//               <MapPin className="h-3.5 w-3.5" />
//               {property.location}
//             </p>
//             <div className="mt-3 flex items-center gap-4 text-sm text-muted-foreground">
//               {property.bedrooms > 0 && (
//                 <span className="flex items-center gap-1">
//                   <Bed className="h-3.5 w-3.5" />
//                   {property.bedrooms} BHK
//                 </span>
//               )}
//               <span className="flex items-center gap-1">
//                 <Bath className="h-3.5 w-3.5" />
//                 {property.bathrooms} Bath
//               </span>
//               <span className="flex items-center gap-1">
//                 <Maximize className="h-3.5 w-3.5" />
//                 {property.area} sqft
//               </span>
//             </div>
//           </div>
//           <div className="mt-4 flex items-center justify-between">
//             <p className="text-lg font-bold text-foreground">
//               {property.priceLabel}
//             </p>
//             <div className="flex items-center gap-2">
//               <Badge variant="outline" className="text-xs">
//                 {property.postedBy}
//               </Badge>
//               <Button size="sm" className="gap-1.5">
//                 <Phone className="h-3.5 w-3.5" />
//                 Contact
//               </Button>
//             </div>
//           </div>
//         </div>
//       </div>
//     )
//   }

//   return (
//     <div className="group overflow-hidden rounded-2xl border border-border bg-card shadow-sm transition-all hover:shadow-md">
//       <div className="relative aspect-[4/3] overflow-hidden">
//         <Image
//           src={property.images[0]}
//           alt={property.title}
//           fill
//           className="object-cover transition-transform duration-300 group-hover:scale-105"
//         />
//         {property.featured && (
//           <Badge className="absolute left-3 top-3 bg-accent text-accent-foreground">
//             Featured
//           </Badge>
//         )}
//         <button
//           onClick={(e) => {
//             e.preventDefault()
//             setSaved(!saved)
//           }}
//           className="absolute right-3 top-3 flex h-8 w-8 items-center justify-center rounded-full bg-card/80 backdrop-blur-sm transition-colors hover:bg-card"
//           aria-label={saved ? "Remove from saved" : "Save property"}
//         >
//           <Heart
//             className={`h-4 w-4 ${saved ? "fill-accent text-accent" : "text-muted-foreground"}`}
//           />
//         </button>
//         <div className="absolute bottom-3 left-3">
//           <span className="rounded-lg bg-card/90 px-2.5 py-1 text-xs font-semibold text-foreground backdrop-blur-sm">
//             {property.priceLabel}
//           </span>
//         </div>
//       </div>
//       <div className="p-4">
//         <div className="mb-1.5 flex items-center gap-2">
//           <span className="text-xs font-medium uppercase tracking-wider text-primary">
//             {property.listingType === "buy"
//               ? "For Sale"
//               : property.listingType === "rent"
//                 ? "For Rent"
//                 : "Commercial"}
//           </span>
//           {property.verified && (
//             <span className="flex items-center gap-1 text-xs text-emerald-600">
//               <ShieldCheck className="h-3 w-3" />
//               Verified
//             </span>
//           )}
//         </div>
//         <Link href={`/property/${property.id}`}>
//           <h3 className="line-clamp-1 text-sm font-semibold text-foreground transition-colors hover:text-primary">
//             {property.title}
//           </h3>
//         </Link>
//         <p className="mt-1 flex items-center gap-1 text-xs text-muted-foreground">
//           <MapPin className="h-3 w-3" />
//           {property.location}
//         </p>
//         <div className="mt-3 flex items-center gap-3 border-t border-border pt-3 text-xs text-muted-foreground">
//           {property.bedrooms > 0 && (
//             <span className="flex items-center gap-1">
//               <Bed className="h-3.5 w-3.5" />
//               {property.bedrooms} BHK
//             </span>
//           )}
//           <span className="flex items-center gap-1">
//             <Bath className="h-3.5 w-3.5" />
//             {property.bathrooms} Bath
//           </span>
//           <span className="flex items-center gap-1">
//             <Maximize className="h-3.5 w-3.5" />
//             {property.area} sqft
//           </span>
//         </div>
//         <div className="mt-3 flex items-center justify-between">
//           <Badge variant="outline" className="text-xs">
//             {property.postedBy}
//           </Badge>
//           <Button size="sm" variant="ghost" className="h-8 gap-1 text-xs text-primary">
//             <Phone className="h-3 w-3" />
//             Contact
//           </Button>
//         </div>
//       </div>
//     </div>
//   )
// }








"use client"

import Image from "next/image"
import Link from "next/link"
import { Badge } from "@/app/components/ui/badge"
import { Button } from "@/app/components/ui/button"
import {
  Bath,
  Bed,
  Heart,
  MapPin,
  Maximize,
  Phone,
  ShieldCheck,
  Loader2,
} from "lucide-react"
import { useState } from "react"
import { useRouter } from "next/navigation"
import { useAuth } from "@/app/lib/auth-context"

interface Property {
  _id?: string
  id?: string
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

interface PropertyCardProps {
  property: Property
  layout?: "grid" | "list"
}

export function PropertyCard({ property, layout = "grid" }: PropertyCardProps) {
  const { isLoggedIn } = useAuth()
  const router = useRouter()

  const [saved, setSaved] = useState(false)
  const [saveLoading, setSaveLoading] = useState(false)

  // Support both _id (from DB) and id (from mock data)
  const propertyId = property._id || property.id || ""

  // Resolve image — use placeholder if missing
  // const imageUrl =
  //   property.images?.[0] ||
  //   `https://placehold.co/600x400/e2e8f0/64748b?text=${encodeURIComponent(property.type)}`

  const imageUrl =
  property.images?.[0] && property.images[0].startsWith("/api/images/")
    ? property.images[0]
    : `https://placehold.co/600x400/e2e8f0/64748b?text=${encodeURIComponent(property.type || "Property")}`

  // Resolve postedBy display name
  const postedByLabel =
    typeof property.postedBy === "object"
      ? property.postedBy.name
      : property.postedBy

  async function handleSave(e: React.MouseEvent) {
    e.preventDefault()
    e.stopPropagation()

    if (!isLoggedIn) {
      router.push("/login")
      return
    }

    setSaveLoading(true)
    try {
      const method = saved ? "DELETE" : "POST"
      const res = await fetch(`/api/saved/${propertyId}`, {
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

  // ── LIST LAYOUT ──
  if (layout === "list") {
    return (
      <div className="group flex overflow-hidden rounded-2xl border border-border bg-card shadow-sm transition-shadow hover:shadow-md">
        <div className="relative h-auto w-72 shrink-0">
          <Image
            src={imageUrl}
            alt={property.title}
            fill
            className="object-cover"
            unoptimized={imageUrl.startsWith("http")}
          />
          {property.featured && (
            <Badge className="absolute left-3 top-3 bg-accent text-accent-foreground">
              Featured
            </Badge>
          )}
          <button
            onClick={handleSave}
            className="absolute right-3 top-3 flex h-8 w-8 items-center justify-center rounded-full bg-card/80 backdrop-blur-sm transition-colors hover:bg-card"
            aria-label={saved ? "Remove from saved" : "Save property"}
          >
            {saveLoading ? (
              <Loader2 className="h-4 w-4 animate-spin text-muted-foreground" />
            ) : (
              <Heart
                className={`h-4 w-4 ${
                  saved ? "fill-red-500 text-red-500" : "text-muted-foreground"
                }`}
              />
            )}
          </button>
        </div>

        <div className="flex flex-1 flex-col justify-between p-5">
          <div>
            <div className="mb-1 flex items-center gap-2">
              <span className="text-xs font-medium uppercase tracking-wider text-primary">
                {property.listingType === "buy"
                  ? "For Sale"
                  : property.listingType === "rent"
                  ? "For Rent"
                  : "Commercial"}
              </span>
              {property.verified && (
                <span className="flex items-center gap-1 text-xs text-emerald-600">
                  <ShieldCheck className="h-3 w-3" />
                  Verified
                </span>
              )}
            </div>
            <Link href={`/property/${propertyId}`}>
              <h3 className="text-base font-semibold text-foreground transition-colors hover:text-primary">
                {property.title}
              </h3>
            </Link>
            <p className="mt-1 flex items-center gap-1 text-sm text-muted-foreground">
              <MapPin className="h-3.5 w-3.5" />
              {property.location}
            </p>
            <div className="mt-3 flex items-center gap-4 text-sm text-muted-foreground">
              {property.bedrooms > 0 && (
                <span className="flex items-center gap-1">
                  <Bed className="h-3.5 w-3.5" />
                  {property.bedrooms} BHK
                </span>
              )}
              <span className="flex items-center gap-1">
                <Bath className="h-3.5 w-3.5" />
                {property.bathrooms} Bath
              </span>
              <span className="flex items-center gap-1">
                <Maximize className="h-3.5 w-3.5" />
                {property.area} sqft
              </span>
            </div>
          </div>

          <div className="mt-4 flex items-center justify-between">
            <p className="text-lg font-bold text-foreground">
              {property.priceLabel}
            </p>
            <div className="flex items-center gap-2">
              <Badge variant="outline" className="text-xs">
                {postedByLabel}
              </Badge>
              <Button
                size="sm"
                className="gap-1.5"
                asChild
              >
                <Link href={`/property/${propertyId}`}>
                  <Phone className="h-3.5 w-3.5" />
                  Contact
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </div>
    )
  }

  // ── GRID LAYOUT ──
  return (
    <div className="group overflow-hidden rounded-2xl border border-border bg-card shadow-sm transition-all hover:shadow-md">
      <div className="relative aspect-[4/3] overflow-hidden">
        <Image
          src={imageUrl}
          alt={property.title}
          fill
          className="object-cover transition-transform duration-300 group-hover:scale-105"
          unoptimized={imageUrl.startsWith("http")}
        />
        {property.featured && (
          <Badge className="absolute left-3 top-3 bg-accent text-accent-foreground">
            Featured
          </Badge>
        )}
        <button
          onClick={handleSave}
          className="absolute right-3 top-3 flex h-8 w-8 items-center justify-center rounded-full bg-card/80 backdrop-blur-sm transition-colors hover:bg-card"
          aria-label={saved ? "Remove from saved" : "Save property"}
        >
          {saveLoading ? (
            <Loader2 className="h-4 w-4 animate-spin text-muted-foreground" />
          ) : (
            <Heart
              className={`h-4 w-4 ${
                saved ? "fill-red-500 text-red-500" : "text-muted-foreground"
              }`}
            />
          )}
        </button>
        <div className="absolute bottom-3 left-3">
          <span className="rounded-lg bg-card/90 px-2.5 py-1 text-xs font-semibold text-foreground backdrop-blur-sm">
            {property.priceLabel}
          </span>
        </div>
      </div>

      <div className="p-4">
        <div className="mb-1.5 flex items-center gap-2">
          <span className="text-xs font-medium uppercase tracking-wider text-primary">
            {property.listingType === "buy"
              ? "For Sale"
              : property.listingType === "rent"
              ? "For Rent"
              : "Commercial"}
          </span>
          {property.verified && (
            <span className="flex items-center gap-1 text-xs text-emerald-600">
              <ShieldCheck className="h-3 w-3" />
              Verified
            </span>
          )}
        </div>
        <Link href={`/property/${propertyId}`}>
          <h3 className="line-clamp-1 text-sm font-semibold text-foreground transition-colors hover:text-primary">
            {property.title}
          </h3>
        </Link>
        <p className="mt-1 flex items-center gap-1 text-xs text-muted-foreground">
          <MapPin className="h-3 w-3" />
          {property.location}
        </p>
        <div className="mt-3 flex items-center gap-3 border-t border-border pt-3 text-xs text-muted-foreground">
          {property.bedrooms > 0 && (
            <span className="flex items-center gap-1">
              <Bed className="h-3.5 w-3.5" />
              {property.bedrooms} BHK
            </span>
          )}
          <span className="flex items-center gap-1">
            <Bath className="h-3.5 w-3.5" />
            {property.bathrooms} Bath
          </span>
          <span className="flex items-center gap-1">
            <Maximize className="h-3.5 w-3.5" />
            {property.area} sqft
          </span>
        </div>
        <div className="mt-3 flex items-center justify-between">
          <Badge variant="outline" className="text-xs">
            {postedByLabel}
          </Badge>
          <Button
            size="sm"
            variant="ghost"
            className="h-8 gap-1 text-xs text-primary"
            asChild
          >
            <Link href={`/property/${propertyId}`}>
              <Phone className="h-3 w-3" />
              Contact
            </Link>
          </Button>
        </div>
      </div>
    </div>
  )
}
