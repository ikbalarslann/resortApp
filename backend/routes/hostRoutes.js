import express from "express";
import {
  getAllHosts,
  getHostById,
  createHost,
  updateHost,
  deleteHost,
} from "../controllers/hostController.js";
import { protect } from "../middleware/authMiddleware.js";

const router = express.Router();

router.route("/").get(getAllHosts).post(protect, createHost);

router
  .route("/:hostId")
  .get(getHostById)
  .put(protect, updateHost)
  .delete(protect, deleteHost);

export default router;
