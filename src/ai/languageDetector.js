// ===== #DETECT_LANGUAGE =====
export function detectLanguage(text) {
  if (!text || typeof text !== "string") {
    return "en"
  }

  const trimmed = text.trim()

  if (!trimmed) {
    return "en"
  }

  // ===== #ARABIC_DETECTION =====
  const arabicRegex = /[\u0600-\u06FF]/
  if (arabicRegex.test(trimmed)) {
    return "ar"
  }

  // ===== #SWEDISH_DETECTION =====
  const swedishWords = [
    "hej",
    "jag",
    "är",
    "och",
    "det",
    "inte",
    "kan",
    "hjälp",
    "påminn",
    "mig"
  ]

  const lower = trimmed.toLowerCase()

  for (const word of swedishWords) {
    if (lower.includes(word)) {
      return "sv"
    }
  }

  // ===== #SPANISH_DETECTION =====
  const spanishWords = [
    "hola",
    "gracias",
    "estudiar",
    "recuérdame",
    "mañana",
    "por favor"
  ]

  for (const word of spanishWords) {
    if (lower.includes(word)) {
      return "es"
    }
  }

  // ===== #FINNISH_DETECTION =====
  const finnishWords = [
    "hei",
    "muistuta",
    "huomenna",
    "opiskele",
    "kiitos"
  ]

  for (const word of finnishWords) {
    if (lower.includes(word)) {
      return "fi"
    }
  }

  // ===== #DEFAULT_LANGUAGE =====
  return "en"
}