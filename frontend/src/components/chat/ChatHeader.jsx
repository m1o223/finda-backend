import "./ChatHeader.css";

export default function ChatHeader({ toggleSidebar }) {

  return (
    <div className="chat-header">

      <button
        className="menu-toggle"
        onClick={toggleSidebar}
      >
        ☰
      </button>

      <h1>BlueMind AI</h1>

    </div>
  );

}