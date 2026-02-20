"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { Search, MapPin, TrendingUp, ShieldCheck, Users } from "lucide-react"

export function HeroSection() {
  const router = useRouter()
  const [activeTab, setActiveTab] = useState<"buy" | "rent" | "commercial">("buy")
  const [location, setLocation] = useState("")

  const handleSearch = () => {
    const params = new URLSearchParams()
    params.set("type", activeTab)
    if (location) params.set("location", location)
    router.push(`/properties?${params.toString()}`)
  }

  return (
    <section className="relative overflow-hidden">
      {/* Background Image */}
      <div className="absolute inset-0">
        <Image
          src="/images/hero-bg.jpg"
          alt="Modern buildings"
          fill
          className="object-cover"
          priority
        />
        <div className="absolute inset-0 bg-gradient-to-r from-foreground/90 via-foreground/75 to-foreground/50" />
      </div>

      <div className="relative mx-auto max-w-7xl px-4 py-20 md:py-32">
        <div className="max-w-2xl">
          {/* Trust badges */}
          <div className="mb-6 flex flex-wrap items-center gap-3">
            <span className="inline-flex items-center gap-1.5 rounded-full bg-background/10 px-3 py-1 text-xs font-medium text-background backdrop-blur-sm">
              <ShieldCheck className="h-3.5 w-3.5" />
              100% Verified Listings
            </span>
            <span className="inline-flex items-center gap-1.5 rounded-full bg-background/10 px-3 py-1 text-xs font-medium text-background backdrop-blur-sm">
              <Users className="h-3.5 w-3.5" />
              2M+ Happy Customers
            </span>
          </div>

          <h1 className="text-balance text-3xl font-bold leading-tight tracking-tight text-background md:text-5xl lg:text-6xl">
            Find Your Perfect{" "}
            <span className="text-accent">Home</span> Today
          </h1>
          <p className="mt-4 max-w-lg text-pretty text-base leading-relaxed text-background/80 md:text-lg">
            Discover thousands of verified properties across India&apos;s top
            cities. Buy, rent, or invest with confidence.
          </p>

          {/* Stats */}
          <div className="mt-6 flex items-center gap-6 md:gap-8">
            <div>
              <p className="text-2xl font-bold text-background md:text-3xl">50K+</p>
              <p className="text-xs text-background/60">Properties Listed</p>
            </div>
            <div className="h-8 w-px bg-background/20" />
            <div>
              <p className="text-2xl font-bold text-background md:text-3xl">200+</p>
              <p className="text-xs text-background/60">Cities Covered</p>
            </div>
            <div className="h-8 w-px bg-background/20" />
            <div>
              <p className="text-2xl font-bold text-background md:text-3xl">1K+</p>
              <p className="text-xs text-background/60">Trusted Builders</p>
            </div>
          </div>
        </div>

        {/* Search Card */}
        <div className="mt-10 max-w-3xl">
          <div className="rounded-2xl bg-card/95 p-4 shadow-2xl backdrop-blur-sm md:p-6">
            {/* Tabs */}
            <div className="mb-4 flex gap-1 rounded-xl bg-secondary p-1">
              {(["buy", "rent", "commercial"] as const).map((tab) => (
                <button
                  key={tab}
                  onClick={() => setActiveTab(tab)}
                  className={`flex-1 rounded-lg px-4 py-2.5 text-sm font-medium capitalize transition-all ${
                    activeTab === tab
                      ? "bg-primary text-primary-foreground shadow-sm"
                      : "text-muted-foreground hover:text-foreground"
                  }`}
                >
                  {tab}
                </button>
              ))}
            </div>

            {/* Search Fields */}
            <div className="flex flex-col gap-3 md:flex-row">
              <div className="relative flex-1">
                <MapPin className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                <Input
                  placeholder="Enter city, locality, or project"
                  className="h-11 pl-9"
                  value={location}
                  onChange={(e) => setLocation(e.target.value)}
                  onKeyDown={(e) => e.key === "Enter" && handleSearch()}
                />
              </div>
              <Select>
                <SelectTrigger className="h-11 w-full md:w-44">
                  <SelectValue placeholder="Property Type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="apartment">Apartment</SelectItem>
                  <SelectItem value="villa">Villa</SelectItem>
                  <SelectItem value="plot">Plot</SelectItem>
                  <SelectItem value="commercial">Commercial</SelectItem>
                  <SelectItem value="penthouse">Penthouse</SelectItem>
                </SelectContent>
              </Select>
              <Select>
                <SelectTrigger className="h-11 w-full md:w-44">
                  <SelectValue placeholder="Budget" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="0-25l">Under 25 Lakh</SelectItem>
                  <SelectItem value="25l-50l">25 - 50 Lakh</SelectItem>
                  <SelectItem value="50l-1cr">50 Lakh - 1 Cr</SelectItem>
                  <SelectItem value="1cr-3cr">1 - 3 Cr</SelectItem>
                  <SelectItem value="3cr+">3 Cr+</SelectItem>
                </SelectContent>
              </Select>
              <Button onClick={handleSearch} className="h-11 gap-2 px-6">
                <Search className="h-4 w-4" />
                Search
              </Button>
            </div>

            {/* Quick links */}
            <div className="mt-3 flex flex-wrap items-center gap-2 text-xs">
              <span className="text-muted-foreground">Popular:</span>
              {["Mumbai", "Bangalore", "Delhi NCR", "Hyderabad", "Pune"].map(
                (city) => (
                  <button
                    key={city}
                    onClick={() => {
                      setLocation(city)
                    }}
                    className="rounded-full bg-secondary px-2.5 py-1 text-secondary-foreground transition-colors hover:bg-primary hover:text-primary-foreground"
                  >
                    {city}
                  </button>
                )
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
