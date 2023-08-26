const Cards = ({ cardData }) => {
//   console.log(cardData, "card data");
  const cards = cardData.map((item) => {
    return (
        <div style={{
            marginLeft:"10px"
        }}key={item._id} id="discuz_card">
          <h3 style={{
            fontSize: "25px",
          }}>{item.title}</h3>
          <h4 style={{
            fontSize: "14px",
            marginTop: "3px",
            fontWeight: "110"
          }}>{item.postedBy}</h4>
          <p style={{
            marginTop: "13px"
          }}>{item.content}</p>
        </div>
    );
  });
  console.log(cards);

  return <>{cards}</>;
};

export default Cards;
