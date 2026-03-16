import { askAI } from "./openaiParser.js"
import { parseIntent } from "./intentParser.js"
import { extractTime } from "./timeExtractor.js"

export async function processAI(message) {

  const intent = parseIntent(message)

  if (intent === "reminder") {

    const time = extractTime(message)

    if (time) {

      return {
        type: "reminder",
        time: time,
        reply: "تم فهم التذكير."
      }

    }

  }

  const aiReply = await askAI(message)

  return {
    type: "chat",
    reply: aiReply
  }

}