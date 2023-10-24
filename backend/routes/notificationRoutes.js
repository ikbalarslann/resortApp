import express from "express";
import {
  getAllNotifications,
  getNotificationById,
  createNotification,
  updateNotification,
  deleteNotification,
} from "../controllers/notificationController.js";

const router = express.Router();

router.route("/").get(getAllNotifications).post(createNotification);

router
  .route("/:notificationId")
  .get(getNotificationById)
  .put(updateNotification)
  .delete(deleteNotification);

export default router;
