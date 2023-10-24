import express from "express";
import {
  getAllPayments,
  getPaymentById,
  createPayment,
  updatePayment,
  deletePayment,
} from "../controllers/paymentController.js";

const router = express.Router();

router.route("/").get(getAllPayments).post(createPayment);

router
  .route("/:paymentId")
  .get(getPaymentById)
  .put(updatePayment)
  .delete(deletePayment);

export default router;
