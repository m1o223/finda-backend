// src/ai/lifeEngine.js

import { detectLanguage } from "./languageDetector.js"
import { classifyIntent } from "./intentClassifier.js"
import { extractTime } from "./timeExtractor.js"

export async function processLifeCommand(message, userId) {

  const language = detectLanguage(message)

  const intent = await classifyIntent(message)

  const time = extractTime(message)

  return {
    intent,
    time,
    language
  }

}