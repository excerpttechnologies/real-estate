// import { NextRequest, NextResponse } from "next/server"
// import { connectDB } from "@/app/lib/mongodb"
// import Property from "@/app/models/Property"
// import { requireAdmin, isErrorResponse } from "@/app/lib/auth-helpers"

// // ─────────────────────────────────────────
// // GET /api/properties — Public (with filters)
// // ─────────────────────────────────────────
// export async function GET(req: NextRequest) {
//   try {
//     await connectDB()

//     const { searchParams } = new URL(req.url)

//     // Pagination
//     const page = parseInt(searchParams.get("page") || "1")
//     const limit = parseInt(searchParams.get("limit") || "12")
//     const skip = (page - 1) * limit

//     // Build filter object
//     const filter: Record<string, unknown> = {}

//     // Listing type filter
//     const listingType = searchParams.get("listing_type")
//     if (listingType && listingType !== "all") {
//       filter.listingType = listingType
//     }

//     // Property type filter
//     const propertyType = searchParams.get("property_type")
//     if (propertyType && propertyType !== "all") {
//       filter.type = propertyType
//     }

//     // City filter
//     const city = searchParams.get("city")
//     if (city) {
//       filter.city = { $regex: city, $options: "i" }
//     }

//     // Location search
//     const location = searchParams.get("location")
//     if (location) {
//       filter.$or = [
//         { location: { $regex: location, $options: "i" } },
//         { city: { $regex: location, $options: "i" } },
//         { address: { $regex: location, $options: "i" } },
//       ]
//     }

//     // Bedrooms filter
//     const bedrooms = searchParams.get("bedrooms")
//     if (bedrooms && bedrooms !== "any") {
//       if (bedrooms === "5+") {
//         filter.bedrooms = { $gte: 5 }
//       } else {
//         filter.bedrooms = parseInt(bedrooms)
//       }
//     }

//     // Furnishing filter
//     const furnishing = searchParams.get("furnishing")
//     if (furnishing && furnishing !== "all") {
//       filter.furnishing = furnishing
//     }

//     // Status filter
//     const status = searchParams.get("status")
//     if (status && status !== "all") {
//       filter.status = status
//     }

//     // Posted by filter
//     const postedByType = searchParams.get("posted_by")
//     if (postedByType && postedByType !== "all") {
//       filter.postedByType = postedByType
//     }

//     // Verified filter
//     const verified = searchParams.get("verified")
//     if (verified === "true") {
//       filter.verified = true
//     }

//     // Featured filter
//     const featured = searchParams.get("featured")
//     if (featured === "true") {
//       filter.featured = true
//     }

//     // Price range filter
//     const minPrice = searchParams.get("min_price")
//     const maxPrice = searchParams.get("max_price")
//     if (minPrice || maxPrice) {
//       filter.price = {}
//       if (minPrice) (filter.price as Record<string, number>).$gte = parseInt(minPrice)
//       if (maxPrice) (filter.price as Record<string, number>).$lte = parseInt(maxPrice)
//     }

//     // Sort
//     const sortBy = searchParams.get("sort") || "newest"
//     let sortOption: Record<string, 1 | -1> = { createdAt: -1 }

//     switch (sortBy) {
//       case "price_low":
//         sortOption = { price: 1 }
//         break
//       case "price_high":
//         sortOption = { price: -1 }
//         break
//       case "area":
//         sortOption = { area: -1 }
//         break
//       default:
//         sortOption = { createdAt: -1 }
//     }

//     // Execute query
//     const [properties, total] = await Promise.all([
//       Property.find(filter)
//         .sort(sortOption)
//         .skip(skip)
//         .limit(limit)
//         .populate("postedBy", "name email phone role"),
//       Property.countDocuments(filter),
//     ])

//     return NextResponse.json({
//       properties,
//       pagination: {
//         total,
//         page,
//         limit,
//         totalPages: Math.ceil(total / limit),
//         hasMore: page * limit < total,
//       },
//     })
//   } catch (error) {
//     console.error("Get properties error:", error)
//     return NextResponse.json(
//       { error: "Something went wrong." },
//       { status: 500 }
//     )
//   }
// }

// // ─────────────────────────────────────────
// // POST /api/properties — Admin only
// // ─────────────────────────────────────────
// export async function POST(req: NextRequest) {
//   try {
//     // Check admin
//     const auth = requireAdmin(req)
//     if (isErrorResponse(auth)) return auth

//     await connectDB()

//     const body = await req.json()

//     const {
//       title,
//       description,
//       price,
//       priceLabel,
//       listingType,
//       type,
//       status,
//       furnishing,
//       bedrooms,
//       bathrooms,
//       area,
//       location,
//       city,
//       address,
//       societyName,
//       images,
//       amenities,
//       verified,
//       featured,
//     } = body

//     // Validate required fields
//     if (
//       !title ||
//       !description ||
//       !price ||
//       !priceLabel ||
//       !listingType ||
//       !type ||
//       !status ||
//       !furnishing ||
//       !bathrooms ||
//       !area ||
//       !location ||
//       !city
//     ) {
//       return NextResponse.json(
//         { error: "Please fill all required fields" },
//         { status: 400 }
//       )
//     }

//     // Create property
//     const property = await Property.create({
//       title,
//       description,
//       price,
//       priceLabel,
//       listingType,
//       type,
//       status,
//       furnishing,
//       bedrooms: bedrooms || 0,
//       bathrooms,
//       area,
//       location,
//       city,
//       address,
//       societyName,
//       images: images || [],
//       amenities: amenities || [],
//       postedBy: auth.user.userId,
//       verified: verified || false,
//       featured: featured || false,
//     })

//     return NextResponse.json(
//       {
//         message: "Property created successfully",
//         property,
//       },
//       { status: 201 }
//     )
//   } catch (error) {
//     console.error("Create property error:", error)
//     return NextResponse.json(
//       { error: "Something went wrong." },
//       { status: 500 }
//     )
//   }
// }













import { NextRequest, NextResponse } from "next/server"
import { connectDB } from "@/app/lib/mongodb"
import Property from "@/app/models/Property"
import { requireAdmin, isErrorResponse } from "@/app/lib/auth-helpers"

// ─────────────────────────────────────────
// GET /api/properties — Public (with filters)
// ─────────────────────────────────────────
export async function GET(req: NextRequest) {
  try {
    await connectDB()

    const { searchParams } = new URL(req.url)

    // Pagination
    const page = parseInt(searchParams.get("page") || "1")
    const limit = parseInt(searchParams.get("limit") || "12")
    const skip = (page - 1) * limit

    // Build filter object
    const filter: Record<string, unknown> = {}

    // Listing type filter
    const listingType = searchParams.get("listing_type")
    if (listingType && listingType !== "all") {
      filter.listingType = listingType
    }

    // Property type filter
    const propertyType = searchParams.get("property_type")
    if (propertyType && propertyType !== "all") {
      filter.type = propertyType
    }

    // City filter
    const city = searchParams.get("city")
    if (city) {
      filter.city = { $regex: city, $options: "i" }
    }

    // Location search
    const location = searchParams.get("location")
    if (location) {
      filter.$or = [
        { location: { $regex: location, $options: "i" } },
        { city: { $regex: location, $options: "i" } },
        { address: { $regex: location, $options: "i" } },
      ]
    }

    // Bedrooms filter
    const bedrooms = searchParams.get("bedrooms")
    if (bedrooms && bedrooms !== "any") {
      if (bedrooms === "5+") {
        filter.bedrooms = { $gte: 5 }
      } else {
        filter.bedrooms = parseInt(bedrooms)
      }
    }

    // Furnishing filter
    const furnishing = searchParams.get("furnishing")
    if (furnishing && furnishing !== "all") {
      filter.furnishing = furnishing
    }

    // Status filter
    const status = searchParams.get("status")
    if (status && status !== "all") {
      filter.status = status
    }

    // Posted by filter
    const postedByType = searchParams.get("posted_by")
    if (postedByType && postedByType !== "all") {
      filter.postedByType = postedByType
    }

    // Verified filter
    const verified = searchParams.get("verified")
    if (verified === "true") {
      filter.verified = true
    }

    // Featured filter
    const featured = searchParams.get("featured")
    if (featured === "true") {
      filter.featured = true
    }

    // Price range filter
    const minPrice = searchParams.get("min_price")
    const maxPrice = searchParams.get("max_price")
    if (minPrice || maxPrice) {
      filter.price = {}
      if (minPrice) (filter.price as Record<string, number>).$gte = parseInt(minPrice)
      if (maxPrice) (filter.price as Record<string, number>).$lte = parseInt(maxPrice)
    }

    // Sort
    const sortBy = searchParams.get("sort") || "newest"
    let sortOption: Record<string, 1 | -1> = { createdAt: -1 }

    switch (sortBy) {
      case "price_low":
        sortOption = { price: 1 }
        break
      case "price_high":
        sortOption = { price: -1 }
        break
      case "area":
        sortOption = { area: -1 }
        break
      default:
        sortOption = { createdAt: -1 }
    }

    // Execute query
    const [properties, total] = await Promise.all([
      Property.find(filter)
        .sort(sortOption)
        .skip(skip)
        .limit(limit)
        .populate("postedBy", "name email phone role"),
      Property.countDocuments(filter),
    ])

    return NextResponse.json({
      properties,
      pagination: {
        total,
        page,
        limit,
        totalPages: Math.ceil(total / limit),
        hasMore: page * limit < total,
      },
    })
  } catch (error) {
    console.error("Get properties error:", error)
    return NextResponse.json(
      { error: "Something went wrong." },
      { status: 500 }
    )
  }
}

// ─────────────────────────────────────────
// POST /api/properties — Admin only
// ─────────────────────────────────────────
export async function POST(req: NextRequest) {
  try {
    // Check admin
    const auth = requireAdmin(req)
    if (isErrorResponse(auth)) return auth

    await connectDB()

    const body = await req.json()

    const {
      title,
      description,
      price,
      priceLabel,
      listingType,
      type,
      status,
      furnishing,
      bedrooms,
      bathrooms,
      area,
      location,
      city,
      address,
      societyName,
      images,
      amenities,
      verified,
      featured,
    } = body

    // Validate required fields
    if (
  !title ||
  !description ||
  !price ||
  !priceLabel ||
  !listingType ||
  !type ||
  !status ||
  !furnishing ||
  bathrooms === undefined || bathrooms === null ||   // ← fixed
  !area ||
  !location ||
  !city
) {
      return NextResponse.json(
        { error: "Please fill all required fields" },
        { status: 400 }
      )
    }

    // Create property
    const property = await Property.create({
      title,
      description,
      price,
      priceLabel,
      listingType,
      type,
      status,
      furnishing,
      bedrooms: bedrooms || 0,
      bathrooms,
      area,
      location,
      city,
      address,
      societyName,
      images: images || [],
      amenities: amenities || [],
      postedBy: auth.user.userId,
      verified: verified || false,
      featured: featured || false,
    })

    return NextResponse.json(
      {
        message: "Property created successfully",
        property,
      },
      { status: 201 }
    )
  } catch (error) {
    console.error("Create property error:", error)
    return NextResponse.json(
      { error: "Something went wrong." },
      { status: 500 }
    )
  }
}