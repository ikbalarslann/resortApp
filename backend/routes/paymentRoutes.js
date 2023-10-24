import express from "express";
import {
  getAllPayments,
  getPaymentById,
  createPayment,
  updatePayment,
  deletePayment,
} from "../controllers/paymentController.js";
import { protect } from "../middleware/authMiddleware.js";

const router = express.Router();

router.route("/").get(getAllPayments).post(protect, createPayment);

router
  .route("/:paymentId")
  .get(getPaymentById)
  .put(protect, updatePayment)
  .delete(protect, deletePayment);

export default router;
