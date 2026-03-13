import { NextRequest, NextResponse } from "next/server"
import { verifyToken } from "@/app/lib/jwt"

// Routes that require login
const protectedRoutes = [
  "/api/saved",
  "/api/inquiries",
  "/api/dashboard",
  "/api/auth/me",
]

// Routes that require admin
const adminRoutes = [
  "/api/properties/create",
]

export function proxy(req: NextRequest) {
  const { pathname } = req.nextUrl

  // Check if route needs protection
  const isProtected = protectedRoutes.some((route) =>
    pathname.startsWith(route)
  )

  const isAdminRoute = adminRoutes.some((route) =>
    pathname.startsWith(route)
  )

  if (isProtected || isAdminRoute) {
    // Get token from cookie or header
    const token =
      req.cookies.get("token")?.value ||
      req.headers.get("authorization")?.substring(7)

    if (!token) {
      return NextResponse.json(
        { error: "Unauthorized. Please login." },
        { status: 401 }
      )
    }

    const user = verifyToken(token)

    if (!user) {
      return NextResponse.json(
        { error: "Invalid or expired token." },
        { status: 401 }
      )
    }

    // Check admin for admin routes
    if (isAdminRoute && user.role !== "admin") {
      return NextResponse.json(
        { error: "Forbidden. Admin access only." },
        { status: 403 }
      )
    }

    // Attach user info to headers so API routes can read it
    const requestHeaders = new Headers(req.headers)
    requestHeaders.set("x-user-id", user.userId)
    requestHeaders.set("x-user-email", user.email)
    requestHeaders.set("x-user-role", user.role)

    return NextResponse.next({
      request: { headers: requestHeaders },
    })
  }

  return NextResponse.next()
}

export const config = {
  matcher: [
    "/api/saved/:path*",
    "/api/inquiries/:path*",
    "/api/dashboard/:path*",
    "/api/auth/me",
    "/api/properties/create",
  ],
}