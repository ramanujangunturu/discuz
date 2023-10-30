import axios from "axios";
import { useState, useEffect } from "react";
import Cards from "./Cards";

const Home = () => {
  const [data, setData] = useState([]);

  useEffect(() => {
    axios
      .get("http://localhost:5000/discuz")
      .then((res) => {
        // console.log(res);
        setData(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  const username = sessionStorage.getItem("username");
  //   console.log(username);
  return (
    <>
      <h3 className="text-4xl font-bold text-center my-6">Discussions</h3>
      <div className="data_background w-full flex-row justify-center items-center">
        <div className="cards flex-row w-full">
          <Cards cardData={data} />
        </div>
      </div>
    </>
  );
};

export default Home;
