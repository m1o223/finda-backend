import { BrowserRouter, Routes, Route } from "react-router-dom";

import Intro from "./pages/Intro/Intro";
import AuthChoice from "./pages/AuthChoice/AuthChoice";
import Login from "./pages/Login/Login";
import Register from "./pages/Register/Register";
import Landing from "./pages/Landing/Landing";
import Chat from "./pages/Chat/Chat";
import Reminders from "./pages/Reminders";
import Settings from "./pages/settings/Settings"
import Feedback from "./pages/Feedback/Feedback";




function App() {

return (

<BrowserRouter>

<Routes>

<Route path="/" element={<Intro />} />

<Route path="/landing" element={<Landing />} />

<Route path="/auth" element={<AuthChoice />} />

<Route path="/login" element={<Login />} />

<Route path="/register" element={<Register />} />

<Route path="/chat" element={<Chat />} />

<Route path="/reminders" element={<Reminders />} />

<Route path="/feedback" element={<Feedback />} />

<Route path="/settings" element={<Settings/>}/>

</Routes>

</BrowserRouter>

);

}

export default App;