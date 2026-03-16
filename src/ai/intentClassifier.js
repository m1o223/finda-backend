// src/ai/intentClassifier.js

export function classifyIntent(text) {

  const lower = text.toLowerCase()

  if (
    lower.includes("remind") ||
    lower.includes("ذكرني")
  ) {
    return "reminder"
  }

  if (
    lower.includes("task") ||
    lower.includes("مهمة")
  ) {
    return "task"
  }

  return "chat"
}