// chatApi.js

// ===============================
// SEND MESSAGE TO AI
// ===============================

export async function sendMessage(message) {
  try {
    const res = await fetch("http://localhost:3000/api/chat", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        message: message,
      }),
    })

    if (!res.ok) {
      throw new Error("Server error")
    }

    const data = await res.json()

    return data
  } catch (error) {
    console.error("Chat API Error:", error)

    return {
      error: "Failed to contact AI server",
    }
  }
}

// ===============================
// GET CHAT HISTORY
// ===============================

export async function getChats() {
  try {
    const res = await fetch("http://localhost:3000/api/chats")

    if (!res.ok) {
      throw new Error("Failed to fetch chats")
    }

    const data = await res.json()

    if (!Array.isArray(data)) {
      return []
    }

    return data
  } catch (error) {
    console.error("GetChats Error:", error)
    return []
  }
}