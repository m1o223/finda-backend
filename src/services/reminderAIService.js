// ===== #IMPORTS =====
import { parseIntent } from "../ai/intentParser.js"
import { extractTime } from "../ai/timeExtractor.js"
import Reminder from "../models/reminderModel.js"

// ===== #HANDLE_AI_MESSAGE =====
export async function handleAIMessage(userId, message) {
  try {
    // ===== #DETECT_INTENT =====
    const intent = parseIntent(message)

    if (intent !== "reminder") {
      return null
    }

    // ===== #EXTRACT_TIME =====
    const time = extractTime(message)

    if (!time) {
      return {
        message: "I understood that you want a reminder, but I could not detect the time."
      }
    }

    // ===== #CREATE_REMINDER =====
    const reminder = await Reminder.create({
      user: userId,
      text: message,
      time: time
    })

    // ===== #RETURN_SUCCESS =====
    return {
      message: "Reminder created successfully.",
      reminder
    }

  } catch (error) {
    console.error("Reminder AI Error:", error)

    return {
      message: "An error occurred while creating the reminder."
    }
  }
}