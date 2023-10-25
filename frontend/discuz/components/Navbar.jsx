import { Link, Outlet } from "react-router-dom";
import { useEffect } from "react";
import io from "socket.io-client";
const url = "http://localhost:3001";

const Navbar = ({ socketSetter,userSetter }) => {
  const username = sessionStorage.getItem("username");

  useEffect(() => {
    const socket = io.connect(url, { autoconncect: false });
    socket.auth = { username: sessionStorage.getItem("username") };
    socket.connect();
    console.log("connected");
    socket.on("userId", (userID) => {
      socket.userID = userID;
      socketSetter(socket);
    });

    socket.onAny((eventName, ...args) => {
      console.log(eventName, args);
    });
    // socket.on("private message", (content, from ) => { 
    //   console.log(content, from);
    // });

    socket.on("users", (users) => {
      userSetter(users);
    });
    
    return () => {
      socket.disconnect();
    };

  }, []);


  return (
    <>
      <div className="background_nav">
        <nav className="body_nav">
          <div className="logo-block">
            <img src="/src/assests/logo.png" alt="logo" id="logo" />
            <h1 id="heading-logo">Discuz</h1>
          </div>
          <ul className="d-flex align-items-center gap-5 navbar">
            <li>
              {" "}
              <Link className="nav-links" to={""}>
                Home
              </Link>
            </li>
            <li>
              {" "}
              <Link className="nav-links" to={"chat"}>
                Chat
              </Link>
            </li>
            <li>
              {" "}
              <Link className="nav-links" to={"discussion"}>
                Discussion
              </Link>
            </li>
            <li>
              {" "}
              <Link className="nav-links" to={`${username}/profile`}>
                Profile
              </Link>
            </li>
          </ul>
        </nav>
      </div>
      <Outlet />
    </>
  );
};

export default Navbar;
