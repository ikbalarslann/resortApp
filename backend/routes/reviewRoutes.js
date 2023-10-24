import express from "express";
import {
  getAllReviews,
  getReviewById,
  createReview,
} from "../controllers/reviewController.js";

const router = express.Router();

router.route("/").get(getAllReviews).post(createReview);

router.get("/:reviewId", getReviewById);

export default router;
