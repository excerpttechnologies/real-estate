// import { NextRequest, NextResponse } from "next/server"
// import { connectDB } from "@/app/lib/mongodb"
// import Property from "@/app/models/Property"
// import SavedProperty from "@/app/models/SavedProperty"
// import Inquiry from "@/app/models/Inquiry"
// import { requireAuth, isErrorResponse } from "@/app/lib/auth-helpers"

// // GET /api/dashboard/stats
// export async function GET(req: NextRequest) {
//   try {
//     const auth = requireAuth(req)
//     if (isErrorResponse(auth)) return auth

//     await connectDB()

//     const userId = auth.user.userId

//     // Run all queries in parallel
//     const [activeListings, savedCount, inquiriesCount] = await Promise.all([
//       // Admin sees all listings, user sees their own
//       // auth.user.role === "admin"
//       //   ? Property.countDocuments()
//       //   : Property.countDocuments({ postedBy: userId }),

//       // Both admin and user see ALL listings
// Property.countDocuments(),

//       // SavedProperty.countDocuments({ userId }),
//       auth.user.role === "admin"
//   ? SavedProperty.countDocuments()
//   : SavedProperty.countDocuments({ userId }),

//       // Admin sees all inquiries, user sees their own
//       auth.user.role === "admin"
//         ? Inquiry.countDocuments()
//         : Inquiry.countDocuments({ senderId: userId }),
//     ])

//     return NextResponse.json({
//       stats: {
//         activeListings,
//         savedCount,
//         inquiriesCount,
//         totalViews: 0, // Can add a views tracking model later
//       },
//     })
//   } catch (error) {
//     console.error("Dashboard stats error:", error)
//     return NextResponse.json(
//       { error: "Something went wrong." },
//       { status: 500 }
//     )
//   }
// }



import { NextRequest, NextResponse } from "next/server"
import { connectDB } from "@/app/lib/mongodb"
import Property from "@/app/models/Property"
import SavedProperty from "@/app/models/SavedProperty"
import Inquiry from "@/app/models/Inquiry"
import PropertyView from "@/app/models/PropertyView"
import { requireAuth, isErrorResponse } from "@/app/lib/auth-helpers"

export async function GET(req: NextRequest) {
  try {
    const auth = requireAuth(req)
    if (isErrorResponse(auth)) return auth

    await connectDB()

    const userId = auth.user.userId

    // Get property IDs for this user (to count views)
    const userProperties = await Property.find(
      auth.user.role === "admin" ? {} : { postedBy: userId }
    ).select("_id")

    const propertyIds = userProperties.map((p) => p._id)

    const [activeListings, savedCount, inquiriesCount, totalViews] =
      await Promise.all([
        // Both admin and user see all listings
        Property.countDocuments(),

        // Saved — admin sees all, user sees own
        auth.user.role === "admin"
          ? SavedProperty.countDocuments()
          : SavedProperty.countDocuments({ userId }),

        // Inquiries — admin sees all, user sees own
        auth.user.role === "admin"
          ? Inquiry.countDocuments()
          : Inquiry.countDocuments({ senderId: userId }),

        // Views — count views on their properties
        PropertyView.countDocuments(
          propertyIds.length > 0
            ? { propertyId: { $in: propertyIds } }
            : {}
        ),
      ])

    return NextResponse.json({
      stats: {
        activeListings,
        savedCount,
        inquiriesCount,
        totalViews,
      },
    })
  } catch (error) {
    console.error("Dashboard stats error:", error)
    return NextResponse.json(
      { error: "Something went wrong." },
      { status: 500 }
    )
  }
}
