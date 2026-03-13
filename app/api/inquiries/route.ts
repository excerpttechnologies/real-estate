// import { NextRequest, NextResponse } from "next/server"
// import { connectDB } from "@/app/lib/mongodb"
// import Inquiry from "@/app/models/Inquiry"
// import { requireAuth, isErrorResponse } from "@/app/lib/auth-helpers"

// // GET /api/inquiries — Get inquiries for logged in user
// export async function GET(req: NextRequest) {
//   try {
//     const auth = requireAuth(req)
//     if (isErrorResponse(auth)) return auth

//     await connectDB()

//     const inquiries = await Inquiry.find({
//       senderId: auth.user.userId,
//     })
//       .populate("propertyId", "title location city images price priceLabel")
//       .sort({ createdAt: -1 })

//     return NextResponse.json({ inquiries })
//   } catch (error) {
//     console.error("Get inquiries error:", error)
//     return NextResponse.json(
//       { error: "Something went wrong." },
//       { status: 500 }
//     )
//   }
// }

// // POST /api/inquiries — Send an inquiry
// export async function POST(req: NextRequest) {
//   try {
//     const auth = requireAuth(req)
//     if (isErrorResponse(auth)) return auth

//     await connectDB()

//     const { propertyId, message } = await req.json()

//     if (!propertyId || !message) {
//       return NextResponse.json(
//         { error: "Property ID and message are required" },
//         { status: 400 }
//       )
//     }

//     const inquiry = await Inquiry.create({
//       senderId: auth.user.userId,
//       propertyId,
//       message,
//     })

//     return NextResponse.json(
//       {
//         message: "Inquiry sent successfully",
//         inquiry,
//       },
//       { status: 201 }
//     )
//   } catch (error) {
//     console.error("Create inquiry error:", error)
//     return NextResponse.json(
//       { error: "Something went wrong." },
//       { status: 500 }
//     )
//   }
// }



import { NextRequest, NextResponse } from "next/server"
import { connectDB } from "@/app/lib/mongodb"
import Inquiry from "@/app/models/Inquiry"
import { requireAuth, isErrorResponse } from "@/app/lib/auth-helpers"

// GET /api/inquiries — Get inquiries
export async function GET(req: NextRequest) {
  try {
    const auth = requireAuth(req)
    if (isErrorResponse(auth)) return auth

    await connectDB()

    // ✅ Admin sees ALL inquiries, user sees only their own
    const query =
      auth.user.role === "admin"
        ? {}
        : { senderId: auth.user.userId }

    const inquiries = await Inquiry.find(query)
      .populate("propertyId", "title location city images price priceLabel")
      .populate("senderId", "name email phone")
      .sort({ createdAt: -1 })

    return NextResponse.json({ inquiries })
  } catch (error) {
    console.error("Get inquiries error:", error)
    return NextResponse.json(
      { error: "Something went wrong." },
      { status: 500 }
    )
  }
}

// POST /api/inquiries — Send an inquiry
export async function POST(req: NextRequest) {
  try {
    const auth = requireAuth(req)
    if (isErrorResponse(auth)) return auth

    await connectDB()

    const { propertyId, message } = await req.json()

    if (!propertyId || !message) {
      return NextResponse.json(
        { error: "Property ID and message are required" },
        { status: 400 }
      )
    }

    const inquiry = await Inquiry.create({
      senderId: auth.user.userId,
      propertyId,
      message,
    })

    return NextResponse.json(
      {
        message: "Inquiry sent successfully",
        inquiry,
      },
      { status: 201 }
    )
  } catch (error) {
    console.error("Create inquiry error:", error)
    return NextResponse.json(
      { error: "Something went wrong." },
      { status: 500 }
    )
  }
}
