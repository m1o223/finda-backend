import { processAI } from "../ai/aiBrain.js"
import ChatMemory from "../models/ChatMemory.js"

// ================================
// SEND MESSAGE TO AI
// ================================
export const chatController = async (req, res) => {
  try {
    const { message } = req.body

    if (!message) {
      return res.status(400).json({
        error: "Message is required"
      })
    }

    // ================================
    // SAVE USER MESSAGE
    // ================================
    await ChatMemory.create({
      role: "user",
      message: message
    })

    // ================================
    // PROCESS AI
    // ================================
    const aiResponse = await processAI(message)

    const aiText =
      aiResponse?.reply ||
      aiResponse?.response ||
      aiResponse?.message ||
      "No response from AI"

    // ================================
    // SAVE AI RESPONSE
    // ================================
    await ChatMemory.create({
      role: "assistant",
      message: aiText
    })

    // ================================
    // RESPONSE TO FRONTEND
    // ================================
    return res.json({
      reply: aiText
    })
  } catch (error) {
    console.error("Chat Error:", error)

    res.status(500).json({
      error: "AI server error"
    })
  }
}

// ================================
// GET CHAT HISTORY
// ================================
export const getChats = async (req, res) => {
  try {
    const chats = await ChatMemory.find().sort({ createdAt: 1 })

    res.json(chats)
  } catch (error) {
    console.error("GetChats Error:", error)

    res.status(500).json({
      error: "Failed to fetch chats"
    })
  }
}