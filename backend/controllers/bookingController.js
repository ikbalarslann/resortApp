import Booking from "../models/bookingModel.js";
import asyncHandler from "express-async-handler";

// @desc    Get all bookings
// @route   GET /api/bookings
// @access  Public
const getAllBookings = asyncHandler(async (req, res) => {
  try {
    const bookings = await Booking.find();
    res.status(200).json(bookings);
  } catch (error) {
    console.error("Error fetching bookings:", error);
    res.status(500).send("Internal Server Error");
  }
});

// @desc    Get a booking by ID
// @route   GET /api/bookings/:bookingId
// @access  Public
const getBookingById = asyncHandler(async (req, res) => {
  const bookingId = req.params.bookingId;

  try {
    const booking = await Booking.findById(bookingId);

    if (!booking) {
      return res.status(404).json({ message: "Booking not found" });
    }

    res.status(200).json(booking);
  } catch (error) {
    console.error("Error fetching booking by ID:", error);
    res.status(500).send("Internal Server Error");
  }
});

// @desc    Create a new booking
// @route   POST /api/bookings
// @access  Public
const createBooking = asyncHandler(async (req, res) => {
  const { userId, propertyId, status } = req.body;

  try {
    const newBooking = new Booking({ userId, propertyId, status });
    const savedBooking = await newBooking.save();

    res.status(201).json(savedBooking);
  } catch (error) {
    console.error("Error creating booking:", error);
    res.status(500).send("Internal Server Error");
  }
});

// @desc    Update a booking
// @route   PUT /api/bookings/:bookingId
// @access  Public
const updateBooking = asyncHandler(async (req, res) => {
  const bookingId = req.params.bookingId;
  const { userId, propertyId, status } = req.body;

  try {
    const booking = await Booking.findById(bookingId);

    if (!booking) {
      return res.status(404).json({ message: "Booking not found" });
    }

    booking.userId = userId;
    booking.propertyId = propertyId;
    booking.status = status;

    const updatedBooking = await booking.save();

    res.status(200).json(updatedBooking);
  } catch (error) {
    console.error("Error updating booking:", error);
    res.status(500).send("Internal Server Error");
  }
});

// @desc    Delete a booking
// @route   DELETE /api/bookings/:bookingId
// @access  Public
const deleteBooking = asyncHandler(async (req, res) => {
  const bookingId = req.params.bookingId;

  try {
    const booking = await Booking.findById(bookingId);

    if (!booking) {
      return res.status(404).json({ message: "Booking not found" });
    }

    await booking.deleteOne();

    res.status(204).send();
  } catch (error) {
    console.error("Error deleting booking:", error);
    res.status(500).send("Internal Server Error");
  }
});

export {
  getAllBookings,
  getBookingById,
  createBooking,
  updateBooking,
  deleteBooking,
};
