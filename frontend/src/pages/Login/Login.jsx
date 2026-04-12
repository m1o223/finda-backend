import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./Login.css";


import { auth } from "../../config/firebase";
import { GoogleAuthProvider, signInWithPopup } from "firebase/auth";

export default function Login() {
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const API = "http://localhost:3000/api/auth/login";


  
  async function handleLogin(e) {
    e.preventDefault();

    try {
      const res = await fetch(API, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email,
          password,
        }),
      });

      const data = await res.json();

      if (!res.ok) {
        alert(data.message || "Login failed");
        return;
      }

      // حفظ التوكن
      localStorage.setItem("token", data.token);

      // تحويل لصفحة الشات
      navigate("/chat");
    } catch (err) {
      console.error(err);
      alert("Something went wrong");
    }
  }

  return (
    <div className="login">
      
      <div className="login-header">
        <span className="back" onClick={() => navigate("/auth")}>
  ←
</span>
        <h1>Login</h1>
      </div>

      <form className="login-container" onSubmit={handleLogin}>
        
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />

        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />

        <div className="forgot">
          Forgot password? <span>Reset</span>
        </div>

        <button type="submit" className="login-btn">
          Login
        </button>

        <button type="button" className="google-btn">
          Continue with Google
        </button>

       <div className="signup">
  Don’t have an account?
  <span onClick={() => navigate("/register")}> Sign up</span>
</div>

      </form>

    </div>
  );
}