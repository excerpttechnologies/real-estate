// import Image from "next/image"
// import Link from "next/link"
// import { builders } from "@/app/lib/data"
// import { Star, ArrowRight } from "lucide-react"
// import { Button } from "@/app/components/ui/button"

// export function BuildersSection() {
//   return (
//     <section className="mx-auto max-w-7xl px-4 py-16">
//       <div className="mb-8 flex items-end justify-between">
//         <div>
//           <span className="text-sm font-semibold uppercase tracking-wider text-primary">
//             Trusted Partners
//           </span>
//           <h2 className="mt-1 text-2xl font-bold text-foreground md:text-3xl">
//             Top Builders
//           </h2>
//           <p className="mt-2 text-muted-foreground">
//             Work with India&apos;s most reputed property developers
//           </p>
//         </div>
//         <Button variant="ghost" className="hidden gap-1.5 text-primary md:inline-flex">
//           View All
//           <ArrowRight className="h-4 w-4" />
//         </Button>
//       </div>

//       <div className="grid grid-cols-2 gap-4 md:grid-cols-3 lg:grid-cols-6">
//         {builders.map((builder) => (
//           <Link
//             key={builder.id}
//             href="/properties"
//             className="group flex flex-col items-center rounded-2xl border border-border bg-card p-6 text-center shadow-sm transition-all hover:shadow-md hover:border-primary/20"
//           >
//             <div className="relative flex h-14 w-14 items-center justify-center rounded-xl bg-primary/5 text-xl font-bold text-primary overflow-hidden border border-border">
//               {builder.logo.startsWith("http") ? (
//                 <Image
//                   src={builder.logo}
//                   alt={builder.name}
//                   fill
//                   className="object-cover group-hover:scale-110 transition-transform"
//                 />
//               ) : (
//                 builder.logo
//               )}
//             </div>
//             <h3 className="mt-3 text-sm font-semibold text-foreground">
//               {builder.name}
//             </h3>
//             <div className="mt-1.5 flex items-center gap-1">
//               <Star className="h-3 w-3 fill-accent text-accent" />
//               <span className="text-xs font-medium text-foreground">
//                 {builder.rating}
//               </span>
//             </div>
//             <p className="mt-1 text-xs text-muted-foreground">
//               {builder.projects} Projects
//             </p>
//           </Link>
//         ))}
//       </div>
//     </section>
//   )
// }



import Image from "next/image"
import Link from "next/link"
import { Star, ArrowRight } from "lucide-react"
import { Button } from "@/app/components/ui/button"

const builders = [
  {
    id: 1,
    name: "Lodha Group",
    logo: "LG",
    rating: 4.8,
    projects: 120,
  },
  {
    id: 2,
    name: "DLF Limited",
    logo: "DL",
    rating: 4.7,
    projects: 95,
  },
  {
    id: 3,
    name: "Godrej Properties",
    logo: "GP",
    rating: 4.9,
    projects: 85,
  },
  {
    id: 4,
    name: "Prestige Group",
    logo: "PG",
    rating: 4.6,
    projects: 110,
  },
  {
    id: 5,
    name: "Sobha Limited",
    logo: "SL",
    rating: 4.7,
    projects: 75,
  },
  {
    id: 6,
    name: "Brigade Group",
    logo: "BG",
    rating: 4.5,
    projects: 60,
  },
]

export function BuildersSection() {
  return (
    <section className="mx-auto max-w-7xl px-4 py-16">
      <div className="mb-8 flex items-end justify-between">
        <div>
          <span className="text-sm font-semibold uppercase tracking-wider text-primary">
            Trusted Partners
          </span>
          <h2 className="mt-1 text-2xl font-bold text-foreground md:text-3xl">
            Top Builders
          </h2>
          <p className="mt-2 text-muted-foreground">
            Work with India&apos;s most reputed property developers
          </p>
        </div>
        <Button
          variant="ghost"
          className="hidden gap-1.5 text-primary md:inline-flex"
        >
          View All
          <ArrowRight className="h-4 w-4" />
        </Button>
      </div>

      <div className="grid grid-cols-2 gap-4 md:grid-cols-3 lg:grid-cols-6">
        {builders.map((builder) => (
          <Link
            key={builder.id}
            href="/properties"
            className="group flex flex-col items-center rounded-2xl border border-border bg-card p-6 text-center shadow-sm transition-all hover:border-primary/20 hover:shadow-md"
          >
            <div className="relative flex h-14 w-14 items-center justify-center rounded-xl border border-border bg-primary/5 text-xl font-bold text-primary overflow-hidden">
              {builder.logo.startsWith("http") ? (
                <Image
                  src={builder.logo}
                  alt={builder.name}
                  fill
                  className="object-cover transition-transform group-hover:scale-110"
                />
              ) : (
                <span>{builder.logo}</span>
              )}
            </div>
            <h3 className="mt-3 text-sm font-semibold text-foreground">
              {builder.name}
            </h3>
            <div className="mt-1.5 flex items-center gap-1">
              <Star className="h-3 w-3 fill-accent text-accent" />
              <span className="text-xs font-medium text-foreground">
                {builder.rating}
              </span>
            </div>
            <p className="mt-1 text-xs text-muted-foreground">
              {builder.projects} Projects
            </p>
          </Link>
        ))}
      </div>
    </section>
  )
}
