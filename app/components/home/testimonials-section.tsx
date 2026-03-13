// import { testimonials } from "@/app/lib/data"
// import { Star, Quote } from "lucide-react"

// export function TestimonialsSection() {
//   return (
//     <section className="bg-secondary/50 py-16">
//       <div className="mx-auto max-w-7xl px-4">
//         <div className="mb-10 text-center">
//           <span className="text-sm font-semibold uppercase tracking-wider text-primary">
//             What Our Users Say
//           </span>
//           <h2 className="mt-1 text-2xl font-bold text-foreground md:text-3xl">
//             Trusted by Millions
//           </h2>
//         </div>

//         <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
//           {testimonials.map((t) => (
//             <div
//               key={t.id}
//               className="relative rounded-2xl border border-border bg-card p-6 shadow-sm"
//             >
//               <Quote className="absolute right-6 top-6 h-8 w-8 text-primary/10" />
//               <div className="mb-3 flex">
//                 {Array.from({ length: 5 }).map((_, i) => (
//                   <Star
//                     key={i}
//                     className={`h-4 w-4 ${
//                       i < t.rating
//                         ? "fill-accent text-accent"
//                         : "text-border"
//                     }`}
//                   />
//                 ))}
//               </div>
//               <p className="text-sm leading-relaxed text-muted-foreground">
//                 &ldquo;{t.content}&rdquo;
//               </p>
//               <div className="mt-4 flex items-center gap-3 border-t border-border pt-4">
//                 <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary text-sm font-bold text-primary-foreground">
//                   {t.name
//                     .split(" ")
//                     .map((n) => n[0])
//                     .join("")}
//                 </div>
//                 <div>
//                   <p className="text-sm font-semibold text-foreground">
//                     {t.name}
//                   </p>
//                   <p className="text-xs text-muted-foreground">{t.role}</p>
//                 </div>
//               </div>
//             </div>
//           ))}
//         </div>
//       </div>
//     </section>
//   )
// }



import { Star, Quote } from "lucide-react"

const testimonials = [
  {
    id: 1,
    name: "Rahul Sharma",
    role: "Home Buyer, Mumbai",
    rating: 5,
    content:
      "Found my dream apartment in Andheri within 2 weeks! The verified listings gave me confidence and the process was completely transparent.",
  },
  {
    id: 2,
    name: "Priya Nair",
    role: "Property Investor, Bangalore",
    rating: 5,
    content:
      "As an investor, I need reliable data. PropNest's detailed listings and price trends helped me make the right investment decision in Whitefield.",
  },
  {
    id: 3,
    name: "Vikram Patel",
    role: "First-time Renter, Hyderabad",
    rating: 4,
    content:
      "The filter options are incredible. I found a semi-furnished 2BHK in Banjara Hills exactly within my budget. Highly recommend PropNest!",
  },
]

export function TestimonialsSection() {
  return (
    <section className="bg-secondary/50 py-16">
      <div className="mx-auto max-w-7xl px-4">
        <div className="mb-10 text-center">
          <span className="text-sm font-semibold uppercase tracking-wider text-primary">
            What Our Users Say
          </span>
          <h2 className="mt-1 text-2xl font-bold text-foreground md:text-3xl">
            Trusted by Millions
          </h2>
        </div>

        <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
          {testimonials.map((t) => (
            <div
              key={t.id}
              className="relative rounded-2xl border border-border bg-card p-6 shadow-sm"
            >
              <Quote className="absolute right-6 top-6 h-8 w-8 text-primary/10" />
              <div className="mb-3 flex">
                {Array.from({ length: 5 }).map((_, i) => (
                  <Star
                    key={i}
                    className={`h-4 w-4 ${
                      i < t.rating ? "fill-accent text-accent" : "text-border"
                    }`}
                  />
                ))}
              </div>
              <p className="text-sm leading-relaxed text-muted-foreground">
                &ldquo;{t.content}&rdquo;
              </p>
              <div className="mt-4 flex items-center gap-3 border-t border-border pt-4">
                <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary text-sm font-bold text-primary-foreground">
                  {t.name
                    .split(" ")
                    .map((n) => n[0])
                    .join("")}
                </div>
                <div>
                  <p className="text-sm font-semibold text-foreground">{t.name}</p>
                  <p className="text-xs text-muted-foreground">{t.role}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
