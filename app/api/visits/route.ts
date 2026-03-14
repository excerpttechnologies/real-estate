import { NextRequest, NextResponse } from "next/server"
import { connectDB } from "@/app/lib/mongodb"
import SiteVisit from "@/app/models/SiteVisit"
import { requireAuth, isErrorResponse } from "@/app/lib/auth-helpers"

// GET /api/visits — Get visits
export async function GET(req: NextRequest) {
  try {
    const auth = requireAuth(req)
    if (isErrorResponse(auth)) return auth

    await connectDB()

    // Admin sees all visits, user sees only their own
    const query =
      auth.user.role === "admin"
        ? {}
        : { userId: auth.user.userId }

    const visits = await SiteVisit.find(query)
      .populate("propertyId", "title location city images")
      .populate("userId", "name email phone")
      .sort({ createdAt: -1 })

    return NextResponse.json({ visits })
  } catch (error) {
    console.error("Get visits error:", error)
    return NextResponse.json(
      { error: "Something went wrong." },
      { status: 500 }
    )
  }
}

// POST /api/visits — Book a visit
export async function POST(req: NextRequest) {
  try {
    const auth = requireAuth(req)
    if (isErrorResponse(auth)) return auth

    await connectDB()

    const { propertyId, name, email, phone, date, timeSlot, message } =
      await req.json()

    if (!propertyId || !name || !email || !phone || !date || !timeSlot) {
      return NextResponse.json(
        { error: "All fields are required" },
        { status: 400 }
      )
    }

    // Check if user already has a pending/confirmed visit for this property
    const existing = await SiteVisit.findOne({
      propertyId,
      userId: auth.user.userId,
      status: { $in: ["pending", "confirmed"] },
    })

    if (existing) {
      return NextResponse.json(
        { error: "You already have a scheduled visit for this property" },
        { status: 400 }
      )
    }

    const visit = await SiteVisit.create({
      propertyId,
      userId: auth.user.userId,
      name,
      email,
      phone,
      date,
      timeSlot,
      message,
    })

    return NextResponse.json(
      { message: "Visit scheduled successfully", visit },
      { status: 201 }
    )
  } catch (error) {
    console.error("Book visit error:", error)
    return NextResponse.json(
      { error: "Something went wrong." },
      { status: 500 }
    )
  }
}