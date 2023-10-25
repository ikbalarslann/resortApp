import mongoose from "mongoose";

const bookingSchema = mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: "User",
    },
    propertyId: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: "Property",
    },
    status: {
      type: String,
      required: true,
    },
    payment: {
      type: Boolean,
      required: true,
    },
  },
  { timestamps: true }
);

const Booking = mongoose.model("Booking", bookingSchema);

export default Booking;
