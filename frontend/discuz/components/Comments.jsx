import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

import axios from "axios";

const Comments = ({ comments, setComments, Id }) => {
  const navigate = useNavigate();
  useEffect(() => {
    console.log("running use Effect");
    axios
      .get(`http://localhost:5000/discuz/${Id}/comments`)
      .then((res) => {
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
