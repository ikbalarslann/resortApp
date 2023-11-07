import express from "express";
import {
  getLocations,
  createLocation,
} from "../controllers/locationController.js";

const router = express.Router();

router.route("/").post(createLocation).get(getLocations);

export default router;
