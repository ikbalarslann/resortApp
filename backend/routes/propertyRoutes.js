import express from "express";
import {
  getAllProperties,
  getPropertyById,
  createProperty,
  updateProperty,
  deleteProperty,
} from "../controllers/propertyController.js";

// Create a router
const router = express.Router();

// Define routes for the 'properties' resource
router.route("/").get(getAllProperties).post(createProperty);

router
  .route("/:propertyTitle")
  .get(getPropertyById)
  .put(updateProperty)
  .delete(deleteProperty);

// Export the router
export default router;
