import { useNavigate } from "react-router-dom";

export default function LandingPage() {
  const navigate = useNavigate();

  const features = [
    {
      title: "Smart Chat",
      description: "Engage in intelligent conversations with your AI assistant",
    },
    {
      title: "Reminders",
      description: "Never miss important tasks with smart reminder system",
    },
    {
      title: "AI Powered",
      description: "Advanced AI helps you manage your life easily",
    },
  ];

  return (
    <div style={styles.page}>
      
      {/* Header */}
      <div style={styles.header}>
        <h2>BlueMind AI</h2>
        <button onClick={() => navigate("/login")} style={styles.loginBtn}>
          Login
        </button>
      </div>

      {/* Hero */}
      <div style={styles.hero}>
        <h1 style={styles.title}>Your AI Assistant</h1>
        <p style={styles.subtitle}>
          Manage your tasks, chat, and stay organized with AI
        </p>

        <div style={styles.buttons}>
          <button
            style={styles.primaryBtn}
            onClick={() => navigate("/register")}
          >
            Get Started
          </button>

          <button
            style={styles.secondaryBtn}
            onClick={() => navigate("/login")}
          >
            Login
          </button>
        </div>
      </div>

      {/* Features */}
      <div style={styles.features}>
        {features.map((f, i) => (
          <div key={i} style={styles.card}>
            <h3>{f.title}</h3>
            <p>{f.description}</p>
          </div>
        ))}
      </div>

    </div>
  );
}


  