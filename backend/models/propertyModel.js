import mongoose from "mongoose";

const propertySchema = mongoose.Schema(
  {
    hostId: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: "Host",
    },

    title: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    location: {
      type: String,
      required: true,
    },
    type: {
      type: String,
      required: true,
    },
    amenities: {
      type: Array,
      required: true,
    },
    price: {
      type: Number,
      required: true,
    },
    rating: {
      type: Number,
    },
  },
  { timestamps: true }
);
