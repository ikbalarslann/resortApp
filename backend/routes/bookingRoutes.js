import express from "express";
import {
  getAllBookings,
  getBookingById,
  createBooking,
  updateBooking,
  deleteBooking,
} from "../controllers/bookingController.js";

const router = express.Router();

router.route("/").get(getAllBookings).post(createBooking);

router
  .route("/:bookingId")
  .get(getBookingById)
  .put(updateBooking)
  .delete(deleteBooking);

export default router;
