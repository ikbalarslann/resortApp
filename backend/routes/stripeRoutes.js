import express from "express";
import { getPayment, createPayment } from "../controllers/stripeController.js";
const router = express.Router();

router.get("/", getPayment);

router.post("/pay", createPayment);

export default router;
