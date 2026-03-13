import mongoose, { Schema, Document } from "mongoose"

export interface IPropertyView extends Document {
  propertyId: mongoose.Types.ObjectId
  visitorId: string // IP address or anonymous ID
  createdAt: Date
}

const PropertyViewSchema = new Schema(
  {
    propertyId: {
      type: Schema.Types.ObjectId,
      ref: "Property",
      required: true,
    },
    visitorId: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
)

// Prevent duplicate views from same visitor on same property within 24hrs
PropertyViewSchema.index(
  { propertyId: 1, visitorId: 1 },
  { unique: false }
)

export default mongoose.models.PropertyView ||
  mongoose.model<IPropertyView>("PropertyView", PropertyViewSchema)