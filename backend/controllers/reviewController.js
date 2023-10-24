import Review from "../models/reviewModel.js";
import asyncHandler from "express-async-handler";

const getAllReviews = asyncHandler(async (req, res) => {
  try {
    const reviews = await Review.find();
    res.status(200).json(reviews);
  } catch (error) {
    console.error("Error fetching reviews:", error);
    res.status(500).send("Internal Server Error");
  }
});

const getReviewById = asyncHandler(async (req, res) => {
  const reviewId = req.params.reviewId;

  try {
    const review = await Review.findById(reviewId);

    if (!review) {
      return res.status(404).json({ message: "Review not found" });
    }

    res.status(200).json(review);
  } catch (error) {
    console.error("Error fetching review by ID:", error);
    res.status(500).send("Internal Server Error");
  }
});

const createReview = asyncHandler(async (req, res) => {
  const { userId, propertyId, rating } = req.body;

  try {
    const newReview = new Review({ userId, propertyId, rating });
    const savedReview = await newReview.save();

    res.status(201).json(savedReview);
  } catch (error) {
    console.error("Error creating review:", error);
    res.status(500).send("Internal Server Error");
  }
});

export { getAllReviews, getReviewById, createReview };
