import express from "express"
import {
 createReminder,
 getReminders,
 getReminderById,
 updateReminder,
 deleteReminder,
 toggleReminder
} from "../controllers/reminderController.js"

import { authMiddleware } from "../middlewares/authMiddleware.js";

const router = express.Router()

router.use(authMiddleware)
router.post("/",createReminder)

router.get("/",getReminders)

router.get("/:id",getReminderById)

router.put("/:id",updateReminder)

router.patch("/:id/toggle",toggleReminder)

router.delete("/:id",deleteReminder)

export default router