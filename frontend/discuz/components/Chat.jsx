import DisplayFriends from "./DisplayFriends";
import { useEffect, useState } from "react";
import axios from "axios";

const Chat = ({ socket,update }) => {
  const [friends, setFriends] = useState([]);
  const [chats, setChats] = useState([]);
  useEffect(() => {
    axios
      .get(
        `https://trydiscuz.onrender.com/userData/${sessionStorage.getItem("username")}`
      )
      .then((res) => setFriends(res.data.friends))
      .catch((err) => console.log(err));
  }, []);

  return (
    <>
      <DisplayFriends data={friends} socket={socket} />
    </>
  );
};

export default Chat;
