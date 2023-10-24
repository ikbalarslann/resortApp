import Notification from "../models/notificationModel.js";
import asyncHandler from "express-async-handler";

// @desc    Fetch all notifications
// @route   GET /notifications
// @access  Public
const getAllNotifications = asyncHandler(async (req, res) => {
  try {
    const notifications = await Notification.find();
    res.status(200).json(notifications);
  } catch (error) {
    console.error("Error fetching notifications:", error);
    res.status(500).send("Internal Server Error");
  }
});

// @desc    Fetch notification by ID
// @route   GET /notifications/:notificationId
// @access  Public
const getNotificationById = asyncHandler(async (req, res) => {
  const notificationId = req.params.notificationId;

  try {
    const notification = await Notification.findById(notificationId);

    if (!notification) {
      return res.status(404).json({ message: "Notification not found" });
    }

    res.status(200).json(notification);
  } catch (error) {
    console.error("Error fetching notification by ID:", error);
    res.status(500).send("Internal Server Error");
  }
});

// @desc    Create a new notification
// @route   POST /notifications
// @access  Public
const createNotification = asyncHandler(async (req, res) => {
  const { userId, bookingId, content, status } = req.body;

  try {
    const newNotification = new Notification({
      userId,
      bookingId,
      content,
      status,
    });
    const savedNotification = await newNotification.save();

    res.status(201).json(savedNotification);
  } catch (error) {
    console.error("Error creating notification:", error);
    res.status(500).send("Internal Server Error");
  }
});

// @desc    Update a notification
// @route   PUT /notifications/:notificationId
// @access  Public
const updateNotification = asyncHandler(async (req, res) => {
  const notificationId = req.params.notificationId;
  const { userId, bookingId, content, status } = req.body;

  try {
    const notification = await Notification.findById(notificationId);

    if (!notification) {
      return res.status(404).json({ message: "Notification not found" });
    }

    notification.userId = userId;
    notification.bookingId = bookingId;
    notification.content = content;
    notification.status = status;

    const updatedNotification = await notification.save();

    res.status(200).json(updatedNotification);
  } catch (error) {
    console.error("Error updating notification:", error);
    res.status(500).send("Internal Server Error");
  }
});

// @desc    Delete a notification
// @route   DELETE /notifications/:notificationId
// @access  Public
const deleteNotification = asyncHandler(async (req, res) => {
  const notificationId = req.params.notificationId;

  try {
    const notification = await Notification.findById(notificationId);

    if (!notification) {
      return res.status(404).json({ message: "Notification not found" });
    }

    await notification.deleteOne();
    res.status(204).send();
  } catch (error) {
    console.error("Error deleting notification:", error);
    res.status(500).send("Internal Server Error");
  }
});

export {
  getAllNotifications,
  getNotificationById,
  createNotification,
  updateNotification,
  deleteNotification,
};
