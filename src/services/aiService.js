import OpenAI from "openai"

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY
})

export async function askAI(messages) {

const completion = await openai.chat.completions.create({
  model: "gpt-4o-mini",
  temperature: 0.7,
  messages: [
    { role: "user", content: messages }
  ]
})

  return completion.choices[0].message.content
}