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

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "./frontend/src/assets/img/property");
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + "-" + file.originalname);
  },
});

const upload = multer({ storage: storage });

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
