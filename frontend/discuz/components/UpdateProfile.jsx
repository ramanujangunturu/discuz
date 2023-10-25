import { useEffect, useState } from "react";
import UpdateForm from "./UpdateForm";
import axios from "axios";

const UpdateProfile = () => {
  const [user, setUser] = useState({});

  useEffect(() => {
    const loggedUser = sessionStorage.getItem("username");
    axios.get(`http://localhost:5000/userData/${loggedUser}`).then((res) => {
      setUser(res.data);
    });
  }, []);

  return <>{user?.name ? <UpdateForm userData={user} /> : <></>}</>;
};

export default UpdateProfile;
