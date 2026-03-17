import express from "express"
import { chatController, getChats } from "../controllers/chatController.js"

const router = express.Router()

// send message
router.post("/", chatController)

// chat history
router.get("/history", getChats)

export default router