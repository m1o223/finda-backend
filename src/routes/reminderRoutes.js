import express from "express";

import {
  createReminder,
  getReminders,
  deleteReminder,
  updateReminder
} from "../controllers/reminderController.js"

import { protect } from "../middlewares/authMiddleware.js"

const router = express.Router()

router.post("/", protect, createReminder)
router.get("/", protect, getReminders)
router.put("/:id", protect, updateReminder)
router.delete("/:id", protect, deleteReminder)

export default router