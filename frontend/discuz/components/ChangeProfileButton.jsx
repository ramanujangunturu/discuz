import { useNavigate } from "react-router-dom";


const ChangeProfileButton = () => {
    const navigate = useNavigate();
    const handleClick = ()=>{
        navigate("/updateProfile")
    }
    return ( <><button onClick = {handleClick}className="profileChanger">Change profile</button></>);
}
 
export default ChangeProfileButton;