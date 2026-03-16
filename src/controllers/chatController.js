import { processAI } from "../ai/aiBrain.js"

export const chatController = async (req, res) => {

  try {

    const { message } = req.body

    if (!message) {
      return res.status(400).json({
        error: "Message is required"
      })
    }

    const aiResponse = await processAI(message)

    
    return res.json({
   reply: aiResponse
  })

  } catch (error) {

    console.error("Chat Error:", error)

    res.status(500).json({
      error: "AI server error"
    })

  }

}