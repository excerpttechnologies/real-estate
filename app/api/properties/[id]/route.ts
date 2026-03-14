// import { NextRequest, NextResponse } from "next/server"
// import { connectDB } from "@/app/lib/mongodb"
// import Property from "@/app/models/Property"
// import { requireAdmin, isErrorResponse } from "@/app/lib/auth-helpers"

// // ─────────────────────────────────────────
// // GET /api/properties/:id — Public
// // ─────────────────────────────────────────
// export async function GET(
//   req: NextRequest,
//   { params }: { params: Promise<{ id: string }> }
// ) {
//   try {
//     await connectDB()

//     const { id } = await params

//     const property = await Property.findById(id).populate(
//       "postedBy",
//       "name email phone role"
//     )

//     if (!property) {
//       return NextResponse.json(
//         { error: "Property not found" },
//         { status: 404 }
//       )
//     }

//     // Get similar properties
//     const similar = await Property.find({
//       _id: { $ne: id },
//       $or: [{ city: property.city }, { type: property.type }],
//     })
//       .limit(3)
//       .select("title price priceLabel location city images listingType type bedrooms bathrooms area verified featured")

//     return NextResponse.json({ property, similar })
//   } catch (error) {
//     console.error("Get property error:", error)
//     return NextResponse.json(
//       { error: "Something went wrong." },
//       { status: 500 }
//     )
//   }
// }

// // ─────────────────────────────────────────
// // PUT /api/properties/:id — Admin only
// // ─────────────────────────────────────────
// export async function PUT(
//   req: NextRequest,
//   { params }: { params: Promise<{ id: string }> }
// ) {
//   try {
//     // Check admin
//     const auth = requireAdmin(req)
//     if (isErrorResponse(auth)) return auth

//     await connectDB()

//     const { id } = await params
//     const body = await req.json()

//     const property = await Property.findByIdAndUpdate(
//       id,
//       { ...body, updatedAt: new Date() },
//       { new: true, runValidators: true }
//     )

//     if (!property) {
//       return NextResponse.json(
//         { error: "Property not found" },
//         { status: 404 }
//       )
//     }

//     return NextResponse.json({
//       message: "Property updated successfully",
//       property,
//     })
//   } catch (error) {
//     console.error("Update property error:", error)
//     return NextResponse.json(
//       { error: "Something went wrong." },
//       { status: 500 }
//     )
//   }
// }

// // ─────────────────────────────────────────
// // DELETE /api/properties/:id — Admin only
// // ─────────────────────────────────────────
// export async function DELETE(
//   req: NextRequest,
//   { params }: { params: Promise<{ id: string }> }
// ) {
//   try {
//     // Check admin
//     const auth = requireAdmin(req)
//     if (isErrorResponse(auth)) return auth

//     await connectDB()

//     const { id } = await params

//     const property = await Property.findByIdAndDelete(id)

//     if (!property) {
//       return NextResponse.json(
//         { error: "Property not found" },
//         { status: 404 }
//       )
//     }

//     return NextResponse.json({
//       message: "Property deleted successfully",
//     })
//   } catch (error) {
//     console.error("Delete property error:", error)
//     return NextResponse.json(
//       { error: "Something went wrong." },
//       { status: 500 }
//     )
//   }
// }






//updated with total views
import { NextRequest, NextResponse } from "next/server"
import { connectDB } from "@/app/lib/mongodb"
import Property from "@/app/models/Property"
import PropertyView from "@/app/models/PropertyView"
import { requireAdmin, isErrorResponse } from "@/app/lib/auth-helpers"

// ─────────────────────────────────────────
// GET /api/properties/:id — Public
// ─────────────────────────────────────────
export async function GET(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    await connectDB()

    const { id } = await params

    const property = await Property.findById(id).populate(
      "postedBy",
      "name email phone role"
    )

    if (!property) {
      return NextResponse.json(
        { error: "Property not found" },
        { status: 404 }
      )
    }

    // ✅ Track view
    const ip =
      req.headers.get("x-forwarded-for")?.split(",")[0] ||
      req.headers.get("x-real-ip") ||
      "anonymous"

    const oneDayAgo = new Date(Date.now() - 24 * 60 * 60 * 1000)
    const existingView = await PropertyView.findOne({
      propertyId: id,
      visitorId: ip,
      createdAt: { $gte: oneDayAgo },
    })

    if (!existingView) {
      await PropertyView.create({ propertyId: id, visitorId: ip })
    }

    // Get similar properties
    const similar = await Property.find({
      _id: { $ne: id },
      $or: [{ city: property.city }, { type: property.type }],
    })
      .limit(3)
      .select("title price priceLabel location city images listingType type bedrooms bathrooms area verified featured")

    return NextResponse.json({ property, similar })
  } catch (error) {
    console.error("Get property error:", error)
    return NextResponse.json(
      { error: "Something went wrong." },
      { status: 500 }
    )
  }
}

// ─────────────────────────────────────────
// PUT /api/properties/:id — Admin only
// ─────────────────────────────────────────
export async function PUT(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const auth = requireAdmin(req)
    if (isErrorResponse(auth)) return auth

    await connectDB()

    const { id } = await params
    const body = await req.json()

    const property = await Property.findByIdAndUpdate(
      id,
      { ...body, updatedAt: new Date() },
      { new: true, runValidators: true }
    )

    if (!property) {
      return NextResponse.json(
        { error: "Property not found" },
        { status: 404 }
      )
    }

    return NextResponse.json({
      message: "Property updated successfully",
      property,
    })
  } catch (error) {
    console.error("Update property error:", error)
    return NextResponse.json(
      { error: "Something went wrong." },
      { status: 500 }
    )
  }
}

// ─────────────────────────────────────────
// DELETE /api/properties/:id — Admin only
// ─────────────────────────────────────────
export async function DELETE(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const auth = requireAdmin(req)
    if (isErrorResponse(auth)) return auth

    await connectDB()

    const { id } = await params

    const property = await Property.findByIdAndDelete(id)

    if (!property) {
      return NextResponse.json(
        { error: "Property not found" },
        { status: 404 }
      )
    }

    return NextResponse.json({
      message: "Property deleted successfully",
    })
  } catch (error) {
    console.error("Delete property error:", error)
    return NextResponse.json(
      { error: "Something went wrong." },
      { status: 500 }
    )
  }
}
