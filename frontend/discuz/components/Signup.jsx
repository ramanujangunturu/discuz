import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const Signup = () => {
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
              confirmPassword: cnfpassword,
            })
            .then((res) => {
              console.log("inside signup");
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
    <>
      <div class="signup_background">
        <div class="signup_shape"></div>
        <div class="signup_shape"></div>
      </div>
      <form id="signup_form"onSubmit={handleSubmit}>
        <div className="align_login_signup" style={{marginBottom:"10px"}}>
        <img src="/src/assests/logo.png" alt="logo" id="login_logo" />
        <h1>Discuz</h1>
        </div>
        <label htmlFor="name"className="signup_label">Full Name</label>
        <input
          type="text"
          name="name"
          className="signup_input"
          id="name"
          defaultValue={name}
          onChange={(e) => setName(e.target.value)}
        />
        
        {/* <p id="username_error" className="signup_message">{usernameError}</p> */}
        <label htmlFor="username" className="signup_label">Username</label>
        <input
          type="text"
          name="username"
          id="username"
          className="signup_input"
          defaultValue={username}
          onChange={(e) => {
            setUsername(e.target.value);
          }}
        />
        <p id="username_error" className="signup_message"> {usernameError}</p>
        <label htmlFor="email" className="signup_label">E-mail</label>
        <input
          type="text"
          className="signup_input"
          name="email"
          id="email"
          defaultValue={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <label htmlFor="password" className="signup_label">Password</label>
        <input
          type="password"
          name="password"
          id="password"
          className="signup_input"
          defaultValue={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <label htmlFor="confirmPassword" className="signup_label">Confirm Password</label>

        <input
          type="password"
          name="confirmPassword"
          id="confirmPassword"
          className="signup_input"
          defaultValue={cnfpassword}
          onChange={(e) => setCnfpassword(e.target.value)}
        />
        <p id="password_error" className="signup_message">{passwordError}</p>
        <button id="signup_submit"type="submit">submit</button>
      </form>
    </>
  );
};

export default Signup;
