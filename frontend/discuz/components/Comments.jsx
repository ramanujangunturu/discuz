import { useEffect, useState } from "react";
import axios from "axios";


const Comments = ({comments,setComments,Id}) => {
  
  useEffect(() => {
    // console.log(;  
    console.log("running use Effect");
    axios
      .get(`https://discuz.onrender.com/discuz/${Id}/comments`)
      .then((res) => {
        // console.log(res.data, "comment check");
        // console.log("setting comments")
        setComments(res.data);
      })
      .catch((err) => {
        setComments([]);
        console.log(err);
      });
  }, []);


//   console.log("running");

  const commentList = comments.map((comment) => {
    return (
      <div key={comment._id}>
        <h4>{comment.username}</h4>
        <p>{comment.comment}</p>
      </div>
    );
  });

  // console.log(commentList);

  // console.log(comments)

  return (
    <>
      <h1>comments</h1>
      {commentList}
    </>
  );
};

export default Comments;
