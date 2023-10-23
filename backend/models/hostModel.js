import mongoose from "mongoose";

const hostSchema = mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },
    phoneNumber: {
      type: String,
      required: true,
    },
    profilePicture: {
      type: String,
      required: true,
    },
    aboutme: {
      type: String,
      required: true,
    },
    listings: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);
