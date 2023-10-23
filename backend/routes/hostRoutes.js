import express from "express";
import {
  authHost,
  registerHost,
  logoutHost,
  getHostProfile,
  updateHostProfile,
} from "../controllers/HostController.js";
import { protect } from "../middleware/authMiddleware.js";

const router = express.Router();

router.post("/", registerHost);
router.post("/auth", authHost);
router.post("/logout", logoutHost);
router
  .route("/profile")
  .get(protect, getHostProfile)
  .put(protect, updateHostProfile);

export default router;
