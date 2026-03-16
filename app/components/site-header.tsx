
// "use client"

// import { useState } from "react"
// import Link from "next/link"
// import { useRouter } from "next/navigation"
// import { Button } from "@/app/components/ui/button"
// import { useAuth } from "@/app/lib/auth-context"
// import {
//   Building2,
//   Heart,
//   Menu,
//   Plus,
//   Search,
//   User,
//   X,
//   LogOut,
//   LayoutDashboard,
//   ChevronDown,
// } from "lucide-react"

// export function SiteHeader() {
//   const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
//   const [userMenuOpen, setUserMenuOpen] = useState(false)
//   const { user, isLoggedIn, isAdmin, logout, loading } = useAuth()
//   const router = useRouter()

//   async function handleLogout() {
//     await logout()
//     setUserMenuOpen(false)
//     router.push("/")
//   }

//   return (
//     <header className="sticky top-0 z-50 bg-card/95 backdrop-blur-md border-b border-border shadow-sm">
//       <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4">

//         {/* Logo */}
//         <Link href="/" className="flex items-center gap-2">
//           <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-primary">
//             <Building2 className="h-5 w-5 text-primary-foreground" />
//           </div>
//           <span className="text-xl font-bold text-foreground">
//             Prop<span className="text-primary">Nest</span>
//           </span>
//         </Link>

//         {/* Desktop Navigation */}
//         <nav className="hidden items-center gap-1 md:flex">
//           <Link
//             href="/"
//             className="rounded-lg px-3 py-2 text-sm font-medium text-foreground transition-colors hover:bg-secondary"
//           >
//             Home
//           </Link>
//           <Link
//             href="/properties?type=buy"
//             className="rounded-lg px-3 py-2 text-sm font-medium text-muted-foreground transition-colors hover:bg-secondary hover:text-foreground"
//           >
//             Buy
//           </Link>
//           <Link
//             href="/properties?type=rent"
//             className="rounded-lg px-3 py-2 text-sm font-medium text-muted-foreground transition-colors hover:bg-secondary hover:text-foreground"
//           >
//             Rent
//           </Link>
//           <Link
//             href="/properties?type=commercial"
//             className="rounded-lg px-3 py-2 text-sm font-medium text-muted-foreground transition-colors hover:bg-secondary hover:text-foreground"
//           >
//             Commercial
//           </Link>
//           <Link
//             href="/properties?status=Under Construction"
//             className="rounded-lg px-3 py-2 text-sm font-medium text-muted-foreground transition-colors hover:bg-secondary hover:text-foreground"
//           >
//             New Projects
//           </Link>
//         </nav>

//         {/* Desktop Actions */}
//         <div className="hidden items-center gap-2 md:flex">
//           <Button variant="ghost" size="icon" asChild>
//             <Link href="/properties">
//               <Search className="h-4 w-4" />
//               <span className="sr-only">Search</span>
//             </Link>
//           </Button>

//           {/* Show saved only when logged in */}
//           {isLoggedIn && (
//             <Button variant="ghost" size="icon" asChild>
//               <Link href="/dashboard">
//                 <Heart className="h-4 w-4" />
//                 <span className="sr-only">Saved Properties</span>
//               </Link>
//             </Button>
//           )}

//           {/* Post Property — Admin only */}
//           {isAdmin && (
//             <Button variant="outline" size="sm" className="gap-1.5" asChild>
//               <Link href="/post-property">
//                 <Plus className="h-3.5 w-3.5" />
//                 Post Property
//               </Link>
//             </Button>
//           )}

//           {/* Auth buttons */}
//           {loading ? (
//             // Loading skeleton
//             <div className="h-8 w-20 animate-pulse rounded-lg bg-secondary" />
//           ) : isLoggedIn ? (
//             // User dropdown menu
//             <div className="relative">
//               <button
//                 onClick={() => setUserMenuOpen(!userMenuOpen)}
//                 className="flex items-center gap-2 rounded-xl border border-border bg-secondary px-3 py-1.5 text-sm font-medium text-foreground transition-colors hover:bg-secondary/80"
//               >
//                 <div className="flex h-6 w-6 items-center justify-center rounded-full bg-primary text-xs font-bold text-primary-foreground">
//                   {user?.name?.charAt(0).toUpperCase()}
//                 </div>
//                 <span className="max-w-[100px] truncate">{user?.name}</span>
//                 {isAdmin && (
//                   <span className="rounded-md bg-primary/10 px-1.5 py-0.5 text-[10px] font-semibold text-primary">
//                     Admin
//                   </span>
//                 )}
//                 <ChevronDown className="h-3.5 w-3.5 text-muted-foreground" />
//               </button>

//               {/* Dropdown */}
//               {userMenuOpen && (
//                 <>
//                   {/* Backdrop */}
//                   <div
//                     className="fixed inset-0 z-10"
//                     onClick={() => setUserMenuOpen(false)}
//                   />
//                   <div className="absolute right-0 top-full z-20 mt-2 w-48 overflow-hidden rounded-xl border border-border bg-card shadow-lg">
//                     <div className="border-b border-border px-4 py-3">
//                       <p className="text-sm font-semibold text-foreground truncate">
//                         {user?.name}
//                       </p>
//                       <p className="text-xs text-muted-foreground truncate">
//                         {user?.email}
//                       </p>
//                     </div>
//                     <div className="p-1">
//                       <Link
//                         href="/dashboard"
//                         onClick={() => setUserMenuOpen(false)}
//                         className="flex items-center gap-2 rounded-lg px-3 py-2 text-sm text-foreground transition-colors hover:bg-secondary"
//                       >
//                         <LayoutDashboard className="h-4 w-4" />
//                         Dashboard
//                       </Link>
//                       {isAdmin && (
//                         <Link
//                           href="/post-property"
//                           onClick={() => setUserMenuOpen(false)}
//                           className="flex items-center gap-2 rounded-lg px-3 py-2 text-sm text-foreground transition-colors hover:bg-secondary"
//                         >
//                           <Plus className="h-4 w-4" />
//                           Post Property
//                         </Link>
//                       )}
//                       <button
//                         onClick={handleLogout}
//                         className="flex w-full items-center gap-2 rounded-lg px-3 py-2 text-sm text-destructive transition-colors hover:bg-destructive/10"
//                       >
//                         <LogOut className="h-4 w-4" />
//                         Sign Out
//                       </button>
//                     </div>
//                   </div>
//                 </>
//               )}
//             </div>
//           ) : (
//             // Login button when not logged in
//             <Button size="sm" className="gap-1.5" asChild>
//               <Link href="/login">
//                 <User className="h-3.5 w-3.5" />
//                 Login
//               </Link>
//             </Button>
//           )}
//         </div>

//         {/* Mobile Menu Button */}
//         <button
//           className="flex items-center justify-center rounded-lg p-2 md:hidden"
//           onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
//           aria-label="Toggle menu"
//         >
//           {mobileMenuOpen ? (
//             <X className="h-5 w-5" />
//           ) : (
//             <Menu className="h-5 w-5" />
//           )}
//         </button>
//       </div>

//       {/* Mobile Menu */}
//       {mobileMenuOpen && (
//         <div className="border-t border-border bg-card md:hidden">
//           <nav className="flex flex-col px-4 py-3">
//             <Link
//               href="/"
//               className="rounded-lg px-3 py-2.5 text-sm font-medium text-foreground"
//               onClick={() => setMobileMenuOpen(false)}
//             >
//               Home
//             </Link>
//             <Link
//               href="/properties?type=buy"
//               className="rounded-lg px-3 py-2.5 text-sm font-medium text-muted-foreground"
//               onClick={() => setMobileMenuOpen(false)}
//             >
//               Buy
//             </Link>
//             <Link
//               href="/properties?type=rent"
//               className="rounded-lg px-3 py-2.5 text-sm font-medium text-muted-foreground"
//               onClick={() => setMobileMenuOpen(false)}
//             >
//               Rent
//             </Link>
//             <Link
//               href="/properties?type=commercial"
//               className="rounded-lg px-3 py-2.5 text-sm font-medium text-muted-foreground"
//               onClick={() => setMobileMenuOpen(false)}
//             >
//               Commercial
//             </Link>
//             <Link
//               href="/properties?status=Under Construction"
//               className="rounded-lg px-3 py-2.5 text-sm font-medium text-muted-foreground"
//               onClick={() => setMobileMenuOpen(false)}
//             >
//               New Projects
//             </Link>

//             <div className="mt-3 flex flex-col gap-2 border-t border-border pt-3">
//               {/* Admin only post property */}
//               {isAdmin && (
//                 <Button variant="outline" className="w-full gap-1.5" asChild>
//                   <Link
//                     href="/post-property"
//                     onClick={() => setMobileMenuOpen(false)}
//                   >
//                     <Plus className="h-3.5 w-3.5" />
//                     Post Property Free
//                   </Link>
//                 </Button>
//               )}

//               {isLoggedIn ? (
//                 <>
//                   <Button variant="outline" className="w-full gap-1.5" asChild>
//                     <Link
//                       href="/dashboard"
//                       onClick={() => setMobileMenuOpen(false)}
//                     >
//                       <LayoutDashboard className="h-3.5 w-3.5" />
//                       {user?.name}
//                     </Link>
//                   </Button>
//                   <Button
//                     variant="destructive"
//                     className="w-full gap-1.5"
//                     onClick={() => {
//                       handleLogout()
//                       setMobileMenuOpen(false)
//                     }}
//                   >
//                     <LogOut className="h-3.5 w-3.5" />
//                     Sign Out
//                   </Button>
//                 </>
//               ) : (
//                 <Button className="w-full gap-1.5" asChild>
//                   <Link
//                     href="/login"
//                     onClick={() => setMobileMenuOpen(false)}
//                   >
//                     <User className="h-3.5 w-3.5" />
//                     Login / Register
//                   </Link>
//                 </Button>
//               )}
//             </div>
//           </nav>
//         </div>
//       )}

//       {/* Mobile Bottom Bar */}
//       <div className="fixed bottom-0 left-0 right-0 z-50 flex items-center justify-around border-t border-border bg-card py-2 md:hidden">
//         <Link
//           href="/"
//           className="flex flex-col items-center gap-0.5 text-primary"
//         >
//           <Building2 className="h-5 w-5" />
//           <span className="text-[10px] font-medium">Home</span>
//         </Link>
//         <Link
//           href="/properties"
//           className="flex flex-col items-center gap-0.5 text-muted-foreground"
//         >
//           <Search className="h-5 w-5" />
//           <span className="text-[10px] font-medium">Search</span>
//         </Link>

//         {/* Post Property button — Admin only in bottom bar */}
//         {isAdmin && (
//           <Link href="/post-property" className="flex flex-col items-center gap-0.5">
//             <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary text-primary-foreground shadow-lg">
//               <Plus className="h-5 w-5" />
//             </div>
//           </Link>
//         )}

//         <Link
//           href="/dashboard"
//           className="flex flex-col items-center gap-0.5 text-muted-foreground"
//         >
//           <Heart className="h-5 w-5" />
//           <span className="text-[10px] font-medium">Saved</span>
//         </Link>
//         <Link
//           href={isLoggedIn ? "/dashboard" : "/login"}
//           className="flex flex-col items-center gap-0.5 text-muted-foreground"
//         >
//           <User className="h-5 w-5" />
//           <span className="text-[10px] font-medium">
//             {isLoggedIn ? "Profile" : "Login"}
//           </span>
//         </Link>
//       </div>
//     </header>
//   )
// }



"use client"

import { useState } from "react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { Button } from "@/app/components/ui/button"
import { useAuth } from "@/app/lib/auth-context"
import {
  Building2,
  Heart,
  Menu,
  Plus,
  Search,
  User,
  X,
  LogOut,
  LayoutDashboard,
  ChevronDown,
  Home,
  ShoppingBag,
  Key,
  Briefcase,
  Sparkles,
} from "lucide-react"

export function SiteHeader() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [userMenuOpen, setUserMenuOpen] = useState(false)
  const { user, isLoggedIn, isAdmin, logout, loading } = useAuth()
  const router = useRouter()

  async function handleLogout() {
    await logout()
    setUserMenuOpen(false)
    router.push("/")
  }

  return (
    <>
      <header className="sticky top-0 z-50 bg-card/95 backdrop-blur-md border-b border-border shadow-sm">
        <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4">

          {/* Logo */}
          <Link href="/" className="flex items-center gap-2">
            <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-primary">
              <Building2 className="h-5 w-5 text-primary-foreground" />
            </div>
            <span className="text-xl font-bold text-foreground">
              Prop<span className="text-primary">Nest</span>
            </span>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden items-center gap-1 md:flex">
            <Link href="/" className="rounded-lg px-3 py-2 text-sm font-medium text-foreground transition-colors hover:bg-secondary">
              Home
            </Link>
            <Link href="/properties?type=buy" className="rounded-lg px-3 py-2 text-sm font-medium text-muted-foreground transition-colors hover:bg-secondary hover:text-foreground">
              Buy
            </Link>
            <Link href="/properties?type=rent" className="rounded-lg px-3 py-2 text-sm font-medium text-muted-foreground transition-colors hover:bg-secondary hover:text-foreground">
              Rent
            </Link>
            <Link href="/properties?type=commercial" className="rounded-lg px-3 py-2 text-sm font-medium text-muted-foreground transition-colors hover:bg-secondary hover:text-foreground">
              Commercial
            </Link>
            <Link href="/properties?status=Under Construction" className="rounded-lg px-3 py-2 text-sm font-medium text-muted-foreground transition-colors hover:bg-secondary hover:text-foreground">
              New Projects
            </Link>
          </nav>

          {/* Desktop Actions */}
          <div className="hidden items-center gap-2 md:flex">
            <Button variant="ghost" size="icon" asChild>
              <Link href="/properties">
                <Search className="h-4 w-4" />
                <span className="sr-only">Search</span>
              </Link>
            </Button>

            {isLoggedIn && (
              <Button variant="ghost" size="icon" asChild>
                <Link href="/dashboard">
                  <Heart className="h-4 w-4" />
                  <span className="sr-only">Saved Properties</span>
                </Link>
              </Button>
            )}

            {isAdmin && (
              <Button variant="outline" size="sm" className="gap-1.5" asChild>
                <Link href="/post-property">
                  <Plus className="h-3.5 w-3.5" />
                  Post Property
                </Link>
              </Button>
            )}

            {loading ? (
              <div className="h-8 w-20 animate-pulse rounded-lg bg-secondary" />
            ) : isLoggedIn ? (
              <div className="relative">
                <button
                  onClick={() => setUserMenuOpen(!userMenuOpen)}
                  className="flex items-center gap-2 rounded-xl border border-border bg-secondary px-3 py-1.5 text-sm font-medium text-foreground transition-colors hover:bg-secondary/80"
                >
                  <div className="flex h-6 w-6 items-center justify-center rounded-full bg-primary text-xs font-bold text-primary-foreground">
                    {user?.name?.charAt(0).toUpperCase()}
                  </div>
                  <span className="max-w-[100px] truncate">{user?.name}</span>
                  {isAdmin && (
                    <span className="rounded-md bg-primary/10 px-1.5 py-0.5 text-[10px] font-semibold text-primary">
                      Admin
                    </span>
                  )}
                  <ChevronDown className="h-3.5 w-3.5 text-muted-foreground" />
                </button>

                {userMenuOpen && (
                  <>
                    <div className="fixed inset-0 z-10" onClick={() => setUserMenuOpen(false)} />
                    <div className="absolute right-0 top-full z-20 mt-2 w-48 overflow-hidden rounded-xl border border-border bg-card shadow-lg">
                      <div className="border-b border-border px-4 py-3">
                        <p className="text-sm font-semibold text-foreground truncate">{user?.name}</p>
                        <p className="text-xs text-muted-foreground truncate">{user?.email}</p>
                      </div>
                      <div className="p-1">
                        <Link href="/dashboard" onClick={() => setUserMenuOpen(false)} className="flex items-center gap-2 rounded-lg px-3 py-2 text-sm text-foreground transition-colors hover:bg-secondary">
                          <LayoutDashboard className="h-4 w-4" />
                          Dashboard
                        </Link>
                        {isAdmin && (
                          <Link href="/post-property" onClick={() => setUserMenuOpen(false)} className="flex items-center gap-2 rounded-lg px-3 py-2 text-sm text-foreground transition-colors hover:bg-secondary">
                            <Plus className="h-4 w-4" />
                            Post Property
                          </Link>
                        )}
                        <button onClick={handleLogout} className="flex w-full items-center gap-2 rounded-lg px-3 py-2 text-sm text-destructive transition-colors hover:bg-destructive/10">
                          <LogOut className="h-4 w-4" />
                          Sign Out
                        </button>
                      </div>
                    </div>
                  </>
                )}
              </div>
            ) : (
              <Button size="sm" className="gap-1.5" asChild>
                <Link href="/login">
                  <User className="h-3.5 w-3.5" />
                  Login
                </Link>
              </Button>
            )}
          </div>

          {/* Mobile Header Right — shows user avatar + hamburger */}
          <div className="flex items-center gap-2 md:hidden">
            {isLoggedIn && !loading && (
              <div className="flex h-8 w-8 items-center justify-center rounded-full bg-primary text-sm font-bold text-primary-foreground">
                {user?.name?.charAt(0).toUpperCase()}
              </div>
            )}
            <button
              className="flex h-9 w-9 items-center justify-center rounded-xl border border-border bg-secondary transition-colors hover:bg-secondary/80"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              aria-label="Toggle menu"
            >
              {mobileMenuOpen ? (
                <X className="h-5 w-5 text-foreground" />
              ) : (
                <Menu className="h-5 w-5 text-foreground" />
              )}
            </button>
          </div>
        </div>

        {/* ── Mobile Slide-down Menu ── */}
        {mobileMenuOpen && (
          <>
            {/* Backdrop */}
            <div
              className="fixed inset-0 z-40 bg-foreground/20 backdrop-blur-sm md:hidden"
              onClick={() => setMobileMenuOpen(false)}
            />

            {/* Menu Panel */}
            <div className="absolute left-0 right-0 top-16 z-50 border-b border-border bg-card shadow-xl md:hidden">

              {/* User Info (if logged in) */}
              {isLoggedIn && !loading && (
                <div className="flex items-center gap-3 border-b border-border bg-primary/5 px-4 py-3">
                  <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary text-sm font-bold text-primary-foreground">
                    {user?.name?.charAt(0).toUpperCase()}
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-semibold text-foreground truncate">{user?.name}</p>
                    <p className="text-xs text-muted-foreground truncate">{user?.email}</p>
                  </div>
                  {isAdmin && (
                    <span className="shrink-0 rounded-md bg-primary/10 px-2 py-0.5 text-xs font-semibold text-primary">
                      Admin
                    </span>
                  )}
                </div>
              )}

              {/* Navigation Links */}
              <nav className="px-3 py-2">
                <p className="mb-1 px-3 text-[10px] font-semibold uppercase tracking-wider text-muted-foreground">
                  Browse
                </p>
                {[
                  { href: "/", label: "Home", icon: Home },
                  { href: "/properties?type=buy", label: "Buy", icon: ShoppingBag },
                  { href: "/properties?type=rent", label: "Rent", icon: Key },
                  { href: "/properties?type=commercial", label: "Commercial", icon: Briefcase },
                  { href: "/properties?status=Under Construction", label: "New Projects", icon: Sparkles },
                ].map((item) => (
                  <Link
                    key={item.href}
                    href={item.href}
                    onClick={() => setMobileMenuOpen(false)}
                    className="flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-medium text-foreground transition-colors hover:bg-secondary"
                  >
                    <item.icon className="h-4 w-4 text-primary" />
                    {item.label}
                  </Link>
                ))}
              </nav>

              {/* Account Section */}
              <div className="border-t border-border px-3 py-2">
                <p className="mb-1 px-3 text-[10px] font-semibold uppercase tracking-wider text-muted-foreground">
                  Account
                </p>

                {isAdmin && (
                  <Link
                    href="/post-property"
                    onClick={() => setMobileMenuOpen(false)}
                    className="flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-medium text-foreground transition-colors hover:bg-secondary"
                  >
                    <Plus className="h-4 w-4 text-primary" />
                    Post Property
                  </Link>
                )}

                {isLoggedIn ? (
                  <>
                    <Link
                      href="/dashboard"
                      onClick={() => setMobileMenuOpen(false)}
                      className="flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-medium text-foreground transition-colors hover:bg-secondary"
                    >
                      <LayoutDashboard className="h-4 w-4 text-primary" />
                      Dashboard
                    </Link>
                    <Link
                      href="/dashboard"
                      onClick={() => setMobileMenuOpen(false)}
                      className="flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-medium text-foreground transition-colors hover:bg-secondary"
                    >
                      <Heart className="h-4 w-4 text-primary" />
                      Saved Properties
                    </Link>
                    <button
                      onClick={() => {
                        handleLogout()
                        setMobileMenuOpen(false)
                      }}
                      className="flex w-full items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-medium text-destructive transition-colors hover:bg-destructive/10"
                    >
                      <LogOut className="h-4 w-4" />
                      Sign Out
                    </button>
                  </>
                ) : (
                  <Link
                    href="/login"
                    onClick={() => setMobileMenuOpen(false)}
                    className="flex items-center gap-3 rounded-xl bg-primary px-3 py-2.5 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90"
                  >
                    <User className="h-4 w-4" />
                    Login / Register
                  </Link>
                )}
              </div>

              {/* Bottom padding for safe area */}
              <div className="h-2" />
            </div>
          </>
        )}
      </header>

      {/* ── Mobile Bottom Navigation Bar ── */}
      <div className="fixed bottom-0 left-0 right-0 z-50 flex items-center justify-around border-t border-border bg-card/95 backdrop-blur-md py-2 md:hidden">
        <Link href="/" className="flex flex-col items-center gap-0.5 text-primary">
          <Building2 className="h-5 w-5" />
          <span className="text-[10px] font-medium">Home</span>
        </Link>
        <Link href="/properties" className="flex flex-col items-center gap-0.5 text-muted-foreground">
          <Search className="h-5 w-5" />
          <span className="text-[10px] font-medium">Search</span>
        </Link>

        {isAdmin && (
          <Link href="/post-property" className="flex flex-col items-center gap-0.5">
            <div className="flex h-12 w-12 -mt-5 items-center justify-center rounded-full bg-primary text-primary-foreground shadow-lg border-4 border-card">
              <Plus className="h-5 w-5" />
            </div>
            <span className="text-[10px] font-medium text-primary mt-0.5">Post</span>
          </Link>
        )}

        <Link href="/dashboard" className="flex flex-col items-center gap-0.5 text-muted-foreground">
          <Heart className="h-5 w-5" />
          <span className="text-[10px] font-medium">Saved</span>
        </Link>
        <Link href={isLoggedIn ? "/dashboard" : "/login"} className="flex flex-col items-center gap-0.5 text-muted-foreground">
          <User className="h-5 w-5" />
          <span className="text-[10px] font-medium">
            {isLoggedIn ? "Profile" : "Login"}
          </span>
        </Link>
      </div>

      {/* Bottom padding to prevent content hiding behind bottom bar */}
      {/* <div className="h-16 md:hidden" /> */}
    </>
  )
}
