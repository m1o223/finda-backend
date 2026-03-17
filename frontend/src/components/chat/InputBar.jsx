import { useState, useRef } from "react"
import "./InputBar.css"
import { Plus, SendHorizontal } from "lucide-react"

export default function InputBar({ center, sendMessage, setOpen }) {

  const [message, setMessage] = useState("")
  const textareaRef = useRef(null)

  function handleSend() {

    if (!message.trim()) return

    sendMessage(message)
    setMessage("")

    if (textareaRef.current) {
      textareaRef.current.style.height = "auto"
    }

  }

  function handleChange(e) {

    setMessage(e.target.value)

    if (setOpen) setOpen(false)

    if (textareaRef.current) {
      textareaRef.current.style.height = "auto"
      textareaRef.current.style.height =
        textareaRef.current.scrollHeight + "px"
    }

  }

  function handleKeyDown(e) {

    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault()
      handleSend()
    }

  }

  return (

    <div className={`chat-input-wrapper ${center ? "center" : "bottom"}`}>

      <button className="plus-btn">
        <Plus size={18} />
      </button>

      <textarea
        ref={textareaRef}
        placeholder="Ask anything..."
        value={message}
        onChange={handleChange}
        onKeyDown={handleKeyDown}
        rows={1}
      />

      <button className="send-btn" onClick={handleSend}>
        <SendHorizontal size={18} />
      </button>

    </div>

  )

}