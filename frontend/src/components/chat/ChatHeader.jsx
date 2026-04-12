import "./ChatHeader.css"

export default function ChatHeader({ toggleSidebar }) {
  return (
    <div className="chat-header">

      <button
        className="menu-toggle"
        onClick={toggleSidebar}
      >
        ☰
      </button>

      <div className="logo-text">
        BlueMind AI
      </div>

    </div>
  )
}