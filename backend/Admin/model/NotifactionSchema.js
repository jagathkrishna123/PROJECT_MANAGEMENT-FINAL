import mongoose from "mongoose";

const notificationSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      trim: true,
      default: ""
    },
    message: {
      type: String,
      required: true,
      trim: true,
    },
    type: {
      type: String,
      required: true,
      enum: ['admin', 'teachers', 'students'], // optional: limit values
      default: 'admin', // optional: default type
    },
    senderId: {
      type: mongoose.Schema.Types.ObjectId,
      default: null,
    },
    senderName: {
      type: String,
      default: 'System',
    },
  },
  {
    timestamps: true, // adds createdAt & updatedAt automatically
  }
);

export default mongoose.model("Notification", notificationSchema);
