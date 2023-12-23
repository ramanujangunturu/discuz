import { useEffect, useState } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";

const PrivateChat = ({ socket }) => {
  const [message, setMessage] = useState("");
  const [texts, setTexts] = useState([{}]);
  const [reciverID, setReciverID] = useState("");
  const { username } = useParams();

  useEffect(() => {
    console.log(sessionStorage.getItem("username"));
    axios
      .get(`http://localhost:5000/chat/getDetails?username=${username}&username2=${sessionStorage.getItem("username")}`)
      .then((res) => {
        console.log(res.data, "response");
        setReciverID(res.data.userID);
        if (res.data.Chats == null) return;
        setTexts(res.data.Chats.chats.map(({sender,message}) => ({sender:sender,message:message})));
      });

  }, []);

  // useEffect(() => {
  //   console.log(texts);
  // }, [texts]);

  useEffect(() => {
    if (socket == null) {
      return;
    }
    socket.on("private message", (recievedMessage, usernam) => {
      console.log(recievedMessage + " " + usernam+ " " + username)
      if (username === usernam) {
        setTexts((texts) => [...texts, {sender:username,message:recievedMessage}]);
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
    setTexts((texts) => [...texts, {sender:sessionStorage.getItem("username"),message:message}]);
    setMessage(""); 
  };

  const renderingTexts = texts.map((text) => {
    if(text.sender === sessionStorage.getItem("username"))
    return <p key={crypto.randomUUID()} className={`from-me`}> {text.message} </p>;
    else if (text.sender === username)xx
    return <p key={crypto.randomUUID()} className={`from-them`}> {text.message} </p>;
  });
  
  if (!reciverID || !texts) return <h1>Loading...</h1>;
  return (
    <>
      <div className="message-interface">
      {renderingTexts}
      </div>
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
