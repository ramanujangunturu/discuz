import { useParams } from "react-router-dom";
import axios from "axios";
import { useEffect, useState } from "react";
import Comments from "./Comments";


const Post = () => {
  const { postId } = useParams();
  const [data, setData] = useState([]);
  const [comment, setComment] = useState("");
  const [error,setError] = useState("")
  useEffect(() => {
    axios
      .get(`http://localhost:5000/discuz/${postId}`)
      .then((res) => {
        console.log(res);
        setData(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

    const handleClick = () => {if(comment){
        setError("");
        const username = sessionStorage.getItem("username");
        axios.post(`http://localhost:5000/discuz/${postId}`, {
            comment: comment,
            username: username
        }).then((res) => {
            console.log(res);
        }
        ).catch((err) => {
            console.log(err);
        }
        )}else{
            setError("Can't post an empty comment")
        }
    }

  return (
    <>
      <div
        style={{
          marginLeft: "10px",
        }}
        id="discuz_card"
      >
        <h3
          style={{
            fontSize: "25px",
          }}
        >
          {data.title}
        </h3>
        <h4
          style={{
            fontSize: "14px",
            marginTop: "3px",
            fontWeight: "110",
          }}
        >
          {data.postedBy}
        </h4>
        <p
          style={{
            marginTop: "13px",
          }}
        >
          {data.content}
        </p>
        <textarea name="comment" id="comment" cols="90" rows="5" onChange={(e)=>setComment(e.target.value)} style={{
            backgroundColor: "black",
            color: "white",
            fontFamily: "poppins",
            padding: "5px",
            fontSize: "10px",
            width:"868px",
            borderRadius: "5px",
            height: "67px"
        }}></textarea><br />
        <p style={{color: "red"}}>{error}</p>
        <button id="add_comment" onClick={handleClick}>Add Comment</button>
        </div>
        <Comments Id={postId } />
    </>
  );
};

export default Post;
