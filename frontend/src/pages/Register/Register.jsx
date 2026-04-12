import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { auth } from "../../config/firebase";
import { getReminders, createReminder } from "../../api/remindersApi.js";

export default function Register() {
  const navigate = useNavigate();

  const [reminders, setReminders] = useState([]);

  const [form, setForm] = useState({
    title: "",
    description: "",
    date: "",
    time: ""
  });

  // ✅ أضفنا state للتسجيل
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged(async (user) => {
      if (!user) {
        navigate("/login");
        return;
      }

      try {
        const token = await user.getIdToken(true);
        const data = await getReminders(token);
        setReminders(data);
      } catch (error) {
        console.error(error);
      }
    });

    return () => unsubscribe();
  }, [navigate]);

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value
    });
  };

  const handleCreateReminder = async () => {
    try {
      const user = auth.currentUser;
      if (!user) return;

      const token = await user.getIdToken(true);
      const reminder = await createReminder(form, token);

      setReminders([...reminders, reminder]);
    } catch (error) {
      console.error(error);
    }
  };

  // ✅ الدالة الناقصة (سبب الكراش)
  const handleRegister = async () => {
    try {
      if (password !== confirmPassword) {
        alert("Passwords do not match");
        return;
      }

      const res = await fetch("http://localhost:3000/api/auth/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          name,
          email,
          password
        })
      });

      const data = await res.json();

      if (!res.ok) {
        alert(data.message || "Register failed");
        return;
      }

      alert("Account created successfully!");
      navigate("/login");
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="login">
      <div className="login-header">
        <span className="back" onClick={() => navigate(-1)}>←</span>
        <h2>Create Account</h2>
      </div>

      <div className="login-container">
        <input
          className="input"
          placeholder="Name"
          onChange={(e) => setName(e.target.value)}
        />

        <input
          className="input"
          placeholder="Email"
          onChange={(e) => setEmail(e.target.value)}
        />

        <input
          className="input"
          type="password"
          placeholder="Password"
          onChange={(e) => setPassword(e.target.value)}
        />

        <input
          className="input"
          type="password"
          placeholder="Confirm Password"
          onChange={(e) => setConfirmPassword(e.target.value)}
        />

        {/* ✅ التعديل هون */}
        <button className="login-btn" onClick={handleRegister}>
          Sign Up
        </button>

        <p className="signup">
          Already have an account?
          <span onClick={() => navigate("/login")}>
            Login
          </span>
        </p>
      </div>
    </div>
  );
}