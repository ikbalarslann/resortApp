// reviewRoutes.js
import express from "express";
import {
  getAllReviews,
  getReviewById,
  createReview,
} from "../controllers/reviewController.js";
import { protect } from "../middleware/authMiddleware.js";

const router = express.Router();

router.route("/").get(getAllReviews).post(protect, createReview);

router.get("/:reviewId", getReviewById);

export default router;
