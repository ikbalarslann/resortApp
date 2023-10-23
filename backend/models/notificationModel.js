import mongoose from "mongoose";

const notificationSchema = mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: "User",
    },
    bookingId: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: "Booking",
    },

    content: {
      type: String,
      required: true,
    },
    status: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);
