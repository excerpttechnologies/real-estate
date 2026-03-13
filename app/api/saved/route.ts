import { NextRequest, NextResponse } from "next/server"
import { connectDB } from "@/app/lib/mongodb"
import SavedProperty from "@/app/models/SavedProperty"
import { requireAuth, isErrorResponse } from "@/app/lib/auth-helpers"

// GET /api/saved — Get all saved properties for logged in user
export async function GET(req: NextRequest) {
  try {
    const auth = requireAuth(req)
    if (isErrorResponse(auth)) return auth

    await connectDB()

    const saved = await SavedProperty.find({
      userId: auth.user.userId,
    }).populate({
      path: "propertyId",
      select:
        "title price priceLabel location city images listingType type bedrooms bathrooms area verified featured",
    })

    return NextResponse.json({ saved })
  } catch (error) {
    console.error("Get saved error:", error)
    return NextResponse.json(
      { error: "Something went wrong." },
      { status: 500 }
    )
  }
}