import { useEffect, useState } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";

const PrivateChat = ({ socket }) => {
  const [message, setMessage] = useState("");
  const [reciverID, setReciverID] = useState("");
  const { username } = useParams();
  useEffect(() => {
    axios
      .get(`http://localhost:5000/chat/getSocket/${username}`)
      .then((res) => {
        // console.log(res.data.userID, "response");
        setReciverID(res.data.userID);
      });
  }, []);

  useEffect(() => {
    // console.log(socket);
    if (socket == null) {
      // console.log("socket");
      return;
    }
    socket.on("private message", (recievedMessage, username) => {
      setMessage(recievedMessage);
    });
  }, [socket]);

  const handleClick = () => {
    socket.emit("private message", { content: message, to: reciverID });
  };

  if (!reciverID) return <h1>Loading...</h1>;

  return (
    <>
      {message}
      <form onSubmit={(e)=>e.preventDefault()}>
        <input
          type="text"
          style={{ margin: "20px", padding: "5px" }}
          onChange={(e) => setMessage(e.target.value)}
        />
        <button type="submit" style={{ padding: "5px" }} onClick={handleClick}>
          send
        </button>
      </form>
    </>
  );
};

export default PrivateChat;
