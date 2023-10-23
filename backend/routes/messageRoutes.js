// messageRoutes.js
import express from "express";
import {
  getAllMessages,
  getMessageById,
  createMessage,
  updateMessage,
  deleteMessage,
} from "../controllers/messageController.js";
import { protect } from "../middleware/authMiddleware.js";

const router = express.Router();

router.route("/").get(getAllMessages).post(protect, createMessage);

router
  .route("/:messageId")
  .get(getMessageById)
  .put(protect, updateMessage)
  .delete(protect, deleteMessage);

export default router;
