// chatApi.js

// ===============================
// SEND MESSAGE TO AI
// ===============================

export async function sendMessage(message) {
  try {

    const res = await fetch("http://localhost:3000/api/chat", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        message: message
      })
    })

    if (!res.ok) {
      throw new Error("Server error")
    }

    const data = await res.json()

    return data

  } catch (error) {
    console.error("Chat API Error:", error)
    return {
      error: "Failed to contact AI server"
    }
  }
}