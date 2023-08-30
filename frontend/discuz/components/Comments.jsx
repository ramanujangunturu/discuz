import { useEffect, useState } from "react";
import axios from "axios";

const Comments = (props) => {
  const [comments, setComments] = useState([]);
  useEffect(() => {
    console.log(props);
    axios
      .get(`http://localhost:5000/discuz/${props.Id}/comments`)
      .then((res) => {
        console.log(res.data, "comment check");
        setComments(res.data);
      })
      .catch((err) => {
        setComments([]);
        console.log(err);
      });
  }, []);

  const commentList = comments.map((comment) => {
    return (
      <div>
        <h4>{comment.username}</h4>
        <p>{comment.comment}</p>
      </div>
    );
    });

    console.log(comments)
  
  return (
    <>
    <h1>comments</h1>
      {commentList}
    </>
  );
};

export default Comments;
