"use client"

import { useEffect } from "react"
import { useRouter, usePathname } from "next/navigation"
import { useAuth } from "@/app/lib/auth-context"
import { Loader2 } from "lucide-react"

// Pages that don't require login
const PUBLIC_ROUTES = ["/login"]

export function AuthGuard({ children }: { children: React.ReactNode }) {
  const { isLoggedIn, loading } = useAuth()
  const router = useRouter()
  const pathname = usePathname()

  const isPublicRoute = PUBLIC_ROUTES.includes(pathname)

  useEffect(() => {
    if (!loading && !isLoggedIn && !isPublicRoute) {
      router.push("/login")
    }
  }, [loading, isLoggedIn, isPublicRoute])

  // Show spinner while checking auth
  if (loading) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
      </div>
    )
  }

  // Not logged in and not a public route — show nothing while redirecting
  if (!isLoggedIn && !isPublicRoute) {
    return null
  }

  return <>{children}</>
}