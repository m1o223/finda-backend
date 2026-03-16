import "./MessageBubble.css"

export default function MessageBubble({ message }) {

  return (
    <div className={message.role === "user" ? "bubble user" : "bubble ai"}>
      {message.content}
    </div>
  )

}