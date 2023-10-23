// notificationRoutes.js
import express from "express";
import {
  getAllNotifications,
  getNotificationById,
  createNotification,
  updateNotification,
  deleteNotification,
} from "../controllers/notificationController.js";
import { protect } from "../middleware/authMiddleware.js";

const router = express.Router();

router.route("/").get(getAllNotifications).post(protect, createNotification);

router
  .route("/:notificationId")
  .get(getNotificationById)
  .put(protect, updateNotification)
  .delete(protect, deleteNotification);

export default router;
