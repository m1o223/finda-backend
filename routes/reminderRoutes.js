// routes/reminderRoutes.js (مسارات_التذكيرات)
const express = require("express");
const router = express.Router();

const authMiddleware = require("../middleware/authMiddleware"); // (التحقق_من_التوكن)

const {
  createReminder,
  getReminders,
  getReminderById,
  updateReminder,
  deleteReminder,
} = require("../controllers/reminderController"); // (متحكم_التذكيرات)

// ✅ Create
router.post("/", authMiddleware, createReminder);

// ✅ Read all
router.get("/", authMiddleware, getReminders);

// ✅ Read one
router.get("/:id", authMiddleware, getReminderById);

// ✅ Update
router.put("/:id", authMiddleware, updateReminder);

// ✅ Delete
router.delete("/:id", authMiddleware, deleteReminder);

module.exports = router;