"use client"

import { useState } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import {
  Building2,
  Heart,
  Menu,
  Phone,
  Plus,
  Search,
  User,
  X,
} from "lucide-react"

export function SiteHeader() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

  return (
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
          <Link
            href="/"
            className="rounded-lg px-3 py-2 text-sm font-medium text-foreground transition-colors hover:bg-secondary"
          >
            Home
          </Link>
          <Link
            href="/properties?type=buy"
            className="rounded-lg px-3 py-2 text-sm font-medium text-muted-foreground transition-colors hover:bg-secondary hover:text-foreground"
          >
            Buy
          </Link>
          <Link
            href="/properties?type=rent"
            className="rounded-lg px-3 py-2 text-sm font-medium text-muted-foreground transition-colors hover:bg-secondary hover:text-foreground"
          >
            Rent
          </Link>
          <Link
            href="/properties?type=commercial"
            className="rounded-lg px-3 py-2 text-sm font-medium text-muted-foreground transition-colors hover:bg-secondary hover:text-foreground"
          >
            Commercial
          </Link>
          <Link
            href="/properties"
            className="rounded-lg px-3 py-2 text-sm font-medium text-muted-foreground transition-colors hover:bg-secondary hover:text-foreground"
          >
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
          <Button variant="ghost" size="icon" asChild>
            <Link href="/dashboard">
              <Heart className="h-4 w-4" />
              <span className="sr-only">Saved Properties</span>
            </Link>
          </Button>
          <Button variant="outline" size="sm" className="gap-1.5" asChild>
            <Link href="/post-property">
              <Plus className="h-3.5 w-3.5" />
              Post Property
            </Link>
          </Button>
          <Button size="sm" className="gap-1.5" asChild>
            <Link href="/login">
              <User className="h-3.5 w-3.5" />
              Login
            </Link>
          </Button>
        </div>

        {/* Mobile Menu Button */}
        <button
          className="flex items-center justify-center rounded-lg p-2 md:hidden"
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          aria-label="Toggle menu"
        >
          {mobileMenuOpen ? (
            <X className="h-5 w-5" />
          ) : (
            <Menu className="h-5 w-5" />
          )}
        </button>
      </div>

      {/* Mobile Menu */}
      {mobileMenuOpen && (
        <div className="border-t border-border bg-card md:hidden">
          <nav className="flex flex-col px-4 py-3">
            <Link
              href="/"
              className="rounded-lg px-3 py-2.5 text-sm font-medium text-foreground"
              onClick={() => setMobileMenuOpen(false)}
            >
              Home
            </Link>
            <Link
              href="/properties?type=buy"
              className="rounded-lg px-3 py-2.5 text-sm font-medium text-muted-foreground"
              onClick={() => setMobileMenuOpen(false)}
            >
              Buy
            </Link>
            <Link
              href="/properties?type=rent"
              className="rounded-lg px-3 py-2.5 text-sm font-medium text-muted-foreground"
              onClick={() => setMobileMenuOpen(false)}
            >
              Rent
            </Link>
            <Link
              href="/properties?type=commercial"
              className="rounded-lg px-3 py-2.5 text-sm font-medium text-muted-foreground"
              onClick={() => setMobileMenuOpen(false)}
            >
              Commercial
            </Link>
            <div className="mt-3 flex flex-col gap-2 border-t border-border pt-3">
              <Button variant="outline" className="w-full gap-1.5" asChild>
                <Link href="/post-property">
                  <Plus className="h-3.5 w-3.5" />
                  Post Property Free
                </Link>
              </Button>
              <Button className="w-full gap-1.5" asChild>
                <Link href="/login">
                  <User className="h-3.5 w-3.5" />
                  Login / Register
                </Link>
              </Button>
            </div>
          </nav>
        </div>
      )}

      {/* Mobile Bottom Bar */}
      <div className="fixed bottom-0 left-0 right-0 z-50 flex items-center justify-around border-t border-border bg-card py-2 md:hidden">
        <Link
          href="/"
          className="flex flex-col items-center gap-0.5 text-primary"
        >
          <Building2 className="h-5 w-5" />
          <span className="text-[10px] font-medium">Home</span>
        </Link>
        <Link
          href="/properties"
          className="flex flex-col items-center gap-0.5 text-muted-foreground"
        >
          <Search className="h-5 w-5" />
          <span className="text-[10px] font-medium">Search</span>
        </Link>
        <Link
          href="/post-property"
          className="flex flex-col items-center gap-0.5"
        >
          <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary text-primary-foreground shadow-lg">
            <Plus className="h-5 w-5" />
          </div>
        </Link>
        <Link
          href="/dashboard"
          className="flex flex-col items-center gap-0.5 text-muted-foreground"
        >
          <Heart className="h-5 w-5" />
          <span className="text-[10px] font-medium">Saved</span>
        </Link>
        <Link
          href="/login"
          className="flex flex-col items-center gap-0.5 text-muted-foreground"
        >
          <User className="h-5 w-5" />
          <span className="text-[10px] font-medium">Account</span>
        </Link>
      </div>
    </header>
  )
}
