import Link from "next/link"
import { Building2 } from "lucide-react"

export function SiteFooter() {
  return (
    <footer className="border-t border-border bg-foreground text-background pb-20 md:pb-0">
      <div className="mx-auto max-w-7xl px-4 py-12">
        <div className="grid grid-cols-2 gap-8 md:grid-cols-4">
          {/* Brand */}
          <div className="col-span-2 md:col-span-1">
            <Link href="/" className="mb-4 flex items-center gap-2">
              <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-primary">
                <Building2 className="h-5 w-5 text-primary-foreground" />
              </div>
              <span className="text-xl font-bold">
                Prop<span className="text-primary">Nest</span>
              </span>
            </Link>
            <p className="mt-3 text-sm leading-relaxed opacity-70">
              India&apos;s most trusted real estate marketplace. Find your
              perfect home, office, or investment property.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="mb-3 text-sm font-semibold uppercase tracking-wider opacity-50">
              Company
            </h3>
            <ul className="flex flex-col gap-2">
              <li>
                <Link
                  href="/"
                  className="text-sm opacity-70 transition-opacity hover:opacity-100"
                >
                  About Us
                </Link>
              </li>
              <li>
                <Link
                  href="/"
                  className="text-sm opacity-70 transition-opacity hover:opacity-100"
                >
                  Careers
                </Link>
              </li>
              <li>
                <Link
                  href="/"
                  className="text-sm opacity-70 transition-opacity hover:opacity-100"
                >
                  Contact
                </Link>
              </li>
              <li>
                <Link
                  href="/"
                  className="text-sm opacity-70 transition-opacity hover:opacity-100"
                >
                  Blog
                </Link>
              </li>
            </ul>
          </div>

          {/* Properties */}
          <div>
            <h3 className="mb-3 text-sm font-semibold uppercase tracking-wider opacity-50">
              Properties
            </h3>
            <ul className="flex flex-col gap-2">
              <li>
                <Link
                  href="/properties?type=buy"
                  className="text-sm opacity-70 transition-opacity hover:opacity-100"
                >
                  Buy Property
                </Link>
              </li>
              <li>
                <Link
                  href="/properties?type=rent"
                  className="text-sm opacity-70 transition-opacity hover:opacity-100"
                >
                  Rent Property
                </Link>
              </li>
              <li>
                <Link
                  href="/properties?type=commercial"
                  className="text-sm opacity-70 transition-opacity hover:opacity-100"
                >
                  Commercial
                </Link>
              </li>
              <li>
                <Link
                  href="/post-property"
                  className="text-sm opacity-70 transition-opacity hover:opacity-100"
                >
                  Post Property
                </Link>
              </li>
            </ul>
          </div>

          {/* Support */}
          <div>
            <h3 className="mb-3 text-sm font-semibold uppercase tracking-wider opacity-50">
              Support
            </h3>
            <ul className="flex flex-col gap-2">
              <li>
                <Link
                  href="/"
                  className="text-sm opacity-70 transition-opacity hover:opacity-100"
                >
                  Help Center
                </Link>
              </li>
              <li>
                <Link
                  href="/"
                  className="text-sm opacity-70 transition-opacity hover:opacity-100"
                >
                  Privacy Policy
                </Link>
              </li>
              <li>
                <Link
                  href="/"
                  className="text-sm opacity-70 transition-opacity hover:opacity-100"
                >
                  Terms of Service
                </Link>
              </li>
              <li>
                <Link
                  href="/"
                  className="text-sm opacity-70 transition-opacity hover:opacity-100"
                >
                  Sitemap
                </Link>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-10 flex flex-col items-center justify-between gap-4 border-t border-background/10 pt-8 md:flex-row">
          <p className="text-sm opacity-50">
            2026 PropNest. All rights reserved.
          </p>
          <div className="flex items-center gap-4">
            <span className="text-sm opacity-50">
              Made with care in India
            </span>
          </div>
        </div>
      </div>
    </footer>
  )
}
