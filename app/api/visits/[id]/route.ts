import { NextRequest, NextResponse } from "next/server"
import { connectDB } from "@/app/lib/mongodb"
import SiteVisit from "@/app/models/SiteVisit"
import { requireAuth, isErrorResponse } from "@/app/lib/auth-helpers"

// PUT /api/visits/:id — Update visit status (admin) or cancel (user)
export async function PUT(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const auth = requireAuth(req)
    if (isErrorResponse(auth)) return auth

    await connectDB()

    const { id } = await params
    const { status } = await req.json()

    const validStatuses = ["pending", "confirmed", "cancelled", "completed"]
    if (!validStatuses.includes(status)) {
      return NextResponse.json(
        { error: "Invalid status" },
        { status: 400 }
      )
    }

    // Admin can update any status
    // User can only cancel their own visit
    let visit
    if (auth.user.role === "admin") {
      visit = await SiteVisit.findByIdAndUpdate(
        id,
        { status },
        { new: true }
      )
    } else {
      if (status !== "cancelled") {
        return NextResponse.json(
          { error: "You can only cancel your visit" },
          { status: 403 }
        )
      }
      visit = await SiteVisit.findOneAndUpdate(
        { _id: id, userId: auth.user.userId },
        { status: "cancelled" },
        { new: true }
      )
    }

    if (!visit) {
      return NextResponse.json(
        { error: "Visit not found" },
        { status: 404 }
      )
    }

    return NextResponse.json({
      message: "Visit updated successfully",
      visit,
    })
  } catch (error) {
    console.error("Update visit error:", error)
    return NextResponse.json(
      { error: "Something went wrong." },
      { status: 500 }
    )
  }
}

// DELETE /api/visits/:id — Delete visit (admin only)
export async function DELETE(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const auth = requireAuth(req)
    if (isErrorResponse(auth)) return auth

    await connectDB()

    const { id } = await params

    // Admin can delete any, user can only delete their own cancelled visits
    let visit
    if (auth.user.role === "admin") {
      visit = await SiteVisit.findByIdAndDelete(id)
    } else {
      visit = await SiteVisit.findOneAndDelete({
        _id: id,
        userId: auth.user.userId,
        status: "cancelled",
      })
    }

    if (!visit) {
      return NextResponse.json(
        { error: "Visit not found" },
        { status: 404 }
      )
    }

    return NextResponse.json({ message: "Visit deleted successfully" })
  } catch (error) {
    console.error("Delete visit error:", error)
    return NextResponse.json(
      { error: "Something went wrong." },
      { status: 500 }
    )
  }
}
