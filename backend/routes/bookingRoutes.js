import express from "express";
import {
  getAllBookings,
  getBookingById,
  createBooking,
  updateBooking,
  deleteBooking,
} from "../controllers/bookingController.js";
import { protect } from "../middleware/authMiddleware.js";

const router = express.Router();

router.route("/").get(getAllBookings).post(protect, createBooking);

router
  .route("/:bookingId")
  .get(getBookingById)
  .put(protect, updateBooking)
  .delete(protect, deleteBooking);

export default router;
