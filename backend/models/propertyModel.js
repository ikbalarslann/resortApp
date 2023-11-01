import mongoose from "mongoose";

const propertySchema = mongoose.Schema(
  {
    hostId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Host",
      required: true,
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
    price: {
      type: Number,
      required: true,
      default: 0,
    },
    availability: [
      {
        date: {
          type: Date,
          required: true,
        },
        availableSpaces: {
          type: Number,
          required: true,
        },
        pricePerNight: {
          type: Number,
          required: true,
        },
      },
    ],
    // reviews: [
    //   {
    //     type: mongoose.Schema.Types.ObjectId,
    //     ref: "Review",
    //   },
    // ],
  },
  { timestamps: true }
);

const Property = mongoose.model("Property", propertySchema);

export default Property;
