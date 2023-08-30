import axios from "axios";
import { useState, useEffect } from "react";
import ChangeProfileButton from "./ChangeProfileButton";


const Profile = () => {
  const [userProfile, setUserProfile] = useState("");
  const profileUsername = sessionStorage.getItem("username");
//   console.log(profileUsername)
  useEffect(() => {
    axios
      .get(`http://localhost:5000/userData/${profileUsername}`)
      .then((res) => {
        // console.log(res);
        setUserProfile(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  return (
    <>
      <div className="card">
        <h3>Profile</h3>
        <h4>Username</h4>
        <p>{userProfile.username}</p>
        <h4>Name</h4>
        <p>{userProfile.name}</p>
        <h4>Email</h4>
        <p>{userProfile.email}</p>
      <ChangeProfileButton></ChangeProfileButton>
      </div>
      <p id="extender"> </p>
    </>
  );
};

export default Profile;
