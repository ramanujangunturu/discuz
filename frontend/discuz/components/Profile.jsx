import axios from "axios";
import { useState, useEffect } from "react";
import ChangeProfileButton from "./ChangeProfileButton";
import AddFriend from "./AddFriend";
import { useParams } from "react-router-dom";

const Profile = () => {
  const [userProfile, setUserProfile] = useState("");
  const loggedUsername = sessionStorage.getItem("username");
  const { username } = useParams();

  useEffect(() => {
    axios
      .get(`https://trydiscuz.onrender.com/userData/${username}`)
      .then((res) => {
        console.log(res);
        setUserProfile(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, [username]);
  if (loggedUsername == username) {
    return (
      <>
        <div className="card mx-auto m-12">
          <h3>Profile</h3>
          <h4>Username</h4>
          <p>{userProfile.username}</p>
          <h4>Name</h4>
          <p>{userProfile.name}</p>
          <h4>Email</h4>
          <p>{userProfile.email}</p>
          <ChangeProfileButton></ChangeProfileButton>
        </div>
      </>
    );
  } else {
    return (
      <>
        <div className="card mx-auto m-12">
          <h3>Profile</h3>
          <h4>Username</h4>
          <p>{userProfile.username}</p>
          <h4>Name</h4>
          <p>{userProfile.name}</p>
          <h4>Email</h4>
          <p>{userProfile.email}</p>
          <AddFriend username={userProfile.username}></AddFriend>
        </div>
      </>
    );
  }
};

export default Profile;
