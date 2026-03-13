export interface Property {
  id: string
  title: string
  price: number
  priceLabel: string
  location: string
  city: string
  area: number
  bedrooms: number
  bathrooms: number
  type: "Apartment" | "Villa" | "Plot" | "Commercial" | "Penthouse" | "Studio"
  status: "Ready to Move" | "Under Construction"
  furnishing: "Furnished" | "Semi-Furnished" | "Unfurnished"
  postedBy: "Owner" | "Agent" | "Builder"
  verified: boolean
  featured: boolean
  images: string[]
  description: string
  amenities: string[]
  postedDate: string
  listingType: "buy" | "rent" | "commercial"
}

export interface City {
  name: string
  image: string
  properties: number
}

export interface Builder {
  id: string
  name: string
  logo: string
  projects: number
  rating: number
}

export interface Testimonial {
  id: string
  name: string
  role: string
  content: string
  rating: number
}

export const cities: City[] = [
  { name: "Mumbai", image: "https://images.unsplash.com/photo-1570168007204-dfb528c6958f?w=600&h=800&fit=crop&q=80", properties: 12450 },
  { name: "Delhi NCR", image: "https://images.unsplash.com/photo-1587474260584-136574528ed5?w=600&h=800&fit=crop&q=80", properties: 9870 },
  { name: "Bangalore", image: "https://images.unsplash.com/photo-1596176530529-78163a4f7af2?w=600&h=800&fit=crop&q=80", properties: 8540 },
  { name: "Hyderabad", image: "https://dynamic-media-cdn.tripadvisor.com/media/photo-o/0f/98/f7/df/charminar.jpg?w=1200&h=900&s=1", properties: 6320 },
  { name: "Pune", image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTreUXB_sdj6KdcxgXVi6xsZDzMKYVBHp3PsA&s", properties: 5890 },
  { name: "Chennai", image: "https://images.unsplash.com/photo-1582510003544-4d00b7f74220?w=600&h=800&fit=crop&q=80", properties: 4670 },
]

export const builders: Builder[] = [
  { id: "1", name: "Prestige Group", logo: "https://images.unsplash.com/photo-1560518883-ce09059eeffa?w=100&h=100&fit=crop&q=80", projects: 45, rating: 4.5 },
  { id: "2", name: "Godrej Properties", logo: "https://images.unsplash.com/photo-1504384308090-c894fdcc538d?w=100&h=100&fit=crop&q=80", projects: 38, rating: 4.7 },
  { id: "3", name: "DLF Limited", logo: "https://images.unsplash.com/photo-1444676632488-26a136c45b9b?w=100&h=100&fit=crop&q=80", projects: 52, rating: 4.3 },
  { id: "4", name: "Sobha Developers", logo: "https://images.unsplash.com/photo-1426024123394-ed938dcb9b31?w=100&h=100&fit=crop&q=80", projects: 29, rating: 4.6 },
  { id: "5", name: "Lodha Group", logo: "https://images.unsplash.com/photo-1554469384-e58fac16e23a?w=100&h=100&fit=crop&q=80", projects: 34, rating: 4.4 },
  { id: "6", name: "Brigade Group", logo: "https://images.unsplash.com/photo-1564013799919-ab600027ffc6?w=100&h=100&fit=crop&q=80", projects: 22, rating: 4.5 },
]

export const testimonials: Testimonial[] = [
  {
    id: "1",
    name: "Rahul Sharma",
    role: "Homebuyer, Mumbai",
    content: "PropNest made finding our dream home incredibly easy. The verified listings gave us confidence, and the agent support was exceptional throughout the process.",
    rating: 5,
  },
  {
    id: "2",
    name: "Priya Patel",
    role: "Property Investor, Bangalore",
    content: "As an investor, I rely on accurate data and market insights. PropNest provides exactly that with their price trends and neighborhood analytics. Highly recommended!",
    rating: 5,
  },
  {
    id: "3",
    name: "Amit Kumar",
    role: "First-time Buyer, Delhi",
    content: "The EMI calculator and loan assistance features helped me plan my finances perfectly. Found a beautiful 2BHK within my budget in just two weeks.",
    rating: 4,
  },
]

export const properties: Property[] = [
  {
    id: "1",
    title: "Luxury 3BHK Apartment in Andheri West",
    price: 18500000,
    priceLabel: "1.85 Cr",
    location: "Andheri West, Mumbai",
    city: "Mumbai",
    area: 1450,
    bedrooms: 3,
    bathrooms: 2,
    type: "Apartment",
    status: "Ready to Move",
    furnishing: "Semi-Furnished",
    postedBy: "Builder",
    verified: true,
    featured: true,
    images: [
      "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=800&h=600&fit=crop&q=80",
      "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=800&h=600&fit=crop&q=80",
      "https://images.unsplash.com/photo-1600566753190-17f0baa2a6c3?w=800&h=600&fit=crop&q=80"
    ],
    description: "Spacious 3BHK apartment with modern amenities, located in the heart of Andheri West. Features include modular kitchen, premium flooring, and 24/7 security.",
    amenities: ["Swimming Pool", "Gym", "Parking", "Security", "Power Backup", "Clubhouse"],
    postedDate: "2 days ago",
    listingType: "buy",
  },
  {
    id: "2",
    title: "Premium Villa with Private Pool in Whitefield",
    price: 45000000,
    priceLabel: "4.5 Cr",
    location: "Whitefield, Bangalore",
    city: "Bangalore",
    area: 3200,
    bedrooms: 4,
    bathrooms: 4,
    type: "Villa",
    status: "Ready to Move",
    furnishing: "Furnished",
    postedBy: "Owner",
    verified: true,
    featured: true,
    images: [
      "https://images.unsplash.com/photo-1613490493576-7fde63acd811?w=800&h=600&fit=crop&q=80",
      "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=800&h=600&fit=crop&q=80",
      "https://images.unsplash.com/photo-1600573472550-8090b5e0745e?w=800&h=600&fit=crop&q=80"
    ],
    description: "Exquisite 4BHK villa featuring private swimming pool, landscaped garden, and premium interiors. Located in a gated community with world-class amenities.",
    amenities: ["Private Pool", "Garden", "Gym", "Clubhouse", "Tennis Court", "Security"],
    postedDate: "1 day ago",
    listingType: "buy",
  },
  {
    id: "3",
    title: "Modern Office Space in Cyber City",
    price: 85000,
    priceLabel: "85K/mo",
    location: "Cyber City, Gurgaon",
    city: "Delhi NCR",
    area: 2000,
    bedrooms: 0,
    bathrooms: 2,
    type: "Commercial",
    status: "Ready to Move",
    furnishing: "Furnished",
    postedBy: "Agent",
    verified: true,
    featured: true,
    images: [
      "https://images.unsplash.com/photo-1497366216548-37526070297c?w=800&h=600&fit=crop&q=80",
      "https://images.unsplash.com/photo-1497215728101-856f4ea42174?w=800&h=600&fit=crop&q=80",
      "https://images.unsplash.com/photo-1431540015161-0bf868a2d407?w=800&h=600&fit=crop&q=80"
    ],
    description: "Premium furnished office space in Cyber City with modern interiors, high-speed internet, and conference room facilities. Ideal for IT companies.",
    amenities: ["Parking", "Cafeteria", "Conference Room", "24/7 Access", "Power Backup", "Security"],
    postedDate: "3 days ago",
    listingType: "commercial",
  },
  {
    id: "4",
    title: "Spacious 2BHK for Rent in Koramangala",
    price: 35000,
    priceLabel: "35K/mo",
    location: "Koramangala, Bangalore",
    city: "Bangalore",
    area: 1100,
    bedrooms: 2,
    bathrooms: 2,
    type: "Apartment",
    status: "Ready to Move",
    furnishing: "Furnished",
    postedBy: "Owner",
    verified: true,
    featured: false,
    images: [
      "https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?w=800&h=600&fit=crop&q=80",
      "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=800&h=600&fit=crop&q=80",
      "https://images.unsplash.com/photo-1600121848594-d8644e57abab?w=800&h=600&fit=crop&q=80"
    ],
    description: "Well-maintained 2BHK apartment in prime Koramangala location. Close to restaurants, malls, and IT parks. Fully furnished with modern amenities.",
    amenities: ["Gym", "Parking", "Security", "Power Backup", "Lift", "Water Supply"],
    postedDate: "5 days ago",
    listingType: "rent",
  },
  {
    id: "5",
    title: "Luxury Penthouse in Bandra",
    price: 75000000,
    priceLabel: "7.5 Cr",
    location: "Bandra West, Mumbai",
    city: "Mumbai",
    area: 4500,
    bedrooms: 5,
    bathrooms: 5,
    type: "Penthouse",
    status: "Ready to Move",
    furnishing: "Furnished",
    postedBy: "Builder",
    verified: true,
    featured: true,
    images: [
      "https://ridhisidhigroup.com/wp-content/uploads/2024/02/What-is-a-Penthouse-Know-the-Advantages-and-Disadvantages.webp",
      "https://images.unsplash.com/photo-1600607687644-c7171b42498f?w=800&h=600&fit=crop&q=80",
      "https://images.unsplash.com/photo-1600607687920-4e2a09cf159d?w=800&h=600&fit=crop&q=80"
    ],
    description: "Ultra-luxury penthouse with panoramic sea views, private terrace, and Italian marble flooring. Located in one of Mumbai's most prestigious addresses.",
    amenities: ["Private Terrace", "Sea View", "Swimming Pool", "Gym", "Concierge", "Valet Parking"],
    postedDate: "1 week ago",
    listingType: "buy",
  },
  {
    id: "6",
    title: "New Launch: Prestige Falcon City",
    price: 8500000,
    priceLabel: "85 L",
    location: "Kanakapura Road, Bangalore",
    city: "Bangalore",
    area: 1250,
    bedrooms: 2,
    bathrooms: 2,
    type: "Apartment",
    status: "Under Construction",
    furnishing: "Unfurnished",
    postedBy: "Builder",
    verified: true,
    featured: true,
    images: [
      "https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?w=800&h=600&fit=crop&q=80",
      "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?w=800&h=600&fit=crop&q=80",
      "https://images.unsplash.com/photo-1574362848149-11496d93a7c7?w=800&h=600&fit=crop&q=80"
    ],
    description: "Experience luxury living at Prestige Falcon City, a signature development with world-class amenities and stunning lake views.",
    amenities: ["Swimming Pool", "Gym", "Jogging Track", "Clubhouse", "24/7 Security"],
    postedDate: "New Launch",
    listingType: "buy",
  },
  {
    id: "7",
    title: "Studio Apartment near Manyata Tech Park",
    price: 18000,
    priceLabel: "18K/mo",
    location: "Hebbal, Bangalore",
    city: "Bangalore",
    area: 550,
    bedrooms: 1,
    bathrooms: 1,
    type: "Studio",
    status: "Ready to Move",
    furnishing: "Furnished",
    postedBy: "Agent",
    verified: false,
    featured: false,
    images: [
      "https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?w=800&h=600&fit=crop&q=80",
      "https://images.unsplash.com/photo-1493809842364-78817add7ffb?w=800&h=600&fit=crop&q=80",
      "https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?w=800&h=600&fit=crop&q=80"
    ],
    description: "Compact fully furnished studio apartment, perfect for working professionals. Walking distance to Manyata Tech Park and metro station.",
    amenities: ["Gym", "Security", "Power Backup", "WiFi", "Laundry", "Parking"],
    postedDate: "6 days ago",
    listingType: "rent",
  },
  {
    id: "8",
    title: "Premium 4BHK in DLF Phase 5",
    price: 32000000,
    priceLabel: "3.2 Cr",
    location: "DLF Phase 5, Gurgaon",
    city: "Delhi NCR",
    area: 2800,
    bedrooms: 4,
    bathrooms: 3,
    type: "Apartment",
    status: "Ready to Move",
    furnishing: "Semi-Furnished",
    postedBy: "Owner",
    verified: true,
    featured: true,
    images: [
      "https://assets-news.housing.com/news/wp-content/uploads/2020/06/23163910/What-are-penthouses-and-how-popular-are-they-in-India-FB-1200x700-compressed.jpg",
      "https://images.unsplash.com/photo-1600566753376-12c8ab7fb75b?w=800&h=600&fit=crop&q=80",
      "https://images.unsplash.com/photo-1600585154526-990dcea42e49?w=800&h=600&fit=crop&q=80"
    ],
    description: "Premium 4BHK apartment in DLF's most sought-after locality. Features include Italian marble, modular kitchen, and panoramic views of Aravali hills.",
    amenities: ["Swimming Pool", "Tennis Court", "Gym", "Clubhouse", "Security", "Parking"],
    postedDate: "3 days ago",
    listingType: "buy",
  },
  {
    id: "9",
    title: "Commercial Shop in Phoenix Mall Area",
    price: 150000,
    priceLabel: "1.5L/mo",
    location: "Lower Parel, Mumbai",
    city: "Mumbai",
    area: 800,
    bedrooms: 0,
    bathrooms: 1,
    type: "Commercial",
    status: "Ready to Move",
    furnishing: "Unfurnished",
    postedBy: "Agent",
    verified: true,
    featured: false,
    images: [
      "https://ik.imagekit.io/sjnshacs8/propertygallery/65560dbb6ed90_marathonfuturex2.webp?tr=w-430,h-322",
      "https://images.unsplash.com/photo-1556740758-90eb3af53579?w=800&h=600&fit=crop&q=80",
      "https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=800&h=600&fit=crop&q=80"
    ],
    description: "Prime commercial shop space near Phoenix Mall with high footfall area. Ideal for retail, showroom, or boutique setup.",
    amenities: ["Parking", "Security", "Power Backup", "Lift", "Fire Safety", "Water Supply"],
    postedDate: "1 week ago",
    listingType: "commercial",
  },
  {
    id: "10",
    title: "Elegant 3BHK in Jubilee Hills",
    price: 22000000,
    priceLabel: "2.2 Cr",
    location: "Jubilee Hills, Hyderabad",
    city: "Hyderabad",
    area: 1800,
    bedrooms: 3,
    bathrooms: 3,
    type: "Apartment",
    status: "Ready to Move",
    furnishing: "Semi-Furnished",
    postedBy: "Builder",
    verified: true,
    featured: true,
    images: [
      "https://images.unsplash.com/photo-1484154218962-a197022b5858?w=800&h=600&fit=crop&q=80",
      "https://images.unsplash.com/photo-1493663284031-b7e3aefcae8e?w=800&h=600&fit=crop&q=80",
      "https://images.unsplash.com/photo-1502005229762-cf1b2da7c5d6?w=800&h=600&fit=crop&q=80"
    ],
    description: "Elegant 3BHK apartment in the upscale Jubilee Hills neighborhood. Premium finishes, spacious rooms, and proximity to top schools and hospitals.",
    amenities: ["Swimming Pool", "Gym", "Garden", "Children's Play Area", "Security", "Parking"],
    postedDate: "2 days ago",
    listingType: "buy",
  },
  {
    id: "11",
    title: "Cozy 1BHK in Indiranagar for Rent",
    price: 25000,
    priceLabel: "25K/mo",
    location: "Indiranagar, Bangalore",
    city: "Bangalore",
    area: 650,
    bedrooms: 1,
    bathrooms: 1,
    type: "Apartment",
    status: "Ready to Move",
    furnishing: "Furnished",
    postedBy: "Owner",
    verified: true,
    featured: false,
    images: [
      "https://media.admiddleeast.com/photos/6634e4e0ce64938e015c71ca/16:9/w_2560%2Cc_limit/Blue_Copper_Loft_by_ANARCHITECT%25C2%25A9_photo_Ieva_Saudargaite%2520(25).jpg",
      "https://images.unsplash.com/photo-1536376074432-bf132ed6562b?w=800&h=600&fit=crop&q=80",
      "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=800&h=600&fit=crop&q=80"
    ],
    description: "Beautifully furnished 1BHK in trendy Indiranagar locality. Walking distance to 100ft Road, metro station, and vibrant nightlife.",
    amenities: ["Security", "Power Backup", "WiFi", "Parking", "Water Supply", "Lift"],
    postedDate: "1 day ago",
    listingType: "rent",
  },
  {
    id: "12",
    title: "New Launch: The Palms Villa",
    price: 55000000,
    priceLabel: "5.5 Cr",
    location: "ECR, Chennai",
    city: "Chennai",
    area: 4000,
    bedrooms: 5,
    bathrooms: 5,
    type: "Villa",
    status: "Under Construction",
    furnishing: "Unfurnished",
    postedBy: "Builder",
    verified: true,
    featured: true,
    images: [
      "https://www.luxuryproperty.com/_next/image?url=https%3A%2F%2Fwww1.luxuryproperty.com%2Fuploads%2Fimages%2FLP02990-40d57d7afd734495f5d7d2d1a5f9de1d.jpg%3Fnowm&w=1920&q=75",
      "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=800&h=600&fit=crop&q=80",
      "https://images.unsplash.com/photo-1600566753190-17f0baa2a6c3?w=800&h=600&fit=crop&q=80"
    ],
    description: "Magnificent sea-facing villa on ECR with private beach access, infinity pool, and contemporary architecture.",
    amenities: ["Beach Access", "Infinity Pool", "Landscaped Garden", "Home Theater", "Smart Home", "Security"],
    postedDate: "Now Booking",
    listingType: "buy",
  },
]

export const propertyTypes = [
  "Apartment",
  "Villa",
  "Plot",
  "Commercial",
  "Penthouse",
  "Studio",
]

export const furnishingTypes = ["Furnished", "Semi-Furnished", "Unfurnished"]
export const statusTypes = ["Ready to Move", "Under Construction"]
export const postedByTypes = ["Owner", "Agent", "Builder"]

export function formatPrice(price: number): string {
  if (price >= 10000000) {
    return `${(price / 10000000).toFixed(2)} Cr`
  } else if (price >= 100000) {
    return `${(price / 100000).toFixed(0)} L`
  } else if (price >= 1000) {
    return `${(price / 1000).toFixed(0)}K/mo`
  }
  return price.toLocaleString("en-IN")
}
