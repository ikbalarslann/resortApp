import mongoose from "mongoose";

const messageSchema = mongoose.Schema(
  {
    senderId: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: "User" || "Host",
    },
    receiverId: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: "User" || "Host",
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
  },
  { timestamps: true }
);
