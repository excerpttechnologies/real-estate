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
  { name: "Mumbai", image: "/images/city-mumbai.jpg", properties: 12450 },
  { name: "Delhi NCR", image: "/images/city-delhi.jpg", properties: 9870 },
  { name: "Bangalore", image: "/images/city-bangalore.jpg", properties: 8540 },
  { name: "Hyderabad", image: "/images/city-mumbai.jpg", properties: 6320 },
  { name: "Pune", image: "/images/city-delhi.jpg", properties: 5890 },
  { name: "Chennai", image: "/images/city-bangalore.jpg", properties: 4670 },
]

export const builders: Builder[] = [
  { id: "1", name: "Prestige Group", logo: "P", projects: 45, rating: 4.5 },
  { id: "2", name: "Godrej Properties", logo: "G", projects: 38, rating: 4.7 },
  { id: "3", name: "DLF Limited", logo: "D", projects: 52, rating: 4.3 },
  { id: "4", name: "Sobha Developers", logo: "S", projects: 29, rating: 4.6 },
  { id: "5", name: "Lodha Group", logo: "L", projects: 34, rating: 4.4 },
  { id: "6", name: "Brigade Group", logo: "B", projects: 22, rating: 4.5 },
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
    images: ["/images/property-1.jpg", "/images/property-2.jpg", "/images/property-3.jpg"],
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
    images: ["/images/property-2.jpg", "/images/property-1.jpg", "/images/property-5.jpg"],
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
    images: ["/images/property-3.jpg", "/images/property-4.jpg", "/images/property-6.jpg"],
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
    images: ["/images/property-4.jpg", "/images/property-1.jpg", "/images/property-3.jpg"],
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
    images: ["/images/property-5.jpg", "/images/property-1.jpg", "/images/property-2.jpg"],
    description: "Ultra-luxury penthouse with panoramic sea views, private terrace, and Italian marble flooring. Located in one of Mumbai's most prestigious addresses.",
    amenities: ["Private Terrace", "Sea View", "Swimming Pool", "Gym", "Concierge", "Valet Parking"],
    postedDate: "1 week ago",
    listingType: "buy",
  },
  {
    id: "6",
    title: "New Launch 2BHK in Hinjawadi Phase 3",
    price: 6500000,
    priceLabel: "65L",
    location: "Hinjawadi, Pune",
    city: "Pune",
    area: 950,
    bedrooms: 2,
    bathrooms: 2,
    type: "Apartment",
    status: "Under Construction",
    furnishing: "Unfurnished",
    postedBy: "Builder",
    verified: true,
    featured: false,
    images: ["/images/property-6.jpg", "/images/property-4.jpg", "/images/property-3.jpg"],
    description: "Brand new 2BHK apartment in upcoming township near IT hubs. Modern design with open floor plan and premium specifications.",
    amenities: ["Swimming Pool", "Gym", "Children's Play Area", "Jogging Track", "Clubhouse", "Parking"],
    postedDate: "4 days ago",
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
    images: ["/images/property-1.jpg", "/images/property-6.jpg", "/images/property-4.jpg"],
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
    images: ["/images/property-2.jpg", "/images/property-5.jpg", "/images/property-1.jpg"],
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
    images: ["/images/property-3.jpg", "/images/property-6.jpg", "/images/property-4.jpg"],
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
    images: ["/images/property-4.jpg", "/images/property-2.jpg", "/images/property-5.jpg"],
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
    images: ["/images/property-6.jpg", "/images/property-1.jpg", "/images/property-3.jpg"],
    description: "Beautifully furnished 1BHK in trendy Indiranagar locality. Walking distance to 100ft Road, metro station, and vibrant nightlife.",
    amenities: ["Security", "Power Backup", "WiFi", "Parking", "Water Supply", "Lift"],
    postedDate: "1 day ago",
    listingType: "rent",
  },
  {
    id: "12",
    title: "Ultra Luxury Villa in ECR",
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
    images: ["/images/property-5.jpg", "/images/property-2.jpg", "/images/property-1.jpg"],
    description: "Magnificent sea-facing villa on ECR with private beach access, infinity pool, and contemporary architecture. A once-in-a-lifetime opportunity.",
    amenities: ["Beach Access", "Infinity Pool", "Landscaped Garden", "Home Theater", "Smart Home", "Security"],
    postedDate: "5 days ago",
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
