import express from "express";
import {
  authHost,
  registerHost,
  logoutHost,
  getHostProfile,
  updateHostProfile,
} from "../controllers/hostController.js";
import { protect } from "../middleware/authMiddleware.js";
import Host from "../models/hostModel.js";

const router = express.Router();

router.post("/", registerHost);
router.post("/auth", authHost);
router.post("/logout", logoutHost);
router
  .route("/profile")
  .get(protect(Host), getHostProfile)
  .put(protect(Host), updateHostProfile);

export default router;
