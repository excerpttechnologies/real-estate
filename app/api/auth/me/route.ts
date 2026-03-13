import { NextRequest, NextResponse } from "next/server"
import { connectDB } from "@/app/lib/mongodb"
import User from "@/app/models/User"

export async function GET(req: NextRequest) {
  try {
    await connectDB()

    // User info was attached by middleware
    const userId = req.headers.get("x-user-id")

    if (!userId) {
      return NextResponse.json(
        { error: "Unauthorized" },
        { status: 401 }
      )
    }

    const user = await User.findById(userId).select("-password")

    if (!user) {
      return NextResponse.json(
        { error: "User not found" },
        { status: 404 }
      )
    }

    return NextResponse.json({ user })
  } catch (error) {
    console.error("Me error:", error)
    return NextResponse.json(
      { error: "Something went wrong." },
      { status: 500 }
    )
  }
}

// Logout
export async function DELETE() {
  const response = NextResponse.json({ message: "Logged out successfully" })

  response.cookies.set("token", "", {
    httpOnly: true,
    expires: new Date(0),
    path: "/",
  })

  return response
}
