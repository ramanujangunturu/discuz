import { Routes, Route } from "react-router-dom";
import { useState } from "react";
import Signup from "../components/Signup.jsx";
import Login from "../components/Login.jsx";
import Home from "../components/Home.jsx";
import Profile from "../components/Profile.jsx";
import Chat from "../components/Chat.jsx";
import Discussion from "../components/Discussion.jsx";
import Navbar from "../components/Navbar.jsx";
import UpdateProfile from "../components/UpdateProfile.jsx";
import Post from "../components/Post.jsx";
import PrivateChat from "../components/PrivateChat.jsx";
import "./index.css";


function App() {
  const [socket, setSocket] = useState(null);
  const [connectedUsers, setConnectedUsers] = useState([]);
  
  const socketSetter = (socket) => {
    setSocket(socket);
    // console.log(socket.userID, "socket");
  };
  const userSetter = (users) => {
    setConnectedUsers(users);
  }



  return (
    <>
      <Routes>
        <Route path="/signup" element={<Signup />} />
        <Route path="/login" element={<Login />} />
        <Route path="/" element={<Login />} />
        <Route path="/dashboard" element={<Navbar socketSetter={socketSetter} userSetter={userSetter} />}>
          <Route index element={<Home />} />
          <Route path=":username/profile" element={<Profile />} />
          <Route path="discussion" element={<Discussion />} />
          <Route path="discuz/:postId" element={<Post />} />
          <Route path="chat/:username" element={<PrivateChat socket={socket} />} />
          <Route path="chat" element={<Chat socket={socket}/>} />
        </Route>
        <Route path="updateProfile" element={<UpdateProfile />} />
      </Routes>
    </>
  );
}

export default App;
