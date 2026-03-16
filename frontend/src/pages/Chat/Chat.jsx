import { useState, useEffect } from "react"
import Sidebar from "../../components/chat/Sidebar"
import ChatHeader from "../../components/chat/ChatHeader"
import InputBar from "../../components/chat/InputBar"
import Messages from "../../components/chat/Messages"
import { sendMessage as sendMessageAPI } from "../../api/chatApi"
import "./Chat.css"

export default function Chat() {
  const [messages, setMessages] = useState([])
  const [sidebarOpen, setSidebarOpen] = useState(true)

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth < 900) {
        setSidebarOpen(false)
      } else {
        setSidebarOpen(true)
      }
    }

    handleResize()
    window.addEventListener("resize", handleResize)

    return () => window.removeEventListener("resize", handleResize)
  }, [])

  async function sendMessage(text) {
    if (!text.trim()) return

    const newMessage = {
      role: "user",
      content: text,
    }

    setMessages((prev) => [...prev, newMessage])

    try {
      const res = await sendMessageAPI(text)

      const aiReply =
        res?.reply?.reply ||
        res?.reply ||
        res?.response ||
        res?.message ||
        res?.content ||
        "No response from AI"

      const aiMessage = {
        role: "assistant",
        content: aiReply,
      }

      setMessages((prev) => [...prev, aiMessage])
    } catch (error) {
      console.error("AI Error:", error)

      const errorMessage = {
        role: "assistant",
        content: "صار خطأ أثناء جلب رد الذكاء الاصطناعي.",
      }

      setMessages((prev) => [...prev, errorMessage])
    }
  }

  return (
    <div className="chatPage">
      {sidebarOpen && (
        <Sidebar open={sidebarOpen} setOpen={setSidebarOpen} />
      )}

      <div className="chatMain">
        <ChatHeader toggleSidebar={() => setSidebarOpen(!sidebarOpen)} />

        {messages.length === 0 ? (
          <InputBar center={true} sendMessage={sendMessage} />
        ) : (
          <>
            <Messages messages={messages} />
            <InputBar center={false} sendMessage={sendMessage} />
          </>
        )}
      </div>
    </div>
  )
}