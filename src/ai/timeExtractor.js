export function extractTime(message) {

  const text = message.toLowerCase()

  const hourMatch = text.match(/\b(\d{1,2})(am|pm)?\b/)

  if (!hourMatch) return null

  let hour = parseInt(hourMatch[1])

  if (hourMatch[2] === "pm" && hour < 12) {
    hour += 12
  }

  const date = new Date()

  if (text.includes("tomorrow") || text.includes("بكرا")) {
    date.setDate(date.getDate() + 1)
  }

  date.setHours(hour)
  date.setMinutes(0)

  return date
}