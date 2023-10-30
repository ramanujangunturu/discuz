import { useEffect, useState } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";

const PrivateChat = ({ socket }) => {
  const [message, setMessage] = useState("");
  const [texts, setTexts] = useState([]);
  const [chats, setChats] = useState([]);
  const [reciverID, setReciverID] = useState("");
  const { username } = useParams();
  useEffect(() => {
    console.log(sessionStorage.getItem("username"));
    axios
      .get(
        `http://localhost:5000/chat/getDetails?username=${username}&username2=${sessionStorage.getItem(
          "username"
        )}`
      )
      .then((res) => {
        console.log(res.data, "response");
        setReciverID(res.data.userID);
        // if(res.data.) return;
        if (res.data.Chats == null) return;
          setTexts(res.data.Chats.chats.map((chat) => chat.message));
      });
  }, []);

  useEffect(() => {
    if (socket == null) {
      return;
    }
    socket.on("private message", (recievedMessage, usernam) => {
      if (username === usernam) {
        setTexts((texts) => [...texts, recievedMessage]);
      } else {
        console.log("not the same user");
      }
    });
  }, [socket]);

  const handleClick = () => {
    socket.emit(
      "private message",
      message,
      reciverID,
      sessionStorage.getItem("username"),
      username
    );
    console.log(reciverID);
    setTexts((texts) => [...texts, message]);
    setMessage("");
  };

  const renderingTexts = texts.map((text) => {
    return <p key={crypto.randomUUID()}> {text} </p>;
  });
  
  if (!reciverID || !texts) return <h1>Loading...</h1>;
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
