import express from "express";
import {
  authUser,
  registerUser,
  logoutUser,
  getUserProfile,
  updateUserProfile,
  getAllUsers,
} from "../controllers/userController.js";
import { protect } from "../middleware/authMiddleware.js";
import User from "../models/userModel.js";

const router = express.Router();

router.post("/", registerUser);
router.get("/", getAllUsers);
router.post("/auth", authUser);
router.post("/logout", logoutUser);

router
  .route("/profile")
  .get(protect(User), getUserProfile)
  .put(protect(User), updateUserProfile);

export default router;
