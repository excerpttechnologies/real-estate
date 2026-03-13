import { NextRequest, NextResponse } from "next/server"
import { connectDB } from "@/app/lib/mongodb"
import Property from "@/app/models/Property"
import SavedProperty from "@/app/models/SavedProperty"
import Inquiry from "@/app/models/Inquiry"
import { requireAuth, isErrorResponse } from "@/app/lib/auth-helpers"

export async function GET(req: NextRequest) {
  try {
    const auth = requireAuth(req)
    if (isErrorResponse(auth)) return auth

    await connectDB()

    const userId = auth.user.userId
    const activities: {
      type: string
      text: string
      time: Date
      icon: string
    }[] = []

    // Recent saved properties
    const recentSaved = await SavedProperty.find({ userId })
      .sort({ createdAt: -1 })
      .limit(3)
      .populate("propertyId", "title")

    for (const saved of recentSaved) {
      if (saved.propertyId) {
        activities.push({
          type: "saved",
          text: `You saved "${(saved.propertyId as any).title}"`,
          time: saved.createdAt,
          icon: "Heart",
        })
      }
    }

    // Recent inquiries sent by user
    const recentInquiries = await Inquiry.find({ senderId: userId })
      .sort({ createdAt: -1 })
      .limit(3)
      .populate("propertyId", "title")

    for (const inquiry of recentInquiries) {
      if (inquiry.propertyId) {
        activities.push({
          type: "inquiry",
          text: `You sent an inquiry for "${(inquiry.propertyId as any).title}"`,
          time: inquiry.createdAt,
          icon: "MessageSquare",
        })
      }
    }

    // Admin gets extra activities
    if (auth.user.role === "admin") {
      // Recent properties listed
      const recentProperties = await Property.find()
        .sort({ createdAt: -1 })
        .limit(3)
        .select("title createdAt")

      for (const property of recentProperties) {
        activities.push({
          type: "listing",
          text: `New property listed: "${property.title}"`,
          time: property.createdAt,
          icon: "Building2",
        })
      }

      // Recent inquiries received
      const receivedInquiries = await Inquiry.find()
        .sort({ createdAt: -1 })
        .limit(3)
        .populate("propertyId", "title")
        .populate("senderId", "name")

      for (const inquiry of receivedInquiries) {
        if (inquiry.propertyId && inquiry.senderId) {
          activities.push({
            type: "received_inquiry",
            text: `New inquiry from "${(inquiry.senderId as any).name}" for "${(inquiry.propertyId as any).title}"`,
            time: inquiry.createdAt,
            icon: "Phone",
          })
        }
      }
    }

    // Sort all by newest first
    activities.sort(
      (a, b) => new Date(b.time).getTime() - new Date(a.time).getTime()
    )

    return NextResponse.json({
      activities: activities.slice(0, 8),
    })
  } catch (error) {
    console.error("Activity error:", error)
    return NextResponse.json(
      { error: "Something went wrong." },
      { status: 500 }
    )
  }
}