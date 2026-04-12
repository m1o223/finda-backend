import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./Settings.css";

export default function Settings() {
  const navigate = useNavigate();

  const [language, setLanguage] = useState("English");
  const [email, setEmail] = useState("gmail@domain.com");
  const [password, setPassword] = useState("");

  const handleLogout = () => {
    localStorage.clear();
    navigate("/login");
  };

  return (
    <div className="settings">
      
      <div className="settings-header">
        <span className="back" onClick={() => navigate(-1)}>←</span>
        <h1>Settings</h1>
      </div>

      <div className="settings-card">

<select
  value={language}
  onChange={(e) => setLanguage(e.target.value)}
  className="custom-select"
>
  <option value="English">English</option>
  <option value="Arabic">Arabic</option>
  <option value="Swedish">Swedish</option>
</select>

        <label>Email</label>
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />

        <label>New Password</label>
        <input
          type="password"
          placeholder="Enter new password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />

        <button className="save-btn">Save Changes</button>

        <button className="logout-btn" onClick={handleLogout}>
          Logout
        </button>

      </div>

    </div>
  );
}