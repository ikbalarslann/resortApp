import express from "express";
import multer from "multer";
import {
  getAllProperties,
  getPropertyById,
  createProperty,
  updateProperty,
  deleteProperty,
} from "../controllers/propertyController.js";

// Create a router
const router = express.Router();

const storage = multer.memoryStorage();
const upload = multer({ dest: "./frontend/src/assets/img/property" });

// Define routes for the 'properties' resource
router
  .route("/")
  .get(getAllProperties)
  .post(upload.single("image"), createProperty);

router
  .route("/:propertyId")
  .get(getPropertyById)
  .put(updateProperty)
  .delete(deleteProperty);

// Export the router
export default router;
