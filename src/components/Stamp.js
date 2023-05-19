import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function CreateBlog() {
  const navigate = useNavigate();
  const [content, setContent] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    const post = { content };
    fetch("http://localhost:8080/users/posts", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${localStorage.getItem("jwtToken")}`,
        "Content-Type": `application/json`,
      },
      body: JSON.stringify(post),
    })
      .then(() => {
        navigate("/");
      })
      .catch((error) => {
        console.log(error);
      });
  };
  return (
    <div className="form-outside">
      <section className="form-holder">
        <form className="form" onSubmit={handleSubmit}>
          <div className="form-breaker">
            <textarea
              type="text"
              id="body"
              name="body"
              value={content}
              onChange={(e) => setContent(e.target.value)}
              placeholder="What's on your mind?"
              autoComplete="off"
            ></textarea>
          </div>
          <div className="form-breaker buttons">
            <input className="form-submit -button" type="submit"></input>
          </div>
        </form>
      </section>
    </div>
  );
}
