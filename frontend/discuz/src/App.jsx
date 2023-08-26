import { Routes, Route } from "react-router-dom";
import Signup from "../components/Signup.jsx";
import Login from "../components/Login.jsx";
import Home from "../components/Home.jsx";
import Profile from "../components/Profile.jsx";
import Chat from "../components/Chat.jsx";
import Discussion from "../components/Discussion.jsx";
import Navbar from "../components/Navbar.jsx";

function App() {
  return (
    <>
      <Routes>
        <Route path="/signup" element={<Signup />} />
        <Route path="/login" element={<Login />} />
        <Route path="/home" element={<Navbar />}>
          <Route index element={<Home />} />
          <Route path="profile" element={<Profile />} />
          <Route path="chat" element={<Chat />} />
          <Route path="discussion" element={<Discussion />} />
        </Route>
      </Routes>
    </>
  );
}

export default App;
