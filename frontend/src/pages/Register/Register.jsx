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

  }, []);




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

return(

<div className="login">

<div className="login-header">
<span className="back" onClick={()=>navigate(-1)}>←</span>
<h2>Create Account</h2>
</div>

<div className="login-container">

<input
className="input"
placeholder="Name"
onChange={(e)=>setName(e.target.value)}
/>

<input
className="input"
placeholder="Email"
onChange={(e)=>setEmail(e.target.value)}
/>

<input
className="input"
type="password"
placeholder="Password"
onChange={(e)=>setPassword(e.target.value)}
/>

<input
className="input"
type="password"
placeholder="Confirm Password"
onChange={(e)=>setConfirmPassword(e.target.value)}
/>

<button className="login-btn" onClick={registerUser}>
Sign Up
</button>

<p className="signup">
Already have an account?
<span onClick={()=>navigate("/login")}>
Login
</span>
</p>

</div>

</div>

);

}