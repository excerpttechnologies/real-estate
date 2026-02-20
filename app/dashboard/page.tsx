"use client"

import { useState } from "react"
import Link from "next/link"
import { SiteHeader } from "@/components/site-header"
import { SiteFooter } from "@/components/site-footer"
import { PropertyCard } from "@/components/property-card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { properties } from "@/lib/data"
import {
  Bell,
  Building2,
  Eye,
  Heart,
  Home,
  LogOut,
  MessageSquare,
  Phone,
  Plus,
  Settings,
  TrendingUp,
  User,
} from "lucide-react"

const tabs = [
  { id: "overview", label: "Overview", icon: Home },
  { id: "listings", label: "My Listings", icon: Building2 },
  { id: "saved", label: "Saved", icon: Heart },
  { id: "inquiries", label: "Inquiries", icon: MessageSquare },
  { id: "settings", label: "Settings", icon: Settings },
]

export default function DashboardPage() {
  const [activeTab, setActiveTab] = useState("overview")

  const myListings = properties.slice(0, 3)
  const savedProperties = properties.slice(3, 7)

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
                  <div className="flex h-11 w-11 items-center justify-center rounded-full bg-primary text-primary-foreground">
                    <User className="h-5 w-5" />
                  </div>
                  <div>
                    <p className="text-sm font-semibold text-foreground">Rahul Sharma</p>
                    <p className="text-xs text-muted-foreground">Premium Member</p>
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
                  <button className="flex w-full items-center gap-2.5 rounded-xl px-3 py-2.5 text-sm font-medium text-muted-foreground transition-colors hover:bg-secondary hover:text-foreground">
                    <LogOut className="h-4 w-4" />
                    Sign Out
                  </button>
                </div>
              </div>
            </aside>

            {/* Mobile Tabs */}
            <div className="w-full">
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

              {/* Overview */}
              {activeTab === "overview" && (
                <div className="flex flex-col gap-6">
                  {/* Welcome */}
                  <div className="rounded-2xl bg-primary p-6 text-primary-foreground">
                    <h1 className="text-xl font-bold">
                      Welcome back, Rahul!
                    </h1>
                    <p className="mt-1 text-sm opacity-80">
                      Here&apos;s a quick overview of your activity on PropNest.
                    </p>
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
                  </div>

                  {/* Stats */}
                  <div className="grid grid-cols-2 gap-4 lg:grid-cols-4">
                    {[
                      {
                        label: "Active Listings",
                        value: "3",
                        icon: Building2,
                        color: "text-primary",
                      },
                      {
                        label: "Total Views",
                        value: "1,247",
                        icon: Eye,
                        color: "text-accent",
                      },
                      {
                        label: "Inquiries",
                        value: "28",
                        icon: Phone,
                        color: "text-emerald-600",
                      },
                      {
                        label: "Saved Properties",
                        value: "4",
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
                        <p className="mt-2 text-2xl font-bold text-foreground">{stat.value}</p>
                        <p className="text-xs text-muted-foreground">{stat.label}</p>
                      </div>
                    ))}
                  </div>

                  {/* Recent Activity */}
                  <div className="rounded-2xl border border-border bg-card p-5">
                    <h2 className="text-base font-bold text-foreground">Recent Activity</h2>
                    <div className="mt-4 flex flex-col gap-3">
                      {[
                        {
                          icon: Eye,
                          text: "Your listing \"Luxury 3BHK in Andheri West\" received 15 new views",
                          time: "2 hours ago",
                        },
                        {
                          icon: Phone,
                          text: "New inquiry for \"Premium Villa in Whitefield\"",
                          time: "5 hours ago",
                        },
                        {
                          icon: Heart,
                          text: "You saved \"Elegant 3BHK in Jubilee Hills\"",
                          time: "1 day ago",
                        },
                        {
                          icon: Bell,
                          text: "Price drop alert: \"New Launch 2BHK in Hinjawadi\" now at 60L",
                          time: "2 days ago",
                        },
                      ].map((activity, i) => (
                        <div
                          key={i}
                          className="flex items-start gap-3 rounded-xl p-3 transition-colors hover:bg-secondary"
                        >
                          <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-secondary">
                            <activity.icon className="h-4 w-4 text-muted-foreground" />
                          </div>
                          <div className="flex-1">
                            <p className="text-sm text-foreground">{activity.text}</p>
                            <p className="mt-0.5 text-xs text-muted-foreground">
                              {activity.time}
                            </p>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              )}

              {/* My Listings */}
              {activeTab === "listings" && (
                <div className="flex flex-col gap-4">
                  <div className="flex items-center justify-between">
                    <h2 className="text-lg font-bold text-foreground">My Listings</h2>
                    <Button size="sm" className="gap-1.5" asChild>
                      <Link href="/post-property">
                        <Plus className="h-3.5 w-3.5" />
                        Add New
                      </Link>
                    </Button>
                  </div>
                  <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
                    {myListings.map((p) => (
                      <PropertyCard key={p.id} property={p} />
                    ))}
                  </div>
                </div>
              )}

              {/* Saved */}
              {activeTab === "saved" && (
                <div className="flex flex-col gap-4">
                  <h2 className="text-lg font-bold text-foreground">Saved Properties</h2>
                  <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
                    {savedProperties.map((p) => (
                      <PropertyCard key={p.id} property={p} />
                    ))}
                  </div>
                </div>
              )}

              {/* Inquiries */}
              {activeTab === "inquiries" && (
                <div className="flex flex-col gap-4">
                  <h2 className="text-lg font-bold text-foreground">Inquiries</h2>
                  {[
                    {
                      name: "Priya M.",
                      property: "Luxury 3BHK Apartment in Andheri West",
                      message: "Hi, I'm interested in this property. Is it still available?",
                      time: "2 hours ago",
                    },
                    {
                      name: "Vikram S.",
                      property: "Premium Villa with Private Pool in Whitefield",
                      message: "Can I schedule a visit this weekend?",
                      time: "5 hours ago",
                    },
                    {
                      name: "Neha K.",
                      property: "Modern Office Space in Cyber City",
                      message: "What is the lock-in period for the lease?",
                      time: "1 day ago",
                    },
                  ].map((inquiry, i) => (
                    <div
                      key={i}
                      className="rounded-2xl border border-border bg-card p-4"
                    >
                      <div className="flex items-start justify-between">
                        <div className="flex items-center gap-3">
                          <div className="flex h-10 w-10 items-center justify-center rounded-full bg-secondary">
                            <User className="h-4 w-4 text-secondary-foreground" />
                          </div>
                          <div>
                            <p className="text-sm font-semibold text-foreground">
                              {inquiry.name}
                            </p>
                            <p className="text-xs text-muted-foreground">
                              Re: {inquiry.property}
                            </p>
                          </div>
                        </div>
                        <span className="text-xs text-muted-foreground">
                          {inquiry.time}
                        </span>
                      </div>
                      <p className="mt-3 text-sm text-muted-foreground">
                        {inquiry.message}
                      </p>
                      <div className="mt-3 flex gap-2">
                        <Button size="sm" className="gap-1.5">
                          <Phone className="h-3.5 w-3.5" />
                          Call Back
                        </Button>
                        <Button size="sm" variant="outline">
                          Reply
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              )}

              {/* Settings */}
              {activeTab === "settings" && (
                <div className="flex flex-col gap-5">
                  <h2 className="text-lg font-bold text-foreground">Account Settings</h2>
                  <div className="rounded-2xl border border-border bg-card p-5">
                    <h3 className="text-base font-semibold text-foreground">
                      Profile Information
                    </h3>
                    <div className="mt-4 grid gap-4 sm:grid-cols-2">
                      <div>
                        <label className="mb-1.5 block text-sm font-medium text-foreground">
                          Full Name
                        </label>
                        <input
                          type="text"
                          defaultValue="Rahul Sharma"
                          className="flex h-10 w-full rounded-xl border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
                        />
                      </div>
                      <div>
                        <label className="mb-1.5 block text-sm font-medium text-foreground">
                          Email
                        </label>
                        <input
                          type="email"
                          defaultValue="rahul@example.com"
                          className="flex h-10 w-full rounded-xl border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
                        />
                      </div>
                      <div>
                        <label className="mb-1.5 block text-sm font-medium text-foreground">
                          Phone
                        </label>
                        <input
                          type="tel"
                          defaultValue="+91 9876543210"
                          className="flex h-10 w-full rounded-xl border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
                        />
                      </div>
                      <div>
                        <label className="mb-1.5 block text-sm font-medium text-foreground">
                          City
                        </label>
                        <input
                          type="text"
                          defaultValue="Mumbai"
                          className="flex h-10 w-full rounded-xl border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
                        />
                      </div>
                    </div>
                    <Button className="mt-4">Save Changes</Button>
                  </div>

                  <div className="rounded-2xl border border-border bg-card p-5">
                    <h3 className="text-base font-semibold text-foreground">
                      Notification Preferences
                    </h3>
                    <div className="mt-3 flex flex-col gap-3">
                      {[
                        "Email notifications for new inquiries",
                        "SMS alerts for property views",
                        "Weekly market insights report",
                        "Price drop alerts for saved properties",
                      ].map((pref) => (
                        <label
                          key={pref}
                          className="flex cursor-pointer items-center justify-between rounded-xl p-3 transition-colors hover:bg-secondary"
                        >
                          <span className="text-sm text-foreground">{pref}</span>
                          <div className="relative h-5 w-9 rounded-full bg-primary">
                            <div className="absolute right-0.5 top-0.5 h-4 w-4 rounded-full bg-primary-foreground shadow-sm" />
                          </div>
                        </label>
                      ))}
                    </div>
                  </div>

                  <div className="rounded-2xl border border-destructive/30 bg-card p-5">
                    <h3 className="text-base font-semibold text-foreground">Danger Zone</h3>
                    <p className="mt-1 text-sm text-muted-foreground">
                      Permanently delete your account and all associated data.
                    </p>
                    <Button variant="destructive" size="sm" className="mt-3">
                      Delete Account
                    </Button>
                  </div>
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
