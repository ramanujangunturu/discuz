import { useNavigate } from "react-router-dom";

const Cards = ({ cardData }) => {
  //   console.log(cardData, "card data")
  const navigate = useNavigate();
  const handleClick = (e)=>{
    console.log(e.target.id)
    navigate(`/home/discuz/${e.target.id}`)
  }
  const cards = cardData.map((item) => {
    
    return (
      <div
        style={{
          marginLeft: "10px",
        }}
        key={item._id}
        id="discuz_card"
      >
        <h3
          style={{
            fontSize: "25px",
          }}
        >
          {item.title}
        </h3>
        <h4
          style={{
            fontSize: "14px",
            marginTop: "3px",
            fontWeight: "110",
          }}
        >
          {item.postedBy}
        </h4>
        <p
          style={{
            marginTop: "13px",
          }}
        >
          {item.content}
        </p> 
        <button id={item._id} onClick={handleClick} className="viewDiscussionButton profileChanger" type="button">View Discussion</button>
      </div>
    );
  });
  // console.log(cards);

  return <>{cards}</>;
};

export default Cards;
