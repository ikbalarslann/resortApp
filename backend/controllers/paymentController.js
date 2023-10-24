import Payment from "../models/paymentModel.js";
import asyncHandler from "express-async-handler";

// @desc    Fetch all payments
// @route   GET /payments
// @access  Public
const getAllPayments = asyncHandler(async (req, res) => {
  try {
    const payments = await Payment.find();
    res.status(200).json(payments);
  } catch (error) {
    console.error("Error fetching payments:", error);
    res.status(500).send("Internal Server Error");
  }
});

// @desc    Fetch payment by ID
// @route   GET /payments/:paymentId
// @access  Public
const getPaymentById = asyncHandler(async (req, res) => {
  const paymentId = req.params.paymentId;

  try {
    const payment = await Payment.findById(paymentId);

    if (!payment) {
      return res.status(404).json({ message: "Payment not found" });
    }

    res.status(200).json(payment);
  } catch (error) {
    console.error("Error fetching payment by ID:", error);
    res.status(500).send("Internal Server Error");
  }
});

// @desc    Create a new payment
// @route   POST /payments
// @access  Public
const createPayment = asyncHandler(async (req, res) => {
  const { bookingId, amount, status } = req.body;

  try {
    const newPayment = new Payment({ bookingId, amount, status });
    const savedPayment = await newPayment.save();

    res.status(201).json(savedPayment);
  } catch (error) {
    console.error("Error creating payment:", error);
    res.status(500).send("Internal Server Error");
  }
});

// @desc    Update a payment
// @route   PUT /payments/:paymentId
// @access  Public
const updatePayment = asyncHandler(async (req, res) => {
  const paymentId = req.params.paymentId;
  const { bookingId, amount, status } = req.body;

  try {
    const payment = await Payment.findById(paymentId);

    if (!payment) {
      return res.status(404).json({ message: "Payment not found" });
    }

    payment.bookingId = bookingId;
    payment.amount = amount;
    payment.status = status;

    const updatedPayment = await payment.save();

    res.status(200).json(updatedPayment);
  } catch (error) {
    console.error("Error updating payment:", error);
    res.status(500).send("Internal Server Error");
  }
});

// @desc    Delete a payment
// @route   DELETE /payments/:paymentId
// @access  Public
const deletePayment = asyncHandler(async (req, res) => {
  const paymentId = req.params.paymentId;

  try {
    const payment = await Payment.findById(paymentId);

    if (!payment) {
      return res.status(404).json({ message: "Payment not found" });
    }

    await payment.deleteOne();
    res.status(204).send();
  } catch (error) {
    console.error("Error deleting payment:", error);
    res.status(500).send("Internal Server Error");
  }
});

export {
  getAllPayments,
  getPaymentById,
  createPayment,
  updatePayment,
  deletePayment,
};
