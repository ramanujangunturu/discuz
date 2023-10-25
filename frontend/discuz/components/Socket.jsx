import io from "socket.io-client";
const url = "http://localhost:3001";

const socket = () => {
  const username = sessionStorage.getItem("username");

  useEffect(() => {
    const socket = io.connect(url, { autoconncect: false });
    socket.auth = { username: sessionStorage.getItem("username") };
    socket.connect();
    socket.on("userId", (userID) => {
      socket.userID = userID;
      socketSetter(socket);
    });

    socket.onAny((eventName, ...args) => {
      console.log(eventName, args);
    });
    socket.on("users", (users) => {
      console.log(users);
    });
  }, []);
};

export default socket;
