import mongoose, { Schema, Document } from "mongoose"

export interface IInquiry extends Document {
  senderId: mongoose.Types.ObjectId
  propertyId: mongoose.Types.ObjectId
  message: string
  status: "unread" | "read" | "replied"
  createdAt: Date
}

const InquirySchema = new Schema<IInquiry>(
  {
    senderId: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    propertyId: {
      type: Schema.Types.ObjectId,
      ref: "Property",
      required: true,
    },
    message: {
      type: String,
      required: [true, "Message is required"],
      trim: true,
    },
    status: {
      type: String,
      enum: ["unread", "read", "replied"],
      default: "unread",
    },
  },
  {
    timestamps: true,
  }
)

export default mongoose.models.Inquiry ||
  mongoose.model<IInquiry>("Inquiry", InquirySchema)
