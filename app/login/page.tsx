// "use client"

// import { useState } from "react"
// import Link from "next/link"
// import { Button } from "@/app/components/ui/button"
// import { Input } from "@/app/components/ui/input"
// import { Building2, Eye, EyeOff, Mail, Lock, ArrowRight } from "lucide-react"

// export default function LoginPage() {
//   const [isLogin, setIsLogin] = useState(true)
//   const [showPassword, setShowPassword] = useState(false)

//   return (
//     <div className="flex min-h-screen">
//       {/* Left - Form */}
//       <div className="flex flex-1 flex-col items-center justify-center px-4 py-10">
//         <div className="w-full max-w-md">
//           <Link href="/" className="mb-8 flex items-center gap-2">
//             <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-primary">
//               <Building2 className="h-5 w-5 text-primary-foreground" />
//             </div>
//             <span className="text-xl font-bold text-foreground">
//               Prop<span className="text-primary">Nest</span>
//             </span>
//           </Link>

//           <h1 className="text-2xl font-bold text-foreground">
//             {isLogin ? "Welcome back" : "Create your account"}
//           </h1>
//           <p className="mt-1 text-sm text-muted-foreground">
//             {isLogin
//               ? "Enter your credentials to access your account"
//               : "Join thousands of happy homeowners on PropNest"}
//           </p>

//           <div className="mt-6 flex flex-col gap-4">
//             {!isLogin && (
//               <div>
//                 <label className="mb-1.5 block text-sm font-medium text-foreground">
//                   Full Name
//                 </label>
//                 <Input placeholder="John Doe" className="h-11" />
//               </div>
//             )}
//             <div>
//               <label className="mb-1.5 block text-sm font-medium text-foreground">
//                 Email Address
//               </label>
//               <div className="relative">
//                 <Mail className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
//                 <Input
//                   type="email"
//                   placeholder="you@example.com"
//                   className="h-11 pl-9"
//                 />
//               </div>
//             </div>
//             <div>
//               <label className="mb-1.5 block text-sm font-medium text-foreground">
//                 Password
//               </label>
//               <div className="relative">
//                 <Lock className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
//                 <Input
//                   type={showPassword ? "text" : "password"}
//                   placeholder="Enter your password"
//                   className="h-11 pl-9 pr-10"
//                 />
//                 <button
//                   type="button"
//                   onClick={() => setShowPassword(!showPassword)}
//                   className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground"
//                   aria-label={showPassword ? "Hide password" : "Show password"}
//                 >
//                   {showPassword ? (
//                     <EyeOff className="h-4 w-4" />
//                   ) : (
//                     <Eye className="h-4 w-4" />
//                   )}
//                 </button>
//               </div>
//             </div>

//             {isLogin && (
//               <div className="flex items-center justify-end">
//                 <button className="text-sm text-primary hover:underline">
//                   Forgot password?
//                 </button>
//               </div>
//             )}

//             {!isLogin && (
//               <div>
//                 <label className="mb-1.5 block text-sm font-medium text-foreground">
//                   Phone Number
//                 </label>
//                 <Input
//                   type="tel"
//                   placeholder="+91 9876543210"
//                   className="h-11"
//                 />
//               </div>
//             )}

//             <Button className="h-11 gap-2">
//               {isLogin ? "Sign In" : "Create Account"}
//               <ArrowRight className="h-4 w-4" />
//             </Button>

//             <div className="relative my-2">
//               <div className="absolute inset-0 flex items-center">
//                 <div className="w-full border-t border-border" />
//               </div>
//               <div className="relative flex justify-center text-xs">
//                 <span className="bg-background px-2 text-muted-foreground">
//                   or continue with
//                 </span>
//               </div>
//             </div>

//             <div className="grid grid-cols-2 gap-3">
//               <Button variant="outline" className="h-11">
//                 Google
//               </Button>
//               <Button variant="outline" className="h-11">
//                 Phone OTP
//               </Button>
//             </div>
//           </div>

//           <p className="mt-6 text-center text-sm text-muted-foreground">
//             {isLogin ? "Don't have an account?" : "Already have an account?"}{" "}
//             <button
//               onClick={() => setIsLogin(!isLogin)}
//               className="font-medium text-primary hover:underline"
//             >
//               {isLogin ? "Sign Up" : "Sign In"}
//             </button>
//           </p>
//         </div>
//       </div>

//       {/* Right - Visual */}
//       <div className="hidden flex-1 items-center justify-center bg-primary p-12 lg:flex">
//         <div className="max-w-md text-center">
//           <div className="mx-auto mb-6 flex h-16 w-16 items-center justify-center rounded-2xl bg-primary-foreground/10">
//             <Building2 className="h-8 w-8 text-primary-foreground" />
//           </div>
//           <h2 className="text-2xl font-bold text-primary-foreground">
//             Your Dream Home Awaits
//           </h2>
//           <p className="mt-3 text-sm leading-relaxed text-primary-foreground/70">
//             Join over 2 million happy customers who found their perfect property through
//             PropNest. Browse verified listings, connect with sellers, and make informed
//             decisions.
//           </p>
//           <div className="mt-8 flex items-center justify-center gap-6">
//             <div>
//               <p className="text-2xl font-bold text-primary-foreground">50K+</p>
//               <p className="text-xs text-primary-foreground/60">Properties</p>
//             </div>
//             <div className="h-8 w-px bg-primary-foreground/20" />
//             <div>
//               <p className="text-2xl font-bold text-primary-foreground">200+</p>
//               <p className="text-xs text-primary-foreground/60">Cities</p>
//             </div>
//             <div className="h-8 w-px bg-primary-foreground/20" />
//             <div>
//               <p className="text-2xl font-bold text-primary-foreground">2M+</p>
//               <p className="text-xs text-primary-foreground/60">Users</p>
//             </div>
//           </div>
//         </div>
//       </div>
//     </div>
//   )
// }




"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import Link from "next/link"
import { Button } from "@/app/components/ui/button"
import { Input } from "@/app/components/ui/input"
import { useAuth } from "@/app/lib/auth-context"
import { Building2, Eye, EyeOff, Mail, Lock, ArrowRight, User } from "lucide-react"

export default function LoginPage() {
  const router = useRouter()
  const { login, register } = useAuth()

  const [isLogin, setIsLogin] = useState(true)
  const [showPassword, setShowPassword] = useState(false)
  const [showConfirmPassword, setShowConfirmPassword] = useState(false)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState("")

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
    phone: "",
  })

  function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
    setFormData({ ...formData, [e.target.name]: e.target.value })
    setError("")
  }

  async function handleSubmit() {
    setError("")

    // Basic validation
    if (!formData.email || !formData.password) {
      setError("Email and password are required")
      return
    }

    if (!isLogin && !formData.name) {
      setError("Full name is required")
      return
    }

    if (formData.password.length < 6) {
      setError("Password must be at least 6 characters")
      return
    }

    // Confirm password check — register only
    if (!isLogin && formData.password !== formData.confirmPassword) {
      setError("Passwords do not match")
      return
    }

    setLoading(true)

    try {
      if (isLogin) {
        await login(formData.email, formData.password)
      } else {
        await register({
          name: formData.name,
          email: formData.email,
          password: formData.password,
          phone: formData.phone,
        })
      }
      router.push("/dashboard")
    } catch (err: unknown) {
      setError(err instanceof Error ? err.message : "Something went wrong")
    } finally {
      setLoading(false)
    }
  }

  function handleSwitch() {
    setIsLogin(!isLogin)
    setError("")
    setFormData({
      name: "",
      email: "",
      password: "",
      confirmPassword: "",
      phone: "",
    })
  }

  return (
    <div className="flex min-h-screen">
      {/* Left - Form */}
      <div className="flex flex-1 flex-col items-center justify-center px-4 py-10">
        <div className="w-full max-w-md">
          <Link href="/" className="mb-8 flex items-center gap-2">
            <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-primary">
              <Building2 className="h-5 w-5 text-primary-foreground" />
            </div>
            <span className="text-xl font-bold text-foreground">
              Prop<span className="text-primary">Nest</span>
            </span>
          </Link>

          <h1 className="text-2xl font-bold text-foreground">
            {isLogin ? "Welcome back" : "Create your account"}
          </h1>
          <p className="mt-1 text-sm text-muted-foreground">
            {isLogin
              ? "Enter your credentials to access your account"
              : "Join thousands of happy homeowners on PropNest"}
          </p>

          {/* Error Message */}
          {error && (
            <div className="mt-4 rounded-xl border border-destructive/30 bg-destructive/10 px-4 py-3 text-sm text-destructive">
              {error}
            </div>
          )}

          <div className="mt-6 flex flex-col gap-4">

            {/* Full Name - Register only */}
            {!isLogin && (
              <div>
                <label className="mb-1.5 block text-sm font-medium text-foreground">
                  Full Name
                </label>
                <div className="relative">
                  <User className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                  <Input
                    name="name"
                    placeholder="John Doe"
                    className="h-11 pl-9"
                    value={formData.name}
                    onChange={handleChange}
                    disabled={loading}
                  />
                </div>
              </div>
            )}

            {/* Email */}
            <div>
              <label className="mb-1.5 block text-sm font-medium text-foreground">
                Email Address
              </label>
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                <Input
                  name="email"
                  type="email"
                  placeholder="you@example.com"
                  className="h-11 pl-9"
                  value={formData.email}
                  onChange={handleChange}
                  disabled={loading}
                />
              </div>
            </div>

            {/* Password */}
            <div>
              <label className="mb-1.5 block text-sm font-medium text-foreground">
                Password
              </label>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                <Input
                  name="password"
                  type={showPassword ? "text" : "password"}
                  placeholder="Enter your password"
                  className="h-11 pl-9 pr-10"
                  value={formData.password}
                  onChange={handleChange}
                  disabled={loading}
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground"
                  aria-label={showPassword ? "Hide password" : "Show password"}
                >
                  {showPassword ? (
                    <EyeOff className="h-4 w-4" />
                  ) : (
                    <Eye className="h-4 w-4" />
                  )}
                </button>
              </div>
            </div>

            {/* Confirm Password - Register only */}
            {!isLogin && (
              <div>
                <label className="mb-1.5 block text-sm font-medium text-foreground">
                  Confirm Password
                </label>
                <div className="relative">
                  <Lock className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                  <Input
                    name="confirmPassword"
                    type={showConfirmPassword ? "text" : "password"}
                    placeholder="Re-enter your password"
                    className={`h-11 pl-9 pr-10 ${
                      formData.confirmPassword &&
                      formData.password !== formData.confirmPassword
                        ? "border-destructive focus-visible:ring-destructive"
                        : formData.confirmPassword &&
                          formData.password === formData.confirmPassword
                        ? "border-emerald-500 focus-visible:ring-emerald-500"
                        : ""
                    }`}
                    value={formData.confirmPassword}
                    onChange={handleChange}
                    disabled={loading}
                  />
                  <button
                    type="button"
                    onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground"
                    aria-label={showConfirmPassword ? "Hide password" : "Show password"}
                  >
                    {showConfirmPassword ? (
                      <EyeOff className="h-4 w-4" />
                    ) : (
                      <Eye className="h-4 w-4" />
                    )}
                  </button>
                </div>
                {/* Live match feedback */}
                {formData.confirmPassword && (
                  <p
                    className={`mt-1 text-xs ${
                      formData.password === formData.confirmPassword
                        ? "text-emerald-600"
                        : "text-destructive"
                    }`}
                  >
                    {formData.password === formData.confirmPassword
                      ? "✓ Passwords match"
                      : "✗ Passwords do not match"}
                  </p>
                )}
              </div>
            )}

            {/* Forgot Password - Login only */}
            {isLogin && (
              <div className="flex items-center justify-end">
                <button className="text-sm text-primary hover:underline">
                  Forgot password?
                </button>
              </div>
            )}

            {/* Phone - Register only */}
            {!isLogin && (
              <div>
                <label className="mb-1.5 block text-sm font-medium text-foreground">
                  Phone Number
                </label>
                <Input
                  name="phone"
                  type="tel"
                  placeholder="+91 9876543210"
                  className="h-11"
                  value={formData.phone}
                  onChange={handleChange}
                  disabled={loading}
                />
              </div>
            )}

            {/* Submit Button */}
            <Button
              className="h-11 gap-2"
              onClick={handleSubmit}
              disabled={loading}
            >
              {loading
                ? isLogin
                  ? "Signing in..."
                  : "Creating account..."
                : isLogin
                ? "Sign In"
                : "Create Account"}
              {!loading && <ArrowRight className="h-4 w-4" />}
            </Button>

            <div className="relative my-2">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-border" />
              </div>
              <div className="relative flex justify-center text-xs">
                <span className="bg-background px-2 text-muted-foreground">
                  or continue with
                </span>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-3">
              <Button variant="outline" className="h-11" disabled>
                Google
              </Button>
              <Button variant="outline" className="h-11" disabled>
                Phone OTP
              </Button>
            </div>
          </div>

          <p className="mt-6 text-center text-sm text-muted-foreground">
            {isLogin ? "Don't have an account?" : "Already have an account?"}{" "}
            <button
              onClick={handleSwitch}
              className="font-medium text-primary hover:underline"
            >
              {isLogin ? "Sign Up" : "Sign In"}
            </button>
          </p>
        </div>
      </div>

      {/* Right - Visual */}
      <div className="hidden flex-1 items-center justify-center bg-primary p-12 lg:flex">
        <div className="max-w-md text-center">
          <div className="mx-auto mb-6 flex h-16 w-16 items-center justify-center rounded-2xl bg-primary-foreground/10">
            <Building2 className="h-8 w-8 text-primary-foreground" />
          </div>
          <h2 className="text-2xl font-bold text-primary-foreground">
            Your Dream Home Awaits
          </h2>
          <p className="mt-3 text-sm leading-relaxed text-primary-foreground/70">
            Join over 2 million happy customers who found their perfect
            property through PropNest. Browse verified listings, connect
            with sellers, and make informed decisions.
          </p>
          <div className="mt-8 flex items-center justify-center gap-6">
            <div>
              <p className="text-2xl font-bold text-primary-foreground">50K+</p>
              <p className="text-xs text-primary-foreground/60">Properties</p>
            </div>
            <div className="h-8 w-px bg-primary-foreground/20" />
            <div>
              <p className="text-2xl font-bold text-primary-foreground">200+</p>
              <p className="text-xs text-primary-foreground/60">Cities</p>
            </div>
            <div className="h-8 w-px bg-primary-foreground/20" />
            <div>
              <p className="text-2xl font-bold text-primary-foreground">2M+</p>
              <p className="text-xs text-primary-foreground/60">Users</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
