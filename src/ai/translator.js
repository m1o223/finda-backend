import { askAI } from "./openaiParser.js"

export async function translateText(message) {

  const prompt = `
Translate the following text to English.
Return ONLY the translated sentence.

Text:
${message}
`

  const result = await askAI(prompt)

  if (!result) return ""

  return result

}