import { NextRequest, NextResponse } from "next/server"
import { verifyToken, JwtPayload } from "./jwt"

// Extract token from request (checks header AND cookie)
export function getTokenFromRequest(req: NextRequest): string | null {
  // Check Authorization header first
  const authHeader = req.headers.get("authorization")
  if (authHeader && authHeader.startsWith("Bearer ")) {
    return authHeader.substring(7)
  }

  // Check cookie
  const token = req.cookies.get("token")?.value
  if (token) return token

  return null
}

// Use this in routes that need a logged-in user
export function requireAuth(
  req: NextRequest
): { user: JwtPayload } | NextResponse {
  const token = getTokenFromRequest(req)

  if (!token) {
    return NextResponse.json(
      { error: "Unauthorized. Please login." },
      { status: 401 }
    )
  }

  const user = verifyToken(token)

  if (!user) {
    return NextResponse.json(
      { error: "Invalid or expired token. Please login again." },
      { status: 401 }
    )
  }

  return { user }
}

// Use this in routes that need ADMIN role
export function requireAdmin(
  req: NextRequest
): { user: JwtPayload } | NextResponse {
  const result = requireAuth(req)

  // If requireAuth returned an error response
  if (result instanceof NextResponse) {
    return result
  }

  if (result.user.role !== "admin") {
    return NextResponse.json(
      { error: "Forbidden. Admin access only." },
      { status: 403 }
    )
  }

  return result
}

// Helper to check if result is an error response
export function isErrorResponse(
  result: { user: JwtPayload } | NextResponse
): result is NextResponse {
  return result instanceof NextResponse
}