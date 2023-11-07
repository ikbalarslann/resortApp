import asyncHandler from "express-async-handler";
import Location from "../models/locationModel.js";

const getLocations = asyncHandler(async (req, res) => {
  try {
    const locations = await Location.find();
    res.status(200).json(locations);
  } catch (error) {
    console.error("Error fetching locations:", error);
    res.status(500).send("Internal Server Error");
  }
});

const createLocation = asyncHandler(async (req, res) => {
  const { location } = req.body;

  try {
    const newLocation = new Location({
      location,
    });
    const savedLocation = await newLocation.save();

    res.status(201).json(savedLocation);
  } catch (error) {
    console.error("Error creating Location:", error);
    res.status(500).send("Internal Server Error");
  }
});

export { getLocations, createLocation };
