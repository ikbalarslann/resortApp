import mongoose from "mongoose";

const locationSchema = mongoose.Schema({
  location: {
    type: String,
    required: true,
  },
});

const Location = mongoose.model("Location", locationSchema);

export default Location;
