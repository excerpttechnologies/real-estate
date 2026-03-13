import mongoose, { Schema, Document } from "mongoose"

export interface ISavedProperty extends Document {
  userId: mongoose.Types.ObjectId
  propertyId: mongoose.Types.ObjectId
  createdAt: Date
}

const SavedPropertySchema = new Schema<ISavedProperty>(
  {
    userId: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    propertyId: {
      type: Schema.Types.ObjectId,
      ref: "Property",
      required: true,
    },
  },
  {
    timestamps: true,
  }
)

// Prevent duplicate saves
SavedPropertySchema.index({ userId: 1, propertyId: 1 }, { unique: true })

export default mongoose.models.SavedProperty ||
  mongoose.model<ISavedProperty>("SavedProperty", SavedPropertySchema)