import type { Metadata, Viewport } from "next"
import { Inter, DM_Sans } from "next/font/google"
import { Analytics } from "@vercel/analytics/next"
import "./globals.css"

const inter = Inter({ subsets: ["latin"], variable: "--font-inter" })
const dmSans = DM_Sans({ subsets: ["latin"], variable: "--font-dm-sans" })

export const metadata: Metadata = {
  title: "PropNest - Find Your Dream Property | Buy, Rent & Sell Real Estate",
  description:
    "India's most trusted real estate marketplace. Search from thousands of verified properties for sale, rent, and commercial spaces across major cities.",
  keywords: [
    "real estate",
    "property",
    "buy home",
    "rent apartment",
    "commercial space",
    "India property",
  ],
}

export const viewport: Viewport = {
  themeColor: "#2563eb",
  width: "device-width",
  initialScale: 1,
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <body
        className={`${inter.variable} ${dmSans.variable} font-sans antialiased`}
      >
        {children}
        <Analytics />
      </body>
    </html>
  )
}
