import "./feedback.css"

export default function Feedback() {
  return (
    <div className="wrapper">
      <div className="card">

        <div className="icon">💬</div>

        <h1>Share Feedback</h1>
        <p className="sub">Help us make BlueMind AI even better</p>

        <p className="label">How would you rate your experience?</p>

        <div className="stars">
          {Array(5).fill().map((_,i)=>(
            <span key={i}>☆</span>
          ))}
        </div>

        <p className="label">What type of feedback?</p>

        <div className="types">
          <button className="active">Suggestion</button>
          <button>Bug Report</button>
          <button>Praise</button>
        </div>

        <input placeholder="Your name" />
        <input placeholder="your@email.com" />
        <textarea placeholder="Tell us what you think..." />

        <button className="submit">Submit Feedback</button>

        <p className="footer">
          Your feedback helps us improve BlueMind AI for everyone.
        </p>

      </div>
    </div>
  )
}
