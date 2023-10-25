import {useNavigate} from 'react-router-dom'


const DisplayFriends = ({ data,socket }) => {
  // console.log(data, "friends");

const navigate = useNavigate()
  const handleClick = (e) => {
    navigate(`/dashboard/chat/${e.target.id}`)
  }
  const cards = data.map((item) => {
    return (
        <div key={item._id} style={{margin:"25px",height:"100px",display:"flex",flexFlow:"column",alignItems:"center",alignContent:"center",justifyContent:"center"}}>
          <h3 style={{width:"fit-content"}}>{item.username}</h3>
          <button
            id = {item.username}
            className="button-50" onClick={handleClick}
            style={{ width: "fit-content",height: "fit-content", padding: "5px", margin: "5px", fontSize: "15px" }}
          >
            message
          </button>
        </div>
    );
  });
 if(data.length === 0){
  return (
    <>
      <h1>Loading</h1>
    </>
  );}
  else{
    return (
      <>
        <h1>Friends</h1>
        <div className="Friends-Container" style={{ display: "flex" }}>
          {cards}
        </div>
      </>
    );
  }
};

export default DisplayFriends;
