import { NextRequest, NextResponse } from "next/server"
import bcrypt from "bcryptjs"
import { connectDB } from "@/app/lib/mongodb"
import User from "@/app/models/User"
import { requireAuth, isErrorResponse } from "@/app/lib/auth-helpers"

// ─────────────────────────────────────────
// GET /api/users — Get current user profile
// ─────────────────────────────────────────
export async function GET(req: NextRequest) {
  try {
    const auth = requireAuth(req)
    if (isErrorResponse(auth)) return auth

    await connectDB()

    const user = await User.findById(auth.user.userId).select("-password")

    if (!user) {
      return NextResponse.json(
        { error: "User not found" },
        { status: 404 }
      )
    }

    return NextResponse.json({ user })
  } catch (error) {
    console.error("Get user error:", error)
    return NextResponse.json(
      { error: "Something went wrong." },
      { status: 500 }
    )
  }
}

// ─────────────────────────────────────────
// PUT /api/users — Update current user profile
// ─────────────────────────────────────────
export async function PUT(req: NextRequest) {
  try {
    const auth = requireAuth(req)
    if (isErrorResponse(auth)) return auth

    await connectDB()

    const { name, phone, city, currentPassword, newPassword } = await req.json()

    const user = await User.findById(auth.user.userId)

    if (!user) {
      return NextResponse.json(
        { error: "User not found" },
        { status: 404 }
      )
    }

    // Update basic fields
    if (name) user.name = name
    if (phone) user.phone = phone
    if (city) user.city = city

    // Handle password change
    if (currentPassword && newPassword) {
      // Verify current password
      const isValid = await bcrypt.compare(currentPassword, user.password)
      if (!isValid) {
        return NextResponse.json(
          { error: "Current password is incorrect" },
          { status: 400 }
        )
      }

      // Validate new password
      if (newPassword.length < 6) {
        return NextResponse.json(
          { error: "New password must be at least 6 characters" },
          { status: 400 }
        )
      }

      user.password = await bcrypt.hash(newPassword, 12)
    }

    await user.save()

    return NextResponse.json({
      message: "Profile updated successfully",
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        phone: user.phone,
        city: user.city,
        role: user.role,
      },
    })
  } catch (error) {
    console.error("Update user error:", error)
    return NextResponse.json(
      { error: "Something went wrong." },
      { status: 500 }
    )
  }
}

// ─────────────────────────────────────────
// DELETE /api/users — Delete current user account
// ─────────────────────────────────────────
export async function DELETE(req: NextRequest) {
  try {
    const auth = requireAuth(req)
    if (isErrorResponse(auth)) return auth

    await connectDB()

    await User.findByIdAndDelete(auth.user.userId)

    // Clear cookie
    const response = NextResponse.json({
      message: "Account deleted successfully",
    })

    response.cookies.set("token", "", {
      httpOnly: true,
      expires: new Date(0),
      path: "/",
    })

    return response
  } catch (error) {
    console.error("Delete user error:", error)
    return NextResponse.json(
      { error: "Something went wrong." },
      { status: 500 }
    )
  }
}