import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import axios from "axios";

const Comments = ({ comments, setComments, Id }) => {
  const navigate = useNavigate();
  useEffect(() => {
    // console.log(;
    console.log("running use Effect");
    axios
      .get(`http://localhost:5000/discuz/${Id}/comments`)
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

  const handleProfile = (e) => {
    navigate(`/dashboard/${e.target.innerHTML}/profile`);
  };

  //   console.log("running");

  const commentList = comments.map((comment) => {
    return (
      <div key={comment._id}>
        <h4
          onClick={handleProfile}
          style={{ cursor: "pointer", width: "fit-content" }}
        >
          {comment.username}
        </h4>
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
