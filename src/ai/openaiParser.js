import OpenAI from "openai"
import { aiPersonality } from "./aiPersonality.js"

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY
})

export async function askAI(message){

const response = await openai.chat.completions.create({

model: "gpt-4o-mini",

messages: [
{
role: "system",
content: aiPersonality
},
{
role: "user",
content: message
}
]

})

return response.choices?.[0]?.message?.content || "AI did not respond"

}