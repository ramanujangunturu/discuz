import DisplayFriends from "./DisplayFriends";
import { useEffect, useState } from "react";
import axios from "axios";

const Chat = ({socket}) => {
  
  const [friends, setFriends] = useState([]);
  
  useEffect(() => {
    axios
      .get(
        `http://localhost:5000/userData/${sessionStorage.getItem("username")}`
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
