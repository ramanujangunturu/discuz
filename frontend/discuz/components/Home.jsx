import axios from "axios";
import { useState, useEffect } from "react";
import Cards from "./Cards";

const Home = () => {
  const [data, setData] = useState([]);

  //   console.log("hello")
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
      <h3>Discussions</h3>
      <div className="data_background">
        <Cards cardData={data} />
      </div>
    </>
  );
};

export default Home;