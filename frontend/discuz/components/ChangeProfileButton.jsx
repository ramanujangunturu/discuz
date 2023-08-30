import { useNavigate } from "react-router-dom";


const ChangeProfileButton = () => {
    const navigate = useNavigate();
    const handleClick = ()=>{
        navigate("/home/profileUpdater")
    }


    return ( <><button onClick = {handleClick}id="profileChanger">Change profile</button></>);
}
 
export default ChangeProfileButton;