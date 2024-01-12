import axios from "axios";
import { useState, useEffect } from "react";
import Cards from "./Cards";
import { useNavigate } from "react-router-dom";

const Home = () => {
  const [data, setData] = useState([]);
  const navigate = useNavigate();
  useEffect(() => {
    axios
      .get("https://trydiscuz.onrender.com/discuz")
      .then((res) => {
        // console.log(res);
        setData(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  const handleClick = () => {
    navigate("discussion");
  }
  const username = sessionStorage.getItem("username");
  //   console.log(username);
  return (
    <>
      <div className="discussions" ><h3 className="text-4xl font-bold text-center my-6 inline-block main-discussions">Discussions</h3><button class="button-33" role="button" onClick={handleClick}>+ Add Discussion</button></div>
      <div className="data_background w-full flex-row justify-center items-center">
        <div className="cards flex-row w-full">
          <Cards cardData={data} />
        </div>
      </div>
    </>
  );
};

export default Home;

