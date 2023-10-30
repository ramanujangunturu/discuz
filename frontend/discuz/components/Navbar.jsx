import { Link, Outlet, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import io from "socket.io-client";
const url = "http://localhost:3001";

const Navbar = ({ socketSetter, userSetter}) => {
  const username = sessionStorage.getItem("username");
  const navigate = useNavigate();

  

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

    socket.on("users", (users) => {
      userSetter(users);
    });

    return () => {
      socket.disconnect();
    };
  }, []);

  const handleClick = () => {
    navigate(`/dashboard`);
  };

  return (
    <>
      <div className="background_nav my-4 ">
        <nav className="body_nav">
          <div className="logo-block w-80 ">
            <img
              src="/src/assests/logo.png"
              onClick={handleClick}
              style={{ cursor: "pointer" }}
              className="w-20 h-20"
              alt="logo"
            />
            <h1
              id="heading-logo"
              onClick={handleClick}
              style={{ cursor: "pointer" }}
              className="text-5xl font-bold"
            >
              Discuz
            </h1>
          </div>
          <ul className="navbar flex justify-evenly flex-row">
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
