import Link from "next/link"
import {
  Building,
  Building2,
  Home,
  Hotel,
  Landmark,
  Store,
} from "lucide-react"

const categories = [
  {
    name: "Apartments",
    icon: Building,
    count: "15,200+",
    href: "/properties?propertyType=Apartment",
  },
  {
    name: "Villas",
    icon: Home,
    count: "4,800+",
    href: "/properties?propertyType=Villa",
  },
  {
    name: "Plots",
    icon: Landmark,
    count: "8,350+",
    href: "/properties?propertyType=Plot",
  },
  {
    name: "Commercial",
    icon: Store,
    count: "3,200+",
    href: "/properties?propertyType=Commercial",
  },
  {
    name: "Penthouses",
    icon: Hotel,
    count: "1,100+",
    href: "/properties?propertyType=Penthouse",
  },
  {
    name: "Studios",
    icon: Building2,
    count: "2,450+",
    href: "/properties?propertyType=Studio",
  },
]

export function CategoriesSection() {
  return (
    <section className="mx-auto max-w-7xl px-4 py-16">
      <div className="mb-8 text-center">
        <span className="text-sm font-semibold uppercase tracking-wider text-primary">
          Browse by Type
        </span>
        <h2 className="mt-1 text-2xl font-bold text-foreground md:text-3xl">
          Property Categories
        </h2>
        <p className="mt-2 text-muted-foreground">
          Find exactly what you&apos;re looking for
        </p>
      </div>

      <div className="grid grid-cols-2 gap-4 md:grid-cols-3 lg:grid-cols-6">
        {categories.map((cat) => (
          <Link
            key={cat.name}
            href={cat.href}
            className="group flex flex-col items-center rounded-2xl border border-border bg-card p-6 text-center shadow-sm transition-all hover:border-primary/30 hover:shadow-md"
          >
            <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-primary/10 text-primary transition-colors group-hover:bg-primary group-hover:text-primary-foreground">
              <cat.icon className="h-6 w-6" />
            </div>
            <h3 className="mt-3 text-sm font-semibold text-foreground">
              {cat.name}
            </h3>
            <p className="mt-1 text-xs text-muted-foreground">{cat.count} listings</p>
          </Link>
        ))}
      </div>
    </section>
  )
}
