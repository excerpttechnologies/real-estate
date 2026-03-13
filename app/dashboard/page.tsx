







"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import Link from "next/link"
import { SiteHeader } from "@/app/components/site-header"
import { SiteFooter } from "@/app/components/site-footer"
import { PropertyCard } from "@/app/components/property-card"
import { Button } from "@/app/components/ui/button"
import { useAuth } from "@/app/lib/auth-context"
import {
  Bell,
  Building2,
  Check,
  Eye,
  Heart,
  Home,
  Loader2,
  LogOut,
  MessageSquare,
  Phone,
  Plus,
  Settings,
  TrendingUp,
  User,
  X,
} from "lucide-react"

const tabs = [
  { id: "overview", label: "Overview", icon: Home },
  { id: "listings", label: "My Listings", icon: Building2 },
  { id: "saved", label: "Saved", icon: Heart },
  { id: "inquiries", label: "Inquiries", icon: MessageSquare },
  { id: "settings", label: "Settings", icon: Settings },
]

interface Property {
  _id: string
  title: string
  price: number
  priceLabel: string
  location: string
  city: string
  area: number
  bedrooms: number
  bathrooms: number
  type: string
  status: string
  furnishing: string
  postedBy: string
  verified: boolean
  featured: boolean
  images: string[]
  amenities: string[]
  listingType: string
  description: string
  createdAt: string
}

interface Inquiry {
  _id: string
  propertyId: { _id: string; title: string } | null
  senderId: { _id: string; name: string; email: string } | null
  message: string
  status: "unread" | "read" | "replied"
  createdAt: string
}

interface Activity {
  type: string
  text: string
  time: string
  icon: string
}

interface Stats {
  activeListings: number
  savedCount: number
  inquiriesCount: number
  totalViews: number
}

interface SettingsForm {
  name: string
  phone: string
  city: string
  currentPassword: string
  newPassword: string
  confirmNewPassword: string
}

export default function DashboardPage() {
  const { user, isLoggedIn, isAdmin, logout, loading: authLoading } = useAuth()
  const router = useRouter()

  const [activeTab, setActiveTab] = useState("overview")

  // Data states
  const [stats, setStats] = useState<Stats | null>(null)
  const [activities, setActivities] = useState<Activity[]>([])
  const [listings, setListings] = useState<Property[]>([])
  const [savedProperties, setSavedProperties] = useState<Property[]>([])
  const [inquiries, setInquiries] = useState<Inquiry[]>([])

  // Loading states
  const [statsLoading, setStatsLoading] = useState(false)
  const [listingsLoading, setListingsLoading] = useState(false)
  const [savedLoading, setSavedLoading] = useState(false)
  const [inquiriesLoading, setInquiriesLoading] = useState(false)

  // Settings form
  const [settingsForm, setSettingsForm] = useState<SettingsForm>({
    name: "",
    phone: "",
    city: "",
    currentPassword: "",
    newPassword: "",
    confirmNewPassword: "",
  })
  const [settingsLoading, setSettingsLoading] = useState(false)
  const [settingsSuccess, setSettingsSuccess] = useState("")
  const [settingsError, setSettingsError] = useState("")

  // Redirect if not logged in
  useEffect(() => {
    if (!authLoading && !isLoggedIn) {
      router.push("/login")
    }
  }, [authLoading, isLoggedIn])

  // Prefill settings form with user data
  useEffect(() => {
    if (user) {
      setSettingsForm((prev) => ({
        ...prev,
        name: user.name || "",
        phone: user.phone || "",
        city: user.city || "",
      }))
    }
  }, [user])

  // Fetch data when tab changes
  useEffect(() => {
    if (!isLoggedIn) return
    if (activeTab === "overview") fetchOverview()
    if (activeTab === "listings") fetchListings()
    if (activeTab === "saved") fetchSaved()
    if (activeTab === "inquiries") fetchInquiries()
  }, [activeTab, isLoggedIn])

  async function fetchOverview() {
    setStatsLoading(true)
    try {
      const [statsRes, activityRes] = await Promise.all([
        fetch("/api/dashboard/stats", { credentials: "include" }),
        fetch("/api/dashboard/activity", { credentials: "include" }),
      ])
      const statsData = await statsRes.json()
      const activityData = await activityRes.json()
if (statsRes.ok) setStats(statsData.stats)
      if (activityRes.ok) setActivities(activityData.activities)
    } catch {
      console.error("Failed to fetch overview")
    } finally {
      setStatsLoading(false)
    }
  }

  async function fetchListings() {
    setListingsLoading(true)
    try {
      const res = await fetch("/api/properties", { credentials: "include" })
      const data = await res.json()
      if (res.ok) setListings(data.properties || [])
    } catch {
      console.error("Failed to fetch listings")
    } finally {
      setListingsLoading(false)
    }
  }

  async function fetchSaved() {
    setSavedLoading(true)
    try {
      const res = await fetch("/api/saved", { credentials: "include" })
      const data = await res.json()
      if (res.ok) {
        // saved returns [{propertyId: {...}}] — extract the property
        const props = data.saved
          .map((s: { propertyId: Property }) => s.propertyId)
          .filter(Boolean)
        setSavedProperties(props)
      }
    } catch {
      console.error("Failed to fetch saved")
    } finally {
      setSavedLoading(false)
    }
  }

  async function fetchInquiries() {
    setInquiriesLoading(true)
    try {
      const res = await fetch("/api/inquiries", { credentials: "include" })
      const data = await res.json()
      if (res.ok) setInquiries(data.inquiries || [])
    } catch {
      console.error("Failed to fetch inquiries")
    } finally {
      setInquiriesLoading(false)
    }
  }

  async function handleUnsave(propertyId: string) {
    try {
      await fetch(`/api/saved/${propertyId}`, {
        method: "DELETE",
        credentials: "include",
      })
      setSavedProperties((prev) =>
        prev.filter((p) => p._id !== propertyId)
      )
    } catch {
      console.error("Failed to unsave")
    }
  }

  async function handleInquiryStatus(id: string, status: string) {
    try {
      await fetch(`/api/inquiries/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify({ status }),
      })
      setInquiries((prev) =>
        prev.map((inq) =>
          inq._id === id
            ? { ...inq, status: status as "unread" | "read" | "replied" }
            : inq
        )
      )
    } catch {
      console.error("Failed to update inquiry status")
    }
  }

  async function handleSaveSettings() {
    setSettingsError("")
    setSettingsSuccess("")

    if (
      settingsForm.newPassword &&
      settingsForm.newPassword !== settingsForm.confirmNewPassword
    ) {
      setSettingsError("New passwords do not match")
      return
    }

    setSettingsLoading(true)
    try {
      const body: Record<string, string> = {
        name: settingsForm.name,
        phone: settingsForm.phone,
        city: settingsForm.city,
      }
      if (settingsForm.currentPassword && settingsForm.newPassword) {
        body.currentPassword = settingsForm.currentPassword
        body.newPassword = settingsForm.newPassword
      }

      const res = await fetch("/api/users", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify(body),
      })

      const data = await res.json()
      if (!res.ok) {
        setSettingsError(data.error || "Failed to update profile")
        return
      }

      setSettingsSuccess("Profile updated successfully!")
      setSettingsForm((prev) => ({
        ...prev,
        currentPassword: "",
        newPassword: "",
        confirmNewPassword: "",
      }))
    } catch {
      setSettingsError("Something went wrong")
    } finally {
      setSettingsLoading(false)
    }
  }

  async function handleDeleteAccount() {
    if (
      !confirm(
        "Are you sure you want to delete your account? This cannot be undone."
      )
    )
      return

    try {
      await fetch("/api/users", {
        method: "DELETE",
        credentials: "include",
      })
      await logout()
      router.push("/")
    } catch {
      console.error("Failed to delete account")
    }
  }

  async function handleLogout() {
    await logout()
    router.push("/")
  }

  function getActivityIcon(iconName: string) {
    const map: Record<string, React.ElementType> = {
      Heart,
      MessageSquare,
      Building2,
      Phone,
      Bell,
      Eye,
    }
    return map[iconName] || Bell
  }

  function timeAgo(dateStr: string) {
    const diff = Date.now() - new Date(dateStr).getTime()
    const mins = Math.floor(diff / 60000)
    const hrs = Math.floor(mins / 60)
    const days = Math.floor(hrs / 24)
    if (days > 0) return `${days} day${days > 1 ? "s" : ""} ago`
    if (hrs > 0) return `${hrs} hour${hrs > 1 ? "s" : ""} ago`
    return `${mins} minute${mins > 1 ? "s" : ""} ago`
  }

  // Auth loading
  if (authLoading) {
    return (
      <div className="flex min-h-screen flex-col">
        <SiteHeader />
        <div className="flex flex-1 items-center justify-center">
          <Loader2 className="h-8 w-8 animate-spin text-primary" />
        </div>
      </div>
    )
  }

  if (!isLoggedIn) return null

  return (
    <div className="flex min-h-screen flex-col">
      <SiteHeader />
      <main className="flex-1 bg-background">
        <div className="mx-auto max-w-7xl px-4 py-6">
          <div className="flex gap-6">

            {/* Sidebar */}
            <aside className="hidden w-60 shrink-0 md:block">
              <div className="sticky top-20 rounded-2xl border border-border bg-card p-4">
                {/* Profile */}
                <div className="mb-4 flex items-center gap-3 border-b border-border pb-4">
                  <div className="flex h-11 w-11 items-center justify-center rounded-full bg-primary text-primary-foreground font-bold text-lg">
                    {user?.name?.charAt(0).toUpperCase()}
                  </div>
                  <div>
                    <p className="text-sm font-semibold text-foreground">
                      {user?.name}
                    </p>
                    <p className="text-xs text-muted-foreground">
                      {isAdmin ? "Admin" : "Member"}
                    </p>
                  </div>
                </div>

                {/* Navigation */}
                <nav className="flex flex-col gap-1">
                  {tabs.map((tab) => (
                    <button
                      key={tab.id}
                      onClick={() => setActiveTab(tab.id)}
                      className={`flex items-center gap-2.5 rounded-xl px-3 py-2.5 text-sm font-medium transition-colors ${
                        activeTab === tab.id
                          ? "bg-primary text-primary-foreground"
                          : "text-muted-foreground hover:bg-secondary hover:text-foreground"
                      }`}
                    >
                      <tab.icon className="h-4 w-4" />
                      {tab.label}
                    </button>
                  ))}
                </nav>

                <div className="mt-4 border-t border-border pt-4">
                  <button
                    onClick={handleLogout}
                    className="flex w-full items-center gap-2.5 rounded-xl px-3 py-2.5 text-sm font-medium text-muted-foreground transition-colors hover:bg-secondary hover:text-foreground"
                  >
                    <LogOut className="h-4 w-4" />
                    Sign Out
                  </button>
                </div>
              </div>
            </aside>

            {/* Main Content */}
            <div className="w-full">

              {/* Mobile Tabs */}
              <div className="mb-4 flex gap-1 overflow-x-auto rounded-xl bg-secondary p-1 md:hidden">
                {tabs.map((tab) => (
                  <button
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id)}
                    className={`flex shrink-0 items-center gap-1.5 rounded-lg px-3 py-2 text-xs font-medium transition-colors ${
                      activeTab === tab.id
                        ? "bg-primary text-primary-foreground"
                        : "text-muted-foreground"
                    }`}
                  >
                    <tab.icon className="h-3.5 w-3.5" />
                    {tab.label}
                  </button>
                ))}
              </div>

              {/* ── OVERVIEW ── */}
              {activeTab === "overview" && (
                <div className="flex flex-col gap-6">
                  {/* Welcome Banner */}
                  <div className="rounded-2xl bg-primary p-6 text-primary-foreground">
                    <h1 className="text-xl font-bold">
                      Welcome back, {user?.name?.split(" ")[0]}!
                    </h1>
                    <p className="mt-1 text-sm opacity-80">
                      Here&apos;s a quick overview of your activity on PropNest.
                    </p>
                    {isAdmin && (
                      <Button
                        size="sm"
                        variant="secondary"
                        className="mt-4 gap-1.5"
                        asChild
                      >
                        <Link href="/post-property">
                          <Plus className="h-3.5 w-3.5" />
                          Post New Property
                        </Link>
                      </Button>
                    )}
                  </div>

                  {/* Stats */}
                  {/* {statsLoading ? (
                    <div className="flex justify-center py-8">
                      <Loader2 className="h-6 w-6 animate-spin text-primary" />
                    </div>
                  ) : (
                    <div className="grid grid-cols-2 gap-4 lg:grid-cols-4">
                      {[
                        {
                          label: "Active Listings",
                          value: stats?.activeListings ?? 0,
                          icon: Building2,
                          color: "text-primary",
                        },
                        {
                          label: "Total Views",
                          value: stats?.totalViews ?? 0,
                          icon: Eye,
                          color: "text-accent",
                        },
                        {
                          label: "Inquiries",
                          value: stats?.inquiriesCount ?? 0,
                          icon: Phone,
                          color: "text-emerald-600",
                        },
                        {
                          label: "Saved Properties",
                          value: stats?.savedCount ?? 0,
                          icon: Heart,
                          color: "text-rose-500",
                        },
                      ].map((stat) => (
                        <div
                          key={stat.label}
                          className="rounded-2xl border border-border bg-card p-4"
                        >
                          <div className="flex items-center justify-between">
                            <stat.icon className={`h-5 w-5 ${stat.color}`} />
                            <TrendingUp className="h-3.5 w-3.5 text-emerald-500" />
                          </div>
                          <p className="mt-2 text-2xl font-bold text-foreground">
                            {stat.value}
                          </p>
                          <p className="text-xs text-muted-foreground">
                            {stat.label}
                          </p>
                        </div>
                      ))}
                    </div>
                  )} */}




{/* Stats */}
{statsLoading ? (
  <div className="flex justify-center py-8">
    <Loader2 className="h-6 w-6 animate-spin text-primary" />
  </div>
) : isAdmin && (
  <div className="grid grid-cols-2 gap-4 lg:grid-cols-4">
    {[
      {
        label: "Active Listings",
        value: stats?.activeListings ?? 0,
        icon: Building2,
        color: "text-primary",
      },
      {
        label: "Total Views",
        value: stats?.totalViews ?? 0,
        icon: Eye,
        color: "text-accent",
      },
      {
        label: "Inquiries",
        value: stats?.inquiriesCount ?? 0,
        icon: Phone,
        color: "text-emerald-600",
      },
      {
        label: "Saved Properties",
        value: stats?.savedCount ?? 0,
        icon: Heart,
        color: "text-rose-500",
      },
    ].map((stat) => (
      <div
        key={stat.label}
        className="rounded-2xl border border-border bg-card p-4"
      >
        <div className="flex items-center justify-between">
          <stat.icon className={`h-5 w-5 ${stat.color}`} />
          <TrendingUp className="h-3.5 w-3.5 text-emerald-500" />
        </div>
        <p className="mt-2 text-2xl font-bold text-foreground">
          {stat.value}
        </p>
        <p className="text-xs text-muted-foreground">
          {stat.label}
        </p>
      </div>
    ))}
  </div>
)}

                  {/* Recent Activity */}
                  <div className="rounded-2xl border border-border bg-card p-5">
                    <h2 className="text-base font-bold text-foreground">
                      Recent Activity
                    </h2>
                    {activities.length === 0 ? (
                      <p className="mt-4 text-sm text-muted-foreground">
                        No recent activity yet.
                      </p>
                    ) : (
                      <div className="mt-4 flex flex-col gap-3">
                        {activities.map((activity, i) => {
                          const Icon = getActivityIcon(activity.icon)
                          return (
                            <div
                              key={i}
                              className="flex items-start gap-3 rounded-xl p-3 transition-colors hover:bg-secondary"
                            >
                              <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-secondary">
                                <Icon className="h-4 w-4 text-muted-foreground" />
                              </div>
                              <div className="flex-1">
                                <p className="text-sm text-foreground">
                                  {activity.text}
                                </p>
                                <p className="mt-0.5 text-xs text-muted-foreground">
                                  {timeAgo(activity.time)}
                                </p>
                              </div>
                            </div>
                          )
                        })}
                      </div>
                    )}
                  </div>
                </div>
              )}

              {/* ── MY LISTINGS ── */}
              {activeTab === "listings" && (
                <div className="flex flex-col gap-4">
                  <div className="flex items-center justify-between">
                    <h2 className="text-lg font-bold text-foreground">
                      My Listings
                    </h2>
                    {isAdmin && (
                      <Button size="sm" className="gap-1.5" asChild>
                        <Link href="/post-property">
                          <Plus className="h-3.5 w-3.5" />
                          Add New
                        </Link>
                      </Button>
                    )}
                  </div>
                  {listingsLoading ? (
                    <div className="flex justify-center py-8">
                      <Loader2 className="h-6 w-6 animate-spin text-primary" />
                    </div>
                  ) : listings.length === 0 ? (
                    <div className="flex flex-col items-center justify-center rounded-2xl border border-border bg-card py-16">
                      <Building2 className="h-10 w-10 text-muted-foreground" />
                      <p className="mt-3 text-sm font-medium text-foreground">
                        No listings yet
                      </p>
                      {isAdmin && (
                        <Button size="sm" className="mt-4 gap-1.5" asChild>
                          <Link href="/post-property">
                            <Plus className="h-3.5 w-3.5" />
                            Post Your First Property
                          </Link>
                        </Button>
                      )}
                    </div>
                  ) : (
                    <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
                      {listings.map((p) => (
                        <PropertyCard
                          key={p._id}
                          property={{ ...p, id: p._id }}
                        />
                      ))}
                    </div>
                  )}
                </div>
              )}

              {/* ── SAVED ── */}
              {activeTab === "saved" && (
                <div className="flex flex-col gap-4">
                  <h2 className="text-lg font-bold text-foreground">
                    Saved Properties
                  </h2>
                  {savedLoading ? (
                    <div className="flex justify-center py-8">
                      <Loader2 className="h-6 w-6 animate-spin text-primary" />
                    </div>
                  ) : savedProperties.length === 0 ? (
                    <div className="flex flex-col items-center justify-center rounded-2xl border border-border bg-card py-16">
                      <Heart className="h-10 w-10 text-muted-foreground" />
                      <p className="mt-3 text-sm font-medium text-foreground">
                        No saved properties yet
                      </p>
                      <Button
                        size="sm"
                        variant="outline"
                        className="mt-4"
                        asChild
                      >
                        <Link href="/properties">Browse Properties</Link>
                      </Button>
                    </div>
                  ) : (
                    <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
                      {savedProperties.map((p) => (
                        <div key={p._id} className="relative">
                          <PropertyCard
                            property={{ ...p, id: p._id }}
                          />
                          {/* Remove saved button */}
                          <button
                            onClick={() => handleUnsave(p._id)}
                            className="absolute right-3 top-3 flex h-7 w-7 items-center justify-center rounded-full bg-card shadow-md hover:bg-destructive hover:text-white transition-colors"
                            title="Remove from saved"
                          >
                            <X className="h-3.5 w-3.5" />
                          </button>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              )}

              {/* ── INQUIRIES ── */}
              {activeTab === "inquiries" && (
                <div className="flex flex-col gap-4">
                  <h2 className="text-lg font-bold text-foreground">
                    Inquiries
                  </h2>
                  {inquiriesLoading ? (
                    <div className="flex justify-center py-8">
                      <Loader2 className="h-6 w-6 animate-spin text-primary" />
                    </div>
                  ) : inquiries.length === 0 ? (
                    <div className="flex flex-col items-center justify-center rounded-2xl border border-border bg-card py-16">
                      <MessageSquare className="h-10 w-10 text-muted-foreground" />
                      <p className="mt-3 text-sm font-medium text-foreground">
                        No inquiries yet
                      </p>
                    </div>
                  ) : (
                    inquiries.map((inquiry) => (
                      <div
                        key={inquiry._id}
                        className={`rounded-2xl border bg-card p-4 ${
                          inquiry.status === "unread"
                            ? "border-primary/30"
                            : "border-border"
                        }`}
                      >
                        <div className="flex items-start justify-between">
                          <div className="flex items-center gap-3">
                            <div className="flex h-10 w-10 items-center justify-center rounded-full bg-secondary">
                              <User className="h-4 w-4 text-secondary-foreground" />
                            </div>
                            <div>
                              <p className="text-sm font-semibold text-foreground">
                                {inquiry.senderId?.name || "Unknown User"}
                              </p>
                              <p className="text-xs text-muted-foreground">
                                Re: {inquiry.propertyId?.title || "Unknown Property"}
                              </p>
                            </div>
                          </div>
                          <div className="flex items-center gap-2">
                            <span
                              className={`rounded-full px-2 py-0.5 text-xs font-medium ${
                                inquiry.status === "unread"
                                  ? "bg-primary/10 text-primary"
                                  : inquiry.status === "replied"
                                  ? "bg-emerald-100 text-emerald-700"
                                  : "bg-secondary text-muted-foreground"
                              }`}
                            >
                              {inquiry.status}
                            </span>
                            <span className="text-xs text-muted-foreground">
                              {timeAgo(inquiry.createdAt)}
                            </span>
                          </div>
                        </div>
                        <p className="mt-3 text-sm text-muted-foreground">
                          {inquiry.message}
                        </p>
                        {isAdmin && (
                          <div className="mt-3 flex gap-2">
                            {inquiry.status === "unread" && (
                              <Button
                                size="sm"
                                variant="outline"
                                className="gap-1.5"
                                onClick={() =>
                                  handleInquiryStatus(inquiry._id, "read")
                                }
                              >
                                <Check className="h-3.5 w-3.5" />
                                Mark Read
                              </Button>
                            )}
                            {inquiry.status !== "replied" && (
                              <Button
                                size="sm"
                                className="gap-1.5"
                                onClick={() =>
                                  handleInquiryStatus(inquiry._id, "replied")
                                }
                              >
                                <MessageSquare className="h-3.5 w-3.5" />
                                Mark Replied
                              </Button>
                            )}
                          </div>
                        )}
                      </div>
                    ))
                  )}
                </div>
              )}

              {/* ── SETTINGS ── */}
              {activeTab === "settings" && (
                <div className="flex flex-col gap-5">
                  <h2 className="text-lg font-bold text-foreground">
                    Account Settings
                  </h2>

                  {/* Profile Info */}
                  <div className="rounded-2xl border border-border bg-card p-5">
                    <h3 className="text-base font-semibold text-foreground">
                      Profile Information
                    </h3>

                    {settingsSuccess && (
                      <div className="mt-3 rounded-xl bg-emerald-50 border border-emerald-200 px-4 py-3 text-sm text-emerald-700">
                        {settingsSuccess}
                      </div>
                    )}
                    {settingsError && (
                      <div className="mt-3 rounded-xl bg-destructive/10 border border-destructive/30 px-4 py-3 text-sm text-destructive">
                        {settingsError}
                      </div>
                    )}

                    <div className="mt-4 grid gap-4 sm:grid-cols-2">
                      <div>
                        <label className="mb-1.5 block text-sm font-medium text-foreground">
                          Full Name
                        </label>
                        <input
                          type="text"
                          value={settingsForm.name}
                          onChange={(e) =>
                            setSettingsForm({
                              ...settingsForm,
                              name: e.target.value,
                            })
                          }
                          className="flex h-10 w-full rounded-xl border border-input bg-background px-3 py-2 text-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
                        />
                      </div>
                      <div>
                        <label className="mb-1.5 block text-sm font-medium text-foreground">
                          Email
                        </label>
                        <input
                          type="email"
                          value={user?.email || ""}
                          disabled
                          className="flex h-10 w-full rounded-xl border border-input bg-secondary px-3 py-2 text-sm text-muted-foreground cursor-not-allowed"
                        />
                      </div>
                      <div>
                        <label className="mb-1.5 block text-sm font-medium text-foreground">
                          Phone
                        </label>
                        <input
                          type="tel"
                          value={settingsForm.phone}
                          onChange={(e) =>
                            setSettingsForm({
                              ...settingsForm,
                              phone: e.target.value,
                            })
                          }
                          className="flex h-10 w-full rounded-xl border border-input bg-background px-3 py-2 text-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
                        />
                      </div>
                      <div>
                        <label className="mb-1.5 block text-sm font-medium text-foreground">
                          City
                        </label>
                        <input
                          type="text"
                          value={settingsForm.city}
                          onChange={(e) =>
                            setSettingsForm({
                              ...settingsForm,
                              city: e.target.value,
                            })
                          }
                          className="flex h-10 w-full rounded-xl border border-input bg-background px-3 py-2 text-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
                        />
                      </div>
                    </div>

                    {/* Password Change */}
                    <div className="mt-5 border-t border-border pt-5">
                      <h4 className="text-sm font-semibold text-foreground">
                        Change Password
                      </h4>
                      <div className="mt-3 grid gap-4 sm:grid-cols-3">
                        <div>
                          <label className="mb-1.5 block text-sm font-medium text-foreground">
                            Current Password
                          </label>
                          <input
                            type="password"
                            value={settingsForm.currentPassword}
                            onChange={(e) =>
                              setSettingsForm({
                                ...settingsForm,
                                currentPassword: e.target.value,
                              })
                            }
                            placeholder="••••••"
                            className="flex h-10 w-full rounded-xl border border-input bg-background px-3 py-2 text-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
                          />
                        </div>
                        <div>
                          <label className="mb-1.5 block text-sm font-medium text-foreground">
                            New Password
                          </label>
                          <input
                            type="password"
                            value={settingsForm.newPassword}
                            onChange={(e) =>
                              setSettingsForm({
                                ...settingsForm,
                                newPassword: e.target.value,
                              })
                            }
                            placeholder="••••••"
                            className="flex h-10 w-full rounded-xl border border-input bg-background px-3 py-2 text-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
                          />
                        </div>
                        <div>
                          <label className="mb-1.5 block text-sm font-medium text-foreground">
                            Confirm New Password
                          </label>
                          <input
                            type="password"
                            value={settingsForm.confirmNewPassword}
                            onChange={(e) =>
                              setSettingsForm({
                                ...settingsForm,
                                confirmNewPassword: e.target.value,
                              })
                            }
                            placeholder="••••••"
                            className="flex h-10 w-full rounded-xl border border-input bg-background px-3 py-2 text-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
                          />
                        </div>
                      </div>
                    </div>

                    <Button
                      className="mt-5"
                      onClick={handleSaveSettings}
                      disabled={settingsLoading}
                    >
                      {settingsLoading ? (
                        <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                      ) : null}
                      Save Changes
                    </Button>
                  </div>

                  {/* Danger Zone */}
                  {/* <div className="rounded-2xl border border-destructive/30 bg-card p-5">
                    <h3 className="text-base font-semibold text-foreground">
                      Danger Zone
                    </h3>
                    <p className="mt-1 text-sm text-muted-foreground">
                      Permanently delete your account and all associated data.
                    </p>
                    <Button
                      variant="destructive"
                      size="sm"
                      className="mt-3"
                      onClick={handleDeleteAccount}
                    >
                      Delete Account
                    </Button>
                  </div> */}
                </div>
              )}
            </div>
          </div>
        </div>
      </main>
      <SiteFooter />
    </div>
  )
}
