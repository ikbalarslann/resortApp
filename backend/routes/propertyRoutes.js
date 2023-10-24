import express from "express";
import {
  getAllProperties,
  getPropertyById,
  createProperty,
  updateProperty,
  deleteProperty,
} from "../controllers/propertyController.js";
import { protect } from "../middleware/authMiddleware.js";

// Create a router
const router = express.Router();

// Define routes for the 'properties' resource
router.route("/").get(getAllProperties).post(protect, createProperty);

router
  .route("/:propertyId")
  .get(getPropertyById)
  .put(protect, updateProperty)
  .delete(protect, deleteProperty);

// Export the router
export default router;
