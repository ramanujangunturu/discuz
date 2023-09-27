import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const Discussion = () => {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [error, setError] = useState("");

  const navigate = useNavigate();

  const handlesubmit = (e) => {
    e.preventDefault();
    const username = sessionStorage.getItem("username");
    // console.log("submitted");
    if (title === "" || content === "") {
      setError("Please fill all the fields");
    } else {
      setError("");
      axios
        .post("https://discuz.onrender.com/discuz", {
          username: username,
          title: title,
          content: content,
        })
        .then((res) => {
          console.log("inside discussion");
          console.log(res);
          navigate("/home")
        })
        .catch((err) => {
          console.log(err);
        });
    }
  };

  return (
    <>
      <div className="container">
        <div class="discuz_background">
          <h3 id="post_discussion_heading">Post a Discussion</h3>
          <form id="Post_discussion" onSubmit={handlesubmit}>
            <label htmlFor="title">Title</label><br />
            <input
              type="text"
              id="discuz_title"
              name="title"
              onChange={(e) => {
                setTitle(e.target.value);
              }}
            />
            <br />
            <label htmlFor="content">Content</label><br />
            <textarea
              id="discuz_content"
              name="content"
              style={{ height: "200px" }}
              onChange={(e) => {
                setContent(e.target.value);
              }}
            ></textarea>
            <p id="post_error">{error}</p>

            <button type="submit"  className="discuz_submit" value="Submit" >Submit</button>
          </form>
        </div>
      </div>
    </>
  );
};

export default Discussion;
