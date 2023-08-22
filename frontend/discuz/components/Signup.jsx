import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const [name, setName] = useState("");
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [cnfpassword, setCnfpassword] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [usernameError, setUsernameError] = useState("");
  let navigate = useNavigate();

  let usernameFlag;
  let passwordFlag;
  function handleSubmit(e) {
    console.log("inside handle submit");
    e.preventDefault();
    axios
      .post("http://localhost:5000/signup/check", {
        username: username,
      })
      .then((res) => {
        console.log(res);
        if (res.data === "Username already exists") {
          usernameFlag = true;
          setUsernameError("Username already exists");
        } else {
          usernameFlag = false;
          setUsernameError("");
        }
        if (password !== cnfpassword) {
          passwordFlag = true;
          setPasswordError("Passwords do not match");
        } else {
          passwordFlag = false;
          setPasswordError("");
        }

        if (passwordFlag === true || usernameFlag === true) {
        } else {
          axios
            .post("http://localhost:5000/signup", {
              name: name,
              username: username,
              email: email,
              password: password,
              confirmPassword: cnfpassword
            })
            .then((res) => {
              console.log("inside signup")
              console.log(res);
              navigate("/login");
            })
            .catch((err) => {
              console.log(err);
            });
        }
      })
      .catch((err) => {
        console.log(err);
      });
  }
  return (
    <form onSubmit={handleSubmit}>
      <label htmlFor="name">Full Name</label>
      <input
        type="text"
        name="name"
        id="name"
        defaultValue={name}
        onChange={(e) => setName(e.target.value)}
      />
      <br />
      <p id="username_error">{usernameError}</p>
      <label htmlFor="username">Username</label>
      <input
        type="text"
        name="username"
        id="username"
        defaultValue={username}
        onChange={(e) => {
          setUsername(e.target.value);
        }}
      />
      <br />
      <p id="username_error"> </p>
      <label htmlFor="email">E-mail</label>
      <input
        type="text"
        name="email"
        id="email"
        defaultValue={email}
        onChange={(e) => setEmail(e.target.value)}
      />
      <br />
      <label htmlFor="password">Password</label>
      <input
        type="password"
        name="password"
        id="password"
        defaultValue={password}
        onChange={(e) => setPassword(e.target.value)}
      />
      <p id="password error">{passwordError}</p>
      <br />
      <p id="password_ error"></p>
      <label htmlFor="confirmPassword">Confirm Password</label>

      <input
        type="password"
        name="confirmPassword"
        id="confirmPassword"
        defaultValue={cnfpassword}
        onChange={(e) => setCnfpassword(e.target.value)}
      />
      <br />
      <button type="submit">submit</button>
    </form>
  );
};

export default Login;
