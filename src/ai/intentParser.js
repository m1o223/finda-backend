export function parseIntent(message) {

  const text = message.toLowerCase()

  const reminderWords = [

    "ذكرني",
    "تذكير",
    "موعد",
    "remind",
    "reminder",
    "appointment"

  ]

  for (let word of reminderWords) {

    if (text.includes(word)) {
      return "reminder"
    }

  }

  return "chat"

}