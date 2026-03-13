import { NextRequest, NextResponse } from "next/server"
import { connectDB } from "@/app/lib/mongodb"
import SavedProperty from "@/app/models/SavedProperty"
import { requireAuth, isErrorResponse } from "@/app/lib/auth-helpers"

// POST /api/saved/:id — Save a property
export async function POST(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const auth = requireAuth(req)
    if (isErrorResponse(auth)) return auth

    await connectDB()

    const { id } = await params

    // Check if already saved
    const existing = await SavedProperty.findOne({
      userId: auth.user.userId,
      propertyId: id,
    })

    if (existing) {
      return NextResponse.json(
        { error: "Property already saved" },
        { status: 409 }
      )
    }

    await SavedProperty.create({
      userId: auth.user.userId,
      propertyId: id,
    })

    return NextResponse.json(
      { message: "Property saved successfully" },
      { status: 201 }
    )
  } catch (error) {
    console.error("Save property error:", error)
    return NextResponse.json(
      { error: "Something went wrong." },
      { status: 500 }
    )
  }
}

// DELETE /api/saved/:id — Unsave a property
export async function DELETE(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const auth = requireAuth(req)
    if (isErrorResponse(auth)) return auth

    await connectDB()

    const { id } = await params

    await SavedProperty.findOneAndDelete({
      userId: auth.user.userId,
      propertyId: id,
    })

    return NextResponse.json({ message: "Property unsaved successfully" })
  } catch (error) {
    console.error("Unsave property error:", error)
    return NextResponse.json(
      { error: "Something went wrong." },
      { status: 500 }
    )
  }
}