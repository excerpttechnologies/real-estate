import mongoose, { Schema, Document } from "mongoose"

export interface ISiteVisit extends Document {
  propertyId: mongoose.Types.ObjectId
  userId: mongoose.Types.ObjectId
  name: string
  email: string
  phone: string
  date: string
  timeSlot: string
  message?: string
  status: "pending" | "confirmed" | "cancelled" | "completed"
  createdAt: Date
  updatedAt: Date
}

const SiteVisitSchema = new Schema<ISiteVisit>(
  {
    propertyId: {
      type: Schema.Types.ObjectId,
      ref: "Property",
      required: true,
    },
    userId: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    name: {
      type: String,
      required: [true, "Name is required"],
      trim: true,
    },
    email: {
      type: String,
      required: [true, "Email is required"],
      trim: true,
    },
    phone: {
      type: String,
      required: [true, "Phone is required"],
      trim: true,
    },
    date: {
      type: String,
      required: [true, "Date is required"],
    },
    timeSlot: {
      type: String,
      required: [true, "Time slot is required"],
    },
    message: {
      type: String,
    },
    status: {
      type: String,
      enum: ["pending", "confirmed", "cancelled", "completed"],
      default: "pending",
    },
  },
  { timestamps: true }
)

export default mongoose.models.SiteVisit ||
  mongoose.model<ISiteVisit>("SiteVisit", SiteVisitSchema)