import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [loginMessage, setLoginMessage] = useState("");

  let navigate = useNavigate();
  const handleSubmit = (e) => {
    e.preventDefault();
    axios
      .post(`http://localhost:5000/login/`, {
        username: username,
        password: password,
      })
      .then((res) => {
        if (res.data === "username does not exist") {
          setLoginMessage("username does not exist");
        } else if (res.data === "password is incorrect") {
          setLoginMessage("password incorrect");
        } else if (res.data === "login successful") {
          console.log("setting storage");
          sessionStorage.setItem("username", username);
          navigate("/home");
          // const l = sessionStorage.getItem("username");
          // console.log(l);
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <>
      <div class="login_background">
        <div class="login_shape"></div>
        <div class="login_shape"></div>
      </div>
      <form id="login_form" onSubmit={handleSubmit}>
        <h1>Discuz</h1>
        <label className="login_label" htmlFor="username">
          Username
        </label>
        <input
          type="text"
          name="username"
          id="username"
          className="login_input"
          placeholder="username"
          onChange={(e) => {
            setUsername(e.target.value);
          }}
        />
        <br />
        <label className="login_label" htmlFor="password">
          Password
        </label>
        <input
          type="password"
          name="password"
          id="password "
          className="login_input"
          placeholder="password"
          onChange={(e) => {
            setPassword(e.target.value);
          }}
        />
        <p id="login_message"> {loginMessage}</p>
        <button id="login_submit" type="submit">
          Log in
        </button>
      </form>
    </>
  );
};

export default Login;
