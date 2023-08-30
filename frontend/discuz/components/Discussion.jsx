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
        .post("http://localhost:5000/discuz", {
          username: username,
          title: title,
          content: content,
        })
        .then((res) => {
          console.log("inside discussion");
          console.log(res);
        })
        .catch((err) => {
          console.log(err);
        });
        navigate("/home")
    }
  };

  return (
    <>
      <div className="container">
        <div class="discuz_background">
          <h3>Post a Discussion</h3>
          <form id="Post discussion" onSubmit={handlesubmit}>
            <label htmlFor="title">Title</label>
            <input
              type="text"
              id="discuz_title"
              name="title"
              placeholder="Title"
              onChange={(e) => {
                setTitle(e.target.value);
              }}
            />
            <label htmlFor="content">Content</label>
            <textarea
              id="discuz_content"
              name="content"
              placeholder="Write something.."
              style={{ height: "200px" }}
              onChange={(e) => {
                setContent(e.target.value);
              }}
            ></textarea>
            <p id="post_error">{error}</p>
            <input type="submit" id="discuz_submit" value="Submit" />
          </form>
        </div>
      </div>
    </>
  );
};

export default Discussion;
