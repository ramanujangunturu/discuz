import { useNavigate } from "react-router-dom";

const Cards = ({ cardData }) => {
  //   console.log(cardData, "card data")
  const navigate = useNavigate();
  const handleClick = (e) => {
    console.log(e.target.id);
    navigate(`/dashboard/discuz/${e.target.id}`);
  };
  const handleProfile = (e) => {
    navigate(`/dashboard/${e.target.innerHTML}/profile`);
  };
  const cards = cardData.map((item) => {
    return (
      <div
        className="discuz_card p-4 mx-6 my-8 rounded-lg shadow-md"
        key={item._id}
        id="discuz_card"
      >
        <h3 className="font-bold text-2xl mb-1">{item.title}</h3>
        <h4 onClick={handleProfile} style={{color: "green"}}className="font-medium w-fit mb-6 cursor-pointer">
          {item.postedBy}
        </h4>
        <h3 className="font-thin text-m font-sans">Description:</h3>
        <p className="mt-2">{item.content}</p>
        <button
          id={item._id}
          onClick={handleClick}
          className="profileChanger bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-full mt-4"
          type="button"
        >
          View Discussion
        </button>
      </div>
    );
  });
  // console.log(cards);

  return <>{cards}</>;
};

export default Cards;
