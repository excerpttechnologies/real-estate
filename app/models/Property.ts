import mongoose, { Schema, Document } from "mongoose"

export interface IProperty extends Document {
  title: string
  description: string
  price: number
  priceLabel: string
  listingType: "buy" | "rent" | "commercial"
  type: "Apartment" | "Villa" | "Plot" | "Commercial" | "Penthouse" | "Studio"
  status: "Ready to Move" | "Under Construction"
  furnishing: "Furnished" | "Semi-Furnished" | "Unfurnished"
  bedrooms: number
  bathrooms: number
  area: number
  location: string
  city: string
  address?: string
  societyName?: string
  images: string[]
  amenities: string[]
  postedBy: mongoose.Types.ObjectId
  verified: boolean
  featured: boolean
  createdAt: Date
  updatedAt: Date
}

const PropertySchema = new Schema<IProperty>(
  {
    title: {
      type: String,
      required: [true, "Title is required"],
      trim: true,
    },
    description: {
      type: String,
      required: [true, "Description is required"],
    },
    price: {
      type: Number,
      required: [true, "Price is required"],
    },
    priceLabel: {
      type: String,
      required: [true, "Price label is required"],
    },
    listingType: {
      type: String,
      enum: ["buy", "rent", "commercial"],
      required: true,
    },
    type: {
      type: String,
      enum: ["Apartment", "Villa", "Plot", "Commercial", "Penthouse", "Studio"],
      required: true,
    },
    status: {
      type: String,
      enum: ["Ready to Move", "Under Construction"],
      required: true,
    },
    furnishing: {
      type: String,
      enum: ["Furnished", "Semi-Furnished", "Unfurnished"],
      required: true,
    },
    bedrooms: {
      type: Number,
      default: 0,
    },
    bathrooms: {
      type: Number,
      required: true,
      default: 0, 
    },
    area: {
      type: Number,
      required: true,
    },
    location: {
      type: String,
      required: true,
    },
    city: {
      type: String,
      required: true,
    },
    address: String,
    societyName: String,
    images: [{ type: String }],
    amenities: [{ type: String }],
    postedBy: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    verified: {
      type: Boolean,
      default: false,
    },
    featured: {
      type: Boolean,
      default: false,
    },
  },
  {
    timestamps: true,
  }
)

export default mongoose.models.Property ||
  mongoose.model<IProperty>("Property", PropertySchema)