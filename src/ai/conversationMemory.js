import AIMemory from "../models/aiMemoryModel.js"

export async function addToMemory(userId, role, content) {

  await AIMemory.create({
    user: userId,
    role,
    content
  })

  // keep only last 10 messages
  const messages = await AIMemory
    .find({ user: userId })
    .sort({ createdAt: -1 })

  if (messages.length > 10) {

    const extra = messages.slice(10)

    for (const msg of extra) {
      await msg.deleteOne()
    }

  }

}

export async function getMemory(userId) {

  const messages = await AIMemory
    .find({ user: userId })
    .sort({ createdAt: 1 })

  return messages.map(m => ({
    role: m.role,
    content: m.content
  }))

}