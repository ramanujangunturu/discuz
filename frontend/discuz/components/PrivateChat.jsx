import { useEffect, useState } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";

const PrivateChat = ({ socket }) => {
  const [message, setMessage] = useState("");
  const [texts, setTexts] = useState([]);
  const [reciverID, setReciverID] = useState("");
  const { username } = useParams();
  useEffect(() => {
    console.log(sessionStorage.getItem("username"));
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
      return;
    }
    // console.log(texts);
    socket.on("private message", (recievedMessage, username) => {
      setTexts((texts)=>[...texts, recievedMessage]);
    });
  }, [socket]);

  const handleClick = () => {
    socket.emit("private message", message, reciverID, sessionStorage.getItem("username"));
    setTexts((texts)=>[...texts, message]);
    setMessage("");
  };

  const renderingTexts = texts.map((text) => {
    return <p key={crypto.randomUUID()}> {text} </p>;
  });
  if (!reciverID) return <h1>Loading...</h1>;
  return (
    <>
      {renderingTexts}
      <form onSubmit={(e) => e.preventDefault()}>
        <input
          type="text"
          value={message}
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
