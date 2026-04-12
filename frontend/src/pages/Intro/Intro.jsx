import "./Intro.css";
import { useNavigate } from "react-router-dom";

export default function Intro() {

  const navigate = useNavigate();

  return (
    <div className="intro">

      <div className="intro-container">

        <h1 className="title">
     <span>BlueMind AI</span>
</h1>

        <p>
          Welcome to BlueMind AI. Your intelligent assistant powered by AI.
        </p>

        <button
          className="start-btn"
          onClick={() => navigate("/auth")}
        >
          Get Started
        </button>

      </div>

    </div>
  );
}