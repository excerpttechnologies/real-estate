// "use client"

// import { useState } from "react"
// import Image from "next/image"
// import { ChevronLeft, ChevronRight, Expand } from "lucide-react"

// interface ImageGalleryProps {
//   images: string[]
//   title: string
// }

// export function ImageGallery({ images, title }: ImageGalleryProps) {
//   const [current, setCurrent] = useState(0)
//   const [fullscreen, setFullscreen] = useState(false)

//   const allImages = [
//     ...images,
//     ...images,
//     ...images,
//   ].slice(0, 8) // simulate 8 images

//   const goNext = () => setCurrent((c) => (c + 1) % allImages.length)
//   const goPrev = () =>
//     setCurrent((c) => (c - 1 + allImages.length) % allImages.length)

//   return (
//     <>
//       <div className="grid gap-2 md:grid-cols-[2fr_1fr]">
//         {/* Main Image */}
//         <div className="group relative aspect-[16/10] overflow-hidden rounded-2xl">
//           <Image
//             src={allImages[current]}
//             alt={`${title} - Image ${current + 1}`}
//             fill
//             className="object-cover"
//             priority
//           />
//           <button
//             onClick={goPrev}
//             className="absolute left-3 top-1/2 flex h-9 w-9 -translate-y-1/2 items-center justify-center rounded-full bg-card/80 text-foreground opacity-0 backdrop-blur-sm transition-opacity group-hover:opacity-100"
//             aria-label="Previous image"
//           >
//             <ChevronLeft className="h-5 w-5" />
//           </button>
//           <button
//             onClick={goNext}
//             className="absolute right-3 top-1/2 flex h-9 w-9 -translate-y-1/2 items-center justify-center rounded-full bg-card/80 text-foreground opacity-0 backdrop-blur-sm transition-opacity group-hover:opacity-100"
//             aria-label="Next image"
//           >
//             <ChevronRight className="h-5 w-5" />
//           </button>
//           <button
//             onClick={() => setFullscreen(true)}
//             className="absolute bottom-3 right-3 flex h-8 items-center gap-1.5 rounded-lg bg-card/80 px-3 text-xs font-medium text-foreground backdrop-blur-sm transition-opacity hover:bg-card"
//           >
//             <Expand className="h-3.5 w-3.5" />
//             {current + 1}/{allImages.length}
//           </button>
//         </div>

//         {/* Thumbnails */}
//         <div className="hidden grid-cols-2 gap-2 md:grid">
//           {allImages.slice(0, 4).map((img, i) => (
//             <button
//               key={i}
//               onClick={() => setCurrent(i)}
//               className={`relative aspect-[4/3] overflow-hidden rounded-xl transition-opacity ${
//                 current === i ? "ring-2 ring-primary" : "opacity-70 hover:opacity-100"
//               }`}
//             >
//               <Image
//                 src={img}
//                 alt={`${title} - Thumbnail ${i + 1}`}
//                 fill
//                 className="object-cover"
//               />
//               {i === 3 && allImages.length > 4 && (
//                 <div className="absolute inset-0 flex items-center justify-center bg-foreground/50 text-sm font-semibold text-background">
//                   +{allImages.length - 4} more
//                 </div>
//               )}
//             </button>
//           ))}
//         </div>
//       </div>

//       {/* Fullscreen Modal */}
//       {fullscreen && (
//         <div className="fixed inset-0 z-50 flex items-center justify-center bg-foreground/95 p-4">
//           <button
//             onClick={() => setFullscreen(false)}
//             className="absolute right-4 top-4 flex h-10 w-10 items-center justify-center rounded-full bg-card/20 text-background transition-colors hover:bg-card/30"
//             aria-label="Close fullscreen"
//           >
//             <span className="text-xl">&times;</span>
//           </button>
//           <button
//             onClick={goPrev}
//             className="absolute left-4 top-1/2 flex h-10 w-10 -translate-y-1/2 items-center justify-center rounded-full bg-card/20 text-background"
//             aria-label="Previous"
//           >
//             <ChevronLeft className="h-5 w-5" />
//           </button>
//           <div className="relative aspect-video w-full max-w-4xl">
//             <Image
//               src={allImages[current]}
//               alt={`${title} - Full ${current + 1}`}
//               fill
//               className="object-contain"
//             />
//           </div>
//           <button
//             onClick={goNext}
//             className="absolute right-4 top-1/2 flex h-10 w-10 -translate-y-1/2 items-center justify-center rounded-full bg-card/20 text-background"
//             aria-label="Next"
//           >
//             <ChevronRight className="h-5 w-5" />
//           </button>
//           <div className="absolute bottom-4 text-sm text-background/70">
//             {current + 1} / {allImages.length}
//           </div>
//         </div>
//       )}
//     </>
//   )
// }








"use client"

import { useState } from "react"
import Image from "next/image"
import { ChevronLeft, ChevronRight, Expand } from "lucide-react"

interface ImageGalleryProps {
  images: string[]
  title: string
}

const PLACEHOLDER = "https://placehold.co/800x600/e2e8f0/64748b?text=No+Image"

export function ImageGallery({ images, title }: ImageGalleryProps) {
  const [current, setCurrent] = useState(0)
  const [fullscreen, setFullscreen] = useState(false)

  // ✅ Use real images only, fallback to placeholder if empty
  const allImages = images.length > 0 ? images : [PLACEHOLDER]

  const goNext = () => setCurrent((c) => (c + 1) % allImages.length)
  const goPrev = () =>
    setCurrent((c) => (c - 1 + allImages.length) % allImages.length)

  return (
    <>
      <div className="grid gap-2 md:grid-cols-[2fr_1fr]">
        {/* Main Image */}
        <div className="group relative aspect-[16/10] overflow-hidden rounded-2xl">
          <Image
            src={allImages[current]}
            alt={`${title} - Image ${current + 1}`}
            fill
            className="object-cover"
            priority
            unoptimized
          />
          {allImages.length > 1 && (
            <>
              <button
                onClick={goPrev}
                className="absolute left-3 top-1/2 flex h-9 w-9 -translate-y-1/2 items-center justify-center rounded-full bg-card/80 text-foreground opacity-0 backdrop-blur-sm transition-opacity group-hover:opacity-100"
                aria-label="Previous image"
              >
                <ChevronLeft className="h-5 w-5" />
              </button>
              <button
                onClick={goNext}
                className="absolute right-3 top-1/2 flex h-9 w-9 -translate-y-1/2 items-center justify-center rounded-full bg-card/80 text-foreground opacity-0 backdrop-blur-sm transition-opacity group-hover:opacity-100"
                aria-label="Next image"
              >
                <ChevronRight className="h-5 w-5" />
              </button>
            </>
          )}
          <button
            onClick={() => setFullscreen(true)}
            className="absolute bottom-3 right-3 flex h-8 items-center gap-1.5 rounded-lg bg-card/80 px-3 text-xs font-medium text-foreground backdrop-blur-sm transition-opacity hover:bg-card"
          >
            <Expand className="h-3.5 w-3.5" />
            {current + 1}/{allImages.length}
          </button>
        </div>

        {/* Thumbnails */}
        <div className="hidden grid-cols-2 gap-2 md:grid">
          {allImages.slice(0, 4).map((img, i) => (
            <button
              key={i}
              onClick={() => setCurrent(i)}
              className={`relative aspect-[4/3] overflow-hidden rounded-xl transition-opacity ${
                current === i
                  ? "ring-2 ring-primary"
                  : "opacity-70 hover:opacity-100"
              }`}
            >
              <Image
                src={img}
                alt={`${title} - Thumbnail ${i + 1}`}
                fill
                className="object-cover"
                unoptimized
              />
              {i === 3 && allImages.length > 4 && (
                <div className="absolute inset-0 flex items-center justify-center bg-foreground/50 text-sm font-semibold text-background">
                  +{allImages.length - 4} more
                </div>
              )}
            </button>
          ))}
        </div>
      </div>

      {/* Fullscreen Modal */}
      {fullscreen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-foreground/95 p-4">
          <button
            onClick={() => setFullscreen(false)}
            className="absolute right-4 top-4 flex h-10 w-10 items-center justify-center rounded-full bg-card/20 text-background transition-colors hover:bg-card/30"
            aria-label="Close fullscreen"
          >
            <span className="text-xl">&times;</span>
          </button>
          {allImages.length > 1 && (
            <>
              <button
                onClick={goPrev}
                className="absolute left-4 top-1/2 flex h-10 w-10 -translate-y-1/2 items-center justify-center rounded-full bg-card/20 text-background"
                aria-label="Previous"
              >
                <ChevronLeft className="h-5 w-5" />
              </button>
              <button
                onClick={goNext}
                className="absolute right-4 top-1/2 flex h-10 w-10 -translate-y-1/2 items-center justify-center rounded-full bg-card/20 text-background"
                aria-label="Next"
              >
                <ChevronRight className="h-5 w-5" />
              </button>
            </>
          )}
          <div className="relative aspect-video w-full max-w-4xl">
            <Image
              src={allImages[current]}
              alt={`${title} - Full ${current + 1}`}
              fill
              className="object-contain"
              unoptimized
            />
          </div>
          <div className="absolute bottom-4 text-sm text-background/70">
            {current + 1} / {allImages.length}
          </div>
        </div>
      )}
    </>
  )
}
