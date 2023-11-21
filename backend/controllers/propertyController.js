import Property from "../models/propertyModel.js";
import asyncHandler from "express-async-handler";

const getAllProperties = async (req, res) => {
  try {
    const properties = await Property.find();
    res.status(200).json(properties);
  } catch (error) {
    console.error("Error fetching properties:", error);
    res.status(500).send("Internal Server Error");
  }
};

const getPropertyById = async (req, res) => {
  const propertyId = req.params.propertyId;
  console.log(propertyId);
  try {
    const property = await Property.findById(propertyId);

    if (!property) {
      return res.status(404).json({ message: "Property not found" });
    }

    res.status(200).json(property);
  } catch (error) {
    console.error("Error fetching property by ID:", error);
    res.status(500).send("Internal Server Error");
  }
};

const createProperty = asyncHandler(async (req, res) => {
  const {
    hostId,
    title,
    description,
    location,
    price,
    space,
    availability,
    reviews,
    type,
  } = req.body;

  // Assuming you are using multer for file upload and 'image' is the field name for the image file
  const image = req.file ? req.file.filename : null;

  try {
    const newProperty = new Property({
      hostId,
      title,
      description,
      location,
      price,
      space,
      availability,
      reviews,
      images: [image], // Assuming images is an array and you want to store multiple images
      type,
    });

    const savedProperty = await newProperty.save();

    res.status(201).json(savedProperty);
  } catch (error) {
    console.error("Error creating property:", error);
    res.status(500).send("Internal Server Error");
  }
});

const updateProperty = async (req, res) => {
  const propertyId = req.params.propertyId;
  const {
    title,
    description,
    location,
    price,
    space,
    availability,
    reviews,
    images,
    type,
  } = req.body;

  try {
    const property = await Property.findByIdAndUpdate(
      propertyId,
      {
        title,
        description,
        location,
        price,
        space,
        availability,
        reviews,
        images,
        type,
      },
      { new: true }
    );

    if (!property) {
      return res.status(404).json({ message: "Property not found" });
    }

    res.status(200).json(property);
  } catch (error) {
    console.error("Error updating property:", error);
    res.status(500).send("Internal Server Error");
  }
};

const deleteProperty = async (req, res) => {
  const propertyId = req.params.propertyId;

  try {
    const deletedProperty = await Property.findByIdAndRemove(propertyId);

    if (!deletedProperty) {
      return res.status(404).json({ message: "Property not found" });
    }

    res.status(200).json({ message: "Property deleted successfully" });
  } catch (error) {
    console.error("Error deleting property:", error);
    res.status(500).send("Internal Server Error");
  }
};

export {
  getAllProperties,
  getPropertyById,
  createProperty,
  updateProperty,
  deleteProperty,
};
