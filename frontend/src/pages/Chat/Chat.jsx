import { useState, useEffect, useRef } from "react";

import Sidebar from "../../components/chat/Sidebar";
import ChatHeader from "../../components/chat/ChatHeader";
import InputBar from "../../components/chat/InputBar";
import Messages from "../../components/chat/Messages";

import { sendMessage as sendMessageAPI } from "../../api/chatApi";

import "./Chat.css";

export default function Chat() {
  const [messages, setMessages] = useState([]);
  const [chats, setChats] = useState([]);
  const [currentChatId, setCurrentChatId] = useState(null)
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [isThinking, setIsThinking] = useState(false);

  const bottomRef = useRef(null);
  const messagesRef = useRef(null);

  // ================================
  // RESPONSIVE SIDEBAR
  // ================================
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth < 900) {
        setSidebarOpen(false);
      } else {
        setSidebarOpen(true);
      }
    };

    handleResize();
    window.addEventListener("resize", handleResize);

    return () => window.removeEventListener("resize", handleResize);
  }, []);

  // ================================
  // AUTO SCROLL (مثل ChatGPT)
  // ================================
  useEffect(() => {
    if (messagesRef.current) {
      messagesRef.current.scrollTop =
        messagesRef.current.scrollHeight;
    }
  }, [messages, isThinking]);

  // ================================
  // SEND MESSAGE
  // ================================
  async function sendMessage(text) {
    if (!text.trim() || isThinking) return;

    const newMessage = {
      role: "user",
      content: text,
    };

    setMessages((prev) => [...prev, newMessage]);
    setIsThinking(true);

    try {
      const res = await sendMessageAPI(text);

      const aiReply =
        res.reply ||
        res.response ||
        res.message ||
        res.content ||
        "No response from AI";

      const aiMessage = {
        role: "assistant",
        content: aiReply,
      };

      setMessages((prev) => [...prev, aiMessage]);
    } catch (error) {
      console.error("AI Error:", error);

      setMessages((prev) => [
        ...prev,
        {
          role: "assistant",
          content: "Something went wrong, please try again.",
        },
      ]);
    }

    setIsThinking(false);
  }

  // ================================
  // SELECT CHAT FROM HISTORY
  // ================================
  function handleSelectChat(chat) {
    if (!chat || !chat.messages) return;
    setMessages(chat.messages);
  }

  // ================================
  // UI
  // ================================
  return (
    <div className="chatPage">
      {sidebarOpen && (
        <Sidebar
          open={sidebarOpen}
          setOpen={setSidebarOpen}
          onSelectChat={handleSelectChat}
        />
      )}

      <div className="chatMain">
        <ChatHeader
          toggleSidebar={() => setSidebarOpen(!sidebarOpen)}
        />

        {messages.length === 0 && (
          <div className="chat-empty">
            <h2 className="welcome-text">
              How can I help you today?
            </h2>

            <InputBar
              center={true}
              sendMessage={sendMessage}
            />
          </div>
        )}

        {messages.length > 0 && (
          <>
            <div
              className="messages-container"
              ref={messagesRef}
            >
              <Messages messages={messages} />

              {isThinking && (
                <div className="thinking">...</div>
              )}

              <div ref={bottomRef} />
            </div>

            <InputBar
              center={false}
              sendMessage={sendMessage}
            />
          </>
        )}
      </div>
    </div>
  );
}