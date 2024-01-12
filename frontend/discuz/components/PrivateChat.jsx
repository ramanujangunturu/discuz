import  { useEffect, useState, useRef } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";

const PrivateChat = ({ socket }) => {
  const [message, setMessage] = useState("");
  const [texts, setTexts] = useState([{}]);
  const [reciverID, setReciverID] = useState("");
  const { username } = useParams();
  const messageInterfaceRef = useRef(null);

  useEffect(() => {
    console.log(sessionStorage.getItem("username"));
    axios
      .get(`http://localhost:5000/chat/getDetails?username=${username}&username2=${sessionStorage.getItem("username")}`)
      .then((res) => {
        console.log(res.data, "response");
        setReciverID(res.data.userID);
        if (res.data.Chats == null) return;
        setTexts(res.data.Chats.chats.map(({ sender, message }) => ({ sender: sender, message: message })));
      });
  }, []);

  useEffect(() => {
    if (socket == null) {
      return;
    }
    socket.on("private message", (recievedMessage, usernam) => {
      console.log(recievedMessage + " " + usernam + " " + username);
      if (username === usernam) {
        setTexts((texts) => [...texts, { sender: username, message: recievedMessage }]);
      } else {
        console.log("not the same user");
      }
    });
  }, [socket]);

  useEffect(() => {
    // Scroll to the bottom of the message interface when texts change
    if (messageInterfaceRef.current) {
      messageInterfaceRef.current.scrollTop = messageInterfaceRef.current.scrollHeight;
    }
  }, [texts]);

  const handleClick = () => {
    socket.emit("private message", message, reciverID, sessionStorage.getItem("username"), username);
    console.log(reciverID);
    setTexts((texts) => [...texts, { sender: sessionStorage.getItem("username"), message: message }]);
    setMessage("");
  };

  const renderingTexts = texts.map((text) => {
    if (text.sender === sessionStorage.getItem("username"))
      return <p key={crypto.randomUUID()} className={`from-me`}> {text.message} </p>;
    else if (text.sender === username)
      return <p key={crypto.randomUUID()} className={`from-them`}> {text.message} </p>;
  });

  if (!reciverID || !texts) return <h1>Loading...</h1>;

  return (
    <>
      <div
        className="message-interface"
        ref={messageInterfaceRef}
        style={{ maxHeight: "70vh", overflowY: "auto", padding: "20px", color: "white", scrollbarColor: "black black" }}
      >
        {renderingTexts}
      </div>
      <form onSubmit={(e) => e.preventDefault()} style={{ position: "fixed", bottom: 0, width: "100%", padding: "20px" }}>
        <input
          type="text"
          value={message}
          style={{
            margin: "0",
            padding: "10px",
            width: "70%",
            display: "inline-block",
            borderRadius: "5px",
            border: "1px solid #333",
            color: "black", // Set text color to black
          }}
          onChange={(e) => setMessage(e.target.value)}
        />
        <button
          type="submit"
          style={{
            padding: "10px",
            width: "28%",
            display: "inline-block",
            marginLeft: "2%",
            borderRadius: "5px",
            backgroundColor: "#333",
            color: "white", // Set text color to white
            border: "1px solid #333",
          }}
          onClick={handleClick}
        >
          Send
        </button>
      </form>
    </>
  );
};

export default PrivateChat;