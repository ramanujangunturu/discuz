import axios from "axios";

const AddFriend = ({username}) => {
    
    const handleClick=()=>{
        axios.post(`https://trydiscuz.onrender.com/userData/addfriend`,{
            username: sessionStorage.getItem("username"),
            friend: username
        })
        .then((res=>{
            console.log("the updated user")
            console.log(res);
        }))
    }

    return ( <button className="profileChanger m-auto my-2" onClick={handleClick}>Add friend</button> );
}
 
export default AddFriend;