import "./AuthChoice.css";
import { useNavigate } from "react-router-dom";
import { FaApple } from "react-icons/fa";
import { FcGoogle } from "react-icons/fc";

import { auth } from "../../config/firebase";
import { GoogleAuthProvider, signInWithPopup } from "firebase/auth";

export default function AuthChoice() {

const navigate = useNavigate();

const loginWithGoogle = async () => {

const provider = new GoogleAuthProvider();

try {

const result = await signInWithPopup(auth, provider);

const user = result.user;

console.log(user);

navigate("/chat");

} catch (error) {

console.log(error);

}

};

return (

<div className="auth">

<div className="auth-container">


<h1 className="title">
BlueMind <span>AI</span>
</h1>

<p className="subtitle">
Sign in to continue your journey
</p>

<button className="btn apple">
<span className="btn-content">
<FaApple className="icon apple-icon"/>
<span>Continue with Apple</span>
<span className="soon-text">Coming soon</span>
</span>
</button>

<button className="btn google" onClick={loginWithGoogle}>
<span className="btn-content">
<FcGoogle className="icon google-icon"/>
<span>Continue with Google</span>
</span>
</button>

<button className="btn email" onClick={() => navigate("/login")}>
Continue with Email
</button>

</div>
</div>

);

}