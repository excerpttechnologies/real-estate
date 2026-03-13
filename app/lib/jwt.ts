import jwt from "jsonwebtoken"

const JWT_SECRET = process.env.JWT_SECRET!

export interface JwtPayload {
  userId: string
  email: string
  role: "user" | "admin"
}

// Create token
export function signToken(payload: JwtPayload): string {
  return jwt.sign(payload, JWT_SECRET, { expiresIn: "7d" })
}

// Verify token
export function verifyToken(token: string): JwtPayload | null {
  try {
    return jwt.verify(token, JWT_SECRET) as JwtPayload
  } catch {
    return null
  }
}