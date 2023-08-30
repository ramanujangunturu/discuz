import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const UpdateForm = ({userData}) => {
    // console.log(userData, "in update form")
        const [nameState,setName]=useState(userData.name);   
        const [emailState,setEmail]=useState(userData.email);
        const navigate = useNavigate();
    const handleSubmit = (e) => {
        e.preventDefault();
        const data = { 
            username: userData.username,
            name: nameState,
            email: emailState,
        };
        axios.post(`http://localhost:5000/updateProfile/`, data).then((res) => {
            console.log(res);
        })
        console.log(data)
        navigate("/home/profile");
    };
    return (
            <form onSubmit={handleSubmit}>
            <label htmlFor="profUpdate_username">Username</label>
            <input type="text" value={userData.username || ""} id="profUpdate_username" name="profUpdate_username" placeholder="Username" />
            <label htmlFor="name_update">Name</label>
            <input type="text" defaultValue={nameState || ""} id="profUpdate_username" name="profupdate_name" placeholder="name" onChange={(e)=>{console.log(nameState, "logged");setName(e.target.value)}}/>
            <label htmlFor="email_update">email</label>
            <input type="text" defaultValue={emailState || ""} id="profUpdate_email" name="profupdate_email" placeholder="email" onChange={(e)=>{console.log(emailState, "logged");setEmail(e.target.value)}} />
            <button type="submit">submit</button>
          </form>
    );
}
 
export default UpdateForm;