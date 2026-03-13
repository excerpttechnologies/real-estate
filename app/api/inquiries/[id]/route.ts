import { NextRequest, NextResponse } from "next/server"
import { connectDB } from "@/app/lib/mongodb"
import Inquiry from "@/app/models/Inquiry"
import { requireAuth, isErrorResponse } from "@/app/lib/auth-helpers"

// ─────────────────────────────────────────
// GET /api/inquiries/:id — Get single inquiry
// ─────────────────────────────────────────
export async function GET(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const auth = requireAuth(req)
    if (isErrorResponse(auth)) return auth

    await connectDB()

    const { id } = await params

    const inquiry = await Inquiry.findById(id)
      .populate("propertyId", "title location city images price priceLabel")
      .populate("senderId", "name email phone")

    if (!inquiry) {
      return NextResponse.json(
        { error: "Inquiry not found" },
        { status: 404 }
      )
    }

    // Only sender or admin can view
    if (
      inquiry.senderId._id.toString() !== auth.user.userId &&
      auth.user.role !== "admin"
    ) {
      return NextResponse.json(
        { error: "Forbidden" },
        { status: 403 }
      )
    }

    return NextResponse.json({ inquiry })
  } catch (error) {
    console.error("Get inquiry error:", error)
    return NextResponse.json(
      { error: "Something went wrong." },
      { status: 500 }
    )
  }
}

// ─────────────────────────────────────────
// PUT /api/inquiries/:id — Mark as read/replied
// ─────────────────────────────────────────
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

    // Validate status
    if (!["unread", "read", "replied"].includes(status)) {
      return NextResponse.json(
        { error: "Invalid status. Use: unread, read, or replied" },
        { status: 400 }
      )
    }

    const inquiry = await Inquiry.findById(id)

    if (!inquiry) {
      return NextResponse.json(
        { error: "Inquiry not found" },
        { status: 404 }
      )
    }

    // Only admin can update status
    if (auth.user.role !== "admin") {
      return NextResponse.json(
        { error: "Forbidden. Admin access only." },
        { status: 403 }
      )
    }

    inquiry.status = status
    await inquiry.save()

    return NextResponse.json({
      message: `Inquiry marked as ${status}`,
      inquiry,
    })
  } catch (error) {
    console.error("Update inquiry error:", error)
    return NextResponse.json(
      { error: "Something went wrong." },
      { status: 500 }
    )
  }
}

// ─────────────────────────────────────────
// DELETE /api/inquiries/:id — Delete inquiry
// ─────────────────────────────────────────
export async function DELETE(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const auth = requireAuth(req)
    if (isErrorResponse(auth)) return auth

    await connectDB()

    const { id } = await params

    const inquiry = await Inquiry.findById(id)

    if (!inquiry) {
      return NextResponse.json(
        { error: "Inquiry not found" },
        { status: 404 }
      )
    }

    // Only sender or admin can delete
    if (
      inquiry.senderId.toString() !== auth.user.userId &&
      auth.user.role !== "admin"
    ) {
      return NextResponse.json(
        { error: "Forbidden" },
        { status: 403 }
      )
    }

    await Inquiry.findByIdAndDelete(id)

    return NextResponse.json({
      message: "Inquiry deleted successfully",
    })
  } catch (error) {
    console.error("Delete inquiry error:", error)
    return NextResponse.json(
      { error: "Something went wrong." },
      { status: 500 }
    )
  }
}